import { useContext, memo } from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/authContext';

function Auth({ children, capability }) {
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;
  const canDo = capability ? authContext.can(capability) : true;

  const routes = useRoutes(children);

  return isLoggedIn && canDo ? (
    routes
  ) : (
    <p>You do not have permission to view this page.</p>
  );
}

export default memo(Auth);
