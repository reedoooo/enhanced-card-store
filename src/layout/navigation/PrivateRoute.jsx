import { useNavigate } from 'react-router-dom';
import useUserData from 'context/state/useUserData';
import { useEffect } from 'react';

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
