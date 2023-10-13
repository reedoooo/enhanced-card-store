import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

// Create a context for the cardStore
const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cart'], ['deckData']);
  const initialStore = cookies.store || [];
  // const initialCart = cookies.cart || [];
  // console.log('Initial cart:', initialCart);
  const [cardsArray, setCardsArray] = useState(initialStore);
  // console.log('Initial store:', initialStore);
  const currentCart = cookies.cart || [];
  const [currenCartArray, setCurrentCartArray] = useState(currentCart);
  const [searchData, setSearchData] = useState([]);
  const currentDeckData = cookies.deck || [];
  const [savedDeckData, setSavedDeckData] = useState(currentDeckData);
  const [deckSearchData, setDeckSearchData] = useState([]);

  // console.log('Current cart:', currentCart);
  if (!currenCartArray || !savedDeckData) {
    return <div>Loading...</div>;
  }

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
            // ids.add(card.cardId);
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

  // In CardProvider component
  useEffect(() => {
    console.log('CARD CONTEXT: ', {
      cardsArray,
      searchData,
      deckSearchData,
      savedDeckData,

      setSearchData,
      setDeckSearchData,
      setSavedDeckData,
      getCardData,
      getRandomCard,
      setCardsArray,
      handleRequest, // Add your new function to the context
    });
  }, []);
  return (
    <CardContext.Provider
      value={{
        cardsArray,
        searchData,
        deckSearchData,
        savedDeckData,
        randomCardData,
        currenCartArray,
        initialStore,
        cookies,
        currentCart,
        setSearchData,
        setDeckSearchData,
        setSavedDeckData,
        getCardData,
        setCardsArray,
        getRandomCard,
        setCookie,
        setCurrentCartArray,
        handleRequest, // Add your new function to the context
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardStore = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardStore must be used within a CardProvider');
  }
  return context;
};

// export const useCardStore = () => {
//   const context = useContext(CardContext);
//   if (!context) {
//     throw new Error('useCardStore must be used within a CardStoreProvider');
//   }
//   const {
//     cardsArray,
//     getCardData,
//     getRandomCard,
//     setCardsArray,
//     searchData,
//     setSearchData,
//     handleRequest,
//     deckSearchData,
//     setDeckSearchData,
//     savedDeckData,
//     setSavedDeckData,
//   } = context;
//   return {
//     cardsArray,
//     getCardData,
//     getRandomCard,
//     setCardsArray,
//     searchData,
//     setSearchData,
//     handleRequest,
//     deckSearchData,
//     setDeckSearchData,
//     savedDeckData,
//     setSavedDeckData,
//   };
// };
