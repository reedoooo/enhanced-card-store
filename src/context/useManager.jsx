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
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useLocalStorage('selectedDeck', null);
  const [selectedDeckId, setSelectedDeckId] = useLocalStorage(
    'selectedDeckId',
    ''
  );
  const [hasFetchedDecks, setHasFetchedDecks] = useState(false);
  const [hasUpdatedDecks, setHasUpdatedDecks] = useState(false);
  const [hasUpdatedSelectedDeck, setHasUpdatedSelectedDeck] = useState(false);

  // COLLECTIONS
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useLocalStorage(
    'selectedCollection',
    null
  );
  const [selectedCollectionId, setSelectedCollectionId] = useLocalStorage(
    'selectedCollectionId',
    ''
  );
  const [hasFetchedCollections, setHasFetchedCollections] = useState(false);

  // CART
  const [cart, setCart] = useLocalStorage('cart', null);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  // CARDS
  const [hasFetchedCards, setHasFetchedCards] = useState(false);
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

      setCollectionMetaData(metaData);
    },
    [collections, setCollectionMetaData]
  );
  const compileCardsWithQuantities = useCallback(
    (col, dec, car) => {
      if (!col && !dec && !car) return [];
      const cards = [];
      if (!dec !== null) {
        dec?.forEach((d) => {
          if (!d?.cards) return;
          cards.push(...(d?.cards || []));
        });
      }
      if (col !== null) {
        col?.forEach((c) => {
          if (!c?.cards) return;
          cards.push(...(c?.cards || []));
        });
      }
      if (car !== null) {
        if (!car?.items) return;
        cards.push(...(car?.items || []));
      }
      // MAP CARDS BY ID AND SET VALUE AS STRING --> '[card.variant.modelName][card.name]: card quantity'
      const cardsWithQuantities = cards?.reduce((acc, card) => {
        if (!card.id) return acc;
        if (!acc[card.id]) {
          acc[card.id] = {
            CardInCart: '',
            CardInCollection: '',
            CardInDeck: '',
          };
        }
        const modelKey = card?.variant?.cardModel;
        if (modelKey && !acc[card.id][modelKey]) {
          acc[card.id][modelKey] = `${card.name}: ${card.quantity}`;
        } else {
          // Handle updating quantities if card already exists in the accumulator
          const currentQty = parseInt(
            acc[card.id][modelKey].split(': ')[1],
            10
          );
          acc[card.id][modelKey] =
            `${card.name}: ${currentQty + card.quantity}`;
        }
        return acc;
      }, {});
      setCardsWithQuantities((state) => ({ ...state, ...cardsWithQuantities }));
      return cards;
    },
    [setCardsWithQuantities]
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
        setSelectedCollection(entityData);
        setSelectedCollectionId(entityData?._id);
        setSelectedIds((state) => ({
          ...state,
          selectedCollectionId: entityData?._id,
        }));
      } else if (entityName === 'deck') {
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
          setHasFetched((state) => ({ ...state, cart: true }));
          compileCardsWithQuantities(null, null, response.data);
          return response.data;
        } else if (entity === 'collections') {
          setCollections(response.data);
          compileCollectionMetaData(response.data);
          setHasFetchedCollections(true);
          setHasFetched((state) => ({ ...state, collections: true }));
          compileCardsWithQuantities(response.data, null, null);
          const selectedId = localStorage.getItem('selectedCollectionId');
          console.log('SELECTED ID', selectedId);
          if (selectedId) {
            // const collection = response.data.find((col) => {
            //   console.log('ID', JSON.stringify(col._id));
            //   return JSON.stringify(col._id) === JSON.stringify(selectedId); // Ensure both IDs are compared as strings
            // });
            const collection = response.data.find(
              (col) => col._id === selectedId
            );

            console.log('SELECTED COLLECTION', collection);
            console.log('RESPONSE DATA', response.data);
            if (collection) {
              setSelectedCollection(collection);
            } else {
              console.log('Selected collection not found');
              // setSelectedCollection(null); // or handle the absence of the selected collection appropriately
            }
          }
          return response.data;
        } else {
          setDecks(response.data);
          setHasFetchedDecks(true);
          setHasFetched((state) => ({ ...state, decks: true }));
          compileCardsWithQuantities(null, response.data, null);
          return response.data;
        }
      } catch (error) {
        console.error('ERROR FETCHING ENTITIES', error);
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
      setHasFetched,
      setCart,
      compileCollectionMetaData,
      compileCardsWithQuantities,
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
              const selectedId = localStorage.getItem('selectedCollectionId');
              setCollections(response.data);
              // Re-select the collection if it was the one being updated
              // if (selectedId === id) {
              //   const updatedCollection = response.data.find(
              //     (col) => col._id === id
              //   );
              //   setSelectedCollection(updatedCollection);
              // }
              // const selected = localStorage.getItem('selectedCollectionId');
              // setCollections(response.data);
              // // setCollections((prev) =>
              // //   prev.map((col) =>
              // //     col._id === id ? { ...col, ...response.data } : col
              // //   )
              // // );
              // setSelectedCollection((prev) => {

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
    (entity, data) =>
      handleEntityOperation(entity, 'create', `add${entity}`, data),
    [handleEntityOperation]
  );
  const updateEntity = useCallback(
    (entity, data) => {
      const localEntity = entity === 'decks' ? 'Deck' : 'Collection';
      const id = localStorage.getItem('selected' + localEntity + 'Id');
      const cleanedId = encodeURIComponent(id.replace(/"/g, ''));
      console.log('UPDAtING', entity, data);
      handleEntityOperation(entity, `update/${cleanedId}`, 'update', data);
    },
    [handleEntityOperation]
  );
  const deleteEntity = useCallback(
    (entity, id) =>
      handleEntityOperation(entity, `delete/${id}`, 'delete', {
        id: id,
      }),
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
        return handleEntityOperation(entity, 'cards/add', 'addCardTo', {
          cards: [card],
          type: type,
        });
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
      handleEntityOperation(entity, `${selectEntVal}/cards/add`, 'addCardTo', {
        cards: [card],
        type: type,
      });
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
          action = 'removeCardFrom';
        } else {
          type = 'delete';
          action = 'deleteCardFrom';
        }
        handleEntityOperation(
          entity,
          `cards/${existingCardId}/remove`,
          action,
          {
            cards: [item.id],
            type: type,
          }
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
        action = 'removeCardFrom';
      } else {
        type = 'delete';
        action = 'deleteCardFrom';
      }
      handleEntityOperation(
        entity,
        `${cleanedId}/cards/${existingCard?._id}/remove`,
        action,
        {
          cards: [existingCard?.id],
          type: type,
        }
      );
    },
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
      fetchCart: () => fetchEntities('cart'),
      // CRUD operations
      addCollection: (data) => addEntity('collections', data),
      updateCollection: (data) => updateEntity('collections', data),
      deleteCollection: (id) => deleteEntity('collections', id),
      addItemToCollection: (item) => addCardToEntity('collections', item),
      removeItemFromCollection: (item) =>
        removeCardFromEntity('collections', item),

      addDeck: (data) => addEntity('decks', data),
      updateDeck: (data) => updateEntity('decks', data),
      deleteDeck: (id) => deleteEntity('decks', id),
      addItemToDeck: (item) => addCardToEntity('decks', item),
      removeItemFromDeck: (item) => removeCardFromEntity('decks', item),

      updateCart: (id, data) => updateEntity('cart', id, data),
      addItemToCart: (item) => addCardToEntity('cart', item),
      removeItemFromCart: (data) => removeCardFromEntity('cart', null, data),

      // Selection Handlers
      handleSelectCollection: (data) => handleSelectEntity('collection', data),
      handleSelectDeck: (data) => handleSelectEntity('deck', data),

      checkForCardInContext: isCardInContext,
      compileCardsWithQuantities,
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
      fetchEntities,
      addEntity,
      updateEntity,
      deleteEntity,
      addCardToEntity,
      removeCardFromEntity,
      handleSelectEntity,
      isCardInContext,
      compileCardsWithQuantities,
    ]
  );
};

export default useManager;
