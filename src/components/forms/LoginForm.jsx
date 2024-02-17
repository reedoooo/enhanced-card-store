import React, { useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Grid, Link } from '@mui/material';
import FormField from '../reusable/FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchemas,
  getDefaultValuesFromSchema,
} from '../../context/UTILITIES_CONTEXT/FormContext/schemas';
import { LoadingButton } from '@mui/lab';
import { useFormContext, useMode } from '../../context';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import { CopyrightOutlined } from '@mui/icons-material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AuthSwitch from '../buttons/other/AuthSwitch';
const LoginForm = ({
  showSnackbar,
  setLoading,
  signupMode,
  toggleAuthMode,
  formLabel,
}) => {
  const { onSubmit } = useFormContext();
  const { theme } = useMode();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchemas.loginForm),
    defaultValues: getDefaultValuesFromSchema(formSchemas.loginForm),
  });

  const fields = [
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
      onSubmit={handleSubmit(onFormSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        margin: 2,
        padding: 2,
      }}
    >
      {fields.map((field, index) => (
        <Box
          key={index}
          sx={{
            m: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexGrow: 1, // Ensure fields take available space
          }}
        >
          <FormField
            label={field.label}
            name={field.name}
            type={field.type}
            register={register} // Ensure you're calling register correctly
            errors={errors}
            required={field.required}
            fullWidth
          />
          {errors[field.name] && (
            <span style={{ color: 'red' }}>{errors[field.name].message}</span>
          )}
        </Box>
      ))}
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
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
        Login
      </LoadingButton>
      <AuthSwitch
        signupMode={signupMode}
        toggleAuthMode={toggleAuthMode}
        formLabel={formLabel}
      />
    </form>
  );
};

export default withDynamicSnackbar(LoginForm);
