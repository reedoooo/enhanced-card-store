import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

// Create CombinedContext
export const CombinedContext = createContext();

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

// Create CombinedProvider component
export const CombinedProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cronActive, setCronActive] = useState(false);
  const [searchParams, setSearchParams] = useState(initialState);
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [allUpdatedPrices, setAllUpdatedPrices] = useState([]);
  const [cronCounter, setCronCounter] = useState(0);
  const [totalDeckPrice, setTotalDeckPrice] = useState(0);
  const [totalCronJobs, setTotalCronJobs] = useState(0);
  const [totalCollectionPrice, setTotalCollectionPrice] = useState(0);
  const [cronTriggerTimestamps, setCronTriggerTimestamps] = useState([]);
  const [isCronJobTriggered, setIsCronJobTriggered] = useState(false);
  const [cronData, setCronData] = useState({
    counter: 0,
    totalJobs: 0,
  });

  const [{ userCookie }] = useCookies(['userCookie']);
  const userId = userCookie?.id;
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/chart-data`;

  // Combine all the functions from both contexts here
  // For example:
  const fetchData = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_API_URL}/${userId}`);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching updated data:', error);
    }
  };

  const updateServerData = async (updatedData) => {
    if (!userId) return;

    const reducedData = updatedData?.reduce((accumulator, currentObject) => {
      if (currentObject?.data && currentObject?.data?.length > 0) {
        accumulator = [...accumulator, ...currentObject.data];
      }
      return accumulator;
    }, []);
    const uniqueData = Array.from(
      new Set(reducedData?.map(JSON.stringify))
    ).map(JSON.parse);

    try {
      await axios.post(`${BASE_API_URL}/updateChart/${userId}`, {
        data: uniqueData,
      });
      setChartData(uniqueData);
      setIsCronJobTriggered(true);
    } catch (error) {
      console.error('Error updating server data:', error);
    }
  };

  const toast = (message, duration = 10000) => {
    // This is a placeholder implementation, replace with your own logic
    console.log(`TOAST: ${message}, Duration: ${duration}`);
  };

  const confirm = (message) => window.confirm(message);

  const triggerCronJob = async () => {
    const now = Date.now();
    const timestampsLastMinute = cronTriggerTimestamps.filter(
      (timestamp) => now - timestamp < 60000
    );

    if (timestampsLastMinute.length >= 5) {
      toast(
        'Cron job has been triggered the maximum number of times in the last minute'
      );
      return;
    }

    setIsLoading(true);
    setCronActive(true);
    setCronCounter(cronCounter + 1);
    setIsCronJobTriggered(true);
    setCronTriggerTimestamps([...timestampsLastMinute, now]);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/other/cron/update`
      );
      setCronData({ ...cronData, totalJobs: response.data.totalRuns });
      setAllUpdatedPrices(response.data.allUpdatedPrices);
      // setPrices({ ...prices, allUpdated: response.data.allUpdatedPrices });
      toast('Cron job triggered successfully');
    } catch (error) {
      console.error('Error triggering the cron job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSpecificItem = async (itemType, itemId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/other/update/${itemType}/${itemId}`
      );
      const updatedTotalPrice = response.data.updatedTotalPrice;

      if (itemType === 'Collection') {
        setTotalCollectionPrice(updatedTotalPrice);
      } else if (itemType === 'Deck') {
        setTotalDeckPrice(updatedTotalPrice);
      }

      setUpdatedPrice(response.data.updatedPrice);
    } catch (error) {
      console.error(`Error updating ${itemType}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCronJob = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/other/cron/stopAndReset`
      );

      setCronActive(false);
      setCronCounter(0);
      toast('Cron job stopped successfully');
    } catch (error) {
      console.error('Error stopping the cron job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Perform actions that should be done on component mount
    // For example, you might want to fetch data:
    if (userId) fetchData();

    // Optional: return a clean-up function
    return () => {
      // Clean up actions if any
    };
  }, [userId]); // Re-run useEffect when userId changes

  // ... Other possible useEffect hooks

  const value = {
    chartData,
    setChartData,
    isLoading,
    setIsLoading,
    cronActive,
    setCronActive,
    searchParams,
    setSearchParams,
    totalCardPrice,
    setTotalCardPrice,
    updatedPrice,
    setUpdatedPrice,
    allUpdatedPrices,
    setAllUpdatedPrices,
    cronCounter,
    setCronCounter,
    totalDeckPrice,
    setTotalDeckPrice,
    totalCronJobs,
    setTotalCronJobs,
    totalCollectionPrice,
    setTotalCollectionPrice,
    cronTriggerTimestamps,
    setCronTriggerTimestamps,
    isCronJobTriggered,
    setIsCronJobTriggered,
    cronData,
    setCronData,
    fetchData,
    updateServerData,
    toast,
    confirm,
    triggerCronJob,
    updateSpecificItem,
    stopCronJob,
  };

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
