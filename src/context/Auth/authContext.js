import React, { useEffect, useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { loadSavedCards } from '../../store/reducers/cart';
import { useCookies } from 'react-cookie';

export const AuthContext = React.createContext();

export default function AuthProvider(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['auth', 'userCookie']);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({ capabilities: [] });
  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(undefined);
  const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

  // Use dispatch in the top level of your component
  // const dispatch = useDispatch();
  const setLoginState = (loggedIn, token, user, error) => {
    setCookie('auth', token);
    setCookie('userCookie', user);
    setIsLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error || null);
  };

  const validateToken = useCallback(async (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, validUser);

      const options = {
        method: 'GET',
        url: `${REACT_APP_SERVER}/api/users/profile`,
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios(options);
      console.log('Validate token response: ', response.data);
      if (response.status === 200) {
        setUser((prevUser) => ({ ...prevUser, ...response.data }));
      }
    } catch (e) {
      console.error('Token validation error: ', e);
      setLoginState(false, null, {}, e);
    }
  }, []);

  const can = (capability) =>
    user?.login_data?.role_data?.capabilities?.includes(capability);

  const login = async (username, password) => {
    const login_data = { username, password };

    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/signin`,
        login_data
      );
      console.log('Login response: ', response.data);
      validateToken(response.data.token);
      console.log('response', response.data);
      // Dispatch the loadSavedCards action after successfully logging in
      // dispatch(loadSavedCards(response.data._id)); // replace `id` with your user id field

      return response.data.token;
    } catch (error) {
      console.error('Login error: ', error);
      setLoginState(false, null, {}, error);
    }
  };

  const signup = async (username, password, email, basic_info, role_data) => {
    const data = {
      login_data: {
        username,
        password,
        email, // get email directly
        role_data, // Add this default value or pass role_data when calling this function
      },
      basic_info,
    };
    console.log('Signup data: ', data);
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/signup`,
        data
      );
      console.log('Signup response: ', response.data);
      validateToken(response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Signup error: ', error);
      setLoginState(false, null, {}, error);
    }
  };

  const logout = () => {
    removeCookie('auth');
    removeCookie('userCookie');
    setLoginState(false, null, {});
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const tokenCheck = qs.get('token') || cookies.auth || null;
    validateToken(tokenCheck);
  }, [validateToken]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
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

// module.exports = AuthContext;
// module.exports = { AuthProvider, AuthContext };
