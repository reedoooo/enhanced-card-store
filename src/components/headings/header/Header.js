import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../../context/hooks/auth';
import TopBar from '../navigation/TopBar';
import SideBar from '../navigation/SideBar';
import { useSidebarContext } from '../../../context/SideBarProvider';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as AssessmentIcon,
  Deck as DeckOfCardsIcon,
  Person as LoginIcon,
} from '@mui/icons-material';
import { Box } from '@mui/system';

const Header = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 598);
  const {
    isOpen,
    toggleSidebar,
    sidebarBackgroundColor,
    sidebarImage,
    setIsOpen,
  } = useSidebarContext();
  const menuItemsData = [
    {
      title: 'Store',
      items: [
        {
          name: 'Home',
          index: 0,
          icon: <HomeIcon />,
          to: '/home',
          requiresLogin: false,
        },
        {
          name: 'Store',
          index: 1,
          icon: <StoreIcon />,
          to: '/store',
          requiresLogin: true,
        },
        {
          name: 'Deck Builder',
          index: 2,
          icon: <DeckOfCardsIcon />,
          to: '/deckbuilder',
          requiresLogin: true,
        },
        {
          name: 'Cart',
          index: 3,
          icon: <CartIcon />,
          to: '/cart',
          requiresLogin: true,
        },
        {
          name: 'Collection',
          index: 4,
          icon: <AssessmentIcon />,
          to: '/collection',
          requiresLogin: true,
        },
        {
          name: 'Login',
          index: 5,
          icon: <LoginIcon />,
          to: '/login',
          requiresLogin: false,
        },
      ],
    },
  ];
  const handleDrawerOpen = () => {
    if (isMobileView && !isOpen) {
      setIsOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const updateView = () => {
    setIsMobileView(window.innerWidth <= 598);
  };

  useEffect(() => {
    window.addEventListener('resize', updateView);
    if (!isMobileView && isOpen) {
      handleDrawerClose();
    }
    if (!isMobileView && !isOpen) {
      handleDrawerClose();
    }
    if (isMobileView && isOpen) {
      handleDrawerOpen();
    }
    if (isMobileView && !isOpen) {
      handleDrawerClose();
    }
    return () => window.removeEventListener('resize', updateView);
  }, [isMobileView]);

  return (
    <>
      <TopBar
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isOpen={isOpen}
        isMobileView={isMobileView}
        menuSections={isMobileView ? [] : menuItemsData} // Adjust menu items based on view
      />
      {isMobileView && ( // Only render SideBar in mobile view
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            marginLeft: '1em',
          }}
        >
          <SideBar
            handleDrawerClose={handleDrawerClose}
            isOpen={isOpen}
            isMobileView={isMobileView}
            toggleSidebar={toggleSidebar}
            menuSections={menuItemsData}
          />
        </Box>
      )}
    </>
  );
};
export default Header;
