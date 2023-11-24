import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

// Fetch function with proper error handling
export const fetchWrapper = async (url, method, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
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
  const [cookies] = useCookies(['userCookie']);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(cookies.userCookie?.id);
  }, [cookies]);

  return userId;
};

const isEmpty = (obj) => {
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
