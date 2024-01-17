/* eslint-disable @typescript-eslint/no-empty-function */
import moment from 'moment';
import { createApiUrl, roundToNearestTenth } from '../Helpers';

export const initialCollectionState = {
  userId: null,
  name: '',
  description: '',
  totalPrice: 0,
  quantity: 0,
  totalQuantity: 0,
  dailyPriceChange: 0,
  dailyPercentageChange: '0%',
  collectionStatistics: {
    highPoint: 0,
    lowPoint: 0,
    twentyFourHourAverage: {
      startDate: new Date(),
      endDate: new Date(),
      lowPoint: 0,
      highPoint: 0,
      priceChange: 0,
      percentageChange: 0,
      priceIncreased: false,
    },
    average: 0,
    volume: 0,
    volatility: 0,
    general: {
      totalPrice: 0,
      topCard: '',
      topCollection: '',
    },
  },
  latestPrice: {
    // Assuming the structure of priceEntrySchema
    price: 0,
    date: new Date(),
  },
  lastSavedPrice: {
    // Assuming the structure of priceEntrySchema
    price: 0,
    date: new Date(),
  },
  dailyCollectionPriceHistory: [],
  collectionPriceHistory: [],
  chartData: {
    name: '',
    userId: null,
    allXYValues: [],
  },
  cards: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const initialAllCollectionsState = {
  allCollections: [
    {
      cards: [
        /* array of card objects */
      ],
      chartData: {
        allXYValues: [],
      },
      collectionPriceHistory: [
        /* array of price history objects */
      ],
      collectionStatistics: {
        highPoint: 0.17,
        lowPoint: 0.17,
        average: 0.17,
      },
      createdAt: '2024-01-17T03:41:38.909Z',
      dailyCollectionPriceHistory: [
        /* array of daily price history objects */
      ],
      name: 'My First Collection',
      totalPrice: 0.17,
      totalQuantity: 1,
      updatedAt: '2024-01-17T03:41:45.645Z',
      userId: '65a74c7292453528177a150f',
      __v: 1,
      _id: '65a74c7292453528177a1513',
    },
    // ... more collection objects
  ],
};

export const defaultContextValue = {
  allCollections: [],
  selectedCollection: {},
  // collectionData: initialCollectionState,

  cards: [],
  currentChartDataSets2: [],
  totalPrice: 0,
  totalQuantity: 0,
  latestPrice: {},
  lastSavedPrice: {},
  collectionPriceHistory: [],
  allXYValues: [],
  setCurrentChartData2: () => {},
  calculateCollectionValue: () => {},
  setUpdatedPricesFromCombinedContext: () => {},
  updateCollection: () => {},
  calculateTotalPrice: () => {},
  getNewTotalPrice: () => {},
  // getTotalPrice: () => {},
  createUserCollection: () => {},
  removeCollection: () => {},
  getAllCollectionsForUser: () => {},
  setSelectedCollection: () => {},
  setAllCollections: () => {},
  addOneToCollection: () => {},
  removeOneFromCollection: () => {},
  // getCardQuantity: () => {},
  // externalOperationHandler: () => {},
  // externalCollectionUpdate: () => {},
  // updateAllCollectionState: () => {},
};

export const transformPriceHistoryToXY = (collectionPriceHistory) => {
  return collectionPriceHistory?.map((entry) => ({
    x: entry?.timestamp, // x represents the timestamp
    y: entry?.num, // y represents the numerical value
    label: `Price at ${entry?.timestamp}`, // label can be customized as needed
  }));
};

export const logError = (source, action, error) => {
  console.error(
    `[${source.toUpperCase()}] Failed to ${action}: ${error.message}`
  );
};

/**
 * Checks if the given object is empty.
 * @param {Object} obj - Object to check.
 * @returns {Boolean} True if the object is empty, false otherwise.
 */
export const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

/**
 * Validates the given data based on its type and emptiness.
 * @param {any} data - Data to validate.
 * @param {String} eventName - Event that triggered the function.
 * @param {String} functionName - Name of the function.
 * @returns {Boolean} True if the data is valid, false otherwise.
 */
export const validateData = (newCollectionInfo, eventName, functionName) => {
  console.log('NEW COLLECTION INFO: ', newCollectionInfo);
  if (typeof newCollectionInfo.name === 'string') {
    if (!newCollectionInfo.name || !newCollectionInfo.description) {
      console.error(
        `The data passed to ${functionName} from ${eventName} is empty.`
      );
      return false;
    }
    return true;
  }
  console.error(
    `The data passed to ${functionName} from ${eventName} is not an object.`
  );
  return false;
};

export const validateUserIdAndData = (
  userId,
  newCollectionInfo,
  actionDescription
) => {
  if (!userId) {
    logError(
      'validateUserIdAndData',
      actionDescription,
      new Error('User ID is undefined.')
    );
    return false;
  }
  if (
    !validateData(newCollectionInfo, actionDescription, 'createUserCollection')
  ) {
    logError(
      'validateUserIdAndData',
      actionDescription,
      new Error('Validation failed for collection data.')
    );
    return false;
  }
  return true;
};

export const filterUniqueDataPoints = (dataArray) => {
  const uniqueRecords = new Map();

  dataArray?.forEach((item) => {
    const key = `${item?.label}-${item?.x}-${item?.y}`;
    if (!uniqueRecords.has(key)) {
      uniqueRecords.set(key, item);
    }
  });

  return Array.from(uniqueRecords.values());
};
/**
 * Calculates the difference between the updated price and the initial price.
 * @param {Number} updatedPrice - The updated price.
 * @param {Object} selectedCollection - The selected collection.
 * @returns {Number} The difference between the updated price and the initial price.
 * @example calculatePriceDifference(100, { totalPrice: 200 });
 * calculatePriceDifference(100, { totalPrice: 100 });
 **/
export const updatePriceHistory = (card, update) => {
  const newPriceHistoryEntry = createPriceHistoryObject(
    update?.latestPrice?.num
  );
  const lastPriceHistoryEntry =
    card?.priceHistory[card?.priceHistory?.length - 1];

  if (
    !lastPriceHistoryEntry ||
    lastPriceHistoryEntry?.num !== newPriceHistoryEntry?.num
  ) {
    return [...card.priceHistory, newPriceHistoryEntry];
  }
  return card?.priceHistory;
};

export const createChartDataEntry = (price) => {
  return {
    x: moment().format('YYYY-MM-DD HH:mm'),
    y: price,
  };
};

export const getFilteredChartData = (chartData, updatedTotalPrice) => {
  const filteredChartData = {
    ...chartData,
    allXYValues: filterUniqueDataPoints(chartData?.allXYValues),
  };
  return {
    ...filteredChartData,
    allXYValues: [
      ...filteredChartData.allXYValues,
      {
        label: `Update - ${new Date().toISOString()}`,
        x: new Date().toISOString(),
        y: updatedTotalPrice,
      },
    ],
  };
};

export const replaceCardInArray = (cardsArray, newCard, index) => {
  return [
    ...cardsArray.slice(0, index),
    newCard,
    ...cardsArray.slice(index + 1),
  ];
};

export const updateCollectionArray = (collections, newData) => {
  const index = collections.findIndex((c) => c._id === newData?._id);
  return index === -1
    ? [...collections, newData]
    : collections.map((c) => (c._id === newData?._id ? newData : c));
};

export const removeDuplicatesFromCollection = (collection) => {
  const uniqueCardsMap = new Map();
  if (!collection?.cards) return collection;
  collection?.cards.forEach((card) => {
    const uniqueKey = `${card.id}-${card.name}`;
    if (!uniqueCardsMap.has(uniqueKey)) {
      uniqueCardsMap.set(uniqueKey, card);
    }
  });

  return {
    ...collection,
    cards: Array.from(uniqueCardsMap.values()),
  };
};

export const handleError = (condition, errorMessage) => {
  if (!condition) {
    console.error(errorMessage);
    return false;
  }
  return true;
};

export const filterNullPriceHistory = (allCollections) => {
  return allCollections.map((collection) => {
    const filteredCards = collection.cards.map((card) => {
      if (card.priceHistory) {
        // Remove nulls and duplicates with less than 24 hours difference
        const filteredPriceHistory = card.priceHistory.filter(
          (price, index, array) => {
            if (!price) return false; // Filter out null values
            // Check for duplicates with less than 24 hours difference
            const nextPrice = array[index + 1];
            if (nextPrice) {
              const timeDiff =
                new Date(nextPrice.timestamp) - new Date(price.timestamp);
              const lessThan24Hours = timeDiff < 24 * 60 * 60 * 1000; // 24 hours in milliseconds
              return !(price.num === nextPrice.num && lessThan24Hours);
            }
            return true;
          }
        );

        return {
          ...card,
          priceHistory: filteredPriceHistory,
        };
      }
      return card;
    });

    return {
      ...collection,
      cards: filteredCards,
    };
  });
};

export const filterNullPriceHistoryForCollection = (collection) => {
  const filteredCards = collection?.cards?.map((card) => {
    if (card.priceHistory) {
      // Remove null values, duplicates with less than 24 hours difference, and entries with num = 0
      const filteredPriceHistory = card?.priceHistory?.filter(
        (price, index, array) => {
          if (!price || price.num === 0) return false; // Filter out null values and num = 0

          // Check for duplicates with less than 24 hours difference
          const nextPrice = array[index + 1];
          if (nextPrice) {
            const timeDiff =
              new Date(nextPrice.timestamp) - new Date(price.timestamp);
            const lessThan24Hours = timeDiff < 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            return !(price.num === nextPrice.num && lessThan24Hours);
          }
          return true;
        }
      );

      return {
        ...card,
        priceHistory: filteredPriceHistory,
      };
    }
    return card;
  });

  return {
    ...collection,
    cards: filteredCards,
  };
};
/**
 * Handles the addition of a new card to the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToAdd - Card object to add.
 * @returns {Array} Updated array of cards.
 */
export const handleCardAddition = (currentCards, cardToAdd) => {
  const cardToAddId = String(cardToAdd.id);
  const existingCardIndex = currentCards.findIndex((c) => c.id === cardToAddId);

  if (existingCardIndex !== -1) {
    // Card already exists in the collection
    const existingCard = currentCards[existingCardIndex];
    existingCard.quantity = (existingCard.quantity || 0) + 1;
    existingCard.totalPrice = existingCard.price * existingCard.quantity;
    existingCard.chart_datasets = [
      ...existingCard.chart_datasets,
      createChartDataEntry(existingCard.totalPrice),
    ];

    // Update the card in the currentCards array
    currentCards[existingCardIndex] = existingCard;
  } else {
    // Card does not exist in the collection, add it
    const newCard = {
      ...cardToAdd,
      id: cardToAddId,
      quantity: 1,
      totalPrice: cardToAdd.price, // Assuming the cardToAdd has a 'price' field
    };
    currentCards.push(newCard);
  }

  return [...currentCards];
};

/**
 * Handles the removal of a card from the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToRemove - Card object to remove.
 * @returns {Array} Updated array of cards.
 */
export const handleCardRemoval = (currentCards, cardToRemove) => {
  const cardToRemoveId = String(cardToRemove.id);
  const updatedCards = currentCards.map((card) => {
    if (card.id === cardToRemoveId) {
      return card.quantity > 1
        ? {
            ...card,
            quantity: card.quantity - 1,
            totalPrice: card.totalPrice - card.price,
          }
        : null;
    }
    return card;
  });

  return updatedCards.filter((card) => card !== null);
};

/**
 * Handles the updating of a card in the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToUpdate - Card object to update.
 * @returns {Array} Updated array of cards.
 * @example handleCardUpdate([{ id: 1, quantity: 1 }], { id: 1, quantity: 2 });
 **/
export const handleCardUpdate = (
  cards,
  cardUpdate,
  priceHistory,
  collectionId,
  cardPrice
) => {
  return cards.map((card) => {
    if (card.id === cardUpdate.id) {
      return getUpdatedCard(
        card,
        cardUpdate,
        priceHistory,
        collectionId,
        cardPrice
      );
    }
    return card;
  });
};
function getUpdatedCard(card, update, priceHistory, collectionId, cardPrice) {
  console.log('CARD UPDATE:', update);
  console.log('CARD:', card);
  const totalPrice = cardPrice * (update?.quantity || card?.quantity);
  const quantity = update?.quantity || card?.quantity || 1;
  const newChartDataEntry = createChartDataEntry(totalPrice);

  console.log('UPDATE QUANTITY: ', update.quantity);
  console.log('CARD QUANTITY: ', card.quantity);
  console.log('TOTAL PRICE: ', totalPrice);
  console.log('NEW CHARTDAT EN', newChartDataEntry);

  return {
    ...card,
    ...update,
    price: cardPrice || card.price,
    quantity: quantity,
    collectionId: collectionId,
    totalPrice: totalPrice,
    lastSavedPrice: {
      num: card.price || card.card_prices[0].tcgplayer_price,
      timestamp: new Date(),
    },
    latestPrice: update.latestPrice,
    tag: 'monitored',
    chart_datasets: [...card.chart_datasets, newChartDataEntry],
    card_prices: update.card_prices,
    card_sets: update.card_sets,
    card_images: update.card_images,
    priceHistory: priceHistory,
  };
}
export const getUpdatedCollectionData = (
  collectionWithCards,
  updatedTotalPrice,
  updatedCollectionPriceHistory,
  updatedTotalQuantity,
  updatedCards,
  userId
) => {
  if (!collectionWithCards) {
    console.error('No collection data provided');
    return null;
  }

  const {
    allCardPrices = [],
    description = collectionWithCards.description || '',
    name = collectionWithCards.name || '',
    collectionPriceHistory = [
      ...collectionWithCards.collectionPriceHistory,
      ...updatedCollectionPriceHistory,
    ], // collectionPriceHistory is an array of objects with 'num' and 'timestamp' properties
    chartData = collectionWithCards.chartData || {},
    cards = collectionWithCards.cards || [],
    currentChartDataSets2 = getUniqueFilteredXYValues(chartData?.allXYValues) ||
      [],
  } = collectionWithCards;
  if (!Array.isArray(collectionPriceHistory)) {
    console.error(
      'collectionPriceHistory is not an array',
      collectionPriceHistory
    );
    return;
  }
  return {
    allCardPrices,
    description,
    name,
    userId: userId,
    totalPrice: updatedTotalPrice,
    totalQuantity: updatedTotalQuantity || 0,
    quantity: cards?.length,
    lastSavedPrice: {
      num: collectionWithCards?.totalPrice || 0,
      timestamp: new Date(),
    },
    latestPrice: {
      num: updatedTotalPrice || 0,
      timestamp: new Date(),
    },
    dailyPriceChange: '',
    // getPriceChange(chartData)[0]?.priceChange || '',
    currentChartDataSets2: currentChartDataSets2,
    // filterUniqueDataPoints(
    //   chartData?.allXYValues
    //   // transformPriceHistoryToXY(chartData?.allXYValues)
    // ),
    collectionPriceHistory: updatedCollectionPriceHistory,
    // collectionPriceHistory: [
    //   ...collectionPriceHistory,
    //   newCollectionPriceHistoryObject || {
    //     num: updatedTotalPrice,
    //     timestamp: new Date(),
    //   },
    // ],
    cards: updatedCards,
  };
};

export const constructCardDifferencesPayload = (
  oldCollection,
  newCollection,
  debug = false
) => {
  const differences = {};

  newCollection.cards.forEach((newCard) => {
    const oldCard =
      oldCollection.cards.find((card) => card.id === newCard.id) || {};

    Object.keys(newCard).forEach((key) => {
      if (newCard[key] !== oldCard[key]) {
        if (!differences[newCard.id]) {
          differences[newCard.id] = { old: {}, new: {} };
        }
        differences[newCard.id].old[key] = oldCard[key];
        differences[newCard.id].new[key] = newCard[key];
      }
    });
  });

  if (debug && Object.keys(differences).length > 0) {
    console.log('Card Differences:', differences);
  }

  return differences;
};

export const determineMethod = (operation, cardUpdate, collection) => {
  console.log('CARD UPDATE QUANTITY TEST', cardUpdate);
  if (operation === 'remove' && cardUpdate?.quantity >= 1) {
    return 'PUT';
    // } else if (collection?.cards?.some((card) => card?.id === cardUpdate?.id)) {
  } else if (operation === 'remove') {
    return 'DELETE';
  } else if (operation === 'update') {
    return 'PUT';
  } else if (operation === 'add' && cardUpdate?.quantity >= 1) {
    return 'PUT';
  } else if (operation === 'add') {
    return 'POST';
  }
};

export const determineEndpointSuffix = (operation) => {
  return operation === 'remove' ? 'removeCards' : 'updateCards';
};

/**
 * Creates cards payload.
 * @param {Object} collection - The collection to update.
 * @param {Object} cardUpdate - The card update object.
 * @param {String} operation - The operation to perform.
 * @returns {Promise<Object>} The updated collection.
 */
export const createCardsPayload = (operation, updatedCards, cardUpdate) => {
  if (operation === 'remove') {
    const cardIds = updatedCards
      .filter((card) => card?.id !== cardUpdate?.id)
      .map((card) => ({ id: card?.id, _id: card?._id }));
    return { cardIds };
  } else {
    const allCardsWithIds = updatedCards.map((card) => ({
      id: card?.id,
      _id: card?._id,
    }));
    return { cards: updatedCards, cardIds: allCardsWithIds };
  }
};

/**
 * Handles the updating of a collection chart variable data
 * @param {Object} collection - The collection to update.
 * @param {Object} cardUpdate - The card update object.
 * @param {String} operation - The operation to perform.
 * @returns {Promise<Object>} The updated collection.
 */
// export const updateChartData = async (
//   userId,
//   collectionId,
//   updatedChartData
// ) => {
//   const chartDataPayload = { chartData: updatedChartData };
//   const chartDataEndpoint = createApiUrl(
//     `${userId}/collections/${collectionId}/updateChartData`
//   );
//   return await fetchWrapper(chartDataEndpoint, 'PUT', chartDataPayload);
// };

/**
 * Handles the updating of a collection.
 * @param {Object} collection - The collection to update.
 * @param {Object} cardUpdate - The card update object.
 * @param {String} operation - The operation to perform.
 * @returns {Promise<Object>} The updated collection.
 */
export const getPriceChange = (currentChartDataSets2) => {
  if (
    !Array.isArray(currentChartDataSets2) ||
    currentChartDataSets2?.length === 0
  ) {
    console.warn('Invalid or empty chart data sets provided');
    return [];
  }

  const sortedData = currentChartDataSets2
    .filter((dataPoint) => dataPoint && dataPoint?.x && dataPoint?.y != null) // Filter out invalid data points
    .sort((a, b) => new Date(a.x) - new Date(b.x));

  if (sortedData?.length === 0) {
    console.error('No valid chart data points after filtering');
    return [];
  }

  const latestDataPoint = sortedData[sortedData.length - 1];
  const latestTime = new Date(latestDataPoint.x).getTime();
  const twentyFourHoursAgo = latestTime - 24 * 60 * 60 * 1000;

  let closestIndex = -1;
  let closestTimeDifference = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < sortedData.length - 1; i++) {
    const time = new Date(sortedData[i].x).getTime();
    const timeDifference = Math.abs(time - twentyFourHoursAgo);

    if (timeDifference < closestTimeDifference) {
      closestTimeDifference = timeDifference;
      closestIndex = i;
    }
  }

  if (closestIndex !== -1) {
    const pastPrice = sortedData[closestIndex].y;
    const priceChange = latestDataPoint.y - pastPrice;
    const percentageChange = ((priceChange / pastPrice) * 100).toFixed(2);

    return [
      {
        startDate: sortedData[closestIndex].x,
        lowPoint: pastPrice.toFixed(2),
        highPoint: latestDataPoint?.y?.toFixed(2),
        endDate: latestDataPoint?.x,
        priceChange: priceChange.toFixed(2),
        percentageChange: `${percentageChange}%`,
        priceIncreased: priceChange > 0,
      },
    ];
  }

  return [];
};

