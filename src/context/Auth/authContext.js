import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';

const LOGGED_IN_COOKIE = 'loggedIn';
const AUTH_COOKIE = 'authToken';
const USER_COOKIE = 'user';

// Validator function
const validateData = (data, eventName, functionName) => {
  if (!data || Object.keys(data).length === 0) {
    console.warn(`Invalid data in ${functionName} for ${eventName}`);
    return false;
  }
  return true;
};

// Process the server response based on the action type (Login/Signup)
const processResponseData = (data, type) => {
  if (!validateData(data, `${type} Response`, `process${type}Data`))
    return null;

  if (type === 'Login') {
    const token = data?.data?.token;
    if (!token) return null;
    const user = jwt_decode(token);
    return { token, user };
  }

  if (type === 'Signup') {
    const { success, newUser } = data;
    if (success && newUser) return { success, newUser };
  }

  return null;
};

// Main AuthContext Provider
export const AuthContext = React.createContext();

export default function AuthProvider({ children, serverUrl }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    LOGGED_IN_COOKIE,
    AUTH_COOKIE,
    USER_COOKIE,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  // const isMounted = useRef(true);

  const REACT_APP_SERVER = serverUrl || process.env.REACT_APP_SERVER;

  // Execute authentication actions like login, signup
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
        setisLoggedIn(true);
        setToken(token);
        setUser(user || newUser);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // In App.js or inside AuthProvider component
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
    setisLoggedIn(false);
    setToken(null);
    setUser({});
  };

  // Validate token
  const validateToken = useCallback(async () => {
    // Validation logic here
  }, []);

  // Initialization logic to set user and token from cookies
  useEffect(() => {
    // if (!isMounted.current) return;

    const storedToken = cookies[AUTH_COOKIE];
    const storedUser = cookies[USER_COOKIE];

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setisLoggedIn(true);
    }

    // isMounted.current = false;
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import jwt_decode from 'jwt-decode';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useUtilityContext } from '../UtilityContext/UtilityContext';
// // Initialize constants
// const ONE_MINUTE = 60000;
// const AUTH_COOKIE = 'auth';
// const USER_COOKIE = 'userCookie';

// export const AuthContext = React.createContext();

// export default function AuthProvider({ children, serverUrl }) {
//   // State and Context Setup
//   const { directedResponses, fetchDirectedResponses } = useUtilityContext();
//   const [cookies, setCookie, removeCookie] = useCookies(['auth', 'userCookie']);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setisLoggedIn] = useState(false);
//   const [user, setUser] = useState({});
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [token, setToken] = useState(undefined);
//   const [loginAttempts, setLoginAttempts] = useState(0);
//   const [lastAttemptTime, setLastAttemptTime] = useState(null);

//   const REACT_APP_SERVER = serverUrl || process.env.REACT_APP_SERVER;
//   const isMounted = useRef(true);

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
//   // Handle Login Attempts
//   useEffect(() => {
//     if (loginAttempts >= 2) {
//       const timerId = setTimeout(() => {
//         setLoginAttempts(0);
//       }, 60000); // Reset after 1 minute
//       return () => clearTimeout(timerId);
//     }
//   }, [loginAttempts]);
//   // Initialize and Validate Token
//   useEffect(() => {
//     if (isMounted.current) {
//       const queryToken = new URLSearchParams(window.location.search).get(
//         'token'
//       );
//       const cookieToken = cookies.auth;
//       const activeToken = queryToken || cookieToken;
//       if (activeToken && activeToken !== token) {
//         validateToken(activeToken);
//       }
//     }
//   }, [validateToken, cookies.auth]);
//   // Utility Function to Set Login State
//   const setLoginState = useCallback(
//     (loggedIn, token, user, error = null) => {
//       setCookie('auth', token, { secure: true, sameSite: 'strict' });
//       setCookie('isLoggedIn', String(loggedIn), {
//         secure: true,
//         sameSite: 'strict',
//       });
//       setCookie(AUTH_COOKIE, token, { secure: true, sameSite: 'strict' });

//       if (user) {
//         setCookie('userCookie', JSON.stringify(user), {
//           secure: true,
//           sameSite: 'strict',
//         });
//       }
//       setisLoggedIn(loggedIn);
//       setToken(token);
//       setUser(user);
//       setError(error);
//     },
//     [setCookie]
//   );

//   const onLogin = async (username, password) => {
//     const currentTime = new Date().getTime();
//     const oneMinute = 60000; // 60 seconds * 1000 milliseconds

