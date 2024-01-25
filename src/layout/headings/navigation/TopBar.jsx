import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItemComponent from '../header/MenuItemComponent';
import {
  StyledAppBar,
  StyledMenuItem,
  StyledToolbar,
} from '../../../pages/pageStyles/StyledComponents';
import { useMode } from '../../../context';
import LogoSection from '../../MainLayout/LogoSection';
import getMenuItemsData from '../header/menuItemsData';
// import ProfilePage from '../../pages/ProfilePage';
import {
  ButtonBase,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';

const TopBar = ({ isMobileView, isLoggedIn, handleDrawer }) => {
  const { theme } = useMode();
  const menuItemsData = getMenuItemsData(isLoggedIn);

  // confirm;
  const renderMenuItems = () => {
    return menuItemsData?.map((item, index) => (
      <MenuItemComponent
        key={`${item.name}-topbar-item-${index}`}
        item={item}
        onClick={handleDrawer}
      />
    ));
  };
  return (
    <StyledAppBar position="relative" theme={theme}>
      <StyledToolbar position="relative" theme={theme} disableGutters>
        {isMobileView ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* logo section */}
            <StyledMenuItem theme={theme}>
              <LogoSection />
            </StyledMenuItem>
            {renderMenuItems()}
            {/* <ProfilePage /> */}
            <StyledMenuItem theme={theme}>
              <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Avatar
                  onClick={handleDrawer}
                  variant="rounded"
                  // sx={theme.typography.commonAvatar}
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                />
              </ButtonBase>
            </StyledMenuItem>
            {/* Notification and Profile Sections */}
            {/* <ProfileSection /> */}
            {/* Menu icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawer}
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        ) : (
          // Desktop components
          <Box
            sx={{
              display: 'flex',
              maxWidth: '99%',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <StyledMenuItem theme={theme}>
              <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Avatar
                  onClick={handleDrawer}
                  variant="rounded"
                  // sx={theme.typography.commonAvatar}
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                />
              </ButtonBase>
            </StyledMenuItem>
            {/* <StyledMenuItem theme={theme}>
              <LogoSection />
            </StyledMenuItem> */}
            {renderMenuItems()}
            {/* Notification and Profile Sections */}
            {/* <ProfileSection /> */}
          </Box>
        )}
        {/* Common components */}
        {/* <IconButton
          edge="end"
          color="inherit"
          aria-label={isLoggedIn ? 'logout' : 'login'}
          onClick={logout}
        >
          {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
        </IconButton> */}
        {/* Notification and Profile Sections */}
        {/* <ProfileSection /> */}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default TopBar;
// // TopBar.jsx
// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
// import MenuItemComponent from '../header/MenuItemComponent';
// import {
//   StyledAppBar,
//   StyledToolbar,
// } from '../../../pages/pageStyles/StyledComponents';
// import { useMode } from '../../../context';

// const TopBar = ({
//   handleDrawer,
//   isMobileView,
//   isLoggedIn,
//   handleLogout,
//   menuItemsData,
// }) => {
//   const { theme } = useMode();

//   const handleUserIconClick = () => {
//     if (isLoggedIn) {
//       handleLogout();
//     } else {
//       handleDrawer();
//     }
//   };

//   return (
//     <StyledAppBar position="relative" theme={theme}>
//       <StyledToolbar theme={theme}>
//         {isMobileView ? (
//           <>
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               onClick={handleDrawer}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
//               ReedVogt.com
//             </Typography>
//           </>
//         ) : (
//           menuItemsData?.map((item) => (
//             <MenuItemComponent
//               key={item.name}
//               item={item}
//               onClick={handleDrawer}
//             />
//           ))
//         )}
//         <IconButton
//           edge="end"
//           color="inherit"
//           aria-label={isLoggedIn ? 'logout' : 'login'}
//           onClick={handleUserIconClick}
//         >
//           {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
//         </IconButton>
//       </StyledToolbar>
//     </StyledAppBar>
//   );
// };

// export default TopBar;
