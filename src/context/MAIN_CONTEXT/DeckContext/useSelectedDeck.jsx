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
    showDecks: true,
    deckHasBeenSelected: false,
    deckHasBeenUpdated: false,
  });

  const selectedDeckId = useState(decks?.selectedId)[0];
  const selectedDeck = decks.byId[selectedDeckId] || DEFAULT_DECK;

  const updateDeck = useCallback(
    (updatedDeck, deckId = selectedDeckId) => {
      setDecks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [deckId]: updatedDeck,
        },
        deckHasBeenUpdated: true,
      }));
    },
    [setDecks, selectedDeckId]
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
          deckHasBeenUpdated: true,
        };
      });
    },
    [setDecks]
  );
  const handleSelectDeck = useCallback(
    (deck) => {
      const deckId = deck?._id;
      setDecks((prev) => ({
        ...prev,
        selectedId: deckId,
        selectedDeck: deck,
        selectedDeckCards: deck?.cards,
        deckHasBeenSelected: true,
        showDecks: true,
      }));
    },
    [setDecks]
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

  const addCardToSelectedDeck = useCallback(
    (card) => {
      if (!selectedDeckId) return;
      const updatedDeck = {
        ...decks.byId[selectedDeckId],
        cards: [...decks.byId[selectedDeckId].cards, card],
      };
      updateDeck(updatedDeck);
    },
    [decks.byId, selectedDeckId, updateDeck]
  );

  return {
    selectedDeckId,
    selectedDeck,
    allDecks: Object.values(decks.byId),
    showDecks: decks.showDecks,
    deckHasBeenSelected: decks.deckHasBeenSelected,
    deckHasBeenUpdated: decks.deckHasBeenUpdated,

    updateDeck,
    updateMultipleDecks,
    handleSelectDeck,
    addNewDeck,
    removeDeck,
    addCardToSelectedDeck,
  };
};

export default useSelectedDeck;

// const useSelectedDeck = () => {
//   const [decks, setDecks] = useLocalStorage('decks', {
//     allIds: [],
//     byId: {
//       [SELECTED_DECK_ID]:
//         DEFAULT_DECK.addMultipleDefaultCards(DEFAULT_CARDS_COUNT),
//     },
//     selectedId: SELECTED_DECK_ID,
//     selectedDeck: null,
//     selectedDeckCards: null,
//     deckHasBeenSelected: false,
//     deckHasBeenUpdated: false,
//     showDecks: false,
//   });
//   const [selectedDeckId, setSelectedDeckId] = useState(decks.selectedId);
//   const [updatedCardsArray, setUpdatedCardsArray] = useState(
//     decks?.byId?.[selectedDeckId]?.cards
//   );
//   const prevSelectedDeckIdRef = useRef(null);
//   useEffect(() => {
//     prevSelectedDeckIdRef.current = selectedDeckId;
//   }, [selectedDeckId]);
//   const prevDecksRef = useRef();

//   const handleSelectDeck = useCallback(
//     (deck) => {
//       const deckId = deck?._id;
//       setSelectedDeckId(deckId);
//       if (deckId && decks.byId[deckId]) {
//         setDecks((prev) => ({
//           ...prev,
//           selectedId: deckId,
//           selectedDeck: deck,
//           selectedDeckCards: deck?.cards,
//           deckHasBeenSelected: true,
//           showDecks: true,
//         }));
//       }
//     },
//     [decks.byId, setDecks]
//   );

//   const getSelectedDeck = useMemo(
//     () => decks.byId[decks.selectedId] || DEFAULT_DECK,
//     [decks.byId, decks.selectedId]
//   );

//   const updateDeckField = useCallback(
//     (deckId, fieldPath, value) => {
//       setDecks((prev) =>
//         _set({ ...prev }, `byId.${deckId}.${fieldPath}`, value)
//       );
//     },
//     [setDecks]
//   );

//   const resetDeck = useCallback(() => {
//     setDecks((prev) => ({
//       ...prev,
//       selectedId: null,
//       showDecks: true,
//       selectedDeck: null,
//       selectedDeckCards: null,
//       deckHasBeenSelected: false,
//     }));
//   }, [setDecks]);
//   const updateDecksData = useCallback(
//     (newDecks) => {
//       setDecks((prev) => {
//         const updatedById = { ...prev.byId };
//         newDecks.forEach((deck) => {
//           updatedById[deck._id] = deck;
//         });
//         return {
//           ...prev,
//           byId: updatedById,
//           allIds: Object.keys(updatedById),
//         };
//       });
//     },
//     [setDecks]
//   );
//   const updateSelectedDeck = useCallback(
//     (updatedFields) => {
//       setDecks((prev) => {
//         console.log('UPDATED FIELDS', updatedFields);
//         const updatedDeck = { ...prev.byId[prev.selectedId], ...updatedFields };
//         console.log('UPDATED DECK', updatedDeck);
//         return {
//           ...prev,
//           byId: { ...prev.byId, [prev.selectedId]: updatedDeck },
//           selectedDeck: updatedDeck,
//           selectedDeckCards: updatedDeck.cards,
//           // deckHasBeenSelected: true,
//           deckHasBeenUpdated: true,
//         };
//       });
//     },
//     [setDecks]
//   );