//     if (
//       loginAttempts < 2 ||
//       (lastAttemptTime && currentTime - lastAttemptTime > oneMinute)
//     ) {
//       // If under limit or last attempt was more than a minute ago, proceed
//       setLoginAttempts(loginAttempts + 1);
//       setLastAttemptTime(currentTime);

//       try {
//         const loginResult = await login(username, password);
//         if (loginResult?.loggedIn) {
//           if (onLogin) {
//             onLogin(); // Call the passed down function when login is successful
//           }
//         }
//         setisLoggedIn(loginResult?.loggedIn);
//         return loginResult;
//       } catch (error) {
//         console.error('Login failed:', error);
//       }
//     } else {
//       // If over the limit
//       setError('Too many login attempts. Please wait for 1 minute.');
//     }
//   };

//   // Reset the login attempts and time after a minute
//   useEffect(() => {
//     if (loginAttempts >= 2) {
//       const timerId = setTimeout(() => {
//         setLoginAttempts(0);
//       }, 60000); // 1 minute = 60000 milliseconds

//       return () => clearTimeout(timerId);
//     }
//   }, [loginAttempts]);

//   // In AuthProvider
//   const login = async (username, password) => {
//     console.log('Login method invoked');
//     setIsLoading(true);

//     try {
//       const signInResponse = await axios.post(
//         `${REACT_APP_SERVER}/api/users/signin`,
//         { username, password },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('Fetching directed responses...');
//       await fetchDirectedResponses();

//       // Do not call validateToken here.
//       return { loggedIn: isLoggedIn, token };
//     } catch (error) {
//       console.error(`Error during login: ${error}`);
//       setError('Login failed');
//       setLoginState(false, null, {}, 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validateToken = useCallback(async () => {
//     if (!isMounted.current) return;

//     setIsLoading(true);
//     try {
//       const latestSignInResponse = directedResponses.find(
//         (res) => res.eventType === 'SIGNIN'
//       );

//       if (
//         latestSignInResponse &&
//         latestSignInResponse.response.data.token !== token
//       ) {
//         const newToken = latestSignInResponse.response.data.token;
//         const decodedUser = jwt_decode(newToken);
//         setLoginState(true, newToken, decodedUser);
//       } else {
//         throw new Error('Token validation failed');
//       }
//     } catch (error) {
//       console.error(`Error during validateToken: ${error}`);

//       setError('Token validation failed');
//       setLoginState(false, null, {}, 'Token validation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [directedResponses, setLoginState, token]);

//   const signup = async (username, password, email, basic_info, role_data) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         `${REACT_APP_SERVER}/api/users/signup`,
//         {
//           login_data: { username, password, email, role_data },
//           basic_info,
//         }
//       );
//       await validateToken(response.data.token);
//       return response.data.token;
//     } catch (err) {
//       setError('Signup failed');
//       setLoginState(false, null, {}, 'Signup failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     removeCookie('auth');
//     removeCookie(AUTH_COOKIE);
//     setLoginState(false, null, {});
//     console.log('Logout method invoked');
//   };

//   // In AuthProvider
//   useEffect(() => {
//     if (isMounted.current) {
//       const queryToken = new URLSearchParams(window.location.search).get(
//         'token'
//       );
//       const cookieToken = cookies[AUTH_COOKIE];
//       const activeToken = queryToken || cookieToken;

//       if (activeToken && activeToken !== token) {
//         validateToken(activeToken);
//       }
//     }
//   }, [validateToken, cookies[AUTH_COOKIE]]);

//   const contextValue = {
//     isLoading: isLoading,
//     isLoggedIn: isLoggedIn,
//     user: users.find((u) => u.id === user.id) || user,
//     users,
//     error,
//     login,
//     onLogin, // Add this line to pass it down
//     logout,
//     signup,
//     setUser,
//     setLoginState,
//     validateToken,
//     // updateUser,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// }

// /**
//  * Handler function for processing login data.
//  *
//  * @param {Object} data - The data received from login API.
//  */
// function processLoginData(data) {
//   // Validate the data before processing
//   if (!validateData(data, 'Login Response', 'processLoginData')) {
//     console.warn('Invalid login data. Aborting processLoginData.');
//     return;
//   }

//   // Extract relevant fields from the received data
//   const { token, user } = data;

//   if (token && user) {
//     // Save token and user information to state or local storage
//     localStorage.setItem('authToken', token);
//     // Perform other login success logic here
//   } else {
//     console.error('Missing essential fields in login data.');
//   }
// }

