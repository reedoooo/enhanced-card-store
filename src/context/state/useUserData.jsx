import { useFetchWrapper, useLocalStorage, useManageCookies } from 'context';
import { useCallback, useState, useEffect } from 'react';

function useUserData() {
  const { getCookie } = useManageCookies();
  const { userId, isLoggedIn, authUser } = getCookie([
    'userId',
    'isLoggedIn',
    'authUser',
  ]);
  const [user, setUser] = useLocalStorage('user', {
    username: '',
    userId: '',
    email: '',
    isLoggedIn: false,
    loginStatus: false,
    accessToken: '',
    refreshToken: '',
    userBasicData: {},
    userSecurityData: {},
    collections: [],
    decks: [],
    cart: {
      items: [],
      totalPrice: 0,
    },
  });
  const { fetchWrapper } = useFetchWrapper();
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const [error, setError] = useState(null);

  const createApiUrl = useCallback(
    (path) => `${process.env.REACT_APP_SERVER}/api/users/${userId}/${path}`,
    [userId]
  );

  const handleSetUser = useCallback(
    (user) => {
      setUser(user);
      setHasFetchedUser(true);
    },
    [setUser, setHasFetchedUser]
  );
  const handleRemoveUser = useCallback(() => {
    console.log('REMOVE USER');
    setUser({
      username: '',
      userId: '',
      email: '',
      isLoggedIn: false,
      loginStatus: false,
      accessToken: '',
      refreshToken: '',
      userBasicData: {},
      userSecurityData: {},
      collections: [],
      decks: [],
      cart: {
        items: [],
        totalPrice: 0,
      },
    });
    setHasFetchedUser(false);
  }, [setUser, setHasFetchedUser]);
  const fetchUserData = useCallback(async () => {
    if (!userId || !isLoggedIn) return;

    if (user && Object.keys(user).length > 0) {
      setHasFetchedUser(true);
      return;
    }

    try {
      const responseData = await fetchWrapper(createApiUrl('userData'), 'GET');
      handleSetUser(responseData?.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message || 'Failed to fetch user data');
      console.log('Failed to fetch user data', error.message);
    }
  }, [userId, isLoggedIn, user, fetchWrapper, setUser]);

  const updateUser = useCallback(
    async (updatedUserData) => {
      if (!userId || !isLoggedIn) return;

      try {
        const params = {
          id: userId,
          updatedUserData: updatedUserData,
        };
        const updatedData = await fetchWrapper(
          createApiUrl('updateUserData'),
          'PUT',
          params
        );

        handleSetUser(updatedData?.data);
        // fetchUserData(); // Refetch to ensure UI is up-to-date
      } catch (error) {
        console.error('Error updating user data:', error);
        setError('Failed to update user data');
        console.log('Error updating user data:', error);
      }
    },
    [userId, isLoggedIn, fetchWrapper, fetchUserData]
  );

  useEffect(() => {
    if (userId && isLoggedIn && !hasFetchedUser) fetchUserData();
  }, [userId, isLoggedIn, hasFetchedUser, fetchUserData]);

  return {
    user,
    error,
    hasFetchedUser,
    updateUser,
    fetchUserData,
    handleSetUser,
    handleRemoveUser,
  };
}

export default useUserData;
