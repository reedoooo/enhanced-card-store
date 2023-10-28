import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../../context/hooks/auth';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();

  // Use react-cookie's useCookies hook to read the 'isloggedin' cookie
  const [cookies] = useCookies(['isloggedin']);

  const isloggedin = authContext.isloggedin || cookies.isloggedin;

  // If isloggedin from either cookie or context is true, proceed to the route
  return isloggedin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
