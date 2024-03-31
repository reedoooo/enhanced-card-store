import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  DEFAULT_CARDS_COUNT,
  DEFAULT_DECK,
  SELECTED_DECK_ID,
} from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import _set from 'lodash/set';
const defaultDecks = {
  allIds: [SELECTED_DECK_ID],
  byId: {
    [SELECTED_DECK_ID]: DEFAULT_DECK,
  },
  selectedId: SELECTED_DECK_ID,
  prevSelectedId: SELECTED_DECK_ID,
  showDecks: true,
};
const useSelectedDeck = () => {
  const [decks, setDecks] = useLocalStorage('decks', defaultDecks);
  const [deckUpdated, setDeckUpdated] = useState(false); // Track when a deck is updated
  const [customError, setCustomError] = useState(null);

  useEffect(() => {
    if (!decks || decks?.allIds?.length === 0) {
      setDecks(defaultDecks);
    }
  }, [decks]);
  const addCardToSelectedDeck = useCallback(
    (card) => {
      if (!decks.selectedId) return;
      const updatedDeck = {
        ...decks.byId[decks.selectedId],
        cards: [...decks.byId[decks.selectedId].cards, card],
      };

      setDecks((prevDecks) => ({
        ...prevDecks,
        byId: {
          ...prevDecks.byId,
          [decks.selectedId]: updatedDeck,
        },
      }));
      setDeckUpdated(true); // Signal that a deck has been updated
    },
    [decks]
  );
  useEffect(() => {
    if (decks.allIds.includes(SELECTED_DECK_ID) && decks.allIds.length > 1) {
      setDecks((prev) => {
        const updatedAllIds = prev.allIds.filter(
          (id) => id !== SELECTED_DECK_ID
        );
        const updatedById = { ...prev.byId };
        delete updatedById[SELECTED_DECK_ID];

        return {
          ...prev,
          allIds: updatedAllIds,
          byId: updatedById,
          // Update selectedId to the first deck if the selected deck is removed
          selectedId:
            prev.selectedId === SELECTED_DECK_ID
              ? updatedAllIds[0]
              : prev.selectedId,
        };
      });
    }
  }, [decks.allIds, decks.byId, setDecks]);
  const getSelectedDeck = useMemo(
    () => decks.byId[decks?.selectedId],
    [decks.byId, decks.selectedId]
  );
  const updateDeck = useCallback(
    (updatedDeck, deckId = decks.selectedId) => {
      setDecks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [deckId]: updatedDeck,
        },
      }));
    },
    [setDecks, decks.selectedId]
  );
  const updateMultipleDecks = useCallback(
    (decksArray) => {
      setDecks((prev) => {
        const updatedById = { ...prev.byId };
        const updatedAllIds = new Set(prev.allIds);

        decksArray.forEach((deck) => {
          updatedById[deck._id] = deck;
          updatedAllIds.add(deck._id);
        });

        return {
          ...prev,
          byId: updatedById,
          allIds: Array.from(updatedAllIds),
        };
      });
    },
    [setDecks]
  );
  const handleSelectDeck = useCallback(
    (deck) => {
      console.log('SELECTED DECK ID', deck?._id);
      setCustomError(null);
      if (!decks.byId[deck?._id]) {
        setCustomError('Invalid deck selected');
        return;
      }
      setDecks((prev) => ({
        ...prev,
        selectedId: deck._id,
        showDecks: !prev.showDecks,
      }));
    },
    [setDecks, decks.selectedId]
  );
  const addNewDeck = useCallback(
    (newDeck) => {
      setDecks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [newDeck._id]: newDeck,
        },
        allIds: [...prev.allIds, newDeck._id],
      }));
    },
    [setDecks]
  );
  const removeDeck = useCallback(
    (deckId) => {
      setDecks((prev) => {
        const { [deckId]: removedDeck, ...remainingById } = prev.byId;
        return {
          ...prev,
          byId: remainingById,
          allIds: prev.allIds.filter((id) => id !== deckId),
          selectedId: prev.selectedId === deckId ? null : prev.selectedId,
        };
      });
    },
    [setDecks]
  );
  const prevDecksRef = useRef();

  useEffect(() => {
    if (prevDecksRef.current) {
      console.log('Decks data updated:', decks);
    }
    prevDecksRef.current = decks;
  }, [
    decks.allIds[
      decks.allIds.includes(SELECTED_DECK_ID)
        ? decks.allIds.indexOf(SELECTED_DECK_ID)
        : decks.allIds.length - 1
    ],
  ]); // decks array ensures this runs only when collections change
  useEffect(() => {
    // Reset the deckUpdated state after it's been set to true
    if (deckUpdated) {
      setDeckUpdated(false);
    }
  }, [deckUpdated]);
  return {
    selectedDeckId: decks.selectedId,
    selectedDeck: getSelectedDeck,
    allDecks: Object.values(decks.byId),
    showDecks: !!decks.showDecks,
    deckUpdated, // You can use this value in your components to trigger re-renders

    updateDeck,
    updateMultipleDecks,
    handleSelectDeck,
    addNewDeck,
    removeDeck,
    addCardToSelectedDeck,
  };
};

export default useSelectedDeck;
// const addCardToSelectedDeck = useCallback(
//   (card) => {
//     if (!decks.selectedId) return;
//     const updatedDeck = {
//       ...decks.byId[decks.selectedId],
//       cards: [...decks.byId[decks.selectedId].cards, card],
//     };
//     updateDeck(updatedDeck);
//   },
//   [decks.byId, updateDeck, decks.selectedId]
// );
