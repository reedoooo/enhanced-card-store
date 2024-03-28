import React, { useState } from 'react';
import { Switch, FormControlLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMode } from '../../../context';
import { renderToStaticMarkup } from 'react-dom/server';
import { useCookies } from 'react-cookie';

const RCSwitch = ({
  checked,
  onChange,
  labelLeft,
  labelRight,
  iconLeft,
  iconRight,
  formTitle,
  setChecked,
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
