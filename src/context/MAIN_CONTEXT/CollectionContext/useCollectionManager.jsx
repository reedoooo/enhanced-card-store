/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import useLogger from '../../hooks/useLogger';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import useManageCookies from '../../hooks/useManageCookies';
import useSelectedCollection from './useSelectedCollection';
const defaultExportValue = {
  fetchCollections: () => {},
  createNewCollection: () => {},
  deleteCollection: () => {},
  updateCollection: () => {},
  addNewCollection: () => {},
  removeCollection: () => {},
  setCustomError: () => {},
  customError: '',
  refreshCollections: () => {},
  addOneToCollection: () => {},
  removeOneFromCollection: () => {},
  updateOneInCollection: () => {},
  hasFetchedCollections: false,
  handleError: () => {},
};
const useCollectionManager = () => {
  const { fetchWrapper, status, data } = useFetchWrapper();
  const { addCookie, getCookie, deleteCookie } = useManageCookies();
  const { isLoggedIn, authUser, userId } = getCookie([
    'isLoggedIn',
    'authUser',
    'userId',
  ]);
  const logger = useLogger('useCollectionManager');
  const collectionData = useSelectedCollection();
  if (!collectionData) {
    console.error('Collection data not found');
    return null;
  }
  const {
    selectedCollection,
    selectedCollectionId,
    customError,
    setCustomError,
    refreshCollections,
    updateCollectionsData,
  } = collectionData;
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

      if (!selectedCollection || selectedCollection === null) {
        console.warn('No collection selected');
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
      setCustomError,
      selectedCollection,
    ]
  );

  const createNewCollection = useCallback(async (datas) => {
    const newCollection = {
      name: datas.name,
      description: datas.description,
    };

    const path = createApiUrl('create');
    performAction(path, 'POST', newCollection, 'createNewCollection');
  }, []);

  // performAction(createApiUrl('create'), 'POST', datas, 'createNewCollection');
  const deleteCollection = useCallback(
    async (collectionId) => {
      performAction(
        createApiUrl(`${collectionId}/delete`),
        'DELETE',
        { collectionId: collectionId },
        'deleteCollection',
        {
          beforeAction: () => {
            console.log('BEFORE ACTION', collectionId);
          },
          // afterAction: () => {
          //   console.log(`Collection ${collectionId} deleted successfully.`);
          //   removeCollection(collectionId, data);
          //   refreshCollections(); // Refresh collections after any action
          // },
          afterAction: async () => {
            console.log(`Collection ${collectionId} deleted successfully.`);
            // Fetch the latest collections after deletion
            try {
              // removeCollection(collectionId, data);
              // const updatedCollections = await fetchWrapper(
              //   createApiUrl('allCollections'),
              //   'GET'
              // );
              // refreshCollections(updatedCollections.data);
            } catch (error) {
              handleError(error, 'fetching collections after deletion');
            }
          },
        }
      );
    },
    [performAction, createApiUrl, fetchWrapper, handleError]
  );

  const updateCollection = useCallback(
    async (collectionId, updatedData) => {
      performAction(
        createApiUrl(`${collectionId}/update`),
        'PUT',
        updatedData,
        'updateCollection'
      );
    },
    [performAction, createApiUrl]
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
        performAction(
          createApiUrl(`${selectedCollectionId}/cards/add`),
          'POST',
          { cards: newCards, type: 'addNew' },
          'addCardsToCollection',
          options
        );
      }
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
  const memoizedReturnValues = useMemo(
    () => ({
      fetchCollections,
      createNewCollection,
      deleteCollection,
      updateCollection,
      addCardsToCollection,
      removeCardsFromCollection,
      customError,
      setCustomError,
      refreshCollections,
      updateCollectionsData,
      hasFetchedCollections,
      handleError,
      removeOneFromCollection: (cards, collection) =>
        removeCardsFromCollection(cards, collection),
      addOneToCollection: (cards, collection) =>
        addCardsToCollection(cards, collection),
    }),
    [
      fetchCollections,
      createNewCollection,
      deleteCollection,
      updateCollection,
      addCardsToCollection,
      removeCardsFromCollection,
      customError,
      setCustomError,
      refreshCollections,
      updateCollectionsData,
      hasFetchedCollections,
      handleError,
    ]
  );
  return memoizedReturnValues;
};

export default useCollectionManager;
