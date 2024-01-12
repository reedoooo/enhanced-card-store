export const getQuantity = ({
  card,
  cartData,
  selectedCollection,
  allCollections,
  selectedDeck,
  allDecks,
}) => {
  // Helper function to find the quantity of a card in a list of collections or decks
  const findCardQuantity = (collectionsOrDecks) =>
    collectionsOrDecks?.reduce(
      (acc, item) =>
        acc + (item?.cards?.find((c) => c.id === card.id)?.quantity ?? 0),
      0
    ) ?? 0;

  const cartQuantity =
    cartData?.cart?.find((c) => c.id === card.id)?.quantity ?? 0;
  const collectionQuantity = selectedCollection
    ? selectedCollection?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
    : findCardQuantity(allCollections);
  const deckQuantity = selectedDeck
    ? selectedDeck?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
    : findCardQuantity(allDecks);

  return Math.max(cartQuantity, collectionQuantity, deckQuantity);
};
