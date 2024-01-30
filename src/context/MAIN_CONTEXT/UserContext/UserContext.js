import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import useFetchWrapper from '../../hooks/useFetchWrapper';
// import { createApiUrl } from '../../Helpers';
import { useAuthContext } from '../AuthContext/authContext';
import useCollectionManager from '../CollectionContext/useCollectionManager';
import useApiResponseHandler from '../../hooks/useApiResponseHandler';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['collectionData']);
  const { isLoggedIn, authUser, userId } = useAuthContext();
  const createApiUrl = useCallback(
    (path) => `${process.env.REACT_APP_SERVER}/api/users/${userId}/${path}`,
    [userId]
  );
  const [userData, setUserData] = useState({}); // [message, data
  const {
    collectionData,
    setSelectedCollection,
    setSelectedCards,
    setAllCollections,
  } = useCollectionManager(isLoggedIn, userId);
  const { handleApiResponse } = useApiResponseHandler();
  const fetchWrapper = useFetchWrapper();

  const fetchUserData = useCallback(async () => {
    if (!authUser) return;
    if (userId) {
      // Get request to fetch user data
      const url = createApiUrl(`${userId}/userData`);
      try {
        const response = await fetchWrapper(url, 'GET');
        const data = handleApiResponse(response, 'fetchUserData');
        // const { message, data } = response;
        // console.log('Response from server for fetch user:', message, data);
        setUserData({ data: data });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [userId, fetchWrapper, setCookie]);

  const updateUser = useCallback(
    async (updatedUser) => {
      if (userId) {
        try {
          console.log('User Data Sent to Server:', updatedUser);
          const url = `/api/users/${userId}/userData/update`;
          const response = await fetchWrapper(url, 'PUT', updatedUser);
          const { message, data } = response;
          console.log('Response from server for update user:', message, data);
          setCookie('user', data.updatedUserDoc, { path: '/' });
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    },
    [userId, fetchWrapper, setCookie]
  );
  // useEffect(() => {
  //   // Update the collectionData cookie when it changes
  //   // console.log('Collection Data Changed:', responseData?.data);
  //   // setAllCollections(responseData?.data?.allCollections);

  //   setCookie('collectionData', responseData?.data, {
  //     path: '/',
  //   });
  // }, [collectionData, setCookie, responseData]);

  // useEffect(() => {
  //   if (userId && isLoggedIn) fetchUserData();
  // }, [fetchUserData]);

  const contextValue = {
    // user: cookies.user,
    // userId: authUser?.userId,
    updateUser,
    getUserData: fetchUserData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
