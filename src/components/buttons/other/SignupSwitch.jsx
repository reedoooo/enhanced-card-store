import React from 'react';
import { Switch, FormControlLabel, FormControl } from '@mui/material';
import { useFormContext, useMode } from '../../../context'; // Adjust with actual path
const SignupSwitch = ({ signupMode, toggleAuthMode, formLabel }) => {
  const { theme } = useMode(); // Ensures theme is applied correctly

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={
          <Switch
            checked={signupMode} // Ensure proper boolean value
            onChange={
              toggleAuthMode // Toggle function
            } // Toggle function
            sx={{
              '& .MuiSwitch-thumb': {
                color: signupMode ? theme.palette.backgroundE.dark : '', // Change thumb color based on mode
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: theme.palette.backgroundE.dark, // Change track color when checked
              },
            }}
          />
        }
        label={formLabel}
        style={{
          margin: theme.spacing(1), // Provide some spacing
          justifyContent: 'space-between', // Align items nicely
        }}
      />
    </FormControl>
  );
};

export default SignupSwitch;
