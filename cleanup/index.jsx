// import { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { defaultContextValue, initialCollectionState } from './helpers';
// import useFetchWrapper from '../hooks/useFetchWrapper';
// import useSet from '../hooks/useSet';
// import useCounter from '../hooks/useCounter';
// import useObjectState from '../hooks/useObjectState';

// export const CollectionContext = createContext(defaultContextValue);

// export const CollectionProvider = ({ children }) => {
//   const [cookies] = useCookies(['authUser', 'userId']);
//   const { userId, authUser } = cookies;
// 	const createApiUrl = (path) => `${process.env.REACT_APP_SERVER}/${userId}/collections${path}`;

//   const fetchWrapper = useFetchWrapper();
//   const { set: allCollectionsSet, add: addToAllCollectionsSet } = useSet(
//     new Set()
//   );
//   const [selectedCollection, setSelectedCollection] = useObjectState(
//     initialCollectionState
//   );
//   const {
//     // count: cardQuantity,
//     count: quantity,
//     increment: incrementQuantity,
//     decrement: decrementQuantity,
// //   } = useCounter();
//   const cardExists = (collection, cardId) =>
//     collection.cards.some((card) => card.id === cardId);

//   /**
//    * Creates a new collection for a specific user.
//    * @param {string} userId - The ID of the user for whom the collection is being created.
//    * @param {Object} collectionData - The data for the new collection.
//    * @param {string} collectionData.name - The name of the collection.
//    * @param {string} collectionData.description - The description of the collection.
//    * @param {Array} [collectionData.cards] - Optional array of cards to be included in the collection.
//    * @returns {Promise<Object>} The response from the server.
//    */
//   const createNewCollection = async (collectionData) =>
//     fetchWrapper('', 'POST', collectionData);

//   /**
//    * Retrieves all collections for a specific user.
//    * @param {string} userId - The ID of the user whose collections are to be fetched.
//    * @returns {Promise<Object>} The response from the server containing the collections.
//    */
//   const getAllCollectionsForUser = async () => fetchWrapper('', 'GET');

//   /**
//    * Updates and synchronizes a specific collection for a user.
//    * @param {string} userId - The ID of the user who owns the collection.
//    * @param {string} collectionId - The ID of the collection to be updated.
//    * @param {Object} updatedData - The updated data for the collection.
//    * @param {string} updatedData.name - (Optional) New name of the collection.
//    * @param {string} updatedData.description - (Optional) New description of the collection.
//    * @param {Array} updatedData.cards - (Optional) Array of updated cards.
//    * @returns {Promise<Object>} The response from the server.
//    */
//   const updateAndSyncCollection = async (collectionId, updatedData) =>
//     fetchWrapper(`/${collectionId}`, 'PUT', updatedData);

//   /**
//    * Deletes a specific collection for a user.
//    * @param {string} userId - The ID of the user who owns the collection.
//    * @param {string} collectionId - The ID of the collection to be deleted.
//    * @returns {Promise<Object>} The response from the server.
//    * ! NOTE: the return value is the updated collection data
//    */
//   const deleteCollection = async (collectionId) =>
//     fetchWrapper(`/${collectionId}`, 'DELETE');

//   /**
//    * Adds new cards to a specific collection.
//    * @param {string} userId - The ID of the user who owns the collection.
//    * @param {string} collectionId - The ID of the target collection.
//    * @param {Array} cards - Array of card objects to be added.
//    * ! NOTE: Each card added using this route should be new data from the API with its' quantity field set to 1.
//    * TODO: add validation to ensure the card doesnt already exist in the collection --> if it does, then ref it to updatExistingCardsInCollection()
//    * TODO: add useCount() hook to update the card quantity in the allCollections data
//    * TODO: add useObjectState() hook to update nearly all fields of the current collection
//    * TODO: add useSet() hook to update various fields pertaining to allCollections
//    * ! NOTE: the return value is the updated collection data
//    * @returns {Promise<Object>} The response from the server.
//    */
//   // Example implementation of useObjectState and useSet hooks in addCardsToCollection
//   const addCardsToCollection = async (collectionId, cards) => {
//     cards?.forEach((card) => incrementQuantity()); // Update card quantity
//     const response = await fetchWrapper(createApiUrl(`/${collectionId}/add`, 'POST', {
//       cards,
//     }));
//     setSelectedCollection(response?.data);
//     addToAllCollectionsSet(collectionId);
//     return response;
//   };
//   /**
//    * Removes cards from a specific collection.
//    * @param {string} userId - The ID of the user who owns the collection.
//    * @param {string} collectionId - The ID of the collection from which cards are being removed.
//    * @param {Array} cardIds - Array of card object IDs to be removed.
//    * ! NOTE: This route is used for removing cards from a collection, not for decrementing the quantity of a card.
//    * TODO: add validation to ensure the card exists in the collection.
//   // COMPLETED -->  * TODO: add useObjectState() hook to update nearly all fields of the current collection
//    * ! NOTE: the return value is the updated collection data
//    * @returns {Promise<Object>} The response from the server.
//    */
//   // Example implementation in removeCardsFromCollection
//   const removeCardsFromCollection = async (collectionId, cardIds) => {
//     const response = await fetchWrapper(createApiUrl(`/${collectionId}/add`, 'DELETE', {
//       cardIds,
//     }));
//     setSelectedCollection(response?.data);
//     return response;
//   };
//   /**
//    * Updates specific cards within a collection.
//    * @param {string} userId - The ID of the user who owns the collection.
//    * @param {string} collectionId - The ID of the collection in which cards are being updated.
//    * @param {Array} cards - Array of card objects with updated data. Each card object should include card ID and updated quantity.
//    * @param {string} incrementType - Determines if the card count should be incremented or decremented.
//    * ! NOTE: This route is used for updating cards in a collection, not for adding new cards.
//    * TODO: add validation to ensure the card exists in the collection.
//    * TODO: if the card quantity is 0, then ref it to removeCardsFromCollection()
//    * ! NOTE: if the card quantity is 0, the card will be removed from the collection.
//    * TODO: add useSet() hook to update various fields pertaining to allCollections in context
//    * ! NOTE: the return value is the updated collection data
//    * @returns {Promise<Object>} The response from the server.
//    */
//   const updateCardsInCollection = async (
//     collectionId,
//     cards,
//     incrementType
//   ) => {
//     // Updating card quantity based on incrementType
//     if (incrementType === 'increment') {
//       incrementQuantity();
//     } else if (incrementType === 'decrement') {
//       decrementQuantity();
//     }
// 		const response = await fetchWrapper(createApiUrl(`/${collectionId}/update`, 'PUT', {
// 			cards,
// 		}));
//     setSelectedCollection(response?.data);
//     return response;
//   };

