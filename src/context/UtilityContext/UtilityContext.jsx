import React, { createContext, useContext, useEffect, useState } from 'react';

const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const contextValue = {
    isLoading,
    setIsLoading,
  };

  // Method to handle errors
  const handleError = (e) => {
    setError(e);
    setIsLoading(false); // Optionally stop loading if an error occurs
  };

  // Method to clear errors
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    if (isLoading) {
      // console.log('Loading...');
    } else {
      console.log('Finished Loading', contextValue);
    }
  }, [setIsLoading]);

  useEffect(() => {
    console.log('UTILITY CONTEXT VALUE:', contextValue);
  }, [contextValue]);

  return (
    <UtilityContext.Provider value={contextValue}>
      {children}
    </UtilityContext.Provider>
  );
};

const useUtilityContext = () => {
  const context = useContext(UtilityContext);
  if (context === undefined) {
    throw new Error('useUtility must be used within a UtilityProvider');
  }
  return context;
};

export { UtilityContext, UtilityProvider, useUtilityContext };
