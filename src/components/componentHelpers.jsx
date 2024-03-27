export const getQuantity = ({
  card,
  cartData,
  selectedCollection,
  allCollections,
  selectedDeck,
  allDecks,
}) => {
  const findCardQuantity = (collectionsOrDecks, cardId) =>
    collectionsOrDecks?.reduce(
      (acc, item) =>
        acc + (item?.cards?.find((c) => c.id === cardId)?.quantity ?? 0),
      0
    ) ?? 0;

  const cartQuantity =
    cartData?.cart?.find((c) => c.id === card.id)?.quantity ?? 0;
  const collectionQuantity = selectedCollection
    ? selectedCollection?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
    : findCardQuantity(allCollections, card.id);
  const deckQuantity = selectedDeck
    ? selectedDeck?.cards?.find((c) => c.id === card.id)?.quantity ?? 0
    : findCardQuantity(allDecks, card.id);

  return {
    cartQuantity,
    collectionQuantity,
    deckQuantity,
  };
};
