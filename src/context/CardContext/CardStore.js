import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

// Create a context for the cardStore
const CardStoreContext = createContext();

export const CardStoreProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cart'], ['deck']);
  const initialStore = cookies.store || [];
  const initialCart = cookies.cart || [];
  console.log('Initial cart:', initialCart);
  const [cardsArray, setCardsArray] = useState(initialStore);
  console.log('Initial store:', initialStore);
  const currentCart = cookies.cart || [];
  const [currenCartArray, setCurrentCartArray] = useState(currentCart);
  const [searchData, setSearchData] = useState([]);
  const currentDeckData = cookies.deck || [];
  const [savedDeckData, setSavedDeckData] = useState(currentDeckData);
  const [deckSearchData, setDeckSearchData] = useState([]);
  // const [filtered, setFiltered] = useState([]); // add this

  console.log('Current cart:', currentCart);
  if (!currenCartArray || !savedDeckData) {
    return <div>Loading...</div>;
  }

  // Your new function
  // Your new function
  const handleRequest = async (searchParams) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
        searchParams
      );

      if (response.data.data) {
        // Create a new Set with just the ids of the cards for easy lookup
        const ids = new Set();

        // Filter out duplicate cards
        const uniqueCards = response.data.data.filter((card) => {
          if (ids.has(card.id)) {
            return false;
          } else {
            ids.add(card.id);
            return true;
          }
        });

        setSearchData(uniqueCards);
        setDeckSearchData(uniqueCards);

        // Set the cookie to hold the current searchData
        setCookie('searchData', uniqueCards, { path: '/' });
        setCookie('deckSearchData', uniqueCards, { path: '/' });
      } else {
        setSearchData([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCardData = (cardId) => {
    if (Array.isArray(currenCartArray)) {
      return currenCartArray.find((card) => card.id === cardId);
    }
    throw new Error('Cards data is not in the expected format');
  };

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * currenCartArray.length);
    const randomCardData = currenCartArray[randomIndex];
    return randomCardData;
  };

  const randomCardData = getRandomCard();

  // In CardStoreProvider component

  console.log('CARD CONTEXT: ', {
    cardsArray,
    searchData,
    setSearchData,
    // filtered,
    // setFiltered,
    deckSearchData,
    setDeckSearchData,
    savedDeckData,
    setSavedDeckData,
    getCardData,
    getRandomCard,
    setCardsArray,
    handleRequest, // Add your new function to the context
  });

  return (
    <CardStoreContext.Provider
      value={{
        cardsArray,
        searchData,
        setSearchData,
        // filtered,
        // setFiltered,
        deckSearchData,
        setDeckSearchData,
        savedDeckData,
        setSavedDeckData,
        getCardData,
        randomCardData,
        setCardsArray,
        getRandomCard,
        setCookie,
        setCurrentCartArray,
        currenCartArray,
        initialStore,
        cookies,
        currentCart,
        handleRequest, // Add your new function to the context
      }}
    >
      {children}
    </CardStoreContext.Provider>
  );
};

export const useCardStore = () => {
  const context = useContext(CardStoreContext);
  if (!context) {
    throw new Error('useCardStore must be used within a CardStoreProvider');
  }
  const {
    cardsArray,
    getCardData,
    getRandomCard,
    setCardsArray,
    searchData,
    setSearchData,
    handleRequest,
    deckSearchData,
    setDeckSearchData,
    savedDeckData,
    setSavedDeckData,
    // filtered,
    // setFiltered,
  } = context;
  return {
    cardsArray,
    getCardData,
    getRandomCard,
    setCardsArray,
    searchData,
    setSearchData,
    handleRequest,
    deckSearchData,
    setDeckSearchData,
    savedDeckData,
    setSavedDeckData,

    // filtered,
    // setFiltered,
  };
};
