import React, { useEffect } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
} from '@mui/material';
import FormField from './reusable/FormField';
import { LoadingButton } from '@mui/lab';
import { useFormContext, useMode } from '../../context';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import { CopyrightOutlined } from '@mui/icons-material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AuthSwitch from '../buttons/other/AuthSwitch';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {
  FormBox,
  FormFieldBox,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import SimpleButton from '../../layout/REUSABLE_COMPONENTS/unique/SimpleButton';
const baseButtonStyles = {
  bgcolor: '#6a59ff', // background-color
  borderColor: '#6a59ff',
  borderWidth: 2,
  borderStyle: 'solid',
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '16px',
  marginTop: '16px',
  position: 'relative',
  bottom: 0,
  cursor: 'pointer',
  transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
  ':hover': {
    fontWeight: 'bold',
    bgcolor: '#4a6da7',
    borderColor: '#34597f',
  },
  ':focus': {
    outline: '2px solid #62a4ff',
    outlineOffset: 2,
  },
};
const LoginForm = ({ showSnackbar, signupMode, toggleAuthMode, formLabel }) => {
  const { formMethods, onSubmit, setFormSchema } = useFormContext();
  const { theme } = useMode();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  useEffect(() => {
    setFormSchema('loginForm');
  }, [setFormSchema]);
  const fields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      icon: <PersonIcon />,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      icon: <LockIcon />,
    },
  ];

  const onFormSubmit = (data) => {
    onSubmit(data, 'loginForm')
      .then(() => {
        showSnackbar(
          { title: 'Success', description: "You've successfully logged in." },
          'success'
        );
      })
      .catch((error) => {
        showSnackbar(
          { title: 'Error', description: 'Login failed. Please try again.' },
          'error'
        );
      });
  };
  return (
    <FormBox
      component={'form'}
      theme={theme}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {fields.map((field, index) => (
        <FormFieldBox theme={theme} key={index}>
          <FormField
            label={field.label}
            name={field.name}
            type={field.type}
            register={register} // Ensure you're calling register correctly
            errors={errors}
            error={errors[field.name]?.message}
            required={field.required}
            // fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{field.icon}</InputAdornment>
              ),
            }}
          />
          {errors[field.name] && (
            <span style={{ color: 'red' }}>{errors[field.name].message}</span>
          )}
        </FormFieldBox>
      ))}
      {/* <SimpleButton
        type="submit"
        variant="contained"
        loading={isSubmitting}
        style={baseButtonStyles}
        disabled={isSubmitting}
        fullWidth
      ></SimpleButton> */}
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isSubmitting}
        size="large"
        style={baseButtonStyles}
        startIcon={<LoginIcon />}
        fullWidth
        sx={{
          background: theme.palette.backgroundG.light,
          borderColor: theme.palette.backgroundG.light,
          borderWidth: 2,
          '&:hover': { background: theme.palette.backgroundG.default },
          '&:focus': { background: theme.palette.backgroundG.default },
        }}
      >
        Login
      </LoadingButton>
    </FormBox>
  );
};

export default withDynamicSnackbar(LoginForm);
