/* eslint-disable @typescript-eslint/no-empty-function */

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';
import { useCookies } from 'react-cookie';
import {
  handleCardAddition,
  handleCardRemoval,
  createApiUrl,
  fetchWrapper,
  getTotalCost,
  initialCollectionState,
  getCardPrice,
  defaultContextValue,
  validateUserIdAndData,
  getUpdatedChartData,
  getPriceChange,
  constructPayloadWithDifferences,
  getCurrentChartDataSets,
  calculateCollectionValue,
} from './collectionUtility.jsx';
import {
  handleError,
  removeDuplicatesFromCollection,
  updateCollectionArray,
  replaceCardInArray,
  updatePriceHistory,
  determineCardPrice,
  createChartDataEntry,
  createPriceHistoryObject,
  getFilteredChartData,
  filterUniqueDataPoints,
  transformPriceHistoryToXY,
  getAllCardPrices,
} from './helpers.jsx';

export const CollectionContext = createContext(defaultContextValue);

export const CollectionProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const [selectedCollection, setSelectedCollection] = useState(
    initialCollectionState
  );
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCost, setTotalCost] = useState('');
  const [
    updatedPricesFromCombinedContext,
    setUpdatedPricesFromCombinedContext,
  ] = useState([]);
  const [xyData, setXyData] = useState([]);
  const [currentChartDataSets2, setCurrentChartDataSets2] = useState([]);
  const [openChooseCollectionDialog, setOpenChooseCollectionDialog] =
    useState(false);
  const userId = cookies?.user?.id;
  // console.log('USER ID:', userId);
  const lastFetchedTime = useRef(null);

  const fetchAndSetCollections = useCallback(async () => {
    const shouldFetch = () => {
      const fetchDelay = 60000; // 1 minute
      const currentTime = Date.now();
      return (
        !lastFetchedTime.current ||
        currentTime - lastFetchedTime.current >= fetchDelay
      );
    };

    if (!shouldFetch()) return;

    try {
      if (!handleError(userId, 'User ID is missing.')) return;

      lastFetchedTime.current = Date.now();
      const response = await fetchWrapper(
        createApiUrl(`${userId}/collections`),
        'GET'
      );
      const collections = response.data || [];

      console.log('FETCHED COLLECTIONS:', collections);

      if (collections.length > 0) {
        const uniqueCollections = collections.map(
          removeDuplicatesFromCollection
        );

        setAllCollections(uniqueCollections);
        setCollectionData(uniqueCollections[0]);
        setSelectedCollection(uniqueCollections[0]);
      } else {
        console.warn('No collections found.');
        // Optionally, set a default or empty state if no collections are found
      }
    } catch (error) {
      console.error(`Failed to fetch collections: ${error}`);
    }
  }, [userId, setAllCollections, setCollectionData, setSelectedCollection]);

  const updateCollectionData = useCallback(
    (newData) => {
      try {
        // Function to safely check if an object has a property
        const hasOwnProperty = (obj, prop) =>
          Object.prototype.hasOwnProperty.call(obj, prop);

        // Determine the type of the new data
        if (
          Array.isArray(newData) &&
          newData.every((item) => hasOwnProperty(item, 'cards'))
        ) {
          // If newData is an array of objects each containing 'cards', assume it's 'allCollections'
          setAllCollections((prev) => updateCollectionArray(prev, newData));
        } else if (
          newData &&
          typeof newData === 'object' &&
          hasOwnProperty(newData, 'cards')
        ) {
          // If newData is an object with a 'cards' property, assume it's 'selectedCollection'
          setSelectedCollection(newData);
        } else if (newData && typeof newData === 'object') {
          // If newData is a general object, assume it's 'collectionData'
          setCollectionData(newData);
        } else {
          console.warn(
            'Unable to determine the type of collection data for update.'
          );
        }
      } catch (error) {
        console.error('Error updating collection data:', error);
      }
    },
    [setAllCollections, setSelectedCollection, setCollectionData]
  );

  const createUserCollection = async (
    userId,
    newCollectionInfo,
    name,
    description
  ) => {
    if (
      !userId ||
      !name ||
      !validateUserIdAndData(
        userId,
        newCollectionInfo,
        'create a new collection'
      )
    ) {
      console.warn('Invalid inputs for creating user collection.');
      return;
    }

    const payload = {
      ...newCollectionInfo,
      name,
      description,
      userId,
    };
    const url = createApiUrl(`${userId}/collections`);
    console.log('Payload for user collection:', payload);
    const response = await fetchWrapper(url, 'POST', payload);
    updateCollectionData(response.data);
  };

  const removeCollection = async (collection) => {
    if (!collection._id) {
      console.error('Collection ID is undefined.');
      return;
    }

    const url = createApiUrl(`${userId}/collections/${collection._id}`);
    await fetchWrapper(url, 'DELETE');
    setAllCollections((prev) =>
      prev.filter((item) => item._id !== collection._id)
    );

    if (selectedCollection._id === collection._id) {
      setSelectedCollection(initialCollectionState);
      setCollectionData(initialCollectionState);
    }
  };

  const getUpdatedCards = (collection, cardUpdate, operation) => {
    let cardsToUpdate;

    switch (operation) {
      case 'add':
        cardsToUpdate = handleCardAddition(collection?.cards, cardUpdate);
        break;
      case 'remove':
        cardsToUpdate = handleCardRemoval(collection?.cards, cardUpdate);
        console.log('CARD REMOVAL:', cardUpdate);
        console.log('CARD REMOVAL:', cardsToUpdate);
        break;
      case 'update':
        if (!collection?.cards) {
          console.error('No cards found in the collection.');
          return collection?.cards;
        }
        if (!cardUpdate?.id) {
          console.warn('Card ID is missing.', cardUpdate);
        }
        // eslint-disable-next-line no-case-declarations
        const cards = collection?.cards;

        for (let i = 0; i < cards?.length; i++) {
          // eslint-disable-next-line no-case-declarations
          if (!cards[i]?.id) {
            console.warn('Card ID is missing.', cards[i]);
            continue;
          }
          cardUpdate = cards[i];
          const cardIndex = selectedCollection?.cards?.findIndex(
            (c) => c?.id === cardUpdate?.id
          );

          if (cardIndex === -1) {
            console.error(
              'Card not found in the collection.',
              collection?.cards[cardIndex]
            );
            return collection?.cards;
          }

          // eslint-disable-next-line no-case-declarations
          const existingCard = collection?.cards[cardIndex];
          // eslint-disable-next-line no-case-declarations
          const updatedPriceHistory = updatePriceHistory(
            existingCard,
            cardUpdate
          );
          // eslint-disable-next-line no-case-declarations
          const updatedCard = getUpdatedCard(
            existingCard,
            cardUpdate,
            updatedPriceHistory,
            collection?._id
          );
          cardsToUpdate = replaceCardInArray(
            collection?.cards,
            updatedCard,
            cardIndex
          );
        }
        break;
      default:
        console.error('Unsupported operation:', operation);
        return collection?.cards;
    }

    return cardsToUpdate;
  };

  function getUpdatedCard(card, update, priceHistory, collectionId) {
    const cardPrice = determineCardPrice(card, update);
    const newChartDataEntry = createChartDataEntry(totalPrice);

    return {
      ...card,
      price: cardPrice,
      quantity: update.quantity || card.quantity,
      collectionId: collectionId,
      totalPrice: cardPrice * (update.quantity || card.quantity),
      // lastSavedPrice: update.lastSavedPrice,
      lastSavedPrice: {
        num: card.price || card.card_prices[0].tcgplayer_price,
        timestamp: new Date(),
      },
      latestPrice: update.latestPrice,
      tag: 'monitored',
      chart_datasets: [...(card.chart_datasets || []), newChartDataEntry],
      priceHistory: priceHistory,
    };
  }

  // Helper function to get updated collection data
  const getUpdatedCollectionData = (
    collectionWithCards,
    updatedTotalPrice,
    newCollectionPriceHistoryObject,
    updatedChartData,
    updatedTotalQuantity,
    updatedCards
  ) => {
    // Check for null or undefined collectionWithCards
    if (!collectionWithCards) {
      console.error('No collection data provided');
      return null; // or an appropriate default object
    }

    const {
      allCardPrices = [],
      description = '',
      name = '',
      // _id = '',
      collectionPriceHistory = [],
      cards = [],
    } = collectionWithCards;

    return {
      allCardPrices,
      description,
      name,
      userId: userId, // Make sure 'userId' is defined in the scope
      totalPrice: updatedTotalPrice || 0,
      totalCost: updatedTotalPrice ? updatedTotalPrice?.toString() : '0',
      totalQuantity: cards?.reduce(
        (acc, card) => acc + (card?.quantity || 0),
        0
      ),
      quantity: cards?.length,
      lastSavedPrice: {
        num: collectionWithCards?.totalPrice || 0,
        timestamp: collectionWithCards?.lastSavedPrice?.timeStamp || new Date(),
      },
      latestPrice: {
        num: updatedTotalPrice || 0,
        timestamp: new Date(),
      },
      dailyPriceChange:
        getPriceChange(currentChartDataSets2)[0]?.priceChange || '',
      currentChartDataSets2: filterUniqueDataPoints(
        transformPriceHistoryToXY(collectionPriceHistory)
      ),
      collectionPriceHistory: [
        ...collectionPriceHistory,
        newCollectionPriceHistoryObject,
      ],
    };
  };

  const getUpdatedCollection = async (
    collectionWithCards, // updated cards
    cardUpdate, // updated card
    operation,
    userId
  ) => {
    const collectionId = collectionWithCards?._id || collectionData?._id;
    if (!collectionId) {
      console.error('Collection ID is missing.', collectionId);
      return;
    }

    if (!userId) {
      console.error('User ID is missing.', userId);
      return;
    }
    const cardExists = collectionWithCards?.cards?.some(
      (card) => card?.id === cardUpdate?.id
    );

    let multipleOfSameCard = [];
    let cardQuantity = 0;
    if (cardExists) {
      multipleOfSameCard = collectionWithCards?.cards?.filter(
        (card) => card?.id === cardUpdate?.id
      );
      cardQuantity = multipleOfSameCard[0]?.quantity;
    }
    console.log('MULTIPLE OF SAME CARD:', multipleOfSameCard);
    console.log('CARD QUANTITY:', cardQuantity);
    console.log('CARD EXISTS:', cardExists);

    let method;
    if (operation === 'remove' && cardQuantity === 1) {
      method = 'DELETE';
    } else if (cardExists) {
      method = 'PUT';
    } else {
      method = 'POST';
    }

    let endpointSuffix;
    if (operation === 'remove' && cardQuantity === 1) {
      endpointSuffix = 'removeCards';
    } else {
      endpointSuffix = 'updateCards';
    }

    const endpoint = createApiUrl(
      `${userId}/collections/${collectionId}/${endpointSuffix}`
    );
    console.log('CARDS BEFORE: ', collectionWithCards);
    const updatedCards = getUpdatedCards(
      collectionWithCards,
      cardUpdate,
      operation
      // collectionId
    );
    console.log('CARDS AFTER: ', updatedCards);

    const updatedTotalPrice = calculateCollectionValue(updatedCards);
    setTotalPrice(updatedTotalPrice);

    // const updatedTotalPrice = updatedCards.reduce(
    //   (total, card) => total + card.price * card.quantity,
    //   0
    // );
    const updatedTotalQuantity = updatedCards?.reduce(
      (total, card) => total + card?.quantity,
      0
    );
    const newCollectionPriceHistoryObject =
      createPriceHistoryObject(updatedTotalPrice);

    let cardsResponse;
    let cardsPayload;
    if (operation === 'remove') {
      const allCardsWithIds = [];
      for (const card of updatedCards) {
        // const cardIds = updatedCards.map((card) => card.id);
        // const cardObjIds = updatedCards.map((card) => card._id);
        const cardIds = {
          id: card?.id,
          _id: card?._id,
        };

        allCardsWithIds?.push(cardIds);
      }
      const removeCard = allCardsWithIds?.find(
        (idPair) => idPair?.id === cardUpdate?.id
      );
      cardsPayload = { cardIds: removeCard };
    } else {
      const allCardsWithIds = [];
      for (const card of updatedCards) {
        // const cardIds = updatedCards.map((card) => card.id);
        // const cardObjIds = updatedCards.map((card) => card._id);
        const cardIds = {
          id: card.id,
          _id: card._id,
        };

        allCardsWithIds?.push(cardIds);
      }
      const removeCard = allCardsWithIds?.find(
        (idPair) => idPair?.id === cardUpdate?.id
      );
      cardsPayload = { cards: updatedCards, cardIds: removeCard };
    }
    console.log('CARDS PAYLOAD:', cardsPayload);

    cardsResponse = await fetchWrapper(endpoint, method, cardsPayload);
    const { cardMessage } = cardsResponse;

    const updatedChartData = getFilteredChartData(
      collectionWithCards.chartData,
      updatedTotalPrice
    );
    const chartDataPayload = { chartData: updatedChartData };
    const chartDataEndpoint = createApiUrl(
      `${userId}/collections/${collectionId}/updateChartData`
    );
    const chartDataResponse = await fetchWrapper(
      chartDataEndpoint,
      'PUT',
      chartDataPayload
    );

    const { chartMessage } = chartDataResponse;

    const updatedCollection = getUpdatedCollectionData(
      selectedCollection,
      updatedTotalPrice,
      newCollectionPriceHistoryObject,
      // updatedChartData,
      updatedTotalQuantity
      // updatedCards
    );

    const collectionEndpoint = createApiUrl(
      `${userId}/collections/${collectionId}`
    );
    const collectionResponse = await fetchWrapper(collectionEndpoint, 'PUT', {
      updatedCollection,
    });

    const { collectionMessage } = collectionResponse;

    setTotalPrice(calculateCollectionValue(updatedCards));
    const restructuredCollection = {
      ...collectionResponse.collectionData,
      cards: cardsResponse.cards,
      chartData: chartDataResponse.chartData,
    };

    console.log('RESTRUCTURED COLLECTION:', restructuredCollection);
    return {
      restructuredCollection,
    };
  };

  const updateCollectionDetails = async (updatedInfo, userId, collectionId) => {
    const { name, description } = updatedInfo;
    if (selectedCollection && collectionId) {
      const updatedCollection = {
        ...selectedCollection,
        name,
        description,
      };

      setSelectedCollection(updatedCollection);
      setAllCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection._id === collectionId ? updatedCollection : collection
        )
      );

      try {
        // Update the collection in the backend
        const collectionEndpoint = createApiUrl(
          `${userId}/collections/${collectionId}`
        );
        const collectionResponse = await fetchWrapper(
          collectionEndpoint,
          'PUT',
          {
            updatedCollection,
          }
        );

        const { collectionMessage } = collectionResponse;
        console.log(collectionMessage);

        // Optionally handle the response here, e.g., update the state with the response data if necessary
      } catch (error) {
        console.error('Error updating collection details:', error);
      }
    } else {
      console.error('Selected collection or collection ID is missing.');
    }
  };

  const handleCardOperation = async (
    card,
    operation,
    collection,
    userId,
    allCollections
  ) => {
    if (!card) {
      console.error('Card is undefined.', card);
      return;
    }

    if (!collection) {
      console.error(
        `Collection with ID ${collection._id} not found in allCollections.`
      );
      return;
    }

    const updatedCollection = await getUpdatedCollection(
      collection,
      card,
      operation,
      userId
    );

    if (updatedCollection) {
      console.log('UPDATED COLLECTION:', updatedCollection);
      updateCollectionData(updatedCollection?.restructuredCollection);
    } else {
      console.error('Failed to update collection.');
    }

    return updatedCollection;
  };

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      totalCost,
      totalPrice,
      totalQuantity: selectedCollection?.totalQuantity || 0,
      allCardPrices: selectedCollection?.allCardPrices || [],
      xys: xyData || [],
      openChooseCollectionDialog,
      calculateCollectionValue,
      setTotalPrice,
      setXyData,
      setUpdatedPricesFromCombinedContext,
      setOpenChooseCollectionDialog,
      getTotalPrice2: () => getCardPrice(selectedCollection),
      getTotalPrice: () => calculateCollectionValue(selectedCollection),
      getNewTotalPrice: (values) => calculateCollectionValue(values),
      getTotalCost: () => getTotalCost(selectedCollection),
      getCardQuantity: (cardId) =>
        selectedCollection?.cards?.find((c) => c?.id === cardId)?.quantity || 0,
      createUserCollection,
      removeCollection,
      addOneToCollection: (card) =>
        handleCardOperation(card, 'add', selectedCollection, userId),
      removeOneFromCollection: (card) =>
        handleCardOperation(card, 'remove', selectedCollection, userId),
      updateOneFromCollection: (card) =>
        handleCardOperation(card, 'update', selectedCollection, userId),
      updateCollection: (card, operation, collection) =>
        handleCardOperation(card, operation, collection, userId),
      getUpdatedCollection,
      updateCollectionState: updateCollectionData,
      updateCollectionDetails,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      fetchAllCollections: fetchAndSetCollections,
      setSelectedCollection,
      setAllCollections,
    }),
    [allCollections, selectedCollection, totalCost, totalPrice, xyData]
  );

  useEffect(() => {
    console.log('CONTEXT STATE:', {
      totalCost,
      totalPrice,
      totalQuantity: selectedCollection?.totalQuantity || 0,
      selectedCollection,
      allCollections,
      collectionData,
      updatedPricesFromCombinedContext,
      xyData,
    });
  }, [allCollections, selectedCollection, totalCost, totalPrice, xyData]);

  useEffect(() => {
    if (userId) fetchAndSetCollections();
  }, [userId]);

  useEffect(() => {
    if (selectedCollection?.cards) {
      setTotalPrice(calculateCollectionValue(selectedCollection));
      setTotalCost(getTotalCost(selectedCollection));
    }
  }, [selectedCollection, setTotalPrice]);

  // useEffect(() => {
  //   if (allCollections?.length === 0 || allCollections === undefined) {
  //     fetchAndSetCollections();
  //   }
  // }, [allCollections, fetchAndSetCollections]);

  useEffect(() => {
    if (selectedCollection === null || selectedCollection === undefined) {
      setSelectedCollection(allCollections?.[0]);
    }
  }, [userId]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
