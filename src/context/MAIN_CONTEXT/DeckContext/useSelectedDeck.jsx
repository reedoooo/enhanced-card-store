import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  DEFAULT_CARDS_COUNT,
  DEFAULT_DECK,
  SELECTED_DECK_ID,
} from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import _set from 'lodash/set';

const useSelectedDeck = () => {
  const [decks, setDecks] = useLocalStorage('decks', {
    allIds: [],
    byId: {
      [SELECTED_DECK_ID]:
        DEFAULT_DECK.addMultipleDefaultCards(DEFAULT_CARDS_COUNT),
    },
    selectedId: SELECTED_DECK_ID,
    selectedDeck: null,
    selectedDeckCards: null,
    deckHasBeenSelected: false,
    deckHasBeenUpdated: false,
    showDecks: false,
  });
  const selectedDeck = decks.byId[decks.selectedId] || DEFAULT_DECK;
  const [selectedDeckId, setSelectedDeckId] = useState(decks.selectedId);
  const currentDeckCards = decks?.selectedDeck?.cards;
  const [updatedCardsArray, setUpdatedCardsArray] = useState(currentDeckCards);
  const prevSelectedDeckIdRef = useRef(null);

  const handleSelectDeck = useCallback(
    (deck) => {
      const deckId = deck?._id;
      setSelectedDeckId(deckId);
      if (deckId && decks.byId[deckId]) {
        setDecks((prev) => ({
          ...prev,
          selectedId: deckId,
          selectedDeck: deck,
          selectedDeckCards: deck?.cards,
          deckHasBeenSelected: true,
          showDecks: true,
        }));
      }
    },
    [decks.byId, setDecks]
  );

  const getSelectedDeck = useMemo(
    () => decks.byId[decks.selectedId] || DEFAULT_DECK,
    [decks.byId, decks.selectedId]
  );

  const updateDeckField = useCallback(
    (deckId, fieldPath, value) => {
      setDecks((prev) =>
        _set({ ...prev }, `byId.${deckId}.${fieldPath}`, value)
      );
    },
    [setDecks]
  );

  const resetDeck = useCallback(() => {
    setDecks((prev) => ({
      ...prev,
      selectedId: null,
      showDecks: true,
      selectedDeck: null,
      selectedDeckCards: null,
      deckHasBeenSelected: false,
    }));
  }, [setDecks]);
  const updateDecksData = useCallback(
    (newDecks) => {
      setDecks((prev) => {
        const updatedById = { ...prev.byId };
        newDecks.forEach((deck) => {
          updatedById[deck._id] = deck;
        });
        return {
          ...prev,
          byId: updatedById,
          allIds: Object.keys(updatedById),
        };
      });
    },
    [setDecks]
  );
  const updateSelectedDeck = useCallback(
    (updatedFields) => {
      setDecks((prev) => {
        console.log('UPDATED FIELDS', updatedFields);
        const updatedDeck = { ...prev.byId[prev.selectedId], ...updatedFields };
        console.log('UPDATED DECK', updatedDeck);
        return {
          ...prev,
          byId: { ...prev.byId, [prev.selectedId]: updatedDeck },
          selectedDeck: updatedDeck,
          selectedDeckCards: updatedDeck.cards,
          // deckHasBeenSelected: true,
          deckHasBeenUpdated: true,
        };
      });
    },
    [setDecks]
  );

  const addNewDeck = useCallback(
    (newDeck) => {
      updateDecksData([newDeck]);
    },
    [updateDecksData]
  );

  const removeDeck = useCallback(
    (deckId) => {
      setDecks((prev) => {
        const { [deckId]: _, ...remainingById } = prev.byId;
        return {
          ...prev,
          allIds: prev.allIds.filter((id) => id !== deckId),
          byId: remainingById,
          selectedId: prev.selectedId === deckId ? null : prev.selectedId,
        };
      });
    },
    [setDecks]
  );
  const addCardToSelectedDeck = useCallback(
    (card) => {
      if (!selectedDeckId) return;
      console.log('Adding card to selected deck', card);
      const updatedArray = [...currentDeckCards, card];
      setUpdatedCardsArray(updatedArray);
      setDecks((prev) => {
        const updatedDeck = { ...prev.byId[selectedDeckId] };
        updatedDeck.cards = [...updatedDeck.cards, card];

        console.log('UPDATED DECK', updatedDeck);
        return {
          ...prev,
          byId: { ...prev.byId, [selectedDeckId]: updatedDeck },
          selectedDeck: updatedDeck,
          selectedDeckCards: updatedDeck.cards,
          deckHasBeenUpdated: true,
        };
      });
    },
    [setDecks, selectedDeckId]
  );
  useEffect(() => {
    if (prevSelectedDeckIdRef.current !== selectedDeckId) {
      handleSelectDeck(getSelectedDeck);
    }
    prevSelectedDeckIdRef.current = selectedDeckId;
  }, [selectedDeckId, getSelectedDeck, handleSelectDeck]);
  useEffect(() => {
    prevSelectedDeckIdRef.current = selectedDeckId;
  }, [selectedDeckId]);

  return {
    selectedDeckId: selectedDeckId,
    selectedDeck: getSelectedDeck,
    allDecks: Object.values(decks.byId),
    showDecks: decks.showDecks,
    deckHasBeenSelected: decks.deckHasBeenSelected,
    deckHasBeenUpdated: decks.deckHasBeenUpdated,
    currentDeckCards,
    updatedCards: updatedCardsArray,
    addCardToSelectedDeck,
    handleSelectDeck,
    updateDeckField,
    resetDeck,
    updateDecksData,
    updateSelectedDeck,
    addNewDeck,
    removeDeck,
  };
};

