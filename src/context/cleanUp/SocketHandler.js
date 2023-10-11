// import React, { createContext, useCallback, useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const SocketContext = createContext();

// const SocketHandler = ({ children }) => {
// 	const { userCookie } = useCookies(['userCookie']);
//   const [state, setState] = useState(initialState);
//   const userId = userCookie?.id;

//   // const { fetchData, updateServerData } = useApiServiceProvider();
//   const updateStateProperty = useCallback((property, value) => {
//     setState((prevState) => ({ ...prevState, [property]: value }));
//   }, []);
//   const setChartData = useCallback((newChartData) => {
//     setState((prevState) => ({ ...prevState, chartData: newChartData }));
//   }, []);
//   const setCollectionData = useCallback((newCollectionData) => {
//     setState((prevState) => ({
//       ...prevState,
//       collectionData: newCollectionData,
//     }));
//   }, []);
//   const handleExistingCollectionData = useCallback(
//     (existingCollectionData) => {
//       setCollectionData(existingCollectionData);
//     },
//     [setChartData]
//   );

//   const handleExistingChartData = useCallback(
//     (existingChartData) => {
//       setChartData(existingChartData);
//     },
//     io.emit('SEND_C2S_CHART_UPDATE', {
//       data: { data: existingChartData },
//     }),
//     [setChartData]
//   );

//   const handleUpdateChartData = useCallback((data) => {
//     setState((prevState) => ({
//       ...prevState,
//       chartData: [...prevState.chartData, ...data],
//     }));
//   }, []);

//   const handleUpdateCollectionData = useCallback((updatedCollectionData) => {
//     setState((prevState) => ({
//       ...prevState,
//       collectionData: updatedCollectionData,
//     }));
//   }, []);

//   const handleDataUpdate = useCallback((dataUpdate) => {
//     console.log('HANDLING DATA UPDATE:', dataUpdate);
//     const { userId, chartId, name, datasets } = dataUpdate;

//     io.emit('SEND_C2S_CHART_UPDATE', {
//       data: { userId, chartId, name, datasets },
//     });
//   }, []);

//   const handleReturnValue = useCallback((returnValue) => {
//     // Logic to handle 'returnvalue' event
//     // Example: Maybe update a state or log to console
//   }, []);

//   const handleAllItemsUpdated = useCallback((updatedItems) => {
//     state.setAllItems(updatedItems);
//     // Additional logic as needed
//   }, []);

//   const handleUpdateError = useCallback((errorInfo) => {
//     // Logic to handle errors during the update
//     // E.g., show a notification to the user
//   }, []);

//   const handleS2CChartUpdate = useCallback((s2cUpdate) => {
//     console.log('S2C UPDATE:', s2cUpdate);
//     io.emit('RECEIVE_C2C_CHART_UPDATE', (s2cUpdate) => {
//       console.log('S2C UPDATE:', s2cUpdate);
//     });
//   }, []);
// };

// const value = {
// 	handleExistingCollectionData,
// 	handleExistingChartData,
// 	handleUpdateChartData,
// 	handleUpdateCollectionData,
// 	handleDataUpdate,
// 	handleReturnValue,
// 	handleAllItemsUpdated,
// 	handleUpdateError,
// 	handleS2CChartUpdate
// };

// return (
// 	<SocketContext.Provider value={value}>
// 		{children}
// 	</SocketContext.Provider>
// );
// };

// // 3. Export the provider and a custom hook to access the context
// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return context;
// };

// export { SocketProvider };
