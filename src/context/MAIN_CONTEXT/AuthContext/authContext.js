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
import { useCookies } from 'react-cookie';
import useLogger from '../../hooks/useLogger';
import { defaultContextValue } from '../../constants';
import { Redirect, useNavigate } from 'react-router-dom';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import jwt_decode from 'jwt-decode';
import { CircularProgress, Snackbar } from '@mui/material';

export const AuthContext = createContext(defaultContextValue.AUTH_CONTEXT);

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
    'isLoggedIn',
    'authUser',
    'userId',
  ]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    accessToken: '',
    userId: '',
  });

  // Helper function to decode JWT and set user state
  const decodeAndSetUser = (accessToken) => {
    const decoded = jwt_decode(accessToken);
    setUser({
      isLoggedIn: true,
      accessToken,
      userId: decoded.userId, // Or any other way you extract userId from token or cookies
    });
  };

  useEffect(() => {
    const { accessToken } = cookies;
    if (accessToken) {
      decodeAndSetUser(accessToken);
    } else {
      setUser({
        isLoggedIn: false,
        accessToken: '',
        userId: '',
      });
    }
  }, [cookies.accessToken]);

  const [responseMessage, setResponseMessage] = useState('');
  const { fetchWrapper } = useFetchWrapper();
  // const { logEvent } = useLogger('AuthContext');
  // Helper function to set cookies
  const setAuthCookies = (data) => {
    const { accessToken, refreshToken, user } = data;
    const authData = jwt_decode(accessToken);

    setCookie('accessToken', accessToken, { path: '/' });
    setCookie('refreshToken', refreshToken, { path: '/' });
    setCookie('isLoggedIn', true, { path: '/' });
    // setCookie('userBasicData', basicData, { path: '/' });
    // setCookie('userSecurityData', securityData, { path: '/' });
    setCookie('user', user, { path: '/' });
    setCookie('authUser', authData, { path: '/' });
    setCookie('userId', user._id, { path: '/' });
    navigate('/home');
  };

  const clearAuthCookies = () => {
    // List all cookie names to remove
    ['accessToken', 'refreshToken', 'user'].forEach((cookieName) =>
      removeCookie(cookieName, { path: '/' })
    );
    navigate('/login');
  };

  const executeAuthAction = async (actionType, url, requestData, loadingId) => {
    try {
      const responseData = await fetchWrapper(
        `${REACT_APP_SERVER}/api/users/${url}`,
        'POST',
        requestData,
        loadingId
      );
      if (!responseData?.data) throw new Error('Invalid response structure');
      setAuthCookies(responseData.data);
    } catch (error) {
      console.error('Auth action error:', error);
      setResponseMessage(
        error.message || 'An error occurred during authentication.'
      );
    }
  };
  // const logout = useCallback(() => {
  //   clearAuthCookies();
  // }, [removeCookie, navigate]);
  const logout = useCallback(() => {
    ['accessToken', 'refreshToken', 'user'].forEach((cookieName) =>
      removeCookie(cookieName, { path: '/' })
    );
    setOpenSnackbar(true); // Open the snackbar with loading icon
    setTimeout(() => {
      navigate('/login'); // Redirect to login after the timeout
    }, 3000); // Set timeout duration (e.g., 3000 ms = 3 seconds)
  }, [navigate, removeCookie]);
  const login = useCallback(
    async (username, password) => {
      await executeAuthAction(
        'signin',
        'signin',
        {
          userSecurityData: { username, password },
        },
        'login'
      );
    },
    [executeAuthAction]
  );

  const signup = useCallback(
    async (username, password, firstName, lastName, email) => {
      await executeAuthAction(
        'signup',
        'signup',
        {
          userSecurityData: { firstName, lastName, username, password, email },
        },
        'signup'
      );
    },
    [executeAuthAction]
  );

  const checkTokenValidity = useCallback(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      console.info('No access token found, user not logged in.');
      setOpenSnackbar(true); // Notify the user they are being redirected to login
      setTimeout(() => {
        setOpenSnackbar(false); // Close the notification
        navigate('/login'); // Redirect to login after showing the notification
      }, 3000); // Adjust the timeout duration as needed
      return;
    }

    try {
      const { exp } = jwt_decode(accessToken);
      const isTokenExpired = Date.now() >= exp * 1000;
      if (isTokenExpired) {
        logout();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
    }
  }, [cookies.accessToken, logout]);

  // Token validity check could be triggered periodically or on specific events
  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);
  const renderSnackbar = (
    <Snackbar
      open={openSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message={<CircularProgress color="inherit" />}
    />
  );

  const contextValue = useMemo(
    () => ({
      ...user,
      isLoggedIn:
        process.env.AUTH_ENVIRONMENT !== 'disabled'
          ? !!cookies.accessToken
          : true,
      login,
      signup,
      logout,
      responseMessage,
    }),
    [cookies.accessToken, login, signup, logout, responseMessage, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children} {renderSnackbar}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
