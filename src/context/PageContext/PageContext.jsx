import React, { createContext, useState, useContext } from 'react';

// Creating the context
const PageContext = createContext();

// Hook for consuming the context
export const usePageContext = () => useContext(PageContext);

// Provider component
export const PageProvider = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pageError, setPageError] = useState(null);

  // Function to log page data
  const logPageData = (page, data) => {
    console.log(`${page} DATA LOADED:`, data);
  };

  // Method to handle errors
  const handleError = (e) => {
    setPageError(e);
    setIsPageLoading(false); // Optionally stop loading if an error occurs
  };

  // Method to clear errors
  const clearError = () => {
    setPageError(null);
  };

  // Values to be provided in the context
  const value = {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    handleError,
    clearError,
    logPageData,
    // Add more exported context values here
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export default PageProvider;
