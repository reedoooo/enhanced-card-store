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
import { usePageContext } from '../PageContext/PageContext';
import { processResponseData } from './helpers';
import useLogger from '../hooks/useLogger';
import useApiResponseHandler from '../hooks/useApiResponseHandler';
import useFetchWrapper from '../hooks/useFetchWrapper';
export const AuthContext = createContext();

const cookieOptions = { path: '/' };
const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export default function AuthProvider({ children }) {
  const { setIsDataLoading } = usePageContext();
  const { logEvent } = useLogger('AuthContext');
  const handleApiResponse = useApiResponseHandler();
  const fetchWrapper = useFetchWrapper();
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

  // const setCookies = (data) => {
  //   Object.entries(data).forEach(([key, value]) => {
  //     logEvent('Setting cookie for: ', value);
  //     setCookie(key, value, cookieOptions);
  //   });
  // };

  const executeAuthAction = async (actionType, url, requestData) => {
    setIsDataLoading(true);
    try {
      // const response = await fetchWrapper(
      //   `${REACT_APP_SERVER}/api/users/${url}`,
      //   'POST',
      //   requestData
      // );
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
      }
    } catch (error) {
      logEvent('Auth error:', error);
    } finally {
      setIsDataLoading(false);
    }
  };
  const logout = useCallback(async () => {
    setIsDataLoading(true);
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
      setIsDataLoading(false);
    }
  }, [cookies, setIsDataLoading, removeCookie]);

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
      return false;
    }
  }, [cookies.accessToken, logout]);

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
      // checkTokenValidity,
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
// const updateLoginStatus = useCallback(
//   (at, rt) => {
//     setCookie('accessToken', at, { path: '/' });
//     setCookie('refreshToken', rt, { path: '/' });
//     setCookie('isLoggedIn', true, { path: '/' });
//   },
//   [setCookie]
// );

// const executeAuthAction = async (actionType, url, requestData) => {
//   setLoading('isPageLoading', true);
//   try {
//     // const response = await axios.post(
//     //   `${REACT_APP_SERVER}/api/users/${url}`,
//     //   requestData
//     // );
//     const response = await fetchWrapper(
//       `${REACT_APP_SERVER}/api/users/${url}`,
//       'POST',
//       requestData
//     );
//     const data = handleApiResponse(response.data, 'executeAuthAction');
//     if (response.status === 200 || response.status === 201) {
//       const processedData = processResponseData(data, actionType);
//       const {
//         accessToken,
//         refreshToken,
//         authData,
//         basicData,
//         securityData,
//         responseData,
//         refreshData,
//       } = processedData;
//       setCookie('accessToken', accessToken, { path: '/' });
//       setCookie('refreshToken', refreshToken, { path: '/' });
//       setCookie('isLoggedIn', true, { path: '/' });
//       setCookie('userBasicData', basicData, { path: '/' });
//       setCookie('userSecurityData', securityData, { path: '/' });
//       setCookie('user', responseData.user, { path: '/' });
//       setCookie('authUser', authData, { path: '/' });
//       setCookie('userId', authData.userId, { path: '/' });

//       updateLoginStatus(accessToken, refreshToken);
//       resetLogoutTimer();
//     }
//   } catch (error) {
//     console.error('Auth error:', error);
//   } finally {
//     setLoading('isPageLoading', false);
//   }
// };
// const logout = useCallback(async () => {
//   setLoading('isPageLoading', true);
//   try {
//     const userId = cookies.userId; // Assuming you have userId in cookies
//     const refreshToken = cookies.refreshToken;
//     await axios.post(`${REACT_APP_SERVER}/api/users/logout`, {
//       userId,
//       refreshToken,
//     });
//     // Clearing all cookies
//     Object.keys(cookies).forEach((cookieName) => removeCookie(cookieName));
//     if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//   } catch (error) {
//     console.error('Logout error:', error);
//   } finally {
//     setLoading('isPageLoading', false);
//   }
// }, [setLoading, removeCookie, cookies]);
// Add a method to check token validity
// const isTokenValid = async () => {
//   try {
//     const accessToken = cookies.accessToken;
//     const response = await axios.get('/api/users/checkToken', {
//       headers: { Authorization: accessToken },
//     });
//     return response.data.isValid;
//   } catch (error) {
//     console.error('Token validation error:', error);
//     return false;
//   }
// };
// Check token validity and update login status accordingly
// const checkTokenValidity = useCallback(async () => {
//   const accessToken = cookies.accessToken;
//   if (!accessToken) return false;

//   try {
//     const response = await axios.get(
//       `${REACT_APP_SERVER}/api/users/checkToken`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );

//     const isValid = response.data.isValid;
//     if (!isValid) {
//       logout(); // Automatically log out if token is invalid
//     }
//     return isValid;
//   } catch (error) {
//     console.error('Token validation error:', error);
//     return false;
//   }
// }, [cookies.accessToken, logout]);
// useEffect(() => {
//   checkTokenValidity(); //Check the token validity on component mount and whenever the accessToken changes
// }, [checkTokenValidity]);
