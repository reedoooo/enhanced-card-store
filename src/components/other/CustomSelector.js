import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomSelector = ({ label, name, value, setValue, values }) => {
  const handleChange = (event) => {
    setValue(
      event.target.value.toLowerCase() === 'unset' ? '' : event.target.value
    );
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <FormControl fullWidth variant="filled">
        <InputLabel id={name}>{label}</InputLabel>
        <Select labelId={name} value={value} onChange={handleChange}>
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CustomSelector;
