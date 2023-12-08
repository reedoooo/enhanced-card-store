import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import LoginForm from '../forms/LoginForm';
import SignupSwitch from '../buttons/other/SignupSwitch';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useMode } from '../../context/hooks/colormode';
import { useLoginForm } from '../../context/hooks/useLoginForm';

function LoginDialog({ open, onClose, onLogin }) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    name,
    setName,
    roleData,
    setRoleData,
    signupMode,
    setSignupMode,
    handleSubmit,
    handleLogout,
    isLoggedIn,
    error,
    isLoading,
    cookies,
  } = useLoginForm(onLogin);

  const { toggleColorMode, mode } = useMode();

  useEffect(() => {
    if (isLoggedIn) {
      onLogin(isLoggedIn, cookies['userId']);
    }
  }, [isLoggedIn, onLogin, cookies]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{signupMode ? 'Sign Up' : 'Login'}</DialogTitle>
      <IconButton
        onClick={toggleColorMode}
        style={{ position: 'absolute', right: '16px', top: '16px' }}
      >
        {mode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <DialogContent>
        {isLoggedIn ? (
          <Button color="primary" variant="outlined" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <>
            <LoginForm
              {...{
                username,
                password,
                email,
                name,
                roleData,
                signupMode,
                setUsername,
                setPassword,
                setEmail,
                setName,
                setRoleData,
                handleSubmit,
              }}
            />
            <SignupSwitch
              signupMode={signupMode}
              setSignupMode={setSignupMode}
            />
          </>
        )}
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
