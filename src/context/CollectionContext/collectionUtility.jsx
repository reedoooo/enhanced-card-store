/* eslint-disable @typescript-eslint/no-empty-function */
const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
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
 * Filters out duplicate Y values from an array of datasets.
 * @param {Array} datasets - An array of dataset objects.
 * @returns {Array} Filtered datasets.
 */
const filterOutDuplicateYValues = (datasets) => {
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
 * Handles the addition of a new card to the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToAdd - Card object to add.
 * @returns {Array} Updated array of cards.
 */
const handleCardAddition = (currentCards, cardToAdd) => {
  // Initialize currentCards to an empty array if it's not defined
  currentCards = currentCards || [];

  console.log('CURRENT CARDS:', currentCards);
  console.log('CARD TO ADD:', cardToAdd);
  const cardToAddId =
    typeof cardToAdd.id === 'number' ? String(cardToAdd.id) : cardToAdd.id;
  const matchingCard = currentCards.find((c) => c.id === cardToAddId);

  if (matchingCard) {
    matchingCard.quantity++;
    return [...currentCards];
  }

  return [...currentCards, { ...cardToAdd, id: cardToAddId, quantity: 1 }];
};

/**
 * Handles the removal of a card from the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToRemove - Card object to remove.
 * @returns {Array} Updated array of cards.
 */
const handleCardRemoval = (currentCards, cardToRemove) => {
  // Initialize currentCards to an empty array if it's not defined
  currentCards = currentCards || [];

  console.log('CURRENT CARDS:', currentCards);
  console.log('CARD TO REMOVE:', cardToRemove);

  const cardToRemoveId =
    typeof cardToRemove.id === 'number'
      ? String(cardToRemove.id)
      : cardToRemove.id;

  // Find the card to remove in the current cards array
  const cardIndex = currentCards.findIndex((c) => c.id === cardToRemoveId);

  if (cardIndex === -1) {
    console.error('Card not found in the collection.');
    return [...currentCards];
  }

  const matchingCard = currentCards[cardIndex];

  // If the card has a quantity greater than 1, decrement it
  if (matchingCard.quantity > 1) {
    matchingCard.quantity--;
    return [...currentCards];
  } else {
    // Remove the card from the collection if quantity is 1 or less
    return currentCards.filter((card) => card.id !== cardToRemoveId);
  }
};

/**
 * Filters unique XY values with Y not equal to 0.
 * @param {Array} allXYValues - Array of XY value objects.
 * @returns {Array} Filtered array of XY value objects.
 */
const getUniqueFilteredXYValues = (allXYValues) => {
  // Check if the input is an array and is not null/undefined
  if (!Array.isArray(allXYValues)) {
    // You can throw an error, return an empty array, or handle it as needed
    console.error('Invalid input: allXYValues should be an array');
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
};

// Example usage:
// console.log(getUniqueFilteredXYValues(null)); // Should return []
// console.log(getUniqueFilteredXYValues(undefined)); // Should return []
// console.log(getUniqueFilteredXYValues([{ x: 1, y: 0 }, { x: 2, y: 3 }])); // Should return [{ x: 2, y: 3 }]

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

/**
 * Creates a full API URL from a given path.
 * @param {String} path - API path.
 * @returns {String} Full API URL.
 */
const createApiUrl = (path) => `${BASE_API_URL}/${path}`;

// To prevent making the same type of request within 10 seconds
const lastRequestTime = {
  POST: 0,
  PUT: 0,
  DELETE: 0,
  GET: 0,
  // Add other methods if needed
};

/**
 * Checks whether a new request can be made based on the last request's timestamp.
 * @param {String} method - The HTTP method for the request.
 */
const canMakeRequest = (method) => {
  const currentTime = Date.now();
  // The comment mentioned 10 seconds, but the code was checking for 5 seconds. Adjust as necessary.
  return currentTime - lastRequestTime[method] > 1000; // Now it's 10 seconds
};

/**
 * Updates the last request timestamp for a given method.
 * @param {String} method - The HTTP method for the request.
 */
const updateLastRequestTime = (method) => {
  lastRequestTime[method] = Date.now();
};
/**
 * Wraps fetch API calls and implements a rate limit for each HTTP method type.
 * @param {String} url - The API URL to make the request to.
 * @param {String} method - The HTTP method for the request.
 * @param {Object} [body=null] - The request payload if needed.
 * @returns {Promise<Object>} - The response from the API call.
 */
const fetchWrapper = async (url, method, body = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // We handle non-ok responses immediately
      throw new Error(`API request failed with status ${response.status}`);
    }
    updateLastRequestTime(method); // Assumed to be a function that updates some kind of state
    return await response.json(); // Directly returning the JSON response
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    console.trace();
    throw error; // Re-throwing the error for upstream catch blocks to handle
  }
};

