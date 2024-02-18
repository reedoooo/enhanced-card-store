// /* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useRef,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { usePageContext } from '../../UTILITIES_CONTEXT/PageContext/PageContext';
import { processResponseData } from './helpers';
import useLogger from '../../hooks/useLogger';
import { defaultContextValue } from '../../constants';
import { Redirect, useNavigate } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';

export const AuthContext = createContext(defaultContextValue.AUTH_CONTEXT);

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export default function AuthProvider({ children }) {
  const { setIsDataLoading } = usePageContext();
  const { startLoading, stopLoading } = useLoading(); // Utilize useLoading hook
  const { logEvent } = useLogger('AuthContext');
  const navigate = useNavigate(); // Create navigate instance
  const [lastTokenCheck, setLastTokenCheck] = useState(Date.now());
  const checkInterval = 120000; // 2 minutes in milliseconds
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
    'user',
    'authUser',
    'userBasicData',
    'userSecurityData',
    'isLoggedIn',
    'userId',
  ]);
  const [responseMessage, setResponseMessage] = useState('');
  const logoutTimerRef = useRef(null);
  const executeAuthAction = async (actionType, url, requestData) => {
    const loadingID = actionType;
    startLoading(loadingID);
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/${url}`,
        requestData
      );
      setResponseMessage(response.data.message);
      // const { data } = handleApiResponse(response.data, 'executeAuthAction');
      if (response.status === 200 || response.status === 201) {
        const {
          accessToken,
          refreshToken,
          authData,
          basicData,
          securityData,
          responseData,
          refreshData,
        } = processResponseData(response.data, actionType);
        setCookie('accessToken', accessToken, { path: '/' });
        setCookie('refreshToken', refreshToken, { path: '/' });
        setCookie('isLoggedIn', true, { path: '/' });
        setCookie('userBasicData', basicData, { path: '/' });
        setCookie('userSecurityData', securityData, { path: '/' });
        setCookie('user', responseData.user, { path: '/' });
        setCookie('authUser', authData, { path: '/' });
        setCookie('userId', authData.userId, { path: '/' });
        resetLogoutTimer();
        navigate('/home'); // Add this line for redirection
      }
    } catch (error) {
      logEvent('Auth error:', error);
    } finally {
      stopLoading(loadingID);
    }
  };
  const logout = useCallback(async () => {
    startLoading('logout');
    try {
      const { userId, refreshToken } = cookies;
      await axios.post(`${REACT_APP_SERVER}/api/users/signout`, {
        userId,
        refreshToken,
      });
      Object.keys(cookies).forEach(removeCookie);
      clearTimeout(logoutTimerRef.current);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      stopLoading('logout');
    }
  }, [removeCookie, startLoading, stopLoading]);

  const resetLogoutTimer = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(logout, 2700000); // 45 minutes
  }, [logout]);

  const login = useCallback(
    async (username, password) => {
      logEvent('Logging in...');
      await executeAuthAction('signin', 'signin', {
        userSecurityData: { username, password },
      });
    },
    [executeAuthAction]
  );

  const signup = async (securityData, basicData) => {
    logEvent('Signing up...');
    await executeAuthAction('signup', 'signup', {
      userSecurityData: securityData,
      userBasicData: basicData,
    });
  };

  const checkTokenValidity = useCallback(async () => {
    logEvent('Checking token validity.');
    startLoading('checkTokenValidity');

    try {
      const accessToken = cookies.accessToken;
      if (!accessToken) return false;

      const response = await axios.get(
        `${REACT_APP_SERVER}/api/users/checkToken`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setResponseMessage(response.data.message);
      const isValid = response.data.message === 'Token is valid';

      console.log('Token validity:', response.data);
      if (!isValid) {
        console.log('Token is invalid, logging out...');
        logout();
      }

      setLastTokenCheck(Date.now());
      return isValid;
    } catch (error) {
      console.error('Token validation error:', error);
      logEvent(`Token validation failed: ${error}`);
      logout(); // Log out if token validation fails
    } finally {
      stopLoading('checkTokenValidity');
    }
  }, [cookies.accessToken, logout, startLoading, stopLoading]);

  useEffect(() => {
    const currentTime = Date.now();
    if (currentTime - lastTokenCheck >= checkInterval) {
      checkTokenValidity();
    }

    const timeToNextCheck = lastTokenCheck + checkInterval - currentTime;
    const timeoutId = setTimeout(
      checkTokenValidity,
      timeToNextCheck > 0 ? timeToNextCheck : checkInterval
    );

    return () => clearTimeout(timeoutId); // Cleanup the timeout
  }, [checkTokenValidity, lastTokenCheck]);

  const contextValue = useMemo(
    () => ({
      // isLoggedIn: cookies.isLoggedIn,
      isLoggedIn: !!cookies.accessToken,
      accessToken: cookies.accessToken,
      refreshToken: cookies.refreshToken,
      responseMessage,
      authUser: cookies.authUser,
      user: cookies.user,
      basicData: cookies.userBasicData,
      securityData: cookies.userSecurityData,
      userId: cookies.userId,

      login,
      signup,
      logout,
      checkTokenValidity,
      resetLogoutTimer,
    }),
    [cookies, login, logout, resetLogoutTimer]
  );

  useEffect(() => {
    console.log('AUTH CONTEXT:', contextValue);
  }, [contextValue.login, contextValue.logout, contextValue.isLoggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
