import { useCallback } from 'react';
import { defaultValues } from '../simplified_constants';
import {
  useLocalStorageManager,
  updateField,
  addItem,
  removeItem,
} from './utilities';

function useSelectedCollection() {
  const [collections, modifyCollections] = useLocalStorageManager(
    'collections',
    defaultValues.defaultCollections
  );

  // Example usage of utility functions
  const addCollection = useCallback(
    (collection) => {
      addItem(modifyCollections, collection);
    },
    [modifyCollections]
  );

  const updateCollectionField = useCallback(
    (collectionId, fieldPath, value) => {
      updateField(
        modifyCollections,
        `byId.${collectionId}.${fieldPath}`,
        value
      );
    },
    [modifyCollections]
  );

  const removeCollection = useCallback(
    (collectionId) => {
      removeItem(modifyCollections, collectionId);
    },
    [modifyCollections]
  );

  return {
    collections,
    addCollection,
    updateCollectionField,
    removeCollection,
  };
}

function useSelectedDeck() {
  const [decks, modifyDecks] = useLocalStorageManager(
    'decks',
    defaultValues.defaultDecks
  );

  const addDeck = useCallback(
    (deck) => {
      addItem(modifyDecks, deck);
    },
    [modifyDecks]
  );

  const updateDeckField = useCallback(
    (deckId, fieldPath, value) => {
      updateField(modifyDecks, `byId.${deckId}.${fieldPath}`, value);
    },
    [modifyDecks]
  );

  const removeDeck = useCallback(
    (deckId) => {
      removeItem(modifyDecks, deckId);
    },
    [modifyDecks]
  );

  // Optionally, implement any deck-specific logic if necessary
  const selectDeck = useCallback(
    (deckId) => {
      modifyDecks((prevDecks) => ({
        ...prevDecks,
        selectedId: deckId,
        prevSelectedId: prevDecks.selectedId, // Tracking previous selection for UX purposes
      }));
    },
    [modifyDecks]
  );

  return {
    decks,
    addDeck,
    updateDeckField,
    removeDeck,
    selectDeck,
  };
}
