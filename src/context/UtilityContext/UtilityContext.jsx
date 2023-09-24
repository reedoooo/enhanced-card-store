import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP library

// Create UtilityContext
export const UtilityContext = createContext();

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

// Create UtilityProvider component
export const UtilityProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cronActive, setCronActive] = useState(false);
  const [searchParams, setSearchParams] = useState(initialState);
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [allUpdatedPrices, setAllUpdatedPrices] = useState([]);
  const [cronCounter, setCronCounter] = useState(0);
  // const [cronData, setCronData] = useState({});
  const [totalDeckPrice, setTotalDeckPrice] = useState(0);
  const [totalCronJobs, setTotalCronJobs] = useState(0);
  const [totalCollectionPrice, setTotalCollectionPrice] = useState(0); // Initialize the state
  const [prices, setPrices] = useState({
    totalCard: 0,
    updated: 0,
    allUpdated: [],
    totalDeck: 0,
    totalCollection: 0,
  });
  const [cronData, setCronData] = useState({
    counter: 0,
    totalJobs: 0,
  });
  // Toast and confirm functions
  const toast = (message, duration = 10000) => {
    /* Implementation */
  };
  const confirm = (message) => window.confirm(message);
  // Function to trigger cron job
  const triggerCronJob = async () => {
    setIsLoading(true);
    setCronActive(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/other/cron/update`
      );
      setCronData({ ...cronData, totalJobs: response.data.totalRuns });
      setPrices({ ...prices, allUpdated: response.data.allUpdatedPrices });
      toast('Cron job triggered successfully');
    } catch (error) {
      console.error('Error triggering the cron job:', error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('CRON DAT RUN ROUNTER GEST 2', cronCounter);

  const updateSpecificItem = async (itemType, itemId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/other/update/${itemType}/${itemId}`
      );
      const updatedTotalPrice = response.data.updatedTotalPrice;

      // Update the total price of the specific item in the state
      if (itemType === 'Collection') {
        setTotalCollectionPrice(updatedTotalPrice);
      } else if (itemType === 'Deck') {
        setTotalDeckPrice(updatedTotalPrice);
      }

      // Update the total price of the specific item in the state
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
      console.log('CRON JOB IS NO LONGER RUNNING:', response.data);
      // setTotalCronJobs(response.data.totalRuns);
      // setAllUpdatedPrices(response.data.allUpdatedPrices);

      toast('Cron job stopped successfully');
    } catch (error) {
      console.error('Error stopping the cron job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    searchParams,
    setSearchParams,
    totalCardPrice,
    setTotalCardPrice,
    totalCollectionPrice,
    setTotalCollectionPrice,
    totalDeckPrice,
    setTotalDeckPrice,
    totalCronJobs,
    setTotalCronJobs,
    updatedPrice,
    setUpdatedPrice,
    allUpdatedPrices,
    setAllUpdatedPrices,
    cronCounter,
    setCronCounter,
    cronData,
    setCronData,
    updateSpecificItem, // Add the new function to the context
    isLoading,
    setIsLoading,
    toast,
    confirm,
    stopCronJob,
    triggerCronJob, // Add the triggerCronJob function to the context
  };

  return (
    <UtilityContext.Provider value={value}>{children}</UtilityContext.Provider>
  );
};
export const useUtility = () => {
  const context = useContext(UtilityContext);
  if (context === undefined) {
    throw new Error('useUtility must be used within a UtilityProvider');
  }
  return context;
};
// Create a custom hook for easy access to the context
// export const useUtility = (initialState) => {
//   const context = useContext(UtilityContext);
//   if (!context) {
//     throw new Error('useUtility must be used within a UtilityProvider');
//   }
//   return {
//     ...context,
//     isLoading: context.isLoading || false,
//     cronData: context.cronData || {},
//     totalCardPrice: context.totalCardPrice,
//     updatedPrice: context.updatedPrice,
//     totalCronJobs: context.totalCronJobs,
//     allUpdatedPrices: context.allUpdatedPrices || [],
//     totalDeckPrice: context.totalDeckPrice,
//     totalCollectionPrice: context.totalCollectionPrice,
//     // cronJobRunCounter: context.cronCounter,
//     stopCronJob: context.stopCronJob || (() => null),
//     triggerCronJob: context.triggerCronJob || (() => null),
//   };
// };
