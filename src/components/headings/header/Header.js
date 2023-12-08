import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSidebarContext } from '../../../context/SideBarContext/SideBarProvider';
import { useAuthContext } from '../../../context/hooks/auth';
import TopBar from '../navigation/TopBar';
import SideBar from '../navigation/SideBar';
import LoginDialog from '../../dialogs/LoginDialog';
import { useMode } from '../../../context';

const Header = () => {
  const { theme } = useMode();
  const { isOpen, toggleSidebar, setIsOpen } = useSidebarContext();
  const { isLoggedIn, logout } = useAuthContext();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isMobileView) setIsOpen(false);
  }, [isMobileView, setIsOpen]);

  const toggleLoginDialog = () => setLoginDialogOpen((prevState) => !prevState);
  const closeLoginDialog = () => setLoginDialogOpen(false);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <TopBar
        handleDrawerState={toggleSidebar}
        handleLoginDialogState={toggleLoginDialog}
        isOpen={isOpen}
        isMobileView={isMobileView}
        isLoggedIn={isLoggedIn}
        handleLogoutt={handleLogout}
      />
      <SideBar
        handleDrawerState={toggleSidebar}
        handleLoginDialogState={toggleLoginDialog}
        isOpen={isOpen}
        isMobileView={isMobileView}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <LoginDialog
        open={isLoginDialogOpen}
        onClose={closeLoginDialog}
        onLogin={closeLoginDialog}
      />
    </>
  );
};

export default Header;
