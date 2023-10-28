// import React, { useState } from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   Typography,
//   Divider,
// } from '@mui/material';
// import { Home as HomeIcon, Map as MapIcon } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// // Custom Components and Hooks
// import MenuItems from './MenuItems';
// import { useSidebarContext } from '../../../context/SideBarProvider';
// import { useAuthContext } from '../../../context/hooks/auth';

// // Styled Components
// import { StyledDrawer, StyledListItem, StyledTypography } from './styled';
// import LoginDialog from '../../dialogs/LoginDialog';

// const SideBar = ({
//   handleDrawerClose,
//   isMobileView,
//   isOpen,
//   toggleSidebar,
//   menuSections,
// }) => {
//   // State
//   const [selected, setSelected] = useState('Dashboard');
//   const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

//   // Context
//   const { sidebarBackgroundColor } = useSidebarContext();

//   // Handlers
//   const handleLoginClick = () => setIsLoginDialogOpen(true);
//   const handleItemClick = (name) => {
//     setSelected(name);
//     handleDrawerClose();
//   };

//   // Close drawer if not in mobile view
//   if (!isMobileView) {
//     handleDrawerClose();
//   }

//   return (
//     <StyledDrawer
//       anchor="right"
//       open={isOpen}
//       onClose={toggleSidebar}
//       bgColor={sidebarBackgroundColor}
//     >
//       <List>
//         <MenuItems
//           setIsLoginDialogOpen={setIsLoginDialogOpen}
//           isLoginDialogOpen={isLoginDialogOpen}
//           isMenuOpen={isOpen}
//           onLoginClick={handleLoginClick} // Corrected this line
//           handleDrawerClose={handleDrawerClose}
//           variant="sidebar"
//           selectedItem={selected}
//           sections={menuSections?.section}
//           menuSections={menuSections}
//           isMobileView={isMobileView}
//         />

//         {menuSections?.map((section, index) => (
//           <div key={index}>
//             <Divider />
//             <StyledTypography variant="h6">{section?.title}</StyledTypography>
//             {section?.items?.map((item) => (
//               <StyledListItem
//                 key={item.index}
//                 selectedItem={selected === item.name}
//                 onClick={() => handleItemClick(item.name)}
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <Typography variant="body1">{item.name}</Typography>
//               </StyledListItem>
//             ))}
//           </div>
//         ))}
//       </List>
//       <LoginDialog
//         open={isLoginDialogOpen}
//         onClose={() => setIsLoginDialogOpen(false)}
//       />
//     </StyledDrawer>
//   );
// };

// export default SideBar;
import React, { useState } from 'react';
import { Drawer, List, Divider, Hidden } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuItemComponent from '../header/MenuItemComponent';
import { useAuthContext } from '../../../context/hooks/auth';
import getMenuItemsData from '../header/menuItemsData';

const SideBar = ({ handleDrawerState, isOpen, handleLoginDialogState }) => {
  const [selected, setSelected] = useState('Dashboard');
  const { isloggedin } = useAuthContext();
  const menuItemsData = getMenuItemsData(isloggedin);

  const handleItemClick = (name) => {
    setSelected(name);
    handleDrawerState();
  };
  return (
    <Hidden smDown implementation="css">
      <Drawer anchor="right" open={isOpen} onClose={handleDrawerState}>
        <List>
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
          <Divider />
          {/* Additional items based on login status */}
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
        </List>
      </Drawer>
    </Hidden>
  );
};

export default SideBar;
