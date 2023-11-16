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
  filterOutDuplicateYValues,
  handleCardAddition,
  handleCardRemoval,
  getUniqueFilteredXYValues,
  calculateTotalFromAllCardPrices,
  ensureNumber,
  findCollectionIndex,
  createApiUrl,
  handleApiResponse,
  BASE_API_URL,
  fetchWrapper,
  removeDuplicateCollections,
  getTotalCost,
  initialCollectionState,
  getCardPrice,
  defaultContextValue,
  validateUserIdAndData,
  createPayload,
  logError,
  determineHttpMethod,
} from './collectionUtility.jsx';
import { useCombinedContext } from '../CombinedProvider.jsx';
import { useUserContext } from '../UserContext/UserContext.js';
import moment from 'moment';
import CustomLogger from '../CutstomLogger.jsx';
import {
  createNewDataSet,
  getCollectionId,
  // updateCardInCollection,
} from './cardHelpers.jsx';

export const CollectionContext = createContext(defaultContextValue);

const constructPayloadWithDifferences = (existingData, newData) => {
  const payload = {};
  let logContent =
    '[constructPayloadWithDifferences] -----> Differences found in collection data:\n';

  Object.keys(newData).forEach((key) => {
    if (newData[key] !== existingData[key]) {
      payload[key] = newData[key];

      logContent += `  - Field "${key}":\n`;
      logContent += `      Old Value: ${JSON.stringify(existingData[key])}\n`;
      logContent += `      New Value: ${JSON.stringify(newData[key])}\n`;
    }
  });

  if (Object.keys(payload).length > 0) {
    console.log('Payload with differences:', payload);
  } else {
    console.log('No differences found between existing and new data.');
  }

  return payload;
};

const updateCardInCollection = (cards, cardToUpdate) => {
  // Validate that cards is an array
  if (!Array.isArray(cards)) {
    throw new TypeError('The first argument must be an array of cards.');
  }

  // Validate that cardToUpdate is an object
  if (typeof cardToUpdate !== 'object' || cardToUpdate === null) {
    throw new TypeError('The card to update must be an object.');
  }

  // Validate that cardToUpdate has an id property
  if (!('id' in cardToUpdate)) {
    throw new Error('The card to update must have an "id" property.');
  }

  try {
    // Attempt to update the card within the collection
    const updatedCards = cards.map((card) =>
      card.id === cardToUpdate.id ? { ...card, ...cardToUpdate } : card
    );
    return updatedCards;
  } catch (error) {
    // Handle any other errors that occur during the map operation
    throw new Error(`Failed to update card in collection: ${error.message}`);
  }
};

