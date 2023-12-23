import React, { useState } from 'react';
import {
  FormWrapper,
  StyledTextField,
  StyledButton,
  StyledBorderContainer,
} from './styled'; // Ensure this path is correct for your project
import { useMode } from '../../context'; // Ensure this path is correct for your project

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
  const { theme } = useMode(); // Ensure your context provides theme correctly

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <StyledTextField
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        required
        theme={theme}
      />

      {/* Additional fields appear if in signup mode */}
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
            theme={theme}
          />
          <StyledTextField
            label="Role Data"
            placeholder="Enter your role data"
            value={roleData}
            onChange={(e) => setRoleData(e.target.value)}
            variant="outlined"
            required
            theme={theme}
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
        theme={theme}
      />

      {/* Submit Button */}
      <StyledButton type="submit" variant="contained" theme={theme}>
        {signupMode ? 'Sign Up' : 'Login'}
      </StyledButton>
    </FormWrapper>
  );
};

export default LoginForm;
