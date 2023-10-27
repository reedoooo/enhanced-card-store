import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/authContext';

// function PrivateRoute({ children, capability }) {
//   const authContext = useContext(AuthContext);
//   const isloggedin = authContext.isloggedin;

//   if (!isloggedin) {
//     // Redirect to a login page or another appropriate route
//     return <Navigate to="/login" />;
//   }

//   // Check if the user has the required capability (optional)
//   // if (capability && !authContext.can(capability)) {
//   //   // Redirect to a forbidden page or another appropriate route
//   //   return <Navigate to="/forbidden" />;
//   // }

//   // Render the protected route with children
//   return children;
// }
const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const isloggedin = authContext.isloggedin;
  return isloggedin ? children : <Navigate to="/profile" />;
};

export default PrivateRoute;
