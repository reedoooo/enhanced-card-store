import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { CollectionContext } from './CollectionContext/CollectionContext';
import { useSocketContext } from './SocketProvider';
import CustomLogger from './CutstomLogger';

export const CombinedContext = createContext();

const initialState = {
  allData: {},
  data: {},
  messageTest: {},
  // chartData: {},
  existingChartData: {},
  collectionData: {},
  // currentChartData: {},
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
  handleCardPricesUpdated: {},
  retrievedListOfMonitoredCards: {},
  listOfMonitoredCards: {},
  listOfSimulatedCards: {},
  isLoading: false,
  cronTriggerTimestamps: [],
  emittedResponses: [],
  error: null,
  isDelaying: false, // Added isDelaying to initialState as it is referred in your code
  isCronJobTriggered: false, // Added isCronJobTriggered to initialState as it is referred in your code
  // allCollectionsUpdated: {},
  // cardStats: {},
  // deckData: {},
  // updatedChartData: {},
  // allUpdatedPrices: {},
  // allItemTypeData: {},
  // allItemData: {},
  // allItemData2: {},
  // cardStatsArray: {},
};
const filterDuplicatePrices = (data) => {
  const seen = {};

  return data?.runs?.filter((run) => {
    if (
      !run?.valuesUpdated ||
      !run?.valuesUpdated?.updatedPrices ||
      Object.keys(run?.valuesUpdated?.updatedPrices)?.length === 0
    ) {
      // Remove the item if there's no updatedPrices or it's empty
      return false;
    }

    let isDuplicate = false;
    for (const id in run?.valuesUpdated?.updatedPrices) {
      const item = run?.valuesUpdated?.updatedPrices[id];
      const key = `${id}-${item?.previousPrice}-${item?.updatedPrice}`;

      if (seen[key]) {
        isDuplicate = true;
        break;
      }
      seen[key] = true;
    }

    return !isDuplicate;
  });
};

// function processCardPrices(cardPrices, selectedCollection) {
//   if (!cardPrices || !cardPrices.data || !Array.isArray(cardPrices.data.data)) {
//     console.error('Invalid cardPrices data structure.');
//     return;
//   }

//   console.log('Card prices retrieved:', cardPrices);
//   const priceArray = [];
//   let totalPrice = 0;

//   cardPrices.data.data.forEach((card) => {
//     const { latestPrice, quantity } = card;

//     if (!latestPrice || !quantity) {
//       console.error(`Missing price or quantity for card ID: ${card.id}`);
//       return;
//     }

//     for (let i = 0; i < quantity; i++) {
//       priceArray.push(latestPrice.num);
//       totalPrice += latestPrice.num;
//     }
//   });

// const filteredCards = cardPrices.data.data.filter((card) => {
//   const cardIds = selectedCollection?.cards?.map((card) => card.id);
//   return cardIds?.includes(card.id);
// });

//   console.log('Price Array:', priceArray);
//   console.log('Total Price:', totalPrice.toFixed(2));
//   // console.log('Filtered Cards:', filteredCards);

//   // Save priceArray and totalPrice as needed
//   // For example, you might want to set them to your application's state

//   return { priceArray, totalPrice: totalPrice.toFixed(2) };
// }

const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

const validateData = (data, eventName, functionName) => {
  const dataType = typeof data || data.data || data.data.data || data.message;
  console.log(
    '----------------------------------------------------------------------------------------------------'
  );
  console.log(
    `| [SUCCESS] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}] |`
  );
  console.log(
    '----------------------------------------------------------------------------------------------------'
  );
  if (data === null || data === undefined) {
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    console.warn(
      `[Warning] Received null or undefined data in ${functionName} triggered by event: ${eventName}`
    );
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    return false;
  }
  if (isEmpty(data) && isEmpty(data?.data) && isEmpty(data?.data?.data)) {
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    console.error(
      `[Error] Received empty data object or array in ${functionName} triggered by event: ${eventName}`
    );
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    return false;
  }
  return true;
};

