import { useCallback, useState } from 'react';
import { useAuthContext } from '../MAIN_CONTEXT/AuthContext/authContext';
import useDialog from './useDialog';

const useAuthDialog = () => {
  const { isLoggedIn, logout } = useAuthContext();
  const { openDialog, closeDialog } = useDialog();

  // Toggle login dialog based on authentication status
  const toggleLoginDialog = useCallback(() => {
    if (!isLoggedIn) {
      openDialog('Login');
    } else {
      logout();
      closeDialog('Login');
    }
  }, [isLoggedIn, openDialog, closeDialog, logout]);

  return { toggleLoginDialog, isLoggedIn };
};

export default useAuthDialog;
