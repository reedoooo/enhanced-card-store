/* eslint-disable @typescript-eslint/no-empty-function */
const initialCollectionState = {
  userId: '', // Assuming this is an ObjectId string
  name: '', // Initialize as empty string if not provided
  description: '', // Initialize as empty string if not provided
  totalCost: '', // Initialize as empty string if not provided
  totalPrice: 0, // Initialize as 0 if not provided
  quantity: 0, // Initialize as 0 if not provided
  totalQuantity: 0, // Initialize as 0 if not provided
  previousDayTotalPrice: 0, // Initialize as 0 if not provided
  lastSavedPrice: {
    num: 0,
    timestamp: '',
  }, // Initialize as 0 if not provided
  latestPrice: {
    num: 0,
    timestamp: '',
  }, // Initialize as 0 if not provided
  dailyPriceChange: 0, // Initialize as 0 if not provided
  priceDifference: 0, // Initialize as 0 if not provided
  priceChange: 0, // Initialize as 0 if not provided
  allCardPrices: [], // Initialize as empty array if not provided
  cards: [], // Initialize as empty array if not provided
  currentChartDataSets2: [], // Initialize as empty array if not provided
  xys: [], // Use defaultXyData or initialize as empty if not provided
  chartData: {
    name: '', // Initialize as empty string if not provided
    userId: '', // Assuming this is an ObjectId string
    datasets: [], // Initialize as empty array if not provided
    xys: [], // Initialize as empty array if not provided
    allXYValues: [], // Initialize as empty array if not provided
  },
};

/**
 * Transforms the given chartData into an array of x-y points.
 * @param {Object} chartData - Chart data object.
 * @returns {Array} Transformed data.
 */
const transformChartData = (chartData) => {
  const pointsArray = [];

  if (Array.isArray(chartData?.datasets)) {
    chartData?.datasets?.forEach((dataset) => {
      dataset.data?.forEach((dataEntry) => {
        dataEntry.xys?.forEach((xyEntry) => {
          const { x, y } = xyEntry.data;
          if (x && y !== undefined) {
            pointsArray.push({ x, y });
          }
        });
      });
    });
  }

  return pointsArray;
};

/**
 * Converts the given original data into a Nivo-compatible format.
 * @param {Object} originalData - Original data object.
 * @returns {Object} Converted data.
 */
const convertData = (originalData) => {
  const finalDataForChart = [];
  const { datasets } = originalData;

  if (Array.isArray(datasets) && datasets.length > 0) {
    datasets.forEach((dataset, index) => {
      if (Array.isArray(dataset.data) && dataset.data.length > 0) {
        dataset.data.forEach((dataEntry) => {
          dataEntry.xys?.forEach((xyEntry) => {
            const { label, data } = xyEntry;
            finalDataForChart[label] = finalDataForChart[label] || [];

            data.forEach(({ x, y }) => {
              if (x && y !== undefined) {
                finalDataForChart[label].push({ x, y });
              }
            });
          });
        });
      }
    });
  }

  const nivoData = Object.keys(finalDataForChart).map((label) => ({
    id: label,
    data: finalDataForChart[label],
  }));

  return {
    ...originalData,
    finalDataForChart: nivoData,
  };
};

/**
 * Checks if the given object is empty.
 * @param {Object} obj - Object to check.
 * @returns {Boolean} True if the object is empty, false otherwise.
 */
