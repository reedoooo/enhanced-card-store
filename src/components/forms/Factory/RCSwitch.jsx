import React, { useState } from 'react';
import { Switch, FormControlLabel, FormControl } from '@mui/material';
import { useMode } from 'context';

const RCSwitch = ({
  checked,
  onChange,
  labelLeft,
  labelRight,
  size = { width: 50, height: 14, thumbWidth: 22, thumbHeight: 22 },
}) => {
  const { theme } = useMode();
  // const toggleSwitch = () => setChecked(!checked);

  return (
    <FormControl component="fieldset" sx={{ alignItems: 'center' }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} theme={theme} />}
        label={checked ? labelRight : labelLeft}
        style={{ margin: 'auto', justifyContent: 'center' }}
      />
    </FormControl>
  );
};

export default RCSwitch;
