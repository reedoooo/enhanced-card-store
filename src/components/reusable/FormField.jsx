// components/form/FormField.js
import React from 'react';
import { StyledTextField } from '../../pages/pageStyles/StyledComponents';

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
