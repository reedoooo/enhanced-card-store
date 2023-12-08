import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { debounce } from 'lodash';
import {
  AUTH_COOKIE,
  LOGGED_IN_COOKIE,
  USER_COOKIE,
  processResponseData,
} from './helpers';

export const AuthContext = React.createContext();
export default function AuthProvider({ children, serverUrl }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    LOGGED_IN_COOKIE,
    AUTH_COOKIE,
    USER_COOKIE,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    username: '',
    email: '',
    id: '',
    role: '',
    cart: [],
    decks: [],
    collections: [],
  });
  const [updatedUser, setUpdatedUser] = useState({});
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  // const logoutTimerRef = useRef(null);

  const REACT_APP_SERVER = serverUrl || process.env.REACT_APP_SERVER;

  const executeAuthAction = async (actionType, url, requestData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/${url}`,
        requestData
      );
      const processedData = processResponseData(response.data, actionType);
      if (processedData) {
        const { token, user, newUser } = processedData;
        setCookie(AUTH_COOKIE, token, { path: '/' });
        setCookie(USER_COOKIE, user || newUser, { path: '/' });
        setCookie(LOGGED_IN_COOKIE, true, { path: '/' });
        setIsLoggedIn(true);
        setToken(token);
        setUser(user || newUser);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  axios.interceptors.request.use(
    (config) => {
      const token = cookies[AUTH_COOKIE];
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Login function
  const login = async (username, password) => {
    await executeAuthAction('Login', 'signin', { username, password });
  };

  // Signup function
  const signup = async (loginData, basicInfo, otherInfo) => {
    await executeAuthAction('Signup', 'signup', {
      login_data: loginData,
      basic_info: basicInfo,
      ...otherInfo,
    });
  };

  // Logout function
  const logout = () => {
    removeCookie(AUTH_COOKIE);
    setIsLoggedIn(false);
    setToken(null);
    setUser({});
  };

  const logoutTimerRef = useRef(null);

  // Function to start the logout timer
  const startLogoutTimer = () => {
    // Clear existing timer if any
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    // Set a new timer for 30 minutes (1800000 milliseconds)
    logoutTimerRef.current = setTimeout(() => {
      logout(); // Call your logout function
    }, 1800000);
  };

  const debouncedLogout = useCallback(
    debounce(() => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      logoutTimerRef.current = setTimeout(logout, 1800000); // 30 minutes
    }, 500),
    [logout] // Dependency for useCallback
  );

  const resetLogoutTimer = useCallback(() => {
    debouncedLogout();
  }, [debouncedLogout]);

  // Attach debounced event listeners for user activity
  useEffect(() => {
    const events = ['mousemove', 'keypress', 'scroll', 'click'];
    events.forEach((event) => window.addEventListener(event, resetLogoutTimer));

    return () => {
      clearTimeout(logoutTimerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, resetLogoutTimer)
      );
    };
  }, [resetLogoutTimer]);

  // Attach event listeners for user activity
  useEffect(() => {
    startLogoutTimer();

    window.addEventListener('mousemove', resetLogoutTimer);
    window.addEventListener('keypress', resetLogoutTimer);
    window.addEventListener('scroll', resetLogoutTimer);
    window.addEventListener('click', resetLogoutTimer);

    return () => {
      clearTimeout(logoutTimerRef.current);
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('keypress', resetLogoutTimer);
      window.removeEventListener('scroll', resetLogoutTimer);
      window.removeEventListener('click', resetLogoutTimer);
    };
  }, []);
  useEffect(() => {
    const storedToken = cookies[AUTH_COOKIE];
    const storedUser = cookies[USER_COOKIE];
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        authUser: user,
        error,
        token,
        updatedUser,
        logoutTimerRef,
        debouncedLogout,

        resetLogoutTimer,
        setIsLoading,
        setIsLoggedIn,
        setError,
        setToken,
        startLogoutTimer,
        setUpdatedUser,
        setUser,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// // Custom hook to use the AuthContext
// export const useAuthContext = () => {
//   const context = React.useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuthContext must be used within a AuthProvider');
//   }
//   return context;
// };
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
