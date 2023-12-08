import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useMode } from '../../../context/hooks/colormode';
import getMenuItemsData from '../header/menuItemsData';
import MenuItemComponent from '../header/MenuItemComponent';
import { StyledToolbar } from './styled';

const TopBar = ({
  handleDrawerState,
  handleLoginDialogState,
  isMobileView,
  isLoggedIn,
  handleLogout,
}) => {
  const { theme } = useMode();
  const menuItemsData = getMenuItemsData(isLoggedIn);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      handleLoginDialogState();
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.background.default,
      }}
    >
      <StyledToolbar theme={theme}>
        {isMobileView ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerState}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              ReedVogt.com
            </Typography>
          </>
        ) : (
          menuItemsData.map((item) => (
            <MenuItemComponent
              key={item.name}
              item={item}
              onClick={handleDrawerState}
            />
          ))
        )}
        <IconButton
          edge="end"
          color="inherit"
          aria-label={isLoggedIn ? 'logout' : 'login'}
          onClick={handleUserIconClick}
        >
          {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default TopBar;
