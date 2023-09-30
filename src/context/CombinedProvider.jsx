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
import io from 'socket.io-client';
import { useCollectionStore } from './hooks/collection';
import { useUserContext } from './UserContext/UserContext';

export const CombinedContext = createContext();

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return { ...state, isLoading: action.payload };
//     // Add other cases for different actions
//     default:
//       return state;
//   }
// };

const initialState = {
  chartData: [],
  isLoading: false,
  data: [],
  cronTriggerTimestamps: [],
  collectionData: [],
  deckData: [],
  allData: [],
  allUpdatedPrices: [],
  allItemTypeData: [],
  prices: {
    totalCard: 0,
    updated: 0,
    allUpdated: [],
    totalDeck: 0,
    totalCollection: 0,
  },
};

const BASE_API_URL_CHARTS = `${process.env.REACT_APP_SERVER}/api/chart-data`;
const BASE_API_URL_CRON = `${process.env.REACT_APP_SERVER}/other/cron`;
const CRON_JOB_DELAY = 60000;
const getSocketURL = () =>
  process.env.REACT_APP_SERVER || 'ws://localhost:3001';

// Create CombinedProvider component
export const CombinedProvider = ({ children }) => {
  const { userCookie } = useCookies(['userCookie']);
  const { setIsCronJobTriggered, isCronJobTriggered } = useUserContext();
  const userId = userCookie?.id;
  const [state, setState] = useState(initialState);
  const socket = useMemo(
    () => io(getSocketURL(), { transports: ['websocket'] }),
    []
  );

  const setChartData = useCallback((newChartData) => {
    setState((prevState) => ({ ...prevState, chartData: newChartData }));
  }, []);
  const processUniqueData = useCallback((rawData) => {
    return Array.from(new Set(rawData?.map((data) => data?.id))).map((id) =>
      rawData?.find((data) => data?.id === id)
    );
  }, []);

  // Fetching Data
  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `${BASE_API_URL_CHARTS}/charts/${userId}`
      );
      console.log('FETCHED DATA:', response);
      setChartData(response?.data);
      // setDatasets(response?.data?.datasets || []);
      console.log('FETCHED DATA:', response?.data);
      // setState((prevState) => ({ ...prevState, chartData:  }));
    } catch (error) {
      console.error('Error fetching updated data:', error);
    }
  }, [userId]);

  const updateItemData = useCallback(
    (itemType, response) => {
      const {
        updatedPrice,
        totalCollectionPrice,
        totalDeckPrice,
        allCollectionData,
        allDeckData,
        itemTypeData: { itemType: fetchedItemType },
      } = response.data.returnValue;
      const processedData = {
        Collection: processUniqueData(allCollectionData),
        Deck: processUniqueData(allDeckData),
      };
      setState((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          [fetchedItemType]: processedData[fetchedItemType],
        },
        updatedPrice,
        totalCollectionPrice,
        totalDeckPrice,
      }));
    },
    [processUniqueData]
  );

  //   totalCollectionPrice:
  //   fetchedItemType === 'Collection'
  //     ? totalCollectionPrice
  //     : prevState.totalCollectionPrice,
  // totalDeckPrice:
  //   fetchedItemType === 'Deck' ? totalDeckPrice : prevState.totalDeckPrice,
  // updatedPrice,
  // }));
  // };

  const updateSpecificItem = useCallback(
    async (itemType, itemId) => {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      console.log('ITEM TYPE:', itemType);
      console.log('ITEM ID:', itemId);
      try {
        const response = await axios.get(
          `${BASE_API_URL_CRON}/update/${itemType}/${itemId}`
        );
        updateItemData(itemType, response);
      } catch (error) {
        console.error(`Error updating ${itemType}:`, error);
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    },
    [updateItemData]
  );
  useEffect(() => {
    if (isCronJobTriggered) {
      fetchData();
      if (isCronJobTriggered) setIsCronJobTriggered(false);
    }
  }, [isCronJobTriggered, userId]);

  const updateServerData = useCallback(
    async (updatedData) => {
      if (!userId) return;
      const dataSetId = updatedData?._id || 'all';
      const name = updatedData?.name || 'all';

      const uniqueData = useMemo(
        () =>
          Array.from(
            new Set(
              (updatedData || [])
                .flatMap((obj) => obj.data || [])
                .map(JSON.stringify)
            )
          ).map(JSON.parse),
        [updatedData]
      );

      try {
        const response = await axios.post(
          `${BASE_API_URL_CHARTS}/charts/updateChart/${userId}`,
          {
            userId: userId,
            data: uniqueData,
            name: name || 'all',
            _id: dataSetId || 'all',
            datasets: uniqueData || [],
          }
        );

        io.on('all-items-updated', (data) => {
          console.log('ALL ITEMS UPDATED:', data);
          setState((prevState) => ({
            ...prevState,
            allItemTypeData: response.data,
          }));
        });

        console.log('UPDATE SERVER DATA RESPONSE:', response);
        const { returnValue } = response.data;

        console.log('RETURN VALUE:', returnValue);
        // Update chartData state here
        setState((prevState) => ({ ...prevState, chartData: uniqueData }));
        setIsCronJobTriggered(true);
      } catch (error) {
        console.error('Error updating server data:', error);
      }
    },
    [userId, setIsCronJobTriggered]
  );

  const toast = (message, duration = 10000) => {
    console.log(`TOAST: ${message}, Duration: ${duration}`);
  };

  const confirm = (message) => window.confirm(message);

  const trigger = useCallback(async () => {
    console.log('TRIGGERING CRON JOB...');
    cronTrigger();
  }, [state, processUniqueData]);
  // Helper functions
  const setLoader = (isLoading) => {
    setState((prevState) => ({ ...prevState, isLoading }));
  };

  const setCronStatus = (cronActive) => {
    setState((prevState) => ({ ...prevState, cronActive }));
  };

  const sendCronRequest = async (endpoint) => {
    try {
      return await axios.get(`${BASE_API_URL_CRON}/${endpoint}`);
    } catch (error) {
      console.error(`Error in cron request to ${endpoint}:`, error);
      throw error;
    }
  };

  const processDataAndUpdateState = (returnValue) => {
    const uniqueCollectionData = processUniqueData(
      returnValue?.allCollectionData
    );
    const uniqueDeckData = processUniqueData(returnValue?.allDeckData);
    setState((prevState) => ({
      ...prevState,
      collectionData: uniqueCollectionData,
      deckData: uniqueDeckData,
      allData: [...uniqueCollectionData, ...uniqueDeckData],
      allUpdatedPrices: returnValue?.allUpdatedPrices,
      cronData: {
        ...prevState.cronData,
        totalJobs: returnValue?.totalRuns,
      },
    }));
  };

  const startCronJob = async () => {
    setLoader(true);
    try {
      await sendCronRequest('startCronJob');
      setCronStatus(true);
      toast('Cron job started successfully');
    } finally {
      setLoader(false);
    }
  };

  const cronTrigger = useCallback(async () => {
    const now = Date.now();
    const { cronTriggerTimestamps, isDelaying } = state;
    const timestampsLastMinute = cronTriggerTimestamps.filter(
      (timestamp) => now - timestamp < 60000
    );

    if (timestampsLastMinute.length >= 5) {
      if (!isDelaying) {
        toast(
          'Too many cron job attempts, waiting for a minute before retrying'
        );
        setState((prevState) => ({ ...prevState, isDelaying: true }));
      }
      return;
    }

    if (isDelaying) {
      clearInterval(window.cronJobInterval);
      window.cronJobInterval = setInterval(cronTrigger, 60000);
    }

    setLoader(true);
    try {
      const response = await sendCronRequest('update');
      const { returnValue } = response.data;
      setState((prevState) => ({
        ...prevState,
        isLoading: returnValue?.isLoading || false,
        cronActive: returnValue?.cronActive || false,
        data: returnValue?.data || [],
      }));
      processDataAndUpdateState(returnValue);
    } finally {
      setLoader(false);
    }
  }, [state, toast, processUniqueData]);

  const stopCronJob = async () => {
    setLoader(true);
    try {
      await sendCronRequest('stopAndReset');
      setCronStatus(false);
      toast('Cron job stopped successfully');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const socket = io('ws://localhost:3001', {
      transports: ['websocket'],
    });
    // Setup socket listeners
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('dataUpdate', (data) => {
      console.log('Data received from WebSocket server:', data);
      setChartData(data);
    });

    socket.on('returnvalue', (data) => {
      console.log('Data received from WebSocket server:', data);
      setState((prevState) => ({ ...prevState, allItemTypeData: data }));
      // setAllItemTypeData(data);
    });

    // Fetch data initially
    fetchData();

    // Setup cronTrigger interval
    const interval = setInterval(cronTrigger, CRON_JOB_DELAY);

    return () => {
      // Cleanup
      socket.disconnect();
      console.log('Disconnected from WebSocket server');
      clearInterval(interval);
    };
  }, [socket]);

  useEffect(() => {
    if (isCronJobTriggered) {
      fetchData();
      setIsCronJobTriggered(false);
    }
  }, [isCronJobTriggered]);

  const value = {
    ...state,
    toast,
    setChartData,
    confirm,
    fetchData,
    updateServerData,
    updateSpecificItem,
    onTrigger: trigger,
    stopCronJob,
    setData: (newData) =>
      setState((prevState) => ({ ...prevState, data: newData })),
    setCollectionData: (newData) =>
      setState((prevState) => ({ ...prevState, collectionData: newData })),
  };

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
