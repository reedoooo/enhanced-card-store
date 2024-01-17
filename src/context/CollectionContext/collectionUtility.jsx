export const calculateCollectionValue = (collection) => {
  if (!collection || collection.tag === 'new') {
    console.warn('Invalid or missing collection', collection);
    return 0;
  }

  const getCardsFromCollection = (coll) => {
    if (coll.restructuredCollection) {
      return coll.restructuredCollection.cards;
    } else if (coll.cards && Array.isArray(coll.cards)) {
      return coll.cards;
    }
    return coll;
  };

  const cards = getCardsFromCollection(collection);

  if (!Array.isArray(cards)) {
    console.warn('Invalid collection format', collection);
    return 0;
  }

  return cards.reduce((totalValue, card) => {
    const cardPrice = card?.price || 0;
    const cardQuantity = card?.quantity || 0;
    return totalValue + cardPrice * cardQuantity;
  }, 0);
};
