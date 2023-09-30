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
import useSocket from './SocketProvider';
import { useApiServiceProvider } from './ApiServiceProvider';

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
  prices: {
    totalCard: 0,
    updated: 0,
    allUpdated: [],
    totalDeck: 0,
    totalCollection: 0,
  },
};

const BASE_API_URL_CHARTS = `${process.env.REACT_APP_SERVER}/other/chart-data`;
const BASE_API_URL_CRON = `${process.env.REACT_APP_SERVER}/other/cron`;
const CRON_JOB_DELAY = 60000;
const getSocketURL = () =>
  process.env.REACT_APP_SERVER || 'ws://localhost:3001';

// Create CombinedProvider component
export const CombinedProvider = ({ children }) => {
  const { userCookie } = useCookies(['userCookie']);
  const [state, setState] = useState(initialState);
  const userId = userCookie?.id;
  const { fetchData, updateServerData } = useApiServiceProvider();

  const setChartData = useCallback((newChartData) => {
    setState((prevState) => ({ ...prevState, chartData: newChartData }));
  }, []);
  const processUniqueData = useCallback((rawData) => {
    return Array.from(new Set(rawData?.map((data) => data?.id))).map((id) =>
      rawData?.find((data) => data?.id === id)
    );
  }, []);

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

  const handleExistingChartData = useCallback(
    (existingChartData) => {
      setChartData(existingChartData);
    },
    [setChartData]
  );

  const handleUpdatedChartData = useCallback((updatedData) => {
    setChartData((prevData) => {
      // Merge or replace previous chart data with the updatedData as per requirement
      return [...prevData, ...updatedData];
    });
    // Additional logic as needed
  }, []);

  const handleDataUpdate = useCallback((dataUpdate) => {
    // Logic to handle 'updateChartData' event
    // Example: update the chartData state
  }, []);

  const handleReturnValue = useCallback((returnValue) => {
    // Logic to handle 'returnvalue' event
    // Example: Maybe update a state or log to console
  }, []);

  const handleAllItemsUpdated = useCallback((updatedItems) => {
    setAllItems(updatedItems);
    // Additional logic as needed
  }, []);

  const handleS2CChartUpdate = useCallback((s2cUpdate) => {
    // Logic to handle 'RECEIVE_S2C_CHART_UPDATE' event
    // Example: Update chart data or emit an event
  }, []);

  const handleS2SChartUpdate = useCallback((s2sUpdate) => {
    // Logic to handle 'RECEIVE_S2S_CHART_UPDATE' event
    // Example: Update chart data or emit an event
  }, []);

  const socket = useSocket([
    { event: 'EXISTING_CHART_DATA', handler: handleExistingChartData },
    { event: 'UPDATED_CHART_DATA', handler: handleUpdatedChartData },
    { event: 'updateChartData', handler: handleDataUpdate },
    { event: 'returnvalue', handler: handleReturnValue },
    { event: 'all-items-updated', handler: handleAllItemsUpdated },
    { event: 'RECEIVE_S2C_CHART_UPDATE', handler: handleS2CChartUpdate },
    { event: 'RECEIVE_S2S_CHART_UPDATE', handler: handleS2SChartUpdate },
  ]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (state.isCronJobTriggered) {
      fetchData();
      setState((prevState) => ({ ...prevState, isCronJobTriggered: false }));
    }
  }, [state.isCronJobTriggered, fetchData]);

  const value = useMemo(
    () => ({
      ...state,
      toast,
      confirm,
      fetchData,
      updateServerData,
      updateSpecificItem,
      setChartData,
      setData: (newData) =>
        setState((prevState) => ({ ...prevState, data: newData })),
    }),
    [state, fetchData, updateServerData, updateSpecificItem, setChartData]
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
