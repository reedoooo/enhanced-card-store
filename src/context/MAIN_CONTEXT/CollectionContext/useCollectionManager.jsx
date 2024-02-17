import { useState, useCallback, useEffect, useMemo } from 'react';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import useLogger from '../../hooks/useLogger';
import useApiResponseHandler from '../../hooks/useApiResponseHandler';
import { DEFAULT_COLLECTION } from '../../constants';
import { calculateCollectionValue } from './collectionUtility';

const useCollectionManager = (isLoggedIn, userId) => {
  const createApiUrl = useCallback(
    (path) =>
      `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections${path}`,
    [userId]
  );
  const fetchWrapper = useFetchWrapper();
  const handleApiResponse = useApiResponseHandler();
  const logger = useLogger('useCollectionManager');
  const [collectionData, setCollectionData] = useState({});
  const [allCollections, setAllCollections] = useState(
    [DEFAULT_COLLECTION] || []
  );
  const [selectedCollection, setSelectedCollection] =
    useState(DEFAULT_COLLECTION);
  const [selectedCards, setSelectedCards] = useState(
    selectedCollection?.cards?.slice(0, 30) || []
  );
  const [hasFetchedCollections, setHasFetchedCollections] = useState(false);

  // Function to update the selected collection and its cards
  const updateSelectedCollection = useCallback((newCollection) => {
    setSelectedCollection(newCollection);
    // setSelectedCards(newCollection?.cards?.slice(0, 30) || []);
  }, []);
  // const updateCollectionDataCookie = (data) => {
  //   setCookie('collectionData', data, { path: '/' });
  // };
  /**
   * Creates a new collection for a specific user.
   * @param {string} userId - The ID of the user for whom the collection is being created.
   * @param {Object} collectionData - The data for the new collection.
   * @param {string} collectionData.name - The name of the collection.
   * @param {string} collectionData.description - The description of the collection.
   * @param {Array} [collectionData.cards] - Optional array of cards to be included in the collection.
   * @returns {Promise<Object>} The response from the server.
   * FUNCTION LOCATIONS: -->
   * [ ]   @function CollectionForm - src/components/forms/CollectionForm.jsx
   */
  const createNewCollection = async (coData) => {
    logger.logEvent('[createNewCollection] start', coData);

    try {
      const response = await fetchWrapper(
        createApiUrl('/create'),
        'POST',
        coData
      );
      const data = handleApiResponse(response, 'createNewCollection');
      updateSelectedCollection(data);
      return data;
    } catch (error) {
      logger.logEvent(
        'Error creating new collection',
        'createNewCollection',
        error.message
      );
      throw error;
    }
  };
  /**
   * Retrieves all collections for a specific user.
   * @param {string} userId - The ID of the user whose collections are to be fetched.
   * @returns {Promise<Object>} The response from the server containing the collections.
   * FUNCTION LOCATIONS: -->
   * [ ]   @function Main - src/Main.jsx
   */
  const getAllCollectionsForUser = useCallback(async () => {
    if (!userId || hasFetchedCollections) return;

    try {
      const response = await fetchWrapper(
        createApiUrl('/allCollections'),
        'GET'
      );
      const data = handleApiResponse(response, 'getAllCollectionsForUser');
      // console.log('getAllCollectionsForUser', data);
      setCollectionData({ data: data });
      setAllCollections(data?.data);
      setSelectedCollection(data?.data?.[0]);
      setHasFetchedCollections(true);
    } catch (error) {
      logger.logEvent(
        'Error fetching collections',
        'getAllCollectionsForUser',
        error.message
      );
    }
  }, [
    createApiUrl,
    fetchWrapper,
    handleApiResponse,
    logger,
    allCollections,
    hasFetchedCollections,
    userId,
  ]);
  // Call getAllCollectionsForUser on component mount
  useEffect(() => {
    if (userId && !hasFetchedCollections) {
      getAllCollectionsForUser();
    }
  }, [userId, hasFetchedCollections, getAllCollectionsForUser]);

  // useEffect(() => {
  //   if (userId && !hasFetchedCollections) {
  //     // console.log('getAllCollectionsForUser');
  //     getAllCollectionsForUser();
  //   }
  // }, [userId, getAllCollectionsForUser, hasFetchedCollections]);
  useEffect(() => {
    if (hasFetchedCollections) {
      // console.log('setAllCollections', collectionData?.data?.allCollections);
      setAllCollections(collectionData?.data);
      // updateSelectedCollection(collectionData?.data?.[0]);
    }
  }, [hasFetchedCollections, collectionData]);

  /**
   * Updates and synchronizes a specific collection for a user.
   * @param {string} userId - The ID of the user who owns the collection.
   * @param {string} collectionId - The ID of the collection to be updated.
   * @param {Object} updatedData - The updated data for the collection.
   * @param {string} updatedData.name - (Optional) New name of the collection.
   * @param {string} updatedData.description - (Optional) New description of the collection.
   * @param {Array} updatedData.cards - (Optional) Array of updated cards.
   * @returns {Promise<Object>} The response from the server.
   */
  const updateAndSyncCollection = async (collectionId, updatedData) => {
    logger.logEvent('updateAndSyncCollection start', {
      collectionId,
      updatedData,
    });
    try {
      const response = await fetchWrapper(
        createApiUrl(`/${collectionId}`),
        'PUT',
        updatedData
      );

      const data = handleApiResponse(response, 'updateAndSyncCollection');
      setAllCollections((prev) =>
        prev.map((collection) =>
          collection._id === collectionId ? data : collection
        )
      );
      updateSelectedCollection(data);
      return data;
    } catch (error) {
      logger.logEvent('updateAndSyncCollection error', error);
      throw error;
    }
  };
  /**
   * Deletes a specific collection for a user.
   * @param {string} collectionId - The ID of the collection to be deleted.
   * @returns {Promise<Object>} The response from the server.
   */
  const deleteCollection = async (collectionId) => {
    try {
      const response = await fetchWrapper(
        createApiUrl(`/${collectionId}`),
        'DELETE',
        { collectionId }
      );
      const data = handleApiResponse(response, 'addCardsToCollection');

      setAllCollections((prev) =>
        prev.filter((collection) => collection?._id !== collectionId)
      );
      return response;
    } catch (error) {
      logger.logEvent('deleteCollection error', error);
      throw error;
    }
  };
  /**
   * Adds new cards to a specific collection.
   * @param {string} userId - The ID of the user who owns the collection.
   * @param {string} collectionId - The ID of the target collection.
   * @param {Array} cards - Array of card objects to be added.
   * @returns {Promise<Object>} The response from the server.
   */
  const addCardsToCollection = async (cards, collection) => {
    const newCards = [];
    const updatedCards = [];

    for (const card of cards) {
      const existingCard = collection?.cards?.find((c) => c.id === card.id);

      if (existingCard) {
        // await updateCardsInCollection(collection._id, [card], 'increment');
        existingCard.tag = 'incremented';
        updatedCards.push(existingCard);
      } else {
        card.tag = 'added';
        newCards.push({ ...card, quantity: 1 });
      }
    }

    if (newCards.length > 0) {
      logger.logEvent('addCardsToCollection ADD', {
        newCards,
        collection,
      });
      const response = await fetchWrapper(
        createApiUrl(`/${collection?._id}/add`),
        'POST',
        { cards: newCards }
      );
      const data = handleApiResponse(response, 'addCardsToCollection');
      updateSelectedCollection(data);
    }
    if (updatedCards.length > 0) {
      logger.logEvent('addCardsToCollection UPDATE', {
        updatedCards,
        collection,
      });
      const response = await fetchWrapper(
        createApiUrl(`/${collection._id}/update`),
        'PUT',
        { cards: updatedCards, type: 'increment' }
      );
      const data = handleApiResponse(response, 'addCardsToCollection');
      updateSelectedCollection(data);
    }
  };
  /**
   * Removes cards from a specific collection.
   * @param {string} userId - The ID of the user who owns the collection.
   * @param {string} collectionId - The ID of the collection from which cards are being removed.
   * @param {Array} cardIds - Array of card object IDs to be removed.
   * @returns {Promise<Object>} The response from the server.
   */
  const removeCardsFromCollection = async (cards, cardIds, collection) => {
    const collectionId = collection._id;
    const cardsToRemove = [];
    const cardsToDecrement = [];
    for (const card of cards) {
      const existingCard = collection?.cards?.find((c) => c.id === card.id);
      if (existingCard) {
        if (existingCard.quantity > 1) {
          // Decrement card quantity
          // existingCard?.quantity -= 1;
          existingCard.tag = 'decremented';
          cardsToDecrement.push(existingCard);
        } else {
          // Quantity is 1, remove the card
          card.tag = 'removed';
          cardsToRemove.push(card);
        }
      }
    }
    try {
      if (cardsToRemove.length > 0) {
        logger.logEvent('removeCardsFromCollection REMOVE', {
          collectionId,
          cardsToRemove,
        });
        const response = await fetchWrapper(
          createApiUrl(`/${collectionId}/remove`),
          'DELETE',
          { cards: cardsToRemove }
        );
        const data = handleApiResponse(response, 'removeCardsFromCollection');
        updateSelectedCollection(data);
      }

      if (cardsToDecrement.length > 0) {
        logger.logEvent('removeCardsFromCollection DECREMENT', {
          collectionId,
          cardsToDecrement,
        });
        const response = await fetchWrapper(
          createApiUrl(`/${collectionId}/update`),
          'PUT',
          { cards: cardsToDecrement, type: 'decrement' }
        );
        const data = handleApiResponse(response, 'removeCardsFromCollection');
        updateSelectedCollection(data);
      }
    } catch (error) {
      logger.logEvent('removeCardsFromCollection error', error);
      throw error;
    }
  };
  /**
   * Updates the chart data for a specific collection.
   * @param {string} userId - The ID of the user who owns the collection.
   * @param {string} collectionId - The ID of the collection for which chart data is being updated.
   * @param {Object} chartData - The updated chart data for the collection. The structure of this data depends on how chart data is managed in your application.
   * @returns {Promise<Object>} The response from the server.
   */
  const updateChartDataInCollection = async (collectionId, chartData) => {
    logger.logEvent('updateChartDataInCollection start', {
      collectionId,
      chartData,
    });
    try {
      const response = await fetchWrapper(
        createApiUrl(`/${collectionId}/updateChartData`),
        'PUT',
        chartData
      );
      const data = handleApiResponse(response, 'updateChartDataInCollection');
      updateSelectedCollection(data);

      return data;
    } catch (error) {
      logger.logEvent('updateChartDataInCollection error', error);
      throw error;
    }
  };
  const checkAndUpdateCardPrices = useCallback(async (cards, collection) => {
    const response = await fetchWrapper(
      createApiUrl('/allCollections/automatedPriceUpdate'),
      'PUT',
      { cards, type: 'automated' }
    );
    const data = handleApiResponse(response, 'checkAndUpdateCardPrices');
    updateSelectedCollection(data);
  });

  return {
    // STATE
    collectionData,
    allCollections,
    selectedCollection,
    selectedCards,
    hasFetchedCollections,
    // SECONDARY STATE (derived from main state selectedCollection)
    collectionStatistics: selectedCollection?.collectionStatistics,
    chartData: selectedCollection?.chartData,
    // totalPrice: calculateCollectionValue(selectedCollection),
    totalQuantity: selectedCollection?.cards?.length || 0,
    collectionPriceHistory: selectedCollection?.collectionPriceHistory,
    allXYValues: selectedCollection?.chartData?.allXYValues,
    lastSavedPrice: selectedCollection?.lastSavedPrice,
    latestPrice: selectedCollection?.latestPrice,
    cards: selectedCollection?.cards,
    newNivoChartData: selectedCollection?.newNivoChartData,
    // STATE SETTERS
    setCollectionData,
    setAllCollections,
    setSelectedCollection,
    setSelectedCards,

    // COLLECTION ACTIONS
    createNewCollection,
    getAllCollectionsForUser,
    updateAndSyncCollection,
    deleteCollection,
    updateSelectedCollection,

    // CARD ACTIONS
    addCardsToCollection,
    removeCardsFromCollection,

    // CRON JOB ACTIONS
    checkAndUpdateCardPrices,

    // CHART ACTIONS
    updateChartDataInCollection,

    // OTHER
    getTotalPrice: () => calculateCollectionValue(selectedCollection),
  };
};

export default useCollectionManager;
