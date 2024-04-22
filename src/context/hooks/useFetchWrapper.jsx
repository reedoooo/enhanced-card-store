import { useState, useCallback, useEffect } from 'react';
import useLogger from './useLogger';
import useLocalStorage from './useLocalStorage';
import { useLoading } from './useLoading';
import { useSnackbar } from 'notistack';
const FETCH_STATUSES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const useFetchWrapper = () => {
  const [status, setStatus] = useState(FETCH_STATUSES.IDLE);
  const [data, setData] = useState(null);
  const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
  const [error, setError] = useState(null);
  // const { logEvent } = useLogger('useFetchWrapper');
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();
  const showNotification = useCallback(
    (message, variant) => {
      // const showNotification = useCallback(message, variant) => {
      enqueueSnackbar(message, {
        variant: variant,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    },
    [enqueueSnackbar]
  );

  // useEffect to log status changes
  // useEffect(() => {
  //   console.log('Status Change', { status });
  // }, [status]);
  const fetchWrapper = useCallback(
    async (url, method = 'GET', body = null, loadingID) => {
      // setStatus('loading');
      // startLoading(loadingID);
      // showNotification(`Loading ${loadingID}...`, 'info');
      try {
        setStatus(FETCH_STATUSES.LOADING);
        startLoading(loadingID);
        showNotification(`Loading ${loadingID}...`, 'info');
        const headers = { 'Content-Type': 'application/json' };
        const options = {
          method,
          headers,
          ...(body && { body: JSON.stringify(body) }),
        };
        const response = await fetch(url, options);
        const contentType = response.headers.get('content-type');
        let responseData;

        if (contentType && !contentType.includes('application/json')) {
          responseData = await response.text();
        } else {
          responseData = await response.json();
        }
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        setStatus(FETCH_STATUSES.SUCCESS);
        setData(responseData);
        setResponseCache((prevCache) => ({
          ...prevCache,
          [loadingID]: responseData,
        }));
        showNotification(
          `Success: Your ${loadingID} data has been fetched.`,
          'success'
        );

        return responseData;
      } catch (err) {
        const errorMessage = err.message || 'An unknown error occurred';
        setError(errorMessage);
        setStatus(FETCH_STATUSES.ERROR);
        console.error(`Error fetching ${loadingID}:`, errorMessage);
        showNotification(
          `Error fetching ${loadingID}: ${error.toString()}`,
          'error'
        );
        return Promise.reject(err);
      } finally {
        stopLoading(loadingID);
      }
    },
    [
      setStatus,
      // setData,
      setResponseCache,
      setError,
      showNotification,
      startLoading,
      stopLoading,
    ]
  );

  return {
    status,
    data,
    responseCache,
    error,
    fetchWrapper,
    isLoading,
  };
};

export default useFetchWrapper;
