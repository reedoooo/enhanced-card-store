// ReusableFormField.jsx
import React from 'react';
import { StyledTextField } from '../forms/styled';
import { useMode } from '../../context';

const ReusableFormField = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  margin = 'normal',
  variant = 'outlined',
  required = false,
}) => {
  const { theme } = useMode();

  return (
    <StyledTextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      margin={margin}
      variant={variant}
      type={type}
      required={required}
      theme={theme}
    />
  );
};

export default ReusableFormField;
