import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  Divider,
  Typography,
  useTheme,
  Hidden,
  Card,
  CardContent,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoSection from './LogoSection';
import MenuItemComponent from './MenuItemComponent';
import { useCartStore, useMode, useSidebarContext } from '../../context';
import MenuCard from './MenuCard';
import {
  StyledAppBar,
  StyledMenuItem,
  StyledToolbar,
  DrawerHeader,
  StyledBox,
  StyledSwipeableDrawer,
} from '../../pages/pageStyles/StyledComponents';
import { Navigate, useNavigate } from 'react-router-dom';
import getMenuItemsData from './menuItemsData';
import styled from 'styled-components';
import { useSpring, animated, useSprings } from 'react-spring';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
const Navigation = ({ isLoggedIn }) => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { totalQuantity } = useCartStore();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [isOpen, setIsOpen] = useState(false); // Manage open state locally
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const iconColor = isMobileView ? theme.palette.primary.main : 'white';

  // New state to track if component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true when component mounts

    // Fetch data as before
    const fetchData = async () => {
      const cartCardQuantity = totalQuantity;
      const items = await getMenuItemsData(
        isLoggedIn,
        cartCardQuantity,
        iconColor
      ); // Simulated fetch call

      if (isMounted) {
        // Check if component is still mounted before setting state
        setMenuItems(items.map((item) => ({ ...item, isVisible: true }))); // Assuming visibility logic is simplified
      }
    };
    fetchData();

    return () => setIsMounted(false); // Set to false when component unmounts
  }, [isLoggedIn, totalQuantity, iconColor, isMounted]); // Include isMounted in dependency array if it's used within the effect

  const [springs, api] = useSprings(menuItems.length, (index) => ({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: index * 100, // Delay based on index
  }));
  const handleDrawerToggle = () => {
    toggleSidebar();
  };

  const renderMenuItems = (type) =>
    springs.map((style, index) => (
      <animated.div style={style} key={menuItems[index].name}>
        <ListItem
          onClick={() => navigate(menuItems[index].to)}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.backgroundF.light,
              color: 'white',
            },
          }}
        >
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              sx={{
                marginRight: '12px',
                ...theme.typography.commonAvatar,
                ...theme.typography.largeAvatar,
                background: 'transparent',
                color: iconColor,
              }}
            >
              {menuItems[index].icon}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <MDTypography
                variant="subtitle1"
                sx={{
                  color: type === 'top' ? 'white' : theme.palette.primary.main,
                }}
              >
                {menuItems[index].name}
              </MDTypography>
            }
          />
        </ListItem>
      </animated.div>
    ));
  return (
    <>
      <StyledAppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {isMobileView ? (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <IconButton
                onClick={handleDrawerToggle}
                size="large"
                edge="start"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <LogoSection />
            </Box>
          ) : (
            renderMenuItems('top')
          )}
        </Toolbar>
      </StyledAppBar>
      <Hidden smDown implementation="css">
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <List>{renderMenuItems('side')}</List>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;
