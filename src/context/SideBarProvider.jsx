import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState('#FFFFFF');
  const [sidebarImage, setSidebarImage] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const login = () => {
    setisLoggedIn(true);
  };

  const logout = () => {
    setisLoggedIn(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        setIsOpen,
        isLoggedIn,
        login,
        logout,
        sidebarBackgroundColor,
        setSidebarBackgroundColor,
        sidebarImage,
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
