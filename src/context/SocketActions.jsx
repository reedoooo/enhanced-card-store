import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSocket } from './SocketProvider';

const SocketActionsContext = createContext();

export const useSocketActions = () => {
  return useContext(SocketActionsContext);
};
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
  error: null,
  prices: {
    totalCard: 0,
    updated: 0,
    allUpdated: [],
    totalDeck: 0,
    totalCollection: 0,
  },
  cronData: {}, // Added cronData to initialState as it is referred in your code
  isDelaying: false, // Added isDelaying to initialState as it is referred in your code
  isCronJobTriggered: false, // Added isCronJobTriggered to initialState as it is referred in your code
};

export const SocketActionsProvider = ({ children }) => {
  const socket = useSocket();
  const [receivedMessage, setReceivedMessage] = useState(null);
  // const [chartData, setChartData] = useState();
  const [collectionData, setCollectionData] = useState();

  const [state, setState] = useState(initialState);
  /**
   * Custom hook to manage socket events
  //  * @param {Socket} socket - the socket.io client socket
  //  * @param {Array} events - array of event objects containing `event` and `handler` properties
   */
  // const updateStateProperty = useCallback((property, value) => {
  //   setState((prevState) => ({ ...prevState, [property]: value }));
  // }, []);
  // const setChartData = useCallback((newChartData) => {
  //   setState((prevState) => ({ ...prevState, chartData: newChartData }));
  // }, []);
  // const setCollectionData = useCallback((newCollectionData) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     collectionData: newCollectionData,
  //   }));
  // }, []);
  const sendMessage = useCallback(
    (message) => {
      if (socket) {
        console.log('Sending message:', message);
        const data = message;
        // socket.emit('connection');
        socket.emit('MESSAGE_FROM_CLIENT', data);
      } else {
        console.error('Socket is not connected!');
      }
    },
    [socket]
  );

  const receiveMessage = useCallback((message) => {
    console.log('Received message:', message);
    setReceivedMessage(message);
    // handleHelloReply;
    // You might perform additional actions upon receiving a message here.
  }, []);

  // const handleRequestCollectionData = useCallback(() => {
  //   if (socket) socket.emit('EXISTING_COLLECTION_DATA', {});
  // }, [socket]);

  // const handleExistingCollectionData = (data) => {
  //   console.log('Received existing collection data:', data.data);
  //   setCollectionData(data.data);
  // };

  // Attach the event listener
  // socket.on('SEND_S2C_EXISTING_COLLECTION', handleExistingCollectionData);
  // const handleExistingChartData = useCallback(
  //   (existingChartData) => {
  //     setChartData(existingChartData);
  //   },
  //   [setChartData]
  // );

  // const handleUpdateChartData = useCallback((data) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     chartData: [...prevState.chartData, ...data],
  //   }));
  // }, []);

  const handleUpdateCollectionData = useCallback((updatedCollectionData) => {
    setState((prevState) => ({
      ...prevState,
      collectionData: updatedCollectionData,
    }));
  }, []);

  // const handleDataUpdate = useCallback((dataUpdate) => {
  //   console.log('HANDLING DATA UPDATE:', dataUpdate);
  //   const { userId, chartId, name, datasets } = dataUpdate;
  //   socket.emit('SEND_C2S_CHART_UPDATE', {
  //     data: { userId, chartId, name, datasets },
  //   });
  // }, []);

  // const handleS2CChartUpdate = useCallback((s2cUpdate) => {
  //   console.log('S2C UPDATE:', s2cUpdate);
  //   socket.emit('RECEIVE_C2C_CHART_UPDATE', s2cUpdate);
  // }, []);

  // const handleNewChartData = useCallback((newData) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     chartData: [...prevState.chartData, ...newData],
  //   }));
  // }, []);

  // useEffect(() => {
  //   if (!socket) return;

  //   const handleNewChartData = (newData) => {
  //     setState((prevState) => ({
  //       ...prevState,
  //       chartData: [...prevState.chartData, ...newData],
  //     }));
  //   };

  //   socket.on('NEW_CHART_DATA', handleNewChartData);

  //   return () => {
  //     socket.off('NEW_CHART_DATA', handleNewChartData);
  //   };
  // }, [socket]);

  return (
    <SocketActionsContext.Provider
      value={{
        sendMessage,
        // handleRequestCollectionData,
        receiveMessage,
        // handleExistingCollectionData,
        // handleExistingChartData,
        // handleExistingCollectionData,
        // handleUpdateChartData,
        // handleUpdateCollectionData,
        // handleDataUpdate,
        // handleS2CChartUpdate,
      }}
    >
      {children}
    </SocketActionsContext.Provider>
  );
};
