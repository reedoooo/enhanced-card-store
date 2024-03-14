// export default useFetchWrapper;
import { useState, useCallback, useContext } from 'react';
import useLogger from './useLogger';
import useLocalStorage from './useLocalStorage';
import { useLoading } from './useLoading';
// import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';
import useCustomSnackbar from './useCustomSnackbar';

const useFetchWrapper = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [data, setData] = useState(null);
  const [responseCache, setResponseCache] = useLocalStorage('apiResponses', {});
  const [error, setError] = useState(null);
  const { logEvent } = useLogger('useFetchWrapper');
  const { startLoading, stopLoading, isLoading } = useLoading();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fetchWrapper = useCallback(
    async (url, method = 'GET', body = null, loadingID) => {
      // const showSnackbar = useCustomSnackbar();

      setStatus('loading');
      startLoading(loadingID);
      // const snackbarContent = (message, subMessage) => (
      //   <Box>
      //     <Typography variant="body1">{message}</Typography>
      //     <Typography variant="caption" sx={{ display: 'block' }}>
      //       {subMessage}
      //     </Typography>
      //   </Box>
      // );
      // // Show loading snackbar
      // const snackbarKey = enqueueSnackbar(
      //   snackbarContent(
      //     'Loading...',
      //     `Please wait while we fetch your ${loadingID} data.`
      //   ),
      //   {
      //     variant: 'info',
      //     persist: true,
      //     action: (key) => <CircularProgress size={24} />,
      //   }
      // );
      // const snackbarSuccessOptions = {
      //   variant: 'success',
      //   persist: true,
      //   // action: (key) => <CircularProgress size={24} />,
      // };
      // const snackbarInfoOptions = {
      //   variant: 'info',
      //   persist: true,
      // };
      // CustomSnackbar.showSnackbar(
      //   'Loading...',
      //   'Please wait while we fetch your data.',
      //   snackbarInfoOptions
      // );
      // showSnackbar(
      //   'Loading...',
      //   `Please wait while we fetch your ${loadingID} data.`,
      //   {
      //     variant: 'info',
      //     persist: true,
      //     action: (key) => <CircularProgress size={24} />,
      //   }
      // );
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

        // showSnackbar(
        //   'Success!',
        //   `Your ${loadingID} data has been fetched successfully.`,
        //   {
        //     variant: 'success',
        //     persist: true,
        //     action: (key) => <CircularProgress size={24} />,
        //   }
        // );
        return responseData;
      } catch (error) {
        setError(error.toString());
        setStatus('error');
        logEvent('fetch error', { url, error: error.toString() });

        // showSnackbar('Error', error.toString(), {
        //   variant: 'error',
        // });
      } finally {
        stopLoading(loadingID);

        // closeSnackbar(snackbarKey); // Close the loading snackbar
      }
    },
    [
      setResponseCache,
      startLoading,
      stopLoading,
      logEvent,
      // enqueueSnackbar,
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
