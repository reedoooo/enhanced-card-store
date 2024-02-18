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
  const [user, setUser] = useLocalStorage('user', {});
  const logger = useLogger('UserProvider');
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { fetchWrapper, responseCache } = useFetchWrapper();
  const { isLoggedIn, userId } = useAuthContext(); // Removed authUser as it's unused
  const [error, setError] = useState(null);

  const createApiUrl = useCallback(
    (path) => `${process.env.REACT_APP_SERVER}/api/users/${userId}/${path}`,
    [userId]
  );

  const fetchUserData = useCallback(async () => {
    const loadingID = 'fetchUserData';
    if (!isLoggedIn || !userId || isLoading(loadingID)) return;
    startLoading(loadingID);

    try {
      const responseData = await fetchWrapper(
        createApiUrl('userData'),
        'GET',
        null,
        loadingID
      );

      if (
        (responseData && responseData?.status === 200) ||
        responseData?.status === 201
      ) {
        console.log('SUCCESS: fetching user data');
        const cachedData = responseCache[loadingID];
        if (cachedData) {
          setUser(cachedData); // Assuming setUser updates local storage or state with user data
        }
      }
      if (responseData && responseData?.status !== 200) {
        console.error('ERROR: fetching user data');
        setError(responseData?.data?.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'Failed to fetch user data');
      logger.logEvent('Failed to fetch user data', error.message);
    } finally {
      stopLoading(loadingID);
    }
  }, [
    isLoggedIn,
    userId,
    isLoading,
    createApiUrl,
    fetchWrapper,
    responseCache,
    startLoading,
    stopLoading,
    setUser,
    setError,
    logger,
  ]);
  useEffect(() => {
    const storedResponse = responseCache['fetchUserData'];
    console.log('Stored response for user data:', storedResponse);
    if (storedResponse) {
      // Assuming setUser is a function that updates the user's data in state or context
      setUser(storedResponse.data); // Adjust according to your actual state update mechanism
    }
  }, [responseCache]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateUser = useCallback(
    async (updatedUser) => {
      const loadingID = 'updateUserData';
      if (isLoading(loadingID)) return;

      startLoading(loadingID);
      const url = createApiUrl('userData/update');
      try {
        const responseData = await fetchWrapper(
          url,
          'PUT',
          updatedUser,
          loadingID
        );

        console.log('Response from server for update user:', responseData);
        if (responseData && responseData.data) {
          setUser(responseData.data); // Update user data in local storage
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      } finally {
        stopLoading(loadingID);
      }
    },
    [fetchWrapper, createApiUrl, setUser, isLoading, startLoading, stopLoading]
  );

  // Removed dependency on `user` to prevent unnecessary re-fetching
  // useEffect(() => {
  //   if (isLoggedIn && userId) {
  //     fetchUserData();
  //   }
  // }, [fetchUserData, isLoggedIn, userId]);

  const contextValue = {
    user,
    updateUser,
    getUserData: fetchUserData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
