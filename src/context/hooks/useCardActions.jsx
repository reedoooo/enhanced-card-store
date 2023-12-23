import { useCallback } from 'react';

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
  const performAction = useCallback(
    (action) => {
      const actionFunctions = {
        Collection: {
          add: () => addOneToCollection(card, selectedCollection),
          remove: () => removeOneFromCollection(card, selectedCollection),
        },
        Deck: {
          add: () => addOneToDeck(card, selectedDeck?._id),
          remove: () => removeOneFromDeck(selectedDeck?._id, card),
        },
        Cart: {
          add: () => addOneToCart(card),
          remove: () => removeOneFromCart(card),
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
    ]
  );

  return performAction;
};
