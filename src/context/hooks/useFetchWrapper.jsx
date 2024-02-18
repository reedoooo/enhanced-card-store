import { useState, useCallback } from 'react';
import useLogger from './useLogger';
import useLocalStorage from './useLocalStorage';
import { useLoading } from './useLoading';

const useFetchWrapper = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [data, setData] = useState(null);
  const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
  const [error, setError] = useState(null);
  const { logEvent } = useLogger('useFetchWrapper');
  const { startLoading, stopLoading, isLoading } = useLoading();

  const fetchWrapper = useCallback(
    async (url, method = 'GET', body = null, loadingID) => {
      setData(null);
      setError(null);
      setStatus('loading');
      startLoading(loadingID);

      const headers = { 'Content-Type': 'application/json' };
      const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
      };

      try {
        const response = await fetch(url, options);
        const responseData = await response.json(); // Assuming the server always returns JSON

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        setStatus('success');
        setData(responseData);
        setResponseCache((prevCache) => ({
          ...prevCache,
          [loadingID]: responseData, // Use loadingID as the key
        }));
        logEvent('fetch completed', {
          url,
          status: response.status,
          data: responseData,
        });
      } catch (err) {
        setStatus('error');
        setError(err.message || 'An error occurred. Awkward..');
        logEvent('fetch error', { url, error: err.message });
      } finally {
        stopLoading(loadingID);
      }
    },
    [setResponseCache, logEvent, startLoading, stopLoading]
  );
  const getLoadingState = useCallback(
    (loadingID = 'globalLoading') => isLoading(loadingID),
    [isLoading]
  );
  const responseData = {
    status, // Include the fetch status
    data,
    responseCache,
    error,
    fetchWrapper,
    getLoadingState,
  };

  return responseData;
};

export default useFetchWrapper;
