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
  const { getCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const logger = useLogger('useCollectionManager');
  const {
    collections,
    handleSelectCollection,
    customError,
    setCustomError,
    refreshCollections,
    removeCollection,
    updateCollectionField,
    addCardToCollection,
    removeCardFromCollection,
  } = useSelectedCollection();
  // const collectionData = useSelectedCollection();
  // if (!collectionData) {
  //   console.error('Collection data not found');
  //   return null;
  // }
  // const {
  //   selectedCollection,
  //   selectedCollectionId,
  //   customError,
  //   setCustomError,
  //   refreshCollections,
  //   updateCollectionsData,
  //   handleRemoveCard,
  //   removeCollection,
  //   removeCardFromCollection,
  // } = collectionData;
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
  const fetchCollections = useCallback(
    async (actionName, deletedId) => {
      if (!userId || !isLoggedIn || status === 'loading') return;
      try {
        const responseData = await fetchWrapper(
          createApiUrl('allCollections'),
          'GET',
          null,
          'fetchCollections'
        );
        // updateCollectionsData(responseData?.data, actionName, deletedId);
        refreshCollections(responseData?.data);
        setHasFetchedCollections(true);
      } catch (error) {
        handleError(error, 'fetchCollections');
      }
    },
    [
      userId,
      isLoggedIn,
      status,
      fetchWrapper,
      createApiUrl,
      refreshCollections,
      handleError,
    ]
  );
  const performAction = useCallback(
    async (path, method, data, actionName, options = {}) => {
      if (!userId || !isLoggedIn || status === 'loading') {
        setError('User is not logged in or request is in loading state.');
        return;
      }

      // if (!selectedCollection || selectedCollection === null) {
      //   console.warn('No collection selected');
      //   return;
      // }

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
        console.log('ACTION ', actionName);
        console.log('STATUS: ', status);
        console.log('DATA: ', data);

        const response = await fetchWrapper(path, method, data, actionName);
        options.afterAction?.();
        if (
          actionName !== 'decrementCardQuantity' &&
          actionName !== 'deleteCardFromCollection' &&
          actionName !== 'deleteCollection'
        ) {
          await fetchCollections(actionName, response?.data?._id); // Refresh collections after any action
          console.log('RESPONSE: ', response);
          // refreshCollections(response?.data);
        } else if (actionName === 'deleteCollection') {
          console.log('RESPONSE: ', response);
          removeCollection(response?.data?.data);
          // await fetchCollections(actionName, response?.data?.data); // Refresh collections after any action
        } else {
          console.log('REMOVED CARDS FROM COLLECTION', response?.data);
          removeCardFromCollection(
            response?.data?.collectionId,
            response?.data?.cardId
          );
          await fetchCollections(actionName, response?.data?.collectionId); // Refresh collections after any action
        }
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
      // selectedCollection,
      // selectedCollectionId,
    ]
  );
  const createNewCollection = useCallback(async (datas) => {
    const path = createApiUrl('create');
    performAction(path, 'POST', datas, 'createNewCollection');
  }, []);
  const deleteCollection = useCallback(
    async (collectionId) => {
      performAction(
        createApiUrl(`${collectionId}/delete`),
        'DELETE',
        {},
        'deleteCollection',
        {
          beforeAction: async () => {
            console.log('BEFORE ACTION', collectionId);
            // removeCollection(collectionId);
          },
          afterAction: async () => {
            console.log(`Collection ${collectionId} deleted successfully.`);
            // Fetch the latest collections after deletion
            try {
              // const updatedCollections = await fetchWrapper(
              //   createApiUrl('allCollections'),
              //   'GET'
              // );
              // refreshCollections();
              removeCollection(collectionId);
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
      console.log('ADD CARDS TO COLLECTION', newCards, collection);
      performAction(
        createApiUrl(`${collection?._id}/cards/add`),
        'POST',
        { cards: [newCards], type: 'addNew' },
        'addCardsToCollection'
      );
    },
    [performAction]
  );
  const removeCardsFromCollection = useCallback(
    (card, collection) => {
      const actionName =
        card.quantity > 1
          ? 'decrementCardQuantity'
          : 'deleteCardFromCollection';
      const path = createApiUrl(
        `${collection._id}/cards/${card._id}/${actionName}`
      );

      console.log(
        `Preparing to ${actionName} for card ${card._id} in collection ${collection._id}`
      );

      performAction(
        path,
        actionName === 'deleteCardFromCollection' ? 'DELETE' : 'PUT', // DELETE for delete, PUT for decrement
        {
          cardId: card._id,
          type:
            actionName === 'decrementCardQuantity' ? 'decrement' : undefined,
        },
        actionName,
        {
          beforeAction: () => {
            console.log(`Optimistically ${actionName} for card ${card._id}`);
          },
          afterAction: () => {
            console.log(
              `Successfully ${actionName === 'decrementCardQuantity' ? 'decremented' : 'deleted'} card ${card._id}`
            );
            // refreshCollections();
          },
        }
      );
    },
    [performAction, createApiUrl, refreshCollections]
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
      // updateCollectionsData,
      hasFetchedCollections,
      handleError,
      removeOneFromCollection: (card, collection) =>
        removeCardsFromCollection(card, collection),
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
      // updateCollectionsData,
      hasFetchedCollections,
      handleError,
    ]
  );
  return memoizedReturnValues;
};

export default useCollectionManager;
