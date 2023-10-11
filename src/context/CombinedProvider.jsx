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
  collectionData: {},
  allCollectionsUpdated: {},
  allCollectionData: {},
  cronData: {},
  cardPrices: {},
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

export const CombinedProvider = ({ children }) => {
  const { userCookie } = useCookies(['userCookie']);
  const [state, setState] = useState(initialState);
  const userId = userCookie?.userID;
  const { selectedCollection, allCollections, setAllCollections } =
    useContext(CollectionContext);
  const socket = useSocket();

  // ----------- STATE UPDATER FUNCTIONS -----------
  const setDataFunctions = {
    chartData: useCallback(
      (data) => setState((prev) => ({ ...prev, chartData: data })),
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
    const cards = allCollections.flatMap((collection) => collection.cards);
    const uniqueCards = Array.from(new Set(cards.map((card) => card.id))).map(
      (id) => cards.find((card) => card.id === id)
    );

    return uniqueCards.map((card) => ({
      name: card.name,
      id: card.id,
      previousPrice: card.card_prices[0]?.tcgplayer_price,
      updatedPrice: card.card_prices[0]?.tcgplayer_price, // Initialize with the current price
    }));
  }, [allCollections]);

  const retrieveListOfMonitoredCards = useCallback(() => {
    const cards = allCollections.flatMap((collection) => collection.cards);
    const uniqueCards = Array.from(new Set(cards.map((card) => card.id))).map(
      (id) => cards.find((card) => card.id === id)
    );

    return uniqueCards.map((card) => ({
      name: card.name,
      id: card.id,
      previousPrice: card.card_prices[0]?.tcgplayer_price,
      updatedPrice: card.card_prices[0]?.tcgplayer_price, // Initialize with the current price
    }));
  }, [allCollections]);

  // ----------- SOCKET EVENT HANDLERS -----------

  useEffect(() => {
    if (!socket) return;

    const handleReceive = (message) => {
      console.log('Received message:', message);
    };

    // const handleAllDataItemsReceived = (data) => {
    //   console.log('Received all data items:', data);
    //   setDataFunctions.cronData(data);
    // };

    const handleCronJobResponse = (data) => {
      console.log('Cron job triggered:', data);

      // Destructure the data
      const { pricingData, collections } = data;

      setDataFunctions.checkAndUpdateCardPrice({ collections });
      // If you want to update the collections in your state,
      // you can do so with the following (assuming setAllCollections is available):
      // setAllCollections(collections);
    };

    const handleCronJobTracker = (incomingData) => {
      console.log('Automated Message from Server:', incomingData.message);

      const { data } = incomingData;
      if (!data) {
        console.error('No data received from server for RESPONSE_CRON_DATA.');
        return;
      }

      // const { time, runs } = data;

      // console.log('Cron Time:', cronTime);
      // console.log('Cron Runs:', runs);

      setDataFunctions.cronData({ data });
    };

    // const handleExistingCollectionData = (userId, selectedCollection) => {
    //   console.log('Received existing collection data:', selectedCollection);
    //   setDataFunctions.collectionData({ selectedCollection });
    // };

    const handleExistingChartData = (data) => {
      if (!data) {
        console.error(
          'Unexpected data structure received for chart data update:',
          data
        );
        return;
      }
      console.log('Received existing CHART data:', data);

      setDataFunctions.chartData(data);
    };

    const handleCollectionUpdated = ({ message, data }) => {
      console.log('Message:', message);
      // console.log('Updated Collection Data:', data?.data);
      // setDataFunctions.collectionData(data.data);
    };

    const handleCardPricesUpdated = ({ message, pricingData }) => {
      console.log('Message:', message);

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
      console.log('Previous Card Prices:', previousPrices);
      console.log('Updated Card Prices:', updatedPrices);
      console.log('Price Differences:', priceDifferences);

      // Update the listOfMonitoredCards with the new prices
      listOfMonitoredCards.forEach((card) => {
        if (updatedPrices[card.id]) {
          card.updatedPrice = updatedPrices[card.id];
        }
      });

      // Update the state with the new prices
      state.retrievedListOfMonitoredCards.forEach((card) => {
        if (updatedPrices[card.id]) {
          card.updatedPrice = updatedPrices[card.id];
        }
      });

      // Assuming you want to combine both updated and previous prices
      const allPrices = {
        ...updatedPrices,
        ...previousPrices,
        // ...priceDifferences,
        previousPrices,
        updatedPrices,
        priceDifferences,
      };

      setDataFunctions.cardPrices({ allPrices });
    };

    // const handleChartUpdated = ({ message, data }) => {
    //   console.log('Message:', message);
    //   console.log('Updated chart Data:', data);
    //   setDataFunctions.updatedChartData(data?.data);
    // };

    // const handleNewChartCreated = ({ message, data }) => {
    //   console.log('Message:', message);
    //   console.log('Updated New CHart Data:', data?.data);
    //   setDataFunctions.chartData(data?.data);
    // };

    // const handleCardStatsUpdate = (data) => {
    //   console.log('Card stats updated:', data?.data);
    //   setDataFunctions.cardStats(data?.data);
    // };

    // const cardStatsUpdate = (data) => {
    //   console.log('Card stats updated:', data);
    //   setDataFunctions.cardStatsArray(data?.data);
    // };

    socket.on('MESSAGE_TO_CLIENT', handleReceive);
    socket.on('RESPONSE_EXISTING_CHART_DATA', handleExistingChartData);
    socket.on('RESPONSE_CRON_DATA', handleCronJobTracker);
    // socket.on(
    //   'RESPONSE_EXISTING_COLLECTION_DATA',
    //   handleExistingCollectionData
    // );
    socket.on(
      'RESPONSE_CRON_UPDATED_CARDS_IN_COLLECTION',
      handleCardPricesUpdated
    );
    socket.on('RESPONSE_CRON_UPDATED_ALLCOLLECTIONS', handleCronJobResponse);
    socket.on('COLLECTION_UPDATED', handleCollectionUpdated);
    // socket.on('CARD_STATS_UPDATE', handleCardStatsUpdate);
    // socket.on('CHART_UPDATED', handleChartUpdated);
    // socket.on('ALL_DATA_ITEMS', handleAllDataItemsReceived);
    // socket.on('updateCollection', cardStatsUpdate);

    // Cleanup to avoid multiple listeners
    return () => {
      socket.off('MESSAGE_TO_CLIENT', handleReceive);
      socket.off('RESPONSE_EXISTING_CHART_DATA', handleExistingChartData);
      // socket.off(
      //   'RESPONSE_EXISTING_COLLECTION_DATA',
      //   handleExistingCollectionData
      // );
      socket.off(
        'RESPONSE_CRON_UPDATED_CARDS_IN_COLLECTION',
        handleCardPricesUpdated
      );
      socket.off('RESPONSE_CRON_UPDATED_ALLCOLLECTIONS', handleCronJobResponse);
      socket.off('COLLECTION_UPDATED', handleCollectionUpdated);
      // socket.off('CARD_STATS_UPDATE', handleCardStatsUpdate);
      // socket.off('CHART_UPDATED', handleChartUpdated);
      // socket.off('ALL_DATA_ITEMS', handleAllDataItemsReceived);
      // socket.off('updateCollection', cardStatsUpdate);
    };
  }, [socket]);

  // ----------- DATA PROCESSING & HANDLERS -----------

  const handleSocketInteraction = {
    requestData: {
      collection: (userId, selectedCollection) => {
        if (!userId || !selectedCollection)
          return console.error('Missing userId or selectedCollection.');
        // socket.emit('REQUEST_EXISTING_COLLECTION_DATA', userId);
        socket.emit('RESPONSE_EXISTING_COLLECTION_DATA', {
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
        if (selectedCollection.chartData === undefined || null || '') {
          if (selectedCollection.chartData === undefined)
            console.log('chartData is undefined');
          if (selectedCollection.chartData === null)
            console.log('chartData is null');
          if (selectedCollection.chartData === '')
            console.log('chartData is empty');
          return console.error(
            'The selected collections chart data is missing, null or undefined.'
          );
        }

        console.log(
          'Attempting to retrieve chart data',
          selectedCollection?.chartData
        );
        const chartData = selectedCollection?.chartData;
        socket.emit('REQUEST_EXISTING_CHART_DATA', {
          data: {
            userId,
            chartData,
          },
        });
      },
    },
    sendAction: {
      message: (message) => {
        if (!message) return console.error('Message content is missing.');
        socket.emit('MESSAGE_FROM_CLIENT', { message });
      },
      // updateCollection: () => {
      //   if (!userId || !selectedCollection)
      //     return console.error('Invalid data for collection update.');
      //   socket.emit('REQUEST_UPDATE_COLLECTION', {
      //     userId,
      //     collectionId: selectedCollection._id,
      //     data: selectedCollection,
      //   });
      // },
      // updateChart: () => {
      //   if (!userId || !selectedCollection)
      //     return console.error('Missing userId or collection data.');
      //   socket.emit('REQUEST_UPDATE_OR_CREATE_CHART', {
      //     userId,
      //     chartId: selectedCollection.chartId, // Assuming your collection has a chartId field
      //     datasets: selectedCollection.datasets,
      //     name: selectedCollection.name,
      //   });
      // },
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
      console.log('allCollections', allCollections);
      console.log('listOfMonitoredCards', listOfMonitoredCards);

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
      // handleRequestChartDataFunction: handleSocketInteraction.requestData.chart, // Ensure it's provided here
      handleRequestChartData: handleSocketInteraction.requestData.chart, // Assuming this is the correct mapping
      handleSendAllCardsInCollections:
        handleSocketInteraction.sendAction.checkAndUpdateCardPrices, // Ensure it's provided here
      handleRetreiveListOfMonitoredCards: retrieveListOfMonitoredCards,
      // handleSendCollectionData:
      //   handleSocketInteraction.sendAction.updateCollection, // Ensure it's provided here
      // handleSendChartData: handleSocketInteraction.sendAction.updateChart, // Ensure it's provided here

      // handleRequestData: handleSocketInteraction.requestData.collection, // Assuming this is the correct mapping
      // handleSendData: handleSocketInteraction.sendAction.updateCollection,
      // handleSendChart: handleSocketInteraction.sendAction.updateChart,
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
    collectionData: value.collectionData,
    allCollectionData: value.allCollectionData,
    allCollectionsUpdated: value.allCollectionsUpdated,
    cronData: value.cronData,
    cardPrices: value.cardPrices,
    retrievedListOfMonitoredCards: value.retrievedListOfMonitoredCards,
    listOfMonitoredCards: value.listOfMonitoredCards,
    // isLoading: value.isLoading,
    // cronTriggerTimestamps: value.cronTriggerTimestamps,
    // error: value.error,
    // isDelaying: value.isDelaying,
    // isCronJobTriggered: value.isCronJobTriggered,
    // },
  };

  useEffect(() => {
    console.log('COMBINED CONTEXT VALUE:', dataValues);
  }, [dataValues]);

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
