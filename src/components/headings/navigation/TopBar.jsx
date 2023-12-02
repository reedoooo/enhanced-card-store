import React from 'react';
import { AppBar, Toolbar, IconButton, Hidden, Typography } from '@mui/material';
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
}) => {
  const { theme } = useMode();
  const menuItemsData = getMenuItemsData(isLoggedIn);

  return (
    <AppBar position="static">
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
            <Typography
              variant="h6"
              style={{ flexGrow: 1, textAlign: 'center' }}
            >
              ReedVogt.com
            </Typography>
          </>
        ) : (
          <>
            {menuItemsData.map((item) => (
              <MenuItemComponent
                key={item.name}
                item={item}
                onClick={handleDrawerState}
              />
            ))}
            {isLoggedIn ? (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="logout"
                onClick={handleLoginDialogState}
              >
                <LogoutIcon />
              </IconButton>
            ) : (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="login"
                onClick={handleLoginDialogState}
              >
                <LoginIcon />
              </IconButton>
            )}
          </>
        )}
      </StyledToolbar>
    </AppBar>
  );
};

export default TopBar;

// import React, { useState } from 'react';
// import { AppBar, Toolbar, IconButton, Hidden } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
// import MenuItemComponent from '../header/MenuItemComponent';
// import { useAuthContext } from '../../../context/hooks/auth';
// import getMenuItemsData from '../header/menuItemsData';
// import { StyledToolbar } from './styled';
// import { useMode } from '../../../context/hooks/colormode';

// const TopBar = ({
//   handleDrawerState,
//   handleLoginDialogState,
//   handleDrawerClose,
//   isMobileView,
// }) => {
//   const { theme } = useMode();
//   const [selected, setSelected] = useState('Dashboard');
//   const { isLoggedIn } = useAuthContext();
//   const menuItemsData = getMenuItemsData(isLoggedIn);

//   const handleItemClick = (name) => {
//     setSelected(name);
//     handleDrawerState();
//   };
//   return (
//     <AppBar position="static">
//       <StyledToolbar theme={theme}>
//         <Hidden mdUp implementation="css">
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={handleDrawerState}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Hidden>
//         {menuItemsData.map((item) => {
//           const { name, icon, to, requiresLogin } = item;
//           return isLoggedIn || !requiresLogin ? (
//             <MenuItemComponent
//               key={name}
//               name={name}
//               item={item}
//               icon={icon}
//               to={to}
//               onClick={handleDrawerState}
//             />
//           ) : null;
//         })}
//         {isLoggedIn ? (
//           <MenuItemComponent
//             item={{ name: 'Logout', icon: <LogoutIcon /> }}
//             onClick={handleLoginDialogState}
//           />
//         ) : (
//           <MenuItemComponent
//             item={{
//               name: 'Login',
//               icon: <LoginIcon />,
//               to: '',
//               requiresLogin: false,
//             }}
//             onClick={handleLoginDialogState}
//           />
//         )}
//       </StyledToolbar>
//     </AppBar>
//   );
// };

// export default TopBar;
