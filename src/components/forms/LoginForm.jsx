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
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        required
      />
      {signupMode && (
        <>
          <StyledTextField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            type="email"
            required
          />
          <StyledTextField
            label="Role Data"
            placeholder="Enter your role data"
            value={roleData}
            onChange={(e) => setRoleData(e.target.value)}
            variant="outlined"
            required
          />
        </>
      )}
      <StyledTextField
        label="Password"
        placeholder="Enter your password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        required
      />
      <StyledButton type="submit" variant="contained" color="primary">
        {signupMode ? 'Sign Up' : 'Login'}
      </StyledButton>
    </FormWrapper>
  );
};

export default LoginForm;
