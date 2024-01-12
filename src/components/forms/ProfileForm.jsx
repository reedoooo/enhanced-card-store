import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import { FormWrapper } from './styled';
import { useFormContext } from '../../context';

const ProfileForm = ({ userName, name, age, status, onSave }) => {
  const { forms, handleChange, handleSubmit } = useFormContext();
  const profileValues = forms?.updateUserDataForm || {};
  const formType = 'updateUserDataForm';
  // const [formData, setFormData] = useState({
  //   userName: userName || '', // default to empty string if undefined
  //   name: name || '',
  //   age: age || '',
  //   status: status || '',
  // });
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSave(formData);
  // };

  // useEffect(() => {
  //   setFormData({
  //     userName: userName || '',
  //     name: name || '',
  //     age: age || '',
  //     status: status || '',
  //   });
  // }, [userName, name, age, status]);
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    handleSubmit(formType)(event); // Pass the event to your form handler
  };

  return (
    <FormWrapper onSubmit={handleFormSubmit}>
      <TextField
        label="Username"
        id="username"
        value={profileValues?.username}
        onChange={handleChange(formType, 'username')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="First Name"
        id="firstName"
        value={profileValues?.firstName}
        onChange={handleChange(formType, 'firstName')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        id="lastName"
        value={profileValues?.lastName}
        onChange={handleChange(formType, 'lastName')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        id="age"
        value={profileValues?.age}
        onChange={handleChange(formType, 'age')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        id="status"
        value={profileValues?.status}
        onChange={handleChange(formType, 'status')}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
    </FormWrapper>
  );
};

ProfileForm.propTypes = {
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,

  age: PropTypes.string,
  status: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default ProfileForm;
