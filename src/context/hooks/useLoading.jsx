import { useCallback, useState } from 'react';

/**
 * A hook to manage loading states within components.
 * It supports tracking multiple loading processes at once.
 */
export const useLoading = () => {
  // State to keep track of loading identifiers and their statuses
  const [loadingStates, setLoadingStates] = useState({});

  /**
   * Starts a loading process.
   * @param {string} id - A unique identifier for the loading process.
   */
  const startLoading = useCallback((id) => {
    setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
  }, []);

  /**
   * Stops a loading process.
   * @param {string} id - A unique identifier for the loading process.
   */
  const stopLoading = useCallback((id) => {
    setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
  }, []);

  /**
   * Checks if a specific loading process is active.
   * @param {string} id - A unique identifier for the loading process.
   * @returns {boolean} - The loading state of the specified process.
   */
  const isLoading = useCallback(
    (id) => {
      return !!loadingStates[id];
    },
    [loadingStates]
  );

  /**
   * Checks if any loading process is active.
   * @returns {boolean} - True if any loading process is active, false otherwise.
   */
  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some((state) => state);
  }, [loadingStates]);

  return { startLoading, stopLoading, isLoading, isAnyLoading };
};
