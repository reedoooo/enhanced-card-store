import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import FormField from '../reusable/FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchemas,
  getDefaultValuesFromSchema,
} from '../../context/UTILITIES_CONTEXT/FormContext/schemas'; // Ensure this path is correct
import { LoadingButton } from '@mui/lab';
import { useFormContext, useMode } from '../../context';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import AuthSwitch from '../buttons/other/AuthSwitch';

const SignupForm = ({
  showSnackbar,
  setLoading,
  signupMode,
  toggleAuthMode,
  formLabel,
}) => {
  const { theme } = useMode();

  const { onSubmit } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchemas.signupForm),
    defaultValues: getDefaultValuesFromSchema(formSchemas.signupForm),
  });

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const onFormSubmit = async (data) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

      onSubmit(data, 'loginForm');
      // On success:
      showSnackbar(
        {
          title: 'Success',
          description: "You've successfully logged in.",
        },
        'success'
      ); // Adjust message as needed
    } catch (error) {
      // On error:
      showSnackbar(
        {
          title: 'Error',
          description: 'Login failed. Please try again.',
        },
        'error'
      ); // Adjust message as needed
    }
  };
  useEffect(() => {
    setLoading(isSubmitting);
    console.log('isSubmitting:', isSubmitting);
  }, [isSubmitting, setLoading]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log('Login data:', data);
        onSubmit(data, 'loginForm');
      })}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        margin: 2,
        padding: 2,
      }}
    >
      {fields.map((field, index) => (
        <Box mb={2} key={index}>
          <FormField
            label={field.label}
            name={field.name}
            type={field.type}
            register={register} // Ensure you're calling register correctly
            error={errors[field.name]?.message}
          />
        </Box>
      ))}
      <Box mb={2}>
        {errors.form && (
          <span style={{ color: 'red' }}>{errors.form.message}</span>
        )}
      </Box>
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={() => handleSubmit(onFormSubmit)()}
        color="primary"
        sx={{
          background: theme.palette.backgroundE.darker,
          borderColor: theme.palette.backgroundB.darkest,
          borderWidth: 2,
          flexGrow: 1,
          justifySelf: 'bottom',
          bottom: 0,
          mx: 'auto',
          my: 2,
          '&:hover': {
            fontWeight: 'bold',
            background: theme.palette.backgroundF.dark,
            borderColor: theme.palette.backgroundB.darkest,
            border: `1px solid ${theme.palette.backgroundB.darkest}`,
          },
        }}
        fullWidth
      >
        Sign Up
      </LoadingButton>
      <AuthSwitch
        signupMode={signupMode}
        toggleAuthMode={toggleAuthMode}
        formLabel={formLabel}
      />
    </form>
  );
};

export default withDynamicSnackbar(SignupForm);
