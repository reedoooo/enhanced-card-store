// useGetSearchData.jsx
import { useState, useEffect, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { useCardStoreHook } from './useCardStore';
// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const useGetSearchData = () => {
  // const { loadingSearchResults, setLoadingSearchResults } = useCardStoreHook();
  const [isLoading, setIsLoading] = useState(false);
  const [previousSearchData, setPreviousSearchData] = useLocalStorage(
    'previousSearchData',
    []
  );
  const [searchData, setSearchData] = useLocalStorage(
    'searchData',
    previousSearchData || []
  );
  const uniqueCards = useMemo(() => {
    return Array.from(
      new Map(searchData?.map((card) => [card.id, card])).values()
    );
  }, [searchData]);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        // setSelectedCards(selectedDeck?.cards?.slice(0, 30) || []);
        const updatedData = JSON.parse(
          localStorage.getItem('searchData') || '[]'
        );
        setSearchData(updatedData);
        setIsLoading(false);
      }
    }, 1000);
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchData]);

  return { searchData, isLoading, uniqueCards, setIsLoading };
};
