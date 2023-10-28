import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import LoginForm from '../forms/LoginForm';
import SignupSwitch from '../Auth/SignupSwitch';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useMode } from '../../context/hooks/colormode';
import { useAuthContext } from '../../context/hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function LoginDialog({ open, onClose, onLogin }) {
  const authContext = useAuthContext(); // <-- Make sure this line is updated
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [signupMode, setSignupMode] = useState(false);
  const [name, setName] = useState('');
  const [roleData, setRoleData] = useState('admin'); // Adjusted to handle string value
  const { toggleColorMode, mode } = useMode();
  const [cookies, setCookie, removeCookie] = useCookies(['isloggedin']);
  // Flag to track if the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }; // Cleanup
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = null;

      if (signupMode) {
        response = await authContext.signup(
          username,
          password,
          email,
          name,
          roleData
        );
      } else {
        response = await authContext.login(username, password);
      }

      // Checking if the login or signup was successful
      if (response?.loggedIn) {
        onLogin();
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    removeCookie('isloggedin', { path: '/' });
    authContext.logout();
  };

  // UseEffect to handle login state change
  useEffect(() => {
    let isMounted = true; // Single variable for isMounted

    if (
      isMounted &&
      authContext.isloggedin &&
      window.location.pathname !== '/profile'
    ) {
      onLogin();
    }

    return () => {
      isMounted = false;
    };
  }, [authContext.isloggedin, onLogin, navigate]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{signupMode ? 'Sign Up' : 'Login'}</DialogTitle>
      <IconButton
        onClick={toggleColorMode}
        style={{ position: 'absolute', right: '16px', top: '16px' }}
      >
        {!mode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <DialogContent>
        {authContext.isloggedin ? (
          <Button color="primary" variant="outlined" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <>
            <LoginForm
              username={username}
              password={password}
              email={email}
              signupMode={signupMode}
              name={name}
              roleData={roleData}
              setUsername={setUsername}
              setPassword={setPassword}
              setEmail={setEmail}
              setName={setName}
              setRoleData={setRoleData}
              handleSubmit={handleSubmit}
            />
            <SignupSwitch
              signupMode={signupMode}
              setSignupMode={setSignupMode}
            />
          </>
        )}
        {authContext.error && <p>{authContext.error}</p>}
        {authContext.isLoading && <p>Loading...</p>}
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
