// LoginForm.js
import React from 'react';
import { FormWrapper, StyledTextField, StyledButton } from './styled';

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
    <FormWrapper onSubmit={handleSubmit}>
      <StyledTextField
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
      />
      {signupMode && (
        <>
          <StyledTextField
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <StyledTextField
            placeholder="Role Data"
            value={roleData}
            onChange={(e) => setRoleData(e.target.value)}
            variant="outlined"
          />
        </>
      )}
      <StyledTextField
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
      />
      <StyledButton type="submit" variant="contained" color="primary">
        {signupMode ? 'Sign Up' : 'Login'}
      </StyledButton>
    </FormWrapper>
  );
};

export default LoginForm;
