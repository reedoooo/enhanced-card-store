const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;

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
  const uniqueXValues = new Set();
  return allXYValues
    .filter((entry) => entry.y !== 0)
    .filter((entry) => {
      if (!uniqueXValues.has(entry.x)) {
        uniqueXValues.add(entry.x);
        return true;
      }
      return false;
    });
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

/**
 * Creates a full API URL from a given path.
 * @param {String} path - API path.
 * @returns {String} Full API URL.
 */
const createApiUrl = (path) => `${BASE_API_URL}/${path}`;

/**
 * Handles API responses based on the HTTP method used.
 * @param {Object} response - API response.
 * @param {String} method - HTTP method used (e.g., 'POST', 'PUT').
 * @returns {Object} Processed API response.
 */
const handleApiResponse = (response, method) => {
  if (method === 'POST' && response?.data?.newCollection) {
    return response?.data?.newCollection;
  }
  if (method === 'PUT' && response.data?.data?.updatedCollection) {
    return response?.data?.data?.updatedCollection;
  }
  throw new Error('Unexpected response format');
};

// Export the utility functions if needed
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
  handleApiResponse,
  BASE_API_URL,
};