/**
 * Filters out duplicate Y values from an array of datasets.
 * @param {Array} datasets - An array of dataset objects.
 * @returns {Array} Filtered datasets.
 */
export const filterOutDuplicateYValues = (datasets) => {
  const seenYValues = new Set();
  return datasets?.filter((data) => {
    const yValue = data?.y;
    if (seenYValues.has(yValue)) {
      return false;
    }
    seenYValues.add(yValue);
    return true;
  });
};

/**
 * Filters unique XY values with Y not equal to 0.
 * @param {Array} allXYValues - Array of XY value objects.
 * @returns {Array} Filtered array of XY value objects.
 */
export const getUniqueFilteredXYValues = (allXYValues) => {
  // Check if the input is an array and is not null/undefined
  if (!Array.isArray(allXYValues)) {
    // You can throw an error, return an empty array, or handle it as needed
    console.error('Invalid input: allXYValues should be an array', allXYValues);
    return [];
  }

  const uniqueXValues = new Set();
  return allXYValues
    .filter((entry) => {
      // Check if entry is an object and has property y with a number value
      return (
        entry &&
        typeof entry === 'object' &&
        typeof entry.y === 'number' &&
        entry.y !== 0
      );
    })
    .filter((entry) => {
      // Check if entry has property x with a valid value (not null/undefined)
      const hasValidX =
        entry && 'x' in entry && entry.x !== null && entry.x !== undefined;
      if (hasValidX && !uniqueXValues.has(entry.x)) {
        uniqueXValues.add(entry.x);
        return true;
      }
      return false;
    });
  // console.log('uniqueXValues', uniqueXValues);
};

