import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { animated, useSprings } from 'react-spring';

import {
  Toolbar,
  IconButton,
  List,
  ListItem,
  AppBar,
  Card,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Logout } from '@mui/icons-material';

import {
  Avatar,
  Box,
  CardContent,
  Divider,
  Drawer,
  ModalClose,
  Sheet,
  Typography,
} from '@mui/joy';
import { getRoutes } from 'data';

import { useMode, useBreakpoint } from 'context';
import {
  RCLoadingButton,
  RCLogoSection,
  RCWrappedIcon,
} from 'layout/REUSABLE_COMPONENTS';

const NavItemLink = ({ type, icon, name, action, actionFunction }) => {
  const { theme } = useMode();
  // const navigate = useNavigate();
  return (
    <Card
      sx={{
        py: type === 'top' ? theme.spacing(4) : theme.spacing(2),
        px: 'auto',
        flexGrow: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        maxWidth: action === 'navigate' ? '100%' : '6rem',
        boxShadow: 'none',
        border: '3px solid',
        borderColor: theme.palette.success.main_light,
        '&:hover': { bgcolor: 'background.level1' },
      }}
      theme={theme}
      onClick={actionFunction}
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
        <RCWrappedIcon size="large" bgColor="success">
          {icon}
        </RCWrappedIcon>
        {name && (
          <Typography level="title-lg" sx={{ ml: 1 }}>
            {name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
const NavMenuItem = ({ type, toggleSidebar }) => {
  return (
    <NavItemLink
      type={type}
      actionFunction={toggleSidebar}
      icon={
        <IconButton
          variant="outlined"
          color="white"
          // onClick={toggleSidebar}
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
      action="toggle"
    />
  );
};
const NavProfileItem = ({ username, type }) => {
  const { theme } = useMode();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        py: type === 'top' ? theme.spacing(4) : theme.spacing(2),
        px: 'auto',
        flexGrow: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        boxShadow: 'none',
        border: '3px solid',
        borderColor: theme.palette.success.main_light,
        '&:hover': { bgcolor: 'background.level1' },
        // display: 'flex',
        // alignItems: 'center',
        // background: 'white',
        // flexDirection: 'row',
        // my: theme.spacing(2),
        // py: theme.spacing(2),
        // cursor: 'pointer',
      }}
      onClick={() => navigate('/profile')}
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
        <Avatar
          variant="soft"
          sx={{
            mr: 1,
            background: theme.palette.success.main_light,
            color: 'white',
          }}
        />
        <Typography level="title-lg" sx={{ ml: 1 }}>
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
};
const renderBaseNavItems = ({ type, toggleSidebar, items }) => {
  const navigate = useNavigate();
  const [springs] = useSprings(items?.length, (index) => ({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: index * 100,
  }));
  return items.map((item, index) => (
    <animated.div
      style={{
        ...springs[index],
        width: '100%',
      }}
      key={item.name}
    >
      <ListItem
        key={index}
        sx={{
          maxHeight: 64,
          maxWidth: '100%',
        }}
      >
        <NavItemLink
          type={type}
          icon={item.icon}
          actionFunction={() => navigate(item.routerPath)}
          // to={item.routerPath}
          name={item.name}
          action="navigate"
          // toggle={toggleSidebar}
        />
      </ListItem>
    </animated.div>
  ));
};
const TopNav = (props) => {
  const { type, username, toggleSidebar } = props;
  const { theme } = useMode();
  const { isMd } = useBreakpoint();
  const baseNavItems = getRoutes().filter((route) => route.navItem);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        maxHeight: 64,
        minWidth: '100vw',
        background: '#141414',
        // borderBottom: `1px solid ${theme.palette.success.main}`,
        // mt: theme.spacing(1),
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <NavMenuItem type={type} toggleSidebar={toggleSidebar} />
          <RCLogoSection />
        </Box>
        {!isMd &&
          renderBaseNavItems({
            items: baseNavItems,
            type: type,
            toggleSidebar,
          })}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <NavProfileItem username={username} type={type} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
const SideNav = (props) => {
  const { theme } = useMode();
  const { isOpen, toggleSidebar, isLoggedIn, username, logout } = props;
  const baseNavItems = getRoutes().filter((route) => route.navItem);

  return (
    <Drawer
      size="sm"
      variant="plain"
      open={isOpen}
      onClose={toggleSidebar}
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
            <NavProfileItem username={username} type={props.type} />
            <RCLoadingButton
              onClick={logout}
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
        <List>
          {renderBaseNavItems({
            items: baseNavItems, // Pass the base nav items
            type: props.type,
            toggleSidebar,
          })}
        </List>
      </Sheet>
    </Drawer>
  );
};
const Navigation = ({ authUser, isLoggedIn, logout }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage open state locally
  const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen]); // const [logoutClicked, setLogoutClicked] = useState(false);
  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);
  return (
    <React.Fragment>
      <TopNav
        username={authUser?.username}
        type="top"
        toggleSidebar={toggleSidebar}
      />
      <SideNav
        username={authUser?.username}
        type="side"
        toggleSidebar={toggleSidebar}
        isOpen={isOpen}
        isLoggedIn={isLoggedIn}
        logout={handleLogout}
      />
    </React.Fragment>
  );
};

export default Navigation;
