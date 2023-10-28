import React, { useEffect, useState } from 'react';
import TopBar from '../navigation/TopBar';
import SideBar from '../navigation/SideBar';
import { useSidebarContext } from '../../../context/SideBarProvider';
import { useAuthContext } from '../../../context/hooks/auth';
import { getMenuItemsData } from './menuItemsData';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import LoginDialog from '../../dialogs/LoginDialog';

const Header = () => {
  const { isOpen, toggleSidebar, setIsOpen } = useSidebarContext();
  const { isloggedin } = useAuthContext();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredMenuItems = getMenuItemsData(isloggedin).filter(
    (item) => !item.requiresLogin || isloggedin
  );

  // Combine useEffect hooks to a single one
  useEffect(() => {
    if (isMobileView) {
      setIsOpen(false);
    }
  }, [isMobileView, setIsOpen]);

  const handleDrawerState = () => toggleSidebar();

  const handleLoginDialogState = () => setLoginDialogOpen(!isLoginDialogOpen);

  const handleLoginDialogClose = () => setLoginDialogOpen(false);

  const handleLoginSuccess = () => setLoginDialogOpen(false); // Implement additional logic if required

  return (
    <>
      <TopBar
        handleDrawerState={handleDrawerState}
        handleLoginDialogState={handleLoginDialogState}
        isOpen={isOpen}
        isMobileView={isMobileView}
        menuSections={filteredMenuItems}
      />
      {isMobileView && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            marginLeft: '1em',
          }}
        >
          <SideBar
            handleDrawerState={handleDrawerState}
            handleLoginDialogState={handleLoginDialogState}
            isOpen={isOpen}
            isMobileView={isMobileView}
            menuSections={filteredMenuItems}
          />
        </Box>
      )}
      <LoginDialog
        open={isLoginDialogOpen}
        onClose={handleLoginDialogClose}
        onLogin={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
