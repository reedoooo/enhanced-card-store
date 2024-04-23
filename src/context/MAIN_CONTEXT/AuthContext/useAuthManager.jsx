import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import useManageCookies from '../../hooks/useManageCookies';
import useUserData from '../UserContext/useUserData';

function useAuthManager() {
  const navigate = useNavigate();
  const { addCookies, getCookie, deleteCookies } = useManageCookies();
  const { authUser, isLoggedIn, accessToken, refreshToken } = getCookie([
    'authUser',
    'isLoggedIn',
    'accessToken',
    'refreshToken',
  ]);
  const { handleSetUser } = useUserData();
  const { fetchWrapper } = useFetchWrapper();

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

  return { login, logout, signup };
}

export default useAuthManager;
