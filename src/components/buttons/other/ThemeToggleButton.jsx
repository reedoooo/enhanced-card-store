import React, { useContext, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../../context/ColorModeProvider';

const ThemeToggleButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleColorMode, setMode } = useContext(ColorModeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (mode) => {
    toggleColorMode(mode); // Updated this line
    console.log('mode', mode);
    // console.log('colorMode', colorMode);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Brightness4Icon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleThemeChange('dark')}>
          <Brightness4Icon />
          Dark Mode
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('light')}>
          <Brightness7Icon />
          Light Mode
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ThemeToggleButton;
