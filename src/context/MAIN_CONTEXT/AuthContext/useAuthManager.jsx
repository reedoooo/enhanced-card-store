import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import useManageCookies from '../../hooks/useManageCookies';
import useUserData from '../UserContext/useUserData';

function useAuthManager() {
  const navigate = useNavigate();
  const { addCookies, getCookie, deleteCookies } = useManageCookies();
  const { authUser, isLoggedIn, accessToken } = getCookie([
    'authUser',
    'isLoggedIn',
    'accessToken',
  ]);
  const { handleSetUser } = useUserData();
  const { fetchWrapper } = useFetchWrapper();

  const setAuthCookies = useCallback(
    (data) => {
      const { accessToken, refreshToken } = data;
      const authData = jwt_decode(accessToken);
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
    navigate('/login');
  }, []);

  const decodeAndSetUser = useCallback(
    (accessToken) => {
      const decoded = jwt_decode(accessToken);
      handleSetUser(decoded); // Adjust according to your implementation
    },
    [handleSetUser]
  );

  const executeAuthAction = useCallback(
    async (actionType, url, requestData) => {
      try {
        const responseData = await fetchWrapper(
          `${process.env.REACT_APP_SERVER}/api/users/${url}`,
          'POST',
          requestData,
          `${url}`
        );
        if (!responseData?.data) throw new Error('Invalid response structure');
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
      await executeAuthAction('login', 'signin', {
        userSecurityData: { username, password },
      });
    },
    [executeAuthAction]
  );

  const signup = useCallback(
    async (formData) => {
      const { username, password, firstName, lastName, email } = formData;
      await executeAuthAction('signup', 'signup', {
        userSecurityData: { firstName, lastName, username, password, email },
      });
    },
    [executeAuthAction]
  );

  const logout = useCallback(() => {
    clearAuthCookies();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !accessToken) return;
    if (accessToken) {
      decodeAndSetUser(accessToken);
    }
  }, []);

  return { login, logout, signup };
}

export default useAuthManager;
