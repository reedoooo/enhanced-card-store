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
  chartData: {},
  existingChartData: {},
  collectionData: {},
  currentChartData: {},
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

function processCardPrices(cardPrices) {
  if (!cardPrices || !cardPrices.data || !Array.isArray(cardPrices.data.data)) {
    console.error('Invalid cardPrices data structure.');
    return;
  }

  const priceArray = [];
  let totalPrice = 0;

  cardPrices.data.data.forEach((card) => {
    const { latestPrice, quantity } = card;

    if (!latestPrice || !quantity) {
      console.error(`Missing price or quantity for card ID: ${card.id}`);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      priceArray.push(latestPrice.num);
      totalPrice += latestPrice.num;
    }
  });

  console.log('Price Array:', priceArray);
  console.log('Total Price:', totalPrice.toFixed(2));

  // Save priceArray and totalPrice as needed
  // For example, you might want to set them to your application's state

  return { priceArray, totalPrice: totalPrice.toFixed(2) };
}

const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

const validateData = (data, eventName, functionName) => {
  const dataType = typeof data;
  console.log(
    `[SUCCESS] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}`
  );
  if (data === null || data === undefined) {
    console.warn(
      `[Warning] Received null or undefined data in ${functionName} triggered by event: ${eventName}`
    );
    return false;
  }
  if (isEmpty(data)) {
    console.error(
      `[Error] Received empty data object or array in ${functionName} triggered by event: ${eventName}`
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
    updateOneFromCollection,
    processAndUpdateCardPrices,
    setAllCardPrices,
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
  const listOfMonitoredCards = useMemo(() => {
    const cards = allCollections?.flatMap((collection) => collection?.cards);
    if (!cards) return [];
    const uniqueCards = Array.from(new Set(cards.map((card) => card?.id))).map(
      (id) => cards?.find((card) => card?.id === id)
    );
    let updatedPrices = null;
    if (state.cardPrices?.updatedPrices) {
      updatedPrices = state.cardPrices?.updatedPrices;
    }

    if (uniqueCards && uniqueCards.length) {
      return uniqueCards?.map((card) => {
        const updatedPriceInfo = updatedPrices?.[card?.id];
        return {
          _id: card?._id, // Assuming each card has a unique identifier
          id: card?.id,
          tag: 'monitored',
          name: card?.name,
          quantity: card?.quantity,
          latestPrice: {
            num: updatedPriceInfo ? updatedPriceInfo.num : card?.price,
            timestamp: updatedPriceInfo
              ? updatedPriceInfo.timestamp
              : new Date().toISOString(),
            // Add _id field for latestPrice if available
          },
          lastSavedPrice: {
            num: card?.price,
            timestamp: new Date().toISOString(), // Modify this based on where you get the last saved timestamp
            // Add _id field for lastSavedPrice if available
          },
          priceHistory: card?.priceHistory || [], // Assuming priceHistory is part of the original card object
          __v: card?.__v, // Version key, if applicable
        };
      });
    }
  }, [allCollections, state.cardPrices?.updatedPrices]);

  // ----------- SOCKET EVENT HANDLERS -----------

  const safeEmit = useCallback(
    (event, data) => {
      try {
        if (!validateData(data, event, 'safeEmit')) {
          throw new Error(`Invalid data emitted for event: ${event}`);
        }
        if (socket) {
          socket.emit(event, data);
          console.log(`[Info] Emitted event: ${event}`);
        } else {
          console.warn('Socket is not connected. Cannot emit event:', event);
        }
      } catch (error) {
        console.error(`[Error] Failed to emit event: ${event}`, error);
        setDataFunctions.error({
          message: error.message,
          source: 'safeEmit',
        });
      }
    },
    [socket]
  );

  const safeOn = useCallback(
    (event, handler) => {
      const wrapper = (data) => {
        try {
          if (!validateData(data, event, handler.name)) {
            throw new Error(`Invalid data received for event: ${event}`);
          } // Add this line to validate the data received
          // console.log(`[Info] Handling event: ${event}`);
          handler(data);
        } catch (error) {
          console.error(`[Error] Failed to handle event: ${event}`, error);
          setDataFunctions.error({ message: error.message, source: event });
        }
      };

      socket.on(event, wrapper); // Add this line to register the event listener

      return () => {
        socket.off(event, wrapper); // Add this line to unregister the event listener when the component unmounts
      };
    },
    [socket]
  );

  const mergeUpdates = (currentArray, updates) => {
    const updatedArray = [...currentArray];
    updates.forEach((update) => {
      const index = updatedArray.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        updatedArray[index] = { ...updatedArray[index], ...update };
      } else {
        updatedArray.push(update);
      }
    });
    return updatedArray;
  };

  const handleStatusUpdateCharts = (newData) => {
    const { updates } = newData.data;
    console.log('[STATUS_UPDATE_CHARTS] Data:', updates);
    const updatedList = mergeUpdates(state.listOfSimulatedCards, updates);
    setDataFunctions.listOfSimulatedCards(updatedList);
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

  const handleExistingChartData = (chartData) => {
    console.log('Existing chart data:', chartData);
    setDataFunctions.existingChartData(chartData);
  };

  const handleChartDatasetsUpdated = (chartUpdate) => {
    console.log('Chart datasets updated:', chartUpdate);
    setDataFunctions.currentChartData(chartUpdate);
  };

  const handleCardPricesUpdated = async (priceData) => {
    console.log('Card prices retrieved:', priceData);
    const processedPrices = processCardPrices(priceData);
    console.log('Card prices updated:', processedPrices);

    // Start with the current collection's state
    let updatedCollection = { ...selectedCollection };

    // Iterate over the array of processed prices
    for (const card of priceData.data.data) {
      // Update each card within the collection
      updatedCollection = await updateOneFromCollection(card, 'update');
    }

    console.log('Updated collection in combined:', updatedCollection);
    return updatedCollection;
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
      ['RESPONSE_EXISTING_CHART_DATA', handleExistingChartData],
      ['CHART_DATASETS_UPDATED', handleChartDatasetsUpdated],
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
      socket.on(event, handler);
    });

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
      handleSocketInteraction.sendAction.checkAndUpdateCardPrices(
        userId,
        listOfMonitoredCards
        // retrieveListOfMonitoredCards()
      );
    }
  }, [userId, selectedCollection, socket]);
  useEffect(() => {
    // Update the collectionData state when selectedCollection changes
    setDataFunctions.collectionData(selectedCollection);
  }, [selectedCollection]);

  useEffect(() => {
    if (allCollections) {
      // console.log('allCollections', allCollections);
      // console.log('listOfMonitoredCards', listOfMonitoredCards);

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
  //   if (listOfMonitoredCards.length)
  //     console.log('listOfMonitoredCards', listOfMonitoredCards);

  //   handleSocketInteraction.sendAction.triggerCronJob(
  //     userId,
  //     listOfMonitoredCards
  //   );
  // }, [listOfMonitoredCards]);

  const value = useMemo(
    () => ({
      ...state,
      ...setDataFunctions,
      listOfMonitoredCards,
      // emittedResponses: state.emittedResponses,
      // messageTest: state.messageTest,
      toast,
      confirm,
      setLoader,
      setCronStatus,
      handleCronRequest: handleSocketInteraction.sendAction.triggerCronJob, // Ensure it's provided here
      handleSend: handleSocketInteraction.sendAction.message,
      handleRequestCollectionData:
        handleSocketInteraction.requestData.collection,
      handleRequestChartData: handleSocketInteraction.requestData.chart, // Assuming this is the correct mapping
      handleSendAllCardsInCollections:
        handleSocketInteraction.sendAction.checkAndUpdateCardPrices, // Ensure it's provided here
      handleRequestCronStop: handleSocketInteraction.sendAction.stopCronJob, // Ensure it's provided here
      // handleRetreiveListOfMonitoredCards: retrieveListOfMonitoredCards,

      // MAIN LOGGER
      handlePricesActivateCron:
        handleSocketInteraction.sendAction.checkPriceUpdates,
      handleSocketInteraction,
      setDataFunctions,
      socket,
      isDelaying: state.isDelaying,
      isCronJobTriggered: state.isCronJobTriggered,
      // setDataFunctions,
    }),
    [state, socket]
  );

  useEffect(() => {
    console.log('COMBINED CONTEXT VALUE:', state);
  }, [
    state.allData,
    state.data,
    state.messageTest,
    state.existingChartData,
    state.collectionData,
    state.dcurrentChartData,
    state.cronData,
    state.finalUpdateData,
    state.cardPrices,
    state.eventsTriggered,
    state.cardsWithChangedPrice,
    state.previousDayTotalPrice,
    state.dailyPriceChange,
    state.priceDifference,
    state.allCardPrices,
    state.handleCardPricesUpdated,
    state.retrievedListOfMonitoredCards,
  ]);

  const dataValues = {
    state: state,
    allData: value.allData,
    eventsTriggered: value.eventsTriggered,
    data: value.data,
    messageTest: value.messageTest,
    finalUpdateData: value.finalUpdateData,
    chartData: value.chartData,
    emittedResponses: value.emittedResponses,
    currentChartData: value.currentChartData,
    existingChartData: value.existingChartData,
    collectionData: value.collectionData,
    allCollectionData: value.allCollectionData,
    allCollectionsUpdated: value.allCollectionsUpdated,
    cronData: value.cronData,
    cardPrices: value.cardPrices,
    retrievedListOfMonitoredCards: value.retrievedListOfMonitoredCards,
    listOfMonitoredCards: value.listOfMonitoredCards,
    error: value.error,
  };

  // useEffect(() => {
  //   console.log('COMBINED CONTEXT VALUE:', dataValues);
  // }, [
  //   dataValues.cronData,
  //   dataValues.chartData,
  //   dataValues.collectionData,
  //   dataValues.messageTest,
  //   dataValues.emittedResponses,
  //   dataValues.retrievedListOfMonitoredCards,
  //   dataValues.emittedResponses,
  //   dataValues.eventsTriggered,
  // ]);

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
