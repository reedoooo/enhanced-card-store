import React, { useState, useEffect, useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const AuthContext = React.createContext();

export default function AuthProvider(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['auth', 'userCookie']);
  const [isLoading, setIsLoading] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [user, setUser] = useState({ capabilities: ['admin'] });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(undefined);

  const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

  const setLoginState = (loggedIn, token, user, error = null) => {
    setCookie('auth', token, {
      secure: true,
      sameSite: 'strict',
      capabilities: user.capabilities || ['admin'],
    });
    setCookie('userCookie', user, { secure: true, sameSite: 'strict' });
    setIsloggedin(loggedIn); // Updated here
    setToken(token);
    setUser(user);
    setError(error);
  };

  const validateToken = useCallback(
    async (token) => {
      setIsLoading(true);
      try {
        // const options = {
        //   method: 'GET',
        //   url: `${REACT_APP_SERVER}/api/users/profile`,
        //   headers: { Authorization: `Bearer ${token}` },
        // };
        const decodedUser = jwt_decode(token);
        setLoginState(true, token, decodedUser);

        const response = await axios.get(
          `${REACT_APP_SERVER}/api/users/profile`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setUser((prevUser) => ({
            ...prevUser,
            ...response.data,
            ...user.capabilities,
          }));
        }
      } catch (e) {
        setError('Token validation failed');
        setLoginState(false, null, {}, 'Token validation failed');
      } finally {
        setIsLoading(false);
      }
    },
    [REACT_APP_SERVER]
  );

  const can = (capability) =>
    user?.login_data?.role_data?.capabilities?.includes(capability);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/signin`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      validateToken(response.data.token);
      return response.data.token;
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
          login_data: {
            username,
            password,
            email,
            role_data,
          },
          basic_info,
        }
      );
      validateToken(response.data.token);
      return response.data.token;
    } catch (error) {
      setError('Signup failed');
      setLoginState(false, null, {}, 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeCookie('auth');
    removeCookie('userCookie');
    localStorage.removeItem('isloggedin');
    setLoginState(false, null, {});
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const tokenCheck = qs.get('token') || cookies.auth || null;
    if (tokenCheck) validateToken(tokenCheck);
  }, [validateToken, cookies.auth]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isloggedin,
        can,
        login,
        logout,
        signup,
        user,
        userId: user.id,
        error,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
