import React from 'react';
import {
  FormWrapper,
  StyledTextField,
  StyledButton,
  StyledBox,
} from './styled';
import { useFormContext, useMode, usePageContext } from '../../context';
import SignupSwitch from '../buttons/other/SignupSwitch';
import { Box } from '@mui/material';

const LoginForm = () => {
  const { theme } = useMode(); // Ensures theme is applied correctly
  const { returnDisplay, loadingStatus } = usePageContext(); // Access loading display or error status
  const { forms, handleChange, handleSubmit } = useFormContext();
  const loginValues = forms?.loginForm || {};
  const signupValues = forms?.signupForm || {};
  const signupMode = signupValues?.signupMode;
  const formType = signupMode ? 'signupForm' : 'loginForm';
  const valueType = signupMode ? signupValues : loginValues;

  // Define the form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    handleSubmit(formType)(event); // Pass the event to your form handler
  };

  return (
    <>
      {/* Display loading indicator or error if form is in the loading or error state */}
      {loadingStatus?.isFormDataLoading && returnDisplay()}

      <FormWrapper onSubmit={handleFormSubmit}>
        {/* Conditional rendering of signup fields */}
        {signupMode && (
          <>
            <StyledTextField
              label="Email"
              placeholder="Enter your email"
              value={valueType.email || ''}
              onChange={handleChange(formType, 'email')}
              margin="normal"
              variant="outlined"
              type="email"
              required
              theme={theme}
            />
            <StyledTextField
              label="First Name"
              placeholder="Enter your first name"
              value={valueType.firstName || ''}
              onChange={handleChange(formType, 'firstName')}
              margin="normal"
              variant="outlined"
              required
              theme={theme}
            />
            <StyledTextField
              label="Last Name"
              placeholder="Enter your last name"
              value={valueType.lastName || ''}
              onChange={handleChange(formType, 'lastName')}
              margin="normal"
              variant="outlined"
              required
              theme={theme}
            />
            <StyledTextField
              label="Phone"
              placeholder="Enter your phone number"
              value={valueType.phone || ''}
              onChange={handleChange(formType, 'phone')}
              margin="normal"
              variant="outlined"
              required
              theme={theme}
            />
          </>
        )}

        {/* Common fields for both login and signup */}
        <StyledTextField
          label="Username"
          placeholder="Enter your username"
          value={valueType.username || ''}
          onChange={handleChange(formType, 'username')}
          margin="normal"
          variant="outlined"
          required
          theme={theme}
        />

        <StyledTextField
          label="Password"
          placeholder="Enter your password"
          value={valueType.password || ''}
          type="password"
          onChange={handleChange(formType, 'password')}
          margin="normal"
          variant="outlined"
          required
          theme={theme}
        />

        <StyledBox theme={theme}>
          <StyledButton type="submit" variant="contained" theme={theme}>
            {signupMode ? 'Sign Up' : 'Login'}
          </StyledButton>

          {/* Toggle between login and signup modes */}
          <SignupSwitch signupMode={signupMode} />
        </StyledBox>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
