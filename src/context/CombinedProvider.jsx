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
  chartData: {},
  existingChartData: {},
  collectionData: {},
  currentChartData: {},
  allCollectionsUpdated: {},
  allCollectionData: {},
  cronData: {},
  cardPrices: {},
  previousDayTotalPrice: 0,
  dailyPriceChange: 0,
  priceDifference: 0,
  retrievedListOfMonitoredCards: {},
  isLoading: false,
  cronTriggerTimestamps: [],
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

  return data.runs.filter((run) => {
    if (
      !run.valuesUpdated ||
      !run.valuesUpdated.updatedPrices ||
      Object.keys(run.valuesUpdated.updatedPrices).length === 0
    ) {
      // Remove the item if there's no updatedPrices or it's empty
      return false;
    }

    let isDuplicate = false;
    for (const id in run.valuesUpdated.updatedPrices) {
      const item = run.valuesUpdated.updatedPrices[id];
      const key = `${id}-${item.previousPrice}-${item.updatedPrice}`;

      if (seen[key]) {
        isDuplicate = true;
        break;
      }
      seen[key] = true;
    }

    return !isDuplicate;
  });
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

  // ----------- STATE UPDATER FUNCTIONS -----------
  const setDataFunctions = {
    data: useCallback(
      (data) => setState((prev) => ({ ...prev, chartData: data })),
      []
    ),
    chartData: useCallback(
      (data) => setState((prev) => ({ ...prev, chartData: data })),
      []
    ),
    existingChartData: useCallback(
      (data) => setState((prev) => ({ ...prev, existingChartData: data })),
      []
    ),
    // cardStats: useCallback(
    //   (data) => setState((prev) => ({ ...prev, cardStats: data })),
    //   []
    // ),
    cardPrices: useCallback(
      (data) => setState((prev) => ({ ...prev, cardPrices: data })),
      []
    ),
    retrievedListOfMonitoredCards: useCallback(
      (data) =>
        setState((prev) => ({ ...prev, retrievedListOfMonitoredCards: data })),
      []
    ),
    // allData: useCallback(
    //   (data) => setState((prev) => ({ ...prev, allData: data })),
    //   []
    // ),
    cronData: useCallback(
      (data) => setState((prev) => ({ ...prev, cronData: data })),
      []
    ),
    error: useCallback(
      (data) => setState((prev) => ({ ...prev, error: data })),
      []
    ),
    // updatedChartData: useCallback(
    //   (data) =>
    //     setState((prev) => ({
    //       ...prev,
    //       updatedChartData: data,
    //       // allUpdatedPrices2: data,
    //     })),
    //   []
    // ),
    currentChartData: useCallback(
      (data) => setState((prev) => ({ ...prev, currentChartData: data })),
      []
    ),
    checkAndUpdateCardPrice: useCallback(
      (data) =>
        setState((prev) =>
          // { ...prev, updatedCollectionsData: data },
          ({ ...prev, allCollectionsUpdated: data })
        ),
      []
    ),
    collectionData: useCallback(
      (data) => setState((prev) => ({ ...prev, collectionData: data })),
      []
    ),
    allCollectionData: useCallback(
      (data) => setState((prev) => ({ ...prev, allCollectionData: data })),
      []
    ),
    // updatedCollectionData: useCallback(
    //   (data) => setState((prev) => ({ ...prev, updatedCollectionData: data })),
    //   []
    // ),
  };

  const setLoader = (isLoading) => setState((prev) => ({ ...prev, isLoading }));
  const setCronStatus = (cronActive) =>
    setState((prev) => ({ ...prev, cronActive }));
  // useEffect(() => {
  //   // 3. Modify the state when the selectedCollection changes
  //   if (selectedCollection) {
  //     setState((prev) => ({ ...prev, collectionData: selectedCollection }));
  //   }
  // }, [selectedCollection]);
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

  useEffect(() => {
    if (!socket) return;

    const handleReceive = (message) => {
      console.log('Received message:', message);
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

    const handleCronJobTracker = (message, existingCronData) => {
      console.log('Automated Message from Server:', message);
      const data = existingCronData;
      const filteredRuns = filterDuplicatePrices(data);
      setDataFunctions.cronData({ ...data, runs: filteredRuns });
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
      setDataFunctions.existingChartData({ existingChartData });
    };

    const handleChartDatasetsUpdated = ({
      message,
      collectionId,
      currentChartDatasets,
    }) => {
      const currentChartData = {
        [collectionId]: currentChartDatasets,
      };
      setDataFunctions.currentChartData(currentChartData);
    };

    const handleCardPricesUpdated = ({ message, pricingData }) => {
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
        nestedUpdatedPrices: updatedPrices,
        nestedPreviousPrices: previousPrices,
        priceDifferences,
      };

      setUpdatedPricesFromCombinedContext(allPrices);
      setDataFunctions.cardPrices({ allPrices });
    };

    const handleNewCardDataObject = ({ message, updatedData }) => {
      // setUpdatedPricesFromCombinedContext(updatedData);

      setDataFunctions.data(updatedData);
    };

    // Socket event registrations
    // 2. Handle the initiation of scheduleCheckCardPrices
    socket.on('INITIATE_SCHEDULE_CHECK_CARD_PRICES', (data) => {
      console.log('Received INITIATE_SCHEDULE_CHECK_CARD_PRICES');
      socket.emit('INITIATE_CHECK_CARD_PRICES', data);
    });

    // 4. Handle the initiation of checkCardPrices and its outcomes
    socket.on('INITIATE_HANDLE_CHECK_CARD_PRICES', (data) => {
      console.log('Received INITIATE_HANDLE_CHECK_CARD_PRICES');
      // socket.emit('SEND_PRICING_DATA_TO_CLIENT', data);
      socket.emit('HANDLE_CHECK_CARD_PRICES', data);
    });

    // 6. Handle updating user data based on new pricing data
    socket.on(
      'INITIATE_UPDATE_USER_DATA',
      ({ userId, pricingData, message }) => {
        console.log('Received INITIATE_UPDATE_USER_DATA message', message);
        socket.emit('HANDLE_UPDATE_USER_DATA', {
          userId,
          pricingData,
          body: state?.collectionData,
        });
      }
    );

    socket.on(
      'INITIATE_UPDATE_USER_COLLECTION',
      ({ userId, updatedData, body }) => {
        console.log('Received INITIATE_UPDATE_USER_COLLECTION', updatedData);
        socket.emit('HANDLE_UPDATE_USER_COLLECTION', {
          userId,
          pricingData: updatedData, // Here's the correction
          body: selectedCollection, // You can replace this if you have another variable storing the selected collection
        });
      }
    );
    socket.on('MESSAGE_TO_CLIENT', handleReceive);
    socket.on('RESPONSE_EXISTING_CHART_DATA', handleExistingChartData);
    socket.on('RESPONSE_CRON_DATA', handleCronJobTracker);
    socket.on(
      'RESPONSE_EXISTING_COLLECTION_DATA',
      handleExistingCollectionData
    );
    socket.on('SEND_PRICING_DATA_TO_CLIENT', handleCardPricesUpdated);
    socket.on('SEND_UPDATED_DATA_TO_CLIENT', handleNewCardDataObject);
    socket.on('CHART_DATASETS_UPDATED', handleChartDatasetsUpdated);
    socket.on('ERROR', handleError);
    socket.on('RESPONSE_CRON_UPDATED_ALLCOLLECTIONS', handleCronJobResponse);

    return () => {
      socket.off('MESSAGE_TO_CLIENT', handleReceive);
      socket.off('RESPONSE_EXISTING_CHART_DATA', handleExistingChartData);
      socket.off('RESPONSE_CRON_DATA', handleCronJobTracker);
      socket.off(
        'RESPONSE_EXISTING_COLLECTION_DATA',
        handleExistingCollectionData
      );
      socket.off('SEND_PRICING_DATA_TO_CLIENT', handleCardPricesUpdated);
      socket.off('RESPONSE_CRON_UPDATED_ALLCOLLECTIONS', handleCronJobResponse);
      socket.off('SEND_UPDATED_DATA_TO_CLIENT', handleNewCardDataObject);
      socket.off('CHART_DATASETS_UPDATED', handleChartDatasetsUpdated);
      socket.off('ERROR', handleError);
    };
  }, [socket]);

  // ----------- DATA PROCESSING & HANDLERS -----------

  const handleSocketInteraction = {
    requestData: {
      collection: (userId, selectedCollection) => {
        if (!userId || !selectedCollection)
          return console.error('Missing userId or selectedCollection.');
        // socket.emit('REQUEST_EXISTING_COLLECTION_DATA', userId);
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
      // allData: state.allData,
      // collectionData: state.collectionData,
      listOfMonitoredCards,
      // retrievedListOfMonitoredCards: state.retrievedListOfMonitoredCards,
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
    }),
    [state, socket]
  );

  const dataValues = {
    // value: {
    state: state,
    allData: value.allData,
    data: value.data,
    chartData: value.chartData,
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
    // isLoading: value.isLoading,
    // cronTriggerTimestamps: value.cronTriggerTimestamps,
    // error: value.error,
    // isDelaying: value.isDelaying,
    // isCronJobTriggered: value.isCronJobTriggered,
    // },
  };

  useEffect(() => {
    console.log('COMBINED CONTEXT VALUE:', dataValues);
  }, [dataValues.cronData, dataValues.chartData, dataValues.collectionData]);

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
