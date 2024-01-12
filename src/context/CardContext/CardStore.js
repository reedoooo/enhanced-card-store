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
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { useUserContext } from '../UserContext/UserContext';

// Create a context for the cardStore
const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const { user } = useUserContext();
  const [cookies, setCookie] = useCookies(['deckData', 'searchHistory']);
  const initialStore = cookies.store || [];
  const [cardsArray, setCardsArray] = useState(initialStore);
  const { allCollections, setAllCollections } = useCollectionStore();
  const [image, setImage] = useState(null);
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
  const [searchHistory, setSearchHistory] = useState([]);

  if (!currenCartArray || !savedDeckData) {
    return <div>Loading...</div>;
  }

  const handleRequest = async (searchParams) => {
    try {
      console.log('SEARCH PARAMS: ', searchParams);
      // setSearchParams([searchParams]);
      // Adding a unique dummy parameter or timestamp to the request
      const uniqueParam = { requestTimestamp: new Date().toISOString() };
      const requestBody = {
        ...searchParams,
        ...uniqueParam, // Including the unique or dummy parameter
      };
      // update history array with new search params
      setSearchHistory([...searchHistory, searchParams]);
      setCookie('searchHistory', searchParams, { path: '/' });

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards/ygopro`,
        requestBody
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
        return response?.data?.data;
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
  // Example client-side function to fetch an image
  // Function to request the card's image
  // const fetchCardImage = async (cardId) => {
  //   try {
  //     // Ensure there's a cardId to fetch
  //     if (!cardId) {
  //       console.error('No card ID provided for image fetch');
  //       return;
  //     }

  //     // Constructing the query URL
  //     const url = `${process.env.REACT_APP_SERVER}/api/card/image/${cardId}`;

  //     const response = await axios.get(url);
  //     if (response.status === 200 && response.data) {
  //       // Assuming response.data contains the URL of the image
  //       const imageUrl = response.data.imageUrl;

  //       // Update your state or perform actions with the image URL
  //       setImage(imageUrl);
  //     } else {
  //       throw new Error('Failed to fetch image');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching the card image:', error);
  //   }
  // };
  // Example client-side function to fetch a card's image through the server
  // const fetchCardImage = async (cardData) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/api/card/ygopro`,
  //       {
  //         params: { name: cardData.name },
  //       }
  //     );
  //     if (response.data) {
  //       // Assuming the server returns the image as a base64 string
  //       const imageBase64 = response.data;
  //       console.log('IMAGE BASE 64: ', imageBase64);
  //       setImage(imageBase64);
  //       return imageBase64;
  //     }
  //     throw new Error('Failed to fetch image.');
  //   } catch (error) {
  //     console.error('Error fetching the image:', error);
  //     throw error;
  //   }
  // };

  // const handlePatch = async () => {
  //   let needsUpdate = false;

  //   for (const collection of allCollections) {
  //     for (const card of collection.cards) {
  //       if (
  //         !user.id ||
  //         !card.card_images ||
  //         !card.card_sets ||
  //         !card.card_prices
  //       ) {
  //         needsUpdate = true;
  //         console.log('PATCHING CARD: ', card);
  //         const response = await axios.patch(
  //           `${process.env.REACT_APP_SERVER}/api/cards/ygopro/${card.name}`,
  //           { id: card.id, user: user.id },
  //           { withCredentials: true }
  //         );
  //         if (response.data && response.data.data) {
  //           const updatedCard = response.data.data;
  //           const cardIndex = collection.cards.findIndex(
  //             (c) => c.id === updatedCard.id
  //           );
  //           if (cardIndex !== -1) {
  //             collection.cards[cardIndex] = updatedCard;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   if (needsUpdate) {
  //     setAllCollections([...allCollections]);
  //   }
  // };

  useLayoutEffect(() => {
    // Check if there's any collection that requires an update
    const hasMissingData = allCollections?.some((collection) =>
      collection.cards?.some(
        (card) => !card?.card_images || !card?.card_sets || !card?.card_prices
      )
    );

    if (hasMissingData) {
      // handlePatch();
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
      image,
      // fetchCardImage,
      setImage,

      // handlePatch,
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
