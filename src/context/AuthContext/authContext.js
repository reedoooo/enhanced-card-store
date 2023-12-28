import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { processResponseData } from './helpers';
import { usePageContext } from '../PageContext/PageContext';

export const AuthContext = React.createContext();

export default function AuthProvider({ children, serverUrl }) {
  const { setLoading } = usePageContext();
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'isLoggedIn',
    'userId',
    'authUser',
    'authToken',
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [token, setToken] = useState(cookies.authToken);
  const logoutTimerRef = useRef(null);

  const REACT_APP_SERVER = serverUrl || process.env.REACT_APP_SERVER;

  const executeAuthAction = async (actionType, url, requestData) => {
    setLoading('isPageLoading', true);
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/${url}`,
        requestData
      );
      console.log('Response:', response);
      const processedData = processResponseData(response, actionType);
      if (response.status === 200 || response.status === 201) {
        const { token, userData, authData, message, data } = processedData;
        console.log('Processed Data Message: ', message);
        console.log('Processed User Data: ', userData);
        setToken(token);
        setUser(userData);
        setAuthUser(authData);
        setResponseData(data);
        setIsLoggedIn(true);
        setCookie('authToken', token, { path: '/' });
        setCookie('authUser', authData, { path: '/' });
        setCookie('user', userData, { path: '/' });
        setCookie('isLoggedIn', true, { path: '/' });
        setCookie('userId', authData?.id, { path: '/' });
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading('isPageLoading', false);
    }
  };

  const logout = useCallback(() => {
    removeCookie('authToken');
    removeCookie('user');
    removeCookie('authUser');
    removeCookie('isLoggedIn');
    removeCookie('userId');

    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  }, [removeCookie]);

  const resetLogoutTimer = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(logout, 2700000); // 45 minutes
  }, [logout]);

  useEffect(() => {
    if (token) {
      resetLogoutTimer();
    }
  }, [token, resetLogoutTimer]);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [token]);

  const login = async (username, password) => {
    await executeAuthAction('signin', 'signin', {
      userSecurityData: { username, password },
    });
  };

  const signup = async (securityData, basicData) => {
    await executeAuthAction('signup', 'signup', {
      userSecurityData: securityData,
      userBasicData: basicData,
    });
  };

  useEffect(() => {
    const storedToken = cookies['authToken'];
    const storedUser = cookies['user'];
    const storedAuthUser = cookies['authUser'];
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsLoggedIn(true);
      resetLogoutTimer();
    }
  }, [cookies, resetLogoutTimer]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        authUser,
        token,
        user,
        responseData,

        login,
        signup,
        logout,
        resetLogoutTimer,
        setUser,
        setIsLoggedIn,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useContext,
// } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { debounce } from 'lodash';
// import {
//   AUTH_COOKIE,
//   AUTH_USER_COOKIE,
//   LOGGED_IN_COOKIE,
//   USER_COOKIE,
//   USER_ID_COOKIE,
//   processResponseData,
// } from './helpers';
// import { usePageContext } from '../PageContext/PageContext';

// export const AuthContext = React.createContext();

// export default function AuthProvider({ children, serverUrl }) {
//   const { setLoading, loadingStatus } = usePageContext();
//   const [cookies, setCookie, removeCookie] = useCookies([
//     LOGGED_IN_COOKIE,
//     AUTH_COOKIE,
//     USER_COOKIE,
//     USER_ID_COOKIE,
//     AUTH_USER_COOKIE,
//   ]);
//   // const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState({
//     username: '',
//     userBasicData: {
//       firstName: '',
//       lastName: '',
//       userId: '',
//     },
//     userSecurityData: {
//       username: '',
//       password: '',
//       email: '',
//       phone: '',
//       role_data: {
//         name: '',
//         capabilities: [],
//       },
//     },
//     allDecks: [],
//     allCollections: [],
//     cart: {},
//   });
//   const [updatedUser, setUpdatedUser] = useState({});
//   const [token, setToken] = useState(null);
//   const [error, setError] = useState(null);
//   const [minutes, setMinutes] = useState(0);
//   const [logoutExpires, setLogoutExpires] = useState();
//   const logoutTimerRef = useRef(null);
//   const expires = new Date();
//   const REACT_APP_SERVER = serverUrl || process.env.REACT_APP_SERVER;

//   // Logout Function
//   const logout = useCallback(() => {
//     console.log('User is logged out');
//     removeCookie(AUTH_COOKIE);
//     removeCookie(USER_COOKIE);
//     removeCookie(AUTH_USER_COOKIE);
//     removeCookie(LOGGED_IN_COOKIE);
//     removeCookie(USER_ID_COOKIE);
//     setIsLoggedIn(false);
//     setUser({});
//     setToken(null);
//     if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//   }, [removeCookie]);

//   // Reset Logout Timer
//   const resetLogoutTimer = useCallback(() => {
//     if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//     logoutTimerRef.current = setTimeout(logout, 45 * 60 * 1000); // 45 minutes
//   }, [logout]);

//   // Execute Authentication Action
//   const executeAuthAction = async (actionType, url, requestData) => {
//     try {
//       const response = await axios.post(
//         `${serverUrl}/api/users/${url}`,
//         requestData
//       );
//       const processedData = processResponseData(response, actionType);

//       console.log('Processed Data: ', processedData);
//       if (response.status === 200 || response.status === 201) {
//         const { token, authData } = processedData; // Make sure this data is correctly retrieved
//         setCookie(AUTH_COOKIE, token, { path: '/' });
//         setCookie(USER_COOKIE, authData, { path: '/' });
//         setCookie(AUTH_USER_COOKIE, authData.userSecurityData, { path: '/' });
//         setCookie(LOGGED_IN_COOKIE, true, { path: '/' });
//         setCookie(USER_ID_COOKIE, authData.userSecurityData.userId, {
//           path: '/',
//         });
//         setIsLoggedIn(true);
//         setUser(authData);
//         setToken(token);
//         resetLogoutTimer();
//       }
//       return processedData;
//     } catch (error) {
//       setError(error);
//     }
//   };
//   // Set axios interceptors
//   axios.interceptors.request.use(
//     (config) => {
//       const authToken = cookies[AUTH_COOKIE];
//       if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   useEffect(() => {
//     if (isLoggedIn) {
//       resetLogoutTimer();
//     }
//   }, [isLoggedIn, resetLogoutTimer]);

//   const signup = async (securityData, basicData) => {
//     const data = await executeAuthAction('signup', 'signup', {
//       userSecurityData: securityData,
//       userBasicData: basicData,
//     });
//     // resetLogoutTimer();
//     return data;
//   };
//   const login = async (username, password) => {
//     const data = await executeAuthAction('signin', 'signin', {
//       userSecurityData: { username: username, password: password },
//     });
//     console.log('User ' + username + ' is logged in');
//     // resetLogoutTimer();
//     return data;
//   };

//   useEffect(() => {
//     const handleUserActivity = debounce(resetLogoutTimer, 1000);
//     const events = ['mousemove', 'keypress', 'scroll', 'click'];

//     events.forEach((event) =>
//       window.addEventListener(event, handleUserActivity)
//     );

//     return () => {
//       events.forEach((event) =>
//         window.removeEventListener(event, handleUserActivity)
//       );
//       handleUserActivity.cancel();
//       if (logoutTimerRef?.current) clearTimeout(logoutTimerRef?.current);
//     };
//   }, [resetLogoutTimer, logoutTimerRef]);
//   // Check for stored tokens and user data in cookies
//   // Initialize user and token from cookies
//   useEffect(() => {
//     const storedToken = cookies[AUTH_COOKIE];
//     const storedUser = cookies[USER_COOKIE];
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(storedUser);
//       setIsLoggedIn(true);
//       resetLogoutTimer();
//     }
//   }, [cookies, resetLogoutTimer]);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         authUser: user,
//         error,
//         token,
//         updatedUser,
//         logoutTimerRef,
//         // debouncedLogout,
//         resetLogoutTimer,
//         // startLogoutTimer,
//         logout,
//         setIsLoggedIn,
//         setError,
//         setToken,
//         setUpdatedUser,
//         setUser,
//         login,
//         signup,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// };
// // Attach event listeners for user activity
// // useEffect(() => {
// //   startLogoutTimer();

// //   window.addEventListener('mousemove', resetLogoutTimer);
// //   window.addEventListener('keypress', resetLogoutTimer);
// //   window.addEventListener('scroll', resetLogoutTimer);
// //   window.addEventListener('click', resetLogoutTimer);

// //   return () => {
// //     clearTimeout(logoutTimerRef.current);
// //     window.removeEventListener('mousemove', resetLogoutTimer);
// //     window.removeEventListener('keypress', resetLogoutTimer);
// //     window.removeEventListener('scroll', resetLogoutTimer);
// //     window.removeEventListener('click', resetLogoutTimer);
// //   };
// // }, []);
