import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import useLogger from '../../hooks/useLogger';
import { DEFAULT_COLLECTION } from '../../constants';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import { useAuthContext } from '../..';
import { useCookies } from 'react-cookie';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSelectedCollection from './useSelectedCollection';

const useCollectionManager = () => {
  const { fetchWrapper, status } = useFetchWrapper();
  const { userId, isLoggedIn } = useAuthContext(); // Now getting userId from context
  const logger = useLogger('useCollectionManager');
  const {
    selectedCollection,
    allCollections,
    showCollections,
    selectedCollectionId,
    customError: selectedCollectionError,

    updateCollectionsData,
    handleSelectCollection,
    resetCollection,
    setCustomError: setSelectedCollectionError,
  } = useSelectedCollection();
  const [error, setError] = useState(null);
  const [hasFetchedCollections, setHasFetchedCollections] = useState(false);
  const handleError = useCallback(
    (error, actionName) => {
      const errorMessage = error.message || 'Failed to perform action';
      setError(errorMessage);
      logger.logError(`Error in ${actionName}: ${errorMessage}`, error);
    },
    [logger]
  );
  const baseUrl = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections`;
  const createApiUrl = useCallback((path) => `${baseUrl}/${path}`, [baseUrl]);
  const fetchCollections = useCallback(async () => {
    if (!userId || !isLoggedIn || status === 'loading') return;
    try {
      const responseData = await fetchWrapper(
        createApiUrl('allCollections'),
        'GET',
        null,
        'fetchCollections'
      );
      updateCollectionsData(responseData?.data);
      setHasFetchedCollections(true);
    } catch (error) {
      handleError(error, 'fetchCollections');
    }
  }, [
    userId,
    isLoggedIn,
    status,
    fetchWrapper,
    createApiUrl,
    updateCollectionsData,
    handleError,
  ]);

  const performAction = useCallback(
    async (path, method, data, actionName, options = {}) => {
      if (!userId || !isLoggedIn || status === 'loading') {
        setError('User is not logged in or request is in loading state.');
        return;
      }

      if (!selectedCollection) {
        setSelectedCollectionError('No collection selected');
        return;
      }

      options.beforeAction?.();

      console.log(
        'PERFORM ACTION',
        path,
        method,
        data,
        actionName,
        options.paramTypes
      );

      try {
        console.log('URL', path);

        await fetchWrapper(path, method, data, actionName);

        options.afterAction?.();
        fetchCollections(); // Refresh collections after any action
      } catch (error) {
        handleError(error, actionName);
      }
    },
    [
      userId,
      isLoggedIn,
      status,
      fetchWrapper,
      createApiUrl,
      fetchCollections,
      handleError,
      setSelectedCollectionError,
      selectedCollection,
    ]
  );

  const createNewCollection = (data) =>
    performAction(createApiUrl('create'), 'POST', data, 'createNewCollection');
  const deleteCollection = (collectionId) =>
    performAction(
      createApiUrl(`delete/${collectionId}`),
      'DELETE',
      {},
      'deleteCollection'
    );
  const updateCollection = (collectionId, updatedData) =>
    performAction(
      createApiUrl(`update/${collectionId}`),
      'PUT',
      updatedData,
      'updateCollection'
    );
  const addCardsToCollection = useCallback(
    (newCards, collection) => {
      if (selectedCollectionId === 'selectedCollectionId')
        return console.log('Collection ID has not been set');
      // CHECK FOR EXISTING CARD IN COLLECTION (newcards[0])
      const existingCard = collection?.cards?.find(
        (card) => card.id === newCards[0].id
      );
      const options = {
        beforeAction: () => {
          if (existingCard) {
            console.log('Card already exists in collection');
            return;
          }
        },
        afterAction: () => {
          if (existingCard) {
            console.log('Card already exists in collection');
            return;
          }
        },
        paramTypes: {
          collectionId: selectedCollectionId,
        },
      };

      if (existingCard) {
        // UPDATE EXISTING CARD
        performAction(
          createApiUrl(`${selectedCollectionId}/cards/update`),
          'PUT',
          { cards: [newCards], type: 'increment' },
          'addCardsToCollection',
          options
        );
      } else {
        // ADD NEW CARD
        performAction(
          createApiUrl(`${selectedCollectionId}/cards/add`),
          'POST',
          { cards: newCards, type: 'addNew' },
          'addCardsToCollection',
          options
        );
      }
      // performAction(
      //   createCardApiUrl('update'),
      //   'PUT',
      //   { cards: newCards },
      //   'addCardsToCollection',
      //   ['object']
      // );
    },
    [performAction]
  );
  const removeCardsFromCollection = useCallback(
    (cards, cardIds, collection) => {
      performAction(
        createApiUrl(`${selectedCollectionId}/cards/remove`),
        'PUT',
        { cards, cardIds },
        'removeCardsFromCollection',
        ['object', 'object']
      );
    },
    [performAction]
  );
  return {
    fetchCollections,
    createNewCollection,
    deleteCollection,
    updateCollection,
    addCardsToCollection,
    addOneToCollection: (cards, collection) =>
      addCardsToCollection(cards, collection),
    removeCardsFromCollection,
    removeOneFromCollection: (cards, collection) =>
      removeCardsFromCollection(cards, collection),
    selectedCollection,
    allCollections,
    showCollections,
    selectedCollectionId,
    selectedCollectionError,
    error,
    hasFetchedCollections,
    handleError,
    setSelectedCollectionError,
  };
};

export default useCollectionManager;
// const validateParams = useCallback(
//   (data, expectedTypes, actionName) => {
//     let isValid = true;
//     const errors = [];

//     expectedTypes.forEach((type, index) => {
//       const actualType = Array.isArray(data[index])
//         ? 'array'
//         : typeof data[index];
//       if (actualType !== type) {
//         isValid = false;
//         errors.push(`Param ${index + 1}: Expected ${type}, got ${actualType}`);
//       }
//     });

//     if (!isValid) {
//       logger.logError(`[${actionName}] Validation errors: `, errors.join('; '));
//     }
//     return isValid;
//   },
//   [logger]
// );
// const createNewCollection = useCallback(
//   (data) => {
//     performAction(
//       createApiUrl('create'),
//       'POST',
//       data,
//       'createNewCollection',
//       {
//         paramTypes: ['object'],
//         beforeAction: () => console.log('Creating new collection...'),
//         afterAction: () => console.log('New collection created.'),
//       }
//     );
//   },
//   [performAction, createApiUrl]
// );
// const deleteCollection = useCallback(
//   (collectionId) => {
//     performAction(
//       createApiUrl('delete'),
//       'DELETE',
//       {
//         collectionId,
//       },
//       'deleteCollection',
//       ['string']
//     );
//   },
//   [performAction]
// );
// const updateCollection = useCallback(
//   (collectionId, updatedData) => {
//     performAction(
//       createApiUrl('update'),
//       'PUT',
//       updatedData,
//       'updateCollection',
//       ['string', 'object']
//     );
//   },
//   [performAction]
// );
// const updateCollection = useCallback(
//   (collectionId, updatedData) => {
//     performAction(
//       `/update/${collectionId}`,
//       'PUT',
//       updatedData,
//       'updateCollection',
//       ['string', 'object']
//     );
//   },
//   [performAction]
// );
// const updateCardInCollection = useCallback(
//   (collectionId, cardId, updatedData) => {
//     if (
//       !validateParams(
//         [collectionId, cardId, updatedData],
//         ['string', 'string', 'object']
//       )
//     ) {
//       logger.logError('Invalid parameter types for updateCardInCollection.');
//       return;
//     }
//     performAction(
//       `/updateCard/${collectionId}/${cardId}`,
//       'PUT',
//       updatedData,
//       'updateCardInCollection'
//     );
//   },
//   [performAction, logger]
// );
// /**
//  * Updates the chart data for a specific collection.
//  * @param {string} userId - The ID of the user who owns the collection.
//  * @param {string} collectionId - The ID of the collection for which chart data is being updated.
//  * @param {Object} chartData - The updated chart data for the collection. The structure of this data depends on how chart data is managed in your application.
//  * @returns {Promise<Object>} The response from the server.
//  */
// const updateChartDataInCollection = async (collectionId, chartData) => {
//   logger.logEvent('updateChartDataInCollection start', {
//     collectionId,
//     chartData,
//   });
//   try {
//     const response = await fetchWrapper(
//       createApiUrl(`/${collectionId}/updateChartData`),
//       'PUT',
//       chartData
//     );
//     // const data = handleApiResponse(response, 'updateChartDataInCollection');
//     // updateSelectedCollection(data);

//     // return data;
//   } catch (error) {
//     logger.logEvent('updateChartDataInCollection error', error);
//     throw error;
//   }
// };
// const checkAndUpdateCardPrices = useCallback(async (cards, collection) => {
//   const response = await fetchWrapper(
//     createApiUrl('/allCollections/automatedPriceUpdate'),
//     'PUT',
//     { cards, type: 'automated' }
//   );
//   // const data = handleApiResponse(response, 'checkAndUpdateCardPrices');
//   // updateSelectedCollection(data);
// });
// const createNewCollection = useCallback(
//   (data) => {
//     if (!validateParams([data], ['object'])) {
//       logger.logError('Invalid parameter types for createNewCollection.');
//       return;
//     }
//     performAction('/create', 'POST', data, 'createNewCollection');
//   },
//   [performAction, logger]
// );
// const deleteCollection = useCallback(
//   (collectionId) => {
//     if (!validateParams([collectionId], ['string'])) {
//       logger.logError('Invalid parameter types for deleteCollection.');
//       return;
//     }
//     performAction(
//       `/delete/${collectionId}`,
//       'DELETE',
//       {},
//       'deleteCollection'
//     );
//   },
//   [performAction, logger]
// );
// const updateAndSyncCollection = useCallback(
//   (collectionId, updatedData) => {
//     if (!validateParams([collectionId, updatedData], ['string', 'object'])) {
//       logger.logError('Invalid parameter types for updateAndSyncCollection.');
//       return;
//     }
//     performAction(
//       `/update/${collectionId}`,
//       'PUT',
//       updatedData,
//       'updateAndSyncCollection'
//     );
//   },
//   [performAction, logger]
// );
// const addCardsToCollection = useCallback(
//   (newCards, collection) => {
//     console.log('addCardsToCollection', newCards, collection);
//     if (!validateParams([[newCards], collection], ['object', 'object'])) {
//       logger.logError(
//         `Invalid parameter types for addCardsToCollection, showing:  ${
//           (typeof newCards, typeof collection)
//         }`
//       );
//       return;
//     }
//     performAction(
//       '/update',
//       'PUT',
//       { cards: newCards },
//       'addCardsToCollection'
//     );
//   },
//   [performAction, logger]
// );
// // Effect to fetch collections on initial load or userId change
// useEffect(() => {
//   fetchCollections();
// }, [fetchCollections]);
// const { fetchData: fetchCollections, isLoading: isLoadingCollections } =
//   useGet({
//     userId,
//     isLoggedIn, // This might be omitted if not relevant for the fetch
//     hasFetchedFlag: hasFetchedCollections,
//     path: '/allCollections',
//     setLoadingFlag: setHasFetchedCollections,
//     updateStates: (responseData) => {
//       // Assuming your updateStates function is defined to update the relevant states
//       updateStates(responseData);
//     },
//     setError, // Assuming setError is a state setter for storing any fetch errors
//     fetchWrapper, // Your custom fetch wrapper function
//     createApiUrl, // Function to create the full API URL
//     logger, // Your logging function or hook
//   });

// // To initiate fetching:
// useEffect(() => {
//   fetchCollections();
// }, []);

// const getAllCollectionsForUser = useCallback(async () => {
//   const loadingID = 'fetchCollections'; // Define a unique loading ID
//   if (!userId || isLoading(loadingID) || hasFetchedCollections) return;
//   try {
//     const { data, error } = await fetchWrapper(
//       createApiUrl('/allCollections'),
//       'GET',
//       null,
//       loadingID
//     );
//     if (error) {
//       throw new Error(error);
//     }
//     const collectionData = JSON.parse(data);
//     console.log('GET ALL COLLECTIONS', collectionData);
//     setCollectionData({ data: collectionData });
//     setAllCollections(collectionData?.data || []);
//     setSelectedCollection(collectionData?.data?.[0] || DEFAULT_COLLECTION);
//     setHasFetchedCollections(true);
//   } catch (error) {
//     setError(error.message || 'Failed to fetch collections');
//     logger.logEvent(
//       'Error fetching collections getAllCollectionsForUser',
//       error.message
//     );
//   }
// }, [
//   userId,
//   hasFetchedCollections,
//   createApiUrl,
//   fetchWrapper,
//   logger,
//   isLoading,
//   setError,
//   setCollectionData,
//   setAllCollections,
//   setSelectedCollection,
//   setHasFetchedCollections,
// ]);
// useEffect(() => {
//   // if (isLoggedIn && userId && !hasFetchedCollections) {
//   if (userId && !hasFetchedCollections) {
//     getAllCollectionsForUser();
//   }
// }, [selectedCollection, setSelectedCollection]);
// const getAllCollectionsForUser = useCallback(async () => {
//   const loadingID = 'fetchCollections'; // Define a unique loading ID
//   if (!userId || isLoading(loadingID) || hasFetchedCollections) {
//     return;
//   }
//   try {
//     // fetchWrapper should return the data directly or throw an error if unsuccessful
//     const responseData = await fetchWrapper(
//       createApiUrl('/allCollections'),
//       'GET',
//       null,
//       loadingID
//     );
//     if (
//       (responseData && responseData?.status === 200) ||
//       responseData?.status === 201
//     ) {
//       console.log('SUCCESS: fetching collections');
//       updateStates(responseData);
//     }
//   } catch (error) {
//     console.error(error);
//     setError(error.message || 'Failed to fetch collections');
//     logger.logEvent(
//       'Error fetching collections getAllCollectionsForUser',
//       error.message
//     );
//   } finally {
//     setHasFetchedCollections(true); // Prevent re-fetching by updating state
//   }
// }, [
//   userId,
//   hasFetchedCollections,
//   createApiUrl,
//   fetchWrapper,
//   logger,
//   isLoading,
//   setError,
//   setCollectionData,
//   setAllCollections,
//   setSelectedCollection,
//   setHasFetchedCollections,
//   startLoading, // Include startLoading and stopLoading if they are not globally available
//   stopLoading,
// ]);
// const createNewCollection = async (coData) => {
//   const loadingID = 'createNewCollection';
//   if (!userId || isLoading(loadingID)) return;
//   try {
//     const { data, error } = await fetchWrapper(
//       createApiUrl('/create'),
//       'POST',
//       coData,
//       loadingID
//     );
//     if (error) {
//       throw new Error(error);
//     }
//     updateSelectedCollection(data.data); // Assuming updateSelectedCollection updates context or state
//     return data.data;
//   } catch (error) {
//     setError(error.message || 'Failed to create new collection');
//     logger.logEvent(
//       'Error creating new collection',
//       'createNewCollection',
//       error.message
//     );
//     throw error;
//   }
// };

// /**
//  * Updates and synchronizes a specific collection for a user.
//  * @param {string} userId - The ID of the user who owns the collection.
//  * @param {string} collectionId - The ID of the collection to be updated.
//  * @param {Object} updatedData - The updated data for the collection.
//  * @param {string} updatedData.name - (Optional) New name of the collection.
//  * @param {string} updatedData.description - (Optional) New description of the collection.
//  * @param {Array} updatedData.cards - (Optional) Array of updated cards.
//  * @returns {Promise<Object>} The response from the server.
//  */
// const updateAndSyncCollection = async (collectionId, updatedData) => {
//   const loadingID = 'updateAndSyncCollection';
//   if (!userId || isLoading(loadingID)) return;
//   try {
//     const { data, error } = await fetchWrapper(
//       createApiUrl(`/${collectionId}`),
//       'PUT',
//       updatedData,
//       loadingID
//     );
//     if (error) {
//       throw new Error(error);
//     }
//     setAllCollections((prev) =>
//       prev.map((collection) =>
//         collection._id === collectionId ? data.data : collection
//       )
//     );
//     updateSelectedCollection(data.data); // Assuming updateSelectedCollection updates context or state
//     return data.data;
//   } catch (error) {
//     setError(error.message || 'Failed to update collection');
//     logger.logEvent('updateAndSyncCollection error', error);
//     throw error;
//   }
// };

// /**
//  * Deletes a specific collection for a user.
//  * @param {string} collectionId - The ID of the collection to be deleted.
//  * @returns {Promise<Object>} The response from the server.
//  */
// const deleteCollection = async (collectionId) => {
//   const loadingID = 'deleteCollection';
//   if (!userId || isLoading(loadingID)) return;
//   setError(null);
//   try {
//     const response = await fetchWrapper(
//       createApiUrl(`/${collectionId}`),
//       'DELETE',
//       { collectionId },
//       loadingID
//     );
//     // const data = handleApiResponse(response, 'addCardsToCollection');

//     setAllCollections((prev) =>
//       prev.filter((collection) => collection?._id !== collectionId)
//     );
//     return response;
//   } catch (error) {
//     setError(error);
//     logger.logEvent('deleteCollection error', error);
//     throw error;
//   }
// };
// /**
//  * Adds new cards to a specific collection.
//  * @param {string} userId - The ID of the user who owns the collection.
//  * @param {string} collectionId - The ID of the target collection.
//  * @param {Array} cards - Array of card objects to be added.
//  * @returns {Promise<Object>} The response from the server.
//  */
// const addCardsToCollection = async (cards, collection) => {
//   const loadingID = 'addCardsToCollection';
//   if (!userId || isLoading(loadingID)) return;
//   setError(null);
//   const newCards = [];
//   const updatedCards = [];

//   for (const card of cards) {
//     const existingCard = collection?.cards?.find((c) => c.id === card.id);

//     if (existingCard) {
//       // await updateCardsInCollection(collection._id, [card], 'increment');
//       existingCard.tag = 'incremented';
//       updatedCards.push(existingCard);
//     } else {
//       card.tag = 'added';
//       newCards.push({ ...card, quantity: 1 });
//     }
//   }

//   if (newCards.length > 0) {
//     logger.logEvent('addCardsToCollection ADD', {
//       newCards,
//       collection,
//     });
//     const data = await fetchWrapper(
//       createApiUrl(`/${collection?._id}/add`),
//       'POST',
//       { cards: newCards },
//       loadingID
//     );
//     // const data = handleApiResponse(response, 'addCardsToCollection');
//     updateSelectedCollection(data.data);
//   }
//   if (updatedCards.length > 0) {
//     logger.logEvent('addCardsToCollection UPDATE', {
//       updatedCards,
//       collection,
//     });
//     const data = await fetchWrapper(
//       createApiUrl(`/${collection._id}/update`),
//       'PUT',
//       { cards: updatedCards, type: 'increment' },
//       loadingID
//     );
//     // const data = handleApiResponse(response, 'addCardsToCollection');
//     updateSelectedCollection(data.data);
//   }
// };
// /**
//  * Removes cards from a specific collection.
//  * @param {string} userId - The ID of the user who owns the collection.
//  * @param {string} collectionId - The ID of the collection from which cards are being removed.
//  * @param {Array} cardIds - Array of card object IDs to be removed.
//  * @returns {Promise<Object>} The response from the server.
//  */
// const removeCardsFromCollection = async (cards, cardIds, collection) => {
//   const loadingID = 'removeCardsFromCollection';
//   if (!userId || isLoading(loadingID)) return;
//   setError(null);
//   const collectionId = collection._id;
//   const cardsToRemove = [];
//   const cardsToDecrement = [];
//   for (const card of cards) {
//     const existingCard = collection?.cards?.find((c) => c.id === card.id);
//     if (existingCard) {
//       if (existingCard.quantity > 1) {
//         existingCard.tag = 'decremented';
//         cardsToDecrement.push(existingCard);
//       } else {
//         card.tag = 'removed';
//         cardsToRemove.push(card);
//       }
//     }
//   }
//   try {
//     if (cardsToRemove.length > 0) {
//       logger.logEvent('removeCardsFromCollection REMOVE', {
//         collectionId,
//         cardsToRemove,
//       });
//       const response = await fetchWrapper(
//         createApiUrl(`/${collectionId}/remove`),
//         'DELETE',
//         { cards: cardsToRemove },
//         loadingID
//       );
//       const data = handleApiResponse(response, 'removeCardsFromCollection');
//       updateSelectedCollection(data);
//     }

//     if (cardsToDecrement.length > 0) {
//       logger.logEvent('removeCardsFromCollection DECREMENT', {
//         collectionId,
//         cardsToDecrement,
//       });
//       const response = await fetchWrapper(
//         createApiUrl(`/${collectionId}/update`),
//         'PUT',
//         { cards: cardsToDecrement, type: 'decrement' },
//         loadingID
//       );
//       const data = handleApiResponse(response, 'removeCardsFromCollection');
//       updateSelectedCollection(data);
//     }
//   } catch (error) {
//     setError(error);
//     logger.logEvent('removeCardsFromCollection error', error);
//     throw error;
//   }
// };
// const getAllCollectionsForUser = useCallback(async () => {
//   if (!userId || hasFetchedCollections) return;

//   try {
//     const response = await fetchWrapper(
//       createApiUrl('/allCollections'),
//       'GET'
//     );
//     const data = handleApiResponse(response, 'getAllCollectionsForUser');
//     // console.log('getAllCollectionsForUser', data);
//     setCollectionData({ data: data });
//     setAllCollections(data?.data);
//     setSelectedCollection(data?.data?.[0]);
//     setHasFetchedCollections(true);
//   } catch (error) {
//     logger.logEvent(
//       'Error fetching collections',
//       'getAllCollectionsForUser',
//       error.message
//     );
//   }
// }, [
//   createApiUrl,
//   fetchWrapper,
//   handleApiResponse,
//   logger,
//   allCollections,
//   hasFetchedCollections,
//   userId,
// ]);
// Call getAllCollectionsForUser on component mount
// useEffect(() => {
//   if (userId && !hasFetchedCollections) {
//     getAllCollectionsForUser();
//   }
// }, [userId, hasFetchedCollections, getAllCollectionsForUser]);

// useEffect(() => {
//   if (userId && !hasFetchedCollections) {
//     // console.log('getAllCollectionsForUser');
//     getAllCollectionsForUser();
//   }
// }, [userId, getAllCollectionsForUser, hasFetchedCollections]);
// useEffect(() => {
//   if (hasFetchedCollections) {
//     // console.log('setAllCollections', collectionData?.data?.allCollections);
//     setAllCollections(collectionData?.data);
//     // updateSelectedCollection(collectionData?.data?.[0]);
//   }
// }, [hasFetchedCollections, collectionData]);
