// import { useState, useCallback } from 'react';
// import useLogger from './useLogger';
// import useLocalStorage from './useLocalStorage';
// import { useLoading } from './useLoading';

// const useFetchWrapper = () => {
//   const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
//   const [data, setData] = useState(null);
//   const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
//   const [error, setError] = useState(null);
//   const { logEvent } = useLogger('useFetchWrapper');
//   const { startLoading, stopLoading, isLoading } = useLoading();

//   const fetchWrapper = useCallback(
//     async (url, method = 'GET', body = null, loadingID) => {
//       setStatus('loading');
//       startLoading(loadingID);
//       try {
//         const headers = { 'Content-Type': 'application/json' };
//         const options = {
//           method,
//           headers,
//           ...(body && { body: JSON.stringify(body) }),
//         };
//         const response = await fetch(url, options);
//         const contentType = response.headers.get('content-type');
//         let responseData;

//         if (contentType && !contentType.includes('application/json')) {
//           // Handle non-JSON responses first
//           responseData = await response.text();
//         } else {
//           // Fallback to JSON if the content type is application/json
//           responseData = await response.json();
//         }
//         if (!response.ok) {
//           throw new Error(`An error occurred: ${response.statusText}`);
//         }
//         setStatus('success');
//         setData(responseData);
//         setResponseCache((prevCache) => ({
//           ...prevCache,
//           [loadingID]: responseData, // Use loadingID as the key
//         }));

//         return responseData;
//       } catch (error) {
//         setError(error.toString());
//         setStatus('error');
//         logEvent('fetch error', { url, error: error.toString() });
//       } finally {
//         stopLoading(loadingID);
//       }
//     },
//     [setResponseCache, startLoading, stopLoading, logEvent]
//   );
//   return {
//     status,
//     data,
//     responseCache,
//     error,
//     fetchWrapper,
//     isLoading,
//   };
// };

// export default useFetchWrapper;
import { useState, useCallback } from 'react';
import useLogger from './useLogger';
import useLocalStorage from './useLocalStorage';
import { useLoading } from './useLoading';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';

const useFetchWrapper = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [data, setData] = useState(null);
  const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
  const [error, setError] = useState(null);
  const { logEvent } = useLogger('useFetchWrapper');
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fetchWrapper = useCallback(
    async (url, method = 'GET', body = null, loadingID) => {
      setStatus('loading');
      startLoading(loadingID);

      // Show loading snackbar
      const snackbarKey = enqueueSnackbar('Loading...', {
        variant: 'info',
        persist: true, // Keep the snackbar open
        action: (key) => <CircularProgress size={24} />,
      });

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

        return responseData;
      } catch (error) {
        setError(error.toString());
        setStatus('error');
        logEvent('fetch error', { url, error: error.toString() });
      } finally {
        stopLoading(loadingID);
        closeSnackbar(snackbarKey); // Close the loading snackbar
      }
    },
    [
      setResponseCache,
      startLoading,
      stopLoading,
      logEvent,
      enqueueSnackbar,
      closeSnackbar,
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
