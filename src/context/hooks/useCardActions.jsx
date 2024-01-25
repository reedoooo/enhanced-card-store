import { useCallback } from 'react';
import useCounter from './useCounter';

export const useCardActions = (
  context,
  card,
  selectedCollection,
  selectedDeck,
  addOneToCollection,
  removeOneFromCollection,
  addOneToDeck,
  removeOneFromDeck,
  addOneToCart,
  removeOneFromCart,
  onSuccess,
  onFailure
) => {
  // console.log('CARD:', card);
  const { count, increment, decrement } = useCounter(card, context);
  const logQuantityChange = (action) => {
    console.log(
      `Action: ${action} - Card:`,
      card?.name,
      `Initial Quantity: ${card?.quantity}, New Quantity: ${count}`
    );
  };
  const performAction = useCallback(
    (action) => {
      // Action functions for different contexts
      const actionFunctions = {
        Collection: {
          add: () => {
            increment();
            addOneToCollection(card, selectedCollection);
          },
          remove: () => {
            decrement();
            removeOneFromCollection(card, selectedCollection);
          },
        },
        Deck: {
          add: () => {
            increment();
            addOneToDeck(card, selectedDeck);
          },
          remove: () => {
            decrement();
            removeOneFromDeck(card, selectedDeck);
          },
        },
        Cart: {
          add: () => {
            increment();
            addOneToCart(card);
          },
          remove: () => {
            decrement();
            removeOneFromCart(card);
          },
        },
      };

      try {
        actionFunctions[context][action]?.();
        logQuantityChange(action);
        onSuccess?.();
      } catch (error) {
        onFailure?.(error);
      }
    },
    [
      context,
      card,
      selectedCollection,
      selectedDeck,
      addOneToCollection,
      removeOneFromCollection,
      addOneToDeck,
      removeOneFromDeck,
      addOneToCart,
      removeOneFromCart,
      onSuccess,
      onFailure,
      increment,
      decrement,
    ]
  );

  return {
    count,
    performAction,
  };
};

// import { useCallback } from 'react';

// export const useCardActions = (
//   context,
//   card,
//   selectedCollection,
//   selectedDeck,
//   addOneToCollection,
//   removeOneFromCollection,
//   addOneToDeck,
//   removeOneFromDeck,
//   addOneToCart,
//   removeOneFromCart,
//   onSuccess,
//   onFailure
// ) => {
//   const performAction = useCallback(
//     (action) => {
//       const actionFunctions = {
//         Collection: {
//           add: () => addOneToCollection(card, selectedCollection),
//           remove: () => removeOneFromCollection(card, selectedCollection),
//         },
//         Deck: {
//           add: () => addOneToDeck(card, selectedDeck),
//           remove: () => removeOneFromDeck(card, selectedDeck),
//         },
//         Cart: {
//           add: () => addOneToCart(card),
//           remove: () => removeOneFromCart(card),
//         },
//       };

//       try {
//         actionFunctions[context][action]?.();
//         onSuccess?.();
//       } catch (error) {
//         onFailure?.(error);
//       }
//     },
//     [
//       context,
//       card,
//       selectedCollection,
//       selectedDeck,
//       addOneToCollection,
//       removeOneFromCollection,
//       addOneToDeck,
//       removeOneFromDeck,
//       addOneToCart,
//       removeOneFromCart,
//       onSuccess,
//       onFailure,
//     ]
//   );

//   return performAction;
// };
