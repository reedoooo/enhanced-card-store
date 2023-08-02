import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { When } from 'react-if';
import {
  TextField,
  Button,
  Switch,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { AuthContext } from '../../context/Auth/authContext.js';

function Login() {
  let authContext = useContext(AuthContext);
  let navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [signupMode, setSignupMode] = React.useState(false);
  const [roleData, setRoleData] = useState('');
  const [name, setName] = useState('');

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
        const loggedIn = await authContext.login(username, password);
        if (loggedIn) {
          // Store login status in local storage
          localStorage.setItem('isLoggedIn', 'true');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  useEffect(() => {
    if (
      authContext.isLoggedIn ||
      localStorage.getItem('isLoggedIn') === 'true'
    ) {
      navigate('/profile');
    }
  }, [authContext.isLoggedIn, navigate]);

  return (
    <>
      <When condition={authContext.isLoggedIn}>
        <Button
          color="primary"
          variant="outlined"
          onClick={authContext.logout}
          style={{ maxWidth: '100px' }}
        >
          Log Out
        </Button>
      </When>

      <When condition={!authContext.isLoggedIn}>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <TextField
              placeholder="Username"
              name="username"
              size="medium"
              variant="outlined"
              onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
              placeholder="Email"
              name="email"
              size="medium"
              type="email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)} // Update setEmail to match new state
            />

            <TextField
              placeholder="Password"
              name="password"
              size="medium"
              type="password"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />

            {signupMode && (
              <>
                <TextField
                  placeholder="Full Name"
                  name="name"
                  size="medium"
                  variant="outlined"
                  onChange={(event) => setName(event.target.value)}
                />

                <TextField
                  placeholder="Role Data"
                  name="roleData"
                  size="medium"
                  variant="outlined"
                  onChange={(event) => setRoleData(event.target.value)}
                />
              </>
            )}

            <Button
              color="primary"
              type="submit"
              size="medium"
              variant="contained"
              style={{ backgroundColor: '#2d2d2d', color: '#f5f5f5' }} // Added styles
            >
              {signupMode ? 'Sign Up' : 'Login'}
            </Button>
          </div>
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={signupMode}
                  onChange={(e) => setSignupMode(e.target.checked)}
                />
              }
              label={<Typography variant="body1">Sign up mode</Typography>}
            />
          </FormControl>
        </form>
      </When>
    </>
  );
}

export default Login;