// /**
//  * Handler function for processing signup data.
//  *
//  * @param {Object} data - The data received from signup API.
//  */
// function processSignupData(data) {
//   // Validate the data before processing
//   if (!validateData(data, 'Signup Response', 'processSignupData')) {
//     console.warn('Invalid signup data. Aborting processSignupData.');
//     return;
//   }

//   // Extract relevant fields from the received data
//   const { success, newUser } = data;

//   if (success && newUser) {
//     // Assume `newUser` contains essential user info
//     const { id, username } = newUser;

//     // Save the new user ID or perform other signup success logic here
//     // For example, redirect to login or a welcome page
//   } else {
//     console.error('Missing essential fields in signup data.');
//   }
// }

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import jwt_decode from 'jwt-decode';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useUtilityContext } from '../UtilityContext/UtilityContext';

// const LOGGED_IN_COOKIE = 'loggedIn';
// const AUTH_COOKIE = 'authToken';
// const USER_COOKIE = 'user';

// const processResponseData = (data, type) => {
//   if (!validateData(data, `${type} Response`, `process${type}Data`)) {
//     console.warn(
//       `Invalid ${type.toLowerCase()} data. Aborting process${type}Data.`
//     );
//     return;
//   }

//   if (type === 'Login') {
//     const token = data?.data?.token;
//     if (token) {
//       localStorage.setItem('authToken', token);
//       const decodedUser = jwt_decode(token);
//       return { token, user: decodedUser };
//     }
//   } else if (type === 'Signup') {
//     const { success, newUser } = data;
//     if (success && newUser) {
//       return { success, newUser };
//     }
//   }

//   console.error(`Missing essential fields in ${type.toLowerCase()} data.`);
//   return null;
// };
// const isEmpty = (obj) => {
//   return (
//     [Object, Array].includes((obj || {}).constructor) &&
//     !Object.entries(obj || {}).length
//   );
// };
// // Validator function
// const validateData = (data, eventName, functionName) => {
//   const dataType = typeof data;
//   console.log(
//     `[Info] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}`
//   );

//   if (data === null || data === undefined) {
//     console.warn(
//       `[Warning] Received null or undefined data in ${functionName} triggered by event: ${eventName}`
//     );
//     return false;
//   }

//   if (isEmpty(data)) {
//     console.error(
//       `[Error] Received empty data object or array in ${functionName} triggered by event: ${eventName}`
//     );
//     return false;
//   }

//   return true;
// };

// export const AuthContext = React.createContext();

// const setCookies = (
//   setCookieFunc,
//   authCookie,
//   userCookie,
//   loggedInCookie,
//   loggedIn,
//   token,
//   user
// ) => {
//   setCookieFunc(authCookie, token);
//   setCookieFunc(userCookie, JSON.stringify(user));
//   setCookieFunc(loggedInCookie, String(loggedIn));
// };
// export default function AuthProvider({ children, serverUrl }) {
//   const { directedResponses, fetchDirectedResponses } = useUtilityContext();
//   const [cookies, setCookie, removeCookie] = useCookies([
//     LOGGED_IN_COOKIE,
//     AUTH_COOKIE,
//     USER_COOKIE,
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setisLoggedIn] = useState(false);
//   const [user, setUser] = useState({});
//   const [error, setError] = useState(null);
//   const [token, setToken] = useState(undefined);
//   const isMounted = useRef(true);
//   const [loginAttempts, setLoginAttempts] = useState(0);

//   const REACT_APP_SERVER = serverUrl || process.env.REACT_APP_SERVER;

//   useEffect(
//     () => () => {
//       isMounted.current = false;
//     },
//     []
//   );

//   const setLoginState = useCallback(
//     (loggedIn, token, user, error = null) => {
//       setCookie(AUTH_COOKIE, token);
//       setCookie(USER_COOKIE, JSON.stringify(user));
//       setCookie(LOGGED_IN_COOKIE, String(loggedIn));
//       setisLoggedIn(loggedIn);
//       setToken(token);
//       setUser(user);
//       setError(error);
//     },
//     [setCookie]
//   );

//   const resetLoginAttempts = () =>
//     loginAttempts >= 2 && setTimeout(() => setLoginAttempts(0), 60000);
//   useEffect(resetLoginAttempts, [loginAttempts]);

