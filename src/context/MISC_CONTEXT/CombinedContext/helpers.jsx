export const initialState = {
  data: {},
  messageTest: {},
  userData: {},
  collectionData: {},
  allCollectionsUpdated: {},
  allCollectionData: {},
  cronData: {},
  cardPrices: {},
  eventsTriggered: null,
  allCardPrices: {},
  retrievedListOfMonitoredCards: {},
  listOfMonitoredCards: {},
  listOfSimulatedCards: {},
  emittedResponses: [],
  error: null,
  isDelaying: false, // Added isDelaying to initialState as it is referred in your code
  isCronJobTriggered: false, // Added isCronJobTriggered to initialState as it is referred in your code
};

export const generateListOfMonitoredCards = (allCollections) => {
  if (!allCollections) return [];

  const cardsWithCollectionId = allCollections?.flatMap((collection) =>
    collection?.cards?.map((card) => ({
      ...card,
      collectionId: collection._id,
    }))
  );

  const uniqueCardIds = new Set(cardsWithCollectionId.map((card) => card?.id));

  return Array.from(uniqueCardIds).map((id) => {
    const originalCard = cardsWithCollectionId.find((card) => card?.id === id);
    return {
      ...originalCard,
    };
  });
};
export const updateCardPricesInList = (listOfMonitoredCards, cardPrices) => {
  return listOfMonitoredCards.map((originalCard) => {
    const updatedCardInfo =
      cardPrices?.find((price) => price.id === originalCard.id) || {};
    if (updatedCardInfo.latestPrice?.num !== originalCard.latestPrice?.num) {
      return {
        ...originalCard,
        ...updatedCardInfo,
        quantity: originalCard?.quantity,
        price: updatedCardInfo?.latestPrice?.num || originalCard?.price,
        lastSavedPrice: {
          num: updatedCardInfo?.lastSavedPrice?.num || originalCard?.price,
          timestamp:
            updatedCardInfo?.latestPrice?.timestamp || new Date().toISOString(),
        },
        priceHistory: [
          ...originalCard.priceHistory,
          updatedCardInfo?.latestPrice,
        ],
      };
    }

    return originalCard;
  });
};
// Regular function to process unsaved cards
export const processUnsavedCards = (
  allCollections,
  userId,
  externalOperationHandler,
  externalCollectionUpdate
) => {
  if (!allCollections || !userId) return;
  console.log('allCollections:', allCollections);
  const unsavedCollections = allCollections
    ?.map((collection) => {
      const unsavedCardsInCollection = collection?.cards?.filter(
        (card) => card.tag === 'unsaved'
      );
      return {
        collectionId: collection._id,
        unsavedCards: unsavedCardsInCollection,
      };
    })
    .filter((collection) => collection.unsavedCards.length > 0);

  const unsavedCardsPromises = unsavedCollections?.flatMap((collection) =>
    collection?.unsavedCards?.map((card) =>
      externalOperationHandler(card, 'update', collection, userId).then(() =>
        externalCollectionUpdate(collection, null, 'update', userId)
      )
    )
  );

  return Promise.all(unsavedCardsPromises);
};
