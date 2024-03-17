import { useState, useCallback } from 'react';
import useLogger from './useLogger';
import useLocalStorage from './useLocalStorage';
import { useLoading } from './useLoading';
import useSnackbarManager from './useSnackbarManager';

const useFetchWrapper = () => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
  const [error, setError] = useState(null);
  const { logEvent } = useLogger('useFetchWrapper');
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { showSuccess, showInfo, showError } = useSnackbarManager();

  const fetchWrapper = useCallback(
    async (url, method = 'GET', body = null, loadingID) => {
      setStatus('loading');
      startLoading(loadingID);

      // Showing loading snackbar
      const loadingSnackbar = showInfo('Loading', loadingID);

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

        // Showing success snackbar
        showSuccess(`Your ${loadingID} data has been fetched successfully.`);

        return responseData;
      } catch (error) {
        setError(error.toString());
        setStatus('error');
        logEvent('fetch error', { url, error: error.toString() });

        // Showing error snackbar
        showError(`Error fetching ${loadingID}: ${error.toString()}`);
      } finally {
        stopLoading(loadingID);

        // Closing loading snackbar
        // closeSnackbar(loadingSnackbar);
      }
    },
    [
      setResponseCache,
      startLoading,
      stopLoading,
      logEvent,
      showSuccess,
      showInfo,
      showError,
      // closeSnackbar,
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
