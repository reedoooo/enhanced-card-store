/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useMemo, useState } from 'react';
import useFetchWrapper from './hooks/useFetchWrapper';
import useLogger from './hooks/useLogger';
import useManageCookies from './hooks/useManageCookies';
import useLocalStorage from './hooks/useLocalStorage';
import useSelectedContext from './hooks/useSelectedContext';

const useManager = () => {
  const { fetchWrapper } = useFetchWrapper();
  const { getCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const logger = useLogger('CollectionManager');
  const [customError, setCustomError] = useState('');
  const baseUrl = `${process.env.REACT_APP_SERVER}/api/users/${userId}`;
  const { selectedContext } = useSelectedContext();

  const createApiUrl = (entity, action) => `${baseUrl}/${entity}/${action}`;
  // DECKS
  const [decks, setDecks] = useLocalStorage('decks', []);
  const [selectedDeck, setSelectedDeck] = useLocalStorage('selectedDeck', null);
  const [selectedDeckId, setSelectedDeckId] = useLocalStorage(
    'selectedDeckId',
    null
  );
  const [hasFetchedDecks, setHasFetchedDecks] = useState(false);
  const [hasUpdatedDecks, setHasUpdatedDecks] = useState(false);
  const [hasUpdatedSelectedDeck, setHasUpdatedSelectedDeck] = useState(false);

  // COLLECTIONS
  const [collections, setCollections] = useState([]);
  // const [collections, setCollections] = useLocalStorage('collections', []);

  const [selectedCollection, setSelectedCollection] = useLocalStorage(
    'selectedCollection',
    null
  );
  const [selectedCollectionId, setSelectedCollectionId] = useLocalStorage(
    'selectedCollectionId',
    null
  );
  const [hasFetchedCollections, setHasFetchedCollections] = useState(false);

  // CART
  const [cart, setCart] = useLocalStorage('cart', null);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  // CARDS
  const [hasFetchedCards, setHasFetchedCards] = useState(false);
  const [hasUpdatedCards, setHasUpdatedCards] = useState(false);

  // DATA
  const [collectionMetaData, setCollectionMetaData] = useLocalStorage(
    'collectionMetaData',
    []
  );
  const [cardsWithQuantities, setCardsWithQuantities] = useLocalStorage(
    'cardsWithQuantities',
    {}
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
  const compileCardsWithQuantities = useCallback(() => {
    if (!collections && !decks && !cart) return [];

    const cards = [...(cart?.items || [])];
    collections.forEach((collection) => {
      if (!collection.cards) return;
      cards.push(...collection.cards);
    });
    decks.length > 1 &&
      decks?.forEach((deck) => {
        cards.push(...deck.cards);
      });
    // MAP CARDS BY ID AND SET VALUE AS STRING --> '[card.variant.modelName][card.name]: card quantity'
    const cardsWithQuantities = cards.reduce((acc, card) => {
      if (!card.id) return acc;
      if (!acc[card.id]) {
        acc[card.id] =
          `${card.variant.cardModel}[${card.name}]: ${card.quantity}`;
      } else {
        acc[card.id] =
          `${acc[card.id]}, ${card.variant.cardModel}[${card.name}]: ${card.quantity}`;
      }
      return acc;
    }, {});
    setCardsWithQuantities(cardsWithQuantities);
    console.log('COMPILING ALL CARDS WITH QUANTITIES', cards);
    // const cardQuantities = cards.reduce((acc, card) => {
    //   acc[card.id] = (acc[card.id] || 0) + card.quantity;
    //   return acc;
    // }, {});
    return cards;
  }, [collections, decks, cart, setCardsWithQuantities]);
  let BASE_STAT_CONFIGS = [
    { name: 'highPoint', statKey: 'highPoint', label: 'High Point' },
    { name: 'lowPoint', statKey: 'lowPoint', label: 'Low Point' },
    { name: 'average', statKey: 'average', label: 'Average' },
    {
      name: 'percentageChange',
      statKey: 'percentageChange',
      label: 'Percentage Change',
    },
    { name: 'priceChange', statKey: 'priceChange', label: 'Price Change' },
    { name: 'avgPrice', statKey: 'avgPrice', label: 'Average Price' },
    { name: 'volume', statKey: 'volume', label: 'Volume' },
    { name: 'volatility', statKey: 'volatility', label: 'Volatility' },
  ];
  const generateCollectionStatistics = useCallback(
    (allCollections) => {
      if (!allCollections) return;
      compileCollectionMetaData(allCollections);
      compileCardsWithQuantities();
    },
    [collections, setCollectionMetaData, compileCardsWithQuantities]
  );
  const isCardInContext = useCallback(
    (card) => {
      const cardsList = {
        Collection: selectedCollection?.cards,
        Deck: selectedDeck?.cards,
        Cart: cart?.items,
      };
      return !!cardsList[selectedContext]?.find((c) => c?.id === card?.id);
    },
    [selectedContext, selectedCollection, selectedDeck, cart]
  );
  // FETCHING ENTITIES
  const handleSelectEntity = useCallback(
    (entityName, entityData) => {
      if (entityName === 'collection') {
        console.log('SELECTED COLLECTION', entityData);
        setSelectedCollection(entityData);
        setSelectedCollectionId(entityData?._id);
      } else if (entityName === 'deck') {
        console.log('SELECTED DECK', entityData);
        setSelectedDeck(entityData);
        setSelectedDeckId(entityData?._id);
      }
    },
    [setSelectedCollection, setSelectedDeck]
  );
  const fetchEntities = useCallback(
    async (entity) => {
      try {
        const response = await fetchWrapper(
          createApiUrl(entity, 'all'),
          'GET',
          null,
          `fetchAll${entity}`.toLocaleUpperCase()
        );
        if (entity === 'cart') {
          setCart(response.data);
          setHasFetchedCart(true);
          return response.data;
        } else if (entity === 'collections') {
          setCollections(response.data);
          generateCollectionStatistics(response.data);
          setHasFetchedCollections(true);
          return response.data;
        } else {
          setDecks(response.data);
          setHasFetchedDecks(true);
          return response.data;
        }
      } catch (error) {
        logger.logError('Fetch Error:', error);
        setCustomError('Failed to fetch data');
      }
    },
    [
      fetchWrapper,
      logger,
      setCollections,
      setDecks,
      setHasFetchedCollections,
      setHasFetchedDecks,
      setHasFetchedCart,
      setCart,
      compileCollectionMetaData,
      generateCollectionStatistics,
    ]
  );
  const fetchSingleEntity = useCallback(
    async (entity, id) => {
      try {
        const response = await fetchWrapper(
          createApiUrl(entity, `get/${id}`),
          'GET',
          null,
          `fetch${entity}`.toLocaleUpperCase()
        );
        // handleSelectEntity(entity, response.data);
        return response.data;
      } catch (error) {
        logger.logError('Fetch Error:', error);
        setCustomError('Failed to fetch data');
      }
    },
    [fetchWrapper, logger]
  );
  const fetchSingleEntityCards = useCallback(
    async (entity, id) => {
      try {
        const response = await fetchWrapper(
          createApiUrl(entity, `${id}/cards/get`),
          'GET',
          null,
          `fetchCardsFor${entity}`.toLocaleUpperCase()
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

  // UPDATING ENTITIES
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
          switch (entity) {
            case 'collections':
              setCollections((prev) =>
                prev.map((col) => {
                  return col._id === response.data._id ? response.data : col;
                })
              );
              break;
            case 'decks':
              console.log('UPDATED DECKS:', response?.data?.data);
              const prevDecks = [...decks];
              const updatedDecks = prevDecks.map((deck) =>
                deck._id === response?.data?.data?._id
                  ? response?.data?.data
                  : deck
              );
              setDecks(updatedDecks);
              handleSelectEntity('deck', response.data.data);
              setHasUpdatedCards(true);
              setHasUpdatedDecks(true);

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
        fetchEntities(entity);
      } catch (error) {
        logger.logError(`Error performing ${endpoint} on ${entity}:`, error);
        setCustomError(`Failed to ${endpoint} ${entity}`);
      }
    },
    [
      isLoggedIn,
      fetchWrapper,
      logger,
      setCart,
      setCollections,
      setDecks,
      setHasUpdatedCards,
    ]
  );
  /**
   * Updates the fields of an entity with the specified values.
   *
   * @param {string} entity - The type of entity to update.
   * @param {string} id - The ID of the entity to update.
   * @param {string|string[]} fields - The field(s) to update.
   * @param {any|any[]} values - The value(s) to set for the field(s).
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   * @example updateEntityFields('collections', '6158888888888', ['name', 'description'], ['New Collection Name', 'New Collection Description']);
   */
  const updateEntityField = useCallback(
    async (entity, id, fields, values) => {
      if (!isLoggedIn) {
        setCustomError('User is not logged in');
        return;
      }
      const cleanedId = encodeURIComponent(id.replace(/"/g, ''));
      const url = createApiUrl(entity, `update/${cleanedId}`);
      let data;
      // Handle updating multiple fields
      if (Array.isArray(fields)) {
        data = fields.reduce((acc, field, index) => {
          acc[field] = values[index];
          return acc;
        }, {});
      } else {
        // If fields is not an array, treat it as a single field with a single value
        data = { [fields]: values };
      }
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
              // const selected = localStorage.getItem('selectedCollectionId');
              setCollections((prev) =>
                prev.map((col) =>
                  col._id === id ? { ...col, ...response.data } : col
                )
              );
              // setSelectedCollection(response.data);
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
        }
      } catch (error) {
        console.error(`Error updating ${entity} fields:`, error);
        setCustomError(`Failed to update ${entity} fields`);
      }
    },
    [isLoggedIn, fetchWrapper, logger, setCart, setCollections, setDecks, cart]
  );
  const addEntity = useCallback(
    (entity, data) => handleEntityOperation(entity, 'create', null, data),
    [handleEntityOperation]
  );
  const updateEntity = useCallback(
    (entity, data) => {
      const localEntity = entity === 'decks' ? 'Deck' : 'Collection';
      const id = localStorage.getItem('selected' + localEntity + 'Id');
      handleEntityOperation(entity, `update/${id}`, 'update', data);
    },
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
      handleEntityOperation(entity, `${selectEntVal}/cards/add`, 'addCardTo', {
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
      customError,

      collections,
      decks,
      cart,

      hasFetchedCollections,
      hasFetchedDecks,
      hasFetchedCart,
      hasFetchedCards,
      hasUpdatedCards,
      hasUpdatedDecks,
      hasUpdatedSelectedDeck,

      // Fetch functions
      fetchCollections: () => fetchEntities('collections'),
      fetchDecks: () => fetchEntities('decks'),
      fetchDeckById: (id) => fetchSingleEntity('decks', id),
      fetchDeckCards: (id) => fetchSingleEntityCards('decks', id),
      fetchCart: () => fetchEntities('cart'),
      // CRUD operations
      addCollection: (data) => addEntity('collections', data),
      updateCollection: (data) => updateEntity('collections', data),
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
      removeItemFromCart: (data) => removeCardFromEntity('cart', data),

      // Selection Handlers
      handleSelectCollection: (data) => handleSelectEntity('collection', data),
      handleSelectDeck: (data) => handleSelectEntity('deck', data),

      checkForCardInContext: isCardInContext,
      compileCardsWithQuantities,
      fetchEntities,
      updateEntityField,
      refreshAllEntities,
      setHasUpdatedCards,
      setHasFetchedCards,
      setHasUpdatedDecks,
      setHasUpdatedSelectedDeck,
      compileCollectionMetaData,
      collectionMetaData,
      selectedCollection,
      selectedDeck,
      // selectedCollectionId: selectedCollection?._id,
      // selectedDeckId: selectedDeck?._id,
      // selectedCartId,
    }),
    [
      collections,
      decks,
      cart,
      customError,
      hasFetchedCollections,
      hasFetchedDecks,
      hasFetchedCart,
      hasFetchedCards,
      hasUpdatedCards,
      collectionMetaData,

      compileCollectionMetaData,
      setHasUpdatedCards,
      setHasFetchedCards,
      fetchSingleEntityCards,
      fetchEntities,
      addEntity,
      updateEntity,
      deleteEntity,
      addCardToEntity,
      incrementCardInEntity,
      decrementCardInEntity,
      removeCardFromEntity,
      handleSelectEntity,
      isCardInContext,
      compileCardsWithQuantities,
    ]
  );
};

export default useManager;
