import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAppContext, useAuthContext, useFormContext } from '..';
import useLogger from './useLogger';
import useApiResponseHandler from './useApiResponseHandler';
import useLocalStorage from './useLocalStorage'; // Ensure this is the correct path to your hook
import { defaultContextValue } from '../constants';
import { useLoading } from './useLoading';
const { CARD_CONTEXT } = defaultContextValue;

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const useCardStoreHook = () => {
  const { userId } = useAuthContext();
  const { resetForm } = useFormContext(); // Assuming this is where you get your resetForm function
  const { cardsWithQuantities } = useAppContext(); // Assuming this is where you get your getCardQuantities function
  const logger = useLogger('CardProvider');
  const handleApiResponse = useApiResponseHandler();
  // const [openConfigurator, setOpenConfigurator] = useState(false);

  const [previousSearchData, setPreviousSearchData] = useLocalStorage(
    'previousSearchData',
    []
  );
  const [searchData, setSearchData] = useLocalStorage('searchData', []);
  const [isDataValid, setIsDataValid] = useState(searchData.length > 0);
  const [initialLoad, setInitialLoad] = useState(true); // New state to track the initial load
  const {
    isLoading,
    isAnyLoading,
    startLoading,
    stopLoading,
    setError,
    error,
    clearLoading,
  } = useLoading();
  // const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [cardsVersion, setCardsVersion] = useState(0); // New state for tracking data version
  const [searchSettings, setSearchSettings] = useLocalStorage(
    'searchSettings',
    {}
  );
  // const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  // const toggleConfigurator = () => {
  //   setIsConfiguratorOpen(!isConfiguratorOpen);
  // }; // USE EFFECT TO TRACK OPEN CONFIGURATOR STATE, AND SET TRUE if the sstate changes
  // useEffect(() => {
  //   console.log('Configurator Open State:', isConfiguratorOpen);
  // }, [isConfiguratorOpen]);

  useEffect(() => {
    if (initialLoad) {
      logger.logEvent('INITIAL SEARCH VALUES', { searchData });
      setPreviousSearchData(searchData);
      setInitialLoad(false); // Set initialLoad to false after the first render
    }
  }, [searchData, userId]);
  useEffect(() => {
    logger.logEvent('ALL SEARCH DATA', {
      current: searchData,
      // previous: previousSearchData,
    });
  }, [searchData]);

  const clearSearchData = () => {
    setSearchData([]);
    setIsDataValid(false);
    logger.logEvent('Search Data Cleared');
  };

  const handleRequest = useCallback(
    debounce(async (searchParams) => {
      startLoading('isSearchLoading');
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
        } else {
          clearSearchData();
          resetForm();
        }
      } catch (err) {
        logger.logEvent('Error fetching card data', err);
        clearSearchData();
        resetForm();
      } finally {
        stopLoading('isSearchLoading'); // Set loading to false once the request is complete
      }
    }, 100),
    []
  ); // 500ms delay, adjust as needed

  useEffect(() => {
    // Log updated search values only if it's not the initial load
    if (!initialLoad) {
      logger.logEvent('UPDATED SEARCH VALUES', { searchData });
    }
  }, [searchData]);
  return {
    searchData,
    searchSettings,
    setSearchSettings,
    // previousSearchData,
    isDataValid,
    setSearchData,
    cardsVersion,
    // isConfiguratorOpen,
    // toggleConfigurator,
    // setPreviousSearchData,
    setIsDataValid,
    clearSearchData,
    handleRequest,
    loadingSearchResults: isLoading('isSearchLoading'),
    setLoadingSearchResults: () => {
      startLoading('isSearchLoading');
    },
  };
};
