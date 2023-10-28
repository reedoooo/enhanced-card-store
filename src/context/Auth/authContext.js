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
//   const [isloggedin, setIsloggedin] = useState(false);
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
//       setCookie('isloggedin', String(loggedIn), {
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
//       setIsloggedin(loggedIn);
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
//         setIsloggedin(loginResult?.loggedIn);
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
//       return { loggedIn: isloggedin, token };
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
//     isloggedin: isloggedin,
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
import React, { useState, useEffect, useCallback, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUtilityContext } from '../UtilityContext/UtilityContext';

const ONE_MINUTE = 60000;
const AUTH_COOKIE = 'auth';
const USER_COOKIE = 'userCookie';
const LOGGED_IN_COOKIE = 'isloggedin';
const processLoginData = (data) => {
  // Validate the data before processing
  if (!validateData(data, 'Login Response', 'processLoginData')) {
    console.warn('Invalid login data. Aborting processLoginData.');
    return;
  }

  // Extract relevant fields from the received data
  const token = data?.data?.token; // Navigate through nested object

  if (token) {
    // Save token to local storage
    localStorage.setItem('authToken', token);
    // Decode user information if it's included in the token
    const decodedUser = jwt_decode(token);
    // Perform other login success logic here
    return { token, user: decodedUser };
  } else {
    console.error('Missing essential fields in login data.');
    return null;
  }
};

const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};
const processSignupData = (data) => {
  // Validate the data before processing
  if (!validateData(data, 'Signup Response', 'processSignupData')) {
    console.warn('Invalid signup data. Aborting processSignupData.');
    return;
  }

  // Extract relevant fields from the received data
  const { success, newUser } = data;

  if (success && newUser) {
    // Assume `newUser` contains essential user info
    const { id, username } = newUser;

    // Save the new user ID or perform other signup success logic here
    // For example, redirect to login or a welcome page
  } else {
    console.error('Missing essential fields in signup data.');
  }
};
// Validator function
const validateData = (data, eventName, functionName) => {
  const dataType = typeof data;
  console.log(
    `[Info] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}`
  );

  if (data === null || data === undefined) {
    console.warn(
      `[Warning] Received null or undefined data in ${functionName} triggered by event: ${eventName}`
    );
    return false;
  }

  if (isEmpty(data)) {
    console.error(
      `[Error] Received empty data object or array in ${functionName} triggered by event: ${eventName}`
    );
    return false;
  }

  return true;
};

export const AuthContext = React.createContext();

