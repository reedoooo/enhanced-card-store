import React, { createContext, useState, useContext, useEffect } from 'react';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../../components/reusable/indicators/ErrorIndicator';
import SplashPage2 from '../../pages/otherPages/SplashPage2';
import useSnackBar from '../hooks/useSnackBar';
import { isEmpty } from '../Helpers';

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const handleSnackBar = useSnackBar()[1];
  const [activelyLoading, setActivelyLoading] = useState(false); // [false, setActivelyLoading
  const [loadingStatus, setLoadingStatus] = useState({
    isLoading: false,
    isDataLoading: false,
    isFormDataLoading: false,
    isPageLoading: false,
    error: null,
    loadingTimeoutExpired: false,
    loadingType: '',
  });

  // Example: setLoading('isLoading', true);
  // Example: setLoading('isDataLoading', true);
  const setLoading = (type, status) => {
    if (status) setActivelyLoading(true);
    setLoadingStatus((prevStatus) => ({
      ...prevStatus,
      [type]: status,
      loadingType: status ? type : '',
    }));
    // console.log(`Loading ${type} set to:`, status);
  };

  const returnDisplay = () => {
    switch (loadingStatus?.loadingType) {
      case 'error':
        return <ErrorIndicator error={loadingStatus.error} />;
      case 'isLoading':
      case 'isDataLoading':
      case 'isFormDataLoading':
        return <LoadingIndicator />;
      case 'isPageLoading':
        return <SplashPage2 />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const completed = !Object.values(loadingStatus).some(
      (status) => status === true || status instanceof Error
    );
    if (completed) {
      handleSnackBar({
        message: `Loading ${loadingStatus.loadingType} completed`,
        severity: 'success',
      });
    }
  }, [loadingStatus, handleSnackBar]);

  const value = {
    loadingStatus,
    activelyLoading,
    setActivelyLoading,
    returnDisplay,
    setLoading,
    setError: (error) => setLoadingStatus((prev) => ({ ...prev, error })),
    setPageError: (error) =>
      setLoadingStatus((prev) => ({ ...prev, error, isPageLoading: false })),
    setIsLoading: (status) => setLoading('isLoading', status),
    setIsDataLoading: (status) => setLoading('isDataLoading', status),
    setIsFormDataLoading: (status) => setLoading('isFormDataLoading', status),
    setIsPageLoading: (status) => setLoading('isPageLoading', status),
    setLoadingTimeoutExpired: (status) =>
      setLoadingStatus((prev) => ({ ...prev, loadingTimeoutExpired: status })),
    handleLoadingTimeout: () =>
      setLoadingStatus((prev) => ({
        ...prev,
        loadingTimeoutExpired: true,
        isPageLoading: false,
      })),
    logPageData: (pageName, data) => {
      console.log(
        '----------------------------------------------------------------------------------------------------'
      );
      console.log(
        `| [SUCCESS] Received data of type: ${typeof data} in ${pageName}] |`
      );
      console.log(
        '----------------------------------------------------------------------------------------------------'
      );
      if (data === null || data === undefined) {
        console.log(
          '----------------------------------------------------------------------------------------------------'
        );
        console.warn(
          `[Warning] Received null or undefined data in ${pageName}`
        );
        console.log(
          '----------------------------------------------------------------------------------------------------'
        );
        return false;
      }
      if (isEmpty(data) && isEmpty(data?.data) && isEmpty(data?.data?.data)) {
        console.log(
          '----------------------------------------------------------------------------------------------------'
        );
        console.error(
          `[Error] Received empty data object or array in ${pageName}`
        );
        console.log(
          '----------------------------------------------------------------------------------------------------'
        );
        return false;
      }
      return true;
    },
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
