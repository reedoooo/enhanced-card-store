import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { UtilityContext } from '../UtilityContext/UtilityContext';

export const ChartContext = createContext();

export const ChartDataProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);
  const [{ userCookie }] = useCookies(['userCookie']);
  const userId = userCookie?.id;
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/chart-data`;
  const [isUpdated, setIsUpdated] = useState(false);
  const { isCronJobTriggered } = useContext(UtilityContext);

  const fetchData = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_API_URL}/${userId}`);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching updated data:', error);
      // More informative error handling can be added here
    }
  };

  // Effect for initial data fetch or when cron job triggers
  useEffect(() => {
    if (isCronJobTriggered) {
      fetchData();
      if (isUpdated) setIsUpdated(false);
    }
  }, [isCronJobTriggered, isUpdated, userId]);

  const updateServerData = async (updatedData) => {
    if (!userId) return;

    const reducedData = updatedData?.reduce((accumulator, currentObject) => {
      if (currentObject?.data && currentObject?.data?.length > 0) {
        accumulator = [...accumulator, ...currentObject.data];
      }
      return accumulator;
    }, []);

    // Filter out identical data
    const uniqueData = Array.from(
      new Set(reducedData?.map(JSON.stringify))
    ).map(JSON.parse);

    try {
      await axios.post(`${BASE_API_URL}/updateChart/${userId}`, {
        data: uniqueData,
        datasets: uniqueData,
      });
      setChartData(uniqueData);
    } catch (error) {
      console.error('Error updating server data:', error);
      // More informative error handling can be added here
    }
  };

  return (
    <ChartContext.Provider
      value={{
        chartData,
        setChartData,
        updateServerData,
        isUpdated,
        setIsUpdated,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
