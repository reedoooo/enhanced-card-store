import React from 'react';
import {
  SwipeableDrawer,
  List,
  Divider,
  Hidden,
  ListItemText,
  Box,
  IconButton,
  Typography,
  ListItemButton,
  Collapse,
} from '@mui/material';
import MenuItemComponent from '../header/MenuItemComponent';
import { useMode, useSidebarContext } from '../../../context';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  DrawerHeader,
  StyledBox,
  StyledSwipeableDrawer,
} from '../../../pages/pageStyles/StyledComponents';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// ==============================|| SIDEBAR DRAWER ||============================== //

const SideBar = ({
  handleLogout,
  handleDrawer,
  isOpen,
  isMobileView,
  menuItemsData,
}) => {
  const { theme } = useMode();
  const {
    open,
    setOpen,
    handleCollapse,
    isLoggedIn,
    menuItems,
    baseMenuItems,
  } = useSidebarContext();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const renderMenuItems = () => {
    return menuItemsData?.map((item, index) => (
      <MenuItemComponent
        key={`${item.name}-sidebar-item-${index}`}
        item={item}
        name={item.name}
        onClick={handleDrawer}
      />
    ));
  };
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
          <DrawerHeader theme={theme} sx={{ flex: '0 0 20%' }}>
            <IconButton>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            <Box
              className="sidebar-top"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '80%',
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
                mb: 1,
              }}
            >
              <i className="logo fab fa-sketch"></i>
              <span className="brand">The App</span>
            </Box>
          </DrawerHeader>

          <Divider />

          {/* THIS RENDERS THE VERTICAL MENU ITEMS */}
          <Box sx={{ flex: '1 0 70%', overflow: 'auto' }}>
            <List>
              <ListItemButton onClick={handleCollapse}>
                <ListItemText primary="Collapsible Menu" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {renderMenuItems()}
              </Collapse>
              <Divider />
            </List>
          </Box>

          <Divider />

          {/* Footer Section */}
          <Box sx={{ flex: '0 0 10%', textAlign: 'center' }}>
            <Typography variant="caption">Footer Content</Typography>
            {/* Footer Items */}
          </Box>
        </StyledBox>
      </StyledSwipeableDrawer>
    </Hidden>
  );
};

export default SideBar;
