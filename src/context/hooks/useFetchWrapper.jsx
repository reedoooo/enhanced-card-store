import { useState, useCallback, useEffect } from 'react';
import useLogger from './useLogger';
import useLocalStorage from './useLocalStorage';
import { useLoading } from './useLoading';
import { useSnackbar } from 'notistack';
// Utility function to serialize errors
function serializeError(error) {
  if (process.env.NODE_ENV !== 'production') {
    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      status: error.status,
    };

    Object.getOwnPropertyNames(error).forEach((key) => {
      errorDetails[key] = error[key];
    });

    return JSON.stringify(errorDetails);
  }
  return { message: error.message };
}
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
  const [errorResponse, setErrorResponse] = useLocalStorage('apiErrors', {});
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
        showNotification(`[LOADING][${loadingID}]`, 'info');
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
          const errorInfo = `Error: ${response.statusText} (status: ${response.status})`;
          console.error('[ERROR B]', responseData); // Log the detailed error message
          const parsed = JSON.parse(responseData);
          const errorDetails = {
            message: parsed.message || 'Unknown error',
            name: parsed.name || 'Error',
            status: parsed.status || 'No status',
            stack: parsed.stack || 'No additional details',
            function: parsed.functionName || 'No function name',
          };
          setErrorResponse((prevErrors) => ({
            ...prevErrors,
            [loadingID]: errorDetails,
          }));
          throw new Error(responseData);
        }

        setStatus(FETCH_STATUSES.SUCCESS);
        setData(responseData);
        setResponseCache((prevCache) => ({
          ...prevCache,
          [loadingID]: responseData.message,
        }));
        showNotification(
          `[SUCCESS][${loadingID}][${responseData?.message}]`,
          'success'
        );
        return responseData;
      } catch (error) {
        // const errorDetails = {
        //   message: error.message || 'Unknown error',
        //   name: error.name || 'Error',
        //   status: error.status || 'No status',
        //   detail: error.stack || 'No additional details',
        // };
        // setErrorResponse((prevErrors) => ({
        //   ...prevErrors,
        //   [loadingID]: errorDetails,
        // }));
        // setErrorResponse((prevErrors) => ({
        //   ...prevErrors,
        //   [loadingID]: {
        //     message: error.message || 'Unknown error',
        //     status: error.status || 'No status',
        //     detail: error.responseData || 'No additional details',
        //     name: error.name || 'No name',
        //   },
        // }));
        setStatus(FETCH_STATUSES.ERROR);
        showNotification(`[Error][${loadingID}] ${error.message}`, 'error');
        throw error;
        // return Promise.reject(err);
      } finally {
        stopLoading(loadingID);
      }
    },
    [
      setStatus,
      setData,
      setResponseCache,
      setErrorResponse,
      showNotification,
      startLoading,
      stopLoading,
    ]
  );

  return {
    status,
    data,
    responseCache,
    errorResponse,
    fetchWrapper,
    isLoading,
  };
};

export default useFetchWrapper;
