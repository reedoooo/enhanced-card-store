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
import { fetchWrapper, createApiUrl } from '../Helpers.jsx';
import {
  handleError,
  removeDuplicatesFromCollection,
  updateCollectionArray,
  handleCardAddition,
  handleCardRemoval,
  handleCardUpdate,
  determineMethod,
  updateCollectionDataEndpoint,
  getTotalQuantityOfSelectedCollection,
  getUpdatedCollectionPriceHistory,
  calculateCollectionValue,
  getUpdatedCollectionData,
  initialCollectionState,
  defaultContextValue,
  validateUserIdAndData,
  convertToXYLabelData,
  getFilteredChartData,
  filterUniqueDataPoints,
  createPriceHistoryObject,
  determineCardPrice,
  // convertToXYLabelData,
} from './helpers.jsx';
import { isEqual } from 'lodash';

export const CollectionContext = createContext(defaultContextValue);

export const CollectionProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const user = cookies?.user;
  const userId = user?.id;
  // state for the collection context
  const [allCollections, setAllCollections] = useState([]);
  const [collectionData, setCollectionData] = useState(initialCollectionState);

  const [selectedCollection, setSelectedCollection] = useState(
    initialCollectionState
  );
  const [collectionsFetched, setCollectionsFetched] = useState(false);
  const [cardsUpdated, setCardsUpdated] = useState(false);
  // state for the collection context
  const [collectionPriceHistory, setCollectionPriceHistory] = useState(
    selectedCollection.collectionPriceHistory || []
  );
  const [allXYValues, setAllXYValues] = useState(
    selectedCollection.allXYValues || []
  );
  const [currentChartDataSets2, setCurrentChartDataSets2] = useState(
    selectedCollection?.currentChartDataSets2 || []
  );
  const [totalPrice, setTotalPrice] = useState(
    selectedCollection?.totalPrice || 0
  );
  const [totalQuantity, setTotalQuantity] = useState(
    selectedCollection?.totalQuantity || 0
  );
  const [lastSavedPrice, setLastSavedPrice] = useState(
    selectedCollection?.lastSavedPrice || {
      num: 0,
      timestamp: new Date(),
    }
  );
  const [latestPrice, setLatestPrice] = useState(
    selectedCollection?.latestPrice || {
      num: 0,
      timestamp: new Date(),
    }
  );
  // state for the card in collection context
  const [quantityInCard, setQuantityInCard] = useState(0);
  const [priceInCard, setPriceInCard] = useState(0);
  const [unsavedCards, setUnsavedCards] = useState([]);
  const lastFetchedTime = useRef(null);
  // fetch all collections for user
  const fetchAndSetCollections = useCallback(async () => {
    if (!userId) {
      console.warn('User ID is missing for fetching collections.');
      return;
    }

    const currentTime = Date.now();
    if (
      lastFetchedTime.current &&
      currentTime - lastFetchedTime.current < 30000
    ) {
      console.log('Skipping fetch, last fetched less than 1 minute ago.');
      return;
    }

    try {
      const response = await fetchWrapper(
        createApiUrl(`${userId}/collections`),
        'GET'
      );
      const collections = response?.data || [];

      if (collections.length > 0) {
        const uniqueCollections = collections.map(
          removeDuplicatesFromCollection
        );
        setAllCollections(uniqueCollections);
        setSelectedCollection(uniqueCollections[0]);
        setCollectionsFetched(true);
      }
      lastFetchedTime.current = Date.now();
    } catch (error) {
      console.error(`Failed to fetch collections: ${error}`, error.message);
    }
  }, [userId]);

  // compare collections
  const updateCollectionData = useCallback(
    (newData) => {
      try {
        if (Array.isArray(newData) && !isEqual(newData, allCollections)) {
          setAllCollections(newData);
        }
        if (newData && typeof newData === 'object') {
          console.log(
            'SETTING SELECTED CO IN UPDATEDCOLLECTIONDATA --------->'
          );
          if (newData.cards && !isEqual(newData, selectedCollection)) {
            setSelectedCollection(newData);
            setTotalPrice(calculateCollectionValue(newData));
            setTotalQuantity(getTotalQuantityOfSelectedCollection(newData));
            setLastSavedPrice({
              num: newData.lastSavedPrice?.num || 0,
              timestamp: new Date(),
            });
            setLatestPrice({
              num: newData.totalPrice || 0,
              timestamp: new Date(),
            });
            setCollectionPriceHistory(
              getUpdatedCollectionPriceHistory(newData, newData.totalPrice || 0)
            );
            setCurrentChartDataSets2(
              filterUniqueDataPoints(
                convertToXYLabelData(newData.collectionPriceHistory)
              )
            );
          } else if (!isEqual(newData, collectionData)) {
            setCollectionData(newData);
          }
        }
      } catch (error) {
        console.error('Error updating collection data:', error);
      }
    },
    [allCollections, selectedCollection, collectionData]
  );

  // create a new collection for user
  const createUserCollection = async (
    userId,
    newCollectionInfo,
    actionDescription
  ) => {
    if (
      !userId ||
      !actionDescription ||
      !validateUserIdAndData(userId, newCollectionInfo, actionDescription)
    ) {
      console.warn(
        'Invalid inputs for creating user collection.',
        userId,
        newCollectionInfo,
        actionDescription
      );
      return;
    }

    const name = newCollectionInfo?.name || '';
    const description = newCollectionInfo?.description || '';
    const payload = {
      ...newCollectionInfo,
      name: name,
      description: description,
      userId: userId,
    };
    const url = createApiUrl(`${userId}/collections`);
    // console.log('Payload for user collection:', payload);
    const response = await fetchWrapper(url, 'POST', payload);
    // updating with new collection
    updateCollectionData(response.data);
  };
  // remove a collection for user
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
  // update cards in collection
  const getUpdatedCards = (collection, cardToUpdate, operation) => {
    if (!collection?.cards && !Array.isArray(collection?.cards)) {
      console.error(
        'Invalid collection or cards data',
        collection,
        cardToUpdate,
        operation
      );
      return [];
    }

    try {
      let cardPrice;
      for (const card of collection.cards) {
        cardPrice = determineCardPrice(card, cardToUpdate); // Ensure this function has its own error handling
      }

      switch (operation) {
        case 'add':
          return handleCardAddition(collection.cards, cardToUpdate); // Ensure this function has its own error handling
        case 'remove':
          return handleCardRemoval(collection.cards, cardToUpdate); // Ensure this function has its own error handling
        case 'update':
          // Ensure cardPrice and cardToUpdate exist before proceeding
          if (!cardPrice || !cardToUpdate) {
            console.error('Missing card price or update information.');
            return collection.cards; // Return the unchanged cards as a safe default
          }
          return handleCardUpdate(
            collection?.cards,
            cardToUpdate,
            createPriceHistoryObject(cardPrice), // Ensure this function has its own error handling
            collection?._id,
            cardPrice
          ); // Ensure this function has its own error handling
        default:
          console.error('Unsupported operation:', operation);
          return collection?.cards; // Return the unchanged cards as a safe default
      }
    } catch (error) {
      console.error(
        `Error in getting updated cards for operation ${operation}:`,
        error
      );
      return collection?.cards; // Return the unchanged cards as a safe default
    }
  };
  // update collection data
  const getUpdatedCollection = async (
    collectionWithCards,
    cardToUpdate,
    operation,
    userId
  ) => {
    if (
      !collectionWithCards?.cards ||
      !Array.isArray(collectionWithCards.cards)
    ) {
      console.error('Invalid collection or cards data');
      return;
    }

    const collectionId = collectionWithCards?._id || '';
    if (!collectionId) {
      console.error(
        'Missing collection ID or user ID.',
        collectionId,
        collectionWithCards
      );
      return;
    }

    if (!userId) {
      console.error('Missing user ID.', userId);
      return;
    }

    // Initialize updatedOperation variable to be used later
    let updatedOperation = operation;

    // Define the method determination logic
    const determineMethod = () => {
      if (
        ['add', 'remove'].includes(operation) &&
        cardToUpdate?.quantity >= 1
      ) {
        updatedOperation = 'update'; // Switch operation to 'update'
        return 'PUT';
      } else if (operation === 'add') {
        return 'POST';
      } else if (operation === 'remove') {
        return 'DELETE';
      } else if (operation === 'update') {
        return 'PUT';
      } else {
        console.error(`Invalid operation: ${operation}`);
        return null; // Or default to a safe method if appropriate
      }
    };

    const method = determineMethod();
    if (!method) {
      console.error(`No valid HTTP method for operation ${operation}`);
      return;
    }

    console.log('METHOD', method);
    const endpoint = createApiUrl(
      `${userId}/collections/${collectionId}/${updatedOperation}`
    );

    let cardsPayload;
    const updatedCardsData = getUpdatedCards(
      collectionWithCards,
      cardToUpdate,
      operation
    );

    switch (updatedOperation) {
      case 'add':
      case 'update':
        cardsPayload = { cards: updatedCardsData };
        break;
      case 'remove':
        cardsPayload = { cards: [updatedCardsData] };
        break;
      default:
        console.error('Unsupported operation:', updatedOperation);
        return;
    }

    try {
      // REQUEST 1: CARDS
      const cardsResponse = await fetchWrapper(endpoint, method, cardsPayload);
      const updatedCards = cardsResponse?.cards || [];
      const chartPayload = getFilteredChartData(
        collectionWithCards?.chartData,
        calculateCollectionValue(updatedCards)
      );
      // REQUEST 2: CHART DATA
      const endpoint2 = createApiUrl(
        `${userId}/collections/${collectionId}/updateChartData`
      );
      const chartResponse = await fetchWrapper(endpoint2, 'PUT', chartPayload);

      const updatedChartData = chartResponse?.allXYValues || [];

      const updatedCollectionUpdatedCards = getUpdatedCollectionData(
        collectionWithCards,
        calculateCollectionValue(updatedCards),
        getUpdatedCollectionPriceHistory(
          collectionWithCards,
          calculateCollectionValue(updatedCards)
        ),
        getTotalQuantityOfSelectedCollection(collectionWithCards),
        updatedCards,
        userId
      );
      // REQUEST 3: COLLECTION DATA
      const collectionResponse = await updateCollectionDataEndpoint(
        userId,
        collectionId,
        updatedCollectionUpdatedCards
      );
      const updatedCollection = {
        ...collectionResponse,
        cards: updatedCards,
        chartData: {
          ...collectionWithCards.chartData,
          allXYValues: updatedChartData,
        },
      };

      // setTotalPrice(calculateCollectionValue(updatedCollection.collectionData));
      // setTotalQuantity(
      //   getTotalQuantityOfSelectedCollection(updatedCollection.collectionData)
      // );
      // setLastSavedPrice({
      //   num: updatedCollection?.collectionData?.lastSavedPrice?.num || 0,
      //   timestamp: new Date(),
      // });
      // setLatestPrice({
      //   num: updatedCollection?.collectionData?.totalPrice || 0,
      //   timestamp: new Date(),
      // });
      // setCollectionPriceHistory(
      //   getUpdatedCollectionPriceHistory(
      //     updatedCollection?.collectionData,
      //     updatedCollection?.collectionData?.totalPrice || 0
      //   )
      // );
      // setCurrentChartDataSets2(
      //   filterUniqueDataPoints(
      //     convertToXYLabelData(updatedCollection?.collectionPriceHistory)
      //   )
      // );
      console.log('UPDATED COLLECTION', updatedCollection?.collectionData);
      updateCollectionData(updatedCollection?.collectionData);

      return updatedCollection?.collectionData;
    } catch (error) {
      // console.error(`Error in ${operation} operation:`, error);
      console.error(
        `Error in ${operation} for collection: ${collectionWithCards?._id} with card: ${cardToUpdate?.id}`,
        error
      );
    }
  };
  // update collection details (name, description, etc.)
  const updateCollectionDetails = async (updatedInfo, userId, collectionId) => {
    const { name, description } = updatedInfo;
    if (!selectedCollection || !collectionId) {
      console.error('Selected collection or collection ID is missing.');
      return;
    }
    if (collectionId) {
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
        const collectionEndpoint = createApiUrl(
          `${userId}/collections/${collectionId}`
        );
        await fetchWrapper(collectionEndpoint, 'PUT', { updatedCollection });
      } catch (error) {
        console.error('Error updating collection details:', error);
      }
    } else {
      console.error('Collection ID is missing.');
    }
  };
  // handle card operations (add, remove, update)
  const handleCardOperation = async (card, operation, collection, userId) => {
    if (!card || !collection || !userId) {
      console.error(
        'Card or collection is undefined.',
        card,
        collection,
        userId
      );
      return;
    }

    try {
      const updatedCollection = await getUpdatedCollection(
        collection,
        card,
        operation,
        userId
      );

      // console.log('UPDATED COLLECTION:', updatedCollection);
      if (updatedCollection?._id === collection?._id) {
        // const collectionToSet = {
        //   ...updatedCollection,
        //   cards: updatedCollection.cards,
        // };

        // updateCollectionData(collectionToSet);
        setSelectedCollection(updatedCollection);

        return updatedCollection;
      } else {
        console.error('Failed to update collection.', updatedCollection);
      }
    } catch (error) {
      console.error(
        `Error handling card operation '${operation}' for card '${card}' in collection '${collection}':`,
        error
      );
    }
  };
  // update collection when card is changed
  const updateCollectionWhenCardChanged = async (card, collection, userId) => {
    try {
      if (!card || !collection) {
        throw new Error('Card or collection is undefined.');
      }

      // Assume the card object has a quantity and price property
      const updatedQuantity = card?.quantity;
      const updatedTotalPriceForCard = card?.price * updatedQuantity;

      // Ensure the card values are valid before proceeding
      if (
        typeof updatedQuantity !== 'number' ||
        typeof updatedTotalPriceForCard !== 'number'
      ) {
        throw new Error(
          `Invalid card details for card: ${JSON.stringify(card)}`
        );
      }

      const newCardValueWithUpdatedPrice = {
        ...card,
        quantity: updatedQuantity,
        totalPrice: updatedTotalPriceForCard,
      };

      // Update collection locally, assuming the collection is a valid array of cards
      const updatedCards =
        collection?.cards?.map((c) =>
          c?.card?.id === card.id ? newCardValueWithUpdatedPrice : c
        ) || [];

      console.log('UPDATED CARDS', updatedCards);

      // Reflect the change in the local state and send update to server
      handleCardOperation(
        newCardValueWithUpdatedPrice,
        'update',
        collection,
        userId
      );
    } catch (error) {
      console.error(
        `Error updating total price for card ID ${card?.id}: ${error.message}`,
        error
      );
    }
  };
  // update collection of any of the cards in it have chanded price
  const processCollections = useCallback(() => {
    allCollections?.forEach((collection) => {
      if (!collection?._id) {
        console.error('No collectionId found in collection.');
        return;
      }
      collection?.cards?.forEach((card) => {
        if (!card) {
          console.warn('Card in collection is undefined.');
          return;
        }
        const originalTotalPrice = card.price * card.quantity;
        if (card?.totalPrice !== originalTotalPrice) {
          updateCollectionWhenCardChanged(card, collection, userId);
        }
      });
    });
  }, [allCollections, selectedCollection]);
  // This useEffect is for processing collections when they are fetched
  useEffect(() => {
    if (collectionsFetched) {
      processCollections();
    }
  }, [collectionsFetched, processCollections]);
  // This useEffect is for updating allXYValues and currentChartDataSets2
  useEffect(() => {
    if (selectedCollection?.chartData?.allXYValues?.length) {
      const data = filterUniqueDataPoints(
        convertToXYLabelData(selectedCollection.collectionPriceHistory)
      );
      setAllXYValues(data);
      setCurrentChartDataSets2(allXYValues);
    }
  }, [selectedCollection?.chartData?.allXYValues]);
  // This useEffect is for fetching collections when the user ID changes
  useEffect(() => {
    if (userId) {
      fetchAndSetCollections();
    }
  }, [userId, fetchAndSetCollections]);
  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      cards: selectedCollection?.cards,
      currentChartDataSets2: selectedCollection?.currentChartDataSets2,
      totalPrice: selectedCollection?.totalPrice,
      totalQuantity: selectedCollection?.totalQuantity,
      latestPrice: selectedCollection?.latestPrice,
      lastSavedPrice: selectedCollection?.lastSavedPrice,
      collectionPriceHistory: selectedCollection?.collectionPriceHistory || [],
      allXYValues: selectedCollection?.chartData?.allXYValues || [],
      setCurrentChartData2: (data) => setCurrentChartDataSets2(data),
      calculateCollectionValue,
      setTotalPrice,
      getUpdatedCollection,
      updateCollectionState: updateCollectionData,
      updateCollectionDetails,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      setSelectedCollection,
      setAllCollections,
      createUserCollection,
      removeCollection,
      getTotalPrice: () => calculateCollectionValue(selectedCollection),
      getNewTotalPrice: (values) => calculateCollectionValue(values),
      getCardQuantity: (cardId) =>
        selectedCollection?.cards?.find((c) => c?.id === cardId)?.quantity || 0,
      addOneToCollection: (card, collection) =>
        handleCardOperation(card, 'add', collection, userId),
      removeOneFromCollection: (card, collection) =>
        handleCardOperation(card, 'remove', collection, userId),
      // updateOneFromCollection: (card, collection) =>
      //   handleCardOperation(card, 'update', collection, userId),
      updateCollection: (card, operation, collection) =>
        handleCardOperation(card, operation, collection, userId),
      updateAllCollectionState: (newData) => updateCollectionData(newData),
      externalCollectionUpdate: (newData) => getUpdatedCollection(newData),
      externalOperationHandler: (card, operation, collection) =>
        handleCardOperation(card, operation, collection, userId),
    }),
    [allCollections, selectedCollection, totalPrice]
  );
  useEffect(() => {
    console.log('COLLECTION CONTEXT:', {
      selectedCollection: contextValue.selectedCollection,
      allCollections: contextValue.allCollections,
      collectionData: contextValue.collectionData,
      cards: contextValue.cards,
      totalPrice: contextValue.totalPrice,
      totalQuantity: contextValue.totalQuantity,
      currentChartDataSets2: contextValue.currentChartDataSets2,
      collectionPriceHistory: contextValue.collectionPriceHistory,
      lastSavedPrice: contextValue.lastSavedPrice,
      latestPrice: contextValue.latestPrice,
      allXYValues: contextValue.allXYValues,
    });
  }, [selectedCollection.cards]);

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
// useEffect(() => {
//   if (
//     !selectedCollection?.chartData?.allXYValues ||
//     !Array.isArray(selectedCollection?.chartData?.allXYValues) ||
//     !selectedCollection?.chartData?.allXYValues?.length > 0
//   )
//     return;
//   setAllXYValues(
//     filterUniqueDataPoints(
//       convertToXYLabelData(selectedCollection?.collectionPriceHistory)
//     )
//   );
//   setCurrentChartDataSets2(
//     filterUniqueDataPoints(
//       convertToXYLabelData(selectedCollection?.collectionPriceHistory)
//     )
//     // getUniqueValidData(selectedCollection?.chartData?.allXYValues)
//   );
// }, [selectedCollection?.chartData?.allXYValues]);
// useEffect(() => {
//   if (!allCollections || allCollections?.length === 0) return;
//   fetchAndSetCollections();
//   if (!selectedCollection) {
//     setSelectedCollection(allCollections[0]);
//   }
// }, []);
// useEffect(() => {
//   if (collectionsFetched === true) {
//     const updateCollectionWhenCardChanged = async (card, collection) => {
//       try {
//         if (!card || !collection) {
//           throw new Error('Card or collection is undefined.');
//         }

