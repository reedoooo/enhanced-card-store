const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
const initialCollectionState = {
  _id: '',
  cards: [],
  quantity: 0,
  totalPrice: 0,
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

  const cardToRemoveId =
    typeof cardToRemove.id === 'number'
      ? String(cardToRemove.id)
      : cardToRemove.id;
  const matchingCard = currentCards.find((c) => c.id === cardToRemoveId);

  if (!matchingCard) {
    console.error('Card not found in the collection.');
    return [...currentCards];
  }

  if (matchingCard.quantity > 1) {
    matchingCard.quantity--;
    return [...currentCards];
  } else {
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
  // if (!canMakeRequest(method)) {
  //   throw new Error(
  //     `A ${method} request was made recently. Please wait before trying again.`
  //   );
  // }

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
    updateLastRequestTime(method);
    // Assuming handleApiResponse is expecting a Response object
    return handleApiResponse(response);
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    // It's useful to log the stack trace in development
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

const removeDuplicateCollections = (collections) => {
  const uniqueCollections = {};
  collections?.forEach((collection) => {
    uniqueCollections[collection._id] = collection;
  });
  return Object.values(uniqueCollections);
};

const getCardPrice = (collection) =>
  console.log('CARD:', collection) ||
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
};
