import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import { useAuthContext } from '../AuthContext/authContext';
import useApiResponseHandler from '../../hooks/useApiResponseHandler';
import { defaultContextValue } from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';

export const UserContext = createContext(defaultContextValue.USER_CONTEXT);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user');

  const { isLoggedIn, authUser, userId } = useAuthContext();
  const createApiUrl = useCallback(
    (path) => `${process.env.REACT_APP_SERVER}/api/users/${userId}/${path}`,
    [userId]
  );
  const [userData, setUserData] = useState({}); // [message, data
  const handleApiResponse = useApiResponseHandler();
  const fetchWrapper = useFetchWrapper();

  const fetchUserData = useCallback(async () => {
    if (!authUser) return;
    if (userId) {
      // Get request to fetch user data
      const url = createApiUrl('userData');
      try {
        const response = await fetchWrapper(url, 'GET');
        const data = handleApiResponse(response, 'fetchUserData');
        // const { message, data } = response;
        console.log('Response from server for fetch user:', data);
        setUserData({ data: data });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [userId, fetchWrapper]);

  const updateUser = useCallback(
    async (updatedUser) => {
      if (userId) {
        try {
          console.log('User Data Sent to Server:', updatedUser);
          const url = `/api/users/${userId}/userData/update`;
          const response = await fetchWrapper(url, 'PUT', updatedUser);
          const { message, data } = response;
          console.log('Response from server for update user:', message, data);
          // setCookie('user', data.updatedUserDoc, { path: '/' });
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    },
    [userId, fetchWrapper]
  );
  useEffect(() => {
    if (userId && isLoggedIn) fetchUserData();
  }, []);

  const contextValue = {
    // user: cookies.user,
    // userId: authUser?.userId,
    user: userData.data,
    updateUser,
    getUserData: fetchUserData,
  };

  useEffect(() => {
    console.log('USER CONTEXT:', contextValue);
  }, [contextValue.updateUser, contextValue.getUserData, contextValue.user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
