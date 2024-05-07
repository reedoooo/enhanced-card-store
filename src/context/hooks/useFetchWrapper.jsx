import { useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import useLoading from './useLoading';
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
  const [activeLoadingIDs, setActiveLoadingIDs] = useState(new Set());

  const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
  const [errorResponse, setErrorResponse] = useLocalStorage('apiErrors', {});
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();
  const showNotification = useCallback(
    (message, variant) => {
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

  const fetchWrapper = useCallback(
    async (url, method = 'GET', body = null, loadingID) => {
      if (activeLoadingIDs.has(loadingID)) {
        console.log(`Fetch already in progress for: ${loadingID}`);
        return;
      }
      setActiveLoadingIDs((prev) => new Set(prev).add(loadingID));
      setStatus(FETCH_STATUSES.LOADING);
      startLoading(loadingID);
      showNotification(`[LOADING][${loadingID}]`, 'info');

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
          // const error = new Error(response.statusText || 'Unknown error');
          // error.status = response.status;
          // error.responseData = responseData;
          // throw error;
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
          setStatus(FETCH_STATUSES.ERROR);
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
        setStatus(FETCH_STATUSES.ERROR);
        setErrorResponse((prev) => ({
          ...prev,
          [loadingID]: serializeError(error),
        }));

        showNotification(`[Error][${loadingID}] ${error.message}`, 'error');
        throw error;
        // return Promise.reject(err);
      } finally {
        stopLoading(loadingID);
        setActiveLoadingIDs((prev) => {
          const newIDs = new Set(prev);
          newIDs.delete(loadingID);
          return newIDs;
        });
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
      activeLoadingIDs,
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
