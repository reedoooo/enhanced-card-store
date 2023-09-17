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
  const [searchParams, setSearchParams] = useState(initialState);
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [allUpdatedPrices, setAllUpdatedPrices] = useState([]);
  const [cronCounter, setCronCounter] = useState(0);
  const [cronData, setCronData] = useState({});

  // Toast function to display a message
  const toast = (message, duration = 2000) => {
    // Implement your toast logic here, for example using a library or custom component
    console.log(`Toast: ${message}`);
    setTimeout(() => {
      console.log('Toast dismissed');
    }, duration);
  };

  // Confirm function to display a confirmation dialog
  const confirm = (message) => {
    // Implement your confirmation dialog logic here
    return window.confirm(message);
  };

  // Function to manually trigger the cron job
  const triggerCronJob = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/other/cron/update`
      );
      console.log('CRON JOB ALL DATA', response.data);
      console.log('Total price:', response.data.totalPrice);
      console.log('CRON RUN COUNTER:', response.data.cronJobRunCounter);
      // console.log('Updated price:', response.data[0].updatedPrice);
      console.log('All updated prices:', response.data.allUpdatedPrices);

      setCronData(response.data);

      setTotalCardPrice(response.data.totalCardPrice);
      // setUpdatedPrice(response.data[0].updatedPrice);
      setAllUpdatedPrices(response.data.allUpdatedPrices);
      setCronCounter(response.data.cronJobRunCounter);
      // Display a toast message
      toast('Cron job triggered successfully');

      // // Display a confirmation dialog
      // if (confirm('Cron job triggered successfully. Reload page?')) {
      //   window.location.reload();
      // }
      setTimeout(triggerCronJob, 100000); // Poll every 5 seconds (adjust as needed)

      // Update the total price
    } catch (error) {
      console.error('Error triggering the cron job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('CRON DAT RUN ROUNTER GEST 2', cronCounter);

  const value = {
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
    cronData,
    setCronData,
    isLoading,
    setIsLoading,
    toast,
    confirm,
    triggerCronJob, // Add the triggerCronJob function to the context
  };

  return (
    <UtilityContext.Provider value={value}>{children}</UtilityContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useUtility = (initialState) => {
  const context = useContext(UtilityContext);
  if (!context) {
    throw new Error('useUtility must be used within a UtilityProvider');
  }
  return {
    ...context,
    isLoading: context.isLoading || false,
    cronData: context.cronData || {},
    totalCardPrice: context.totalCardPrice,
    allUpdatedPrices: context.allUpdatedPrices || [],
    cronJobRunCounter: context.cronCounter,
    searchParams: context.searchParams || initialState,
  };
};
