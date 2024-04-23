import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import set from 'lodash.set';
import { defaultValues } from '../../simplified_constants';
import { SELECTED_DECK_ID } from '../../constants';
import useManageCookies from '../../hooks/useManageCookies';
// const defaultDecks = {
//   allIds: [SELECTED_DECK_ID],
//   byId: { [SELECTED_DECK_ID]: DEFAULT_DECK },
//   selectedId: SELECTED_DECK_ID,
//   lastUpdated: new Date(),
//   showDecks: true,
// };
const useSelectedDeck = () => {
  const [decks, setDecks] = useLocalStorage(
    'decks',
    defaultValues.defaultDecks
  );
  const [deckUpdated, setDeckUpdated] = useState(false);
  const refreshDecks = useCallback(() => {
    setDeckUpdated((prevState) => !prevState); // Toggle to trigger a re-render
  }, []);
  // useEffect(() => {
  //   addCookies(['selectedDeckId'], [decks.selectedId], {
  //     path: '/selected',
  //   });
  // }, []);
  const modifyDeck = useCallback(
    (modifyFn) => {
      setDecks((prevDecks) => {
        const updatedDecks = modifyFn({ ...prevDecks });
        return updatedDecks;
      });
      refreshDecks();
    },
    [setDecks]
  );
  const updateDeckField = useCallback(
    (deckId, fieldPath, value) => {
      modifyDeck((currentDecks) =>
        set(currentDecks, `byId.${deckId}.${fieldPath}`, value)
      );
    },
    [modifyDeck]
  );
  const handleSelectDeck = useCallback(
    (deck) => {
      console.log('DECK', deck?.name, 'HAS BEEN SELECTED');

      modifyDeck((currentDecks) => ({
        ...currentDecks,
        selectedId: deck?._id,
        prevSelectedId: currentDecks.selectedId, // Preserve the previously selected ID
        showDecks: currentDecks.showDecks,
      }));
    },
    [modifyDeck]
  );
  const addOrUpdateDeck = useCallback(
    (deck) => {
      console.log('ADDING OR UPDATING DECK', deck);

      modifyDeck((currentDecks) => {
        // Correctly remove the default deck ID from `allIds` if it exists
        // const updatedAllIds = currentDecks.allIds.filter(
        //   (id) => id !== SELECTED_DECK_ID
        // );
        const updatedAllIds = [...currentDecks.allIds];

        const updatedById = { ...currentDecks.byId };
        if (deck?._id !== SELECTED_DECK_ID) {
          updatedById[deck?._id] = deck;

          if (!updatedAllIds.includes(deck?._id)) {
            updatedAllIds.push(deck?._id);
          }
        }
        // Delete the default deck data from `byId`, if it exists
        // const updatedById = { ...currentDecks.byId };
        delete updatedById[SELECTED_DECK_ID];

        // Update or add the new deck
        // updatedById[deck._id] = deck;

        // Update the `allIds` array to include the new deck ID if it's not already present
        // const isDeckIdPresent = updatedAllIds.includes(deck._id);
        // if (!isDeckIdPresent) {
        //   updatedAllIds.push(deck._id);
        // }

        return {
          ...currentDecks,
          byId: updatedById,
          allIds: updatedAllIds,
          lastUpdated: new Date(),
          // selectedId: deck._id,
          // prevSelectedId: currentDecks.selectedId,
          // showDecks: currentDecks.showDecks,
          // showDecks: !currentDecks.showDecks,
        };
      });
    },
    [modifyDeck]
  );
  const addAllDecks = useCallback(
    (allDecksFromServer) => {
      console.log('ADDING ALL DECKS', allDecksFromServer);
      modifyDeck((currentDecks) => {
        const updatedById = { ...currentDecks.byId };
        const updatedAllIds = [...currentDecks.allIds];

        // const updatedAllIds = currentDecks.allIds.filter(
        //   (id) => id !== SELECTED_DECK_ID
        // );
        allDecksFromServer.forEach((deck) => {
          updatedById[deck?._id] = deck;
          if (!updatedAllIds.includes(deck?._id)) {
            updatedAllIds.push(deck?._id);
          }
        });
        return {
          ...currentDecks,
          byId: updatedById,
          allIds: updatedAllIds,
          lastUpdated: new Date(),
          // showDecks: currentDecks.showDecks,
          // showDecks: !currentDecks.showDecks,
        };
      });
    },
    [modifyDeck]
  );
  const removeDeck = useCallback(
    (deckId) => {
      modifyDeck((currentDecks) => {
        const { [deckId]: _, ...remainingById } = currentDecks.byId;
        const remainingAllIds = currentDecks.allIds.filter(
          (id) => id !== deckId
        );
        return {
          ...currentDecks,
          byId: remainingById,
          allIds: remainingAllIds,
        };
      });
    },
    [modifyDeck]
  );
  return {
    decks,
    selectedDeckId: decks.selectedId,
    selectedDeck: decks.byId[decks.selectedId],
    allDecks: Object.values(decks.byId),
    allIds: decks.allIds,
    lastUpdated: decks.lastUpdated,
    showDecks: !!decks.showDecks,
    // showDecks: !!decks.showDecks,
    deckUpdated, // You can use this value in your components to trigger re-renders
    addAllDecks,
    setDeckUpdated,
    updateDeckField,
    updateSelectedDeck: updateDeckField,
    handleSelectDeck,
    removeDeck,
    addOrUpdateDeck,
    refreshDecks,
    // addCardToSelectedDeck: updateDeckField(decks.selectedId, 'cards', card)
    // removeCardFromSelectedDeck,
  };
};

export default useSelectedDeck;
