// UserProvider component
import React, { createContext, useContext } from 'react';
import useUserData from './useUserData'; // Adjust the path as necessary
import { useCookies } from 'react-cookie';
import useManageCookies from '../../hooks/useManageCookies';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [cookies] = useCookies(['isLoggedIn', 'authUser', 'userId']);
  const { getCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const { user, error, hasFetchedUser, updateUser, fetchUserData } =
    useUserData();

  const contextValue = {
    user,
    userId,
    isLoggedIn,
    error,
    hasFetchedUser,
    updateUser,
    getUserData: fetchUserData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