export const getCollectionId = (selectedCollection, allCollections) => {
  return selectedCollection?._id || allCollections[0]?._id;
};

export const calculatePriceDifference = (updatedPrice, selectedCollection) => {
  return updatedPrice - (selectedCollection.chartData?.updatedPrice || 0);
};

export const createNewDataSet = (updatedPrice, selectedCollection) => {
  return {
    data: [
      {
        xys: [
          {
            label: `Update Number ${
              selectedCollection?.chartData?.datasets?.length + 1 || 1
            }`,
            data: {
              x: moment().format('YYYY-MM-DD HH:mm'),
              y: updatedPrice,
            },
          },
        ],
        additionalPriceData: {
          priceChanged:
            calculatePriceDifference(updatedPrice, selectedCollection) !== 0,
          initialPrice: selectedCollection?.totalPrice,
          updatedPrice: updatedPrice,
          priceDifference: calculatePriceDifference(
            updatedPrice,
            selectedCollection
          ),
          priceChange:
            Math.round(
              (calculatePriceDifference(updatedPrice, selectedCollection) /
                (selectedCollection?.totalPrice || 1)) *
                100
            ) / 100,
        },
      },
    ],
  };
};

export const getTotalQuantityOfSelectedCollection = (selectedCollection) => {
  if (!selectedCollection) return 'n/a';
  return selectedCollection?.cards?.reduce(
    (total, card) => total + card.quantity,
    0
  );
};

