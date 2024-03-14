import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import FormField from './reusable/FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchemas,
  getDefaultValuesFromSchema,
} from '../../context/UTILITIES_CONTEXT/FormContext/schemas'; // Ensure this path is correct
import { LoadingButton } from '@mui/lab';
import { useFormContext, useMode, usePageContext } from '../../context';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import AuthSwitch from '../buttons/other/AuthSwitch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {
  FormBox,
  FormFieldBox,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
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
const SignupForm = ({
  // showSnackbar,
  signupMode,
  toggleAuthMode,
  formLabel,
}) => {
  const { theme } = useMode();
  const { formMethods, onSubmit, setFormSchema } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  useEffect(() => {
    setFormSchema('signupForm');
  }, [setFormSchema]);
  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  // Updated onFormSubmit to directly use onSubmit from context
  const onFormSubmit = (data) => {
    onSubmit(data, 'signupForm');
    // .then(() => {
    //   showSnackbar(
    //     { title: 'Success', description: "You've successfully signed up." },
    //     'success'
    //   );
    // })
    // .catch((error) => {
    //   showSnackbar(
    //     { title: 'Error', description: 'Signup failed. Please try again.' },
    //     'error'
    //   );
    // });
  };
  // useEffect(() => {
  //   setIsFormDataLoading(isSubmitting);
  //   console.log('isSubmitting:', isSubmitting);
  // }, [isSubmitting, setIsFormDataLoading]);
  return (
    <FormBox
      component={'form'}
      theme={theme}
      onSubmit={handleSubmit(onFormSubmit)}
      style={
        {
          // display: 'flex',
          // flexDirection: 'column',
          // flexGrow: 1,
          // margin: 2,
          // padding: 2,
        }
      }
    >
      {fields.map((field, index) => (
        <FormFieldBox theme={theme} key={index}>
          <FormField
            label={field.label}
            name={field.name}
            type={field.type}
            register={register} // Ensure you're calling register correctly
            error={errors[field.name]?.message}
          />
        </FormFieldBox>
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
        size="large"
        style={baseButtonStyles}
        startIcon={<PersonAddIcon />}
        fullWidth
        sx={{
          background: theme.palette.backgroundG.light,
          borderColor: theme.palette.backgroundG.light,
          borderWidth: 2,
          '&:hover': { background: theme.palette.backgroundG.default },
          '&:focus': { background: theme.palette.backgroundG.default },
        }}
        // type="submit"
        // variant="contained"
        // loading={isSubmitting}
        // onClick={() => handleSubmit(onFormSubmit)()}
        // color="primary"
        // sx={{
        //   background: theme.palette.backgroundE.darker,
        //   borderColor: theme.palette.backgroundB.darkest,
        //   borderWidth: 2,
        //   flexGrow: 1,
        //   justifySelf: 'bottom',
        //   bottom: 0,
        //   mx: 'auto',
        //   my: 2,
        //   '&:hover': {
        //     fontWeight: 'bold',
        //     background: theme.palette.backgroundF.dark,
        //     borderColor: theme.palette.backgroundB.darkest,
        //     border: `1px solid ${theme.palette.backgroundB.darkest}`,
        //   },
        // }}
        // fullWidth
      >
        Sign Up
      </LoadingButton>
    </FormBox>
  );
};

export default withDynamicSnackbar(SignupForm);
