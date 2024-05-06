import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useFetchWrapper, useManageCookies, useUserData } from 'context';

function useAuthManager() {
  const navigate = useNavigate();
  const { addCookies, getCookie, deleteCookies } = useManageCookies();
  const { authUser, isLoggedIn, accessToken, refreshToken } = getCookie([
    'authUser',
    'isLoggedIn',
    'accessToken',
    'refreshToken',
  ]);
  const { handleSetUser, handleRemoveUser, hasFetchedUser } = useUserData();
  const { fetchWrapper } = useFetchWrapper();
  const [loggingOut, setLoggingOut] = useState(false);
  const setAuthCookies = useCallback(
    (data) => {
      const { accessToken, refreshToken } = data;
      const authData = jwt_decode(accessToken);
      addCookies(
        ['accessToken', 'refreshToken', 'isLoggedIn', 'authUser', 'userId'],
        [accessToken, refreshToken, true, authData, authData.userId],
        { path: '/' }
      );
      // handleSetUser(authData);
      navigate('/home');
    },
    [addCookies, handleSetUser, navigate]
  );
  const clearAuthCookies = useCallback(() => {
    deleteCookies([
      'accessToken',
      'refreshToken',
      'userId',
      'authUser',
      'isLoggedIn',
    ]);
    localStorage.clear();
  }, [deleteCookies, navigate]);

  const executeAuthAction = useCallback(
    async (endpoint, requestData) => {
      try {
        console.log(
          `SERVER: ${process.env.REACT_APP_SERVER}/api/users/${endpoint}`
        );
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
          handleSetUser(jwt_decode(responseData.data.accessToken));
        }
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
    setLoggingOut(true);
    handleRemoveUser();
    navigate('/login');
  }, [executeAuthAction, clearAuthCookies, handleRemoveUser, navigate]);

  const checkTokenValidity = useCallback(async () => {
    if (!accessToken) return;

    console.log('Checking token validity...', { accessToken });
    try {
      const { exp } = jwt_decode(accessToken);
      const isTokenExpired = Date.now() >= exp * 1000;
      if (isTokenExpired) {
        console.log('Token is expired');
        logout();
        return;
      }
    } catch (error) {
      console.error('Token validation error:', error);
    }
  }, [accessToken, logout]);

  useEffect(() => {
    if (!isLoggedIn) return;

    // if (accessToken) {
    //   handleSetUser(jwt_decode(accessToken));
    // }
    const intervalId = setInterval(() => {
      checkTokenValidity();
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return { login, logout, signup };
}

export default useAuthManager;
