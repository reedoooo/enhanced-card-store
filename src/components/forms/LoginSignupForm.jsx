import React from 'react';
import {
  FormWrapper,
  StyledTextField,
  StyledButton,
  StyledBox,
} from './styled';
import { useFormContext, useMode, usePageContext } from '../../context';
import SignupSwitch from '../buttons/other/SignupSwitch';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import { TextField } from '@mui/material';

const LoginSignupForm = () => {
  const { theme } = useMode();
  const { returnDisplay, loadingStatus } = usePageContext();
  const {
    register, // useFormContext hook now provides 'register' for registering inputs
    setFormType, // Dynamically set the form type as needed
    setCurrentFormType,
    handleChange,
    handleSubmit,
    formState: { errors }, // Access form errors
  } = useFormContext();
  // Dynamically set form type for login
  // Set form type upon component mount
  React.useEffect(() => {
    setFormType('loginForm'); // Assuming 'setFormType' is a method provided by your context to set the current form type
  }, [setFormType]);
  // const loginValues = forms?.loginForm?.securityData || {};
  // const signupValues = forms?.signupForm || {};
  // const signupMode = signupValues?.signupMode;
  // const formType = signupMode ? 'signupForm' : 'loginForm';

  // // Determine the correct values to display based on form type
  // const valueType = signupMode ? signupValues.securityData : loginValues;

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   handleSubmit(formType)(event);
  // };
  // const onSubmit = (data) => {
  //   console.log(data); // Handle form submission
  // };

  const signupMode = Boolean(register('signupMode')); // Ensure proper boolean value
  const toggleSignupMode = () => {
    // Pass the new value directly to handleChange function
    handleChange(
      'signupForm',
      'signupMode'
    )({
      target: { value: !signupMode },
    });
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

      <FormWrapper onSubmit={handleSubmit()}>
        {/* Conditional rendering of signup fields */}
        {signupMode && (
          <>
            {/* Fields from basicData for signup */}
            <StyledTextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              placeholder="Enter your first name"
              {...register('firstName')} // Register the TextField component with useFormContext
              error={!!errors.lastName} // Show error state if there is an error
              variant="outlined"
              theme={theme}
              helperText={errors.firstName?.message} // Show error message if there is an error
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              placeholder="Enter your last name"
              {...register('lastName')} // Register the TextField component with useFormContext
              error={!!errors.lastName} // Show error state if there is an error
              variant="outlined"
              theme={theme}
              helperText={errors.lastName?.message} // Show error message if there is an error
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              label="Email"
              placeholder="Enter your email"
              {...register('email')} // Register the TextField component with useFormContext
              error={!!errors.email} // Show error state if there is an error
              variant="outlined"
              helperText={errors.email?.message} // Show error message if there is an error
              theme={theme}
            />
          </>
        )}

        {/* Common fields for both login and signup from securityData */}
        <StyledTextField
          margin="normal"
          required
          fullWidth
          label="Username"
          placeholder="Enter your username"
          {...register('username')} // Register the TextField component with useFormContext
          error={!!errors.username} // Show error state if there is an error
          variant="outlined"
          helperText={errors.username?.message} // Show error message if there is an error
          theme={theme}
        />
        <StyledTextField
          margin="normal"
          required
          fullWidth
          label="Password"
          placeholder="Enter your password"
          type="password"
          {...register('password')} // Register the TextField component with useFormContext
          error={!!errors.password} // Show error state if there is an error
          helperText={errors.password?.message} // Show error message if there is an error
          variant="outlined"
          theme={theme}
        />

        <StyledBox theme={theme}>
          <StyledButton type="submit" variant="contained" theme={theme}>
            {signupMode ? 'Sign Up' : 'Login'}
          </StyledButton>
          <SignupSwitch signupMode={signupMode} onToggle={toggleSignupMode} />
        </StyledBox>
      </FormWrapper>
    </MDBox>
  );
};

export default LoginSignupForm;
