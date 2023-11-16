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
import { set } from 'date-fns';

export const CollectionContext = createContext(defaultContextValue);

const constructPayloadWithDifferences = (
  existingData,
  newData,
  debug = false
) => {
  const payload = {};
  let logContent = '[constructPayloadWithDifferences] Differences in data:\n';
  let typeMismatchContent = ''; // String to store type mismatch messages
  let nonMatchingKeys = []; // List to store non-matching keys

  Object.keys(newData).forEach((key) => {
    const isTypeDifferent = typeof newData[key] !== typeof existingData[key];
    const isValueDifferent = newData[key] !== existingData[key];

    if (isValueDifferent || isTypeDifferent) {
      payload[key] = newData[key];
      nonMatchingKeys.push(key); // Add the non-matching key to the list

      if (debug) {
        if (isTypeDifferent) {
          typeMismatchContent += `  - Field "${key}": Expected Type: ${typeof existingData[
            key
          ]}, Received Type: ${typeof newData[key]}\n`;
        }
        if (isValueDifferent) {
          logContent += `  - Field "${key}": Old Value: ${JSON.stringify(
            existingData[key]
          )}, New Value: ${JSON.stringify(newData[key])}\n`;
        }
      }
    }
  });

  if (debug) {
    console.log('1. Constructing payload with differences:', logContent);
    if (typeMismatchContent) {
      console.log('2. Type mismatches found:', typeMismatchContent);
    }
  }
  return { payload, nonMatchingKeys, typeMismatchContent }; // Return both the payload, the list of non-matching keys, and type mismatch messages
};

function getCurrentChartDatasets(chartData) {
  if (!chartData || !chartData.datasets) {
    console.error('Invalid or missing chart data');
    return [];
  }

  const currentChartDatasets = [];

  // Iterate over each dataset
  chartData.datasets.forEach((dataset) => {
    // Check if dataset has 'xys' array
    if (dataset.data && dataset.data.length > 0) {
      dataset.data.forEach((dataEntry) => {
        if (dataEntry.xys && dataEntry.xys.length > 0) {
          // Add all 'xys' entries to the currentChartDatasets array
          currentChartDatasets.push(...dataEntry.xys.map((xy) => xy.data));
        }
      });
    }
  });

  return currentChartDatasets;
}

const getPriceChange = (collectionPriceHistory) => {
  if (
    !Array.isArray(collectionPriceHistory) ||
    collectionPriceHistory.length === 0
  ) {
    console.warn('Invalid or empty price history', collectionPriceHistory);
    return 'n/a';
  }

  const mostRecentPrice =
    collectionPriceHistory[collectionPriceHistory.length - 1]?.num;
  const currentDate = new Date();

  // Get the first price from the last 24 hours
  const firstPriceFromLastDay = collectionPriceHistory
    .slice()
    .reverse()
    .find((priceHistory) => {
      const historyDate = new Date(priceHistory.timestamp);
      return currentDate - historyDate <= 24 * 60 * 60 * 1000; // less than 24 hours
    })?.num;

  if (mostRecentPrice && firstPriceFromLastDay) {
    const priceChange =
      ((mostRecentPrice - firstPriceFromLastDay) / firstPriceFromLastDay) * 100;
    console.log(
      `Price change over the last 24 hours is: ${priceChange.toFixed(2)}%`
    );
    return priceChange.toFixed(2);
  } else {
    console.error('Could not calculate price change due to missing data');
    return null;
  }
};

const getUpdatedChartData = (collection, newPrice) => {
  const newXYValue = {
    label: `Update - ${new Date().toISOString()}`,
    x: new Date().toISOString(),
    y: newPrice,
  };
  console.log('Updating chart data with:', collection.chartData.allXYValues);
  const allXYValues = collection.chartData?.allXYValues || [];
  console.log('ALL XY VALUES:', allXYValues);
  return {
    ...collection,
    chartData: {
      ...collection.chartData,
      allXYValues: [...(collection.chartData?.allXYValues ?? []), newXYValue],
    },
    totalPrice: newPrice,
  };
};

const mergeCards = (existingCards, updatedCards) => {
  const updatedCardMap = new Map(updatedCards.map((card) => [card.id, card]));
  return existingCards.map((card) => {
    if (updatedCardMap.has(card.id)) {
      return {
        ...card,
        ...updatedCardMap.get(card.id),
        price: updatedCardMap.get(card.id).price || card.price,
        quantity: updatedCardMap.get(card.id).quantity || card.quantity,
      };
    }
    return card;
  });
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
    const updatedCards = cards.map(
      (card) =>
        card.id === cardToUpdate.id ? { ...card, ...cardToUpdate } : card // Update the card if the id matches
    );
    console.log('3. Updated cards in collection:', updatedCards);
    return updatedCards;
  } catch (error) {
    console.error('3. Failed to update card in collection:', error);
    throw error;
  }
};

