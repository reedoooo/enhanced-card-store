import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const ChartContext = createContext();

export const ChartDataProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);
  const [cookies] = useCookies(['userCookie']);
  const userId = cookies.userCookie?.id;
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/chart-data`;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${BASE_API_URL}/${userId}`);
        console.log('CHART CONTEXT SERVER RESPONSE (GET):', response);
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching initial data', error);
      }
    };

    fetchData();
  }, [userId]);

  const updateServerData = async (updatedData) => {
    if (!userId) return;
    console.log('CHART CONTEXT UPDATED DATA:', updatedData);

    const reducedData = updatedData?.reduce((accumulator, currentObject) => {
      if (currentObject?.data && currentObject?.data?.length > 0) {
        accumulator = [...accumulator, ...currentObject.data];
      }
      return accumulator;
    }, []);

    console.log('CHART CONTEXT REDUCED DATA:', reducedData);

    // Filter out identical data
    const uniqueData = Array.from(
      new Set(reducedData?.map(JSON.stringify))
    ).map(JSON.parse);
    console.log('CHART CONTEXT UNIQUE DATA:', uniqueData);

    try {
      await axios.post(`${BASE_API_URL}/updateChart/${userId}`, {
        data: uniqueData,
        datasets: uniqueData,
      });

      console.log('CHART CONTEXT SERVER RESPONSE (POST):', uniqueData);
      setChartData(uniqueData);
    } catch (error) {
      console.error('Error sending data', error);
    }
  };

  return (
    <ChartContext.Provider value={{ chartData, updateServerData }}>
      {children}
    </ChartContext.Provider>
  );
};
