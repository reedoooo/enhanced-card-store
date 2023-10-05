// Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { When } from 'react-if';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/Auth/authContext.js';
import LoginForm from '../forms/LoginForm.jsx';
import SignupSwitch from './SignupSwitch';

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
        console.log('username', username);
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
        <Button color="primary" variant="outlined" onClick={authContext.logout}>
          Log Out
        </Button>
      </When>

      <When condition={!authContext.isLoggedIn}>
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
    </>
  );
}

export default Login;
