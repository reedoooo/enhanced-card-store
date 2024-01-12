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
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
} from '../forms/styled';
import useDialog from '../../context/hooks/useDialog';
import useSnackBar from '../../context/hooks/useSnackBar';

function LoginDialog() {
  const { theme } = useMode(); // Ensures theme is applied correctly
  const { toggleColorMode, mode } = useMode();
  const { logout, isLoggedIn } = useAuthContext();
  const handleSnackBar = useSnackBar()[1];
  const { isLoginDialogOpen, openLoginDialog, closeLoginDialog } =
    useDialog(handleSnackBar);

  const { returnDisplay, loadingStatus, setLoading } = usePageContext(); // Access loading display or error status
  const { forms } = useFormContext();
  const loginValues = forms?.loginForm;
  const signupValues = forms?.signupForm;
  const signupMode = signupValues?.signupMode;
  const currentValues = signupMode ? signupValues : loginValues;

  // console.log('LoginDialog', { currentValues });
  // console.log('LoginDialog', { loadingStatus });
  // console.log('LoginDialog', { isLoginDialogOpen });
  // console.log('LoginDialog', { isLoggedIn });
  // console.log('LoginDialog', { signupMode });
  // useEffect for checking dialog status
  useEffect(() => {
    if (!isLoggedIn && !isLoginDialogOpen) {
      openLoginDialog();
      // closeLoginDialog();
    }
    if (isLoggedIn && isLoginDialogOpen) {
      closeLoginDialog();
    }
  }, [isLoggedIn, isLoginDialogOpen, closeLoginDialog]); // Make sure dependencies are accurate
  // console.log('LoginDialog', { theme });
  // console.log('LoginDialog', { mode });

  // useEffect(() => {
  //   if (isLoggedIn && isLoginDialogOpen) {
  //     closeLoginDialog();
  //   }
  // }, [isLoggedIn, isLoginDialogOpen, closeLoginDialog]); // Make sure dependencies are accurate

  return (
    <StyledDialog
      open={isLoginDialogOpen}
      onClose={closeLoginDialog}
      maxWidth="lg"
      fullWidth
      theme={theme}
    >
      <StyledDialogTitle theme={theme}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {signupMode ? 'Sign Up' : 'Login'}
          </Typography>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </StyledDialogTitle>
      <StyledDialogContent dividers theme={theme}>
        {isLoggedIn ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              logout();
              openLoginDialog();
            }}
            fullWidth
          >
            Log Out
          </Button>
        ) : (
          <>
            <LoginForm />
          </>
        )}
      </StyledDialogContent>
    </StyledDialog>
  );
}

export default LoginDialog;
