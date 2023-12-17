import axios from 'axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
} from 'react';
import { useCookies } from 'react-cookie';
import { useCombinedContext } from '../CombinedContext/CombinedProvider';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { useUserContext } from '../UserContext/UserContext';

// Create a context for the cardStore
const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const { user } = useUserContext();
  const [cookies, setCookie] = useCookies(['cart'], ['deckData']);
  const initialStore = cookies.store || [];
  const [cardsArray, setCardsArray] = useState(initialStore);
  const { allCollections, setAllCollections } = useCollectionStore();
  // const [searchParam, setSearchParam] = useState('');
  // const [searchParams, setSearchParams] = useState([]);
  // const [searchParams, setSearchParams] = useState({
  //   name: '',
  //   type: '',
  //   attribute: '',
  //   race: '',
  // });
  const currentCart = cookies.cart || [];
  const [currenCartArray, setCurrentCartArray] = useState(currentCart);
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

  if (!currenCartArray || !savedDeckData) {
    return <div>Loading...</div>;
  }

  const handleRequest = async (searchParamss) => {
    try {
      // setSearchParams([searchParams]);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
        searchParamss
      );

      if (response.data.data) {
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

        // Check if the uniqueCards is an array
        const validCardData = uniqueCards && Array.isArray(uniqueCards);

        // Set the state to the unique cards
        setIsCardDataValid(validCardData);

        if (validCardData) {
          const limitedCardsToRender = Array.from(uniqueCards).slice(0, 30);
          setOrganizedSearchData(limitedCardsToRender);

          if (limitedCardsToRender.length >= 1) {
            // console.log('LIMITED CARDS TO RENDER: ', limitedCardsToRender[0]);
            setSlicedSearchData(limitedCardsToRender);
          }
        }

        setSearchData(uniqueCards);
        setDeckSearchData(uniqueCards);
        setRawSearchData(uniqueCards);

        // Set the cookie to hold the current searchData
        setCookie('searchData', uniqueCards, { path: '/' });
        setCookie('deckSearchData', uniqueCards, { path: '/' });
        setCookie('rawSearchData', uniqueCards, { path: '/' });
        // setCookie('organizedSearchData', limitedCardsToRender, { path: '/' });
      } else {
        setSearchData([]);
        setDeckSearchData([]);
        setRawSearchData([]);
        setOrganizedSearchData([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePatch = async () => {
    let needsUpdate = false;

    for (const collection of allCollections) {
      for (const card of collection.cards) {
        if (
          !user.id ||
          !card.card_images ||
          !card.card_sets ||
          !card.card_prices
        ) {
          needsUpdate = true;
          const response = await axios.patch(
            `${process.env.REACT_APP_SERVER}/api/cards/ygopro/${card.name}`,
            { id: card.id, user: user.id },
            { withCredentials: true }
          );
          if (response.data && response.data.data) {
            const updatedCard = response.data.data;
            const cardIndex = collection.cards.findIndex(
              (c) => c.id === updatedCard.id
            );
            if (cardIndex !== -1) {
              collection.cards[cardIndex] = updatedCard;
            }
          }
        }
      }
    }

    if (needsUpdate) {
      setAllCollections([...allCollections]);
    }
  };

  useLayoutEffect(() => {
    // Check if there's any collection that requires an update
    const hasMissingData = allCollections?.some((collection) =>
      collection.cards?.some(
        (card) => !card.card_images || !card.card_sets || !card.card_prices
      )
    );

    if (hasMissingData) {
      handlePatch();
    }
  }, [allCollections]); // Keep the dependency array, but now it only triggers when necessary

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
  const contextValue = useMemo(
    () => ({
      cardsArray,
      searchData,
      deckSearchData,
      savedDeckData,
      randomCardData,
      currenCartArray,
      initialStore,
      cookies,
      currentCart,
      currentDeckData,
      slicedSearchData,
      rawSearchData,
      organizedSearchData,
      isCardDataValid,
      slicedAndMergedSearchData,

      handlePatch,
      setSlicedAndMergedSearchData,
      setOrganizedSearchData,
      setRawSearchData,
      setSlicedSearchData,
      setSearchData,
      setDeckSearchData,
      setSavedDeckData,
      getCardData,
      setCardsArray,
      getRandomCard,
      setCookie,
      setCurrentCartArray,
      handleRequest, // Add your new function to the context
    }),
    [cardsArray, searchData]
  );
  // In CardProvider component
  useEffect(() => {
    console.log('CARD CONTEXT: ', {
      contextValue,
    });
  }, []);
  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};

export const useCardStore = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardStore must be used within a CardProvider');
  }
  return context;
};
