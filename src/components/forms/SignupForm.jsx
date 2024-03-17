// import React, { useEffect } from 'react';
// import { Box, Button } from '@mui/material';
// import FormField from './reusable/FormField';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   formSchemas,
//   getDefaultValuesFromSchema,
// } from '../../context/UTILITIES_CONTEXT/FormContext/schemas'; // Ensure this path is correct
// import { LoadingButton } from '@mui/lab';
// import { useFormContext, useMode, usePageContext } from '../../context';
// import AuthSwitch from '../buttons/other/AuthSwitch';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// import {
//   FormBox,
//   FormFieldBox,
// } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
// const baseButtonStyles = {
//   bgcolor: '#6a59ff', // background-color
//   borderColor: '#6a59ff',
//   borderWidth: 2,
//   borderStyle: 'solid',
//   display: 'flex',
//   flexGrow: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   marginBottom: '16px',
//   marginTop: '16px',
//   position: 'relative',
//   bottom: 0,
//   cursor: 'pointer',
//   transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
//   ':hover': {
//     fontWeight: 'bold',
//     bgcolor: '#4a6da7',
//     borderColor: '#34597f',
//   },
//   ':focus': {
//     outline: '2px solid #62a4ff',
//     outlineOffset: 2,
//   },
// };
// const SignupForm = ({ signupMode, toggleAuthMode, formLabel }) => {
//   const { theme } = useMode();
//   const { formMethods, onSubmit, setFormSchema } = useFormContext();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = formMethods;

//   useEffect(() => {
//     setFormSchema('signupForm');
//   }, [setFormSchema]);
//   const fields = [
//     { name: 'firstName', label: 'First Name', type: 'text' },
//     { name: 'lastName', label: 'Last Name', type: 'text' },
//     { name: 'email', label: 'Email', type: 'email' },
//     { name: 'username', label: 'Username', type: 'text' },
//     { name: 'password', label: 'Password', type: 'password' },
//   ];

//   // Updated onFormSubmit to directly use onSubmit from context
//   const onFormSubmit = (data) => {
//     onSubmit(data, 'signupForm');
//   };
//   return (
//     <FormBox
//       component={'form'}
//       theme={theme}
//       onSubmit={handleSubmit(onFormSubmit)}
//     >
//       {fields.map((field, index) => (
//         <FormFieldBox theme={theme} key={index}>
//           <FormField
//             label={field.label}
//             name={field.name}
//             type={field.type}
//             register={register} // Ensure you're calling register correctly
//             error={errors[field.name]?.message}
//           />
//         </FormFieldBox>
//       ))}
//       <Box mb={2}>
//         {errors.form && (
//           <span style={{ color: 'red' }}>{errors.form.message}</span>
//         )}
//       </Box>
//       <LoadingButton
//         type="submit"
//         variant="contained"
//         loading={isSubmitting}
//         size="large"
//         style={baseButtonStyles}
//         startIcon={<PersonAddIcon />}
//         fullWidth
//         sx={{
//           background: theme.palette.backgroundG.light,
//           borderColor: theme.palette.backgroundG.light,
//           borderWidth: 2,
//           '&:hover': { background: theme.palette.backgroundG.default },
//           '&:focus': { background: theme.palette.backgroundG.default },
//         }}
//       >
//         Sign Up
//       </LoadingButton>
//     </FormBox>
//   );
// };

// export default SignupForm;
import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import RCZodForm from './reusable/RCZodForm';

const signupFields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    icon: <PersonIcon />,
    field: 'firstName',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    icon: <PersonIcon />,
    field: 'lastName',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: <EmailIcon />,
    field: 'email',
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    icon: <PersonIcon />,
    field: 'username',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    icon: <LockIcon />,
    field: 'password',
  },
];

const SignupForm = () => {
  return (
    <RCZodForm
      schemaName="signupForm"
      fields={signupFields}
      buttonLabel="Sign Up"
      startIcon={<PersonAddIcon />}
    />
  );
};

export default SignupForm;
