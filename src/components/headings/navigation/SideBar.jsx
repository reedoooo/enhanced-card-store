import React, { useState } from 'react';
import { Drawer, List, Divider, Hidden } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuItemComponent from '../header/MenuItemComponent';
import { useAuthContext } from '../../../context/hooks/auth';
import getMenuItemsData from '../header/menuItemsData';

const SideBar = ({ handleDrawerState, isOpen, handleLoginDialogState }) => {
  const [selected, setSelected] = useState('Dashboard');
  const { isLoggedIn } = useAuthContext();
  const menuItemsData = getMenuItemsData(isLoggedIn);

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
            return isLoggedIn || !requiresLogin ? (
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
          {isLoggedIn ? (
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
