/* eslint-disable no-case-declarations */
import { useCallback, useMemo, useState } from 'react';
import { useFetchWrapper, useLocalStorage, useManageCookies } from 'context';
// const useCleanId = (id) => encodeURIComponent(id.replace(/"/g, ''));
const useManager = () => {
  const { fetchWrapper, status } = useFetchWrapper();
  const { getCookie } = useManageCookies();
  const { isLoggedIn, userId } = getCookie(['isLoggedIn', 'userId']);
  const [customError, setCustomError] = useState('');
  const baseUrl = `${process.env.REACT_APP_SERVER}/api/users/${userId}`;
  const createApiUrl = (entity, action) => `${baseUrl}/${entity}/${action}`;
  const cleanId = (id) => encodeURIComponent(id.replace(/"/g, ''));

  // State management for all entities using useState
  const [decks, setDecks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [cart, setCart] = useState([]);

  // State management for selected entities using useLocalStorage
  const [selectedDeck, setSelectedDeck] = useLocalStorage('selectedDeck', {});
  const [selectedCollection, setSelectedCollection] = useLocalStorage(
    'selectedCollection',
    {}
  );
  const [selectedDeckId, setSelectedDeckId] = useLocalStorage(
    'selectedDeckId',
    null
  );
  const [selectedCollectionId, setSelectedCollectionId] = useLocalStorage(
    'selectedCollectionId',
    null
  );
  // State management for operational flags
  const [hasFetchedDecks, setHasFetchedDecks] = useState(false);
  const [hasFetchedCollections, setHasFetchedCollections] = useState(false);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);
  const [hasFetchedCards, setHasFetchedCards] = useState(false);

  const [hasUpdatedDecks, setHasUpdatedDecks] = useState(false);
  const [hasUpdatedCollections, setHasUpdatedCollections] = useState(false);
  const [hasUpdatedSelectedDeck, setHasUpdatedSelectedDeck] = useState(false);
  const [hasUpdatedCards, setHasUpdatedCards] = useState(false);

  const [hasFetched, setHasFetched] = useLocalStorage('hasFetched', {
    initFetch: false,
    cards: false,
    collections: false,
    decks: false,
    cart: false,
  });
  const [selectedIds, setSelectedIds] = useLocalStorage('selectedIds', {
    selectedCollectionId: null,
    selectedDeckId: null,
  });

  // DATA
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

      setCollectionMetaData(metaData);
    },
    [collections, setCollectionMetaData]
  );
  // FETCHING ENTITIES
  const handleSelectEntity = useCallback(
    (entityName, entityData) => {
      if (entityName === 'collection' && entityData) {
        setSelectedCollection(entityData);
        setSelectedCollectionId(entityData?._id);
        setSelectedIds((state) => ({
          ...state,
          selectedCollectionId: entityData?._id,
        }));
      } else if (entityName === 'deck' && entityData) {
        setSelectedDeck(entityData);
        // setSelectedDeck((state) => ({ ...state, entityData }));
        setSelectedDeckId(entityData?._id);
        setSelectedIds((state) => ({
          ...state,
          selectedDeckId: entityData?._id,
        }));
      }
    },
    [setSelectedCollection, setSelectedDeck]
  );
  const fetchEntities = useCallback(
    async (entity) => {
      const loadingID = `FETCH_ALL_${entity.toUpperCase()}`;
      const url = createApiUrl(entity, 'all');
      try {
        const response = await fetchWrapper(url, 'GET', null, loadingID);
        switch (entity) {
          case 'decks':
            setDecks(response.data);
            setHasFetched((state) => ({ ...state, decks: true }));
            setHasFetchedDecks(true);
            break;
          case 'collections':
            setCollections(response.data);
            compileCollectionMetaData(response.data);
            setHasFetched((state) => ({ ...state, collections: true }));
            setHasFetchedCollections(true);
            break;
          case 'cart':
            setCart(response.data);
            setHasFetched((state) => ({ ...state, cart: true }));
            setHasFetchedCart(true);
            break;
          default:
            console.error(`Unhandled entity type: ${entity}`);
        }
        return response.data;
      } catch (error) {
        console.error('ERROR FETCHING ENTITIES', error);
        setCustomError('Failed to fetch data');
      }
    },
    [
      fetchWrapper,
      setCollections,
      setDecks,
      setHasFetchedCollections,
      setHasFetchedDecks,
      setHasFetchedCart,
      setHasFetched,
      setCart,
      compileCollectionMetaData,
    ]
  );
  const fetchSingleEntity = useCallback(
    async (entity, id) => {
      const response = await fetchWrapper(
        createApiUrl(entity, `get/${cleanId(id)}`),
        'GET',
        null,
        `fetch${entity}`.toLocaleUpperCase()
      );
      handleSelectEntity(entity, response.data);
      return response.data;
    },
    [fetchWrapper, handleSelectEntity]
  );
  // UPDATING ENTITIES
  const handleEntityOperation = useCallback(
    async (entity, endpoint, action, data, method, idValue) => {
      if (!isLoggedIn) {
        setCustomError('User is not logged in');
        return;
      }
      const loadingID = `${action}${entity}`.toUpperCase();
      const url = createApiUrl(entity, endpoint);
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
              // const prevDecks = [...decks];
              // const updatedDecks = prevDecks.map((deck) =>
              //   deck._id === response?.data?.data?._id
              //     ? response?.data?.data
              //     : deck
              // );
              setDecks((prev) =>
                prev.map((deck) =>
                  deck._id === idValue ? { ...deck, ...response.data } : deck
                )
              );
              // setDecks(updatedDecks);
              handleSelectEntity('deck', response.data);
              setHasUpdatedCards(true);
              setHasUpdatedDecks(true);
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
        console.log(`Error performing ${endpoint} on ${entity}:`, error);
        setCustomError(`Failed to ${endpoint} ${entity}`);
      }
    },
    [
      isLoggedIn,
      fetchWrapper,
      setCart,
      setCollections,
      setDecks,
      setHasUpdatedCards,
    ]
  );
  const updateEntityField = useCallback(
    async (entity, id, fields, values) => {
      if (!isLoggedIn) {
        setCustomError('User is not logged in');
        return;
      }
      // Prepare data object from fields and values
      let data = {};
      if (Array.isArray(fields) && Array.isArray(values)) {
        fields.forEach((field, index) => {
          data[field] = values[index];
        });
      } else {
        data[fields] = values;
      }

      // Construct endpoint and action
      const endpoint = `update/${cleanId(id)}`;
      const action = `update_${entity}`;

      // Use handleEntityOperation to perform the update
      handleEntityOperation(entity, endpoint, action, data, 'PUT', id);
    },
    [handleEntityOperation, isLoggedIn, setCustomError]
  );
  const addEntity = useCallback(
    (entity, data) =>
      handleEntityOperation(entity, 'create', 'add_', data, 'POST')[
        handleEntityOperation
      ]
  );
  const updateEntity = useCallback(
    async (entity, data) => {
      const localEntity = entity === 'decks' ? 'Deck' : 'Collection';
      const id = localStorage.getItem('selected' + localEntity + 'Id');
      const cleanedId = encodeURIComponent(id.replace(/"/g, ''));
      console.log('UPDAtING', entity, data);
      handleEntityOperation(
        entity,
        `update/${cleanedId}`,
        'update_',
        data,
        'PUT'
      );
    },
    [handleEntityOperation]
  );
  const deleteEntity = useCallback(
    async (entity, id) =>
      handleEntityOperation(
        entity,
        `delete/${id}`,
        'delete_',
        {
          id: id,
        },
        'DELETE'
      ),
    [handleEntityOperation]
  );
  const addCardToEntity = useCallback(
    (entity, card) => {
      if (entity === 'cart') {
        let type = '';
        const cardExists = cart?.items?.find((c) => c.id === card.id);
        if (cardExists) {
          type = 'increment';
        } else {
          type = 'addNew';
        }
        return handleEntityOperation(
          entity,
          'cards/add',
          'add_cards_to_',
          {
            cards: [card],
            type: type,
          },
          'POST'
        );
      }
      const selectEntVal =
        entity === 'collections' ? selectedCollection?._id : selectedDeck?._id;
      const selectedEntity =
        entity === 'collections' ? selectedCollection : selectedDeck;
      let type = '';
      const cardExists = selectedEntity?.cards?.find((c) => c.id === card.id);
      if (cardExists) {
        type = 'increment';
      } else {
        type = 'addNew';
      }
      handleEntityOperation(
        entity,
        `${selectEntVal}/cards/add`,
        'add_cards_to_',
        {
          cards: [card],
          type: type,
        },
        'POST'
      );
    },
    [handleEntityOperation]
  );
  const removeCardFromEntity = useCallback(
    (entity, item) => {
      if (entity == 'cart') {
        let type = '';
        let action = '';
        const cardExists = cart?.items?.find((c) => c.id === item.id);
        const existingCardId = cart?.items?.find((c) => c.id === item.id)?._id;

        if (cardExists) {
          type = 'decrement';
          action = 'remove_cards_from_';
        } else {
          type = 'delete';
          action = 'delete_cards_from_';
        }
        handleEntityOperation(
          entity,
          `cards/${existingCardId}/remove`,
          action,
          {
            cards: [item.id],
            type: type,
          },
          'DELETE'
        );
      }
      const selectEntVal =
        entity === 'collections'
          ? localStorage.getItem('selectedCollectionId')
          : localStorage.getItem('selectedDeckId');
      const selectedEntity =
        entity === 'collections' ? selectedCollection : selectedDeck;
      let type = '';
      let action = '';
      const cleanedId = encodeURIComponent(selectEntVal.replace(/"/g, ''));

      const cardExists = selectedEntity?.cards?.find((c) => c.id === item.id);
      const existingCard = selectedEntity?.cards?.find((c) => c.id === item.id);
      if (cardExists && existingCard.quantity > 1) {
        type = 'decrement';
        action = 'remove_cards_from_';
      } else {
        type = 'delete';
        action = 'delete_cards_from_';
      }
      handleEntityOperation(
        entity,
        `${cleanedId}/cards/${existingCard?._id}/remove`,
        action,
        {
          cards: [existingCard?.id],
          type: type,
        },
        'DELETE'
      );
    },
    [handleEntityOperation]
  );

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
      fetchCart: () => fetchEntities('cart'),
      // CRUD operations
      addCollection: (data) => addEntity('collections', data),
      updateCollection: (data) => updateEntity('collections', data),
      deleteCollection: (id) => deleteEntity('collections', id),
      addItemToCollection: (item) => addCardToEntity('collections', item),
      removeItemFromCollection: (item) =>
        removeCardFromEntity('collections', item),

      addDeck: (data) => addEntity('decks', data),
      deleteDeck: (id) => deleteEntity('decks', id),
      addItemToDeck: (item) => addCardToEntity('decks', item),
      removeItemFromDeck: (item) => removeCardFromEntity('decks', item),

      updateCart: (id, data) => updateEntity('cart', id, data),
      addItemToCart: (item) => addCardToEntity('cart', item),
      removeItemFromCart: (data) => removeCardFromEntity('cart', null, data),

      // Selection Handlers
      handleSelectCollection: (data) => handleSelectEntity('collection', data),
      handleSelectDeck: (data) => handleSelectEntity('deck', data),

      setHasFetchedCollections,
      setHasFetchedDecks,
      setHasFetchedCart,
      fetchEntities,
      updateEntityField,
      setHasUpdatedCards,
      setHasFetchedCards,
      setHasUpdatedDecks,
      setHasUpdatedSelectedDeck,
      compileCollectionMetaData,
      collectionMetaData,
      selectedCollection,
      selectedDeck,
      status,
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
      status,

      compileCollectionMetaData,
      setHasUpdatedCards,
      setHasFetchedCollections,
      setHasFetchedDecks,
      setHasFetchedCart,
      setHasFetchedCards,
      fetchEntities,
      addEntity,
      updateEntity,
      deleteEntity,
      addCardToEntity,
      removeCardFromEntity,
      handleSelectEntity,
    ]
  );
};

export default useManager;
