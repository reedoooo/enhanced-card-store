import React, { useState, useEffect, useCallback } from 'react';
import {
  Toolbar,
  IconButton,
  List,
  Hidden,
  ListItem,
  ListItemText,
  AppBar,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMode } from 'context';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, useSprings } from 'react-spring';
import RCLogoSection from 'layout/REUSABLE_COMPONENTS/RC_OTHER/RCLogoSection';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Drawer,
  ModalClose,
  Radio,
  Sheet,
  Typography,
} from '@mui/joy';
import { baseMenuItems } from 'data/baseMenuItems';
import rgba from 'assets/themes/functions/rgba';
import useManageCookies from 'context/hooks/useManageCookies';
import ReusableLoadingButton from 'layout/REUSABLE_COMPONENTS/ReusableLoadingButton';
import { Logout } from '@mui/icons-material';
import useAuthManager from 'context/state/useAuthManager';
import useManager from 'context/useManager';
import RCLoadingButton from 'layout/REUSABLE_COMPONENTS/RCLOADINGBUTTON';
const Navigation = () => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { cart } = useManager();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [isOpen, setIsOpen] = useState(false); // Manage open state locally
  const isMedView = useMediaQuery(theme.breakpoints.down('md'));
  const { getCookie } = useManageCookies();
  const { authUser, isLoggedIn } = getCookie(['authUser', 'isLoggedIn']);
  const username = authUser?.username;
  const { logout } = useAuthManager();
  const menuItems = baseMenuItems({ cartCardQuantity: cart?.items?.length });
  const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [springs] = useSprings(menuItems.length, (index) => ({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: index * 100,
  }));
  const handleLogout = useCallback(async () => {
    setLogoutClicked(true);
    await logout();
    navigate('/login');
    setLogoutClicked(false);
  }, [logout, navigate]);
  const ContentContainer = ({ type, content, clickAction, itemIndex }) => {
    const handleClick = () => {
      if (clickAction === 'navigate' && itemIndex !== undefined) {
        navigate(menuItems[itemIndex].to);
      } else {
        toggleSidebar();
      }
    };
    return (
      <Card
        sx={{
          py: type === 'top' ? theme.spacing(4) : theme.spacing(2),
          px: 'auto',
          flexGrow: 1,
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          maxWidth: clickAction === 'navigate' ? '100%' : '5rem',
          boxShadow: 'none',
          border: '3px solid',
          borderColor: theme.palette.chartTheme.greenAccent.light,
          '&:hover': { bgcolor: 'background.level1' },
        }}
        onClick={handleClick}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {content}
        </CardContent>
      </Card>
    );
  };

  const renderMenuItems = (type) => {
    return springs.map((style, index) => (
      <animated.div style={style} key={`${menuItems[index]?.name}`}>
        <ListItem
          sx={{
            maxHeight: 64,
            maxWidth: '100%',
            '&:hover': {
              backgroundColor: rgba(theme.palette.greenAccent.lighterSeaGreen),
            },
          }}
        >
          <ContentContainer
            type={type}
            content={
              <>
                {menuItems[index]?.icon}
                <Typography level="title-lg" sx={{ ml: 1 }}>
                  {menuItems[index]?.name}
                </Typography>
              </>
            }
            itemIndex={index}
            clickAction="navigate"
          />
        </ListItem>
      </animated.div>
    ));
  };
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          maxHeight: 64,
          minWidth: '100vw',
          background: '#141414',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ContentContainer
              type="top"
              content={
                <IconButton
                  variant="outlined"
                  color="white"
                  onClick={toggleSidebar}
                  size="small"
                  edge="start"
                  aria-label="menu"
                  sx={{
                    justifyContent: 'center',
                    px: 'auto',
                  }}
                >
                  <MenuIcon />
                </IconButton>
              }
              clickAction={'toggle'}
              index={0}
            />
            <RCLogoSection />
          </Box>
          {!isMedView && renderMenuItems('top')}
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              flexDirection: 'row',
              my: theme.spacing(2),
              py: theme.spacing(2),
              cursor: 'pointer',
            }}
            onClick={() => navigate('/profile')}
          >
            <Avatar
              variant="soft"
              sx={{
                mr: 1,
                background: theme.palette.chartTheme.greenAccent.light,
                color: 'white',
              }}
            />
            <Typography level="title-lg">{username}</Typography>
          </Card>
        </Toolbar>
      </AppBar>
      {/* <Hidden smDown implementation="css"> */}
      <Drawer
        // size="xs"
        size="sm"
        variant="plain"
        open={isOpen}
        onClose={toggleSidebar}
        // ! ModalProps={{ keepMounted: true }}
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
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
          <Card
            sx={{
              display: 'flex',
              // gap: 2,
              alignItems: 'center',
              background: 'black',
              flexDirection: 'row',
              my: theme.spacing(2),
              py: theme.spacing(2),
            }}
          >
            <RCLogoSection />
          </Card>
          {isLoggedIn && (
            <>
              <Card
                sx={{
                  display: 'flex',
                  // gap: 2,
                  alignItems: 'center',
                  background: 'white',
                  flexDirection: 'row',
                  // my: theme.spacing(1),
                  // py: theme.spacing(1),
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/profile')}
              >
                <Avatar
                  variant="soft"
                  sx={{
                    mr: 1,
                    background: theme.palette.chartTheme.greenAccent.light,
                    color: 'white',
                    // cursor: 'pointer',
                  }}
                  // onClick={() => navigate('/profile')}
                />
                <Typography level="title-lg">{username}</Typography>
              </Card>
              <RCLoadingButton
                onClick={handleLogout}
                loading={logoutClicked}
                withContainer={false}
                fullWidth={true}
                circular={true}
                icon={<Logout />}
                variant="holo"
                color="error"
                label="Logout"
                size="large"
              />
            </>
          )}
          <ModalClose />
          <Divider sx={{ mt: '1rem' }} />
          <List>{renderMenuItems('side')}</List>
        </Sheet>
      </Drawer>
      {/* </Hidden> */}
    </>
  );
};

export default Navigation;