//   /**
//    * Updates the chart data for a specific collection.
//    * @param {string} userId - The ID of the user who owns the collection.
//    * @param {string} collectionId - The ID of the collection for which chart data is being updated.
//    * @param {Object} chartData - The updated chart data for the collection. The structure of this data depends on how chart data is managed in your application.
//    * @returns {Promise<Object>} The response from the server.
//    * The destructured response data = {
//    * 	@param {Object} chartMessage: String,
//    * 	@param {Array} allXYValues: Array,
//    * 	@param {Array} upatedCards: Array,
//    * }
//    * TODO: add useSet() hook to update various fields pertaining to allCollections in context
//    * TODO: add useObjectState() hook to update the chartData and cards fields of the current collection
//    */

//   // Example implementation in updateChartDataInCollection
//   const updateChartDataInCollection = async (collectionId, chartData) => {
//     // TODO: Use useSet hook to update fields pertaining to allCollections in context
//     // TODO: Use useObjectState hook to update the chartData and cards fields of the current collection
// 		const response = await fetchWrapper(createApiUrl(`/${collectionId}/updateChartData`, 'PUT', chartData));
// 		setSelectedCollection(prev => ({ ...prev, chartData }));
// 		return response;
// 		};
//   };

//   const contextValue = useMemo(
//     () => ({
//       allCollections,
//       selectedCollection,
//       collectionData,
//       cards: selectedCollection?.cards,
//       currentChartDataSets2: selectedCollection?.currentChartDataSets2,
//       totalPrice: selectedCollection?.totalPrice,
//       totalQuantity: selectedCollection?.totalQuantity,
//       latestPrice: selectedCollection?.latestPrice,
//       lastSavedPrice: selectedCollection?.lastSavedPrice,
//       collectionPriceHistory: selectedCollection?.collectionPriceHistory || [],
//       allXYValues: selectedCollection?.chartData?.allXYValues || [],

// 			createNewCollection,
// 			getAllCollectionsForUser,
// 			updateAndSyncCollection,
// 			deleteCollection,
// 			addCardsToCollection,
// 			removeCardsFromCollection,
// 			updateCardsInCollection,
// 			updateChartDataInCollection,
//     }),
//     [allCollections, selectedCollection]
//   );
//   useEffect(() => {
//     console.log('COLLECTION CONTEXT:', {
//       selectedCollection: contextValue.selectedCollection,
//       allCollections: contextValue.allCollections,
//       collectionData: contextValue.collectionData,
//       cards: contextValue.cards,
//       totalPrice: contextValue.totalPrice,
//       totalQuantity: contextValue.totalQuantity,
//       currentChartDataSets2: contextValue.currentChartDataSets2,
//       collectionPriceHistory: contextValue.collectionPriceHistory,
//       lastSavedPrice: contextValue.lastSavedPrice,
//       latestPrice: contextValue.latestPrice,
//       allXYValues: contextValue.allXYValues,
//     });
//   }, [selectedCollection.cards]);

//   return (
//     <CollectionContext.Provider value={contextValue}>
//       {children}
//     </CollectionContext.Provider>
//   );
// };

// export const useCollectionStore = () => {
//   const context = useContext(CollectionContext);
//   if (!context) {
//     throw new Error('useCollectionStore must be used within a CollectionProvider');
//   }
//   return context;
// };
