import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie'; // Note: If not used, consider removing
import useFetchWrapper from '../../hooks/useFetchWrapper';
import { useAuthContext } from '../AuthContext/authContext';
import useApiResponseHandler from '../../hooks/useApiResponseHandler'; // Note: Ensure it's utilized if needed
import { defaultContextValue } from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useLoading } from '../../hooks/useLoading';
import useLogger from '../../hooks/useLogger';

export const UserContext = createContext(defaultContextValue.USER_CONTEXT);

export const UserProvider = ({ children }) => {
  const { userId, isLoggedIn } = useAuthContext(); // Assuming useAuthContext now provides userId directly

  const [user, setUser] = useLocalStorage('user', {});
  const logger = useLogger('UserProvider');
  const { isLoading } = useLoading();
  const { fetchWrapper, status } = useFetchWrapper();
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const [error, setError] = useState(null);
  const createApiUrl = useCallback(
    (path) => `${process.env.REACT_APP_SERVER}/api/users/${userId}/${path}`,
    [userId]
  );

  const fetchUserData = useCallback(async () => {
    if (!userId || !isLoggedIn || status === 'loading') return;
    try {
      const responseData = await fetchWrapper(
        `${process.env.REACT_APP_SERVER}/api/users/${userId}/userData`,
        'GET',
        null,
        'getUserData'
      );
      setUser(responseData?.data);
      setHasFetchedUser(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message || 'Failed to fetch user data');
      logger.logEvent('Failed to fetch user data', error.message);
    }
  }, [userId, isLoggedIn, fetchWrapper, setUser, logger]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateUser = useCallback(
    async (updatedUserData) => {
      if (!userId || !isLoggedIn || isLoading('updateUserData')) return;
      try {
        await fetchWrapper(
          `${process.env.REACT_APP_SERVER}/api/users/${userId}/updateUserData`,
          'PUT',
          updatedUserData,
          'updateUserData'
        );
        fetchUserData(); // Refetch user data to ensure UI is up-to-date
        setError(null);
      } catch (error) {
        setError('Failed to update user data');
        logger.error('Error updating user data:', error);
      }
    },
    [userId, isLoggedIn, fetchWrapper, fetchUserData, logger, isLoading]
  );

  const values = {
    userId,
    isLoggedIn,
    error,
    hasFetchedUser,
    user,
    updateUser,
    getUserData: fetchUserData,
  };

  const contextValue =
    process.env.AUTH_ENVIRONMENT !== 'disabled' ? values : defaultContextValue;

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
