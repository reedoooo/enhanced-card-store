import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const BASE_URL = `${process.env.REACT_APP_SERVER}/api`;

export const createUrl = (path) => `${BASE_URL}/${path}`;
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

const lastRequestTime = {
  POST: 0,
  PUT: 0,
  DELETE: 0,
  GET: 0,
  PATCH: 0,
};

/**
 * Checks if a given request is allowed based on the rate limit.
 * @param {String} method - The HTTP method for the request.
 * @returns {Boolean} - Whether the request is allowed or not.
 */
const updateLastRequestTime = (method) => {
  lastRequestTime[method] = Date.now();
};

export const removeDuplicateCollections = (collections) => {
  const seen = new Set();
  return collections.filter((collection) => {
    const duplicate = seen.has(collection._id);
    seen.add(collection._id);
    return !duplicate;
  });
};

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

// Function to calculate total price of a collection
export const calculateTotalPrice = (collection) => {
  // Assuming collection is an object where each key-value pair is cardId-price
  return Object.values(collection).reduce((total, price) => total + price, 0);
};

// Function to get the quantity of cards in a collection by its ID
export const getCardQuantity = (collectionId, allCollections) => {
  // Assuming allCollections is an array of collection objects
  const collection = allCollections.find((coll) => coll._id === collectionId);
  return collection ? collection.cards.length : 0;
};

// Custom Hook to get the userId from cookies
export const useUserId = () => {
  const [cookies] = useCookies(['authUser']);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(cookies?.authUser?.id);
  }, [cookies]);

  return userId;
};

export const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

export const validateData = (data, eventName, functionName) => {
  const dataType = typeof data || data.data || data.data.data || data.message;
  console.log(
    '----------------------------------------------------------------------------------------------------'
  );
  console.log(
    `| [SUCCESS] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}] |`
  );
  console.log(
    '----------------------------------------------------------------------------------------------------'
  );
  if (data === null || data === undefined) {
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    console.warn(
      `[Warning] Received null or undefined data in ${functionName} triggered by event: ${eventName}`
    );
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    return false;
  }
  if (isEmpty(data) && isEmpty(data?.data) && isEmpty(data?.data?.data)) {
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    console.error(
      `[Error] Received empty data object or array in ${functionName} triggered by event: ${eventName}`
    );
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    return false;
  }
  return true;
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
