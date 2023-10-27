import React, { useState, useEffect, useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUtilityContext } from '../UtilityContext/UtilityContext';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['auth', 'userCookie']);
  const [isLoading, setIsLoading] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(undefined);
  const { directedResponses, fetchDirectedResponses } = useUtilityContext();

  const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

  // const updateUser = useCallback((newUser) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((u) => (u.id === newUser.id ? newUser : u))
  //   );
  // }, []);

  const setLoginState = useCallback(
    (loggedIn, token, user, error = null) => {
      setCookie('auth', token, { secure: true, sameSite: 'strict' });
      if (user) {
        setCookie('userCookie', JSON.stringify(user), {
          secure: true,
          sameSite: 'strict',
        });
      }
      setIsloggedin(loggedIn);
      setToken(token);
      setUser(user);
      setError(error);
    },
    [setCookie]
  );

  const validateToken = useCallback(async () => {
    setIsLoading(true);
    try {
      const latestSignInResponse = directedResponses.find(
        (res) => res.eventType === 'SIGNIN'
      );

      if (latestSignInResponse) {
        const decodedUser = jwt_decode(
          latestSignInResponse.response.data.token
        );
        setLoginState(
          true,
          latestSignInResponse.response.data.token,
          decodedUser
        );
      } else {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      setError('Token validation failed');
      setLoginState(false, null, {}, 'Token validation failed');
    } finally {
      setIsLoading(false);
    }
  }, [directedResponses, setLoginState]);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${REACT_APP_SERVER}/api/users/signin`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchDirectedResponses(); // Update directedResponses in utilityContext

      validateToken();
      return {
        loggedIn: true,
        token,
      };
    } catch (error) {
      setError('Login failed');
      setLoginState(false, null, {}, 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username, password, email, basic_info, role_data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/signup`,
        {
          login_data: { username, password, email, role_data },
          basic_info,
        }
      );
      await validateToken(response.data.token);
      return response.data.token;
    } catch (err) {
      setError('Signup failed');
      setLoginState(false, null, {}, 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeCookie('auth');
    setLoginState(false, null, {});
  };

  // Add logs to see what is triggering the useEffect
  useEffect(() => {
    console.log('validateToken or cookies.auth changed, triggering useEffect');
    const token =
      new URLSearchParams(window.location.search).get('token') || cookies.auth;
    if (token) validateToken(token);
  }, [validateToken, cookies.auth]);

  const contextValue = {
    isLoading,
    isloggedin,
    user: users.find((u) => u.id === user.id) || user,
    users,
    error,
    login,
    logout,
    signup,
    setUser,
    setLoginState,
    validateToken,
    // updateUser,
  };
  useEffect(() => {
    console.log('AUTH CONTEXT VALUE:', contextValue);
  }, [
    // isLoading,
    // isloggedin,
    // user,
    // users,
    // error,
    login,
    logout,
    signup,
    // setUser,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
