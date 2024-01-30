import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from '@mui/material';
import {
  StyledFormControl,
  StyledInputLabel,
} from '../../../pages/pageStyles/StyledComponents';
import { useMode } from '../../../context';

const CustomSelector = ({ label, name, value, handleChange, values }) => {
  const defaultValue = value || 'Unset';

  if (!values) {
    return <div>Values not provided</div>;
  }

  if (!handleChange) {
    return <div>handleChange not provided</div>;
  }

  if (!defaultValue) {
    return <div>Value not provided</div>;
  }

  const { theme } = useMode();

  return (
    <StyledFormControl fullWidth variant="filled" theme={theme}>
      <StyledInputLabel id={name} theme={theme}>
        {label}
      </StyledInputLabel>
      <Select
        labelId={name}
        value={defaultValue}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, // Limit the dropdown height
              boxShadow: theme.shadows[2], // Dropdown shadow
            },
          },
        }}
      >
        {values.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default CustomSelector;
