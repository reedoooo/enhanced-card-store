import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
