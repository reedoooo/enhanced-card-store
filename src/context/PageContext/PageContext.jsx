import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../../components/reusable/indicators/ErrorIndicator';
import SplashPage2 from '../../pages/otherPages/SplashPage2';
import useSnackBar from '../hooks/useSnackBar';
import { isEmpty } from '../Helpers';

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [snackbar, handleSnackBar, handleCloseSnackbar] = useSnackBar();
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

  const setLoading = (type, status) => {
    setLoadingStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus, [type]: status };

      // Simplify the check for any loading status
      const anyLoading = Object.values(updatedStatus).some(
        (value) => value === true
      );

      setActivelyLoading(anyLoading);
      return { ...updatedStatus, loadingType: anyLoading ? type : '' };
    });
  };

  const returnDisplay = () => {
    if (loadingStatus.error) {
      return <ErrorIndicator error={loadingStatus.error} />;
    }
    switch (loadingStatus.loadingType) {
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
    const isCompleted = Object.values(loadingStatus).every((status) => !status);
    if (isCompleted) {
      handleSnackBar({
        message: `Loading ${loadingStatus.loadingType} completed`,
        severity: 'success',
      });
    }
  }, [loadingStatus, handleSnackBar]);

  const contextValue = useMemo(
    () => ({
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
        setLoadingStatus((prev) => ({
          ...prev,
          loadingTimeoutExpired: status,
        })),
      handleLoadingTimeout: () =>
        setLoadingStatus((prev) => ({
          ...prev,
          loadingTimeoutExpired: true,
          isPageLoading: false,
        })),
    }),
    [loadingStatus, activelyLoading, setLoading]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};
