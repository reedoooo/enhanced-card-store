import React, { useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useFormContext } from '../../context';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFormType, // Assuming this function correctly updates the schema/validation rules as needed
  } = useFormContext();

  // Dynamically set the form type on component mount
  useEffect(() => {
    setFormType('loginForm');
  }, [setFormType]);

  const onSubmit = (data) => {
    // Handle the form submission logic here
    console.log(data);
  };

  // Simplification for demonstration purposes
  return (
    <Box sx={{ maxWidth: '100%', padding: '20px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" sx={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;

// import React from 'react';
// import {
//   FormWrapper,
//   StyledTextField,
//   StyledButton,
//   StyledBox,
// } from './styled';
// import { useFormContext, useMode, usePageContext } from '../../context';
// import SignupSwitch from '../buttons/other/SignupSwitch';
// import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';

// const LoginForm = () => {
//   const { theme } = useMode();
//   const { returnDisplay, loadingStatus } = usePageContext();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setFormType, // Assuming this function correctly updates the schema/validation rules as needed
//   } = useFormContext();

//   // Dynamically set the form type on component mount
//   useEffect(() => {
//     setFormType('loginForm');
//   }, [setFormType]);

//   const onSubmit = (data) => {
//     // Handle the form submission logic here
//     console.log(data);
//   };

//   // const signupMode = Boolean(register('signupMode')); // Ensure proper boolean value
//   // const toggleSignupMode = () => {
//   //   handleChange(
//   //     'signupForm',
//   //     'signupMode'
//   //   )({
//   //     target: { value: !signupMode },
//   //   });
//   // };
//   return (
//     <MDBox
//       sx={{
//         maxWidth: '100%',
//         borderRadius: theme.shape.borderRadius,
//         width: { xs: '100%', md: '100%' },
//         padding: theme.spacing(2),
//       }}
//     >
//       {loadingStatus?.isFormDataLoading && returnDisplay()}

//       <FormWrapper onSubmit={handleSubmit()}>
//         {/* Conditional rendering of signup fields */}
//         {signupMode && (
//           <>
//             {/* Fields from basicData for signup */}
//             <StyledTextField
//               margin="normal"
//               required
//               fullWidth
//               label="First Name"
//               placeholder="Enter your first name"
//               {...register('firstName')} // Register the TextField component with useFormContext
//               error={!!errors.lastName} // Show error state if there is an error
//               variant="outlined"
//               theme={theme}
//               helperText={errors.firstName?.message} // Show error message if there is an error
//             />
//             <StyledTextField
//               margin="normal"
//               required
//               fullWidth
//               label="Last Name"
//               placeholder="Enter your last name"
//               {...register('lastName')} // Register the TextField component with useFormContext
//               error={!!errors.lastName} // Show error state if there is an error
//               variant="outlined"
//               theme={theme}
//               helperText={errors.lastName?.message} // Show error message if there is an error
//             />
//             <StyledTextField
//               margin="normal"
//               required
//               fullWidth
//               label="Email"
//               placeholder="Enter your email"
//               {...register('email')} // Register the TextField component with useFormContext
//               error={!!errors.email} // Show error state if there is an error
//               variant="outlined"
//               helperText={errors.email?.message} // Show error message if there is an error
//               theme={theme}
//             />
//           </>
//         )}

//         {/* Common fields for both login and signup from securityData */}
//         <StyledTextField
//           margin="normal"
//           required
//           fullWidth
//           label="Username"
//           placeholder="Enter your username"
//           {...register('username')} // Register the TextField component with useFormContext
//           error={!!errors.username} // Show error state if there is an error
//           variant="outlined"
//           helperText={errors.username?.message} // Show error message if there is an error
//           theme={theme}
//         />
//         <StyledTextField
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           placeholder="Enter your password"
//           type="password"
//           {...register('password')} // Register the TextField component with useFormContext
//           error={!!errors.password} // Show error state if there is an error
//           helperText={errors.password?.message} // Show error message if there is an error
//           variant="outlined"
//           theme={theme}
//         />

//         <StyledBox theme={theme}>
//           <StyledButton type="submit" variant="contained" theme={theme}>
//             {signupMode ? 'Sign Up' : 'Login'}
//           </StyledButton>
//           <SignupSwitch signupMode={signupMode} onToggle={toggleSignupMode} />
//         </StyledBox>
//       </FormWrapper>
//     </MDBox>
//   );
// };

// export default LoginForm;
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
// ! --------------------------------------
// import React from 'react';
// import {
//   FormWrapper,
//   StyledTextField,
//   StyledButton,
//   StyledBox,
// } from './styled';
// import { useFormContext, useMode, usePageContext } from '../../context';
// import SignupSwitch from '../buttons/other/SignupSwitch';
// import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';

// const LoginForm = () => {
//   const { theme } = useMode();
//   const { returnDisplay, loadingStatus } = usePageContext();
//   const { forms, handleChange, handleSubmit } = useFormContext();

//   const loginValues = forms?.loginForm?.securityData || {};
//   const signupValues = forms?.signupForm || {};
//   const signupMode = signupValues?.signupMode;
//   const formType = signupMode ? 'signupForm' : 'loginForm';

//   // Determine the correct values to display based on form type
//   const valueType = signupMode ? signupValues.securityData : loginValues;

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     handleSubmit(formType)(event);
//   };

//   return (
//     <MDBox
//       sx={{
//         maxWidth: '100%',
//         borderRadius: theme.shape.borderRadius,
//         width: { xs: '100%', md: '100%' },
//         padding: theme.spacing(2),
//       }}
//     >
//       {loadingStatus?.isFormDataLoading && returnDisplay()}

//       <FormWrapper onSubmit={handleFormSubmit}>
//         {/* Conditional rendering of signup fields */}
//         {signupMode && (
//           <>
//             {/* Fields from basicData for signup */}
//             <StyledTextField
//               label="First Name"
//               placeholder="Enter your first name"
//               value={signupValues.basicData.firstName || ''}
//               onChange={handleChange(formType, 'basicData.firstName')}
//               margin="normal"
//               variant="outlined"
//               required
//               theme={theme}
//             />
//             <StyledTextField
//               label="Last Name"
//               placeholder="Enter your last name"
//               value={signupValues.basicData.lastName || ''}
//               onChange={handleChange(formType, 'basicData.lastName')}
//               margin="normal"
//               variant="outlined"
//               required
//               theme={theme}
//             />
//             <StyledTextField
//               label="Email"
//               placeholder="Enter your email"
//               value={signupValues.securityData.email || ''}
//               onChange={handleChange(formType, 'securityData.email')}
//               margin="normal"
//               variant="outlined"
//               type="email"
//               required
//               theme={theme}
//             />
//           </>
//         )}

//         {/* Common fields for both login and signup from securityData */}
//         <StyledTextField
//           label="Username"
//           placeholder="Enter your username"
//           value={valueType.username || ''}
//           onChange={handleChange(formType, 'securityData.username')}
//           margin="normal"
//           variant="outlined"
//           required
//           theme={theme}
//         />
//         <StyledTextField
//           label="Password"
//           placeholder="Enter your password"
//           value={valueType.password || ''}
//           type="password"
//           onChange={handleChange(formType, 'securityData.password')}
//           margin="normal"
//           variant="outlined"
//           required
//           theme={theme}
//         />

//         <StyledBox theme={theme}>
//           <StyledButton type="submit" variant="contained" theme={theme}>
//             {signupMode ? 'Sign Up' : 'Login'}
//           </StyledButton>
//           <SignupSwitch signupMode={signupMode} />
//         </StyledBox>
//       </FormWrapper>
//     </MDBox>
//   );
// };

// export default LoginForm;
// ! --------------------------------------
// import React from 'react';
// import { useFormContext, useMode, usePageContext } from '../../context';
// import SignupSwitch from '../buttons/other/SignupSwitch';
// import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
// import DynamicForm from '../reusable/DynamicForm';

// const LoginForm = () => {
//   const { theme } = useMode();
//   const { returnDisplay, loadingStatus } = usePageContext();
//   const { forms, handleChange, handleSubmit } = useFormContext();
//   const signupMode = forms?.signupForm?.signupMode;
//   const formType = signupMode ? 'signupForm' : 'loginForm';
//   // const initialValues = forms[formType];
//   // Define initialValues based on signupMode
//   const initialValues = signupMode
//     ? {
//         signupForm: {
//           securityData: {
//             username: '',
//             password: '',
//             email: '',
//           },
//           basicData: {
//             firstName: '',
//             lastName: '',
//           },
//         },
//       }
//     : {
//         loginForm: {
//           securityData: {
//             username: '',
//             password: '',
//           },
//         },
//       };
//   // Simplify form submission to utilize DynamicForm's onSubmit prop
//   const handleFormSubmit = (formData) => {
//     console.log(`${formType} submitted`, formData);

//     handleSubmit(formType, formData);
//   };

//   // Conditional rendering for the switch between signup and login forms
//   const formTitle = forms?.signupMode ? 'Sign Up' : 'Login';

//   return (
//     <MDBox
//       sx={{
//         maxWidth: '100%',
//         borderRadius: theme.shape.borderRadius,
//         width: { xs: '100%', md: '100%' },
//         padding: theme.spacing(2),
//       }}
//     >
//       {loadingStatus?.isFormDataLoading ? (
//         returnDisplay()
//       ) : (
//         <>
//           <DynamicForm
//             formType={formType}
//             initialValues={initialValues[formType]}
//             onSubmit={handleFormSubmit}
//             submitButtonText={formTitle}
//             theme={theme}
//           />
//           <SignupSwitch signupMode={forms?.signupMode} />
//         </>
//       )}
//     </MDBox>
//   );
// };

// export default LoginForm;
