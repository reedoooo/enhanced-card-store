// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Container,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';
// import MenuItems from './MenuItems';
// import {
//   StyledAppBar,
//   StyledBox,
//   StyledIconButton,
//   StyledToolbar,
// } from './styled';
// import ThemeToggleButton from '../../buttons/ThemeToggleButton';

// const TopBar = ({
//   handleDrawerOpen,
//   handleDrawerClose,
//   isOpen,
//   isMobileView,
//   menuSections,
// }) => {
//   const [selected, setSelected] = useState('Dashboard');
//   const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

//   const handleItemClick = (name) => {
//     setSelected(name);
//     handleDrawerClose();
//   };

//   // Close the drawer if it's not a mobile view
//   if (!isMobileView) {
//     handleDrawerClose();
//   }

//   return (
//     <StyledAppBar position="sticky" elevation={4}>
//       <Container maxWidth="lg">
//         <StyledToolbar>
//           <StyledBox>
//             {isMobileView && (
//               <StyledIconButton
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 onClick={handleDrawerOpen}
//               >
//                 <MenuIcon />
//               </StyledIconButton>
//             )}
//             <Typography
//               variant="h6"
//               component={Link}
//               to="/home"
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 textDecoration: 'none',
//                 marginLeft: '1em',
//               }}
//             >
//               SiteName
//             </Typography>
//           </StyledBox>
//           {!isMobileView && (
//             <MenuItems
//               handleDrawerClose={handleDrawerClose}
//               variant="topbar"
//               isMenuOpen={!isMobileView}
//               setIsLoginDialogOpen={setIsLoginDialogOpen}
//               isLoginDialogOpen={isLoginDialogOpen}
//               menuSections={menuSections} // Use filtered menuSections
//               handleItemClick={handleItemClick}
//               isMobileView={isMobileView}
//               selectedItem={selected}
//               isOpen={isOpen}
//             />
//           )}
//           <ThemeToggleButton />
//         </StyledToolbar>
//       </Container>
//     </StyledAppBar>
//   );
// };

// export default TopBar;
// TopBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuItemComponent from '../header/MenuItemComponent';
import { useAuthContext } from '../../../context/hooks/auth';
import getMenuItemsData from '../header/menuItemsData';
import { StyledToolbar } from './styled';

const TopBar = ({
  handleDrawerState,
  handleLoginDialogState,
  handleDrawerClose,
}) => {
  const [selected, setSelected] = useState('Dashboard');
  const { isloggedin } = useAuthContext();
  const menuItemsData = getMenuItemsData(isloggedin);

  const handleItemClick = (name) => {
    setSelected(name);
    handleDrawerState();
  };
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Hidden mdUp implementation="css">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerState}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {menuItemsData.map((item) => {
          const { name, icon, to, requiresLogin } = item;
          return isloggedin || !requiresLogin ? (
            <MenuItemComponent
              key={name}
              name={name}
              item={item}
              icon={icon}
              to={to}
              onClick={handleDrawerState}
            />
          ) : null;
        })}
        {isloggedin ? (
          <MenuItemComponent
            item={{ name: 'Logout', icon: <LogoutIcon /> }}
            onClick={handleLoginDialogState}
          />
        ) : (
          <MenuItemComponent
            item={{
              name: 'Login',
              icon: <LoginIcon />,
              to: '',
              requiresLogin: false,
            }}
            onClick={handleLoginDialogState}
          />
        )}
      </StyledToolbar>
    </AppBar>
  );
};

export default TopBar;
