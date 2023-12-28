import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import LoginForm from '../forms/LoginForm';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  useAuthContext,
  useFormContext,
  useMode,
  usePageContext,
} from '../../context';

function LoginDialog({ open, onClose, onLogin }) {
  const { toggleColorMode, mode } = useMode();
  const { logout, isLoggedIn } = useAuthContext();
  const { returnDisplay, loadingStatus, setLoading } = usePageContext(); // Access loading display or error status
  const { forms } = useFormContext();
  const loginValues = forms?.loginForm;
  const signupValues = forms?.signupForm;
  const signupMode = signupValues?.signupMode;
  const currentValues = signupMode ? signupValues : loginValues;

  // Close dialog on successful login
  useEffect(() => {
    if (isLoggedIn && open) {
      onClose();
    }
  }, [isLoggedIn, open, onClose]); // Make sure dependencies are accurate

  // Update pagecontext error state if authcontext error state changes
  // useEffect(() => {
  //   if (formErrors) {
  //     setLoading(formErrors, false);
  //   }
  // }, [formErrors]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {currentValues === signupMode ? 'Sign Up' : 'Login'}
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {isLoggedIn ? (
          <Button
            color="primary"
            variant="contained"
            onClick={logout}
            fullWidth
          >
            Log Out
          </Button>
        ) : (
          <>
            <LoginForm />
            {/* {loadingStatus?.error && returnDisplay()} */}
          </>
        )}
        {/* {loadingStatus?.isFormDataLoading && returnDisplay()} */}
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
