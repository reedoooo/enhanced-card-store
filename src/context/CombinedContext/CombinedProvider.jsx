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
import { filterNullPriceHistoryForCollection } from '../CollectionContext/helpers';
import {
  generateListOfMonitoredCards,
  updateCardPricesInList,
  initialState,
} from './helpers';
import { useUnsavedCardsEffect } from '../hooks/useUnsavedCardsEffect';
export const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
  const [cookies] = useCookies(['authUser']);
  const [state, setState] = useState(initialState);
  const user = cookies?.authUser;
  const userId = user?.userId;
  const {
    selectedCollection,
    updateCollection,
    allCollections,
    getNewTotalPrice,
    updateCollectionState,
    updateAllCollectionState,
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
    chartData: createStateUpdaterFunction('chartData'),
    listOfSimulatedCards: createStateUpdaterFunction('listOfSimulatedCards'),
    cardPrices: createStateUpdaterFunction('cardPrices'),
    allCardPrices: createStateUpdaterFunction('allCardPrices'),
    retrievedListOfMonitoredCards: createStateUpdaterFunction(
      'retrievedListOfMonitoredCards'
    ),
    cronData: createStateUpdaterFunction('cronData'),
    error: createStateUpdaterFunction('error'),
    collectionData: createStateUpdaterFunction('collectionData'),
    allCollectionData: createStateUpdaterFunction('allCollectionData'),
    emittedResponses: createStateUpdaterFunction('emittedResponses'),
    eventsTriggered: createStateUpdaterFunction('eventsTriggered'),
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
    () => generateListOfMonitoredCards([allCollections]),
    [allCollections]
  );

  const handleReceive = (message) => {
    console.log('Received message:', message);
    setDataFunctions.messageTest(message);
  };
  const handleEventResponse = (newData) => {
    const { message, data } = newData;
    console.log('EVENT_RESPONSE:', message, data);
    setDataFunctions.eventsTriggered(data);
  };
  const handleStatusUpdateCron = (newData) => {
    const { message, data } = newData;
    // console.log('[STATUS_UPDATE_CRON]', message, data);
    if (!Array.isArray(data) || !data.data || data.data.length === 0) {
      return null;
    }
    setDataFunctions.data(data);
  };
  const handleCollectionsUpdated = async (data) => {
    const { message, updatedCards, allCollections } = data;
    console.log('message', message);
    console.log('updatedCards', updatedCards);
    console.log('allCollections', allCollections);
    // console.log('updatedCards', updatedCards);

    // Update the selected collection with new card prices
    // const updatedSelectedCollectionCards = selectedCollection.cards.map(
    //   (card) => {
    //     const updatedCardPrice = updatedCards.find(
    //       (updatedCard) => updatedCard.id === card.id
    //     );
    //     return updatedCardPrice ? { ...card, ...updatedCardPrice } : card;
    //   }
    // );
    if (!allCollections) return;
    if (!Array.isArray(allCollections)) return;
    // const updatedCardsLocalAndRemote = useUnsavedCardsEffect(
    //   allCollections,
    //   userId
    // );
    // console.log('UPDATED CARDS', updatedCardsLocalAndRemote);
    for (const collection of allCollections) {
      updateAllCollectionState(collection);
    }
    setDataFunctions.data(allCollections);
    setDataFunctions.allCardPrices(updatedCards);
  };
  const handlePricesUnchanged = (data) => {
    const { message, currentPrices } = data;
    console.log('message', message);
    // console.log('currentPrices', currentPrices);
    setDataFunctions.cardPrices(currentPrices);
  };
  const handleError = (errorData) => {
    console.log('ERROR RECEIVED', errorData);
    const { status, message, error } = errorData;
    console.log('ERROR RECEIVED');
    console.log('ERROR STATUS: ', status);
    console.log('ERROR MESSAGE: ', message);
    console.log('ERROR DATA: ', error);
    setDataFunctions.error(error);
  };
  const handleCardPricesUpdated = async (priceData) => {
    console.log('Card prices retrieved:', priceData);
    const updatedCardPrices = priceData.data.data;
    const userId = user?.id;

    const currentListOfMonitoredCards =
      generateListOfMonitoredCards(allCollections);
    console.log(
      `[currentListOfMonitoredCards: $${getNewTotalPrice(
        currentListOfMonitoredCards
      )}] | `,
      currentListOfMonitoredCards
    );
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

    const updatedSelectedCollectionCards = selectedCollection.cards.map(
      (card) => {
        const updatedCardPrice = updatedListOfMonitoredCards.find(
          (updatedCard) => updatedCard.id === card.id
        );
        return updatedCardPrice ? { ...card, ...updatedCardPrice } : card;
      }
    );

    const updatedCollection = {
      ...selectedCollection,
      cards: updatedSelectedCollectionCards,
    };

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

  useEffect(() => {
    if (!socket) return;
    const eventHandlers = new Map([
      ['MESSAGE_TO_CLIENT', handleReceive],
      ['STATUS_UPDATE_CRON', handleStatusUpdateCron],
      ['CARD_PRICES_UNCHANGED', handlePricesUnchanged],
      ['COLLECTIONS_UPDATED', handleCollectionsUpdated],
      ['SEND_PRICING_DATA_TO_CLIENT', handleCardPricesUpdated],
      ['EVENT_RESPONSE', handleEventResponse],
      ['ERROR', handleError],
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
    requestData: {},
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
        const selectedList = listOfMonitoredCards;
        socket.emit('REQUEST_PRICES_ACTIVATE_CRON', {
          userId,
          data: {
            userId,
            selectedList,
            allCollections,
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
      if (
        JSON.stringify(allCollections) !==
        JSON.stringify(state.allCollectionData)
      ) {
        setDataFunctions.allCollectionData(allCollections);
      }
    }
  }, [allCollections]);
  useEffect(() => {
    if (user) {
      // console.log('userId', user.userId);
      setDataFunctions.userData(user);
    }
  }, [user]);
  useEffect(() => {
    if (listOfMonitoredCards) {
      // console.log('userId', user.userId);
      setDataFunctions.retrievedListOfMonitoredCards(listOfMonitoredCards);
    }
  }, [user, listOfMonitoredCards]);
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
  }, [
    userId,
    setDataFunctions.allCollectionData,
    state.updatedCollection,
    // state.allCollectionData,
    // state.collectionData,
    state.cardPrices,
  ]);

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
