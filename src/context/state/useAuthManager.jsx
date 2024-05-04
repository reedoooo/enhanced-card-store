import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useFetchWrapper from '../hooks/useFetchWrapper';
import useManageCookies from '../hooks/useManageCookies';
import useUserData from './useUserData';
import jwt_decode from 'jwt-decode';

function useAuthManager() {
  const navigate = useNavigate();
  const { addCookies, getCookie, deleteCookies } = useManageCookies();
  const { authUser, isLoggedIn, accessToken, refreshToken } = getCookie([
    'authUser',
    'isLoggedIn',
    'accessToken',
    'refreshToken',
  ]);
  const { handleSetUser, handleRemoveUser, user } = useUserData();
  const { fetchWrapper } = useFetchWrapper();
  const [loggingOut, setLoggingOut] = useState(false);
  const setAuthCookies = useCallback(
    (data) => {
      const { accessToken, refreshToken } = data;
      const authData = jwtDecode(accessToken);
      addCookies(
        ['accessToken', 'refreshToken', 'isLoggedIn', 'authUser', 'userId'],
        [accessToken, refreshToken, true, authData, authData.userId],
        { path: '/' }
      );
      handleSetUser(authData); // Adjust according to your implementation
      navigate('/home');
    },
    [handleSetUser, navigate]
  );

  const clearAuthCookies = useCallback(() => {
    deleteCookies([
      'accessToken',
      'refreshToken',
      'userId',
      'authUser',
      'isLoggedIn',
    ]);
    localStorage.clear(); // Clear all local storage data
    navigate('/login');
  }, [navigate, deleteCookies]);

  const decodeAndSetUser = useCallback(
    (accessToken) => {
      const decoded = jwtDecode(accessToken);
      handleSetUser(decoded); // Adjust according to your implementation
    },
    [handleSetUser]
  );

  const executeAuthAction = useCallback(
    async (endpoint, requestData) => {
      try {
        const responseData = await fetchWrapper(
          `${process.env.REACT_APP_SERVER}/api/users/${endpoint}`,
          'POST',
          requestData,
          `${endpoint}`
        );
        if (!responseData?.data) throw new Error('Invalid response structure');
        if (endpoint === 'signout') {
          console.log(responseData?.message);
        } else {
          console.log(responseData?.data);
          setAuthCookies(responseData.data);
        }
        setAuthCookies(responseData.data);
      } catch (error) {
        console.error('Auth action error:', error);
      }
    },
    [fetchWrapper, setAuthCookies]
  );

  const login = useCallback(
    async (formData) => {
      const { username, password } = formData;
      await executeAuthAction('signin', {
        userSecurityData: { username, password },
      });
    },
    [executeAuthAction]
  );

  const signup = useCallback(
    async (formData) => {
      const { username, password, firstName, lastName, email } = formData;
      await executeAuthAction('signup', {
        userSecurityData: { firstName, lastName, username, password, email },
      });
    },
    [executeAuthAction]
  );

  const logout = useCallback(async () => {
    await executeAuthAction('signout', {
      userId: authUser.userId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    clearAuthCookies();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !accessToken) return;
    if (accessToken) {
      decodeAndSetUser(accessToken);
    }
  }, []);
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
        setLoggingOut(true);
        handleRemoveUser();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      // logout();
    }
  }, [user.accessToken]);
  useEffect(() => {
    if (!isLoggedIn) return;
    checkTokenValidity();
  }, [checkTokenValidity]);

  return { login, logout, signup };
}

export default useAuthManager;
