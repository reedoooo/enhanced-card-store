import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useFetchWrapper from '../hooks/useFetchWrapper';
import { useAuthContext, useCollectionStore } from '..';
import useLogger from './useLogger';
import useApiResponseHandler from './useApiResponseHandler';
export const useCardStoreHook = () => {
  const { userId } = useAuthContext();
  const [cookies, setCookie] = useCookies(['deckData', 'searchHistory']);
  const initialStore = cookies.store || [];
  const [cardsArray, setCardsArray] = useState(initialStore);
  const { allCollections } = useCollectionStore();
  const logger = useLogger('CardProvider');
  const handleApiResponse = useApiResponseHandler();

  const fetchWrapper = useFetchWrapper();
  const currentCart = cookies.cart || [];
  const [currentCartArray, setCurrentCartArray] = useState(currentCart);
  const [searchData, setSearchData] = useState([]);
  const [isCardDataValid, setIsCardDataValid] = useState(false);
  const [rawSearchData, setRawSearchData] = useState([]);
  const [organizedSearchData, setOrganizedSearchData] = useState([]);
  const [slicedSearchData, setSlicedSearchData] = useState([]);
  const [slicedAndMergedSearchData, setSlicedAndMergedSearchData] = useState(
    []
  );
  const currentDeckData = cookies.deck || [];
  const [savedDeckData, setSavedDeckData] = useState(currentDeckData);
  const [deckSearchData, setDeckSearchData] = useState([]);

  useEffect(() => {
    // Add any necessary side effects or initializations here
    // console.log('CARDS ARRAY: ', cardsArray);
    // console.log('SEARCH DATA: ', searchData);
    // console.log('SAVED DECK DATA: ', savedDeckData);
    // console.log('CURRENT CART ARRAY: ', currentCartArray);
    // console.log('DECK SEARCH DATA: ', deckSearchData);
    // console.log('RAW SEARCH DATA: ', rawSearchData);
    // console.log('ORGANIZED SEARCH DATA: ', organizedSearchData);
    // console.log('SLICED SEARCH DATA: ', slicedSearchData);
  }, [allCollections, userId, cookies]);

  const handleRequest = async (searchParams) => {
    try {
      logger.logEvent('handleRequest start', {
        searchParams,
        userId,
      });
      const requestBody = {
        ...searchParams,
        user: userId,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
        requestBody
      );
      const data = handleApiResponse(response?.data, 'handleRequest');

      if (data) {
        // Utilizing a new Set for filtering duplicate cards more efficiently
        const uniqueCards = Array.from(
          new Set(data?.map((card) => card.id))
        ).map((id) => data?.find((card) => card.id === id));

        const isDataValid =
          Array.isArray(uniqueCards) && uniqueCards.length > 0;

        if (isDataValid) {
          const limitedCards = uniqueCards.slice(0, 30);
          setOrganizedSearchData(limitedCards);
          setSlicedSearchData(limitedCards);
        }
        setSearchData(uniqueCards);
        setDeckSearchData(uniqueCards);
        setRawSearchData(uniqueCards);

        // Set cookies for the current search data
        setCookie('searchData', uniqueCards, { path: '/' });
        setCookie('deckSearchData', uniqueCards, { path: '/' });
        setCookie('rawSearchData', uniqueCards, { path: '/' });
      } else {
        clearSearchData();
      }
    } catch (err) {
      console.error('Error fetching card data:', err);
      clearSearchData();
    }
  };

  const clearSearchData = () => {
    setSearchData([]);
    setDeckSearchData([]);
    setRawSearchData([]);
    setOrganizedSearchData([]);
  };
  const getCardData = (cardId) => {
    return currentCartArray.find((card) => card.id === cardId);
  };
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * currentCartArray.length);
    return currentCartArray[randomIndex];
  };
  const contextValue = useMemo(
    () => ({
      cardsArray,
      searchData,
      savedDeckData,
      currentCartArray,
      isCardDataValid,
      rawSearchData,
      organizedSearchData,
      slicedSearchData,
      slicedAndMergedSearchData,
      handleRequest,
      setCardsArray,
      setCurrentCartArray,
      setSearchData,
      setSavedDeckData,
      setRawSearchData,
      setOrganizedSearchData,
      setSlicedSearchData,
      setSlicedAndMergedSearchData,
      setIsCardDataValid,
      setCookie,
      clearSearchData,
      getCardData,
      getRandomCard,
      // Other states and setters you might need
    }),
    [
      cardsArray,
      searchData,
      savedDeckData,
      currentCartArray,
      isCardDataValid,
      rawSearchData,
      organizedSearchData,
      slicedSearchData,
    ]
  );

  return contextValue;
};
