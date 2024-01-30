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
  onFailure,
  page
) => {
  // console.log('CARD:', card);
  // const { count, increment, decrement } = useCounter(card, context);
  const { data, increment, decrement } = useCounter(card, context, {
    max: page === 'DeckBuilder' ? 3 : undefined, // Limit to 3 for Deck context
  });
  const logQuantityChange = (action) => {
    console.log(
      `Action: ${action} - Card:`,
      card?.name,
      `Initial Quantity: ${card?.quantity}, New Quantity: ${data?.quantity}`
    );
  };
  const performAction = useCallback(
    (action) => {
      // Increment or decrement based on the action
      const updateQuantity = (actionType) => {
        actionType === 'add' ? increment(card.id) : decrement(card.id);
      };

      // Action functions for different contexts
      const actionFunctions = {
        Collection: {
          add: () => {
            updateQuantity('add');
            addOneToCollection(data, selectedCollection);
          },
          remove: () => {
            updateQuantity('remove');
            removeOneFromCollection(data, data?.id, selectedCollection);
          },
        },
        Deck: {
          add: () => {
            updateQuantity('add');
            addOneToDeck(data, selectedDeck);
          },
          remove: () => {
            updateQuantity('remove');
            removeOneFromDeck(data, selectedDeck);
          },
        },
        Cart: {
          add: () => {
            updateQuantity('add');
            addOneToCart(data);
          },
          remove: () => {
            updateQuantity('remove');
            removeOneFromCart(data);
          },
        },
      };

      try {
        actionFunctions[context][action]?.();
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
    count: data.quantity,
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
