import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import set from 'lodash.set';
import { defaultValues } from '../../simplified_constants';
import { SELECTED_DECK_ID } from '../../constants';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import useManageCookies from '../../hooks/useManageCookies';
// const defaultDecks = {
//   allIds: [SELECTED_DECK_ID],
//   byId: { [SELECTED_DECK_ID]: DEFAULT_DECK },
//   selectedId: SELECTED_DECK_ID,
//   lastUpdated: new Date(),
//   showDecks: true,
// };
const useSelectedDeck = () => {
  const { fetchWrapper } = useFetchWrapper();
  const [decks, setDecks] = useLocalStorage(
    'decks',
    defaultValues.defaultDecks
  );
  const { getCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [deckUpdated, setDeckUpdated] = useState(false);
  const refreshDecks = useCallback(() => {
    // setDecks((prevDecks) => ({ ...prevDecks, lastUpdated: new Date() }));
    setDeckUpdated((prevState) => !prevState); // Toggle to trigger a re-render
  }, []);
  const modifyDeck = useCallback(
    (modifyFn) => {
      const updatedDecks = modifyFn({ ...decks });
      setDecks(updatedDecks);
      refreshDecks();
    },
    [decks, setDecks, refreshDecks]
  );
  const updateDeckField = useCallback(
    (deckId, fieldPath, value) => {
      modifyDeck((currentDecks) =>
        set(currentDecks, `byId.${deckId}.${fieldPath}`, value)
      );
    },
    [modifyDeck]
  );
  // const handleSelectDeck = useCallback(
  //   async (deck) => {
  //     try {
  //       const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/decks/${deck?._id}`;
  //       const response = await fetchWrapper(
  //         url,
  //         'GET',
  //         null,
  //         'fetchSelectedDeck'
  //       );
  //       if (response.data) {
  //         console.log('Selected Deck:', response.data);
  //         setSelectedDeck(response.data);
  //         refreshDecks();
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch selected deck:', error);
  //     }
  //   },
  //   [fetchWrapper, userId, refreshDecks]
  // );
  const handleSelectDeck = useCallback(
    (deck) => {
      console.log('DECK', deck?.name, 'HAS BEEN SELECTED');
      setSelectedDeck(deck);
      modifyDeck((currentDecks) => ({
        ...currentDecks,
        selectedId: deck._id,
        prevSelectedId: currentDecks.selectedId,
        showDecks: !currentDecks.showDecks,
      }));
    },
    [modifyDeck]
  );
  const addOrUpdateDeck = useCallback(
    (deck) => {
      console.log('ADDING OR UPDATING DECK', deck);

      modifyDeck((currentDecks) => {
        // Correctly remove the default deck ID from `allIds` if it exists
        const updatedAllIds = currentDecks.allIds.filter(
          (id) => id !== SELECTED_DECK_ID
        );

        // Delete the default deck data from `byId`, if it exists
        const updatedById = { ...currentDecks.byId };
        delete updatedById[SELECTED_DECK_ID];

        // Update or add the new deck
        updatedById[deck._id] = deck;

        // Update the `allIds` array to include the new deck ID if it's not already present
        const isDeckIdPresent = updatedAllIds.includes(deck._id);
        if (!isDeckIdPresent) {
          updatedAllIds.push(deck._id);
        }

        return {
          ...currentDecks,
          byId: updatedById,
          allIds: updatedAllIds,
          lastUpdated: new Date(),
          selectedId: deck._id,
          prevSelectedId: currentDecks.selectedId,
          showDecks: currentDecks.showDecks,
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
  const removeCardFromSelectedDeck = useCallback(
    (card, deckId = decks.selectedId) => {
      modifyDeck((prevDecks) => {
        const updatedDeck = {
          ...prevDecks.byId[deckId],
          cards: prevDecks.byId[deckId].cards.filter((c) => c.id !== card.id),
        };
        return {
          ...prevDecks,
          byId: { ...prevDecks.byId, [deckId]: updatedDeck },
        };
      });
    },
    [decks.selectedId, modifyDeck]
  );

  useEffect(() => {
    if (deckUpdated) {
      console.log('Decks data updated:', decks);
      setDeckUpdated(false); // Reset update indicator
    }
  }, [deckUpdated]);

  return {
    // selectedDeckId: decks.selectedId,
    selectedDeckId: decks.selectedId,
    selectedDeck: decks.byId[decks.selectedId],
    allDecks: Object.values(decks.byId),
    lastUpdated: decks.lastUpdated,
    showDecks: !!decks.showDecks,
    // showDecks: !!decks.showDecks,
    deckUpdated, // You can use this value in your components to trigger re-renders
    setDeckUpdated,
    updateDeckField,
    updateSelectedDeck: updateDeckField,
    handleSelectDeck,
    removeDeck,
    addOrUpdateDeck,
    refreshDecks,
    // addCardToSelectedDeck: updateDeckField(decks.selectedId, 'cards', card)
    removeCardFromSelectedDeck,
  };
};

export default useSelectedDeck;