//   const updateLoginState = useCallback(
//     (loggedIn, token, user, error = null) => {
//       setCookies(
//         setCookie,
//         AUTH_COOKIE,
//         USER_COOKIE,
//         LOGGED_IN_COOKIE,
//         loggedIn,
//         token,
//         user
//       );
//       setisLoggedIn(loggedIn);
//       setToken(token);
//       setUser(user);
//       setError(error);
//     },
//     [setCookie]
//   );

//   const validateToken = useCallback(async () => {
//     if (!isMounted.current) return;

//     setIsLoading(true);
//     try {
//       const latestSignInResponse = directedResponses.find(
//         (res) => res.eventType === 'SIGNIN'
//       );

//       if (
//         latestSignInResponse &&
//         latestSignInResponse.response.data.token !== token
//       ) {
//         const newToken = latestSignInResponse.response.data.token;
//         const decodedUser = jwt_decode(newToken);
//         setLoginState(true, newToken, decodedUser);
//       } else {
//         throw new Error('Token validation failed');
//       }
//     } catch (error) {
//       setError('Token validation failed');
//       setLoginState(false, null, {}, 'Token validation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [directedResponses, setLoginState, token]);
//   useEffect(() => {
//     const queryToken = new URLSearchParams(window.location.search).get('token');
//     const cookieToken = cookies[AUTH_COOKIE];
//     const activeToken = queryToken || cookieToken;
//     if (activeToken && activeToken !== token) {
//       validateToken(activeToken);
//     }
//   }, [validateToken, cookies[AUTH_COOKIE]]);

//   const safeRequest = useCallback(async (apiEndpoint, data, methodName) => {
//     try {
//       if (!validateData(data, apiEndpoint, methodName)) {
//         throw new Error(`Invalid data sent to API endpoint: ${apiEndpoint}`);
//       }
//       const response = await axios.post(apiEndpoint, data);
//       if (!validateData(response, apiEndpoint, methodName)) {
//         throw new Error(
//           `Invalid data received from API endpoint: ${apiEndpoint}`
//         );
//       }
//       return response.data;
//     } catch (error) {
//       console.error(`[Error] Failed to send request to: ${apiEndpoint}`, error);
//       setError({ message: error.message, source: methodName });
//       return null;
//     }
//   }, []);

//   const safeResponse = useCallback((data, eventName, handler) => {
//     try {
//       if (!validateData(data, eventName, handler.name)) {
//         throw new Error(`Invalid data received for event: ${eventName}`);
//       }
//       return handler(data);
//     } catch (error) {
//       console.error(`[Error] Failed to handle event: ${eventName}`, error);
//       setError({ message: error.message, source: eventName });
//       return null;
//     }
//   }, []);

//   const executeAuthAction = async (actionType, url, requestData) => {
//     const response = await safeRequest(
//       `${REACT_APP_SERVER}/api/users/${url}`,
//       requestData,
//       actionType.toLowerCase()
//     );

//     if (response) {
//       const processedData = safeResponse(
//         response,
//         actionType.toLowerCase(),
//         (data) => processResponseData(data, actionType)
//       );
//       if (processedData) {
//         setLoginState(
//           true,
//           processedData.token || null,
//           processedData.user || processedData.newUser || {}
//         );
//       }
//     }
//   };

//   const login = async (username, password) => {
//     const requestData = { username, password };
//     await executeAuthAction('Login', 'signin', requestData);
//   };

//   const signup = async (loginData, basicInfo, otherInfo) => {
//     const requestData = {
//       login_data: loginData,
//       basic_info: basicInfo,
//       ...otherInfo,
//     };
//     await executeAuthAction('Signup', 'signup', requestData);
//   };

//   const logout = () => {
//     removeCookie('auth');
//     removeCookie(AUTH_COOKIE);
//     setLoginState(false, null, {});
//     console.log('Logout method invoked');
//   };
//   // Add this in your Header component
//   useEffect(() => {
//     console.log('Value of isLoggedIn from context: ', isLoggedIn);
//   }, [isLoggedIn]);

//   useEffect(() => {
//     if (isMounted.current) {
//       const queryToken = new URLSearchParams(window.location.search).get(
//         'token'
//       );
//       const cookieToken = cookies[AUTH_COOKIE];
//       const activeToken = queryToken || cookieToken;

//       if (activeToken && activeToken !== token) {
//         validateToken(activeToken);
//       }
//     }
//   }, [validateToken, cookies[AUTH_COOKIE]]);

//   const contextValue = {
//     isLoading,
//     isLoggedIn,
//     user,
//     // users,
//     error,
//     login,
//     // onLogin,
//     logout,
//     signup,
//     setUser,
//     setLoginState,
//     validateToken,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// }
