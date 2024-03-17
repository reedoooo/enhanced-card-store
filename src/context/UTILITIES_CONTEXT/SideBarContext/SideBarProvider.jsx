import React, { createContext, useContext, useState } from 'react';
import { useAuthContext } from '../../MAIN_CONTEXT/AuthContext/authContext';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import DeckBuilderIcon from '../../../layout/REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const { login, logout, isLoggedIn } = useAuthContext();
  // TOPBAR
  const [visibleItems, setVisibleItems] = useState([]);
  const baseMenuItems = [
    { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
    {
      name: 'Deck Builder',
      icon: <DeckBuilderIcon />,
      to: '/deckbuilder',
      requiresLogin: false,
    },
    {
      name: 'Collection',
      icon: <CollectionsIcon />,
      to: '/collection',
      requiresLogin: !isLoggedIn,
    },
    {
      name: 'Store',
      icon: <StoreIcon />,
      to: '/store',
      requiresLogin: !isLoggedIn,
    },
    {
      name: 'Cart',
      icon: <ShoppingBasketIcon />,
      to: '/cart',
      requiresLogin: !isLoggedIn,
    },
    {
      name: 'Profile',
      icon: <PersonIcon />,
      to: '/profile',
      requiresLogin: isLoggedIn,
    },
  ];
  const menuItems = baseMenuItems.filter(
    (item) => !item.requiresLogin || isLoggedIn
  );

  const [isOpen, setIsOpen] = useState(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState('#FFFFFF');
  const [sidebarImage, setSidebarImage] = useState(null);
  const [open, setOpen] = React.useState(true);
  const handleCollapse = () => {
    setOpen(!open);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const isMobileView = window.innerWidth < 768;

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isLoggedIn,
        sidebarBackgroundColor,
        sidebarImage,
        toggleSidebar,
        setIsOpen,
        login,
        logout,
        setSidebarBackgroundColor,
        setSidebarImage,
        visibleItems,
        setVisibleItems,
        open,
        handleCollapse,
        setOpen,
        menuItems,
        baseMenuItems,
        isSidebarOpen: isOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
