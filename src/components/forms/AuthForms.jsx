import React, { useEffect } from 'react';
import { useFormContext, useMode, usePageContext } from '../../context';
import SignupSwitch from '../buttons/other/SignupSwitch';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import { TextField, Button, Box } from '@mui/material';
import FormField from '../reusable/FormField';
export const LoginForm = () => {
  const { theme } = useMode();
  const { returnDisplay, loadingStatus, setIsFormDataLoading } =
    usePageContext();
  const {
    setFormType,
    currentFormType,
    onSubmit,
    handleSubmit,
    register,
    errors,
    isSubmitting,
  } = useFormContext();

  useEffect(() => setFormType('loginForm'), [setFormType]);

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
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <FormField
          name="username"
          label="Username"
          register={register}
          errors={errors}
          required
        />
        {errors.username && (
          <MDBox sx={{ color: 'error.main' }}>{errors.username.message}</MDBox>
        )}
        <FormField
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          required
        />
        {errors.password && (
          <MDBox sx={{ color: 'error.main' }}>{errors.password.message}</MDBox>
        )}
        <Box sx={{ marginTop: 2 }}>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
          {errors.root && (
            <MDBox sx={{ color: 'error.main' }}>{errors.root.message}</MDBox>
          )}
          <SignupSwitch />
        </Box>
      </form>
    </MDBox>
  );
};

export const SignupForm = () => {
  const { theme } = useMode();
  const { returnDisplay, loadingStatus, setIsFormDataLoading } =
    usePageContext();
  const {
    setFormType,
    currentFormType,
    handleSubmit,
    onSubmit,
    register,
    errors,
    isSubmitting,
  } = useFormContext();

  useEffect(() => setFormType('signupForm'), [setFormType]);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          variant="outlined"
        />
        <FormField
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          variant="outlined"
        />
        <FormField
          label="Email"
          name="email"
          register={register}
          errors={errors}
          variant="outlined"
          type="email"
        />
        <FormField
          label="Username"
          name="username"
          register={register}
          errors={errors}
          variant="outlined"
        />
        <FormField
          label="Password"
          name="password"
          register={register}
          errors={errors}
          variant="outlined"
          type="password"
        />
        <Box sx={{ marginTop: 2 }}>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </Button>
          {/* Optionally, include a toggle button or link to switch back to the login form */}
        </Box>
      </form>
    </MDBox>
  );
};

export default LoginForm;
