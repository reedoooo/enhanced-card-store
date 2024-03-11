import React from 'react';
import {
  Switch,
  FormControlLabel,
  Typography,
  FormControl,
} from '@mui/material';
import { useFormContext, useMode } from '../../../context'; // Adjust with actual path
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

const DeckSwitch = ({ editMode, onToggle }) => {
  const { theme } = useMode(); // Ensures theme is applied correctly

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={
          <Switch
            checked={editMode} // Ensure proper boolean value
            onChange={onToggle} // Toggle function
            sx={{
              '& .MuiSwitch-thumb': {
                color: editMode ? theme.palette.backgroundE.dark : '', // Change thumb color based on mode
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: theme.palette.backgroundE.dark, // Change track color when checked
              },
            }}
          />
        }
        label={
          <MDTypography variant="h6" color="primary">
            {editMode ? 'Edit Mode' : 'View Mode'} {/* Label */}
          </MDTypography>
        }
        style={{
          margin: theme.spacing(1), // Provide some spacing
          justifyContent: 'space-between', // Align items nicely
        }}
      />
    </FormControl>
  );
};

export default DeckSwitch;