export default function AuthProvider({ children, serverUrl }) {
  const { directedResponses, fetchDirectedResponses } = useUtilityContext();
  const [cookies, setCookie, removeCookie] = useCookies([
    LOGGED_IN_COOKIE,
    AUTH_COOKIE,
    USER_COOKIE,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(undefined);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(null);

  const REACT_APP_SERVER = serverUrl || process.env.REACT_APP_SERVER;
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  // Utilities
  const setLoginState = useCallback(
    (loggedIn, token, user, error = null) => {
      updateCookies(
        [AUTH_COOKIE, USER_COOKIE, LOGGED_IN_COOKIE],
        [token, JSON.stringify(user), String(loggedIn)]
      );
      setIsloggedin(loggedIn);
      setToken(token);
      setUser(user);
      setError(error);
    },
    [setCookie]
  );

  const updateCookies = (names, values) => {
    names.forEach((name, index) =>
      setCookie(name, values[index], { secure: true, sameSite: 'strict' })
    );
  };

  const resetLoginAttempts = () =>
    loginAttempts >= 2 && setTimeout(() => setLoginAttempts(0), 60000);
  useEffect(resetLoginAttempts, [loginAttempts]);

  // useEffect(() => {
  //   if (loginAttempts >= 2) {
  //     const timerId = setTimeout(() => {
  //       setLoginAttempts(0);
  //     }, 60000); // Reset after 1 minute
  //     return () => clearTimeout(timerId);
  //   }
  // }, [loginAttempts]);

  // Validate the token
  const validateToken = useCallback(async () => {
    if (!isMounted.current) return;

    setIsLoading(true);
    try {
      const latestSignInResponse = directedResponses.find(
        (res) => res.eventType === 'SIGNIN'
      );

      if (
        latestSignInResponse &&
        latestSignInResponse.response.data.token !== token
      ) {
        const newToken = latestSignInResponse.response.data.token;
        const decodedUser = jwt_decode(newToken);
        setLoginState(true, newToken, decodedUser);
      } else {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      setError('Token validation failed');
      setLoginState(false, null, {}, 'Token validation failed');
    } finally {
      setIsLoading(false);
    }
  }, [directedResponses, setLoginState, token]);

  // Initialize and Validate Token
  const initializeAndValidateToken = useCallback(() => {
    if (isMounted.current) {
      const queryToken = new URLSearchParams(window.location.search).get(
        'token'
      );
      const cookieToken = cookies[AUTH_COOKIE];
      const activeToken = queryToken || cookieToken;

      if (activeToken && activeToken !== token) {
        validateToken(activeToken);
      }
    }
  }, [validateToken, cookies[AUTH_COOKIE]]);

  useEffect(initializeAndValidateToken, [cookies[AUTH_COOKIE]]);

  // Utility functions
  const safeRequest = useCallback(async (apiEndpoint, data, methodName) => {
    try {
      if (!validateData(data, apiEndpoint, methodName)) {
        throw new Error(`Invalid data sent to API endpoint: ${apiEndpoint}`);
      }
      const response = await axios.post(apiEndpoint, data);
      if (!validateData(response, apiEndpoint, methodName)) {
        throw new Error(
          `Invalid data received from API endpoint: ${apiEndpoint}`
        );
      }
      return response.data;
    } catch (error) {
      console.error(`[Error] Failed to send request to: ${apiEndpoint}`, error);
      setError({ message: error.message, source: methodName });
      return null;
    }
  }, []);
  const safeResponse = useCallback((data, eventName, handler) => {
    try {
      if (!validateData(data, eventName, handler.name)) {
        throw new Error(`Invalid data received for event: ${eventName}`);
      }
      return handler(data);
    } catch (error) {
      console.error(`[Error] Failed to handle event: ${eventName}`, error);
      setError({ message: error.message, source: eventName });
      return null;
    }
  }, []);
  const login = async (username, password) => {
    const requestData = { username, password };

    const response = await safeRequest(
      `${REACT_APP_SERVER}/api/users/signin`,
      requestData,
      'login'
    );

    if (response) {
      const processedData = safeResponse(response, 'login', processLoginData);
      console.log('PROCESSED DATA:', processedData);
      if (processedData) {
        setLoginState(true, processedData.token, processedData.user);
      }
    }
  };
  // Action: Handle successful login
  const onLogin = (isloggedin, userData) => {
    setIsloggedin(isloggedin);
    setUser(userData);
  };

  const signup = async (loginData, basicInfo, otherInfo) => {
    const requestData = {
      login_data: loginData,
      basic_info: basicInfo,
      ...otherInfo,
    };

    const response = await safeRequest(
      `${REACT_APP_SERVER}/api/signup`,
      requestData,
      'signup'
    );

    if (response) {
      const processedData = safeResponse(response, 'signup', processSignupData);
      if (processedData) {
        // Logic to set the login state here
        setLoginState(true, processedData.token, processedData.user);
      }
    }
  };

  const logout = () => {
    removeCookie('auth');
    removeCookie(AUTH_COOKIE);
    setLoginState(false, null, {});
    console.log('Logout method invoked');
  };

  // In AuthProvider
  useEffect(() => {
    if (isMounted.current) {
      const queryToken = new URLSearchParams(window.location.search).get(
        'token'
      );
      const cookieToken = cookies[AUTH_COOKIE];
      const activeToken = queryToken || cookieToken;

      if (activeToken && activeToken !== token) {
        validateToken(activeToken);
      }
    }
  }, [validateToken, cookies[AUTH_COOKIE]]);

  const contextValue = {
    isLoading,
    isloggedin,
    user,
    users,
    error,
    login,
    onLogin,
    logout,
    signup,
    setUser,
    setLoginState,
    validateToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
