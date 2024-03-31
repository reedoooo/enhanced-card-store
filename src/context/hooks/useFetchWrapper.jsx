import { useState, useCallback } from 'react';
import useLogger from './useLogger';
import useLocalStorage from './useLocalStorage';
import { useLoading } from './useLoading';
import { useSnackbar } from 'notistack';
const useFetchWrapper = () => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
  const [error, setError] = useState(null);
  const { logEvent } = useLogger('useFetchWrapper');
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();
  const showNotification = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };
  const fetchWrapper = useCallback(
    async (url, method = 'GET', body = null, loadingID) => {
      setStatus('loading');
      startLoading(loadingID);
      showNotification(`Loading ${loadingID}...`, 'info');
      try {
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

        setStatus('success');
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
      } catch (error) {
        setError(error.toString());
        setStatus('error');
        logEvent('fetch error', { url, error: error.toString() });
        showNotification(
          `Error fetching ${loadingID}: ${error.toString()}`,
          'error'
        );
      } finally {
        stopLoading(loadingID);
      }
    },
    [startLoading, stopLoading, logEvent, setResponseCache]
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
