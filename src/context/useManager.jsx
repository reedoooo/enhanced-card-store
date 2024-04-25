/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useMemo, useState } from 'react';
import useFetchWrapper from './hooks/useFetchWrapper';
import useLogger from './hooks/useLogger';
import useManageCookies from './hooks/useManageCookies';
import useLocalStorage from './hooks/useLocalStorage';

const useManager = () => {
  const { fetchWrapper } = useFetchWrapper();
  const { getCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const logger = useLogger('CollectionManager');

  const [collections, setCollections] = useState([]);
  const [decks, setDecks] = useState([]);
  const [updatedDecks, setUpdatedDecks] = useState([]);
  // const [cart, setCart] = useState({});
  const [customError, setCustomError] = useState('');

  const [selectedCollection, setSelectedCollection] = useLocalStorage(
    'selectedCollection',
    null
  );
  const [collectionMetaData, setCollectionMetaData] = useLocalStorage(
    'collectionMetaData',
    []
  );
  const compileCollectionMetaData = useCallback(
    (allCollections) => {
      if (!allCollections || allCollections.length === 0) return;

      let totalValue = 0;
      let collectionCards = allCollections.reduce((acc, collection) => {
        const collectionPrice = parseFloat(collection?.totalPrice);
        if (isNaN(collectionPrice)) return acc;
        totalValue += collectionPrice;
        return acc.concat(collection.cards);
      }, []);

      const uniqueCards = new Map();
      collectionCards.forEach((card) => {
        if (
          !uniqueCards.has(card.id) &&
          card?.variant?.cardModel === 'CardInCollection'
        ) {
          uniqueCards.set(card.id, card);
        }
      });

      const uniqueCardsArray = Array.from(uniqueCards.values());
      const topFiveCardsInCollection = uniqueCardsArray
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

      const metaData = {
        totalValue,
        numCardsCollected: collectionCards.reduce(
          (total, card) => total + card.quantity,
          0
        ),
        numCollections: allCollections.length,
        topFiveCards: topFiveCardsInCollection,
        tooltips: [], // If tooltips are dynamically calculated, this needs to be adjusted
        pieChartData: allCollections.map((collection) => ({
          name: collection.name,
          value: parseFloat(collection.totalPrice),
        })),
      };

      console.log('META DATA', metaData);
      setCollectionMetaData(metaData);
    },
    [collections, setCollectionMetaData]
  );

  const [selectedDeck, setSelectedDeck] = useLocalStorage('selectedDeck', null);
  const [cart, setCart] = useLocalStorage('cart', null);
  const [hasFetchedCollections, setHasFetchedCollections] = useState(false);
  const [hasFetchedDecks, setHasFetchedDecks] = useState(false);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);
  const [updated, setUpdated] = useState(false);

  const baseUrl = `${process.env.REACT_APP_SERVER}/api/users/${userId}`;

  const createApiUrl = (entity, action) => `${baseUrl}/${entity}/${action}`;
  const updateDecksState = useCallback(
    (newDecks) => {
      setDecks((prevDecks) => {
        // Ensuring a new array reference is created
        return [
          ...prevDecks.filter(
            (deck) => !newDecks.find((newDeck) => newDeck._id === deck._id)
          ),
          ...newDecks,
        ];
      });
    },
    [setDecks]
  );

  const fetchEntities = useCallback(
    async (entity) => {
      try {
        const response = await fetchWrapper(
          createApiUrl(entity, 'all'),
          'GET',
          null,
          `fetch${entity}`
        );
        if (entity === 'cart') {
          setCart(response.data);
          setHasFetchedCart(true);
          console.log('CART:', cart);
          return response.data;
        } else if (entity === 'collections') {
          setCollections(response.data);
          compileCollectionMetaData(response.data);
          setHasFetchedCollections(true);
          console.log('COLLECTIONS:', collections);
          return response.data;
        } else {
          // const newDeckValues = [...decks, ...response.data];
          // console.log('DECKS:', newDeckValues);
          updateDecksState(response.data);
          // setDecks(
          //   response.data.map((deck) => ({
          //     ...deck,
          //     cards: deck.cards.map((card) => ({
          //       ...card,
          //       quantity: card.quantity,
          //     })),
          //   }))
          // );
          setHasFetchedDecks(true);
          console.log('DECKS:', decks);
          return response.data;
        }

        // setHasFetchedCollections(true);
      } catch (error) {
        logger.logError('Fetch Error:', error);
        setCustomError('Failed to fetch data');
      }
    },
    [fetchWrapper, logger, setCart, setCollections, setDecks]
  );
  const fetchSingleEntity = useCallback(
    async (entity, id) => {
      try {
        const response = await fetchWrapper(
          createApiUrl(entity, `get/${id}`),
          'GET',
          null,
          `fetch${entity}`
        );
        return response.data;
      } catch (error) {
        logger.logError('Fetch Error:', error);
        setCustomError('Failed to fetch data');
      }
    },
    [fetchWrapper, logger]
  );
  const refreshAllEntities = useCallback(() => {
    ['collections', 'decks', 'cart'].forEach((entity) => fetchEntities(entity));
  }, [fetchEntities]);
  useEffect(() => {
    if (collections.length && !selectedCollection) {
      setSelectedCollection(collections[0]);
    }
    if (decks.length && !selectedDeck) {
      setSelectedDeck(decks[0]);
    }
  }, [collections, decks]);
  const handleSelectEntity = useCallback(
    (entityName, entityData) => {
      if (entityName === 'collection') {
        setSelectedCollection(entityData);
      } else if (entityName === 'deck') {
        setSelectedDeck(entityData);
      }
    },
    [setSelectedCollection, setSelectedDeck]
  );
  const updateEntityField = useCallback(
    async (entity, id, field, value) => {
      if (!isLoggedIn) {
        setCustomError('User is not logged in');
        return;
      }
      const url = createApiUrl(entity, `update/${id}`);
      const data = { [field]: value }; // Construct data object dynamically based on field and value
      try {
        const response = await fetchWrapper(
          url,
          'PUT',
          data,
          `update${entity}`
        );
        if (response && response.data) {
          // Assuming the server returns the updated entity
          switch (entity) {
            case 'collections':
              setCollections((prev) =>
                prev.map((col) =>
                  col._id === id ? { ...col, ...response.data } : col
                )
              );
              break;
            case 'decks':
              setDecks((prev) =>
                prev.map((deck) =>
                  deck._id === id ? { ...deck, ...response.data } : deck
                )
              );
              break;
            case 'cart':
              if (id === cart._id) {
                setCart({ ...cart, ...response.data });
              }
              break;
            default:
              throw new Error(`Unhandled entity type: ${entity}`);
          }
          setUpdated(true); // Optionally trigger a state update if needed
        }
      } catch (error) {
        logger.logError(
          `Error updating ${field} in ${entity} with ID ${id}:`,
          error
        );
        setCustomError(`Failed to update ${field} in ${entity}`);
      }
    },
    [isLoggedIn, fetchWrapper, logger, setCart, setCollections, setDecks, cart]
  );
  const handleEntityOperation = useCallback(
    async (entity, endpoint, action, data) => {
      if (!isLoggedIn) {
        setCustomError('User is not logged in');
        return;
      }
      const loadingID = `${action}${entity}`.toUpperCase();
      console.log(loadingID);
      const url = createApiUrl(entity, endpoint);
      const method = endpoint.includes('delete')
        ? 'DELETE'
        : endpoint.includes('create') || endpoint.includes('add')
          ? 'POST'
          : 'PUT';

      try {
        const response = await fetchWrapper(url, method, data, loadingID);
        if (response && response.data) {
          // Update the relevant state based on the entity type
          switch (entity) {
            case 'collections':
              setCollections((prev) =>
                prev.map((col) =>
                  col._id === response.data._id ? response.data : col
                )
              );
              break;
            case 'decks':
              console.log('PREV DECKS:', decks);
              console.log('UPDATED DECKS:', response?.data?.data);
              const prevDecks = [...decks];
              const updatedDecks = prevDecks.map((deck) =>
                deck._id === response?.data?.data?._id
                  ? response?.data?.data
                  : deck
              );
              setUpdatedDecks(updatedDecks);
              setUpdated(true);

              // setDecks(updatedDecks);
              // setDecks((prev) =>
              //   prev.map((deck) =>
              //     deck._id === response.data._id ? response.data : deck
              //   )
              // );
              break;
            case 'cart':
              setCart(response.data);
              break;
            default:
              throw new Error(`Unhandled entity type: ${entity}`);
          }
        }
        setUpdated(true);
        // fetchEntities(entity);
      } catch (error) {
        logger.logError(`Error performing ${endpoint} on ${entity}:`, error);
        setCustomError(`Failed to ${endpoint} ${entity}`);
      }
    },
    [isLoggedIn, fetchWrapper, logger, setCart, setCollections, setDecks]
  );

  const addEntity = useCallback(
    (entity, data) => handleEntityOperation(entity, 'create', null, data),
    [handleEntityOperation]
  );
  const updateEntity = useCallback(
    (entity, id, data) =>
      handleEntityOperation(entity, `update/${id}`, id, data),
    [handleEntityOperation]
  );
  const deleteEntity = useCallback(
    (entity, id) => handleEntityOperation(entity, `delete/${id}`, id),
    [handleEntityOperation]
  );
  const addCardToEntity = useCallback(
    (entity, card) => {
      console.log('CARD:', card);
      console.log('ENTITY:', entity);
      if (entity === 'cart') {
        return handleEntityOperation(entity, 'cards/add', null, {
          items: [card],
        });
      }
      const selectEntVal =
        entity === 'collections' ? selectedCollection._id : selectedDeck._id;
      handleEntityOperation(entity, `${selectEntVal}/cards/add`, selectEntVal, {
        cards: [card],
      });
    },
    [handleEntityOperation]
  );
  const incrementCardInEntity = useCallback(
    (entity, id, cardId) =>
      handleEntityOperation(entity, 'incrementCard', `${id}/cards/${cardId}`),
    [handleEntityOperation]
  );
  const decrementCardInEntity = useCallback(
    (entity, id, cardId) =>
      handleEntityOperation(entity, 'decrementCard', `${id}/cards/${cardId}`),
    [handleEntityOperation]
  );
  const removeCardFromEntity = useCallback(
    (entity, id, cardId) =>
      handleEntityOperation(entity, 'deleteCard', `${id}/cards/${cardId}`),
    [handleEntityOperation]
  );

  // Memoized return values to prevent unnecessary re-renders
  return useMemo(
    () => ({
      collections,
      decks,
      cart,
      customError,
      hasFetchedCollections,
      hasFetchedDecks,
      hasFetchedCart,

      // Fetch functions
      fetchCollections: () => fetchEntities('collections'),
      fetchDecks: () => fetchEntities('decks'),
      fetchDeckById: (id) => fetchSingleEntity('decks', id),
      setDecks,
      fetchCart: () => fetchEntities('cart'),
      // CRUD operations
      addCollection: (data) => addEntity('collections', data),
      updateCollection: (id, data) => updateEntity('collections', id, data),
      deleteCollection: (id) => deleteEntity('collections', id),
      addItemToCollection: (item) => addCardToEntity('collections', item),
      removeItemFromCollection: (collectionId, itemId) =>
        removeCardFromEntity('collections', collectionId, itemId),

      addDeck: (data) => addEntity('decks', data),
      updateDeck: (id, data) => updateEntity('decks', id, data),
      deleteDeck: (id) => deleteEntity('decks', id),
      addItemToDeck: (item) => addCardToEntity('decks', item),
      removeItemFromDeck: (deckId, itemId) =>
        removeCardFromEntity('decks', deckId, itemId),

      updateCart: (id, data) => updateEntity('cart', id, data),
      addItemToCart: (item) => addCardToEntity('cart', item),
      incrementItemInCart: (itemId) => incrementCardInEntity('cart', itemId),
      decrementItemInCart: (itemId) => decrementCardInEntity('cart', itemId),
      removeItemFromCart: (itemId) => removeCardFromEntity('cart', itemId),

      // Selection Handlers
      handleSelectCollection: (data) => handleSelectEntity('collection', data),
      handleSelectDeck: (data) => handleSelectEntity('deck', data),

      fetchEntities,
      updateEntityField,
      refreshAllEntities,
      setUpdated,
      updated,
      updatedDecks,
      selectedCollection,
      selectedDeck,
      selectedCollectionId: selectedCollection?._id,
      selectedDeckId: selectedDeck?._id,
      // selectedCartId,
    }),
    [
      collections,
      decks,
      cart,
      customError,
      hasFetchedCollections,
      updated,
      fetchEntities,
      addEntity,
      updateEntity,
      deleteEntity,
      addCardToEntity,
      incrementCardInEntity,
      decrementCardInEntity,
      removeCardFromEntity,
      setUpdated,
    ]
  );
};

export default useManager;
