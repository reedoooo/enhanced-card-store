// Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { When } from 'react-if';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { AuthContext } from '../../context/Auth/authContext.js';
import LoginForm from '../forms/LoginForm.jsx';
import SignupSwitch from '../Auth/SignupSwitch.jsx';
// import { ThemeContext } from 'styled-components';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useMode } from '../../context/hooks/colormode.jsx';
function LoginDialog({ open, onClose, onLogin }) {
  let authContext = useContext(AuthContext);
  let navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [signupMode, setSignupMode] = React.useState(false);
  const [roleData, setRoleData] = useState('');
  const [name, setName] = useState('');
  // const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { toggleColorMode, mode } = useMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupMode) {
      await authContext.signup(
        username,
        password,
        email,
        { name },
        { name: roleData }
      );
    } else {
      try {
        console.log('username', username);
        const loggedIn = await authContext.login(username, password);
        if (loggedIn) {
          // Store login status in local storage
          localStorage.setItem('isloggedin', 'true');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  useEffect(() => {
    if (
      (authContext.isloggedin ||
        localStorage.getItem('isloggedin') === 'true') &&
      window.location.pathname !== '/profile'
    ) {
      onLogin();
      // navigate('/profile');
    }
  }, [authContext.isloggedin, navigate]);

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
        <When condition={authContext.isloggedin}>
          <Button
            color="primary"
            variant="outlined"
            onClick={authContext.logout}
          >
            Log Out
          </Button>
        </When>

        <When condition={!authContext.isloggedin}>
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
          <SignupSwitch signupMode={signupMode} setSignupMode={setSignupMode} />
        </When>
        {authContext.error && <p>{authContext.error}</p>}
        {authContext.isLoading && <p>Loading...</p>}
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
