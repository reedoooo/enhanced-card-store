import React, { createContext, useContext, useState } from 'react';

// Create UtilityContext
export const UtilityContext = createContext();

// Create a custom hook for easy access to the context
export const useUtility = (initialState) => {
  const context = useContext(UtilityContext);
  if (!context) {
    throw new Error('useUtility must be used within a UtilityProvider');
  }
  return { ...context, searchParams: context.searchParams || initialState };
};

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

// Create UtilityProvider component
export const UtilityProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(initialState);

  // Toast function to display a message
  const toast = (message, duration = 2000) => {
    // Implement your toast logic here, for example using a library or custom component
    console.log(`Toast: ${message}`);
    setTimeout(() => {
      console.log('Toast dismissed');
    }, duration);
  };

  // Confirm function to display a confirmation dialog
  const confirm = (message) => {
    // Implement your confirmation dialog logic here
    return window.confirm(message);
  };

  const value = {
    searchParams,
    setSearchParams,
    isLoading,
    setIsLoading,
    toast,
    confirm,
  };

  return (
    <UtilityContext.Provider value={value}>{children}</UtilityContext.Provider>
  );
};
