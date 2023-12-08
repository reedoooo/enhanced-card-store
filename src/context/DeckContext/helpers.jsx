/* eslint-disable @typescript-eslint/no-empty-function */
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
  fetchAllDecksForUser: () => {},
};