export const CombinedProvider = ({ children }) => {
  const { user } = useCookies(['user']);
  const [state, setState] = useState(initialState);
  const userId = user?.userId;
  const {
    selectedCollection,
    allCollections,
    getNewTotalPrice,
    updateOneFromCollection,
    updateCollection,
    processAndUpdateCardPrices,
    setAllCardPrices,
    setTotalPrice,
    setAllCollections,
    updatedPricesFromCombinedContext,
    officialCollectionDatasets,
    setOfficialCollectionDatasets,
    setUpdatedPricesFromCombinedContext,
  } = useContext(CollectionContext);
  const socket = useSocketContext();

  const createStateUpdaterFunction = (key) =>
    useCallback(
      (data) => {
        setState((prev) => {
          let newData;

          // validateData(data, key, 'createStateUpdaterFunction');
          if (Array.isArray(data)) {
            newData = [...data];
          } else if (typeof data === 'object' && data !== null) {
            newData = { ...data };
          } else {
            newData = data;
          }
          return { ...prev, [key]: newData };
        });
      },
      [setState]
    );

  const setDataFunctions = {
    data: createStateUpdaterFunction('chartData'),
    messageTest: createStateUpdaterFunction('messageTest'),
    finalUpdateData: createStateUpdaterFunction('finalUpdateData'),
    chartData: createStateUpdaterFunction('chartData'),
    existingChartData: createStateUpdaterFunction('existingChartData'),
    listOfSimulatedCards: createStateUpdaterFunction('listOfSimulatedCards'),
    // cardStats: createStateUpdaterFunction('cardStats'),
    cardPrices: createStateUpdaterFunction('cardPrices'),
    allCardPrices: createStateUpdaterFunction('allCardPrices'),
    retrievedListOfMonitoredCards: createStateUpdaterFunction(
      'retrievedListOfMonitoredCards'
    ),
    // allData: createStateUpdaterFunction('allData'),
    cronData: createStateUpdaterFunction('cronData'),
    error: createStateUpdaterFunction('error'),
    // updatedChartData: createStateUpdaterFunction('updatedChartData'),
    currentChartData: createStateUpdaterFunction('currentChartData'),
    simData: createStateUpdaterFunction('simData'),
    checkAndUpdateCardPrice: createStateUpdaterFunction(
      'checkAndUpdateCardPrice'
    ),
    collectionData: createStateUpdaterFunction('collectionData'),
    allCollectionData: createStateUpdaterFunction('allCollectionData'),
    emittedResponses: createStateUpdaterFunction('emittedResponses'),
    eventsTriggered: createStateUpdaterFunction('eventsTriggered'),
    isDelaying: createStateUpdaterFunction('isDelaying'),
    isCronJobTriggered: createStateUpdaterFunction('isCronJobTriggered'),
  };

  const setLoader = (isLoading) => {
    if (typeof isLoading !== 'boolean') {
      console.error('Invalid argument type for setLoader: Expected boolean');
      return;
    }
    setState((prev) => ({ ...prev, isLoading }));
  };

  const setCronStatus = (cronActive) => {
    if (typeof cronActive !== 'boolean') {
      console.error(
        'Invalid argument type for setCronStatus: Expected boolean'
      );
      return;
    }
    setState((prev) => ({ ...prev, cronActive }));
  };

  useEffect(() => {
    if (state.eventsTriggered) {
      console.log(`Handling event: ${state.eventsTriggered.eventName}`);
      // Additional logic to handle the event
    }
  }, [state.eventsTriggered]);
  // ----------- XXX -----------
  const generateListOfMonitoredCards = (allCollections) => {
    if (!allCollections) return [];

    //   // Ensure cardPrices is an array
    //   const cardPrices = Array.isArray(state.cardPrices) ? state.cardPrices : [];

    //   // Flatten all cards from all collections, including collection ID
    //   const cardsWithCollectionId = allCollections.flatMap((collection) =>
    //     collection?.cards?.map((card) => ({
    //       ...card,
    //       collectionId: collection._id,
    //     }))
    //   );
    const cardsWithCollectionId = allCollections.flatMap((collection) =>
      collection?.cards?.map((card) => ({
        ...card,
        collectionId: collection._id,
      }))
    );

    const uniqueCardIds = new Set(cardsWithCollectionId.map((card) => card.id));

    return Array.from(uniqueCardIds).map((id) => {
      const originalCard = cardsWithCollectionId.find((card) => card.id === id);

      return {
        ...originalCard,
        priceHistory: originalCard.priceHistory || [],
      };
    });
  };
  const updateCardPricesInList = (listOfMonitoredCards, cardPrices) => {
    return listOfMonitoredCards.map((originalCard) => {
      const updatedCardInfo =
        cardPrices.find((price) => price.id === originalCard.id) || {};

      // If latestPrice is different, update lastSavedPrice and priceHistory
      if (updatedCardInfo.latestPrice?.num !== originalCard.latestPrice?.num) {
        return {
          ...originalCard,
          ...updatedCardInfo,
          quantity: originalCard.quantity,
          price: updatedCardInfo.latestPrice?.num || originalCard.price,
          lastSavedPrice:
            updatedCardInfo.lastSavedPrice ||
            updatedCardInfo.priceHistory[
              updatedCardInfo.priceHistory.length - 1
            ],
          priceHistory: [
            ...originalCard.priceHistory,
            updatedCardInfo.latestPrice,
          ],
        };
      }

      return originalCard;
    });
  };
  const listOfMonitoredCards = useMemo(
    () => generateListOfMonitoredCards(allCollections),
    [allCollections]
  );

  // const listOfMonitoredCards = useMemo(() => {
  //   if (!allCollections) return [];

  //   const cardPrices = Array.isArray(state.cardPrices)
  //     ? state.cardPrices
  //     : [state.cardPrices];

  //   const cardsWithCollectionId = allCollections.flatMap((collection) =>
  //     collection?.cards?.map((card) => ({
  //       ...card,
  //       collectionId: collection._id,
  //     }))
  //   );

  //   const uniqueCardIds = new Set(cardsWithCollectionId.map((card) => card.id));

  //   return Array.from(uniqueCardIds).map((id) => {
  //     const originalCard = cardsWithCollectionId.find((card) => card.id === id);
  //     const updatedCardInfo = cardPrices.find((price) => price.id === id) || {};

  //     const latestPrice =
  //       updatedCardInfo.latestPrice || originalCard.latestPrice;
  //     const lastSavedPrice =
  //       updatedCardInfo.lastSavedPrice || originalCard.lastSavedPrice;

  //     return {
  //       ...originalCard,
  //       ...updatedCardInfo,
  //       latestPrice,
  //       lastSavedPrice,
  //       price: latestPrice?.num || originalCard.price,
  //       priceHistory: updatedCardInfo.priceHistory || originalCard.priceHistory,
  //     };
  //   });
  // }, [allCollections, state.cardPrices]);

  // const updateCardPricesState = (currentCardPrices, updatedCardsList) => {
  //   // Ensure both currentCardPrices and updatedCardsList are arrays
  //   if (!Array.isArray(currentCardPrices)) currentCardPrices = [];
  //   if (!Array.isArray(updatedCardsList)) updatedCardsList = [];

  //   // Create a map for easy lookup of current card prices by ID
  //   const currentCardPricesMap = new Map(
  //     currentCardPrices.map((card) => [card.id, card])
  //   );

  //   // Update the card prices with new data from updatedCardsList
  //   return updatedCardsList.map((updatedCard) => {
  //     const currentCardPrice = currentCardPricesMap.get(updatedCard.id) || {};

  //     return {
  //       ...currentCardPrice,
  //       latestPrice: updatedCard.latestPrice || currentCardPrice.latestPrice,
  //       lastSavedPrice:
  //         updatedCard.lastSavedPrice || currentCardPrice.lastSavedPrice,
  //       price: updatedCard.latestPrice?.num || currentCardPrice.price,
  //       priceHistory: updatedCard.priceHistory || currentCardPrice.priceHistory,
  //     };
  //   });
  // };

  const emitUpdatedCards = (socket, updatedCards) => {
    socket.emit('UPDATED_MONITORED_CARDS', updatedCards);
  };

  // Usage
  // Now you can set the state with newCardPrices

  // const listOfMonitoredCards = useMemo(() => {
  //   if (!allCollections) return [];

  //   const cardPrices = Array.isArray(state.cardPrices) ? state.cardPrices : [];

  //   // Flatten all cards from all collections with additional collection ID
  //   const cardsWithCollectionId = allCollections.flatMap((collection) =>
  //     collection?.cards?.map((card) => ({
  //       ...card,
  //       collectionId: collection._id,
  //     }))
  //   );

  //   // Reduce the cards to a map, merging cards with the same ID
  //   const mergedCardsMap = cardsWithCollectionId.reduce((acc, card) => {
  //     const updatedCardInfo = cardPrices.find((price) => price.id === card.id) || {};
  //     const existingCard = acc.get(card.id) || {};

  //     const mergedCard = {
  //       ...existingCard,
  //       ...card,
  //       ...updatedCardInfo,
  //       latestPrice: updatedCardInfo.latestPrice || card.latestPrice || existingCard.latestPrice,
  //       lastSavedPrice: updatedCardInfo.lastSavedPrice || card.lastSavedPrice || existingCard.lastSavedPrice,
  //       price: updatedCardInfo.latestPrice?.num || card.price || existingCard.price,
  //     };

  //     acc.set(card.id, mergedCard);
  //     return acc;
  //   }, new Map());

  //   // Convert the map values to an array
  //   return Array.from(mergedCardsMap.values());
  // }, [allCollections, state.cardPrices]);

  // const listOfMonitoredCards = useMemo(() => {
  //   if (!allCollections) return [];

  //   // Ensure cardPrices is an array
  //   const cardPrices = Array.isArray(state.cardPrices) ? state.cardPrices : [];

  //   // Flatten all cards from all collections, including collection ID
  //   const cardsWithCollectionId = allCollections.flatMap((collection) =>
  //     collection?.cards?.map((card) => ({
  //       ...card,
  //       collectionId: collection._id,
  //     }))
  //   );

  //   // Create a unique set of card IDs
  //   const uniqueCardIds = new Set(cardsWithCollectionId.map((card) => card.id));

  //   // Map over unique card IDs to find corresponding card and update with new prices if available
  //   return cardsWithCollectionId.map((card) => {
  //     const updatedCardInfo =
  //       cardPrices.find((price) => price.id === card.id) || {};

  //     return {
  //       ...card,
  //       latestPrice: updatedCardInfo?.latestPrice || card?.latestPrice,
  //       lastSavedPrice: updatedCardInfo?.lastSavedPrice || card?.lastSavedPrice,
  //       price: updatedCardInfo?.latestPrice?.num || card.price, // Assuming you want to update the price field as well
  //       _id: updatedCardInfo?._id || card?._id,
  //       id: updatedCardInfo?.id || card?.id,
  //       collectionId: updatedCardInfo?.collectionId || card?.collectionId,
  //       tag: updatedCardInfo?.tag || card?.tag,
  //       name: updatedCardInfo?.name || card?.name,
  //       quantity: updatedCardInfo?.quantity || card?.quantity,
  //       priceHistory: updatedCardInfo?.priceHistory || card?.priceHistory,
  //       // __v: updatedCardInfo?.__v || originalCard.__v,
  //       // _id: card?._id,
  //       // id: card?.id,
  //       // collectionId: card?.collectionId, // Include collection ID in the returned object
  //       // tag: 'monitored',
  //       // name: card?.name,
  //       // quantity: card?.quantity,
  //       // price: card?.price,
  //       // latestPrice: {
  //       //   num: updatedLatestPrice,
  //       //   timestamp: card?.latestPrice?.timestamp
  //       //     ? card?.latestPrice?.timestamp
  //       //     : new Date().toISOString(),
  //       // },
  //       // lastSavedPrice: {
  //       //   num: updatedLastSavedPrice,
  //       //   timestamp: card?.lastSavedPrice?.timestamp
  //       //     ? card?.lastSavedPrice?.timestamp
  //       //     : new Date().toISOString(),
  //       // },
  //       // priceHistory: card?.priceHistory,
  //       // __v: card?.__v,
  //     };
  //   });
  // }, [allCollections, state.cardPrices]);

  // ----------- SOCKET EVENT HANDLERS -----------

  // const safeEmit = useCallback(
  //   (event, data) => {
  //     try {
  //       if (!validateData(data, event, 'safeEmit')) {
  //         throw new Error(`Invalid data emitted for event: ${event}`);
  //       }
  //       if (socket) {
  //         socket.emit(event, data);
  //         console.log(`[Info] Emitted event: ${event}`);
  //       } else {
  //         console.warn('Socket is not connected. Cannot emit event:', event);
  //       }
  //     } catch (error) {
  //       console.error(`[Error] Failed to emit event: ${event}`, error);
  //       setDataFunctions.error({
  //         message: error.message,
  //         source: 'safeEmit',
  //       });
  //     }
  //   },
  //   [socket]
  // );

  // const safeOn = useCallback(
  //   (event, handler) => {
  //     const wrapper = (data) => {
  //       try {
  //         if (!validateData(data, event, handler.name)) {
  //           throw new Error(`Invalid data received for event: ${event}`);
  //         } // Add this line to validate the data received
  //         // console.log(`[Info] Handling event: ${event}`);
  //         handler(data);
  //       } catch (error) {
  //         console.error(`[Error] Failed to handle event: ${event}`, error);
  //         setDataFunctions.error({ message: error.message, source: event });
  //       }
  //     };

  //     socket.on(event, wrapper); // Add this line to register the event listener

  //     return () => {
  //       socket.off(event, wrapper); // Add this line to unregister the event listener when the component unmounts
  //     };
  //   },
  //   [socket]
  // );

  // const mergeUpdates = (currentArray, updates) => {
  //   const updatedArray = [...currentArray];
  //   updates.forEach((update) => {
  //     const index = updatedArray.findIndex((item) => item.id === update.id);
  //     if (index !== -1) {
  //       updatedArray[index] = { ...updatedArray[index], ...update };
  //     } else {
  //       updatedArray.push(update);
  //     }
  //   });
  //   return updatedArray;
  // };

  // const handleStatusUpdateCharts = (newData) => {
  //   const { updates } = newData.data;
  //   console.log('[STATUS_UPDATE_CHARTS] Data:', updates);
  //   const updatedList = mergeUpdates(state.listOfSimulatedCards, updates);
  //   setDataFunctions.listOfSimulatedCards(updatedList);
  // };
  const handleStatusUpdateCharts = async (newData) => {
    console.log('[STATUS_UPDATE_CHARTS] Data:', newData);
    console.log('Card prices retrieved:', newData);
    // const processedPrices = processCardPrices(newData, selectedCollection);
    console.log('Card prices updated:', newData);

    // Filter out cards which are not in the selected collection
    // const filteredCards = newData.data.data.filter((card) => {
    //   const cardIds = selectedCollection?.cards?.map((card) => card.id);
    //   return cardIds?.includes(card.id);
    // });

    // Merge the selectedCollection cards with the filteredCards by adding the latestPrice, lastSavedPrice and priceHistory
    // selectedCollection should receive: price: latestPrice.num, priceHistory: [...priceHistory, latestPrice.num], lastSavedPrice: latestPrice
    // monitoredCards should then be updated with the new values of quantity from the card data in selectedCollection
    // const updatedAllCardPrices = processedPrices.priceArray;
    // const updatedTotalPrice = processedPrices.totalPrice;
    // const filteredCards = processedPrices.filteredCards;
    // console.log('********** [--------------] **********');
    // console.log('********** [FILTERED CARDS] **********', filteredCards);

    // console.log('********** [--------------] **********');
    // console.log('********** [UPDATED PRICES] **********', updatedAllCardPrices);

    // console.log('********** [--------------] **********');
    // console.log('********** [UPDATED TOTAL] **********', updatedTotalPrice);

    // console.log('********** [--------------] **********');

    // Start with the current collection's state
    let updatedCollection = { ...selectedCollection };

    // setTotalPrice(updatedTotalPrice);
    // setAllCardPrices(updatedAllCardPrices);
    // console.log('Updated collection in combined:', updatedCollection);
    // Iterate over the array of processed prices
    // for (const card of filteredCards) {
    //   updatedCollection = await updateOneFromCollection(card);
    // }

    // return updatedCollection;
    // const updatedCollection = await updateCollection({
    //   ...selectedCollection,
    //   cards: filteredCards,
    // });

    console.log('Updated collection in combined:', updatedCollection);
    return updatedCollection;
  };
  const handleReceive = (message) => {
    console.log('Received message:', message);
    setDataFunctions.messageTest(message);
  };

  const handleSimulationPriceResponse = (updates) => {
    console.log('Received scheduled price update:', updates);
    setDataFunctions.simData(updates); // Update with new data
  };

  const handleEventResponse = (newData) => {
    const { message, data } = newData;
    console.log('EVENT_RESPONSE:', message, data);
    setDataFunctions.eventsTriggered(data);
  };

  const handleStatusUpdatePrice = (data) => {
    console.log('STATUS_UPDATE_PRICE:', data);
    setDataFunctions.priceDifference(data);
  };

  const handleStatusUpdateCron = (newData) => {
    const { message, data } = newData;
    console.log('[STATUS_UPDATE_CRON]', message, data);
    setDataFunctions.data(data);
  };

  const handleChartCronResponse = (newData) => {
    const message = newData?.message;
    const data = newData?.data;
    console.log('[handleChartCronResponse]', message, data);
    setDataFunctions.retrievedListOfMonitoredCards(data);
  };

  const handleCronJobResponse = (data) => {
    console.log('Cron job response received:', data);
    // Update state or perform other actions based on the cron job response
  };

  const handleError = (errorData) => {
    console.error('Error received:', errorData);
    setDataFunctions.error(errorData);
  };

  const handleEmittedResponses = (emittedData) => {
    console.log('Emitted responses:', emittedData);
    setDataFunctions.emittedResponses(emittedData);
  };

  const handleCronJobTracker = (cronData) => {
    console.log('Cron job data:', cronData);
    setDataFunctions.cronData(cronData);
  };

  const handleExistingCollectionData = (collectionData) => {
    console.log('Existing collection data:', collectionData);
    setDataFunctions.collectionData(collectionData);
  };

  // const handleExistingChartData = (chartData) => {
  //   console.log('Existing chart data:', chartData);
  //   setDataFunctions.existingChartData(chartData);
  // };

  // const handleChartDatasetsUpdated = (chartUpdate) => {
  //   console.log('Chart datasets updated:', chartUpdate);
  //   setDataFunctions.currentChartData(chartUpdate);
  // };

  const handleCardPricesUpdated = (priceData) => {
    console.log('Card prices retrieved:', priceData);
    // Update listOfMonitoredCards based on the updated card prices
    const currentListOfMonitoredCards =
      generateListOfMonitoredCards(allCollections);
    console.log(
      `[currentListOfMonitoredCards: $${getNewTotalPrice(
        currentListOfMonitoredCards
      )}] | `,
      currentListOfMonitoredCards
    );
    const updatedCardPrices = priceData.data.data;
    // updatedCardPrices.forEach(
    //   (
    //     card // Update the price of each card in the listOfMonitoredCards
    //   ) => {
    //     card.price = currentListOfMonitoredCards.price || card.price;
    //   }
    // );

    setDataFunctions.cardPrices(updatedCardPrices);
    // console.log(
    //   `[updatedCardPrices: $${getNewTotalPrice(updatedCardPrices)}] | `,
    //   updatedCardPrices
    // );
    // console.log(
    //   `[state.cardPrices.data: $${getNewTotalPrice(state.cardPrices.data)}] | `,
    //   state.cardPrices.data
    // );
    const updatedListOfMonitoredCards = updateCardPricesInList(
      currentListOfMonitoredCards,
      updatedCardPrices
    );
    console.log(
      `[updatedListOfMonitoredCards: $${getNewTotalPrice(
        updatedListOfMonitoredCards
      )}] | `,
      updatedListOfMonitoredCards
    );

    // Now update the listOfMonitoredCards in your state
    setDataFunctions.allCardPrices(updatedListOfMonitoredCards);
    const updatedCollectionResult = updateCollection(
      selectedCollection,
      null, // since we're not updating a specific card
      'update', // Assuming 'update' is the operation when prices change
      userId
    );

    if (updatedCollectionResult) {
      // Do something with the updated collection
      console.log('Updated Collection:', updatedCollectionResult);
      // Update your state/context or perform additional actions
    }
    // Additional processing if required
    // ...
  };

  const handleNoPricesChanged = () => {
    console.log('No prices changed');
    // Perform any necessary actions when no prices have changed
  };

  const handleNewCardDataObject = (cardData) => {
    console.log('New card data received:', cardData);
    setDataFunctions.data(cardData);
  };

  const handleFinalUpdateToClient = (finalUpdate) => {
    console.log('Final update to client:', finalUpdate);
    setDataFunctions.finalUpdateData(finalUpdate);
  };

  const handleInitiateScheduleCheckCardPrices = (scheduleData) => {
    console.log('Initiating scheduled check of card prices:', scheduleData);
    // Emit event to server or perform other actions
  };

  const handleInitiateCheckCardPrices = (checkPriceData) => {
    console.log('Initiating check of card prices:', checkPriceData);
    // Emit event to server or perform other actions
  };

  const handleUpdateUserData = (userData) => {
    console.log('Updating user data:', userData);
    // Emit event to server or perform other actions
  };

  const handleUpdateUserCollection = (collectionUpdate) => {
    console.log('Updating user collection:', collectionUpdate);
    // Emit event to server or perform other actions
  };

  const handleUpdateAndSyncUserCollection = (syncData) => {
    console.log('Updating and syncing user collection:', syncData);
    // Emit event to server or perform other actions
  };
  useEffect(() => {
    if (!socket) return;

    const eventHandlers = new Map([
      ['STATUS_UPDATE_CHARTS', handleStatusUpdateCharts],
      ['MESSAGE_TO_CLIENT', handleReceive],
      ['SIMULATION_CRON_PRICE_RESPONSE', handleSimulationPriceResponse],
      ['EVENT_RESPONSE', handleEventResponse],
      ['STATUS_UPDATE_PRICE', handleStatusUpdatePrice],
      ['STATUS_UPDATE_CRON', handleStatusUpdateCron],
      ['CHART_CRON_RESPONSE', handleChartCronResponse],
      ['HANDLE_CRON_JOB_RESPONSE', handleCronJobResponse],
      ['ERROR', handleError],
      ['EMITTED_RESPONSES', handleEmittedResponses],
      ['RESPONSE_CRON_DATA', handleCronJobTracker],
      ['RESPONSE_EXISTING_COLLECTION_DATA', handleExistingCollectionData],
      // ['RESPONSE_EXISTING_CHART_DATA', handleExistingChartData],
      // ['CHART_DATASETS_UPDATED', handleChartDatasetsUpdated],
      ['SEND_PRICING_DATA_TO_CLIENT', handleCardPricesUpdated],
      ['NO_PRICE_CHANGES', handleNoPricesChanged],
      ['SEND_UPDATED_DATA_TO_CLIENT', handleNewCardDataObject],
      ['SEND_FINAL_UPDATE_TO_CLIENT', handleFinalUpdateToClient],
      [
        'INITIATE_SCHEDULE_CHECK_CARD_PRICES',
        handleInitiateScheduleCheckCardPrices,
      ],
      ['INITIATE_HANDLE_CHECK_CARD_PRICES', handleInitiateCheckCardPrices],
      ['INITIATE_UPDATE_USER_DATA', handleUpdateUserData],
      ['INITIATE_UPDATE_USER_COLLECTIONS_SOCKET', handleUpdateUserCollection],
      ['COLLECTION_SYNCED', handleUpdateAndSyncUserCollection],
      // ... any other event handlers
    ]);

    eventHandlers.forEach((handler, event) => {
      // validateData(event, 'event', 'useEffect');
      socket.on(event, handler);
    });

    validateData(eventHandlers, 'eventHandlers', 'useEffect');
    return () => {
      eventHandlers.forEach((_, event) => {
        socket.off(event);
      });
    };
  }, [socket, state, setDataFunctions]);

  // ----------- DATA PROCESSING & HANDLERS -----------

  const handleSocketInteraction = {
    requestData: {
      collection: (userId, selectedCollection) => {
        if (!userId || !selectedCollection) {
          logError(
            'Missing userId or selectedCollection for collection data request'
          );
          return;
        }
        socket.emit('REQUEST_EXISTING_COLLECTION_DATA', {
          userId,
          data: selectedCollection,
        });
      },
      chart: (userId, selectedCollection) => {
        if (!userId)
          return console.error('Missing userId for chart data request.');
        if (!selectedCollection)
          return console.error(
            'Missing selectedCollection for chart data request.'
          );
        if (selectedCollection.chartData === undefined || null) {
          if (selectedCollection.chartData === undefined)
            console.log('chartData is undefined');
          if (selectedCollection.chartData === null)
            console.log('chartData is null');
          return console.error(
            'The selected collections chart data is missing, null or undefined.'
          );
        }

        console.log(
          'Attempting to retrieve chart data',
          selectedCollection?.chartData
        );
        const chartData = selectedCollection?.chartData || {};
        socket.emit('REQUEST_EXISTING_CHART_DATA', {
          data: {
            userId,
            data: chartData,
          },
        });
      },
    },
    sendAction: {
      message: (message) => {
        if (!message) return console.error('Message content is missing.');
        socket.emit('MESSAGE_FROM_CLIENT', { message, data: message });
      },
      stopCronJob: (userId) => {
        if (!userId) return console.error('Missing userId for cron job stop.');
        socket.emit('REQUEST_CRON_STOP', { userId });
      },
      checkAndUpdateCardPrices: (
        userId,
        listOfMonitoredCards
        // retrievedListOfMonitoredCards
      ) => {
        if (!userId)
          return console.error('Missing userId or listOfMonitoredCards.');
        if (!listOfMonitoredCards)
          return console.error('Missing retrievedListOfMonitoredCards.');

        console.log(
          'SENDING CHECK AND UPDATE CARD PRICES',
          listOfMonitoredCards
        );
        const selectedList = listOfMonitoredCards;
        socket.emit('REQUEST_CRON_UPDATED_CARDS_IN_COLLECTION', {
          userId,
          data: {
            selectedList,
          },
        });
      },
      checkPriceUpdates: (
        userId,
        listOfMonitoredCards,
        allCollections,
        cardsWithChangedPrice
      ) => {
        if (!userId)
          return console.log('Missing userId or listOfMonitoredCards.');
        if (!listOfMonitoredCards)
          return console.log('Missing retrievedListOfMonitoredCards.');
        if (!allCollections) return console.log('Missing allCollections.');
        // if (!cardsWithChangedPrice)
        //   return console.log('Missing cardsWithChangedPrice.');

        const selectedList = listOfMonitoredCards;
        socket.emit('REQUEST_PRICES_ACTIVATE_CRON', {
          userId,
          data: {
            userId,
            selectedList,
            allCollections,
            cardsWithChangedPrice,
          },
        });
      },
      triggerCronJob: (userId, listOfMonitoredCards) => {
        if (!userId)
          return console.error('Missing userId for cron job trigger.');

        // Emit the START_CRON_JOB event with userId and listOfMonitoredCards
        socket.emit('START_CRON_JOB', { userId, listOfMonitoredCards });
      },
    },
  };

  const toast = (message, duration = 10000) => {
    console.log(`TOAST: ${message}, Duration: ${duration}`);
  };

  const confirm = (message) => window.confirm(message);

  useEffect(() => {
    if (userId && selectedCollection) {
      handleSocketInteraction.requestData.collection(
        userId,
        selectedCollection
      );
      handleSocketInteraction.requestData.chart(userId, selectedCollection);
      handleSocketInteraction.sendAction.message('Hello from client!');
      // handleSocketInteraction.sendAction.updateCollection();
      // handleSocketInteraction.sendAction.updateChart();
      // handleSocketInteraction.sendAction.checkAndUpdateCardPrices(
      //   userId,
      //   listOfMonitoredCards
      //   // retrieveListOfMonitoredCards()
      // );
    }
  }, [userId, selectedCollection, socket]);
  useEffect(() => {
    // Update the collectionData state when selectedCollection changes
    setDataFunctions.collectionData(selectedCollection);
  }, [selectedCollection]);

  // useEffect(() => {
  //   if (state.allCardPrices) {
  //     console.log('ALL PRICE DATA', state.allCardPrices);
  //     // const oldTotal = getNewTotalPrice(state.cardPrices);
  //     const oldTotal2 = getNewTotalPrice(listOfMonitoredCards);

  //     console.log('OLD TOTAL', oldTotal2);
  //     if (
  //       JSON.stringify(state.allCardPrices) !== JSON.stringify(state.cardPrices)
  //     ) {
  //       console.log('SETTING SELECTED COLLECTION');
  //       const newTotal = getNewTotalPrice(state.allCardPrices);
  //       console.log('NEW TOTAL COMBINED', newTotal);
  //       setAllCollections(state.collectionData);
  //     }
  //   }
  // }, [state.allCardPrices]);

  useEffect(() => {
    if (allCollections) {
      // console.log('allCollections', allCollections);
      // console.log('listOfMonitoredCards', listOfMonitoredCards);

      console.log('ALLL', allCollections);
      if (
        JSON.stringify(allCollections) !==
        JSON.stringify(state.allCollectionData)
      ) {
        setDataFunctions.allCollectionData(allCollections);
      }

      // setDataFunctions.retrievedListOfMonitoredCards(
      //   retrieveListOfMonitoredCards()
      // );
    }
  }, [allCollections]);

  const logError = (message) => console.error(message);

  // ----------- CONTEXT VALUE -----------
  // useEffect(() => {
  //   if (listOfMonitoredCards.length === 0)
  //     console.log('listOfMonitoredCards', listOfMonitoredCards);

  //   setDataFunctions.listOfMonitoredCards({ listOfMonitoredCards });
  //   // handleSocketInteraction.sendAction.checkAndUpdateCardPrices(
  //   //   userId,
  //   //   listOfMonitoredCards
  //   // );
  // }, [listOfMonitoredCards, allCollections]);

  const value = useMemo(
    () => ({
      ...state,
      ...setDataFunctions,
      listOfMonitoredCards,
      confirm,
      setLoader,
      setCronStatus,
      handleCronRequest: handleSocketInteraction.sendAction.triggerCronJob,
      handleSend: handleSocketInteraction.sendAction.message,
      handleRequestCollectionData:
        handleSocketInteraction.requestData.collection,
      // handleRequestChartData: handleSocketInteraction.requestData.chart,
      handleSendAllCardsInCollections:
        handleSocketInteraction.sendAction.checkAndUpdateCardPrices,
      handleRequestCronStop: handleSocketInteraction.sendAction.stopCronJob,
      handlePricesActivateCron:
        handleSocketInteraction.sendAction.checkPriceUpdates,
      handleSocketInteraction,
      socket,
      isDelaying: state.isDelaying,
      isCronJobTriggered: state.isCronJobTriggered,
    }),
    [state, socket]
  );

  // Log combined context value for debugging
  useEffect(() => {
    console.log('COMBINED CONTEXT VALUE:', state);
  }, [state]);

  return (
    <CombinedContext.Provider value={value}>
      {children}
    </CombinedContext.Provider>
  );
};

export const useCombinedContext = () => {
  const context = useContext(CombinedContext);
  if (context === undefined) {
    throw new Error(
      'useCombinedContext must be used within a CombinedProvider'
    );
  }
  return context;
};
