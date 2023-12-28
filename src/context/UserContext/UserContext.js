import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../hooks/auth';
import { createUrl } from '../Helpers';
import useFetchWrapper from '../hooks/useFetchWrapper';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { authUser, user, setUser, isLoggedIn } = useAuthContext(); // Use the useAuthContext hook
  const fetchWrapper = useFetchWrapper();
  const userId = authUser?.id;

  // const fetchUserData = useCallback(async () => {
  //   // Get request to fetch user data
  //   const endpoint = `/users/${user.id}/userData`;
  //   const url = createUrl(endpoint);
  //   const response = await useFetchWrapper(url);
  //   // const response = await fetchWrapper.get(`/api/users/${userId}`);
  //   // const userData = response.data;
  // }, []);

  const updateUser = async (updatedUser) => {
    try {
      console.log('User Data Sent to Server:', updatedUser);
      const endpoint = `users/${userId}/userData/update`;
      const url = createUrl(endpoint);
      const response = await fetchWrapper(url, 'PUT', updatedUser);
      const updatedUserResponse = response?.data?.user;
      setUser(updatedUserResponse);
      console.log('User Data Sent to Server and Cookie Updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      const updatedUser = {
        ...user,
        userSecurityData: {
          ...user.userSecurityData,
          userId: userId,
        },
        userBasicData: {
          ...user.userBasicData,
          userId: userId,
        },
      };
      updateUser(updatedUser);
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        user: authUser,
        userId: authUser?.id,
        setUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;
