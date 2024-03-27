import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuthContext();
  const navigate = useNavigate();

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }
  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return children;
};

export default PrivateRoute;
