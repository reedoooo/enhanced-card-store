import { useContext, memo } from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/authContext';

function Auth({ children, capability }) {
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;
  const canDo = capability ? authContext.can(capability) : true;

  // Always call useRoutes, regardless of whether conditions are met
  const routes = useRoutes(children);

  // Only render routes if conditions are met
  return isLoggedIn && canDo ? routes : null;
}

export default memo(Auth);
