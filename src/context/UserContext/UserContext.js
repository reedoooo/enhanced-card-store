import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['userCookie']);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { id, username } = cookies.userCookie || {};
    // console.log('USER COOKIE:', cookies.userCookie);
    const userID = id;
    if (userID) {
      setUser({ userID: userID, username: username });
    }
  }, [cookies]);

  const updateUser = (userData) => {
    setUser(userData);
    // Update the userCookie with the new userData
    setCookie('userCookie', userData, { path: '/' }); // Set path to '/' to make the cookie accessible on all pages
    console.log('User Data Sent to Server and Cookie Updated:', userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser, setCookie, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;
