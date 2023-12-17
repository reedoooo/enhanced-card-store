import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from '@mui/material';
import { useMode } from '../../../context/hooks/colormode';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.background.paper, // Adjusted for a slight contrast
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1], // Subtle shadow for depth

  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: 'bold', // Making label text bold
  color: theme.palette.background.main,
}));

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
    <StyledFormControl fullWidth variant="filled">
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