export const createPriceHistoryObject = (price) => {
  return {
    num: price,
    timestamp: new Date(),
  };
};

export const getUpdatedCollectionPriceHistory = (
  selectedCollection,
  updatedPrice
) => {
  const updatedPriceHistory = selectedCollection?.collectionPriceHistory || [];
  return [...updatedPriceHistory, createPriceHistoryObject(updatedPrice)];
};

export const getUniqueValidData = (allXYValues) => {
  if (!Array.isArray(allXYValues)) {
    console.error('Invalid input: allXYValues should be an array', allXYValues);
    return [];
  }
  const uniqueLabels = new Set();
  const uniqueXValues = new Set();

  return allXYValues
    .filter((entry) => {
      // Check if entry is valid, y is a number and not zero, and label is unique
      return (
        entry &&
        typeof entry === 'object' &&
        typeof entry.y === 'number' &&
        entry.y !== 0 &&
        entry.y !== null &&
        entry.y !== undefined &&
        entry.label &&
        !uniqueLabels.has(entry.label)
      );
    })
    .filter((entry) => {
      // Check if x is present, not null, not undefined, and unique
      const hasValidX =
        entry && 'x' in entry && entry.x !== null && entry.x !== undefined;
      if (hasValidX && !uniqueXValues.has(entry.x)) {
        uniqueXValues.add(entry.x);
        uniqueLabels.add(entry.label);
        return true;
      }
      return false;
    })
    .map((entry) => ({
      label: entry.label,
      x: entry.x,
      y: entry.y,
    }));
};

