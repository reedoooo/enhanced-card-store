import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const UserContext = React.createContext();
const [cookies, setCookie] = useCookies(['userCookie', 'deck']);

useEffect(() => {
  const userID = getCookie('userID');
  if (userID) {
    setUser({ userID: userID });
  }
}, []);

export default UserContext;
