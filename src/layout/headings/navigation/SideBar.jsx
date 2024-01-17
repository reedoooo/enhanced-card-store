import React from 'react';
import {
  SwipeableDrawer,
  List,
  Divider,
  Hidden,
  ListItemText,
  Box,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuItemComponent from '../header/MenuItemComponent';
import { useMode } from '../../../context';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { BrowserView, MobileView } from 'react-device-detect';
import {
  DrawerHeader,
  StyledListItem,
  StyledListItemButton,
  StyledListItemIcon,
  StyledSwipeableDrawer,
} from '../../../pages/pageStyles/StyledComponents';
import { StyledBox } from '../../../components/forms/styled';

// ==============================|| SIDEBAR DRAWER ||============================== //

const SideBar = ({
  isLoggedIn,
  handleLogout,
  handleDrawer,
  isOpen,
  isMobileView,
  menuItemsData,
}) => {
  const { theme } = useMode();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Hidden smDown implementation="css">
      <StyledSwipeableDrawer
        hideBackdrop={isMobileView}
        anchor="left"
        // variant={isMobileView ? 'temporary' : 'persistent'}
        open={isOpen}
        onClose={handleDrawer}
        onOpen={handleDrawer}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        theme={theme}
      >
        <StyledBox role="presentation" onClick={handleDrawer} theme={theme}>
          <DrawerHeader theme={theme}>
            <IconButton>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItemsData?.map((item) => (
              <StyledListItem key={item.name} theme={theme}>
                <MenuItemComponent name={item.name} item={item} />
              </StyledListItem>
            ))}
            <Divider />
            <StyledListItem
              theme={theme}
              /* eslint-disable-next-line @typescript-eslint/no-empty-function */
              onClick={isLoggedIn ? handleLogout : () => {}}
            >
              <StyledListItemButton theme={theme}>
                <StyledListItemIcon theme={theme}>
                  {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                </StyledListItemIcon>
                <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} />
              </StyledListItemButton>
            </StyledListItem>
          </List>
        </StyledBox>
      </StyledSwipeableDrawer>
    </Hidden>
  );
};

export default SideBar;
