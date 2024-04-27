// /* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { defaultContextValue } from '../../defaultContextValues';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useUserData from '../UserContext/useUserData';
import useManageCookies from '../../hooks/useManageCookies';
import useAuthManager from './useAuthManager';

export const AuthContext = createContext(defaultContextValue.AUTH_CONTEXT);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { getCookie } = useManageCookies();
  const { user, handleRemoveUser } = useUserData();
  const { login, logout, signup } = useAuthManager();
  const { accessToken, isLoggedIn, authUser } = getCookie([
    'accessToken',
    'isLoggedIn',
    'authUser',
  ]);
  const checkTokenValidity = useCallback(() => {
    console.log('Checking token validity...', { accessToken });
    if (!accessToken) {
      navigate('/login');
      return;
    }
    try {
      const { exp } = jwt_decode(accessToken);
      const isTokenExpired = Date.now() >= exp * 1000;
      if (isTokenExpired) {
        logout();
        handleRemoveUser();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
    }
  }, [user.accessToken]);
  useEffect(() => {
    if (!isLoggedIn) return;
    checkTokenValidity();
  }, [checkTokenValidity]);

  const contextValue = useMemo(
    () => ({
      ...user,
      isLoggedIn:
        process.env.AUTH_ENVIRONMENT !== 'disabled' ? !!user.accessToken : true,
      login,
      signup,
      logout,
    }),
    [login, signup, logout, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