//   const addNewDeck = useCallback(
//     (newDeck) => {
//       updateDecksData([newDeck]);
//     },
//     [updateDecksData]
//   );

//   const removeDeck = useCallback(
//     (deckId) => {
//       setDecks((prev) => {
//         const { [deckId]: _, ...remainingById } = prev.byId;
//         return {
//           ...prev,
//           allIds: prev.allIds.filter((id) => id !== deckId),
//           byId: remainingById,
//           selectedId: prev.selectedId === deckId ? null : prev.selectedId,
//         };
//       });
//     },
//     [setDecks]
//   );
//   const addCardToSelectedDeck = useCallback(
//     (card) => {
//       if (!selectedDeckId) return;
//       console.log('Adding card to selected deck', card);
//       const updatedArray = [...decks.byId[selectedDeckId].cards, card]; // Ensure the update is directly reflected in the byId structure
//       setUpdatedCardsArray(updatedArray); // Update local state for rendering, though this might be redundant if we rely on the decks state directly
//       // updateDeckField(selectedDeckId, 'cards', updatedArray); // Update the byId structure directly
//       setDecks((prev) => {
//         const updatedDeck = {
//           ...prev.byId[selectedDeckId],
//           cards: updatedArray,
//         };
//         console.log('UPDATED DECK WITH NEW CARD', updatedDeck);
//         return {
//           ...prev,
//           byId: { ...prev.byId, [selectedDeckId]: updatedDeck }, // Directly update the byId structure for the selected deck
//           // Since we've updated byId above, we can derive selectedDeck and selectedDeckCards from it directly
//           selectedDeck: updatedDeck,
//           selectedDeckCards: updatedCardsArray,
//           deckHasBeenUpdated: true,
//         };
//       });
//     },
//     [setDecks, selectedDeckId, decks.byId]
//   );

//   useEffect(() => {
//     if (prevDecksRef.current) {
//       console.log('Decks data updated:', decks);
//       // handleSelectDeck(decks.byId[decks.selectedId]);
//     }
//     prevDecksRef.current = decks;
//   }, [decks]); // decks array ensures this runs only when collections change
//   useEffect(() => {
//     console.log('CARDS TWO:', updatedCardsArray);

//     // If you are trying to perform actions based on the updated decks, you should do it here.
//     // For instance, if you need to re-select the deck to update UI or other elements, ensure that it's based on the current state.
//   }, [updatedCardsArray]); // This will log whenever 'decks' changes.

//   return {
//     selectedDeckId: selectedDeckId,
//     selectedDeck: getSelectedDeck,
//     allDecks: Object.values(decks.byId),
//     showDecks: decks.showDecks,
//     deckHasBeenSelected: decks.deckHasBeenSelected,
//     deckHasBeenUpdated: decks.deckHasBeenUpdated,
//     updatedCards: updatedCardsArray,
//     addCardToSelectedDeck,
//     handleSelectDeck,
//     updateDeckField,
//     resetDeck,
//     updateDecksData,
//     updateSelectedDeck,
//     addNewDeck,
//     removeDeck,
//   };
// };

// export default useSelectedDeck;
// const addCardToSelectedDeck = useCallback(
//   (card) => {
//     if (!selectedDeckId) return;
//     console.log('Adding card to selected deck', card);
//     const updatedArray = [...decks.selectedDeckCards, card];
//     setUpdatedCardsArray(updatedArray);
//     setDecks((prev) => {
//       const updatedDeck = { ...prev.byId[selectedDeckId] };
//       updatedDeck.cards = [...updatedDeck.cards, card];

//       console.log('UPDATED DECK WITH NEW CARD', updatedDeck);
//       return {
//         ...prev,
//         byId: { ...prev.byId, [selectedDeckId]: updatedDeck },
//         selectedDeck: updatedDeck,
//         selectedDeckCards: updatedDeck.cards,
//         deckHasBeenUpdated: true,
//       };
//     });
//   },
//   [setDecks, selectedDeckId]
// );
// useEffect(() => {
//   if (prevSelectedDeckIdRef.current !== selectedDeckId) {
//     handleSelectDeck(getSelectedDeck);
//   }
//   prevSelectedDeckIdRef.current = selectedDeckId;
// }, [selectedDeckId, getSelectedDeck, handleSelectDeck]);
// useEffect(() => {
//   prevSelectedDeckIdRef.current = selectedDeckId;
// }, [selectedDeckId]);
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
