/**
 * The base URL for all API calls.
 * @type {String}
 */
export const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
/**
 * Creates a full API URL from a given path.
 * @param {String} path - API path.
 * @returns {String} Full API URL.
 */
export const createApiUrl = (path) => `${BASE_API_URL}/${path}`;
/**
 * Calculates the total price of a collection based on the card prices and quantities.
 *
 * @param {Object} collection - The collection object with card information.
 * @returns {number} The total price of the collection.
 */
export const calculateAndUpdateTotalPrice = (collection) => {
  let totalPrice = 0;
  if (collection && collection.cards) {
    totalPrice = collection.cards.reduce((total, card) => {
      return total + card.price * card.quantity;
    }, 0);
  }
  return totalPrice;
};
export const roundToNearestTenth = (value) => {
  return Math.round(value * 10) / 10;
};
export const calculateTotalPrice = (collection) => {
  // Assuming collection is an object where each key-value pair is cardId-price
  return Object.values(collection).reduce((total, price) => total + price, 0);
};
/**
 * Access the values of an object by its keys.
 * @param {Object} obj - The object to access.
 * @param {Array} keys - The keys to access.
 * @returns {Array} The values of the keys.
 * * @example accessValues({ a: 1, b: 2, c: 3 }, ['a', 'c']) => [1, 3]
 **/
export const accessMapValues = (schema) => {
  return Object.keys(schema.shape).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});
};
export const getCardQuantity = (collectionId, allCollections) => {
  // Assuming allCollections is an array of collection objects
  const collection = allCollections.find((coll) => coll._id === collectionId);
  return collection ? collection.cards.length : 0;
};
export const getCartCardQuantity = (cart, cardId) => {
  let totalItems = 0;
  let quantityOfSameId = 0;
  cart?.items?.forEach((item) => {
    totalItems += item.quantity;
    if (item.id === cardId) {
      quantityOfSameId += item.quantity;
    }
  });
  return { totalItems, quantityOfSameId };
};
/**
 * Checks if a card exists in a cart, collection, or deck.
 *
 * @param {Object} entity - The cart, collection, or deck to search within.
 * @param {Object} cardToFind - The card to search for.
 * @return {boolean} - Returns true if the card exists in the entity, otherwise false.
 */
export const doesCardExistInEntity = (entity, cardToFind) => {
  const entityCards = entity.cards || entity.items || [];
  const cardExists = entityCards.some((card) => card.id === cardToFind.id);
  return cardExists;
};
export const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};
/**
 * Creates a new price entry object.
 * @param {number} price - The price to be added to the price entry.
 * @returns {object} - The new price entry object.
 * */
export const createNewPriceEntry = (price) => {
  return {
    num: price,
    timestamp: new Date(),
  };
};
const roundDecimalToWholeNumber = (value) => {
  return Math.round(value * 100) / 100;
};
export const calculateChangePercentage = (collectionData) => {
  const history = collectionData?.collectionValueHistory;
  if (!history || history.length < 2) return 'N/A';

  const oldValue = roundDecimalToWholeNumber(history[1]?.num || 0); // First entry's num value
  const newValue = roundDecimalToWholeNumber(
    history[history.length - 1]?.num || 0
  ); // Last entry's num value

  if (oldValue === 0) return 'N/A'; // Avoid division by zero

  const percentageChange = ((newValue - oldValue) / oldValue) * 100;
  return percentageChange?.toFixed(2) + '%'; // Format to 2 decimal places
};
