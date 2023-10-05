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
import { useSocketActions } from './SocketActions';
import useSocketEvent from './useSocketEvent';

export const CombinedContext = createContext();

const initialState = {
  chartData: [],
  isLoading: false,
  data: {},
  cronTriggerTimestamps: [],
  collectionData: {},
  deckData: [],
  allData: [],
  updatedChartData: [],
  allUpdatedPrices: [],
  allItemTypeData: {},
  error: null,
  prices: {
    totalCard: 0,
    updated: 0,
    allUpdated: [],
    totalDeck: 0,
    totalCollection: 0,
  },
  cronData: [], // Added cronData to initialState as it is referred in your code
  isDelaying: false, // Added isDelaying to initialState as it is referred in your code
  isCronJobTriggered: false, // Added isCronJobTriggered to initialState as it is referred in your code
};

export const CombinedProvider = ({ children }) => {
  const { userCookie } = useCookies(['userCookie']);
  const [state, setState] = useState(initialState);
  const userId = userCookie?.userID;
  const socket = useSocket();

  // ----------- STATE UPDATER FUNCTIONS -----------
  const setDataFunctions = {
    chartData: useCallback(
      (data) => setState((prev) => ({ ...prev, chartData: data })),
      []
    ),
    allData: useCallback(
      (data) => setState((prev) => ({ ...prev, allData: data })),
      []
    ),
    cronData: useCallback(
      (data) => setState((prev) => ({ ...prev, cronData: data })),
      []
    ),
    error: useCallback(
      (data) => setState((prev) => ({ ...prev, error: data })),
      []
    ),
    updatedChartData: useCallback(
      (data) => setState((prev) => ({ ...prev, updatedChartData: data })),
      []
    ),
    collectionData: useCallback(
      (data) => setState((prev) => ({ ...prev, collectionData: data })),
      []
    ),
    updatedCollectionData: useCallback(
      (data) => setState((prev) => ({ ...prev, collectionData: data })),
      []
    ),
  };

  const setLoader = (isLoading) => setState((prev) => ({ ...prev, isLoading }));
  const setCronStatus = (cronActive) =>
    setState((prev) => ({ ...prev, cronActive }));

  // ----------- SOCKET EVENT HANDLERS -----------
  // SOCKET EVENT HANDLERS
  useEffect(() => {
    if (!socket) return;

    const handleReceive = (message) => {
      console.log('Received message:', message);
    };

    const handleExistingCollectionData = (data) => {
      console.log('Received existing collection data:', data.data);
      setDataFunctions.collectionData(data.data);
    };

    const handleExistingChartData = (data) => {
      console.log('Received existing CHART data:', data);
      setDataFunctions.chartData(data.data);
    };

    const handleCollectionUpdated = ({ message, data }) => {
      console.log('Message:', message);
      console.log('Updated Collection Data:', data);
      setDataFunctions.collectionData(data.data);
    };

    const handleChartUpdated = ({ message, data }) => {
      console.log('Message:', message);
      console.log('Updated Collection Data:', data);
      setDataFunctions.updatedCollectionData(data.data);
    };

    const cardStatsUpdate = (data) => {
      console.log('Card stats updated:', data.data);
      setDataFunctions.updatedChartData(data.data);
    };

    // Add other handlers as needed...

    socket.on('MESSAGE_TO_CLIENT', handleReceive);
    socket.on('SEND_S2C_EXISTING_CHART', handleExistingChartData);
    socket.on('SEND_S2C_EXISTING_COLLECTION', handleExistingCollectionData);
    socket.on('COLLECTION_UPDATED', handleCollectionUpdated);
    socket.on('CARD_STATS_UPDATE', cardStatsUpdate);
    socket.on('CHART_UPDATED', handleChartUpdated);

    // Cleanup to avoid multiple listeners
    return () => {
      socket.off('MESSAGE_TO_CLIENT', handleReceive);
      socket.off('SEND_S2C_EXISTING_CHART', handleExistingChartData);
      socket.off('SEND_S2C_EXISTING_COLLECTION', handleExistingCollectionData);
      socket.off('COLLECTION_UPDATED', handleCollectionUpdated);
      socket.off('CARD_STATS_UPDATE', cardStatsUpdate);
      socket.off('CHART_UPDATED', handleChartUpdated);
    };
  }, [socket]);

  // ----------- DATA PROCESSING & HANDLERS -----------

  const processUniqueData = useCallback((rawData) => {
    return Array.from(new Set(rawData?.map((data) => data?.id))).map((id) =>
      rawData?.find((data) => data?.id === id)
    );
  }, []);

  const handleSocketInteraction = {
    requestData: {
      collection: (userId) => {
        if (!userId)
          return console.error('Missing userId for collection data request.');
        socket.emit('REQUEST_EXISTING_COLLECTION_DATA', userId);
      },
      chart: (userId) => {
        if (!userId)
          return console.error('Missing userId for chart data request.');
        socket.emit('REQUEST_EXISTING_CHART_DATA', userId);
      },
    },
    sendAction: {
      message: (message) => {
        if (!message) return console.error('Message content is missing.');
        socket.emit('MESSAGE_FROM_CLIENT', { message });
      },
      updateCollection: ({ userId, collectionId, collectionData }) => {
        if (!userId || !collectionId || !collectionData)
          return console.error('Invalid data for collection update.');
        socket.emit('REQUEST_UPDATE_COLLECTION', {
          userId,
          collectionId,
          data: collectionData,
        });
      },
      updateChart: (chartDataToSend) => {
        const { userId, chartId, datasets, name } = chartDataToSend;

        // Logging to check values
        console.log('updateChart -> userId:', userId);
        console.log('updateChart -> chartId:', chartId);
        console.log('updateChart -> datasets:', datasets);
        console.log('updateChart -> name:', name);

        if (!userId) console.error('userId is missing');
        if (!chartId) console.error('chartId is missing');
        if (!datasets || datasets.length === 0)
          console.error('datasets is missing or empty');
        if (!name) console.error('name is missing');

        socket.emit('REQUEST_UPDATE_OR_CREATE_CHART', {
          name,
          userId,
          chartId,
          datasets,
        });
      },
      triggerCronJob: (userId) => {
        if (!userId)
          return console.error('Missing userId for cron job trigger.');
        socket.emit('START_CRON_JOB', { userId });
      },
    },
  };

  // // Handle request for cron job based on userId
  // const handleCronRequest = useCallback(
  //   (userId) => {
  //     if (!userId) return console.error('Missing userId for cron job trigger.');
  //     socket.emit('START_CRON_JOB', { userId });
  //   },
  //   [socket]
  // );

  // // Handle request for chart data based on userId
  // const handleRequestChartData = useCallback(
  //   (userId) => {
  //     if (!userId)
  //       return console.error('Missing userId for chart data request.');
  //     socket.emit('REQUEST_EXISTING_CHART_DATA', userId);
  //   },
  //   [socket]
  // );

  useEffect(() => {
    if (userId) {
      handleSocketInteraction.requestData.collection(userId);
      handleSocketInteraction.sendData.message('Hello from client!');
    }
  }, [userId, socket]);

  // Define utility methods...
  const toast = (message, duration = 10000) => {
    console.log(`TOAST: ${message}, Duration: ${duration}`);
  };

  const confirm = (message) => window.confirm(message);

  useEffect(() => {
    if (userId) {
      handleSocketInteraction.requestData.collection(userId);
      handleSocketInteraction.sendData.message('Hello from client!');
    }
  }, [userId, socket]);

  const value = useMemo(
    () => ({
      ...state,
      toast,
      confirm,
      setLoader,
      setCronStatus,
      handleCronRequest: handleSocketInteraction.sendAction.triggerCronJob, // Ensure it's provided here
      handleRequestChartData: handleSocketInteraction.requestData.chart, // Assuming this is the correct mapping
      handleRequestData: handleSocketInteraction.requestData.collection, // Assuming this is the correct mapping
      handleSend: handleSocketInteraction.sendAction.message,
      handleSendData: handleSocketInteraction.sendAction.updateCollection,
      handleSendChart: handleSocketInteraction.sendAction.updateChart,
      handleSocketInteraction,
      setDataFunctions,
      socket,
    }),
    [state, socket]
  );

  useEffect(() => {
    console.log('COMBINED CONTEXT VALUE:', value);
  }, [value]);

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
