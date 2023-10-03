// import { useCallback, useMemo } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useCombinedContext } from './CombinedProvider';
// import useSocket from './SocketProvider';

// export const useApiServiceProvider = () => {
//   const BASE_API_URL_CHARTS = `${process.env.REACT_APP_SERVER}/other/chart-data`;
//   const { userCookie } = useCookies(['userCookie']);
//   const { userId } = userCookie || {};
//   const { setState, setChartData, setIsCronJobTriggered } =
//     useCombinedContext();
//   const socket = useSocket();

//   const fetchData = useCallback(async () => {
//     if (!userId) return;

//     setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

//     try {
//       const response = await axios.get(
//         `${BASE_API_URL_CHARTS}/charts/${userId}`
//       );
//       setChartData(response?.data);
//     } catch (error) {
//       console.error('Error fetching updated data:', error);
//       setState((prevState) => ({ ...prevState, error: 'Error fetching data' }));
//     } finally {
//       setState((prevState) => ({ ...prevState, isLoading: false }));
//     }
//   }, [userId, setChartData, setState]); // Added `setState` to dependencies

//   const updateServerData = useCallback(
//     async (updatedData) => {
//       if (!userId) return;

//       const uniqueData = useMemo(
//         () =>
//           Array.from(
//             new Set(
//               (updatedData || [])
//                 .flatMap((obj) => obj.data || [])
//                 .map(JSON.stringify)
//             )
//           ).map(JSON.parse),
//         [updatedData]
//       );

//       try {
//         const chartId = updatedData?._id || 'all';
//         const name = updatedData?.name || 'all';

//         const response = await axios.post(
//           `${BASE_API_URL_CHARTS}/charts/${userId}/${chartId}/updateChart`,
//           { userId, chartId, name, datasets: uniqueData }
//         );

//         socket.emit('RECEIVE_C2S_CHART_UPDATE', {
//           userId,
//           chartId,
//           name,
//           datasets: uniqueData,
//         });

//         setState((prevState) => ({ ...prevState, chartData: uniqueData }));
//         setIsCronJobTriggered(true);
//       } catch (error) {
//         console.error('Error updating server data:', error);
//       }
//     },
//     [userId, setIsCronJobTriggered, setState, BASE_API_URL_CHARTS, socket]
//   );

//   return { fetchData, updateServerData };
// };
import React, { createContext, useContext, useCallback } from 'react';
import axios from 'axios';

export const ApiContext = createContext();

export const ApiServiceProvider = ({ children }) => {
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/other/cron`;

  const getRequest = useCallback(async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`GET Error: ${error}`);
      throw error;
    }
  }, []);

  const postRequest = useCallback(async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`POST Error: ${error}`);
      throw error;
    }
  }, []);

  const putRequest = useCallback(async (endpoint, data) => {
    try {
      const response = await axios.put(`${BASE_API_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`PUT Error: ${error}`);
      throw error;
    }
  }, []);

  const deleteRequest = useCallback(async (endpoint) => {
    try {
      const response = await axios.delete(`${BASE_API_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`DELETE Error: ${error}`);
      throw error;
    }
  }, []);

  return (
    <ApiContext.Provider
      value={{ getRequest, postRequest, putRequest, deleteRequest }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiService = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiService must be used within an ApiServiceProvider');
  }
  return context;
};
