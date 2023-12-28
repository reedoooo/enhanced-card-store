import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) return <Navigate to="/login" />;

  // If isLoggedIn from either cookie or context is true, proceed to the route
  return children;
};

export default PrivateRoute;