export const getFilteredData = (data, timeRange) => {
  const cutOffTime = new Date().getTime() - timeRange;
  return data
    .filter((d) => {
      const date = new Date(d.x);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', d.x);
        return false;
      }
      return date.getTime() >= cutOffTime;
    })
    .map((d) => ({ ...d, y: roundToNearestTenth(d.y) }));
};

// export const calculateCollectionValue = (cards) => {
//   if (
//     !cards?.cards &&
//     !Array.isArray(cards) &&
//     !cards?.name &&
//     !cards?.restructuredCollection
//   ) {
//     console.warn('Invalid or missing collection', cards);
//     return 0;
//   }

//   if (cards?.tag === 'new') {
//     return 0;
//   }
//   if (cards?.restructuredCollection) {
//     return cards?.restructuredCollection?.cards.reduce((totalValue, card) => {
//       const cardPrice = card?.price || 0;
//       const cardQuantity = card?.quantity || 0;
//       return totalValue + cardPrice * cardQuantity;
//     }, 0);
//   }
//   if (cards?.cards && Array.isArray(cards?.cards)) {
//     return cards?.cards.reduce((totalValue, card) => {
//       const cardPrice = card?.price || 0;
//       const cardQuantity = card?.quantity || 0;
//       return totalValue + cardPrice * cardQuantity;
//     }, 0);
//   }

