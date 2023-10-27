import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useSocket } from './SocketProvider';
import { CollectionContext } from './CollectionContext/CollectionContext';

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
  allCollectionData: {},
  cronData: {},
  finalUpdateData: {},
  cardPrices: {},
  previousDayTotalPrice: 0,
  dailyPriceChange: 0,
  priceDifference: 0,
  retrievedListOfMonitoredCards: {},
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

const isEmpty = (obj) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

const validateData = (data, eventName, functionName) => {
  const dataType = typeof data;
  console.log(
    `[Info] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}`
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
  const { userCookie } = useCookies(['userCookie']);
  const [state, setState] = useState(initialState);
  const userId = userCookie?.userID;
  const {
    selectedCollection,
    allCollections,
    setAllCollections,
    updatedPricesFromCombinedContext,
    setUpdatedPricesFromCombinedContext,
  } = useContext(CollectionContext);
  const socket = useSocket();
  // const createStateUpdaterFunction = (key) =>
  //   useCallback(
  //     (data) =>
  //       setState((prev) => ({ ...prev, [key]: { ...prev[key], ...data } })),
  //     []
  //   );
  const createStateUpdaterFunction = (key) =>
    useCallback((data) => setState((prev) => ({ ...prev, [key]: data })), []);

  // ----------- STATE UPDATER FUNCTIONS -----------

  // State updater functions generated using the higher-order function
  const setDataFunctions = {
    data: createStateUpdaterFunction('chartData'),
    messageTest: createStateUpdaterFunction('messageTest'),
    finalUpdateData: createStateUpdaterFunction('finalUpdateData'),
    chartData: createStateUpdaterFunction('chartData'),
    existingChartData: createStateUpdaterFunction('existingChartData'),
    // cardStats: createStateUpdaterFunction('cardStats'),
    cardPrices: createStateUpdaterFunction('cardPrices'),
    retrievedListOfMonitoredCards: createStateUpdaterFunction(
      'retrievedListOfMonitoredCards'
    ),
    // allData: createStateUpdaterFunction('allData'),
    cronData: createStateUpdaterFunction('cronData'),
    error: createStateUpdaterFunction('error'),
    // updatedChartData: createStateUpdaterFunction('updatedChartData'),
    currentChartData: createStateUpdaterFunction('currentChartData'),
    checkAndUpdateCardPrice: createStateUpdaterFunction(
      'checkAndUpdateCardPrice'
    ),
    collectionData: createStateUpdaterFunction('collectionData'),
    allCollectionData: createStateUpdaterFunction('allCollectionData'),
    emittedResponses: createStateUpdaterFunction('emittedResponses'),
    // allCollectionsUpdated: createStateUpdaterFunction('allCollectionsUpdated'),
    // updatedCollectionData: createStateUpdaterFunction('updatedCollectionData'),
    // allCollectionsUpdated: createStateUpdaterFunction('allCollectionsUpdated'),
    // allUpdatedPrices: createStateUpdaterFunction('allUpdatedPrices'),
    // allItemTypeData: createStateUpdaterFunction('allItemTypeData'),
    // allItemData: createStateUpdaterFunction('allItemData'),
    // allItemData2: createStateUpdaterFunction('allItemData2'),
    // cardStatsArray: createStateUpdaterFunction('cardStatsArray'),
    isDelaying: createStateUpdaterFunction('isDelaying'),
    isCronJobTriggered: createStateUpdaterFunction('isCronJobTriggered'),
  };

  // setLoader with added error handling and documentation
  const setLoader = (isLoading) => {
    if (typeof isLoading !== 'boolean') {
      console.error('Invalid argument type for setLoader: Expected boolean');
      return;
    }
    setState((prev) => ({ ...prev, isLoading }));
  };
  // setCronStatus with added error handling and documentation
  const setCronStatus = (cronActive) => {
    if (typeof cronActive !== 'boolean') {
      console.error(
        'Invalid argument type for setCronStatus: Expected boolean'
      );
      return;
    }
    setState((prev) => ({ ...prev, cronActive }));
  };
  // ----------- XXX -----------

  const listOfMonitoredCards = useMemo(() => {
    const cards = allCollections?.flatMap((collection) => collection?.cards);
    // console.log('cards', cards);
    if (!cards) return [];
    const uniqueCards = Array.from(new Set(cards.map((card) => card?.id))).map(
      (id) => cards?.find((card) => card?.id === id)
    );
    let updatedPrices = null;
    if (state.cardPrices?.updatedPrices) {
      updatedPrices = state.cardPrices?.updatedPrices;
    }

    if (uniqueCards && uniqueCards.length) {
      return uniqueCards?.map((card) => ({
        name: card?.name,
        id: card?.id,
        previousPrice: card?.price,
        updatedPrice: updatedPrices?.[card?.id] || card?.price,
      }));
    }
  }, [allCollections]);

  const retrieveListOfMonitoredCards = useCallback(() => {
    const cards = allCollections?.flatMap((collection) => collection?.cards);
    // console.log('cards', cards);
    const uniqueCards = Array.from(new Set(cards.map((card) => card?.id))).map(
      (id) => cards.find((card) => card?.id === id)
    );
    let updatedPrices = null;
    if (state.cardPrices?.updatedPrices) {
      updatedPrices = state.cardPrices?.updatedPrices;
    }

    if (uniqueCards && uniqueCards.length) {
      return uniqueCards?.map((card) => ({
        name: card?.name,
        id: card?.id,
        previousPrice: card?.price,
        updatedPrice: updatedPrices?.[card?.id] || card?.price,
      }));
    }
  }, [allCollections]);

  // ----------- SOCKET EVENT HANDLERS -----------
  const safeEmit = useCallback(
    (event, data) => {
      try {
        if (!validateData(data, event, 'safeEmit')) {
          throw new Error(`Invalid data emitted for event: ${event}`);
        }
        if (socket) {
          socket.emit(event, data);
        } else {
          console.warn('Socket is not connected. Cannot emit event:', event);
        }
      } catch (error) {
        console.error(`[Error] Failed to emit event: ${event}`, error);
        setDataFunctions.error({ message: error.message, source: 'safeEmit' });
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
          }
          handler(data);
        } catch (error) {
          console.error(`[Error] Failed to handle event: ${event}`, error);
          setDataFunctions.error({ message: error.message, source: event });
        }
      };
      if (socket) {
        socket.on(event, wrapper);
      } else {
        console.warn(
          'Socket is not connected. Cannot subscribe to event:',
          event
        );
      }
      return () => {
        if (socket) {
          socket.off(event, wrapper);
        }
      };
    },
    [socket]
  );
  useEffect(() => {
    if (!socket) return;

    const handleReceive = (message) => {
      console.log('Received message:', message);
      setDataFunctions.messageTest(message);
    };

    const handleCronJobResponse = (message, collections) => {
      console.log('MESSAGE: CRON JOB COMPLETE ==========]>:', message);
      console.log('COLLECTIONS: CRON JOB COMPLETE ==========]>:', collections);
      setDataFunctions.checkAndUpdateCardPrice({ collections });
    };

    const handleError = (errorData) => {
      console.error('Server Error:', errorData.message);
      console.error('Error Source:', errorData.source);
      if (errorData.detail) {
        console.error('Error Detail:', errorData.detail);
      }
      setDataFunctions.error(errorData);
    };

    const handleEmittedResponses = (emittedResponses) => {
      setDataFunctions.emittedResponses([
        ...state.emittedResponses,
        emittedResponses,
      ]);
    };

    const handleCronJobTracker = (message, existingCronData) => {
      console.log('[AUTOMATED MESSAGE FROM SERVER]', message);
      const data = existingCronData;
      const filteredRuns = filterDuplicatePrices(data);
      const runs = filteredRuns;
      setDataFunctions.cronData({ runs });
    };

    const handleExistingCollectionData = (userId, selectedCollection) => {
      console.log('Received existing collection data:', selectedCollection);
      setDataFunctions.collectionData({ selectedCollection });
    };

    const handleExistingChartData = (data) => {
      if (!data || Array.isArray(data?.existingChartData)) {
        console.error(
          'Unexpected data structure received for chart data update:',
          data
        );
        return;
      }
      const { existingChartData } = data;
      setDataFunctions.existingChartData({
        existingChartData: existingChartData,
      });
    };

    const handleChartDatasetsUpdated = ({
      message,
      collectionId,
      currentChartDatasets,
    }) => {
      if (message) {
        console.log('MESSAGE: HANDLING CHART DATA UPDATED ==========]>:', {
          message,
        });
      }
      const currentChartData = {
        [collectionId]: currentChartDatasets,
      };
      setDataFunctions.currentChartData(currentChartData);
    };

    const handleCardPricesUpdated = ({ message, data }) => {
      if (message) {
        console.log('MESSAGE: HANDLING CARD PRICES UPDATED ==========]>:', {
          message,
        });
      }

      const { pricingData } = data;

      if (
        !validateData(
          pricingData,
          'SEND_PRICING_DATA_TO_CLIENT',
          'handleCardPricesUpdated'
        )
      )
        return;

      if (
        !pricingData ||
        !pricingData.updatedPrices ||
        !pricingData.previousPrices ||
        !pricingData.priceDifferences
      ) {
        console.error(
          'Unexpected data structure received for card prices update:',
          pricingData
        );
        return;
      }

      const { updatedPrices, previousPrices, priceDifferences } = pricingData;

      const allPrices = {
        ...updatedPrices,
        ...previousPrices,
        updatedPrices,
        previousPrices,
        priceDifferences,
      };

      setUpdatedPricesFromCombinedContext(allPrices);
      setDataFunctions.cardPrices({ allPrices }); // Here you are passing an object with 'allPrices' property
    };

    const handleNoPricesChanged = ({ message }) => {
      console.log('MESSAGE: NO PRICES CHANGED ==========]>:', {
        message,
      });
      // setUpdatedPricesFromCombinedContext(updatedData);
    };

    const handleNewCardDataObject = ({ message, updatedData }) => {
      // setUpdatedPricesFromCombinedContext(updatedData);
      console.log('MESSAGE: NEW CARD DATA OBJECT ==========]>:', {
        message,
      });
      setDataFunctions.data(updatedData);
    };

    const handleFinalUpdateToClient = ({ userId, message, updatedData }) => {
      console.log('MESSAGE: FINAL UPDATE TO CLIENT ==========]>:', {
        message,
      });
      console.log('UPDATED DATA: FINAL UPDATE TO CLIENT ==========]>:', {
        updatedData,
      });
      // setUpdatedPricesFromCombinedContext(updatedData);
      setDataFunctions.finalUpdateData(updatedData);
    };
    const handleInitiateScheduleCheckCardPrices = ({ data }) => {
      safeEmit('INITIATE_CHECK_CARD_PRICES', {
        userId: data.userId,
        selectedList: data.selectedList,
      });
    };

    const handleInitiateCheckCardPrices = ({ data }) => {
      safeEmit('HANDLE_CHECK_CARD_PRICES', {
        userId: data.userId,
        selectedList: data.selectedList,
      });
    };

    const handleUpdateUserData = ({ message, data }) => {
      console.log('MESSAGE: INITIATING UPDATE OF USER DATA ==========]>:', {
        message,
      });
      safeEmit('HANDLE_UPDATE_USER_DATA', {
        userId: data.userId,
        pricingData: data.pricingData,
      });
    };
    const handleUpdateUserCollection = ({ data }) => {
      safeEmit('HANDLE_UPDATE_USER_COLLECTION', {
        userId: data.userId,
        updatedData: data.updatedUserData,
      });
    };

    const handleUpdateAndSyncUserCollection = ({ data }) => {
      safeEmit('HANDLE_UPDATE_AND_SYNC_COLLECTION', {
        userId: data.userId,
        collectionId: data.collectionId,
        body: data.body,
      });
    };
    // const handleUpdateUserCollection = ({ userId, updatedData }) => {
    //   safeEmit('HANDLE_UPDATE_USER_COLLECTION', { userId, updatedData });
    // };
    // const handleUpdateAndSyncUserCollection = ({
    //   userId,
    //   collectionId,
    //   body,
    // }) => {
    //   safeEmit('HANDLE_UPDATE_AND_SYNC_COLLECTION', {
    //     userId,
    //     collectionId,
    //     body,
    //   });
    // };

    // handleCheckCardPrices(userId, selectedList) {
    //   socket.emit('HANDLE_CHECK_CARD_PRICES', { userId, selectedList });
    // },
    // handleUpdateUserData(userId, pricingData) {
    //   socket.emit('HANDLE_UPDATE_USER_DATA', { userId, pricingData });
    // },
    // handleUpdateUserCollection(userId, updatedData) {
    //   socket.emit('HANDLE_UPDATE_USER_COLLECTION', { userId, updatedData });
    // },
    // handleUpdateAndSyncCollection(userId, collectionId, body) {
    //   socket.emit('HANDLE_UPDATE_AND_SYNC_COLLECTION', { userId, collectionId, body });
    // },
    const unsubscribeFunctions = [
      ['MESSAGE_TO_CLIENT', handleReceive],
      ['RESPONSE_CRON_UPDATED_ALLCOLLECTIONS', handleCronJobResponse],
      ['ERROR', handleError],
      ['EMITTED_RESPONSES', handleEmittedResponses],
      ['RESPONSE_CRON_DATA', handleCronJobTracker],
      ['RESPONSE_EXISTING_COLLECTION_DATA', handleExistingCollectionData],
      ['RESPONSE_EXISTING_CHART_DATA', handleExistingChartData],
      ['SEND_PRICING_DATA_TO_CLIENT', handleCardPricesUpdated],
      ['SEND_UPDATED_DATA_TO_CLIENT', handleNewCardDataObject],
      ['SEND_FINAL_UPDATE_TO_CLIENT', handleFinalUpdateToClient],
      ['CHART_DATASETS_UPDATED', handleChartDatasetsUpdated],
      [
        'INITIATE_SCHEDULE_CHECK_CARD_PRICES',
        handleInitiateScheduleCheckCardPrices,
      ],
      ['INITIATE_HANDLE_CHECK_CARD_PRICES', handleInitiateCheckCardPrices],
      ['INITIATE_UPDATE_USER_DATA', handleUpdateUserData],
      // ['INITIATE_UPDATE_USER_COLLECTION', handleUpdateUserCollection],
      ['INITIATE_UPDATE_USER_COLLECTIONS_SOCKET', handleUpdateUserCollection],
      ['NO_PRICE_CHANGES', handleNoPricesChanged],
      ['COLLECTION_SYNCED', handleUpdateAndSyncUserCollection],
      ['CRON_JOB_TRIGGERED', () => setDataFunctions.isCronJobTriggered(true)],
      ['CRON_JOB_COMPLETED', () => setDataFunctions.isCronJobTriggered(false)],

      // ... (other event subscriptions)
    ].map(([event, handler]) => safeOn(event, handler));
    return () => unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
  }, [
    socket,
    safeEmit,
    safeOn,
    setDataFunctions.isCronJobTriggered,
    setUpdatedPricesFromCombinedContext,
  ]);

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
          selectedCollection: selectedCollection,
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
            chartData: chartData,
          },
        });
      },
    },
    sendAction: {
      message: (message) => {
        if (!message) return console.error('Message content is missing.');
        socket.emit('MESSAGE_FROM_CLIENT', { message });
      },
      stopCronJob: (userId) => {
        if (!userId) return console.error('Missing userId for cron job stop.');
        socket.emit('REQUEST_CRON_STOP', { userId });
      },
      checkAndUpdateCardPrices: (
        userId,
        listOfMonitoredCards,
        retrievedListOfMonitoredCards
      ) => {
        if (!userId)
          return console.error('Missing userId or listOfMonitoredCards.');
        if (!retrievedListOfMonitoredCards || !listOfMonitoredCards)
          return console.error('Missing retrievedListOfMonitoredCards.');

        const selectedList = listOfMonitoredCards
          ? listOfMonitoredCards
          : retrievedListOfMonitoredCards;
        socket.emit('REQUEST_CRON_UPDATED_CARDS_IN_COLLECTION', {
          data: { userId, selectedList },
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
        listOfMonitoredCards,
        retrieveListOfMonitoredCards()
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

      setDataFunctions.retrievedListOfMonitoredCards(
        retrieveListOfMonitoredCards()
      );
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
      handleRetreiveListOfMonitoredCards: retrieveListOfMonitoredCards,
      handleSocketInteraction,
      setDataFunctions,
      socket,
      isDelaying: state.isDelaying,
      isCronJobTriggered: state.isCronJobTriggered,
      // setDataFunctions,
    }),
    [state, socket]
  );

  const dataValues = {
    state: state,
    allData: value.allData,
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

  useEffect(() => {
    console.log('COMBINED CONTEXT VALUE:', dataValues);
  }, [
    dataValues.cronData,
    dataValues.chartData,
    dataValues.collectionData,
    dataValues.messageTest,
  ]);

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
