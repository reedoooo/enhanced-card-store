// Initial collection state
export const initialCollectionState = {
  _id: '',
  cards: [],
  quantity: 0,
  totalPrice: 0,
};

// Fetch wrapper function
export const fetchWrapper = async (url, method, body = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

// Remove duplicate collections
export const removeDuplicateCollections = (collections) => {
  const uniqueCollections = {};
  collections.forEach((collection) => {
    uniqueCollections[collection._id] = collection;
  });
  return Object.values(uniqueCollections);
};

// Calculate and update total price
export const calculateAndUpdateTotalPrice = (collection) => {
  if (!collection || !collection.cards) return 0;
  return collection.cards.reduce(
    (total, card) => total + card.price * card.quantity,
    0
  );
};

// Format card data
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

// Get card quantity from a collection
export const getCardQuantity = (collectionId, allCollections) => {
  const collection = allCollections?.find((item) => item._id === collectionId);
  if (!collection) return 0;
  return collection.cards.reduce((acc, card) => acc + card.quantity, 0);
};

// Calculate total cost of the selected collection
export const getTotalCost = (selectedCollection) => {
  if (!selectedCollection?.cards) return 0;
  return selectedCollection.cards.reduce((total, card) => {
    const price = card.card_prices?.[0]?.tcgplayer_price;
    return price ? total + parseFloat(price) : total;
  }, 0);
};

export const getCardPrice = (card) =>
  parseFloat(card.card_prices?.[0]?.tcgplayer_price || 0);
