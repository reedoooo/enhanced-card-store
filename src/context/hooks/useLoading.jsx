import { useCallback, useState } from 'react';
const GENERAL_LOADING_IDS = new Set([
  'isLoading',
  'isDataLoading',
  'isFormDataLoading',
  'isPageLoading',
  'isSearchLoading',
]); // Define general loading IDs
const GENERAL_LOADING_STATES = {
  isLoading: 'isLoading',
  isDataLoading: 'isDataLoading',
  isFormDataLoading: 'isFormDataLoading',
  isPageLoading: 'isPageLoading',
  ifIsSearchLoading: 'isSearchLoading',
}; // Define general loading states
const ADDITIONAL_LOADING_STATES = {
  loadingTimeoutExpired: 'loadingTimeoutExpired',
  error: 'error',
}; // Define additional loading states
const DEFAULT_VALUES = {
  loadingStatus: {
    isLoading: false,
    isDataLoading: false,
    isFormDataLoading: false,
    isPageLoading: false,
    isSearchLoading: false,
    error: null,
    loadingTimeoutExpired: false,
    loadingType: '',
  },
  error: null,
  // setActivelyLoading: () => {},
  // returnDisplay: () => null,
  // setLoading: () => {},
  // setError: () => {},
  // setPageError: () => {},
  // setIsLoading: () => {},
  // setIsDataLoading: () => {},
  // setIsFormDataLoading: () => {},
  // setIsPageLoading: () => {},
  // setLoadingTimeoutExpired: () => {},
}; // Define default values

/**
 * A hook to manage loading states within components.
 * It supports tracking multiple loading processes at once.
 */
export const useLoading = () => {
  const [loadingStates, setLoadingStates] = useState({
    isLoading: false,
    isDataLoading: false,
    isFormDataLoading: false,
    isPageLoading: false,
    isSearchLoading: false,
    error: null,
    loadingTimeoutExpired: false,
    loadingType: '',
  });
  const [apiLoadingStates, setApiLoadingStates] = useState({
    login: false,
  });
  const [loadingQueue, setLoadingQueue] = useState([]);
  const [error, setError] = useState(null);
  /**
   * Starts a loading process.
   * @param {string} id - A unique identifier for the loading process.
   */
  const startLoading = useCallback((id) => {
    if (Object.keys(GENERAL_LOADING_STATES).includes(id)) {
      // Corrected check for object keys
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
    } else {
      setApiLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
    }
    setLoadingQueue((prevQueue) => [...prevQueue, id]);
  }, []);

  /**
   * Stops a loading process.
   * @param {string} id - A unique identifier for the loading process.
   */
  const stopLoading = useCallback(
    (id) => {
      if (Object.keys(GENERAL_LOADING_STATES).includes(id)) {
        // Corrected check for object keys
        setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
      } else if (apiLoadingStates[id] !== undefined) {
        setApiLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
      }
      setLoadingQueue((prevQueue) => prevQueue.filter((item) => item !== id));
    },
    [apiLoadingStates]
  );

  /**
   * Checks if a specific loading process is active.
   * @param {string} id - A unique identifier for the loading process.
   * @returns {boolean} - The loading state of the specified process.
   */
  const isLoading = useCallback(
    (id) => {
      return loadingStates[id] || apiLoadingStates[id];
    },
    [loadingStates, apiLoadingStates]
  );

  /**
   * Checks if any loading process is active.
   * @returns {boolean} - True if any loading process is active, false otherwise.
   */
  const isAnyLoading = useCallback(() => {
    return (
      Object.values(loadingStates).some((state) => state) ||
      Object.values(apiLoadingStates).some((state) => state)
    );
  }, [loadingStates, apiLoadingStates]);

  /**
   * Uses isAnythingLoading to determine if any loading processes are active, and if they are, returns a queue of loading identifiers.
   * @returns {string[]} - A queue of loading identifiers.
   */
  const getLoadingQueue = useCallback(() => {
    return loadingQueue;
  }, [loadingQueue]);

  /**
   * Clears the loading queue.
   */
  const clearLoading = useCallback(() => {
    setLoadingStates({
      isLoading: false,
      isDataLoading: false,
      isFormDataLoading: false,
      isPageLoading: false,
      loadingTimeoutExpired: false,
      error: null,
      loadingType: '',
    });
    setApiLoadingStates({});
    setLoadingQueue([]);
    setError(null);
  }, []);

  return {
    isDataLoading: loadingStates.isDataLoading,
    isFormDataLoading: loadingStates.isFormDataLoading,
    isPageLoading: loadingStates.isPageLoading,
    isSearchLoading: loadingStates.isSearchLoading,
    loadingTimeoutExpired: loadingStates.loadingTimeoutExpired,
    loadingQueue: getLoadingQueue(),
    startLoading,
    stopLoading,
    isLoading,
    isAnyLoading,
    getLoadingQueue,
    setError,
    clearLoading,
  };
};
