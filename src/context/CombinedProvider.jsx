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
import { useCollectionStore } from './hooks/collection';
import { useUserContext } from './UserContext/UserContext';

export const CombinedContext = createContext();

const initialState = {
  chartData: [],
  isLoading: false,
  cronActive: false,
  lastWarningTimestamp: 0,
  cronTriggerTimestamps: [],
  data: [],
  collectionData: [],
  deckData: [],
  allData: [],
  totalCronJobs: 0,
  cronCounter: 0,
  totalCardPrice: 0,
  updatedPrice: 0,
  allUpdatedPrices: [],
  totalDeckPrice: 0,
  totalCollectionPrice: 0,
  isDelaying: false,
  cronData: {
    counter: 0,
    totalJobs: 0,
  },
};

const BASE_API_URL_CHARTS = `${process.env.REACT_APP_SERVER}/api/chart-data`;
const BASE_API_URL_CRON = `${process.env.REACT_APP_SERVER}/other/cron`;

// Create CombinedProvider component
export const CombinedProvider = ({ children }) => {
  const { selectedCollection } = useCollectionStore();
  const [state, setState] = useState(initialState);
  const [datasets, setDatasets] = useState([]);

  const [{ userCookie }] = useCookies(['userCookie']);
  const { triggerCronJob, isCronJobTriggered, setIsCronJobTriggered } =
    useUserContext();
  const userId = userCookie?.id;

  const processUniqueData = useCallback((rawData) => {
    return Array.from(new Set(rawData.map((data) => data.id))).map((id) =>
      rawData.find((data) => data.id === id)
    );
  }, []);

  // Fetching Data
  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const { data } = await axios.get(
        `${BASE_API_URL_CHARTS}/charts/${userId}`
      );
      console.log('FETCHED DATA:', data);
      setState((prevState) => ({ ...prevState, chartData: data }));
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

  // Update server data
  const updateServerData = useCallback(
    async (updatedData) => {
      if (!userId) return;
      const dataSetId = updatedData?._id || 'all';

      console.log('UPDATED DATA:', updatedData);
      console.log('DATA SET ID:', dataSetId);
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
        await axios.post(
          `${BASE_API_URL_CHARTS}/charts/${userId}/addNewDataSet`,
          {
            data: uniqueData,
          }
        );
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
    cronTrigger();
  }, [state, processUniqueData]);

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

    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        cronActive: true,
      }));
      const response = await axios.get(`${BASE_API_URL_CRON}/update`);
      const { returnValue } = response.data;

      console.log('RETURN VALUE:', returnValue);
      const uniqueCollectionData = processUniqueData(
        returnValue.allCollectionData
      );
      console.log('UNIQUE COLLECTION DATA:', uniqueCollectionData);
      const uniqueDeckData = processUniqueData(returnValue.allDeckData);
      console.log('UNIQUE DECK DATA:', uniqueDeckData);
      setState((prevState) => ({
        ...prevState,
        collectionData: uniqueCollectionData,
        deckData: uniqueDeckData,
        allUpdatedPrices: returnValue.allUpdatedPrices,
        cronData: {
          ...prevState.cronData,
          totalJobs: returnValue.totalRuns,
        },
      }));
    } catch (error) {
      console.error('Error triggering the cron job:', error);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, [state, toast, processUniqueData]);

  const stopCronJob = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      await axios.get(`${BASE_API_URL_CRON}/stopAndReset`);
      setState((prevState) => ({ ...prevState, cronActive: false }));
      toast('Cron job stopped successfully');
    } catch (error) {
      console.error('Error stopping the cron job:', error);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(triggerCronJob, 60000);
    return () => clearInterval(interval);
  }, [fetchData, triggerCronJob]);

  // useEffect(() => {
  //   window.cronJobInterval = setInterval(cronTrigger, 60000);
  //   return () => clearInterval(window.cronJobInterval);
  // }, [cronTrigger]);

  const value = {
    ...state,
    toast,
    confirm,
    fetchData,
    chartData: state.chartData,
    datasets,
    setDatasets,
    updateServerData,
    updateSpecificItem,
    onTrigger: () => triggerCronJob(trigger()),
    stopCronJob,
    setData: (newData) =>
      setState((prevState) => ({ ...prevState, data: newData })),
    setLastWarningTimestamp: (timestamp) =>
      setState((prevState) => ({
        ...prevState,
        lastWarningTimestamp: timestamp,
      })),

    }, 
     [state, datasets, toast, confirm, fetchData, updateServerData, updateSpecificItem, triggerCronJob, trigger, stopCronJob];

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
