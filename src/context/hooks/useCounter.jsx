import { useState, useEffect, useRef } from 'react';
import useLogger from './useLogger'; // Assuming you have a useLogger hook for logging
import { isEqual } from 'lodash';

const useCounter = (inputData, options = {}) => {
  // const logger = useLogger('useCounter');
  const { min, max, deckLimit, page } = options;
  const isDeckBuilderPage = page === 'DeckBuilder';

  const isArray = Array.isArray(inputData);
  const [data, setData] = useState(inputData);

  // Store the initial state to compare later
  const initialData = useRef(inputData);

  // Function to handle increment/decrement actions
  const modifyCount = (itemId, delta) => {
    const newData = isArray
      ? data.map((item) => {
          if (item.id === itemId) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return isDeckBuilderPage && deckLimit !== undefined
              ? { ...item, quantity: Math.min(newQuantity, deckLimit) }
              : { ...item, quantity: Math.min(newQuantity, max) };
          }
          return item;
        })
      : { ...data, quantity: Math.max(0, data.quantity + delta) };

    setData(newData);
  };

  const totalCount = isArray
    ? data.reduce((acc, item) => acc + item?.quantity, 0)
    : data?.quantity;

  const increment = (itemId) => modifyCount(itemId, 1);
  const decrement = (itemId) => modifyCount(itemId, -1);
  const setQuantity = (itemId, quantity) => {
    if (
      (min !== undefined && quantity < min) ||
      (max !== undefined && quantity > max)
    ) {
      throw new Error('Value is outside the specified limits');
    }
    modifyCount(
      itemId,
      quantity -
        (isArray
          ? data.find((item) => item.id === itemId).quantity
          : data.quantity)
    );
  };

  // useEffect(() => {
  //   if (!isEqual(data, initialData.current)) {
  //     logger.logEvent('Data updated', data);
  //     initialData.current = data;
  //   }
  // }, [data, logger]);

  return {
    data,
    totalCount,
    increment,
    decrement,
    setQuantity,
    quantity: data?.quantity,
  };
};

export default useCounter;

// import { useState, useEffect } from 'react';

// const useCounter = (card, context, cards, page, options = {}) => {
//   const { min, max, decklimit } = options;
//   const isDeckBuilderContext = context === 'DeckBuilder';

//   // Initialize state with a key for each context
//   const [counts, setCounts] = useState({
//     [context]: card?.quantity,
//   });

//   // Update count for the specific context if card.quantity changes externally
//   useEffect(() => {
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [context]: card?.quantity,
//     }));
//   }, [card?.quantity, context]);

//   // Function to update count for a specific card ID
//   const updateCount = (cardId, newCount) => {
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [cardId]: Math.min(newCount, max),
//     }));
//   };

//   const increment = () => {
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [context]:
//         max !== undefined
//           ? Math.min(prevCounts[context] + 1, max)
//           : prevCounts[context] + 1,
//     }));
//   };

//   const decrement = () => {
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [context]:
//         min !== undefined
//           ? Math.max(prevCounts[context] - 1, min)
//           : prevCounts[context] - 1,
//     }));
//   };

//   const set = (value) => {
//     if (
//       (min !== undefined && value < min) ||
//       (max !== undefined && value > max)
//     ) {
//       throw new Error('Value is outside the specified limits');
//     }
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [context]: value,
//     }));
//   };

//   const reset = () => {
//     setCounts((prevCounts) => ({
//       ...prevCounts,
//       [context]: card.quantity,
//     }));
//   };

//   return {
//     count: counts[context],
//     increment,
//     decrement,
//     set,
//     reset,
//   };
// };

// export default useCounter;
