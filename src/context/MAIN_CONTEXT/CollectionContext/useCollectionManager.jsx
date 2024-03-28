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
      createApiUrl(`${collectionId}/delete`),
      'DELETE',
      { collectionId: collectionId },
      'deleteCollection'
    );
  const updateCollection = (collectionId, updatedData) =>
    performAction(
      createApiUrl(`${collectionId}/update`),
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
