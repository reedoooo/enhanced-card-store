import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSidebarContext } from '../../../context/SideBarContext/SideBarProvider';
import { useAuthContext } from '../../../context/hooks/auth';
import TopBar from '../navigation/TopBar';
import SideBar from '../navigation/SideBar';
import LoginDialog from '../../dialogs/LoginDialog';
import { useMode } from '../../../context';
import useSnackBar from '../../../context/hooks/useSnackBar';
import useDialog from '../../../context/hooks/useDialog';
import getMenuItemsData from './menuItemsData';

const Header = () => {
  const { theme } = useMode();
  const { isOpen, toggleSidebar, setIsOpen } = useSidebarContext();
  const { isLoggedIn, logout } = useAuthContext();
  const handleSnackBar = useSnackBar()[1];
  const { isLoginDialogOpen, openLoginDialog, closeLoginDialog } =
    useDialog(handleSnackBar); // Assuming false represents the logged-in state

  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
  const menuItemsData = getMenuItemsData(isLoggedIn);
  useEffect(() => {
    if (isMobileView) setIsOpen(false);
  }, [isMobileView, setIsOpen]);

  return (
    <>
      <TopBar
        // dialog management
        isDialogOpen={isLoginDialogOpen}
        openDialog={openLoginDialog}
        closeDialog={closeLoginDialog}
        // login management
        isLoggedIn={isLoggedIn}
        handleLogout={logout}
        // drawer management
        handleDrawer={toggleSidebar}
        isOpen={isOpen}
        isMobileView={isMobileView}
        menuItemsData={menuItemsData}
      />
      <SideBar
        // dialog management
        isDialogOpen={isLoginDialogOpen}
        openDialog={openLoginDialog}
        closeDialog={closeLoginDialog}
        // login management
        isLoggedIn={isLoggedIn}
        handleLogout={logout}
        // drawer management
        handleDrawer={toggleSidebar}
        isOpen={isOpen}
        isMobileView={isMobileView}
        menuItemsData={menuItemsData}
      />
      <LoginDialog
      // open={isLoginDialogOpen}
      // onClose={handleToggleLoginDialog('Close')}
      // onLogin={handleToggleLoginDialog('Close')}
      />
      {/* {snackbar} */}
    </>
  );
};

export default Header;
