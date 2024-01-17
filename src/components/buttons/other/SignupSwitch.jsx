import React from 'react';
import {
  Switch,
  FormControlLabel,
  Typography,
  FormControl,
} from '@mui/material';
import { useFormContext, useMode } from '../../../context'; // Adjust with actual path

const SignupSwitch = () => {
  const { theme } = useMode(); // Ensures theme is applied correctly
  const { forms, handleChange } = useFormContext(); // Access form context

  // Retrieve and cast signupMode to boolean. Ensure forms.signupForm exists to avoid errors
  const signupMode = Boolean(forms.signupForm?.signupMode);

  // Function to toggle signupMode in context
  const toggleSignupMode = () => {
    // Pass the new value directly to handleChange function
    handleChange(
      'signupForm',
      'signupMode'
    )({
      target: { value: !signupMode },
    });
  };

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={
          <Switch
            checked={signupMode} // Ensure proper boolean value
            onChange={toggleSignupMode} // Toggle function
            sx={{
              '& .MuiSwitch-thumb': {
                color: signupMode ? theme.palette.backgroundA.dark : '', // Change thumb color based on mode
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: theme.palette.backgroundA.dark, // Change track color when checked
              },
            }}
          />
        }
        label={
          <Typography variant="body1" color="textPrimary">
            Sign up mode
          </Typography>
        }
        style={{
          margin: theme.spacing(1), // Provide some spacing
          justifyContent: 'space-between', // Align items nicely
        }}
      />
    </FormControl>
  );
};

export default SignupSwitch;
