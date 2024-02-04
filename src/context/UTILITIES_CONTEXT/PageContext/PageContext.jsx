import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import LoadingIndicator from '../../../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../../../components/reusable/indicators/ErrorIndicator';
import SplashPage2 from '../../../pages/otherPages/SplashPage2';
import useSnackBar from '../../hooks/useSnackBar';
import { defaultContextValue } from '../../constants';

const PageContext = createContext(defaultContextValue.PAGE_CONTEXT);

export const PageProvider = ({ children }) => {
  const [snackbar, handleSnackBar, handleCloseSnackbar] = useSnackBar();
  // const [activelyLoading, setActivelyLoading] = useState(false); // [false, setActivelyLoading
  const [loadingStatus, setLoadingStatus] = useState({
    isLoading: false,
    isDataLoading: false,
    isFormDataLoading: false,
    isPageLoading: false,
    loadingTimeoutExpired: false,
    error: null,
    loadingType: '',
  });
  useEffect(() => {
    const isCompleted = Object.values(loadingStatus).every((status) => !status);
    if (isCompleted) {
      handleSnackBar({
        message: `Loading ${loadingStatus.loadingType} completed`,
        severity: 'success',
      });
    }
  }, [loadingStatus, handleSnackBar]);
  const setLoading = (type, status) => {
    setLoadingStatus((prevStatus) => ({
      ...prevStatus,
      [type]: status,
      loadingType: status ? type : '',
    }));
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

  const contextValue = useMemo(
    () => ({
      loadingStatus,
      error: loadingStatus.error,
      setActivelyLoading: (status) => setLoading('isLoading', status),
      returnDisplay,
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
    [loadingStatus]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
