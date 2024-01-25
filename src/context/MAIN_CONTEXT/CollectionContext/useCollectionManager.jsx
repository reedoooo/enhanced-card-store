import { useState, useCallback, useEffect } from 'react';
import useFetchWrapper from '../../hooks/useFetchWrapper';
import useLogger from '../../hooks/useLogger';
import useApiResponseHandler from '../../hooks/useApiResponseHandler';
import { debounce, isEqual } from 'lodash';
import {
  DEFAULT_ALLCOLLECTIONS_ARRAY,
  DEFAULT_CARDS_ARRAY,
  DEFAULT_COLLECTION,
} from '../../constants';

const useCollectionManager = (createApiUrl, isLoggedIn, userId) => {
  const fetchWrapper = useFetchWrapper();
  const handleApiResponse = useApiResponseHandler();
  const cardExists = (collection, cardId) =>
    collection?.cards?.some((card) => card.id === cardId);

  const logger = useLogger('useCollectionManager');
  const [hasFetchedCollections, setHasFetchedCollections] = useState(false);

  // States for managing collections
  const [allCollections, setAllCollections] = useState(
    DEFAULT_ALLCOLLECTIONS_ARRAY
  );
  const [selectedCollection, setSelectedCollection] =
    useState(DEFAULT_COLLECTION);
  const [selectedCards, setSelectedCards] = useState(DEFAULT_CARDS_ARRAY);

  // Function to update the selected collection and its cards
  const updateSelectedCollection = useCallback((newCollection) => {
    setSelectedCollection(newCollection);
    setSelectedCards(newCollection?.cards?.slice(0, 30) || []);
  }, []);
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
  const createNewCollection = async (collectionData) => {
    logger.logEvent('[createNewCollection] start', collectionData);

    try {
      const newCollectionData = { ...collectionData };
      const response = await fetchWrapper(createApiUrl('/create'), 'POST', {
        newCollectionData,
      });
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
      if (Array.isArray(data) && !isEqual(data, allCollections)) {
        setAllCollections(data);
        setSelectedCollection(data[0] || {});
      }
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

  // Debounce the API call
  const debouncedGetAllCollectionsForUser = useCallback(
    debounce(() => getAllCollectionsForUser(), 15000),
    [getAllCollectionsForUser]
  );

  useEffect(() => {
    if (userId && !hasFetchedCollections) {
      debouncedGetAllCollectionsForUser();
    }
  }, [userId, debouncedGetAllCollectionsForUser, hasFetchedCollections]);

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
        `/${collectionId}`,
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
      const response = await fetchWrapper(`/${collectionId}`, 'DELETE');

      // Update allCollectionsSet by creating a new Set without the deleted collection
      setAllCollections((prev) =>
        prev.filter((collection) => collection._id !== collectionId)
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
    let newCards = []; // Array to hold cards that are new to the collection

    logger.logEvent('addCardsToCollection start', { cards, collection });

    for (const card of cards) {
      if (cardExists(card.id, collection._id)) {
        // Increment quantity if the card exists
        await updateCardsInCollection(collection._id, [card], 'increment');
      } else {
        // Add new card with quantity set to 1
        newCards.push({ ...card, quantity: 1 });
      }
    }

    if (newCards.length > 0) {
      const response = await fetchWrapper(
        createApiUrl(`/${collection._id}/add`),
        'POST',
        { cards: newCards }
      );
      const { data } = handleApiResponse(response, 'addCardsToCollection');
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
  const removeCardsFromCollection = async (collectionId, cardIds) => {
    logger.logEvent('removeCardsFromCollection start', {
      collectionId,
      cardIds,
    });

    try {
      const response = await fetchWrapper(
        createApiUrl(`/${collectionId}/remove`),
        'DELETE',
        { cardIds }
      );
      const { data } = handleApiResponse(response, 'removeCardsFromCollection');
      updateSelectedCollection(data);
      return data;
    } catch (error) {
      logger.logEvent('removeCardsFromCollection error', error);
      throw error;
    }
  };
  /**
   * Updates specific cards within a collection.
   * @param {string} userId - The ID of the user who owns the collection.
   * @param {string} collectionId - The ID of the collection in which cards are being updated.
   * @param {Array} cards - Array of card objects with updated data. Each card object should include card ID and updated quantity.
   * @param {string} incrementType - Determines if the card count should be incremented or decremented.
   * @returns {Promise<Object>} The response from the server.
   */
  const updateCardsInCollection = async (
    collectionId,
    cards,
    incrementType
  ) => {
    logger.logEvent('updateCardsInCollection start', {
      collectionId,
      cards,
      incrementType,
    });

    // Modify card quantities based on incrementType
    const modifiedCards = cards.map((card) => ({
      ...card,
      quantity:
        incrementType === 'increment'
          ? card.quantity + 1
          : Math.max(card.quantity - 1, 0),
    }));

    // Remove cards with quantity 0
    const cardsToUpdate = modifiedCards.filter((card) => card.quantity > 0);
    const cardsToRemove = modifiedCards
      .filter((card) => card.quantity === 0)
      .map((card) => card.id);

    if (cardsToUpdate.length > 0) {
      const updateResponse = await fetchWrapper(
        createApiUrl(`/${collectionId}/update`),
        'PUT',
        { cards: cardsToUpdate }
      );
      const updateData = handleApiResponse(
        updateResponse,
        'updateCardsInCollection'
      );
      updateSelectedCollection(updateData);
    }

    if (cardsToRemove.length > 0) {
      await removeCardsFromCollection(collectionId, cardsToRemove);
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

  return {
    // STATE
    allCollections,
    selectedCollection,
    selectedCards,

    // STATE SETTERS
    setAllCollections,
    setSelectedCollection,
    setSelectedCards,

    // COLLECTION ACTIONS
    createNewCollection,
    getAllCollectionsForUser: debouncedGetAllCollectionsForUser,
    updateAndSyncCollection,
    deleteCollection,
    updateSelectedCollection,

    // CARD ACTIONS
    addCardsToCollection,
    removeCardsFromCollection,
    updateCardsInCollection,

    // CHART ACTIONS
    updateChartDataInCollection,

    // OTHER
  };
};

export default useCollectionManager;
