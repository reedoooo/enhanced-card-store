// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { TextField, Button } from '@mui/material';
// import { useFormContext } from '../../context';
// import FormField from './reusable/FormField';

// const ProfileForm = ({ userName, name, age, status, onSave }) => {
//   const { forms, handleChange, handleSubmit } = useFormContext();
//   const profileValues = forms?.updateUserDataForm || {};
//   const formType = 'updateUserDataForm';
//   const handleFormSubmit = (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//     handleSubmit(formType)(event); // Pass the event to your form handler
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <FormField
//         label="Username"
//         id="username"
//         value={profileValues?.username}
//         onChange={handleChange(formType, 'username')}
//         fullWidth
//         margin="normal"
//       />
//       <FormField
//         label="First Name"
//         id="firstName"
//         value={profileValues?.firstName}
//         onChange={handleChange(formType, 'firstName')}
//         fullWidth
//         margin="normal"
//       />
//       <FormField
//         label="Last Name"
//         id="lastName"
//         value={profileValues?.lastName}
//         onChange={handleChange(formType, 'lastName')}
//         fullWidth
//         margin="normal"
//       />
//       <FormField
//         label="Age"
//         id="age"
//         value={profileValues?.age}
//         onChange={handleChange(formType, 'age')}
//         fullWidth
//         margin="normal"
//       />
//       <FormField
//         label="Status"
//         id="status"
//         value={profileValues?.status}
//         onChange={handleChange(formType, 'status')}
//         fullWidth
//         margin="normal"
//       />
//       <Button type="submit" variant="contained" color="primary" fullWidth>
//         Save Changes
//       </Button>
//     </form>
//   );
// };

// ProfileForm.propTypes = {
//   username: PropTypes.string,
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,

//   age: PropTypes.string,
//   status: PropTypes.string,
//   onSave: PropTypes.func.isRequired,
// };

// export default ProfileForm;
