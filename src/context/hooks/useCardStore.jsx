import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext, useFormContext } from '..';
import useLogger from './useLogger';
import useApiResponseHandler from './useApiResponseHandler';
import useLocalStorage from './useLocalStorage'; // Ensure this is the correct path to your hook

export const useCardStoreHook = () => {
  const { userId } = useAuthContext();
  const { resetForm } = useFormContext(); // Assuming this is where you get your resetForm function
  const logger = useLogger('CardProvider');
  const handleApiResponse = useApiResponseHandler();
  const [searchData, setSearchData] = useLocalStorage('searchData');
  const [isDataValid, setIsDataValid] = useState(searchData.length > 0);
  const [initialLoad, setInitialLoad] = useState(true); // New state to track the initial load
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);

  useEffect(() => {
    if (initialLoad) {
      logger.logEvent('INITIAL SEARCH VALUES', { searchData });
      setInitialLoad(false); // Set initialLoad to false after the first render
    }
  }, [searchData, userId]);
  useEffect(() => {
    logger.logEvent('ALL SEARCH DATA', {
      current: searchData,
      // previous: previousSearchData,
    });
  }, [searchData]);
  // useEffect(() => {
  //   // Whenever searchData updates, store its previous value
  //   setPreviousSearchData(searchData);
  // }, [searchData]);
  // useEffect(() => {
  //   // Log previousSearchData only if it's not the initial load
  //   if (!initialLoad) {
  //     logger.logEvent('PREVIOUS SEARCH VALUES', { previousSearchData });
  //   }
  // }, [searchData]);

  const clearSearchData = () => {
    setSearchData([]);
    setIsDataValid(false);
    logger.logEvent('Search Data Cleared');
  };

  const handleRequest = async (searchParams) => {
    setLoadingSearchResults(true);
    // clearSearchData(); // Clear existing search data before making a new request
    // resetForm(); // Reset the form when a new request is made
    try {
      logger.logEvent('handleRequest start', { searchParams, userId });
      const requestBody = {
        searchParams,
        user: userId,
        searchTerm: searchParams,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
        requestBody
      );

      const data = handleApiResponse(response, 'handleRequest');

      if (data?.data?.length > 0) {
        logger.logEvent('Data Fetched Successfully', {
          dataLength: data.data.length,
        });
        const limitedData = data.data.slice(0, 30); // Limit to 30 cards

        setIsDataValid(true);
        setSearchData(limitedData); // Directly set the new searchData
        // setCardsArray(data.data.slice(0, 60));
      } else {
        clearSearchData();
        resetForm();
      }
    } catch (err) {
      logger.logEvent('Error fetching card data', err);
      clearSearchData();
      resetForm();
    } finally {
      setLoadingSearchResults(false); // Set loading to false once the request is complete
    }
  };

  useEffect(() => {
    // Log updated search values only if it's not the initial load
    if (!initialLoad) {
      logger.logEvent('UPDATED SEARCH VALUES', { searchData });
    }
  }, [searchData]);
  return {
    searchData,
    // previousSearchData,
    isDataValid,
    setSearchData,
    // setPreviousSearchData,
    setIsDataValid,
    clearSearchData,
    handleRequest,
    loadingSearchResults,
    setLoadingSearchResults,
  };
};
