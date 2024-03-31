// import { useCallback, useState } from 'react';
// import { useAuthContext } from '../MAIN_CONTEXT/AuthContext/authContext';
// import useDialog from './useDialog';
// import useManageCookies from './useManageCookies';

// const useAuthDialog = () => {
//   const { logout } = useAuthContext();
//   const { addCookie, getCookie, deleteCookie } = useManageCookies();
//   const { isLoggedIn } = getCookie(['isLoggedIn']);
//   console.log(isLoggedIn);
//   const { openDialog, closeDialog } = useDialog();

//   // Toggle login dialog based on authentication status
//   const toggleLoginDialog = useCallback(() => {
//     if (!isLoggedIn) {
//       openDialog('Login');
//     } else {
//       logout();
//       closeDialog('Login');
//     }
//   }, [isLoggedIn, openDialog, closeDialog, logout]);

//   return { toggleLoginDialog, isLoggedIn, logout };
// };

// export default useAuthDialog;
