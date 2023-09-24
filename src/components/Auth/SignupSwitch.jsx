// SignupSwitch.js
import React from 'react';
import {
  Switch,
  FormControlLabel,
  Typography,
  FormControl,
} from '@mui/material';

const SignupSwitch = ({ signupMode, setSignupMode }) => (
  <FormControl>
    <FormControlLabel
      control={
        <Switch
          checked={signupMode}
          onChange={(e) => setSignupMode(e.target.checked)}
        />
      }
      label={<Typography variant="body1">Sign up mode</Typography>}
    />
  </FormControl>
);

export default SignupSwitch;
