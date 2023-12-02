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
