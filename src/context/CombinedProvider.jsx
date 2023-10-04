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
    console.log(
      'Received existing collection data: REQUEST_EXISTING_COLLECTION_DATA',
      data.data
    );
    setCollectionData(data.data);
  };
  const handleCollection = (data) => {
    console.log('HANDLING HANDLING HANDLING HANDLING LALALALALA', data.data);
    // setAllData(data.data);
  };
  const handleUpdateExistingCollectionData = (data) => {
    console.log('REQUEST_EXISTING_COLLECTION_DATA', data.data);
    // setAllData(data.data);
  };
  const handleExistingChartData = (data) => {
    if (!data || !data.data) {
      console.error('Unexpected data format received:', data);
      return;
    }
    console.log('Received existing CHART data:', data.data);
    setChartData(data.data);
  };

  const handleUpdateExistingChartData = (data) => {
    if (!data || !data.data) {
      console.error('Unexpected data format received:', data);
      return;
    }
    console.log('Received existing CHART data:', data.data);
    setChartData(data.data);
  };
  // const handleUpdateAllData = (data) => {
  //   console.log('Received existing COLLECTION data:', data.data);
  //   setAllData(data.data);
  // };
  const handleCronData = (data) => {
    console.log('Received existing CRON data:', data.data);
    setCronData(data.data);
  };
  const handleCronDataSpecific = (data) => {
    console.log('Received existing CRON data:', data.data);
    setCronData(data.data);
  };
  const handleNewChartData = (data) => {
    console.log('Received new CHART data:', data.data); // Correcting the log message
    setChartData(data.data);
  };

  const handleManageCollectionData = (data) => {
    console.log('RESEEEVED THE DATAAAAAAAA+++++++++++++!!!!!!:', data); // Correcting the log message
    setAllData(data.data);
  };

  const handleCollectionUpdated = (message, data) => {
    console.log('Message', message); // Correcting the log message

    const { data: updatedCollection } = data;
    console.log('Data', updatedCollection); // Correcting the log message
    console.log(
      'RNUM KJNFJKF K:JNHKJNKJLBKJB:KJFBJK:D BKSFN J:KFB JK------------->:'
    ); // Correcting the log message
    setAllData(data);
  };

  const cronTrigger = useCallback(
    (userId) => {
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

  const handleUpdateCollectionData = useCallback(
    (userId) => {
      console.log('Requesting data for userId:', userId);
      console.log('Requesting data for userId:', userId);
      // console.log('Requesting data for cron triggerq2:', collectionData);

      socket.emit('REQUEST_UPDATE_COLLECTION', userId);
    },
    [socket]
  );

  useSocketEvent(socket, 'MESSAGE_TO_CLIENT', handleReceive);
  useSocketEvent(socket, 'SEND_S2C_EXISTING_CHART', handleExistingChartData);
  useSocketEvent(
    socket,
    'SEND_S2C_EXISTING_COLLECTION',
    handleExistingCollectionData
  );
  // useSocketEvent(socket, 'SEND_S2C_EXISTING_CRON', handleUpdateCollectionData);
  useSocketEvent(socket, 'CHART_DATA_UPDATED', handleUpdateExistingChartData);
  // useSocketEvent(socket, 'ALL_DATA_ITEMS', handleUpdateAllData);EVENT_HERE
  useSocketEvent(socket, 'CRON_DATA', handleCronData);

  useSocketEvent(socket, 'CRON_DATA_SPECIFIC', handleCronDataSpecific);
  useSocketEvent(socket, 'TRIGGER_CRON_JOB', cronTrigger);
  useSocketEvent(socket, 'UPDATE_COLLECTION', handleManageCollectionData);
  useSocketEvent(socket, 'COLLECTION_UPDATED', handleCollectionUpdated);
  useSocketEvent(socket, 'updateCollection', handleCollection);
  useSocketEvent(
    socket,
    'RECEIVE_S2S_COLLECTION_UPDATE',
    handleUpdateExistingCollectionData
  );
  useSocketEvent(socket, 'NEW_CHART', handleNewChartData);

  // const handleRequestCollectionData = (userId) => {
  //   console.log('Requesting data for userId:', userId);
  //   socket?.emit('REQUEST_EXISTING_COLLECTION_DATA', {
  //     // type: 'REQUEST_EXISTING_COLLECTION_DATA',
  //     userId,
  //   });
  // };
  const requestUpdateCollection = (userId, collectionId, collectionData) => {
    socket.emit('REQUEST_UPDATE_COLLECTION', {
      data: {
        userId,
        collectionId,
        data: collectionData,
      },
    });
  };
  // // Request existing collection data
  // const requestExistingCollectionData = (userId) => {
  //   socket.emit('REQUEST_EXISTING_COLLECTION_DATA', userId);
  // };

  // Request to update a collection
  // const handleRequestAllData = useCallback(
  //   (userId) => {
  //     console.log('Requesting data for userId:', userId);
  //     socket?.emit('REQUEST_EXISTING_COLLECTION_DATA', userId);
  //   },
  //   [socket]
  // );
  // const handleThing = useCallback(
  //   (userId) => {
  //     console.log('Requesting data for userId:', userId);
  //     socket.emit('EVENT_HERE', {
  //       userId,
  //     });
  //   },
  //   [socket]
  // );
  const handleTriggerCronJob = (userId) => {
    console.log('Requesting data for cron trigger:', userId);
    console.log('Requesting data for cron triggerq2:', userId);

    socket.emit('START_CRON_JOB', {
      userId,
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

  const updateServerData = async (clientInput) => {
    try {
      const chartData = state.chartData || {}; // Ensure chartData is initialized

      if (!chartData) {
        throw new Error('Chart data is missing or not initialized.');
      }
      const collectionData = state.collectionData || {}; // Ensure collectionData is initialized
      const chartId = chartData._id;
      const name = chartData.name;
      const newValue = chartData.datasets || []; // Ensure datasets are initialized

      // const userId = userId;
      console.log('new', newValue);
      // console.log('userId', userId);
      if (!Array.isArray(newValue)) {
        console.error('chartData is not an array:', newValue);
        return;
      }
      let uniqueData = [];

      if (newValue && newValue.length > 0) {
        uniqueData = Array.from(
          new Set(
            (
              newValue || [
                {
                  x: Date.now(),
                  y: newValue.y,
                },
              ]
            )
              .flatMap((obj) => obj.data || [])
              .map(JSON.stringify)
          )
        ).map(JSON.parse);
      }

      socket.emit('REQUEST_EXISTING_CHART_DATA', {
        data: {
          userId,
          name,
          datasets: uniqueData,
        },
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
      setLoader,
      setCronStatus,
      handleSend,
      handleAddDataSet,
      trigger: cronTrigger,
      handleRequestData: requestUpdateCollection,
      // handleSendData: handleUpdateCollectionData,
      handleSendData: handleUpdateCollectionData,
      // handleCronRequest: cronTrigger,
      handleCronRequest: handleTriggerCronJob,
      handleRequestChartData: updateServerData,
      // sendCollectionDataToServer, // Adding the new function here
      setChartData,
      setData: (newData) =>
        setState((prevState) => ({ ...prevState, data: newData })),
    }),
    [state, updateServerData, setChartData] // Also add it in the dependency array
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