const isEmpty = (obj) => {
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
const validateData = (data, eventName, functionName) => {
  if (typeof data === 'object') {
    if (isEmpty(data)) {
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

/**
 * Calculates the total price from an array of card prices.
 * @param {Array} allCardPrices - Array of card prices.
 * @returns {Number} Total price.
 */
const calculateTotalFromAllCardPrices = (allCardPrices) => {
  if (!Array.isArray(allCardPrices)) return 0;
  return allCardPrices.reduce(
    (total, price) => total + ensureNumber(price, 0),
    0
  );
};

/**
 * Ensures a value is a number, providing a default if not.
 * @param {any} value - Value to check.
 * @param {Number} defaultValue - Default value if check fails.
 * @returns {Number} Ensured number.
 */
const ensureNumber = (value, defaultValue = 0) => {
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Finds the index of a collection by its ID.
 * @param {Array} collections - Array of collections.
 * @param {String} id - ID of the collection to find.
 * @returns {Number} Index of the collection, or -1 if not found.
 */
const findCollectionIndex = (collections, id) =>
  collections?.findIndex((collection) => collection?._id === id) ?? -1;

const getTotalCost = (selectedCollection) => {
  if (!selectedCollection || !Array.isArray(selectedCollection.cards)) return 0;

  return selectedCollection.cards.reduce((total, card) => {
    const cardPrice =
      (card.card_prices && card.card_prices[0]?.tcgplayer_price) || card.price;

    if (!cardPrice) {
      console.error(
        `Failed to get price for card: ${card.name} (ID: ${card.id})`
      );
    }
    return total + cardPrice * card.quantity;
  }, 0);
};
const defaultContextValue = {
  allCollections: [],
  allCardPrices: [],
  xy: [],
  selectedCollection: {},
  collectionData: initialCollectionState,
  officialCollectionDatasets: [],
  totalCost: 0,
  openChooseCollectionDialog: false,
  updatedPricesFromCombinedContext: {},
  setUpdatedPricesFromCombinedContext: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpenChooseCollectionDialog: () => {},
  updateCollection: () => {},
  calculateTotalPrice: () => {},
  getTotalCost: () => {},
  getNewTotalPrice: () => {},
  getTotalPrice: () => {},
  createUserCollection: () => {},
  removeCollection: () => {},
  fetchAllCollectionsForUser: () => {},
  setSelectedCollection: () => {},
  setAllCollections: () => {},
  addOneToCollection: () => {},
  removeOneFromCollection: () => {},
};

const logError = (source, action, error) => {
  console.error(
    `[${source.toUpperCase()}] Failed to ${action}: ${error.message}`
  );
};

const validateUserIdAndData = (userId, data, actionDescription) => {
  if (!userId) {
    logError(
      'validateUserIdAndData',
      actionDescription,
      new Error('User ID is undefined.')
    );
    return false;
  }
  if (!validateData(data, actionDescription, actionDescription)) {
    logError(
      'validateUserIdAndData',
      actionDescription,
      new Error('Validation failed for collection data.')
    );
    return false;
  }
  return true;
};

const createPayload = (info) => {
  console.log('INFO:', info);
  return {
    ...info,
    userId: info.userId,
    name: info.name,
    description: info.description,
    totalCost: info.totalCost || '',
    totalPrice: info.totalPrice || 0,
    quantity: info.quantity || 0,
    totalQuantity: info.totalQuantity || 0,
    previousDayTotalPrice: info.previousDayTotalPrice || 0,
    dailyPriceChange: info.dailyPriceChange || 0,
    priceDifference: info.priceDifference || 0,
    priceChange: info.priceChange || 0,
    collectionPriceHistory: info.collectionPriceHistory || [],
    allCardPrices: info.allCardPrices || [],
    cards: info.cards || [],
    currentChartDataSets: info.currentChartDataSets || [],
    xys: info.xys || [],
    chartData: {
      name: info.chartData?.name || `Chart for ${info.name || 'Collection'}`,
      userId: info.chartData?.userId || info.userId,
      datasets: info.chartData?.datasets || [],
      allXYValues: info.chartData?.allXYValues || [],
      xys: info.chartData?.xys || [],
    },
  };
};

const removeDuplicateCollections = (collections) => {
  const uniqueCollections = {};
  collections?.forEach((collection) => {
    uniqueCollections[collection._id] = collection;
  });
  return Object.values(uniqueCollections);
};

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

// function getCurrentChartDataSets(chartData) {
//   if (!chartData || !chartData?.allXYValues) {
//     console.error('Invalid or missing chart data');
//     return [];
//   }

//   const currentChartDataSets = [];

//   // Iterate over each dataset
//   chartData.allXYValues.forEach((val) => {
//     // Check if dataset has 'data' array
//     if (dataset.data && dataset.data.length > 0) {
//       dataset.data.forEach((dataEntry) => {
//         // Check if dataEntry has 'xys' array
//         if (dataEntry.xys && dataEntry.xys.length > 0) {
//           // Add both 'data' and 'label' from each 'xys' entry
//           currentChartDataSets.push(
//             ...dataEntry.xys.map((xy) => ({
//               ...xy.data, // Spread the 'data' object
//               label: xy.label, // Include the 'label'
//             }))
//           );
//         }
//       });
//     }
//   });

//   return currentChartDataSets;
// }

// function getCurrentChartDataSets(chartData) {
//   if (!chartData || !chartData.datasets) {
//     console.error('Invalid or missing chart data');
//     return [];
//   }

//   const currentChartDataSets = [];

//   // Iterate over each dataset
//   chartData.datasets.forEach((dataset) => {
//     // Check if dataset has 'data' array
//     if (dataset.data && dataset.data.length > 0) {
//       dataset.data.forEach((dataEntry) => {
//         // Check if dataEntry has 'xys' array
//         if (dataEntry.xys && dataEntry.xys.length > 0) {
//           // Add both 'data' and 'label' from each 'xys' entry
//           currentChartDataSets.push(
//             ...dataEntry.xys.map((xy) => ({
//               ...xy.data, // Spread the 'data' object
//               label: xy.label, // Include the 'label'
//             }))
//           );
//         }
//       });
//     }
//   });

//   return currentChartDataSets;
// }

const getAllCardPrices = (cards) =>
  cards.flatMap((card) => Array(card.quantity).fill(card.price));

const calculateCollectionValue = (cards) => {
  if (
    !cards?.cards &&
    !Array.isArray(cards) &&
    !cards?.name &&
    !cards?.restructuredCollection
  ) {
    console.warn('Invalid or missing collection', cards);
    return 0;
  }

  if (cards?.tag === 'new') {
    return 0;
  }
  if (cards?.restructuredCollection) {
    return cards?.restructuredCollection?.cards.reduce((totalValue, card) => {
      const cardPrice = card?.price || 0;
      const cardQuantity = card?.quantity || 0;
      return totalValue + cardPrice * cardQuantity;
    }, 0);
  }
  if (cards?.cards && Array.isArray(cards?.cards)) {
    return cards?.cards.reduce((totalValue, card) => {
      const cardPrice = card?.price || 0;
      const cardQuantity = card?.quantity || 0;
      return totalValue + cardPrice * cardQuantity;
    }, 0);
  }

  return cards.reduce((totalValue, card) => {
    const cardPrice = card.price || 0;
    const cardQuantity = card.quantity || 0;
    return totalValue + cardPrice * cardQuantity;
  }, 0);
};

const getUpdatedChartData = (collection, newPrice) => {
  const newXYValue = {
    label: `Update - ${new Date().toISOString()}`,
    x: new Date().toISOString(),
    y: newPrice,
  };
  console.log('Updating chart data with:', collection?.chartData?.allXYValues);
  const allXYValues = collection?.chartData?.allXYValues || [];
  console.log('ALL XY VALUES:', allXYValues);
  return {
    ...collection,
    chartData: {
      ...collection?.chartData,
      allXYValues: [...(collection?.chartData?.allXYValues ?? []), newXYValue],
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

const getCardPrice = (collection) =>
  parseFloat(collection?.cards?.card_prices?.[0]?.tcgplayer_price || 0);

module.exports = {
  transformChartData,
  convertData,
  isEmpty,
  validateData,
  // handleCardAddition,
  // handleCardRemoval,
  calculateTotalFromAllCardPrices,
  ensureNumber,
  findCollectionIndex,
  // fetchWrapper,
  getTotalCost,
  getCardPrice,
  removeDuplicateCollections,
  initialCollectionState,
  defaultContextValue,
  validateUserIdAndData,
  // determineHttpMethod,
  createPayload,
  logError,
  constructPayloadWithDifferences,
  // getCurrentChartDataSets,
  getUpdatedChartData,
  mergeCards,
  updateCardInCollection,
  // canMakeRequest,
  // updateLastRequestTime,
  calculateCollectionValue,
};
