// LoginForm.js
import React from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';

const LoginForm = ({
  username,
  password,
  email,
  signupMode,
  name,
  roleData,
  setUsername,
  setPassword,
  setEmail,
  setName,
  setRoleData,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
        />
        {/* <TextField
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        /> */}
        <TextField
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
        {signupMode && (
          <>
            <TextField
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
            <TextField
              placeholder="Role Data"
              value={roleData}
              onChange={(e) => setRoleData(e.target.value)}
              variant="outlined"
            />
          </>
        )}
        <Button type="submit" variant="contained" color="primary">
          {signupMode ? 'Sign Up' : 'Login'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
