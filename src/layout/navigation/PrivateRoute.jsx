import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useUserData from '../../context/useUserData';

const PrivateRoute = ({ children }) => {
  const { user } = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return children;
};

export default PrivateRoute;
