import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../../context/hooks/auth';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();

  // Use react-cookie's useCookies hook to read the 'isLoggedIn' cookie
  const [cookies] = useCookies(['isLoggedIn']);

  const isLoggedIn = authContext.isLoggedIn || cookies.isLoggedIn;

  // If isLoggedIn from either cookie or context is true, proceed to the route
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
