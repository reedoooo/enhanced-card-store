import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';

const ProfileForm = ({ userName, name, age, status, onSave }) => {
  const [formData, setFormData] = useState({
    userName: userName || '', // default to empty string if undefined
    name: name || '',
    age: age || '',
    status: status || '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => {
    setFormData({
      userName: userName || '',
      name: name || '',
      age: age || '',
      status: status || '',
    });
  }, [userName, name, age, status]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        id="userName"
        value={formData?.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        id="name"
        value={formData?.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        id="age"
        value={formData?.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        id="status"
        value={formData?.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Add more TextField components as needed */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
    </form>
  );
};

ProfileForm.propTypes = {
  userName: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.string,
  status: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default ProfileForm;
