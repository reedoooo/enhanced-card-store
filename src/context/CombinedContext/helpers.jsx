export const initialState = {
  allData: {},
  data: {},
  messageTest: {},
  userData: {},
  existingChartData: {},
  collectionData: {},
  allCollectionsUpdated: {},
  simData: {},
  allCollectionData: {},
  cronData: {},
  finalUpdateData: {},
  cardPrices: {},
  eventsTriggered: null,
  cardsWithChangedPrice: {},
  previousDayTotalPrice: 0,
  dailyPriceChange: 0,
  priceDifference: 0,
  allCardPrices: {},
  retrievedListOfMonitoredCards: {},
  listOfMonitoredCards: {},
  listOfSimulatedCards: {},
  isLoading: false,
  cronTriggerTimestamps: [],
  emittedResponses: [],
  error: null,
  isDelaying: false, // Added isDelaying to initialState as it is referred in your code
  isCronJobTriggered: false, // Added isCronJobTriggered to initialState as it is referred in your code
};

export const generateListOfMonitoredCards = (allCollections) => {
  if (!allCollections) return [];

  const cardsWithCollectionId = allCollections.flatMap((collection) =>
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
  // if (!data || !Array.isArray(data)) {
  //   console.error('Data is undefined or not an array');
  //   return; // or handle the error appropriately
  // }
  return listOfMonitoredCards.map((originalCard) => {
    const updatedCardInfo =
      cardPrices?.find((price) => price.id === originalCard.id) || {};

    // If latestPrice is different, update lastSavedPrice and priceHistory
    if (updatedCardInfo.latestPrice?.num !== originalCard.latestPrice?.num) {
      // console.log('ORIGINAL CARD: ', originalCard);
      // console.log('UPDATED CARD: ', updatedCardInfo);
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
          // Add the previous price to the price history
          ...originalCard.priceHistory,

          // Add the latest price to the price history
          updatedCardInfo?.latestPrice,
        ],
      };
    }

    return originalCard;
  });
};
