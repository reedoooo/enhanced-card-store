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
import MenuItemComponent from './MenuItemComponent';
import { useMode, useSidebarContext } from '../../context';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  DrawerHeader,
  StyledBox,
  StyledSwipeableDrawer,
} from '../../pages/pageStyles/StyledComponents';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuCard from './MenuCard';

// ==============================|| SIDEBAR DRAWER ||============================== //

const SideBar = ({
  handleLogout,
  handleDrawer,
  isOpen,
  isMobileView,
  menuItemsData,
}) => {
  const { theme } = useMode();
  const { visibleItems, setVisibleItems, menuItems, baseMenuItems } =
    useSidebarContext();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const renderMenuItems = () => {
    return menuItems?.map((item, index) => (
      <MenuItemComponent
        key={`${item.name}-sidebar-item-${index}`}
        item={item}
        name={item.name}
        index={index}
        visibleItems={visibleItems}
        onClick={handleDrawer}
      />
    ));
  };
  return (
    <Hidden smDown implementation="css">
      <StyledSwipeableDrawer
        hideBackdrop={isMobileView}
        anchor="left"
        open={isOpen}
        onClose={handleDrawer}
        onOpen={handleDrawer}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        theme={theme}
      >
        <Box
          role="presentation"
          onClick={handleDrawer}
          theme={theme}
          sx={{
            display: 'flex',
            flexDirection: 'column', // Ensures vertical stacking
            height: '100%', // Take full height of drawer
            // display: 'flex',
            alignItems: 'center',
            // flexDirection: 'row',
          }}
        >
          {' '}
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
            <List sx={{ p: 0, m: 0 }}>
              {/* <ListItemButton onClick={handleCollapse}>
                <ListItemText primary="Collapsible Menu" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton> */}
              {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
              {renderMenuItems()}
              {/* </Collapse> */}
              <Divider />
            </List>
          </Box>
          <Divider />
          <MenuCard />
          {/* Footer Section */}
          <Box sx={{ flex: '0 0 10%', textAlign: 'center' }}>
            <Typography variant="caption">Footer Content</Typography>
            {/* Footer Items */}
          </Box>
        </Box>
      </StyledSwipeableDrawer>
    </Hidden>
  );
};

export default SideBar;
