import { useContext, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/authContext';

function Auth({ children }) {
  const { isloggedin, user, can } = useContext(AuthContext);

  console.log('isloggedin', isloggedin);
  console.log('user', user);

  return isloggedin ? (
    <Routes>
      {/* {can('admin') && <Route exact path="/admin" element={<AdminPage />} />} */}
      {children}
    </Routes>
  ) : (
    <p>You do not have permission to view this page.</p>
  );
}

export default memo(Auth);
