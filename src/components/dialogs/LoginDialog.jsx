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
import useAuthDialog from '../../context/hooks/useAuthDialog';

function LoginDialog() {
  const { theme } = useMode();
  const { logout } = useAuthContext();
  const { toggleLoginDialog, isLoggedIn } = useAuthDialog();
  const { forms } = useFormContext();
  const loginValues = forms?.loginForm;
  const signupValues = forms?.signupForm;
  const signupMode = signupValues?.signupMode;

  useEffect(() => {
    if (!isLoggedIn) {
      toggleLoginDialog();
    }
  }, [isLoggedIn, toggleLoginDialog]);

  const handleLogout = () => {
    logout();
    toggleLoginDialog();
  };

  const toggleColorMode = useMode().toggleColorMode;
  const mode = useMode().mode;

  return (
    <StyledDialog
      open={!isLoggedIn}
      onClose={toggleLoginDialog}
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
            onClick={handleLogout}
            fullWidth
          >
            Log Out
          </Button>
        ) : (
          <LoginForm />
        )}
      </StyledDialogContent>
    </StyledDialog>
  );
}

export default LoginDialog;
