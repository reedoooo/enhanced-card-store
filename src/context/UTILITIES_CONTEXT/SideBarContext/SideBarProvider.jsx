import React, { createContext, useContext, useState } from 'react';
import { useAuthContext } from '../../AuthContext/authContext';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const { login, logout, isLoggedIn } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState('#FFFFFF');
  const [sidebarImage, setSidebarImage] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
