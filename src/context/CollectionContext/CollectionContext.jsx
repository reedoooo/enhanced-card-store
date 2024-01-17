// /* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  defaultContextValue,
  initialAllCollectionsState,
  initialCollectionState,
  removeDuplicatesFromCollection,
} from './helpers';
import { calculateCollectionValue } from './collectionUtility';
import useFetchWrapper from '../hooks/useFetchWrapper';
import useSet from '../hooks/useSet';
import useCounter from '../hooks/useCounter';
import useObjectState from '../hooks/useObjectState';
import useLogger from '../hooks/useLogger';
import useApiResponseHandler from '../hooks/useApiResponseHandler';
import { isEqual } from 'lodash';
import axios from 'axios';
import { useAuthContext } from '../AuthContext/authContext';

export const CollectionContext = createContext(defaultContextValue);

export const CollectionProvider = ({ children }) => {
  const { isLoggedIn, authUser, userId } = useAuthContext();
  const createApiUrl = (path) =>
    `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections${path}`;
  const fetchWrapper = useFetchWrapper();
  const handleApiResponse = useApiResponseHandler();
  const [allCollections, setAllCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);

  const {
    // count: cardQuantity,
    count: quantity,
    increment: incrementQuantity,
    decrement: decrementQuantity,
  } = useCounter();
  const cardExists = (collection, cardId) =>
    collection.cards.some((card) => card.id === cardId);
  const logger = useLogger('CollectionProvider');
  const updateSelectedCollection = (newCollection) => {
    setSelectedCollection(newCollection);
    if (selectedCollection) {
      setSelectedCards(selectedCollection?.cards?.slice(0, 30));
    }
  };
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
  const getAllCollectionsForUser = async () => {
    logger.logEvent(
      'Fetching all collections for user',
      'getAllCollectionsForUser'
    );
    if (allCollections.length) {
      console.log('allCollections already exists:', allCollections);
      return allCollections;
    }
    try {
      const response = await axios.get(createApiUrl('/allCollections'));
      const data = handleApiResponse(response.data, 'getAllCollectionsForUser');
      if (Array.isArray(data) && !isEqual(data, allCollections)) {
        setAllCollections(data);
        setSelectedCollection(data[0]);
      }
    } catch (error) {
      logger.logEvent(
        'Error fetching collections',
        'getAllCollectionsForUser',
        error.message
      );
      throw error;
    }
  };
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
   * ! NOTE: Each card added using this route should be new data from the API with its' quantity field set to 1.
   * TODO: add validation to ensure the card doesnt already exist in the collection --> if it does, then ref it to updatExistingCardsInCollection()
   * ! NOTE: the return value is the updated collection data
   * @returns {Promise<Object>} The response from the server.
   */
  const addCardsToCollection = async (collectionId, cards) => {
    if (cardExists(selectedCollection, cards[0].id)) {
      return updateCardsInCollection(collectionId, cards, 'increment');
    }
    logger.logEvent('Add Card', {
      collectionId,
      cards,
    });
    cards?.forEach((card) => incrementQuantity()); // Update card quantity
    const response = await fetchWrapper(
      createApiUrl(`/${collectionId}/add`),
      'POST',
      {
        cards,
      }
    );
    const { data } = handleApiResponse(response, 'addCardsToCollection');
    updateSelectedCollection(data);

    return response;
  };
  /**
   * Removes cards from a specific collection.
   * @param {string} userId - The ID of the user who owns the collection.
   * @param {string} collectionId - The ID of the collection from which cards are being removed.
   * @param {Array} cardIds - Array of card object IDs to be removed.
   * ! NOTE: This route is used for removing cards from a collection, not for decrementing the quantity of a card.
   * TODO: add validation to ensure the card exists in the collection.
   * ! NOTE: the return value is the updated collection data
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
   * ! NOTE: This route is used for updating cards in a collection, not for adding new cards.
   * TODO: add validation to ensure the card exists in the collection.
   * TODO: if the card quantity is 0, then ref it to removeCardsFromCollection()
   * ! NOTE: if the card quantity is 0, the card will be removed from the collection.
   * TODO: add useSet() hook to update various fields pertaining to allCollections in context
   * ! NOTE: the return value is the updated collection data
   * @returns {Promise<Object>} The response from the server.
   */
  const updateCardsInCollection = async (
    collectionId,
    cards,
    incrementType
  ) => {
    // Updating card quantity based on incrementType
    if (incrementType === 'increment') {
      incrementQuantity();
    } else if (incrementType === 'decrement') {
      decrementQuantity();
    }
    const response = await fetchWrapper(
      createApiUrl(`/${collectionId}/update`),
      'PUT',
      {
        cards,
      }
    );
    const { data } = handleApiResponse(response, 'updateCardsInCollection');
    updateSelectedCollection(data);

    return response;
  };

  /**
   * Updates the chart data for a specific collection.
   * @param {string} userId - The ID of the user who owns the collection.
   * @param {string} collectionId - The ID of the collection for which chart data is being updated.
   * @param {Object} chartData - The updated chart data for the collection. The structure of this data depends on how chart data is managed in your application.
   * @returns {Promise<Object>} The response from the server.
   * The destructured response data = {
   * 	@param {Object} chartMessage: String,
   * 	@param {Array} allXYValues: Array,
   * 	@param {Array} upatedCards: Array,
   * }
   * TODO: add useSet() hook to update various fields pertaining to allCollections in context
   * TODO: add useObjectState() hook to update the chartData and cards fields of the current collection
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
      const { data } = handleApiResponse(
        response,
        'updateChartDataInCollection'
      );
      updateSelectedCollection(data);

      return data;
    } catch (error) {
      logger.logEvent('updateChartDataInCollection error', error);
      throw error;
    }
  };
  // useEffect(() => {
  //   if (userId && !allCollections?.length) {
  //     getAllCollectionsForUser();
  //   }
  // }, [userId, getAllCollectionsForUser, allCollections]);
  useEffect(() => {
    // Immediately invoked async function within useEffect
    (async () => {
      if (isLoggedIn && userId && !allCollections?.length) {
        if (authUser && authUser.userId === userId) {
          try {
            await getAllCollectionsForUser();
            // setNestedAllCollections('', collections);
          } catch (error) {
            console.error('Failed to fetch collections:', error);
          }
        }
      }
    })();
  }, [
    userId,
    authUser,
    allCollections,
    // allCollectionsSet.size,
    getAllCollectionsForUser,
  ]);

  const contextValue = useMemo(
    () => ({
      selectedCollection: selectedCollection,
      cards: selectedCards,
      allCollections: allCollections,
      currentChartDataSets2: selectedCollection?.currentChartDataSets2,
      totalPrice: selectedCollection?.totalPrice,
      totalQuantity: selectedCollection?.totalQuantity,
      latestPrice: selectedCollection?.latestPrice,
      lastSavedPrice: selectedCollection?.lastSavedPrice,
      collectionPriceHistory: selectedCollection?.collectionPriceHistory || [],
      allXYValues: selectedCollection?.chartData?.allXYValues || [],
      setSelectedCollection: setSelectedCollection,
      setAllCollections: setAllCollections,
      createUserCollection: createNewCollection,
      updateAndSyncCollection,
      deleteCollection,
      addOneToCollection: (collectionId, card) =>
        addCardsToCollection(collectionId, [card]),
      removeOneFromCollection: (collectionId, cardId) =>
        removeCardsFromCollection(collectionId, [cardId]),
      updateOneInCollection: (collectionId, card, incrementType) => {
        updateCardsInCollection(collectionId, [card], incrementType);
      },
      updateChartDataInCollection,
      getAllCollectionsForUser,
      getTotalPrice: () => calculateCollectionValue(selectedCollection),
    }),
    [
      // allCollectionsSet,
      setSelectedCollection,
      // addToAllCollectionsSet,
      // removeFromAllCollectionsSet,
      setAllCollections,
      selectedCollection,
      getAllCollectionsForUser,
      updateAndSyncCollection,
      deleteCollection,
      addCardsToCollection,
      removeCardsFromCollection,
      updateCardsInCollection,
      updateChartDataInCollection,
      createNewCollection,
      userId,
      authUser,
      fetchWrapper,
      handleApiResponse,
      logger,
      quantity,
      incrementQuantity,
      decrementQuantity,
    ]
  );

  useEffect(() => {
    console.log('COLLECTION CONTEXT:', {
      selectedCollection: contextValue.selectedCollection,
      selectedCards: contextValue.selectedCards,
      allCollections: contextValue.allCollections,
      // collectionData: contextValue.collectionData,
      cards: contextValue.cards,
      totalPrice: contextValue.totalPrice,
      totalQuantity: contextValue.totalQuantity,
      currentChartDataSets2: contextValue.currentChartDataSets2,
      collectionPriceHistory: contextValue.collectionPriceHistory,
      lastSavedPrice: contextValue.lastSavedPrice,
      latestPrice: contextValue.latestPrice,
      allXYValues: contextValue.allXYValues,
    });
  }, [contextValue.selectedCollection]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
