import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useMode } from '../../../context/hooks/colormode';

const CustomSelector = ({ label, name, value, handleChange, values }) => {
  // const handleChange = (event) => {
  //   setValue(
  //     event.target.value.toLowerCase() === 'unset' ? '' : event.target.value
  //   );
  // };
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
    <FormControl fullWidth variant="filled" sx={{ mt: 1, mb: 1 }}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select labelId={name} value={defaultValue} onChange={handleChange}>
        {values.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelector;
