import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
// import io from 'socket.io-client';
import {
  fetchDataForUser,
  // fetchFromAPI,
  updateServerDataForUser,
} from './CombinedFetcher';
import { useSocket } from './SocketProvider';
import { useSocketActions } from './SocketActions';
import useSocketEvent from './useSocketEvent';

export const CombinedContext = createContext();

const initialState = {
  chartData: [],
  isLoading: false,
  data: {},
  cronTriggerTimestamps: [],
  collectionData: [],
  deckData: [],
  allData: [],
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
  const userId = userCookie?.id;
  const socket = useSocket();
  const {
    sendMessage,
    // handleHelloReply,
    // handleExistingChartData,
    // handleExistingCollectionData,
    // handleRequestCollectionData,
    // handleUpdateChartData,
    // handleUpdateCollectionData,
    // handleDataUpdate,
    // handleS2CChartUpdate,
  } = useSocketActions();

  const updateStateProperty = useCallback((property, value) => {
    setState((prevState) => ({ ...prevState, [property]: value }));
  }, []);
  const setChartData = useCallback((newChartData) => {
    setState((prevState) => ({ ...prevState, chartData: newChartData }));
  }, []);
  const setAllData = useCallback((newAllData) => {
    setState((prevState) => ({ ...prevState, allData: newAllData }));
  }, []);
  const setCronData = useCallback((newCronData) => {
    setState((prevState) => ({ ...prevState, cronData: newCronData }));
  }, []);
  const setError = useCallback((errorMessage) => {
    setState((prev) => ({ ...prev, error: errorMessage }));
  }, []);

  const setCollectionData = useCallback((newCollectionData) => {
    setState((prevState) => ({
      ...prevState,
      collectionData: newCollectionData,
    }));
  }, []);
  const processUniqueData = useCallback((rawData) => {
    return Array.from(new Set(rawData?.map((data) => data?.id))).map((id) =>
      rawData?.find((data) => data?.id === id)
    );
  }, []);

  const toast = (message, duration = 10000) => {
    console.log(`TOAST: ${message}, Duration: ${duration}`);
  };

  const confirm = (message) => window.confirm(message);

  // const trigger = useCallback(async () => {
  //   console.log('TRIGGERING CRON JOB...');
  //   cronTrigger();
  // }, [state, processUniqueData]);
  // Helper functions
  const setLoader = (isLoading) => {
    setState((prevState) => ({ ...prevState, isLoading }));
  };

  const setCronStatus = (cronActive) => {
    setState((prevState) => ({ ...prevState, cronActive }));
  };

  const processDataAndUpdateState = (returnValue) => {
    const uniqueCollectionData = processUniqueData(
      returnValue?.allCollectionData
    );
    // const uniqueDeckData = processUniqueData(returnValue?.allDeckData);
    setState((prevState) => ({
      ...prevState,
      collectionData: uniqueCollectionData,
      // deckData: uniqueDeckData,
      // allData: [...uniqueCollectionData, ...uniqueDeckData],
      allUpdatedPrices: uniqueCollectionData,
      cronData: {
        ...prevState.cronData,
        totalJobs: returnValue?.totalRuns,
      },
    }));
    // io.emit('SEND_C2S_COLLECTION_UPDATE', {
    //   data: { collectionData: uniqueCollectionData },
    // });
  };

  // const stopCronJob = async () => {
  //   updateStateProperty('isLoading', true);
  //   try {
  //     await fetchFromAPI('stopAndReset');
  //     updateStateProperty('cronActive', false);
  //     toast('Cron job stopped successfully');
  //   } finally {
  //     updateStateProperty('isLoading', false);
  //   }
  // };
  useSocketEvent(socket, 'connection', () => console.log('A user connected'));

  const handleSend = (message) => {
    sendMessage(message);
  };

  const handleReceive = (message) => {
    console.log('Received message:', message);
  };

  const handleExistingCollectionData = (data) => {
    console.log('Received existing collection data:', data.data);
    setCollectionData(data.data);
  };
  const handleUpdateExistingCollectionData = (data) => {
    console.log('Received existing CHART data:', data.data);
    setCollectionData(data.data);
  };
  const handleExistingChartData = (data) => {
    console.log('Received existing CHART data:', data.data);
    setChartData(data.data);
  };
  const handleUpdateExistingChartData = (data) => {
    console.log('Received existing CHART data:', data.data);
    setChartData(data.data);
  };
  const handleUpdateAllData = (data) => {
    console.log('Received existing COLLECTION data:', data.data);
    setAllData(data.data);
  };
  const handleCronData = (data) => {
    console.log('Received existing CRON data:', data.data);
    setCronData(data.data);
  };
  const handleCronDataSpecific = (data) => {
    console.log('Received existing CRON data:', data.data);
    setCronData(data.data);
  };
  const handleNewChartData = (data) => {
    console.log('Received existing CRON data:', data.data);
    setCronData(data.data);
  };
  const cronTrigger = useCallback(
    (userId) => {
      // const now = Date.now();
      // const { cronTriggerTimestamps, isDelaying } = state;

      // const timestampsLastMinute = cronTriggerTimestamps.filter(
      //   (timestamp) => now - timestamp < 60000
      // );

      // if (timestampsLastMinute.length >= 5) {
      //   if (!isDelaying) {
      //     toast(
      //       'Too many cron job attempts, waiting for a minute before retrying'
      //     );
      //     setState((prevState) => ({ ...prevState, isDelaying: true }));
      //   }
      //   return;
      // }

      // if (isDelaying) {
      //   clearInterval(window.cronJobInterval);
      //   window.cronJobInterval = setInterval(cronTrigger, 60000);
      // }

      console.log('STARTING JOB NOW___________', userId);
      // socket.emit('START_CRON_JOB', userId);
      socket.emit('START_CRON_JOB', {
        // type: 'REQUEST_EXISTING_COLLECTION_DATA',
        userId: userId,
      });
      // Handle the data when the server sends back the response.
      // This can be handled in another callback registered with `useSocketEvent`.
    },
    [socket, userId]
  );
  useSocketEvent(socket, 'MESSAGE_TO_CLIENT', handleReceive);
  useSocketEvent(socket, 'SEND_S2C_EXISTING_CHART', handleExistingChartData);
  useSocketEvent(
    socket,
    'SEND_S2C_EXISTING_COLLECTION',
    handleExistingCollectionData
  );

  useSocketEvent(socket, 'CHART_DATA_UPDATED', handleUpdateExistingChartData);
  useSocketEvent(socket, 'ALL_DATA_ITEMS', handleUpdateAllData);
  useSocketEvent(socket, 'CRON_DATA', handleCronData);
  useSocketEvent(socket, 'CRON_DATA_SPECIFIC', handleCronDataSpecific);
  useSocketEvent(socket, 'TRIGGER_CRON_JOB', cronTrigger);
  useSocketEvent(
    socket,
    'RECEIVE_S2S_COLLECTION_UPDATE',
    handleUpdateExistingCollectionData
  );
  useSocketEvent(socket, 'NEW_CHART', handleNewChartData);

  const handleRequestCollectionData = useCallback(
    (userId) => {
      console.log('Requesting data for userId:', userId);
      socket.emit('REQUEST_EXISTING_COLLECTION_DATA', {
        // type: 'REQUEST_EXISTING_COLLECTION_DATA',
        userId: userId,
      });

      // socket?.emit('REQUEST_EXISTING_COLLECTION_DATA', userId);
    },
    [socket]
  );
  // const handleRequestAllData = useCallback(
  //   (userId) => {
  //     console.log('Requesting data for userId:', userId);
  //     socket?.emit('REQUEST_EXISTING_COLLECTION_DATA', userId);
  //   },
  //   [socket]
  // );

  const handleTriggerCronJob = (userId) => {
    console.log('Requesting data for cron trigger:', userId);
    // socket.emit('TRIGGER_CRON_JOB', { userId });
    socket.emit('START_CRON_JOB', {
      // type: 'REQUEST_EXISTING_COLLECTION_DATA',
      userId: userId,
    });
  };

  // const handleRequestChartData = useCallback(
  //   (userId) => {
  //     console.log('Requesting data for userId:', userId);
  //     socket?.emit('REQUEST_EXISTING_CHART_DATA', userId);
  //   },
  //   [socket]
  // );
  const handleAddDataSet = (
    chartId,
    newDataPoint,
    userId,
    collectionId,
    name,
    datasets
  ) => {
    // socket?.emit('ADD_DATA_TO_CHART', { chartId, x: 10, y: 20 });
    socket.emit('ADD_DATA_TO_CHART', {
      chartId,
      newDataPoint,
      userId,
      collectionId,
      name,
      datasets,
    });
  };

  // const handleStartCron = (userId) => {
  //   // socket?.emit('ADD_DATA_TO_CHART', { chartId, x: 10, y: 20 });
  //   socket.emit('START_JOB', { userId });
  // };
  const updateServerData = async (userId) => {
    try {
      const chartData = state.chartData; // retrieving chartData from state
      const chartId = chartData?._id;
      const name = chartData?.name;
      const newValue = chartData;
      // const userId = userId;
      console.log('new', newValue);
      // console.log('userId', userId);

      const uniqueData = Array.from(
        new Set(
          (
            chartData || [
              {
                x: Date.now(),
                y: newValue,
              },
            ]
          )
            .flatMap((obj) => obj.data || [])
            .map(JSON.stringify)
        )
      ).map(JSON.parse);

      socket.emit('REQUEST_EXISTING_CHART_DATA', {
        // data: {
        userId,
        chartId,
        name,
        // datasets: uniqueData,
        // },
      });

      return uniqueData;
    } catch (error) {
      console.error('Error updating server data:', error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      ...state,
      toast,
      confirm,
      // updateServerData,
      // trigger,
      // startCronJob,
      // cronTrigger,
      // stopCronJob,
      setLoader,
      setCronStatus,
      handleSend,
      handleAddDataSet,
      // handleRequestAllData,
      // handleStartCron,
      trigger: cronTrigger,
      handleRequestData: handleRequestCollectionData,
      handleCronRequest: handleTriggerCronJob,
      handleRequestChartData: updateServerData,
      setChartData,
      setData: (newData) =>
        setState((prevState) => ({ ...prevState, data: newData })),
    }),
    [state, updateServerData, setChartData]
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