export const CollectionProvider = ({ children }) => {
  // const { cardPrices } = useCombinedContext();
  const [cookies] = useCookies(['user']);
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [collection, setCollection] = useState({
    cards: [],
    allCardPrices: [],
  });

  const [officialCollectionDatasets, setOfficialCollectionDatasets] = useState([
    {},
  ]);
  const [allCollections, setAllCollections] = useState([]);
  const [allCardPrices, setAllCardPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [xyData, setXyData] = useState([]);
  const [
    updatedPricesFromCombinedContext,
    setUpdatedPricesFromCombinedContext,
  ] = useState({});
  // const [selectedCollection, setSelectedCollection] = useState({});
  const [openChooseCollectionDialog, setOpenChooseCollectionDialog] =
    useState(false);
  const userId = cookies.user?.id;
  const totalCost = useMemo(
    () => getTotalCost(selectedCollection),
    [selectedCollection]
  );
  const [selectedCollection, setSelectedCollection] = useState(
    initialCollectionState
  );
  const lastFetchedTime = useRef(null);
  const calculateTotalPrice = (collection) =>
    collection.cards.reduce(
      (total, card) => total + (card.price || 0) * (card.quantity || 0),
      0
    );

  // Consolidated state setters for collection
  const setCollectionState = (newState) => {
    setSelectedCollection(newState);
    setAllCollections((prev) =>
      prev.map((c) => (c._id === newState._id ? newState : c))
    );
  };

  const createUpdateInfo = (
    updatedCards,
    updatedPrice,
    cardInfo,
    userId,
    selectedCollection,
    collectionId,
    newDataSet,
    xyData
  ) => {
    // const { updateCollectionChartData } = useCollectionStore();
    return {
      ...cardInfo,
      name: selectedCollection?.name,
      description: selectedCollection?.description,
      cards: updatedCards,
      userId: userId,
      totalCost: updatedPrice,
      totalPrice: updatedPrice,
      xys: xyData,
      quantity: updatedCards.length,
      totalQuantity: updatedCards,
      // chartData: updateCollectionChartData(
      //   updatedPrice,
      //   selectedCollection,
      //   newDataSet
      // ),
      allCardPrices: updatedCards?.flatMap((card) =>
        Array(card.quantity).fill(card.card_prices?.[0]?.tcgplayer_price)
      ),
      _id: collectionId,
    };
  };

  const saveCollectionToApi = async (collection, isUpdate = false) => {
    const method = isUpdate ? 'PUT' : 'POST';
    const endpoint = isUpdate ? `/${collection._id}` : '';
    const url = `/api/users/collections${endpoint}`;

    try {
      const response = await fetchWrapper(url, method, collection);
      console.log(
        `Collection ${isUpdate ? 'updated' : 'created'}:`,
        response.data
      );
      return response.data; // Return the updated data from the server
    } catch (error) {
      console.error(
        `Failed to ${isUpdate ? 'update' : 'create'} collection:`,
        error
      );
    }
  };

  const createUserCollection = async (
    userId,
    newCollectionInfo,
    name,
    description
  ) => {
    if (!userId) {
      console.warn('Invalid userId to createUserCollection.');
      return;
    }
    if (!name) {
      console.warn('Invalid name to createUserCollection.');
      return;
    }
    const actionDescription = 'create a new collection';
    if (!validateUserIdAndData(userId, newCollectionInfo, actionDescription))
      return;

    const payload = createPayload(
      { name, description, userId },
      newCollectionInfo
    );
    // const url = createApiUrl(`${userId}/collections`);
    // console.log('URL:', url);
    try {
      // const response = await fetchWrapper(url, 'POST', payload);
      const response = await saveCollectionToApi(payload, false); // Pass false to indicate it's not an update

      if (response?.error) {
        console.error('Failed to create the collection:', response.error);
        return;
      }
      if (response?.data) {
        console.log('RESPONSE:', response);
        setAllCollections((prev) => [...prev, response.data]);
        setSelectedCollection(response.data);
        setCollectionData(response.data);
      }
      return response;
    } catch (error) {
      logError('createUserCollection', { actionDescription, error });
    }
  };

  const removeCollection = async (collection) => {
    if (!collection._id) {
      console.error('Collection ID is undefined.');
      return;
    }

    try {
      const url = createApiUrl(`${userId}/collections`);
      const response = await fetchWrapper(url, 'DELETE');

      if (response.error) {
        console.error('Failed to delete the collection:', response.error);
        return;
      }

      setAllCollections((prev) =>
        prev.filter((item) => item._id !== collection._id)
      );

      if (selectedCollection._id === collection._id) {
        setSelectedCollection(initialCollectionState);
        setCollectionData(initialCollectionState);
      }
    } catch (error) {
      console.error(`Failed to delete the collection: ${error.message}`);
    }
  };

  const fetchCollections = useCallback(async (userId) => {
    if (!userId) {
      console.warn('userId is not set, aborting fetchCollections.');
      return null;
    }
    const url = createApiUrl(`${userId}/collections`);
    console.log('URL:', url);
    try {
      console.log(`Debug: ${'GET'} ${url}`);
      const response = await fetchWrapper(url, 'GET');
      console.log('[GET RESPONSE]:', response);
      const collections = response?.data;
      console.log('Fetched collections:', collections);
      return collections;
    } catch (error) {
      console.error('Error fetching collections:', error);
      logError('fetchCollections', 'fetch collections', error);
      return null;
    }
  }, []);

  const setCollections = useCallback((collections) => {
    if (!collections || !Array.isArray(collections)) {
      console.warn('Invalid collections array:', collections);
      return;
    }

    const uniqueCollections = removeDuplicateCollections(collections);
    const validCollections = uniqueCollections.filter(Boolean);

    validCollections.forEach((collection) => {
      collection.totalPrice = calculateTotalFromAllCardPrices(
        collection.allCardPrices
      );
    });

    setAllCollections(validCollections);

    setCollectionData(
      validCollections.length === 0
        ? initialCollectionState
        : validCollections[0]
    );
    setSelectedCollection(
      validCollections.length === 0
        ? initialCollectionState
        : validCollections[0]
    );
  }, []);

  const fetchAndSetCollections = useCallback(async () => {
    // Throttle the fetch calls
    const currentTime = Date.now();
    const fetchDelay = 60000; // 1 minute
    if (
      lastFetchedTime.current &&
      currentTime - lastFetchedTime.current < fetchDelay
    )
      return;
    lastFetchedTime.current = currentTime;

    try {
      const response = await fetchWrapper(
        createApiUrl(`collections/${userId}`),
        'GET'
      );

      console.log('FETCHED COLLECTIONS:', response);
      setAllCollections(response.data || []);
    } catch (error) {
      console.error(`Failed to fetch collections: ${error}`);
    }
  }, [userId]);
  // Function to update chart datasets and avoid duplicate entries

  // Function to calculate the total price from all card prices
  const calculateTotalFromCardPrices = (cards) =>
    cards.reduce((total, card) => total + card.price * card.quantity, 0);

  // Function to update the card details
  const updateCardDetails = (card, newPrice) => {
    const priceHasChanged =
      !card.priceHistory.length ||
      card.priceHistory.slice(-1)[0].num !== newPrice;
    return {
      ...card,
      price: newPrice,
      totalPrice: newPrice * card.quantity,
      latestPrice: createPriceHistoryEntry(newPrice),
      lastSavedPrice: card.latestPrice || createPriceHistoryEntry(newPrice),
      chart_datasets: updateChartDatasets(
        card,
        newPrice * card.quantity,
        new Date().toISOString()
      ),
      quantity: card.quantity,
      priceHistory: priceHasChanged
        ? [...card.priceHistory, createPriceHistoryEntry(newPrice)]
        : card.priceHistory,
    };
  };

  // Function to add a card to the selected collection
  // Add card to the selected collection
  const createPriceHistoryEntry = (price) => ({
    num: price,
    timestamp: new Date().toISOString(),
  });

  const updateChartDatasets = (card, computedPrice) => {
    const newDataset = { x: new Date().toISOString(), y: computedPrice };
    const datasets = card.chart_datasets || [];
    // Assuming a utility function is in place to filter out duplicates
    return [...datasets, newDataset]; // For simplicity, this example does not filter out duplicates
  };

  const updateCardPriceDetails = (card, newPrice) => {
    const priceChanged =
      !card.priceHistory.length ||
      card.priceHistory.slice(-1)[0].num !== newPrice;
    return {
      ...card,
      price: newPrice,
      totalPrice: newPrice * (card.quantity || 1), // Default to 1 if quantity is not set
      latestPrice: createPriceHistoryEntry(newPrice),
      lastSavedPrice: priceChanged ? card.latestPrice : card.lastSavedPrice, // Update lastSavedPrice only if price changed
      priceHistory: priceChanged
        ? [...card.priceHistory, createPriceHistoryEntry(newPrice)]
        : card.priceHistory,
      chart_datasets: updateChartDatasets(
        card,
        newPrice * (card.quantity || 1)
      ),
    };
  };
  // const addOrRemoveCard = useCallback(
//   async (card, cardInfo, operation) => {
//     const collectionId = getCollectionId(selectedCollection, allCollections);
//     if (!collectionId) {
//       console.error('No valid collection selected.');
//       setOpenChooseCollectionDialog(true);
//       return;
//     }

//     let updatedCards =
//       operation === 'update'
//         ? updateCardInCollection(selectedCollection.cards, card)
//         : getUpdatedCards(selectedCollection, card, operation);

//     const updatedPrice = calculateTotalFromAllCardPrices(updatedCards);
//     const accumulatedTotal = selectedCollection.totalPrice + updatedPrice;

//     const newXYValue = {
//       label: `Update - ${new Date().toISOString()}`,
//       x: new Date().toISOString(),
//       y: accumulatedTotal,
//     };

//     // Update the chart data with the new accumulated total
//     const updatedChartData = {
//       ...selectedCollection.chartData,
//       allXYValues: [...selectedCollection.chartData.allXYValues, newXYValue],
//     };

//     const updateInfo = createUpdateInfo(
//       updatedCards,
//       accumulatedTotal,
//       cardInfo,
//       userId,
//       selectedCollection,
//       collectionId,
//       updatedChartData,
//       xyData
//     );
//     console.log('[UPDATE INFO]:', updateInfo);
//     console.log('[ACCUMULATED]:', accumulatedTotal);
//     const updatedCollection = {
//       ...selectedCollection,
//       ...updateInfo,
//       chartData: updatedChartData,
//       // totalPrice: accumulatedTotal,
//       collectionPriceHistory: [
//         ...(selectedCollection.collectionPriceHistory || []),
//         createPriceHistoryObject(accumulatedTotal),
//       ],
//     };

//     console.log('[COLLECTION DATA][B4UPDATE]:', updatedCollection);
//     await updateActiveCollection(updatedCollection, updateInfo.chartData);
//     updateCollectionData(updatedCollection, 'selectedCollection');
//     updateCollectionData(updatedCollection, 'collectionData');
//   },
//   [
//     selectedCollection,
//     allCollections,
//     userId,
//     openChooseCollectionDialog,
//     handleCardAddition,
//     handleCardRemoval,
//     updateCollectionData,
//     setOpenChooseCollectionDialog,
//   ]
// );

  // Main functions
  const addOrUpdateCardInCollection = (collection, card, newPrice) => {
    // Find the card in the collection or create a new one
    const existingCardIndex = collection.cards.findIndex(
      (c) => c.id === card.id
    );
    const updatedCard = updateCardPriceDetails(card, newPrice);

    let updatedCards = [...collection.cards];
    if (existingCardIndex >= 0) {
      updatedCards[existingCardIndex] = updatedCard; // Update existing card
    } else {
      updatedCards = [...updatedCards, updatedCard]; // Add new card
    }

    const updatedTotalPrice = updatedCards.reduce(
      (acc, card) => acc + card.totalPrice,
      0
    );
    const updatedAllCardPrices = updatedCards.map((card) => card.price);

    return {
      ...collection,
      cards: updatedCards,
      totalPrice: updatedTotalPrice,
      allCardPrices: updatedAllCardPrices,
    };
  };

  // Function to save the collection to the backend
  // const saveCollectionToApi = async (collection, method) => {
  //   try {
  //     const url = `/api/users/collections/${
  //       method === 'POST' ? '' : collection._id
  //     }`;
  //     const response = await fetchWrapper(url, method, collection);
  //     console.log(
  //       `Collection ${method === 'POST' ? 'created' : 'updated'}:`,
  //       response.data
  //     );
  //   } catch (error) {
  //     console.error(
  //       `Failed to ${method === 'POST' ? 'create' : 'update'} collection:`,
  //       error
  //     );
  //   }
  // };

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      officialCollectionDatasets,
      totalCost,
      totalPrice,
      // processAndUpdateCardPrices: (cardPrices, newCardPricesData) =>
      //   processAndUpdateCardPrices(cardPrices, newCardPricesData),
      allCardPrices: selectedCollection?.allCardPrices || [],
      xys: xyData || [],
      openChooseCollectionDialog,
      // collectionData,
      // createUserCollection,
      // removeCollection,
      updatedPricesFromCombinedContext,
      // addCard: (card) => addOrUpdateCard(card, 'add'),
      // updateCardPrices: (cardUpdates) =>
      // cardUpdates.forEach((card) => addOrUpdateCard(card, 'update')),
      setAllCardPrices: (cardPrices) => setAllCardPrices(cardPrices),
      // updateCardPrices: (priceUpdates) => updateCardPrices(priceUpdates),
      addCardToCollection: (card) => addOrUpdateCardInCollection(card),
      setXyData: (newXyData) => setXyData(newXyData),
      // updateCollection: (collection) => updateCollection(collection),
      updateCardCollection: (collection, cardData, operation) =>
        updateCardInCollection(collection, cardData, operation),
      setOfficialCollectionDatasets,
      setUpdatedPricesFromCombinedContext: (updatedPrices) => {
        setUpdatedPricesFromCombinedContext(updatedPrices);
      },
      setOpenChooseCollectionDialog,
      calculateTotalPrice: () => getCardPrice(selectedCollection),
      getTotalCost: () => getTotalCost(selectedCollection),
      getCardQuantity: (cardId) => {
        const card = selectedCollection?.cards?.find((c) => c?.id === cardId);
        return card?.quantity || 0;
      },
      createUserCollection: (userId, newCollectionInfo) =>
        createUserCollection(
          userId,
          newCollectionInfo,
          newCollectionInfo.name,
          newCollectionInfo.description
        ),

      removeCollection: (collection) => removeCollection(collection),
      fetchAllCollectionsForUser: fetchAndSetCollections,
      // addCardToCollection: (card) => addCardToCollection(card),
      setSelectedCollection: (collectionId) =>
        setSelectedCollection(collectionId),
      setAllCollections: (collections) => setAllCollections(collections),
      addOneToCollection: (card) => addOrUpdateCardInCollection(card),
      // removeOneFromCollection: (card) => addOrRemoveCard(card, null, 'remove'),
    }),
    [allCollections, selectedCollection, totalCost, totalPrice, xyData]
  );

  useEffect(() => {
    // Log context values
    console.log('CONTEXT:', contextValue);
    console.log('TOTAL COST:', totalCost);
    console.log('TOTAL PRICE:', totalPrice);
    console.log('SELECTED COLLECTION:', selectedCollection);
    console.log('ALL COLLECTIONS:', allCollections);
    console.log('COLLECTION DATA:', collectionData);
    console.log('OFFICIAL COLLECTION DATASETS:', officialCollectionDatasets);
    console.log(
      'UPDATED PRICES FROM CONTEXT:',
      updatedPricesFromCombinedContext
    );
    console.log('ALL CARD PRICES:', selectedCollection?.allCardPrices);
    console.log('XY DATA:', xyData);
  }, [
    contextValue,
    totalPrice,
    selectedCollection,
    updatedPricesFromCombinedContext,
    xyData,
  ]);
  useEffect(() => {
    console.log('UPDATED COLLECTION DATA POST SERVER:', collectionData);
  }, [collectionData]);

  useEffect(() => {
    if (userId) {
      fetchAndSetCollections();
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
// const updateActiveCollection = useCallback(
//   async (collectionData) => {
//     if (!collectionData) throw new Error('No collection data provided.');

//     CustomLogger({ 'COLLECTION DATA': collectionData });
//     const isCreatingNew = !collectionData?._id;
//     const actionDescription = isCreatingNew
//       ? 'create a new collection'
//       : 'update the existing collection';
//     const method = determineHttpMethod(
//       isCreatingNew,
//       collectionData?.endpoint
//     );
//     CustomLogger({ 'METHOD:': method });
//     try {
//       if (isCreatingNew) {
//         console.log(
//           `Skipping fetch call to ${method} since it's a new collection`
//         );
//       } else {
//         const endpoint = createApiUrl(
//           `${userId}/collections/${collectionData?._id}`
//         );
//         console.log('ENDPOINT:', endpoint);

//         const payload = constructPayloadWithDifferences(
//           initialCollectionState,
//           collectionData
//         );
//         console.log('PAYLOAD:', collectionData);
//         console.log(`Debug: ${method} ${endpoint}`);
//         const response = await fetchWrapper(endpoint, method, payload);
//         console.log('[UPDATE RESPONSE][RAW]:', response);
//         const updatedCollection = response?.data;
//         console.log('[UPDATE RESPONSE][DES]:', updatedCollection);

//         if (!updatedCollection)
//           throw new Error('No collection returned from server.');
//         updateCollectionChartData(updatedCollection, existingChartData);
//         // updateChartDataForCollection(updatedCollection, existingChartData);
//         updateCollectionData(updatedCollection, 'selectedCollection');
//         updateCollectionData(updatedCollection, 'collectionData');
//         updateCollectionData(updatedCollection, 'allCollections');
//       }
//     } catch (error) {
//       console.error(
//         `Failed to update collection for user ${userId} with collectionId ${collectionData._id}:`,
//         error
//       );
//       logError('updateActiveCollection', actionDescription, error);
//       console.error(`Failed to ${actionDescription}: ${error.message}`);
//     }
//   },
//   [userId, updateCollectionData]
// );
// Adds or updates a card in the collection

// const handleUpdatePrices = useCallback(
//   (priceUpdates) => {
//     const timestamp = new Date().toISOString();

//     setSelectedCollection((prevCollection) => {
//       const updatedCards = prevCollection.cards.map((card) => {
//         const update = priceUpdates.find((u) => u.id === card.id);
//         if (update) {
//           return {
//             ...card,
//             price: update.newPrice,
//             latestPrice: { num: update.newPrice, timestamp },
//             lastSavedPrice: card.latestPrice,
//             priceHistory:
//               card.latestPrice.num !== update.newPrice
//                 ? [...card.priceHistory, { num: update.newPrice, timestamp }]
//                 : card.priceHistory,
//             chart_datasets: updateChartDatasets(
//               card,
//               update.newPrice * card.quantity,
//               timestamp
//             ),
//           };
//         }
//         return card;
//       });

//       const newTotalPrice = calculateTotalFromCardPrices(updatedCards);

//       // Save the updated collection to the backend
//       updateCardPrices({
//         ...prevCollection,
//         cards: updatedCards,
//         totalPrice: newTotalPrice,
//       });

//       return {
//         ...prevCollection,
//         cards: updatedCards,
//         totalPrice: newTotalPrice,
//       };
//     });
//   },
//   [updateCardPrices]
// );

// Transform the card data to fit the collection item structure
// const transformCardToCollectionItem = (card) => {
//   return {
//     id: card.id,
//     name: card.name,
//     price: card.price,
//     quantity: 1, // Default to 1 for a new card, adjust as needed
// ... any other card properties needed
//   };
// };
// const updateCardPriceHistory = (card, newPrice) => {
//   if (card.priceHistory.slice(-1)[0]?.num !== newPrice) {
//     return [...card.priceHistory, createPriceHistoryEntry(newPrice)];
//   }
//   return card.priceHistory;
// };
// // Refactored getUpdatedCards function
// const getUpdatedCards = (activeCollection, card, operation) => {
//   const handleOperation =
//     operation === 'add' ? handleCardAddition : handleCardRemoval;
//   const cardsToUpdate = handleOperation(activeCollection?.cards, card);

//   return cardsToUpdate.map(updateCardDetails);
// };

// const updateCollectionData = useCallback(
//   (newData, collectionType) => {
//     switch (collectionType) {
//       case 'allCollections':
//         setAllCollections((prevCollections) => {
//           const indexToUpdate = prevCollections.findIndex(
//             (collection) => collection._id === newData._id
//           );
//           if (indexToUpdate === -1) {
//             return [...prevCollections, newData];
//           } else {
//             const updatedCollections = [...prevCollections];
//             updatedCollections[indexToUpdate] = newData;
//             return updatedCollections;
//           }
//         });
//         break;
//       case 'selectedCollection':
//         setSelectedCollection(newData);
//         break;
//       case 'collectionData':
//         setCollectionData(newData);
//         break;
//       default:
//         console.warn('Unknown collection type for update:', collectionType);
//     }
//   },
//   [setAllCollections, setSelectedCollection, setCollectionData]
// );

// // // Function to handle the update of card price and price history
// // const updateCardDetails = (card) => {
// //   const cardPrice = card.card_prices?.[0]?.tcgplayer_price;
// //   const computedPrice = cardPrice * card.quantity;

// //   card.chart_datasets = updateChartDatasets(card, computedPrice);
// //   card.price = cardPrice;
// //   card.totalPrice = computedPrice;

// //   const lastEntry = card.priceHistory?.slice(-1)?.[0];
// //   if (!lastEntry || lastEntry.num !== cardPrice) {
// //     card.priceHistory = [
// //       ...(card.priceHistory || []),
// //       createPriceHistoryObject(cardPrice),
// //     ];
// //   }

// //   return card;
// // };

// // Update the allCardPrices array based on the new card's price
// const updateAllCardPrices = (card) => {
//   return [...selectedCollection.allCardPrices, card.price];
// };
// // Update the collection's cards array with the new card
// const updatePriceHistory = (card, newPrice) => {
//   const lastPriceEntry = card.priceHistory?.slice(-1)?.[0];
//   return lastPriceEntry && lastPriceEntry.num !== newPrice
//     ? [
//         ...card.priceHistory,
//         { num: newPrice, timestamp: new Date().toISOString() },
//       ]
//     : card.priceHistory;
// };

// Only add a new entry if the price has changed
// Refactored addOrRemoveCard function
// const addOrRemoveCard = useCallback(
//   async (card, cardInfo, operation) => {
//     const collectionId = selectedCollection._id;
//     if (!collectionId) {
//       console.error('No valid collection selected.');
//       setOpenChooseCollectionDialog(true);
//       return;
//     }

//     const updatedCards =
//       operation === 'update'
//         ? updateCardInCollection(selectedCollection.cards, card)
//         : getUpdatedCards(selectedCollection, card, operation);

//     const updateInfo = createUpdateInfo(selectedCollection, updatedCards);
//     const updatedCollection = await updateActiveCollection(
//       selectedCollection._id,
//       updateInfo
//     );

//     updateCollectionData(updatedCollection, 'selectedCollection');
//   },
//   [selectedCollection, updateCollectionData, setOpenChooseCollectionDialog]
// );

// Function to update the active collection on the backend
// const updateActiveCollection = async (collectionId, updateInfo) => {
//   const url = createApiUrl(`${userId}/collections/${collectionId._id}`);

//   try {
//     const response = await fetchWrapper(url, 'PUT', updateInfo);
//     if (!response.data)
//       throw new Error('No collection returned from server.');
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to update collection: ${error}`);
//     throw error;
//   }
// };

// const getUpdatedCards = (activeCollection, card, operation) => {
//   const cardsToUpdate =
//     operation === 'add'
//       ? handleCardAddition(activeCollection?.cards, card)
//       : handleCardRemoval(activeCollection?.cards, card);

//   return cardsToUpdate.map((card) => {
//     const cardPrice = card.card_prices?.[0]?.tcgplayer_price;
//     const computedPrice = cardPrice * card.quantity;
//     console.log('COMPUTED PRICE:', computedPrice);

//     // Update chart_datasets if necessary
//     const allDatasets = [
//       ...(card?.chart_datasets || []),
//       { x: moment().format('YYYY-MM-DD HH:mm'), y: computedPrice },
//     ];
//     card.chart_datasets = filterOutDuplicateYValues(allDatasets);

//     // Set card's price and total price
//     card.price = cardPrice;
//     card.totalPrice = computedPrice;

//     // Create a new price history object
//     const newPriceHistoryObject = createPriceHistoryObject(cardPrice);

//     // Update priceHistory only if the last entry's num is different from the new price
//     if (
//       !card.priceHistory ||
//       card.priceHistory.length === 0 ||
//       card.priceHistory[card.priceHistory.length - 1].num !== cardPrice
//     ) {
//       card.priceHistory = [
//         ...(card.priceHistory || []),
//         newPriceHistoryObject,
//       ];
//     }
//     card.tag = card.tag || 'monitored';
//     return card;
//   });
// };

// const createPriceHistoryObject = (price) => ({
//   timestamp: new Date().toISOString(),
//   num: price,
// });

// // The main function for adding or removing a card
// const addOrRemoveCard = useCallback(
//   async (card, cardInfo, operation) => {
//     const collectionId = getCollectionId(selectedCollection, allCollections);
//     if (!collectionId) {
//       console.error('No valid collection selected.');
//       setOpenChooseCollectionDialog(true);
//       return;
//     }

//     let updatedCards =
//       operation === 'update'
//         ? updateCardInCollection(selectedCollection.cards, card)
//         : getUpdatedCards(selectedCollection, card, operation);

//     const updatedPrice = calculateTotalFromAllCardPrices(updatedCards);
//     const accumulatedTotal = selectedCollection.totalPrice + updatedPrice;

//     const newXYValue = {
//       label: `Update - ${new Date().toISOString()}`,
//       x: new Date().toISOString(),
//       y: accumulatedTotal,
//     };

//     // Update the chart data with the new accumulated total
//     const updatedChartData = {
//       ...selectedCollection.chartData,
//       allXYValues: [...selectedCollection.chartData.allXYValues, newXYValue],
//     };

//     const updateInfo = createUpdateInfo(
//       updatedCards,
//       accumulatedTotal,
//       cardInfo,
//       userId,
//       selectedCollection,
//       collectionId,
//       updatedChartData,
//       xyData
//     );
//     console.log('[UPDATE INFO]:', updateInfo);
//     console.log('[ACCUMULATED]:', accumulatedTotal);
//     const updatedCollection = {
//       ...selectedCollection,
//       ...updateInfo,
//       chartData: updatedChartData,
//       // totalPrice: accumulatedTotal,
//       collectionPriceHistory: [
//         ...(selectedCollection.collectionPriceHistory || []),
//         createPriceHistoryObject(accumulatedTotal),
//       ],
//     };

//     console.log('[COLLECTION DATA][B4UPDATE]:', updatedCollection);
//     await updateActiveCollection(updatedCollection, updateInfo.chartData);
//     updateCollectionData(updatedCollection, 'selectedCollection');
//     updateCollectionData(updatedCollection, 'collectionData');
//   },
//   [
//     selectedCollection,
//     allCollections,
//     userId,
//     openChooseCollectionDialog,
//     handleCardAddition,
//     handleCardRemoval,
//     updateCollectionData,
//     setOpenChooseCollectionDialog,
//   ]
// );

// const updateCardCollection = async (
//   selectedCollection,
//   priceData,
//   operation
// ) => {
//   if (operation !== 'update') {
//     console.warn('Invalid operation:', operation);
//     return;
//   }

//   const updatedCards = priceData.data.data;
//   let accumulatedTotal = selectedCollection.totalPrice || 0;
//   let newXYValues = [...selectedCollection.chartData.allXYValues];

//   updatedCards.forEach((card) => {
//     // Only add to priceHistory if the num value is different from the last entry
//     const lastPriceHistoryNum = card.priceHistory?.slice(-1)[0]?.num;
//     if (card.latestPrice?.num !== lastPriceHistoryNum) {
//       const newPriceHistoryEntry = {
//         num: card.latestPrice?.num || 0,
//         timestamp: new Date().toISOString(),
//       };
//       card.priceHistory = [
//         ...(card.priceHistory || []),
//         newPriceHistoryEntry,
//       ];
//     }

//     card.lastSavedPrice = {
//       num: card.lastSavedPrice?.num || card.latestPrice?.num || 0,
//       timestamp: card.lastSavedPrice?.timestamp || new Date().toISOString(),
//     };

//     card.latestPrice = {
//       num: card.latestPrice?.num || 0,
//       timestamp: new Date().toISOString(),
//     };

//     card.tag = card.tag || 'monitored';

//     // Calculate the new total price
//     accumulatedTotal += card.latestPrice.num * card.quantity;

//     // Update the chart data
//     newXYValues.push({
//       label: `Update - ${new Date().toISOString()}`,
//       x: new Date().toISOString(),
//       y: accumulatedTotal,
//     });
//   });

//   // Update the chart data with accumulated values
//   const updatedChartData = {
//     ...selectedCollection.chartData,
//     allXYValues: newXYValues,
//   };

//   const updatedCollectionWithChartData = {
//     ...selectedCollection,
//     cards: updatedCards,
//     totalPrice: accumulatedTotal,
//     chartData: updatedChartData,
//   };

//   await updateActiveCollection(updatedCollectionWithChartData);
//   return updatedCollectionWithChartData;
// };

// const updateCollectionChartData = (
//   collection,
//   updatedPrice,
//   updatedChartData
// ) => {
//   const chartData = collection.chartData || {
//     name: `Chart for Collection: ${collection.name}`,
//     userId: collection.userId,
//     datasets: [],
//     allXYValues: [],
//     xys: [],
//   };

//   const newXYValue = {
//     label: `Update - ${new Date().toISOString()}`,
//     x: new Date().toISOString(),
//     y: updatedPrice,
//   };

//   // Update the allXYValues array with the new data point
//   const allXYValues = [...collection.chartData.allXYValues, newXYValue];

//   const uniqueFilteredXYValues = getUniqueFilteredXYValues(allXYValues);

//   return {
//     ...collection,
//     chartData: {
//       ...collection.chartData,
//       allXYValues: uniqueFilteredXYValues,
//     },
//     totalPrice: updatedPrice,
//   };
// };

// Create a new XY value for the current update
// const newXYValue = {
//   label: `Update ${new Date().toISOString()}`,
//   x: new Date().toISOString(),
//   y: updatedPrice,
//   additionalPriceData: {
//     priceChanged: updatedPrice !== collection.totalPrice,
//     initialPrice: collection.totalPrice,
//     updatedPrice: updatedPrice,
//     priceDifference: updatedPrice - collection.totalPrice,
//     priceChange: parseFloat(
//       ((updatedPrice - collection.totalPrice) / collection.totalPrice) * 100
//     ).toFixed(2),
//   },
// };

// Update datasets if newDataSet is provided
// if (newDataSet && Array.isArray(newDataSet.data)) {
//   newDataSet.data.forEach((dataset) => {
//     if (dataset.xys && Array.isArray(dataset.xys)) {
//       chartData.datasets.push(dataset);
//     }
//   });
// }
// if (newDataSet && Array.isArray(newDataSet.data)) {
//   newDataSet.data.forEach((dataset) => {
//     if (dataset.xys && Array.isArray(dataset.xys)) {
//       chartData.datasets.push(...dataset.xys);
//     }
//   });
// }
// Return the updated collection with the new chartData
// const updateCardCollection = async (
//   selectedCollection,
//   priceData,
//   operation
// ) => {
//   const priceArray = priceData.data.data;
//   let updatedCards = selectedCollection.cards.map((card) => {
//     const matchingNewCard = priceArray.find(
//       (newCard) => newCard.id === card.id
//     );
//     if (matchingNewCard) {
//       const { latestPrice, priceHistory, name, quantity, tag, _id } =
//         matchingNewCard;
//       return { ...card, latestPrice, priceHistory, name, quantity, tag, _id };
//     }
//     return card;
//   });

//   let newTotalPrice = updatedCards.reduce(
//     (total, card) => total + (card.latestPrice?.num * card.quantity || 0),
//     0
//   );

//   let newAllCardPrices = updatedCards.flatMap((card) =>
//     Array(card.quantity).fill(card.latestPrice?.num)
//   );

//   const newDataSet = {
//     data: [
//       {
//         xys: [
//           {
//             label: `Update ${new Date().toISOString()}`,
//             x: new Date().toISOString(),
//             y: newTotalPrice,
//           },
//         ],
//       },
//     ],
//   };

//   const updatedCollectionWithChartData = updateCollectionChartData(
//     selectedCollection,
//     newTotalPrice,
//     newDataSet
//   );

//   await updateActiveCollection(updatedCollectionWithChartData);

//   return updatedCollectionWithChartData;
// };

// function updateChartDataForCollection(collection, chartData) {
//   if (!collection.chartData) {
//     collection.chartData = {
//       name: `Chart for Collection: ${collection.name}`,
//       userId: collection.userId,
//       datasets: [],
//       allXYValues: [],
//     };
//   }

//   if (chartData) {
//     collection.chartData = { ...collection.chartData, ...chartData };
//   }

//   const newXYSData = getUniqueFilteredXYValues(
//     collection.chartData.allXYValues
//   );
//   const timestamp = new Date();
//   const newPrice = collection.totalPrice;
//   const previousPrice = collection.previousDayTotalPrice || newPrice;
//   const priceDifference = newPrice - previousPrice;
//   const priceChange = previousPrice
//     ? (priceDifference / previousPrice) * 100
//     : 0;

//   collection.chartData.allXYValues.push({
//     label: `Update ${timestamp.toISOString()}`,
//     x: timestamp,
//     y: newPrice,
//   });

//   const newDatasetEntry = {
//     name: collection.name,
//     data: newXYSData.map((xy) => ({
//       ...xy,
//       additionalPriceData: {
//         priceChanged: priceDifference !== 0,
//         initialPrice: previousPrice,
//         updatedPrice: newPrice,
//         priceDifference: priceDifference,
//         priceChange: parseFloat(priceChange.toFixed(2)),
//       },
//     })),
//   };

//   collection.chartData.datasets.push(newDatasetEntry);

//   return collection;
// }
// useEffect(() => {
//   if (!selectedCollection || typeof totalPrice !== 'number') return;

//   const updateNumber =
//     selectedCollection.chartData?.datasets?.length + 1 || 1;
//   const newDataSet = createNewDataSet(updateNumber, totalPrice);

//   const updatedChartData = updateCollectionChartData(
//     selectedCollection,
//     totalPrice,
//     newDataSet
//   );

//   const updatedCollection = {
//     ...selectedCollection,
//     chartData: updatedChartData,
//     totalPrice,
//     allCardPrices,
//   };

//   updateActiveCollection(updatedCollection);
// }, [totalPrice, selectedCollection, allCardPrices]);

// const createNewDataSet = (updateNumber, totalPrice) => ({
//   data: [
//     {
//       xys: [
//         {
//           label: `Update Number ${updateNumber}`,
//           data: { x: new Date().toISOString(), y: totalPrice },
//         },
//       ],
//       additionalPriceData: {}, // Additional data can be added here
//     },
//   ],
// });

// Additional functions and context setup as necessary

// const updateActiveCollection = useCallback(
//   async (collectionData, existingChartData = {}) => {
//     if (!collectionData) throw new Error('No collection data provided.');

//     const isCreatingNew = !collectionData?._id;
//     const actionDescription = isCreatingNew
//       ? 'create a new collection'
//       : 'update the existing collection';
//     const method = determineHttpMethod(
//       isCreatingNew,
//       collectionData?.endpoint
//     );

//     try {
//       if (isCreatingNew) {
//         console.log(
//           `Skipping fetch call to ${method} since it's a new collection`
//         );
// updateChartDataForCollection(collectionData, existingChartData);
//       } else {
//         const endpoint = createApiUrl(
//           `${userId}/collections/${collectionData._id}`
//         );
//         console.log('ENDPOINT:', endpoint);

//         // Calculate the difference between the existing chart data and the new collection data
//         const payload = constructPayloadWithDifferences(
//           existingChartData,
//           collectionData
//         );

//         console.log(`Debug: ${method} ${endpoint}`);
//         const response = await fetchWrapper(endpoint, method, payload);
//         console.log('RESPONSE:', response);
//         const updatedCollection = response?.data;
//         console.log('[COLLECTION DATA][A4UPDATE]:', updatedCollection);

//         if (!updatedCollection)
//           throw new Error('No collection returned from server.');

//         updateChartDataForCollection(updatedCollection, existingChartData);
//         updateCollectionData(updatedCollection, 'selectedCollection');
//         updateCollectionData(updatedCollection, 'collectionData');
//         updateCollectionData(updatedCollection, 'allCollections');
//       }
//     } catch (error) {
//       console.error(
//         `Failed to update collection for user ${userId} with collectionId ${collectionData._id}:`,
//         error
//       );
//       logError('updateActiveCollection', actionDescription, error);
//       console.error(`Failed to ${actionDescription}: ${error.message}`);
//     }
//   },
//   [userId, updateCollectionData]
// );

// // Helper function to construct payload with only the differences
// function constructPayloadWithDifferences(existingData, newData) {
//   const payload = {};
//   Object.keys(newData).forEach((key) => {
//     if (newData[key] !== existingData[key]) {
//       payload[key] = newData[key];
//     }
//   });
//   return payload;
// }

// function updateChartDataForCollection(collection, chartData) {
//   if (!collection.chartData) {
//     collection.chartData = {
//       // Initialize with defaults if not present
//       name: `Chart for Collection: ${collection.name}`,
//       userId: collection.userId,
//       datasets: [],
//       allXYValues: [],
//     };
//   }

//   // Merge in any additional chartData that was passed in
//   if (chartData) {
//     collection.chartData = { ...collection.chartData, ...chartData };
//   }

//   // Get new x and y values
//   const newXYSData = getUniqueFilteredXYValues(
//     collection.chartData.allXYValues
//   );

//   // Calculate new and previous price
//   const timestamp = new Date();
//   const newPrice = collection.totalPrice; // Fixed the code to get the correct value
//   const previousPrice = collection.previousDayTotalPrice || newPrice; // Assuming previousDayTotalPrice is a property
//   const priceDifference = newPrice - previousPrice;
//   const priceChange = previousPrice
//     ? (priceDifference / previousPrice) * 100
//     : 0;

//   // Update the allXYValues field with the new data point
//   collection.chartData.allXYValues.push({
//     label: `Update ${new Date().toISOString()}`,
//     x: new Date(),
//     y: newPrice,
//   });

//   const newDatasetEntry = {
//     name: collection.name, // or some other way to name the dataset
//     data: [
//       {
//         xys: [
//           // newXYSData.map((xy) => ({
//           {
//             label: `Update ${timestamp.toISOString()}`,
//             data: { x: timestamp, y: newPrice },
//           },
//           // })),
//         ],
//         additionalPriceData: [
//           {
//             priceChanged: priceDifference !== 0,
//             initialPrice: previousPrice,
//             updatedPrice: newPrice,
//             priceDifference: priceDifference,
//             priceChange: parseFloat(priceChange.toFixed(2)),
//           },
//         ],
//       },
//     ],
//   };

//   // Push the new Dataset to the datasets array
//   collection.chartData.datasets.push(newDatasetEntry);

//   // Return the updated collection object
//   return collection;
// }
