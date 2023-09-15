import React from 'react';
import { TextField } from '@mui/material';

function FormTextField({ id = 'outlined', label, type }) {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      fullWidth
      sx={{
        marginBottom: '0.8rem',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
      }}
    />
  );
}

export default FormTextField;
