import { useCallback } from 'react';
import useSnackBar from './useSnackBar';

const useFetchWrapper = () => {
  const handleSnackBar = useSnackBar()[1];

  const fetchWrapper = useCallback(
    async (url, method, body = null) => {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && { body: JSON.stringify(body) }),
      };

      try {
        handleSnackBar('Loading data...', 'info'); // Notify user data is loading
        const response = await fetch(url, options);
        if (!response.ok) {
          // Handle non-ok responses immediately
          const errorMsg = `API request failed with status: ${response.status} ${response.statusText}`;
          handleSnackBar(errorMsg, 'error'); // Notify user of the error
          throw new Error(errorMsg);
        }
        const data = await response.json(); // Parse the JSON response
        handleSnackBar('Data loaded successfully!', 'success'); // Notify user of success
        return data;
      } catch (error) {
        console.error(`Fetch failed: ${error}`);
        handleSnackBar(`Error: ${error.message}`, 'error'); // Notify user of the error
        throw error; // Re-throwing the error for upstream catch blocks to handle
      }
    },
    [handleSnackBar]
  );

  return fetchWrapper;
};

export default useFetchWrapper;