//   return cards.reduce((totalValue, card) => {
//     const cardPrice = card.price || 0;
//     const cardQuantity = card.quantity || 0;
//     return totalValue + cardPrice * cardQuantity;
//   }, 0);
// };

/**
 * Ensures a value is a number, providing a default if not.
 * @param {any} value - Value to check.
 * @param {Number} defaultValue - Default value if check fails.
 * @returns {Number} Ensured number.
 */
export const ensureNumber = (value, defaultValue = 0) => {
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
};

export const getCardPrice = (collection) =>
  parseFloat(collection?.cards?.card_prices?.[0]?.tcgplayer_price || 0);

export const getAllCardPrices = (cards) =>
  cards.flatMap((card) => Array(card.quantity).fill(card.price));

export const determineCardPrice = (card, update) => {
  let price = 0;
  // console.log('CARD UPDATE:', update);
  if (card?.price !== update?.price) {
    price = update?.price;
  } else {
    price = card?.price;
  }

  // if (update?.latestPrice?.num) {
  //   price = update?.latestPrice?.num;
  // }
  return price || card?.card_prices[0]?.tcgplayer_price;
};

export const convertToXYLabelData = (collectionPriceHistory) => {
  return collectionPriceHistory?.map((item) => ({
    x: new Date(item?.timestamp).toLocaleDateString(), // Converts timestamp to a readable date string
    y: item?.num,
    label: `Price: $${item?.num} at ${new Date(
      item.timestamp
    ).toLocaleTimeString()}`, // Combines price and time for the label
  }));
};

// export const convertToXYLabelData = (collectionPriceHistory) => {
//   return collectionPriceHistory?.map((entry) => ({
//     label: entry._id,
//     x: new Date(entry.timestamp),
//     y: entry.num,
//   }));
// };