export const CollectionProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const [selectedCollection, setSelectedCollection] = useState(
    initialCollectionState
  );
  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allCardPrices, setAllCardPrices] = useState([]);
  const [
    updatedPricesFromCombinedContext,
    setUpdatedPricesFromCombinedContext,
  ] = useState([]);

  const [xyData, setXyData] = useState([]);
  const [openChooseCollectionDialog, setOpenChooseCollectionDialog] =
    useState(false);
  const userId = cookies.user?.id;
  const totalCost = useMemo(
    () => getTotalCost(selectedCollection),
    [selectedCollection]
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
    userId,
    selectedCollection,
    collectionId
  ) => {
    const updateInfo = {
      userId: userId,
      name: selectedCollection.name,
      description: selectedCollection.description,
      cards: updatedCards,
      totalCost: updatedPrice,
      totalPrice: updatedPrice,
      _id: collectionId,
      allCardPrices: updatedCards.flatMap((card) =>
        Array(card.quantity).fill(card.card_prices?.[0]?.tcgplayer_price)
      ),
      quantity: updatedCards.length,
      totalQuantity: updatedCards.reduce((acc, card) => acc + card.quantity, 0),
    };

    console.log('4. Created update information:', updateInfo);
    return updateInfo;
  };

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
        createApiUrl(`${userId}/collections`),
        'GET'
      );

      console.log('FETCHED COLLECTIONS:', response);
      console.log('5. Fetched and set collections:', response);

      setAllCollections(response.data || []);
      setCollectionData(response.data?.[0] || initialCollectionState);
      setSelectedCollection(response.data?.[0] || initialCollectionState);
    } catch (error) {
      console.error(`Failed to fetch collections: ${error}`);
    }
  }, [userId]);

  const updateCollectionData = useCallback(
    (newData, collectionType) => {
      switch (collectionType) {
        case 'allCollections':
          setAllCollections((prev) =>
            prev.findIndex((c) => c._id === newData._id) === -1
              ? [...prev, newData]
              : prev.map((c) => (c._id === newData._id ? newData : c))
          );
          break;
        case 'selectedCollection':
          setSelectedCollection(newData);
          break;
        case 'collectionData':
          setCollectionData(newData);
          break;
        default:
          console.warn(
            '6. Unknown collection type for update:',
            collectionType
          );
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

    const payload = createPayload(
      { name, description, userId },
      newCollectionInfo
    );
    const url = createApiUrl(`${userId}/collections`);
    console.log('Creating user collection with data:', {
      userId,
      newCollectionInfo,
      name,
      description,
    });
    console.log('Payload for user collection:', payload);

    const savedCollection = await fetchWrapper(url, 'POST', payload);
    console.log('6. Saved collection:', savedCollection);
    updateCollectionData(savedCollection, 'allCollections');
    updateCollectionData(savedCollection, 'collectionData');
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

  const getUpdatedCards = (activeCollection, cardUpdate, operation) => {
    console.log('CARD UPDATE:', cardUpdate);
    console.log('OPERATION', operation);

    let cardsToUpdate;

    switch (operation) {
      case 'add':
        cardsToUpdate = handleCardAddition(activeCollection?.cards, cardUpdate);
        break;
      case 'remove':
        cardsToUpdate = handleCardRemoval(activeCollection?.cards, cardUpdate);
        break;
      case 'update':
        // Find the card by some unique identifier, e.g., id
        // eslint-disable-next-line no-case-declarations
        const cardIndex = activeCollection.cards.findIndex(
          (c) => c.id === cardUpdate.id
        );
        if (cardIndex === -1) {
          console.error('Card not found in the collection.');
          return activeCollection.cards; // Return the unchanged cards array
        }

        // eslint-disable-next-line no-case-declarations
        const existingCard = activeCollection.cards[cardIndex];

        // eslint-disable-next-line no-case-declarations
        const updatedCard = {
          ...existingCard,
          latestPrice: cardUpdate.latestPrice, // assuming latestPrice is an object { num, timestamp, _id }
          lastSavedPrice: cardUpdate.lastSavedPrice, // assuming lastSavedPrice is an object { num, timestamp, _id }
          name: cardUpdate.name,
          quantity: cardUpdate.quantity,
          tag: cardUpdate.tag,
          // Update priceHistory, ensure it's an array and append the new price
          priceHistory: Array.isArray(existingCard.priceHistory)
            ? [...existingCard.priceHistory, cardUpdate.priceHistory[0]]
            : [cardUpdate.priceHistory[0]],
        };
        console.log('UPDATED CARD:', updatedCard);

        // Replace the old card with the updated card
        cardsToUpdate = [
          ...activeCollection.cards.slice(0, cardIndex),
          updatedCard,
          ...activeCollection.cards.slice(cardIndex + 1),
        ];
        console.log('UPDATED CARD:', updatedCard);
        return cardsToUpdate; // Directly return the updated array of cards

      default:
        console.error('Unsupported operation:', operation);
        cardsToUpdate = activeCollection.cards; // Return the unchanged cards array
    }

    console.log('CARDS TO UPDATE:', cardsToUpdate);
    return cardsToUpdate.map((existingCard) => {
      console.log('EXISTING CARD BEFORE UPDATE:', existingCard);

      // Calculate new card values
      let cardPrice = null;
      if (existingCard.price) {
        cardPrice = existingCard.price;
      } else {
        cardPrice = existingCard.card_prices[0].tcgplayer_price;
      }

      console.log('EXISTING CARD PRICE:', cardPrice);
      const computedPrice =
        cardPrice * (cardUpdate.quantity || existingCard.quantity);
      console.log('EXISTING CARD TOTALPRICE:', computedPrice);

      // Generate chart data and price history
      const newChartDataEntry = {
        x: moment().format('YYYY-MM-DD HH:mm'),
        y: computedPrice,
      };
      const newPriceHistoryEntry = createPriceHistoryObject(computedPrice);
      const valueOfMostRecentEntry = computedPrice;
      // existingCard.chart_datasets?.[existingCard.chart_datasets?.length - 1]
      //   ?.data?.y -
      // existingCard.chart_datasets?.[existingCard.chart_datasets?.length - 2]
      //   ?.data?.y;
      console.log('VALUE OF MOST RECENT ENTRY:', computedPrice);

      const updatedCard = {
        ...existingCard,
        price: cardPrice,
        totalPrice: computedPrice,
        tag: 'monitored',
        chart_datasets: [
          ...(existingCard.chart_datasets || []),
          newChartDataEntry,
        ],
        priceHistory:
          existingCard.priceHistory &&
          existingCard.priceHistory[existingCard.priceHistory.length - 1] !==
            valueOfMostRecentEntry // Check if the new price history entry is different from the last one
            ? [...existingCard.priceHistory, newPriceHistoryEntry]
            : [newPriceHistoryEntry],
      };

      console.log('UPDATED CARD:', updatedCard);
      return updatedCard;
    });
  };

  const createPriceHistoryObject = (price) => ({
    timestamp: new Date().toISOString(),
    num: price,
  });

  const getUpdatedCollection = async (
    collectionWithCards,
    cardUpdate,
    operation
  ) => {
    console.log('CARD UPDATE:', cardUpdate);
    console.log('OPERATION', operation);

    console.log('COLLECTION WITH CARDS:', collectionWithCards);

    const updatedCards = collectionWithCards.cards;
    console.log('UPDATED CARDS:', updatedCards);

    // Calculate new total price for the collection
    const updatedTotalPrice = updatedCards.reduce(
      (total, card) => total + card.totalPrice,
      0
    );
    console.log('UPDATED TOTAL PRICE:', updatedTotalPrice);

    // Construct a new collection price history object
    const newCollectionPriceHistoryObject =
      createPriceHistoryObject(updatedTotalPrice);

    // Update collection chart data
    const updatedChartData = {
      ...selectedCollection.chartData,
      allXYValues: [
        ...(selectedCollection.chartData?.allXYValues || []),
        {
          label: `Update - ${new Date().toISOString()}`,
          x: new Date().toISOString(),
          y: updatedTotalPrice,
        },
      ],
      datasets: [
        ...(selectedCollection.chartData?.datasets || []),
        createNewDataSet(updatedTotalPrice, selectedCollection),
      ],
    };

    const testData = getUpdatedChartData(selectedCollection, updatedTotalPrice);
    console.log('TEST DATA:', testData);
    // Ensure _id is included if updating an existing collection
    const collectionId = selectedCollection._id || null;
    if (collectionId) {
      console.log('COLLECTION ID:', collectionId);
    }

    // Construct the updated collection object
    const updatedCollection = {
      ...selectedCollection,
      allCardPrices: updatedCards.flatMap((card) =>
        Array(card.quantity).fill(card.price)
      ),
      description: selectedCollection.description,
      name: selectedCollection.name,
      userId: userId,
      totalPrice: updatedTotalPrice,
      totalCost: updatedTotalPrice.toString(),
      totalQuantity: updatedCards.reduce((acc, card) => acc + card.quantity, 0),
      quantity: updatedCards.length,
      _id: collectionId,
      cards: updatedCards,
      chartData: updatedChartData,
      dailyPriceChange: getPriceChange(
        selectedCollection.collectionPriceHistory
      ),
      collectionPriceHistory: [
        ...selectedCollection.collectionPriceHistory,
        newCollectionPriceHistoryObject,
      ],
    };
    console.log('UPDATED COLLECTION:', updatedCollection);

    // Check if creating a new collection or updating an existing one
    const isCreating = !collectionId;
    const endpoint = createApiUrl(
      `${userId}/collections/${collectionId || ''}`
    );
    const method = isCreating ? 'POST' : 'PUT';

    // Here we only log what would be sent to the API, without making an actual call

    const { nonMatchingKeys, payload } = constructPayloadWithDifferences(
      selectedCollection,
      updatedCollection,
      true
    ); // Assume constructPayload does the necessary processing
    console.log(
      `Sending ${method} request to ${endpoint} with payload:`,
      payload
    );
    console.log('PAYLOAD:', payload);
    console.log('NON-MATCHING KEYS:', nonMatchingKeys);
    const response = await fetchWrapper(endpoint, method, payload);
    console.log('RESPONSE', response);
    const updatedCollectionPostServer = response.data;
    console.log('UPDATED COLLECTION POST SERVER:', updatedCollectionPostServer);

    updateCollectionData(updatedCollectionPostServer, 'selectedCollection');
    updateCollectionData(updatedCollectionPostServer, 'collectionData');
    updateCollectionData(updatedCollectionPostServer, 'allCollections');

    return updatedCollection;
  };

  const handleCardOperation = async (card, operation) => {
    if (!card) {
      console.error('Card is undefined.', card);
      return;
    }

    const updatedCards = getUpdatedCards(selectedCollection, card, operation);
    console.log('UPDATED CARDS:', updatedCards);
    const collectionWithCards = { ...selectedCollection, cards: updatedCards };
    console.log('COLLECTION WITH CARDS:', collectionWithCards);
    const updatedCollection = await getUpdatedCollection(
      collectionWithCards,
      card,
      operation
    );
    console.log('UPDATED COLLECTION POST OP HANDLING:', updatedCollection);

    return updatedCollection;
  };

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      totalCost,
      totalPrice,
      allCardPrices: selectedCollection?.allCardPrices || [],
      xys: xyData || [],
      openChooseCollectionDialog,
      setAllCardPrices,
      setXyData,
      setUpdatedPricesFromCombinedContext,
      setOpenChooseCollectionDialog,
      calculateTotalPrice: () => getCardPrice(selectedCollection),
      getTotalCost: () => getTotalCost(selectedCollection),
      getCardQuantity: (cardId) =>
        selectedCollection?.cards?.find((c) => c?.id === cardId)?.quantity || 0,
      createUserCollection,
      removeCollection,
      addOneToCollection: (card) => handleCardOperation(card, 'add'),
      removeOneFromCollection: (card) => handleCardOperation(card, 'remove'),
      updateOneFromCollection: (card) => handleCardOperation(card, 'update'),
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
      selectedCollection,
      allCollections,
      collectionData,
      updatedPricesFromCombinedContext,
      xyData,
    });
  }, [allCollections, selectedCollection, totalCost, totalPrice, xyData]);

  // useEffect(() => {
  //   console.log('UPDATED COLLECTION DATA POST SERVER:', collectionData);
  // }, [collectionData]);

  useEffect(() => {
    if (userId) fetchAndSetCollections();
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
// const addOrUpdateCardInCollection = (collection, card, newPrice) => {
//   // Find the card in the collection or create a new one
//   const existingCardIndex = collection.cards.findIndex(
//     (c) => c.id === card.id
//   );
//   const updatedCard = updateCardPriceDetails(card, newPrice);

//   let updatedCards = [...collection.cards];
//   if (existingCardIndex >= 0) {
//     updatedCards[existingCardIndex] = updatedCard; // Update existing card
//   } else {
//     updatedCards = [...updatedCards, updatedCard]; // Add new card
//   }

//   const updatedTotalPrice = updatedCards.reduce(
//     (acc, card) => acc + card.totalPrice,
//     0
//   );
//   const updatedAllCardPrices = updatedCards.map((card) => card.price);

//   return {
//     ...collection,
//     cards: updatedCards,
//     totalPrice: updatedTotalPrice,
//     allCardPrices: updatedAllCardPrices,
//   };
// };

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
