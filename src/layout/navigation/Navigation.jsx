import React, { useState, useEffect, useCallback } from 'react';
import {
  Toolbar,
  IconButton,
  List,
  Hidden,
  ListItem,
  ListItemText,
  AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  useAuthContext,
  useCartStore,
  useMode,
  useSidebarContext,
} from '../../context';
import { Navigate, useNavigate } from 'react-router-dom';
import getMenuItemsData from './menuItemsData';
import { useSpring, animated, useSprings } from 'react-spring';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import RCLogoSection from '../REUSABLE_COMPONENTS/RCLOGOSECTION/RCLogoSection';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Radio,
  Sheet,
  Typography,
} from '@mui/joy';
import { useCookies } from 'react-cookie';
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
  const [cookies] = useCookies('authUser');
  const username = cookies?.authUser?.username;
  // const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const items = await getMenuItemsData(
        isLoggedIn,
        totalQuantity,
        iconColor
      );
      setMenuItems(items?.map((item) => ({ ...item, isVisible: true })));
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
            // width: 'clamp(130px, 50%, 175px)', // Responsive width using clamp
            maxHeight: 64,
            maxWidth: '100%',
            // mx: theme.spacing(4),
            '&:hover': {
              backgroundColor: theme.palette.backgroundF.light,
              color: 'white',
            },
          }}
        >
          <Card
            sx={{
              py: type === 'top' ? theme.spacing(4) : theme.spacing(2),
              flexGrow: 1,
              height: '100%',
              width: '100%',
              minWidth: 100,
              boxShadow: 'none',
              '&:hover': { bgcolor: 'background.level1' },
            }}
          >
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              {menuItems[index].icon}
              <Typography level="title-md"> {menuItems[index].name}</Typography>
            </CardContent>
          </Card>
        </ListItem>
      </animated.div>
    ));
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        // position="sticky"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          maxHeight: 64,
          minWidth: '100vw',
          maxWidth: '100vw',
          // minWidth: '100%',
          border: '2px solid white',
          // left: -20,
          // borderRadius: '30px',
          background: '#141414',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            // justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton
              variant="outlined"
              color="white"
              onClick={toggleSidebar}
              size="large"
              edge="start"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <RCLogoSection />
          </Box>
          {renderMenuItems('top')}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Card>
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexGrow: 1,
                }}
              >
                <Avatar variant="soft" />
                <Typography level="title-md">{username}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Hidden smDown implementation="css"> */}
      <Drawer
        size="xs"
        variant="plain"
        open={isOpen}
        onClose={toggleSidebar}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: 'auto' }} />
          <List>{renderMenuItems('side')}</List>
        </Sheet>
      </Drawer>
      {/* </Hidden> */}
    </>
  );
};

export default Navigation;
