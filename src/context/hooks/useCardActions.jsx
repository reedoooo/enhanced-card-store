import { useCallback, useState } from 'react';
import useCounter from './useCounter';
import useSnackBar from './useSnackBar';
import useDialog from './useDialog';

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
  const { handleSnackBar } = useSnackBar(); // Destructure handleSnackBar from useSnackBar hook
  const { openDialog } = useDialog(); // Destructure openDialog from useDialog hook
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []); // Close dialog function

  const { data, increment, decrement } = useCounter(card, context, {
    max: page === 'DeckBuilder' ? 3 : undefined, // Limit to 3 for Deck context
  });

  /** @internal Place an object in an array */
  const placeObjectInArray = useCallback((object) => {
    const objectInArray = [object];
    return objectInArray;
  }, []);

  const performAction = useCallback(
    (action) => {
      // if (context === 'Collection' && !selectedCollection) {
      //   // Show alert and open dialog if no collection is selected
      //   handleSnackBar('Please select a collection.', 'error'); // Use handleSnackBar to show a snackbar
      //   openDialog('Collection'); // Open the 'Collection' dialog
      //   return;
      // }
      // if (context === 'Deck' && !selectedDeck) {
      //   // Show alert and open dialog if no deck is selected
      //   handleSnackBar('Please select a deck.', 'error'); // Use handleSnackBar to show a snackbar
      //   openDialog('Deck'); // Open the 'Deck' dialog
      //   return;
      // }
      // Increment or decrement based on the action
      const updateQuantity = (actionType) => {
        actionType === 'add' ? increment(card.id) : decrement(card.id);
      };
      const array = placeObjectInArray(data);
      console.log('DATA =>=>=> ', data);

      // Action functions for different contexts
      const actionFunctions = {
        Collection: {
          add: () => {
            console.log('array === ', array);
            updateQuantity('add');
            addOneToCollection(array, selectedCollection);
          },
          remove: () => {
            updateQuantity('remove');
            removeOneFromCollection(
              placeObjectInArray(data),
              placeObjectInArray(data?.id),
              selectedCollection
            );
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
        actionFunctions[context][action]();
        onSuccess?.();
      } catch (error) {
        onFailure?.(error);
      }
    },
    [
      addOneToCart,
      addOneToCollection,
      addOneToDeck,
      context,
      data,
      decrement,
      increment,
      onFailure,
      openDialog,
      page,
      placeObjectInArray,
      removeOneFromCart,
      removeOneFromCollection,
      removeOneFromDeck,
      selectedCollection,
      selectedDeck,
      onSuccess,
      handleSnackBar,
    ]
  );

  return {
    count: data?.quantity,
    performAction,
    closeDialog,
  };
};
