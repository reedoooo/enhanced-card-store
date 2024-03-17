import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
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
import { useCartStore, useMode, useSidebarContext } from '../../context';
import { StyledAppBar } from '../../pages/pageStyles/StyledComponents';
import { Navigate, useNavigate } from 'react-router-dom';
import getMenuItemsData from './menuItemsData';
import { useSpring, animated, useSprings } from 'react-spring';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import RCLogoSection from '../REUSABLE_COMPONENTS/RCLOGOSECTION/RCLogoSection';
const Navigation = ({ isLoggedIn }) => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { totalQuantity } = useCartStore();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [isOpen, setIsOpen] = useState(false); // Manage open state locally
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const iconColor = isMobileView ? theme.palette.primary.main : 'white';

  useEffect(() => {
    const fetchData = async () => {
      const items = await getMenuItemsData(
        isLoggedIn,
        totalQuantity,
        iconColor
      );
      setMenuItems(items.map((item) => ({ ...item, isVisible: true })));
    };

    fetchData();
  }, [isLoggedIn, totalQuantity, iconColor]);
  const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [isMounted, setIsMounted] = useState(false);
  const [springs, api] = useSprings(menuItems.length, (index) => ({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: index * 100, // Delay based on index
  }));

  const renderMenuItems = (type) =>
    springs.map((style, index) => (
      <animated.div style={style} key={menuItems[index].name}>
        <ListItem
          // component="div"
          // disablePadding
          onClick={() => navigate(menuItems[index].to)}
          sx={{
            width: 'clamp(130px, 50%, 175px)', // Responsive width using clamp
            maxHeight: 64,
            mx: theme.spacing(4),
            '&:hover': {
              backgroundColor: theme.palette.backgroundF.light,
              color: 'white',
            },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleOpenNavMenu}
            color="inherit"
            sx={{
              height: '100%',
              minHeight: 64,
            }}
          >
            {menuItems[index].icon}{' '}
          </IconButton>
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
      <StyledAppBar
        position="sticky"
        sx={{ zIndex: theme.zIndex.drawer + 1, maxHeight: 64 }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            // justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {isMobileView ? (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <IconButton
                onClick={toggleSidebar}
                size="large"
                edge="start"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <RCLogoSection />
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
          onClose={toggleSidebar}
          ModalProps={{ keepMounted: true }}
        >
          <List>{renderMenuItems('side')}</List>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;
