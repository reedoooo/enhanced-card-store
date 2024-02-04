// import { useContext, memo } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { AuthContext } from '../../context/Auth/authContext';

// function Auth({ children }) {
//   const { isLoggedIn, authUser, can } = useContext(AuthContext);

//   console.log('isLoggedIn', isLoggedIn);
//   console.log('authUser', authUser);

//   return isLoggedIn ? (
//     <Routes>
//       {/* {can('admin') && <Route exact path="/admin" element={<AdminPage />} />} */}
//       {children}
//     </Routes>
//   ) : (
//     <p>You do not have permission to view this page.</p>
//   );
// }

// export default memo(Auth);
