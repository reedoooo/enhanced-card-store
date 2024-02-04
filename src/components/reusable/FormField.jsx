// components/form/FormField.js
import React from 'react';
import { TextField } from '@mui/material';
import { StyledTextField } from '../forms/styled';

const FormField = ({ name, register, errors, theme, ...props }) => (
  <StyledTextField
    {...register(name)}
    error={!!errors[name]}
    helperText={errors[name]?.message}
    margin="normal"
    fullWidth
    variant="outlined"
    theme={theme}
    {...props}
  />
);

export default FormField;
