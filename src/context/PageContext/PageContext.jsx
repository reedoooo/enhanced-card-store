import React, { createContext, useState, useContext } from 'react';
import { SplashPage } from '../../pages';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../../components/reusable/indicators/ErrorIndicator';

// Creating the context
const PageContext = createContext();

// Hook for consuming the context
export const usePageContext = () => useContext(PageContext);

// Provider component
export const PageProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageError, setPageError] = useState(null);
  const [loadingTimeoutExpired, setLoadingTimeoutExpired] = useState(false);

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

  // Method to display error indicator
  const displayErrorIndicator = () => {
    if (error) return <ErrorIndicator error={error} />;
  };

  // Method to handle loading timeout
  const handleLoadingTimeout = () => {
    setLoadingTimeoutExpired(true);
    setIsPageLoading(false);
  };

  // Method to clear loading timeout
  const clearLoadingTimeout = () => {
    setLoadingTimeoutExpired(false);
  };

  // Method to display loading indicator
  const displayLoadingIndicator = () => {
    if (isLoading) return <LoadingIndicator />;
  };

  // Method to display splash page
  const displaySplashPage = () => {
    if (isPageLoading) return <SplashPage />;
  };

  // Values to be provided in the context
  const value = {
    isPageLoading,
    pageError,
    error,
    isLoading,
    loadingTimeoutExpired,
    displayErrorIndicator,
    displayLoadingIndicator,
    displaySplashPage,
    handleLoadingTimeout,
    clearLoadingTimeout,

    setIsPageLoading,
    setIsLoading,
    setLoadingTimeoutExpired,
    setError,
    setPageError,
    handleError,
    clearError,
    logPageData,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export default PageProvider;
