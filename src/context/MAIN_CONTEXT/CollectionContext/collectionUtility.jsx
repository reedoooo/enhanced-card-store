/* eslint-disable @typescript-eslint/no-empty-function */
export const calculateCollectionValue = (collection) => {
  if (!collection) return 0;

  const cards = collection?.cards;

  if (!Array.isArray(cards)) {
    console.warn('Invalid collection format', collection, cards);
    return 0;
  }

  return cards.reduce((totalValue, card) => {
    const cardPrice = card?.price || 0;
    const cardQuantity = card?.quantity || 0;
    return totalValue + cardPrice * cardQuantity;
  }, 0);
};

export const shouldFetchCollections = (prevUserId, currentUserId) => {
  return prevUserId !== currentUserId && currentUserId != null;
};
