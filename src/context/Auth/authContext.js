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

  // // Validate token
  // const validateToken = useCallback(async () => {
  //   // Validation logic here
  // }, []);

  // Initialization logic to set user and token from cookies
  useEffect(() => {
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
