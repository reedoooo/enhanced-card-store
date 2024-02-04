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
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';

const LoginForm = () => {
  const { theme } = useMode();
  const { returnDisplay, loadingStatus } = usePageContext();
  const { forms, handleChange, handleSubmit } = useFormContext();

  const loginValues = forms?.loginForm?.securityData || {};
  const signupValues = forms?.signupForm || {};
  const signupMode = signupValues?.signupMode;
  const formType = signupMode ? 'signupForm' : 'loginForm';

  // Determine the correct values to display based on form type
  const valueType = signupMode ? signupValues.securityData : loginValues;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formType)(event);
  };

  return (
    <MDBox
      sx={{
        maxWidth: '100%',
        borderRadius: theme.shape.borderRadius,
        width: { xs: '100%', md: '100%' },
        padding: theme.spacing(2),
      }}
    >
      {loadingStatus?.isFormDataLoading && returnDisplay()}

      <FormWrapper onSubmit={handleFormSubmit}>
        {/* Conditional rendering of signup fields */}
        {signupMode && (
          <>
            {/* Fields from basicData for signup */}
            <StyledTextField
              label="First Name"
              placeholder="Enter your first name"
              value={signupValues.basicData.firstName || ''}
              onChange={handleChange(formType, 'basicData.firstName')}
              margin="normal"
              variant="outlined"
              required
              theme={theme}
            />
            <StyledTextField
              label="Last Name"
              placeholder="Enter your last name"
              value={signupValues.basicData.lastName || ''}
              onChange={handleChange(formType, 'basicData.lastName')}
              margin="normal"
              variant="outlined"
              required
              theme={theme}
            />
            <StyledTextField
              label="Email"
              placeholder="Enter your email"
              value={signupValues.securityData.email || ''}
              onChange={handleChange(formType, 'securityData.email')}
              margin="normal"
              variant="outlined"
              type="email"
              required
              theme={theme}
            />
          </>
        )}

        {/* Common fields for both login and signup from securityData */}
        <StyledTextField
          label="Username"
          placeholder="Enter your username"
          value={valueType.username || ''}
          onChange={handleChange(formType, 'securityData.username')}
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
          onChange={handleChange(formType, 'securityData.password')}
          margin="normal"
          variant="outlined"
          required
          theme={theme}
        />

        <StyledBox theme={theme}>
          <StyledButton type="submit" variant="contained" theme={theme}>
            {signupMode ? 'Sign Up' : 'Login'}
          </StyledButton>
          <SignupSwitch signupMode={signupMode} />
        </StyledBox>
      </FormWrapper>
    </MDBox>
  );
};

export default LoginForm;

const formFieldsConfig = (formType, handleChange, values, theme) => {
  const commonFields = [
    {
      label: 'Username',
      placeholder: 'Enter your username',
      value: values.securityData.username || '',
      onChange: handleChange(formType, 'securityData.username'),
      theme: theme,
    },
    {
      label: 'Password',
      placeholder: 'Enter your password',
      type: 'password',
      value: values.securityData.password || '',
      onChange: handleChange(formType, 'securityData.password'),
      theme: theme,
    },
    {
      label: 'Email',
      placeholder: 'Enter your email',
      value: values.securityData.email || '',
      onChange: handleChange(formType, 'securityData.email'),
      theme: theme,
    },
    {
      label: 'First Name',
      placeholder: 'Enter your first name',
      value: values.basicData.firstName || '',
      onChange: handleChange(formType, 'basicData.firstName'),
      theme: theme,
    },
    {
      label: 'Last Name',
      placeholder: 'Enter your last name',
      value: values.basicData.lastName || '',
      onChange: handleChange(formType, 'basicData.lastName'),
      theme: theme,
    },
    {
      label: 'Email',
      placeholder: 'Enter your email',
      value: values.securityData.email || '',
      onChange: handleChange(formType, 'securityData.email'),
      theme: theme,
    },
  ];

  if (formType === 'signupForm') {
    const signupFields = [
      {
        label: 'First Name',
        placeholder: 'Enter your first name',
        value: values.basicData.firstName || '',
        onChange: handleChange(formType, 'basicData.firstName'),
        theme: theme,
      },
      {
        label: 'Last Name',
        placeholder: 'Enter your last name',
        value: values.basicData.lastName || '',
        onChange: handleChange(formType, 'basicData.lastName'),
        theme: theme,
      },
      {
        label: 'Email',
        placeholder: 'Enter your email',
        value: values.securityData.email || '',
        onChange: handleChange(formType, 'securityData.email'),
        theme: theme,
      },
      {
        label: 'Username',
        placeholder: 'Enter your username',
        value: values.securityData.username || '',
        onChange: handleChange(formType, 'securityData.username'),
        theme: theme,
      },
      {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        value: values.securityData.password || '',
        onChange: handleChange(formType, 'securityData.password'),
        theme: theme,
      },
    ];
    return [...signupFields, ...commonFields];
  }

  return commonFields; // Only login fields
};
