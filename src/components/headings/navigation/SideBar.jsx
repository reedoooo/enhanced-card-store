import React, { useState } from 'react';
import {
  Drawer,
  List,
  Divider,
  Hidden,
  ListItemIcon,
  ListItemText,
  ListItem,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuItemComponent from '../header/MenuItemComponent';
import { useAuthContext } from '../../../context/hooks/auth';
import getMenuItemsData from '../header/menuItemsData';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const SideBar = ({
  handleDrawerState,
  isOpen,
  handleLoginDialogState,
  handleLogout,
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState('Dashboard');
  const { isLoggedIn } = useAuthContext();
  const menuItemsData = getMenuItemsData(isLoggedIn);

  const handleItemClick = (name) => {
    setSelected(name);
    handleDrawerState();
  };

  return (
    <Hidden smDown implementation="css">
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleDrawerState}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          {menuItemsData.map((item) => (
            <MenuItemComponent
              key={item.name}
              name={item.name}
              item={item}
              onClick={() => handleItemClick(item.name)}
            />
          ))}
          <Divider />
          {isLoggedIn ? (
            <ListItem
              button
              className={classes.listItem}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <ListItem
              button
              className={classes.listItem}
              onClick={handleLoginDialogState}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Hidden>
  );
};

export default SideBar;