//         const updatedQuantity = card.quantity;
//         const updatedTotalPriceForCard = card.price * updatedQuantity;
//         const newCardValueWithUpdatedPrice = {
//           ...card,
//           quantity: updatedQuantity,
//           totalPrice: updatedTotalPriceForCard,
//         };
//         // Update collection locally
//         const updatedCollection = collection.cards.map((c) =>
//           c.card.id === card.id ? newCardValueWithUpdatedPrice : c
//         );

//         // console.log('UPDATED CO', updatedCollection);

//         // Reflect the change in the local state
//         updateCollectionData(updatedCollection);

//         // Send update to server
//         handleCardOperation(
//           newCardValueWithUpdatedPrice,
//           'update',
//           updatedCollection,
//           userId
//         );
//       } catch (error) {
//         console.error(
//           `Error updating total price for card ID ${card?.id}: ${error.message}`,
//           error
//         );
//       }
//     };

//     const processCollections = () => {
//       allCollections.forEach((collection) => {
//         if (!collection?._id) {
//           console.error('No collectionId found in collection.');
//           return;
//         }
//         collection?.cards?.forEach((card) => {
//           if (!card) {
//             console.warn('Card in collection is undefined.');
//             return;
//           }
//           const originalTotalPrice = card.price * card.quantity;
//           if (card.totalPrice !== originalTotalPrice) {
//             updateCollectionWhenCardChanged(card, collection);
//           }
//         });
//       });
//     };

//     processCollections();
//   }
//   setCollectionsFetched(false);
//   setCardsUpdated(true);
// });
// useEffect(() => {
//   if (
//     !selectedCollection?.chartData?.allXYValues ||
//     !Array.isArray(selectedCollection?.chartData?.allXYValues) ||
//     !selectedCollection?.chartData?.allXYValues?.length > 0
//   ) {
//     setAllXYValues(
//       // ...selectedCollection.chartData.allXYValues,
//       filterUniqueDataPoints(
//         convertToXYLabelData(selectedCollection?.collectionPriceHistory)
//       )
//     );
//     setCurrentChartDataSets2(
//       filterUniqueDataPoints(
//         convertToXYLabelData(selectedCollection?.collectionPriceHistory)
//       )
//     );
//   }
// }, [selectedCollection?.chartData?.allXYValues]);
// useEffect(() => {
//   if (!userId) return;
//   fetchAndSetCollections();
// }, [userId]);
