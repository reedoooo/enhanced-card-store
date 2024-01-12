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
  const { setUser, isLoggedIn } = useAuthContext(); // Use the useAuthContext hook
  const [cookies, setCookie] = useCookies(['authUser', 'user']);
  const fetchWrapper = useFetchWrapper();
  const authUser = cookies?.authUser;
  const user = cookies?.user;
  const userId = cookies?.authUser?.userId;
  const fetchUserData = useCallback(async () => {
    // Get request to fetch user data
    const endpoint = `/users/${userId}/userData`;
    const url = createUrl(endpoint);
    const response = await fetchWrapper(url, 'GET');
    const { message, data } = response;
    console.log('Response from server for fetch user:', message, data);
    // setUser(data.userDoc);
    // const response = await fetchWrapper.get(`/api/users/${userId}`);
    // const userData = response.data;
  }, []);

  const updateUser = async (updatedUser) => {
    try {
      console.log('User Data Sent to Server:', updatedUser);
      const endpoint = `users/${userId}/userData/update`;
      const url = createUrl(endpoint);
      const response = await fetchWrapper(url, 'PUT', updatedUser);
      const { message, data } = response;
      console.log('Response from server for update user:', message, data);
      setUser(data.updatedUserDoc);
      console.log('User Data Sent to Server and Cookie Updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      console.log('User ID found, fetching user data...', cookies.user);
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
        user: user,
        userId: authUser?.userId,
        setUser,
        updateUser,
        getUserData: fetchUserData,
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