const handleApiResponse = async (response) => {
  if (!(response instanceof Response)) {
    const error = new Error(
      "The response object is not an instance of the Fetch API's Response class."
    );
    console.error(error.message, response);
    throw error;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    const error = new Error(`Failed to parse JSON from the response: ${e}`);
    console.error(error.message);
    throw error;
  }
};

const getTotalCost = (selectedCollection) => {
  if (!selectedCollection || !Array.isArray(selectedCollection.cards)) return 0;

  return selectedCollection.cards.reduce((total, card) => {
    const cardPrice =
      (card.card_prices && card.card_prices[0]?.tcgplayer_price) || 0;
    return total + cardPrice * card.quantity;
  }, 0);
};
// const getCardQuantity = (cardId) => {
//   const card = selectedCollection?.cards?.find((c) => c.id === cardId);
//   return card?.quantity || 0;
// }

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

// Reusable validation and error logging
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

const determineHttpMethod = (isCreatingNew, endpoint) => {
  return isCreatingNew ? 'POST' : 'PUT';
};

// Abstracted payload creation to reduce repetition
// const createPayload = (info, data, defaultXyData) => ({
//   userId: info.userId || data.userId, // Assuming this is an ObjectId string
//   name: info.name || data.name || '',
//   description: info.description || data.description || '',
//   totalCost: info.totalCost || data.totalCost || '',
//   totalPrice: info.totalPrice || data.totalPrice || 0,
//   quantity: info.quantity || data.quantity || 0,
//   totalQuantity: info.totalQuantity || data.totalQuantity || 0,
//   previousDayTotalPrice:
//     info.previousDayTotalPrice || data.previousDayTotalPrice || 0,
//   dailyPriceChange: info.dailyPriceChange || data.dailyPriceChange || '',
//   priceDifference: info.priceDifference || data.priceDifference || 0,
//   priceChange: info.priceChange || data.priceChange || 0,
//   collectionPriceHistory: Array.isArray(info.collectionPriceHistory)
//     ? info.collectionPriceHistory
//     : Array.isArray(data.collectionPriceHistory)
//     ? data.collectionPriceHistory
//     : [],
//   allCardPrices: Array.isArray(info.allCardPrices)
//     ? info.allCardPrices
//     : Array.isArray(data.allCardPrices)
//     ? data.allCardPrices
//     : [],
//   cards: Array.isArray(info.cards)
//     ? info.cards
//     : Array.isArray(data.cards)
//     ? data.cards
//     : [],
//   currentChartDatasets: Array.isArray(info.currentChartDatasets)
//     ? info.currentChartDatasets
//     : Array.isArray(data.currentChartDatasets)
//     ? data.currentChartDatasets
//     : [],
//   xys:
//     defaultXyData ||
//     (Array.isArray(info.xys)
//       ? info.xys
//       : Array.isArray(data.xys)
//       ? data.xys
//       : []),
//   chartData: {
//     name:
//       info.chartData?.name ||
//       data.chartData?.name ||
//       `Chart for ${info.name || data.name || 'Collection'}`,
//     userId:
//       info.chartData?.userId ||
//       data.chartData?.userId ||
//       info.userId ||
//       data.userId,
//     datasets: Array.isArray(info.chartData?.datasets)
//       ? info.chartData.datasets
//       : Array.isArray(data.chartData?.datasets)
//       ? data.chartData.datasets
//       : [],
//     allXYValues: Array.isArray(info.chartData?.allXYValues)
//       ? info.chartData.allXYValues
//       : Array.isArray(data.chartData?.allXYValues)
//       ? data.chartData.allXYValues
//       : [],
//     xys: Array.isArray(info.chartData?.xys)
//       ? info.chartData.xys
//       : Array.isArray(data.chartData?.xys)
//       ? data.chartData.xys
//       : [],
//   },
// });

