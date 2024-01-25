/* eslint-disable @typescript-eslint/no-empty-function */

import { createChartDataEntry } from '../CollectionContext/helpers';

/**
 * Wraps fetch API calls and implements a rate limit for each HTTP method type.
 * @param {String} url - The API URL to make the request to.
 * @param {String} method - The HTTP method for the request.
 * @param {Object} [body=null] - The request payload if needed.
 * @returns {Promise<Object>} - The response from the API call.
 */
export const removeDuplicateDecks = (decks) => {
  const uniqueDecks = {};
  decks.forEach((deck) => (uniqueDecks[deck._id] = deck));
  return Object.values(uniqueDecks);
};

/**
 * Removes duplicate cards from an array of cards.
 * @param {Array} cards - Array of cards.
 * @returns {Array} - Array of cards with no duplicates.
 */
export const calculateAndUpdateTotalPrice = (deck) => {
  let totalPrice = 0;
  if (deck && deck.cards) {
    totalPrice = deck.cards.reduce((total, card) => {
      return total + card.price * card.quantity;
    }, 0);
  }
  return totalPrice;
};

/**
 * Formats card data to be used in the app.
 * @param {Object} card - The card object to format.
 * @returns {Object} - The formatted card object.
 */
export const formatCardData = (card) => ({
  id: card.id,
  ...Object.fromEntries(
    [
      'name',
      'type',
      'frameType',
      'description',
      'card_images',
      'archetype',
      'atk',
      'def',
      'level',
      'race',
      'attribute',
      'quantity',
    ].map((key) => [key, card[key] || null])
  ),
});

export const defaultContextValue = {
  deckData: {}, // Provide default values for context properties
  allDecks: [],
  selectedDeck: {},
  userDecks: [],
  totalQuantity: () => 0,
  setSelectedDeck: () => {},
  addOneToDeck: () => {},
  removeOneFromDeck: () => {},
  getTotalCost: () => 0,
  getCardQuantity: () => 0,
  updateAndSyncDeck: () => {},
  updateDeckDetails: () => {},
  createUserDeck: () => {},
  fetchAllDecksForUser: () => {},
  addCardsToDeck: () => {},
  removeCardsFromDeck: () => {},
  updateCardsInDeck: () => {},
  updateOneInDeck: () => {},
};

export const handleCardAddition = (currentCards, cardToAdd) => {
  const cardToAddId = String(cardToAdd.id);
  console.log('cardToAddId', cardToAddId);
  console.log('currentCards', currentCards);
  const existingCardIndex = currentCards.findIndex((c) => c.id === cardToAddId);

  if (existingCardIndex !== -1) {
    // Card already exists in the deck
    const existingCard = currentCards[existingCardIndex];
    existingCard.quantity = existingCard.quantity + 1;
    existingCard.totalPrice = existingCard.price * existingCard.quantity;

    // Update the card in the currentCards array
    currentCards[existingCardIndex] = existingCard;
  } else {
    // Card does not exist in the deck, add it
    const newCard = {
      ...cardToAdd,
      id: cardToAddId,
      quantity: 1,
      totalPrice: cardToAdd.price, // Assuming the cardToAdd has a 'price' field
    };
    currentCards.push(newCard);
  }

  return [...currentCards];
};

/**
 * Handles the updating of a card in the collection.
 * @param {Array} currentCards - Current array of cards.
 * @param {Object} cardToUpdate - Card object to update.
 * @returns {Array} Updated array of cards.
 * @example handleCardUpdate([{ id: 1, quantity: 1 }], { id: 1, quantity: 2 });
 **/
export const handleCardUpdate = (
  cards,
  cardUpdate,
  deckId
  // priceHistory,
  // collectionId,
  // cardPrice
) => {
  return cards.map((card) => {
    if (card.id === cardUpdate.id) {
      return getUpdatedCard(
        card,
        cardUpdate,
        deckId
        // priceHistory,
        // collectionId,
        // cardPrice
      );
    }
    return card;
  });
};
function getUpdatedCard(card, update, priceHistory, deckId, cardPrice) {
  console.log('CARD UPDATE:', update);
  console.log('CARD:', card);
  const totalPrice = cardPrice * (update?.quantity || card?.quantity);
  const quantity = update?.quantity || card?.quantity || 1;
  const newChartDataEntry = createChartDataEntry(totalPrice);

  console.log('UPDATE QUANTITY: ', update.quantity);
  console.log('CARD QUANTITY: ', card.quantity);
  console.log('TOTAL PRICE: ', totalPrice);
  console.log('NEW CHARTDAT EN', newChartDataEntry);

  return {
    ...card,
    ...update,
    price: cardPrice || card.price,
    quantity: quantity,
    deckId: deckId,
    totalPrice: totalPrice,
    lastSavedPrice: {
      num: card.price || card.card_prices[0].tcgplayer_price,
      timestamp: new Date(),
    },
    latestPrice: update.latestPrice,
    tag: 'monitored',
    chart_datasets: [...card.chart_datasets, newChartDataEntry],
    card_prices: update.card_prices,
    card_sets: update.card_sets,
    card_images: update.card_images,
    priceHistory: priceHistory,
  };
}

// export const addCardsToDeck = async (deckId, newCards) => {
//   if (!Array.isArray(newCards)) {
//     console.error('Invalid card data, expected an array');
//     return;
//   }

//   try {
//     const url = `${BASE_API_URL}/${userId}/decks/${deckId}/add`;
//     const updatedDeck = await fetchWrapper(url, 'POST', { cards: newCards });

//     // Update local state with the new deck data
//     if (selectedDeck._id === deckId) {
//       setSelectedDeck(updatedDeck.data);
//     }
//     updateAndSyncDeck(updatedDeck.data);
//   } catch (error) {
//     console.error(`Failed to add cards to deck: ${error.message}`);
//   }
// };
// export const removeCardsFromDeck = async (deckId, cardIdsToRemove) => {
//   if (!Array.isArray(cardIdsToRemove)) {
//     console.error('Invalid card IDs');
//     return;
//   }

//   try {
//     const url = `${BASE_API_URL}/${userId}/decks/${deckId}/remove`;
//     const updatedDeck = await fetchWrapper(url, 'POST', {
//       cardIds: cardIdsToRemove,
//     });

//     // Update local state with the new deck data
//     if (selectedDeck._id === deckId) {
//       setSelectedDeck(updatedDeck.data);
//     }
//     updateAndSyncDeck(updatedDeck.data);
//   } catch (error) {
//     console.error(`Failed to remove cards from deck: ${error.message}`);
//   }
// };
// export const updateCardsInDeck = async (deckId, updatedCards) => {
//   if (!Array.isArray(updatedCards)) {
//     console.error('Invalid card data, expected an array');
//     return;
//   }

//   try {
//     const url = `${BASE_API_URL}/${userId}/decks/${deckId}/update`;
//     const updatedDeck = await fetchWrapper(url, 'PUT', {
//       cards: updatedCards,
//     });

//     // Update local state with the new deck data
//     if (selectedDeck._id === deckId) {
//       setSelectedDeck(updatedDeck.data);
//     }
//     updateAndSyncDeck(updatedDeck.data);
//   } catch (error) {
//     console.error(`Failed to update cards in deck: ${error.message}`);
//   }
// };
