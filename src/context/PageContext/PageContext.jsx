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
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageError, setPageError] = useState(null);
  const [loadingTimeoutExpired, setLoadingTimeoutExpired] = useState(false);

  const logPageData = (page, data) => {
    console.log(`${page} DATA LOADED:`, data);
  };

  const handleError = (e) => {
    setPageError(e);
    setIsPageLoading(false); // Optionally stop loading if an error occurs
  };

  const clearError = () => {
    setPageError(null);
  };

  const displayErrorIndicator = () => {
    if (error) return <ErrorIndicator error={error} />;
  };

  const handleLoadingTimeout = () => {
    setLoadingTimeoutExpired(true);
    setIsPageLoading(false);
  };

  const clearLoadingTimeout = () => {
    setLoadingTimeoutExpired(false);
  };

  const displayLoadingIndicator = () => {
    if (isLoading) return <LoadingIndicator />;
  };

  const displaySplashPage = () => {
    if (isPageLoading) return <SplashPage />;
  };

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