const createPayload = (info) => {
  // Merge the 'info' and 'data' objects
  // const mergedData = { ...data, ...info };

  // console.log('MERGED DATA:', mergedData);
  console.log('INFO:', info);
  // console.log('DATA:', data);
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

function filterUniqueDataPoints(dataArray) {
  const uniqueRecords = new Map();

  dataArray?.forEach((item) => {
    const key = `${item?.label}-${item?.x}-${item?.y}`;
    if (!uniqueRecords.has(key)) {
      uniqueRecords.set(key, item);
    }
  });

  return Array.from(uniqueRecords.values());
}

function filterCollectionData(collection) {
  if (!collection) return null;

  if (!collection?.chartData) {
    console.warn('Collection data is missing chart data.');
    return collection;
  }
  collection.chartData.allXYValues = filterUniqueDataPoints(
    collection?.chartData?.allXYValues
  );
  collection.currentChartDataSets = filterUniqueDataPoints(
    collection?.currentChartDataSets
  );
  collection.currentChartDataSets2 = filterUniqueDataPoints(
    collection?.currentChartDataSets2
  );

  collection?.chartData?.datasets.forEach((dataset) => {
    dataset?.data?.forEach((dataEntry) => {
      dataEntry.xys = filterUniqueDataPoints(dataEntry?.xys);
    });
  });

  // Apply the filter function to 'xys' in 'chartData'
  collection.chartData.xys = filterUniqueDataPoints(collection.chartData.xys);

  // If the 'cards' array contains structures with 'label', 'x', and 'y' properties
  collection.cards.forEach((card) => {
    if (card.chart_datasets) {
      card.chart_datasets = filterUniqueDataPoints(card.chart_datasets);
    }
  });

  return collection;
}

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

// const getPriceChange = (collectionPriceHistory) => {
//   if (
//     !Array.isArray(collectionPriceHistory) ||
//     collectionPriceHistory.length === 0
//   ) {
//     console.warn('Invalid or empty price history', collectionPriceHistory);
//     return 'n/a';
//   }

//   const mostRecentPrice =
//     collectionPriceHistory[collectionPriceHistory.length - 1]?.num;
//   const currentDate = new Date();

//   // Get the first price from the last 24 hours
//   const firstPriceFromLastDay = collectionPriceHistory
//     .slice()
//     .reverse()
//     .find((priceHistory) => {
//       const historyDate = new Date(priceHistory.timestamp);
//       return currentDate - historyDate <= 24 * 60 * 60 * 1000; // less than 24 hours
//     })?.num;

//   if (mostRecentPrice && firstPriceFromLastDay) {
//     const priceChange =
//       ((mostRecentPrice - firstPriceFromLastDay) / firstPriceFromLastDay) * 100;
//     console.log(
//       `Price change over the last 24 hours is: ${priceChange.toFixed(2)}%`
//     );
//     return priceChange.toFixed(2);
//   } else {
//     console.error('Could not calculate price change due to missing data');
//     return null;
//   }
// };

function getPriceChange(currentChartDataSets2) {
  if (
    !Array.isArray(currentChartDataSets2) ||
    currentChartDataSets2.length === 0
  ) {
    console.warn('Invalid or empty chart data sets provided');
    return [];
  }

  const sortedData = currentChartDataSets2
    .filter((dataPoint) => dataPoint && dataPoint.x && dataPoint.y != null) // Filter out invalid data points
    .sort((a, b) => new Date(a.x) - new Date(b.x));

  if (sortedData.length === 0) {
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
}

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
  filterOutDuplicateYValues,
  transformChartData,
  convertData,
  isEmpty,
  validateData,
  handleCardAddition,
  handleCardRemoval,
  getUniqueFilteredXYValues,
  calculateTotalFromAllCardPrices,
  ensureNumber,
  findCollectionIndex,
  createApiUrl,
  BASE_API_URL,
  handleApiResponse,
  fetchWrapper,
  getTotalCost,
  getCardPrice,
  removeDuplicateCollections,
  initialCollectionState,
  defaultContextValue,
  validateUserIdAndData,
  determineHttpMethod,
  createPayload,
  logError,
  constructPayloadWithDifferences,
  // getCurrentChartDataSets,
  getPriceChange,
  getUpdatedChartData,
  mergeCards,
  updateCardInCollection,
  canMakeRequest,
  updateLastRequestTime,
  calculateCollectionValue,
};