export default useSelectedDeck;
// const handleSelectDeck = useCallback(
//   (deck) => {
//     const deckId = deck?._id;
//     console.log('SELECTED DECK ID', deckId);
//     const prevSelectedDeckId = prevSelectedDeckIdRef?.current;

//     console.log('Previous selected deck ID:', prevSelectedDeckId);
//     setSelectedDeckId(deckId);
//     currentSelectedDeckRef.current = deck;
//     currentSelectedDeckIdRef.current = deckId;
//     if (deckId && decks.byId[deckId]) {
//       setDecks((prev) => ({
//         ...prev,
//         selectedId: deckId,
//         selectedDeck: deck,
//         selectedDeckCards: deck?.cards,
//         deckHasBeenSelected: true,
//         showDecks: true,
//       }));
//     }
//   },
//   [decks.byId, setDecks]
// );
// const updateDecksData = useCallback(
//   (newDecks) => {
//     setDecks((prev) => {
//       resetDeck();
//       const updatedById = { ...prev.byId };
//       let updatedSelectedDeck = prev.selectedDeck;
//       let updatedSelectedDeckCards = prev.selectedDeckCards;
//       if (
//         updatedById[currentSelectedDeckIdRef].cards !==
//         decks.selectedDeckCards
//       ) {
//         console.log(
//           'Current Deck Cards:',
//           currentSelectedDeckRef.current?.cards,
//           decks?.selectedDeck?.cards
//         );
//       }
//       newDecks.forEach((deck) => {
//         updatedById[deck._id] = deck;
//         // Check if the updated deck is the currently selected deck
//         if (deck._id === prev.selectedId) {
//           updatedSelectedDeck = deck;
//           updatedSelectedDeckCards = deck.cards;
//         }
//       });

//       return {
//         ...prev,
//         byId: updatedById,
//         allIds: Object.keys(updatedById),
//         selectedDeck: updatedSelectedDeck,
//         selectedDeckCards: updatedSelectedDeckCards,
//       };
//     });
//   },
//   [setDecks]
// );
