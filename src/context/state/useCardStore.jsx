import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useLogger from '../hooks/useLogger';
import useLocalStorage from '../hooks/useLocalStorage'; // Ensure this is the correct path to your hook
import useLoading from '../hooks/useLoading';
import useManageCookies from '../hooks/useManageCookies';

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

const useCardStore = () => {
  const { getCookie } = useManageCookies();
  const { userId } = getCookie(['userId']);
  const logger = useLogger('CardProvider');
  const [previousSearchData, setPreviousSearchData] = useLocalStorage(
    'previousSearchData',
    []
  );
  const [searchData, setSearchData] = useLocalStorage('searchData', []);
  const [randomCards, setRandomCards] = useLocalStorage('randomCards', []);
  const [isDataValid, setIsDataValid] = useState(searchData.length > 0);
  const [initialLoad, setInitialLoad] = useState(true); // New state to track the initial load
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [cardsVersion, setCardsVersion] = useState(0); // New state for tracking data version
  const [searchSettings, setSearchSettings] = useLocalStorage(
    'searchSettings',
    {}
  );
  useEffect(() => {
    if (initialLoad) {
      setPreviousSearchData(searchData);
      setInitialLoad(false); // Set initialLoad to false after the first render
    }
  }, [searchData, userId]);
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
        if (response?.data?.data?.length > 0) {
          logger.logEvent('Data Fetched Successfully', {
            dataLength: response?.data.data.length,
          });
          const limitedData = response?.data.data.slice(0, 30); // Limit to 30 cards
          setIsDataValid(true);
          setSearchData(limitedData); // Directly set the new searchData
        } else {
          clearSearchData();
        }
      } catch (err) {
        logger.logEvent('Error fetching card data', err);
        clearSearchData();
      } finally {
        stopLoading('isSearchLoading'); // Set loading to false once the request is complete
      }
    }, 100),
    []
  );
  async function fetchRandomCardsAndSet() {
    startLoading('fetchRandomCardsAndSet');
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/cards/randomCardData`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cards = await response.json();
      setRandomCards(cards);
    } catch (error) {
      console.error('Failed to fetch random cards:', error);
      startLoading('fetchRandomCardsAndSet');
    }
  }
  return {
    searchData,
    searchSettings,
    setSearchSettings,
    isDataValid,
    setSearchData,
    cardsVersion,
    setCardsVersion,
    fetchRandomCardsAndSet,
    handleRequest,
    randomCards,
    setIsDataValid,
    clearSearchData,
    loadingSearchResults: isLoading('isSearchLoading'),
    loadingRandomCards: isLoading('fetchRandomCardsAndSet'),
    setLoadingSearchResults: () => {
      startLoading('isSearchLoading');
    },
  };
};

export default useCardStore;
