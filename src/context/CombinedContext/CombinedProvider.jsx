import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { CollectionContext } from '../CollectionContext/CollectionContext';
import { useSocketContext } from '../SocketContext/SocketProvider';
import {
  filterNullPriceHistory,
  filterNullPriceHistoryForCollection,
} from '../CollectionContext/helpers';
import {
  generateListOfMonitoredCards,
  updateCardPricesInList,
  initialState,
} from './helpers';
export const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
  const [cookies] = useCookies(['user']);
  const [state, setState] = useState(initialState);
  const user = cookies.user;
  const userId = user?.id;
  const {
    selectedCollection,
    updateCollection,
    allCollections,
    getNewTotalPrice,
    updateCollectionState,
    getUpdatedCollection,
  } = useContext(CollectionContext);
  const socket = useSocketContext();

  const createStateUpdaterFunction = (key) =>
    useCallback(
      (data) => {
        setState((prev) => {
          let newData;

          // validateData(data, key, 'createStateUpdaterFunction');
          if (Array.isArray(data)) {
            newData = [...data];
          } else if (typeof data === 'object' && data !== null) {
            newData = { ...data };
          } else {
            newData = data;
          }
          return { ...prev, [key]: newData };
        });
      },
      [setState]
    );

  const setDataFunctions = {
    data: createStateUpdaterFunction('chartData'),
    userData: createStateUpdaterFunction('userData'),
    messageTest: createStateUpdaterFunction('messageTest'),
    finalUpdateData: createStateUpdaterFunction('finalUpdateData'),
    chartData: createStateUpdaterFunction('chartData'),
    existingChartData: createStateUpdaterFunction('existingChartData'),
    listOfSimulatedCards: createStateUpdaterFunction('listOfSimulatedCards'),
    // cardStats: createStateUpdaterFunction('cardStats'),
    cardPrices: createStateUpdaterFunction('cardPrices'),
    allCardPrices: createStateUpdaterFunction('allCardPrices'),
    retrievedListOfMonitoredCards: createStateUpdaterFunction(
      'retrievedListOfMonitoredCards'
    ),
    // allData: createStateUpdaterFunction('allData'),
    cronData: createStateUpdaterFunction('cronData'),
    error: createStateUpdaterFunction('error'),
    // updatedChartData: createStateUpdaterFunction('updatedChartData'),
    currentChartData: createStateUpdaterFunction('currentChartData'),
    simData: createStateUpdaterFunction('simData'),
    checkAndUpdateCardPrice: createStateUpdaterFunction(
      'checkAndUpdateCardPrice'
    ),
    collectionData: createStateUpdaterFunction('collectionData'),
    allCollectionData: createStateUpdaterFunction('allCollectionData'),
    emittedResponses: createStateUpdaterFunction('emittedResponses'),
    eventsTriggered: createStateUpdaterFunction('eventsTriggered'),
    isDelaying: createStateUpdaterFunction('isDelaying'),
    isCronJobTriggered: createStateUpdaterFunction('isCronJobTriggered'),
  };

  const setLoader = (isLoading) => {
    if (typeof isLoading !== 'boolean') {
      console.error('Invalid argument type for setLoader: Expected boolean');
      return;
    }
    setState((prev) => ({ ...prev, isLoading }));
  };

  useEffect(() => {
    if (state.eventsTriggered) {
      console.log(`Handling event: ${state.eventsTriggered.eventName}`);
    }
  }, [state?.eventsTriggered]);

  // ----------- XXX -----------

  const listOfMonitoredCards = useMemo(
    () => generateListOfMonitoredCards(allCollections),
    [allCollections]
  );

  const handleStatusUpdateCharts = async (newData) => {
    console.log('[STATUS_UPDATE_CHARTS] Data:', newData);
    let updatedCollection = { ...selectedCollection };

    console.log('Updated collection in combined:', updatedCollection);
    return updatedCollection;
  };
  const handleReceive = (message) => {
    console.log('Received message:', message);
    setDataFunctions.messageTest(message);
  };

  const handleSimulationPriceResponse = (updates) => {
    console.log('Received scheduled price update:', updates);
    setDataFunctions.simData(updates); // Update with new data
  };

  const handleEventResponse = (newData) => {
    const { message, data } = newData;
    console.log('EVENT_RESPONSE:', message, data);
    setDataFunctions.eventsTriggered(data);
  };

  // const handleStatusUpdatePrice = (data) => {
  //   console.log('STATUS_UPDATE_PRICE:', data);
  //   setDataFunctions.priceDifference(data);
  // };

  const handleStatusUpdateCron = (newData) => {
    const { message, data } = newData;
    // console.log('[STATUS_UPDATE_CRON]', message, data);
    if (!Array.isArray(data) || !data.data || data.data.length === 0) {
      return null;
    }
    setDataFunctions.data(data);
  };

  const handleError = (errorData) => {
    console.error('Error received:', errorData);
    setDataFunctions.error(errorData);
  };

  // const handleExistingCollectionData = (collectionData) => {
  //   console.log('Existing collection data:', collectionData);
  //   setDataFunctions.collectionData(collectionData);
  // };

  const handleCardPricesUpdated = async (priceData) => {
    console.log('Card prices retrieved:', priceData);
    const updatedCardPrices = priceData.data.data;
    const userId = user?.id;

    // Generate list of monitored cards from all collections
    const currentListOfMonitoredCards =
      generateListOfMonitoredCards(allCollections);
    console.log(
      `[currentListOfMonitoredCards: $${getNewTotalPrice(
        currentListOfMonitoredCards
      )}] | `,
      currentListOfMonitoredCards
    );

    // Update card prices in the list of monitored cards
    const updatedListOfMonitoredCards = updateCardPricesInList(
      currentListOfMonitoredCards,
      updatedCardPrices
    );
    console.log(
      `[updatedListOfMonitoredCards: $${getNewTotalPrice(
        updatedListOfMonitoredCards
      )}] | `,
      updatedListOfMonitoredCards
    );

    // Update the selected collection with new card prices
    const updatedSelectedCollectionCards = selectedCollection.cards.map(
      (card) => {
        const updatedCardPrice = updatedListOfMonitoredCards.find(
          (updatedCard) => updatedCard.id === card.id
        );
        return updatedCardPrice ? { ...card, ...updatedCardPrice } : card;
      }
    );

    // Create an updated collection object
    const updatedCollection = {
      ...selectedCollection,
      cards: updatedSelectedCollectionCards,
    };

    // Filter out collections with null price history
    const filteredUpdatedCollection =
      filterNullPriceHistoryForCollection(updatedCollection);

    try {
      // Update each card in the collection
      for (const card of filteredUpdatedCollection.cards) {
        const updatedCollectionResult = await getUpdatedCollection(
          filteredUpdatedCollection,
          card, // No specific card to update
          'update', // Operation type
          userId
        );

        if (updatedCollectionResult) {
          // console.log(
          //   'UPDATED COLLECTION RESULT IN COMBINED:',
          //   updatedCollectionResult.filteredRestructuredCollection
          // );
          updateCollectionState(
            updatedCollectionResult.filteredRestructuredCollection
          );
          setDataFunctions.listOfSimulatedCards(
            updatedCollectionResult.filteredRestructuredCollection.cards
          );
        }
      }
    } catch (error) {
      console.error('Failed to update collection:', error);
    }

    // Update the global state with the new card prices
    setDataFunctions.allCardPrices(updatedListOfMonitoredCards);
  };

  // const handleNoPricesChanged = () => {
  //   console.log('No prices changed');
  //   // Perform any necessary actions when no prices have changed
  // };

  useEffect(() => {
    if (!socket) return;

    const eventHandlers = new Map([
      ['STATUS_UPDATE_CHARTS', handleStatusUpdateCharts],
      ['MESSAGE_TO_CLIENT', handleReceive],
      ['SIMULATION_CRON_PRICE_RESPONSE', handleSimulationPriceResponse],
      ['EVENT_RESPONSE', handleEventResponse],
      // ['STATUS_UPDATE_PRICE', handleStatusUpdatePrice],
      ['STATUS_UPDATE_CRON', handleStatusUpdateCron],
      // ['CHART_CRON_RESPONSE', handleChartCronResponse],
      // ['HANDLE_CRON_JOB_RESPONSE', handleCronJobResponse],
      ['ERROR', handleError],
      // ['EMITTED_RESPONSES', handleEmittedResponses],
      // ['RESPONSE_CRON_DATA', handleCronJobTracker],
      // ['RESPONSE_EXISTING_COLLECTION_DATA', handleExistingCollectionData],
      // ['RESPONSE_EXISTING_CHART_DATA', handleExistingChartData],
      // ['CHART_DATASETS_UPDATED', handleChartDatasetsUpdated],
      ['SEND_PRICING_DATA_TO_CLIENT', handleCardPricesUpdated],
      // ['NO_PRICE_CHANGES', handleNoPricesChanged],
      // ['SEND_UPDATED_DATA_TO_CLIENT', handleNewCardDataObject],
      // ['SEND_FINAL_UPDATE_TO_CLIENT', handleFinalUpdateToClient],
      // [
      //   'INITIATE_SCHEDULE_CHECK_CARD_PRICES',
      //   handleInitiateScheduleCheckCardPrices,
      // ],
      // ['INITIATE_HANDLE_CHECK_CARD_PRICES', handleInitiateCheckCardPrices],
      // ['INITIATE_UPDATE_USER_DATA', handleUpdateUserData],
      // ['INITIATE_UPDATE_USER_COLLECTIONS_SOCKET', handleUpdateUserCollection],
      // ['COLLECTION_SYNCED', handleUpdateAndSyncUserCollection],
      // ... any other event handlers
    ]);
    eventHandlers.forEach((handler, event) => {
      socket.on(event, handler);
    });

    return () => {
      eventHandlers.forEach((_, event) => {
        socket.off(event);
      });
    };
  }, [socket, state, setDataFunctions]);

  // ----------- DATA PROCESSING & HANDLERS -----------

  const handleSocketInteraction = {
    requestData: {
      collection: (userId, selectedCollection) => {
        if (!userId || !selectedCollection) {
          logError(
            'Missing userId or selectedCollection for collection data request'
          );
          return;
        }
        socket?.emit('REQUEST_EXISTING_COLLECTION_DATA', {
          userId,
          data: selectedCollection,
        });
      },
    },
    sendAction: {
      message: (message) => {
        if (!message) return console.error('Message content is missing.');
        socket?.emit('MESSAGE_FROM_CLIENT', { message, data: message });
      },
      stopCronJob: (userId) => {
        if (!userId) return console.error('Missing userId for cron job stop.');
        socket?.emit('REQUEST_CRON_STOP', { userId });
      },
      checkAndUpdateCardPrices: (
        userId,
        listOfMonitoredCards
        // retrievedListOfMonitoredCards
      ) => {
        if (!userId)
          return console.error('Missing userId or listOfMonitoredCards.');
        if (!listOfMonitoredCards || listOfMonitoredCards.length === 0)
          return console.error('Missing retrievedListOfMonitoredCards.');
        let attempt2;
        if (!Array.isArray(listOfMonitoredCards)) {
          console.warn(
            'INITIAL LISTOFMONITOREDCARDSVALUE NOT AN ARRAY, ATTEMPTING TO RETREIVE AND TRY AGAIN',
            listOfMonitoredCards
          );
          attempt2 = generateListOfMonitoredCards(allCollections);
          console.log('ATTEMPT 2', attempt2);

          if (!attempt2 || attempt2.length === 0) {
            console.error(
              'ATTEMPT 2 FAILED, listOfMonitoredCards IS NOT AN ARRAY'
            );
            return;
          }
        }
        console.log(
          'SENDING CHECK AND UPDATE CARD PRICES',
          listOfMonitoredCards
        );
        const selectedList = listOfMonitoredCards
          ? listOfMonitoredCards
          : attempt2;
        socket?.emit('REQUEST_CRON_UPDATED_CARDS_IN_COLLECTION', {
          userId,
          data: {
            selectedList,
          },
        });
      },
      checkPriceUpdates: (
        userId,
        listOfMonitoredCards,
        allCollections,
        cardsWithChangedPrice
      ) => {
        if (!userId)
          return console.log('Missing userId or listOfMonitoredCards.');
        if (!listOfMonitoredCards)
          return console.log('Missing retrievedListOfMonitoredCards.');
        if (!allCollections) return console.log('Missing allCollections.');
        const filteredAllCollections = filterNullPriceHistory(allCollections);
        const selectedList = listOfMonitoredCards;
        socket.emit('REQUEST_PRICES_ACTIVATE_CRON', {
          userId,
          data: {
            userId,
            selectedList,
            allCollections: filteredAllCollections,
            cardsWithChangedPrice,
          },
        });
      },
      triggerCronJob: (userId, listOfMonitoredCards) => {
        if (!userId)
          return console.error('Missing userId for cron job trigger.');

        // Emit the START_CRON_JOB event with userId and listOfMonitoredCards
        socket.emit('START_CRON_JOB', { userId, listOfMonitoredCards });
      },
    },
  };

  const confirm = (message) => window.confirm(message);

  useEffect(() => {
    // Update the collectionData state when selectedCollection changes
    setDataFunctions.collectionData(selectedCollection);
  }, [selectedCollection]);

  useEffect(() => {
    if (allCollections) {
      // console.log('ALLL', allCollections);
      if (
        JSON.stringify(allCollections) !==
        JSON.stringify(state.allCollectionData)
      ) {
        const filteredAllCollections = filterNullPriceHistory(allCollections);
        console.log('FILTERED ALL COLLECTIONS:', filteredAllCollections);
        setDataFunctions.allCollectionData(filteredAllCollections);
      }
    }
  }, [allCollections]);
  useEffect(() => {
    if (user) {
      // console.log('userId', user.userId);
      setDataFunctions.userData(user);
    }
  }, [user]);

  const logError = (message) => console.error(message);

  // ----------- CONTEXT VALUE -----------

  const value = useMemo(
    () => ({
      ...state,
      ...setDataFunctions,
      listOfMonitoredCards,
      confirm,
      setLoader,
      handleCronRequest: handleSocketInteraction.sendAction.triggerCronJob,
      handleSend: handleSocketInteraction.sendAction.message,
      handleRequestCollectionData:
        handleSocketInteraction.requestData.collection,
      // handleRequestChartData: handleSocketInteraction.requestData.chart,
      handleSendAllCardsInCollections:
        handleSocketInteraction.sendAction.checkAndUpdateCardPrices,
      handleRequestCronStop: handleSocketInteraction.sendAction.stopCronJob,
      handlePricesActivateCron:
        handleSocketInteraction.sendAction.checkPriceUpdates,
      handleSocketInteraction,
      socket,
      isDelaying: state.isDelaying,
      isCronJobTriggered: state.isCronJobTriggered,
    }),
    [state, socket]
  );

  // Log combined context value for debugging
  useEffect(() => {
    console.log('COMBINED CONTEXT:', state);
  }, [userId, setDataFunctions.allCollectionData]);

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
