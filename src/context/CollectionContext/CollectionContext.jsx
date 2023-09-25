import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useCookies } from 'react-cookie';
import {
  initialCollectionState,
  fetchWrapper,
  removeDuplicateCollections,
  calculateAndUpdateTotalPrice,
  calculateTotalPrice,
  getTotalCost,
  getCardPrice,
} from './exampleImport.js';
import { UtilityContext } from '../UtilityContext/UtilityContext.jsx';

export const CollectionContext = createContext(undefined);

const handleCardAddition = (currentCards, cardToAdd) => {
  const cardIndex = currentCards.findIndex((c) => c.id === cardToAdd.id);
  console.log('CARD INDEX:', cardIndex);
  console.log('CURRENT CARDS:', currentCards);
  console.log('CARD TO ADD:', cardToAdd);
  if (cardIndex !== -1) {
    currentCards[cardIndex].quantity++;
  } else {
    currentCards.push({ ...cardToAdd, quantity: 1 });
  }
  return currentCards.map((card) =>
    card.id === cardToAdd.id ? { ...card, quantity: card.quantity + 1 } : card
  );
};

const handleCardRemoval = (currentCards, cardToRemove) => {
  const cardIndex = currentCards.findIndex((c) => c.id === cardToRemove.id);
  if (cardIndex === -1) {
    console.error('Card not found in the collection.');
    return null;
  }
  currentCards[cardIndex].quantity--;
  if (currentCards[cardIndex].quantity <= 0) {
    currentCards.splice(cardIndex, 1);
  }
  return currentCards
    .map((card) =>
      card.id === cardToRemove.id
        ? { ...card, quantity: card.quantity - 1 }
        : card
    )
    .filter((card) => card.quantity > 0);
};

export const CollectionProvider = ({ children }) => {
  const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;
  const [cookies] = useCookies(['userCookie']);
  const userId = cookies.userCookie?.id;

  const [collectionData, setCollectionData] = useState(initialCollectionState);
  const [allCollections, setAllCollections] = useState([]);
  // const [selectedCollection, setSelectedCollection] = useState(
  //   initialCollectionState
  // );
  const { triggerCronJob } = useContext(UtilityContext); // Use the UtilityContext here
  const [selectedCollection, setSelectedCollection] = useState({});

  const totalCost = useMemo(
    () => getTotalCost(selectedCollection),
    [selectedCollection]
  );

  const getCardQuantity = useCallback((cardId, cards) => {
    const card = cards?.find((item) => item.id === cardId);
    return card?.quantity || 0;
  }, []);

  const fetchAndSetCollections = useCallback(async () => {
    if (!userId) return;

    try {
      const collections = await fetchWrapper(
        `${BASE_API_URL}/${userId}/collections`,
        'GET'
      );
      const uniqueCollections = removeDuplicateCollections(collections);
      // Filter out invalid collections
      const validCollections = uniqueCollections.filter(Boolean);

      validCollections.forEach((collection) => {
        collection.totalPrice = calculateAndUpdateTotalPrice(collection);
      });

      setAllCollections(validCollections);
      setCollectionData(
        validCollections.length === 0
          ? initialCollectionState
          : validCollections[0]
      );
      setSelectedCollection(
        validCollections.length === 0
          ? initialCollectionState
          : validCollections[0]
      );
    } catch (error) {
      console.error(`Failed to fetch collections: ${error.message}`);
      // Consider setting an error state here
    }
  }, [userId]);

  const findCollectionIndex = useCallback(
    (collections, id) =>
      collections?.findIndex((collection) => collection?._id === id) ?? -1,
    []
  );

  const updateCollectionData = useCallback(
    (newData, collectionType) => {
      if (collectionType === 'allCollections') {
        setAllCollections((prevCollections = []) => {
          const existingIndex = findCollectionIndex(
            prevCollections,
            newData?._id
          );
          if (existingIndex === -1) return [...prevCollections, newData];
          const updatedCollections = [...prevCollections];
          updatedCollections[existingIndex] = newData;
          return updatedCollections;
        });
      } else if (collectionType === 'selectedCollection') {
        setSelectedCollection(newData);

        // updateActiveCollection(newData);
      } else if (collectionType === 'collectionData') {
        setCollectionData(newData);
      }
    },
    [findCollectionIndex]
  );

  const createUserCollection = async (userId, name, description) => {
    if (!selectedCollection?._id) {
      console.error(
        'Selected collection is undefined or missing _id property.'
      );
      return;
    }

    try {
      const url = `${BASE_API_URL}/${userId}/collections/newCollection/${userId}`;
      const initialData = {
        name,
        description,
        userId,
        totalPrice: totalCost,
        quantity: getCardQuantity(selectedCollection._id),
        allCardPrices: [],
        cards: [],
      };

      const { savedCollection } = await fetchWrapper(url, 'POST', initialData);

      updateCollectionData(savedCollection, 'allCollections');
      updateCollectionData(savedCollection, 'collectionData');
    } catch (error) {
      console.error(`Failed to create a new collection: ${error.message}`);
    }
  };

  const addOrRemoveCard = useCallback(
    async (card, cardInfo, operation) => {
      if (!selectedCollection?._id && !allCollections[0]?._id) {
        console.error('No valid collection selected.');
        return;
      }

      const collectionId = selectedCollection?._id || allCollections[0]._id;
      // const activeCollection = selectedCollection || allCollections[0];
      const activeCollection = selectedCollection;

      let updatedCards =
        operation === 'add'
          ? handleCardAddition(activeCollection?.cards, card)
          : handleCardRemoval(activeCollection?.cards, card);

      console.log('UPDATED CARDS:', updatedCards);
      if (!updatedCards) return;

      const updateInfo = {
        ...cardInfo,
        cards: updatedCards,
        userId: userId,
        // totalPrice: calculateTotalPrice(updatedCards),
        totalPrice: getCardPrice(selectedCollection),
        quantity: getCardQuantity(collectionId, updatedCards),
        _id: collectionId,
      };
      const updatedCollection = { ...activeCollection, ...updateInfo };
      updateCollectionData(updatedCollection, 'selectedCollection');
      updateCollectionData(updatedCollection, 'allCollections');

      await updateActiveCollection(updatedCollection);
    },
    [
      selectedCollection,
      allCollections,
      userId,
      handleCardAddition,
      handleCardRemoval,
      updateCollectionData,
    ]
  );

  const updateActiveCollection = useCallback(
    async (updatedCollectionData) => {
      if (!updatedCollectionData) {
        console.error('One of the required variables is undefined');
        return;
      }

      const collectionId = updatedCollectionData._id;
      const url = `${BASE_API_URL}/${userId}/collections/${collectionId}`;

      // Log the URL and payload before making the request
      console.log('URL:', url);
      console.log('Payload:', updatedCollectionData);
      try {
        const { updatedCollection } = await fetchWrapper(
          url,
          'PUT',
          updatedCollectionData
        );

        console.log('UPDATED COLLECTION FROM SERVER:', updatedCollection);
        updateCollectionData(updatedCollection, 'selectedCollection');
        updateCollectionData(updatedCollection, 'allCollections');
      } catch (error) {
        console.error(`Failed to update the collection: ${error.message}`);
      }
    },
    [userId, updateCollectionData]
  );

  const contextValue = useMemo(
    () => ({
      allCollections,
      selectedCollection,
      collectionData,
      calculateTotalPrice: () => getCardPrice(selectedCollection),
      totalCost,
      getTotalCost: () => getTotalCost(selectedCollection),
      createUserCollection,
      setAllCollections,
      setSelectedCollection: updateActiveCollection,
      // getTotalCost,
      fetchAllCollectionsForUser: fetchAndSetCollections,
      addOneToCollection: (card, cardInfo) =>
        addOrRemoveCard(card, cardInfo, 'add'),
      removeOneFromCollection: (card) => addOrRemoveCard(card, null, 'remove'),
    }),
    [allCollections, selectedCollection, totalCost]
  );

  useEffect(() => {
    console.log('COLLECTION CONTEXT: ', {
      contextValue,
    });
  }, [contextValue]);

  useEffect(() => {
    if (selectedCollection && totalCost) {
      // Trigger the cron job whenever the selectedCollection changes
      triggerCronJob();
    }
  }, [selectedCollection, triggerCronJob, totalCost]);

  useEffect(() => {
    console.log('Total Cost has been updated:', totalCost);
  }, [totalCost]);

  useEffect(() => {
    if (userId) fetchAndSetCollections();
  }, [fetchAndSetCollections, userId]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useCallback,
//   useContext,
//   useMemo,
// } from 'react';
// import { useCookies } from 'react-cookie';
// import {
//   initialCollectionState,
//   fetchWrapper,
//   removeDuplicateCollections,
//   calculateAndUpdateTotalPrice,
//   // getCardQuantity,
//   calculateTotalPrice,
//   getTotalCost,
//   getCardPrice,
// } from './exampleImport.js'; // Adjust the import according to where you store these functions

// export const CollectionContext = createContext(undefined);

// export const CollectionProvider = ({ children }) => {
//   const [collectionData, setCollectionData] = useState(initialCollectionState);
//   const [allCollections, setAllCollections] = useState([]);
//   // const [totalCost, setTotalCost] = useState(0);
//   const [allCardPrices, setAllCardPrices] = useState([]);
//   const [prevQuantity, setPrevQuantity] = useState(0);
//   // const [selectedCollection, setSelectedCollection] = useState(
//   //   !allCollections.length > 0 ? initialCollectionState : null
//   // );
//   // const [selectedCollection, setSelectedCollection] = useState(
//   //   allCollections.length > 0 ? null : initialCollectionState
//   // );
//   const [selectedCollection, setSelectedCollection] = useState(
//     initialCollectionState
//   );
//   const [cookies] = useCookies(['userCookie']);
//   const userId = cookies.userCookie?.id;
//   const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;

//   // Calculate the total cost of the selected collection
//   const totalCost = useMemo(() => {
//     return selectedCollection?.cards.reduce((total, card) => {
//       return card.card_prices?.[0]?.tcgplayer_price
//         ? total + parseFloat(card.card_prices[0].tcgplayer_price)
//         : total;
//     }, 0);
//   }, [selectedCollection]);

//   const getCardQuantity = (cardId, cards) => {
//     const card = cards?.find((item) => item.id === cardId);
//     return card?.quantity || 0;
//   };

//   const fetchAndSetCollections = useCallback(async () => {
//     if (!userId) return;
//     try {
//       const collections = await fetchWrapper(
//         `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections`,
//         'GET'
//       );
//       const uniqueCollections = removeDuplicateCollections(collections);
//       uniqueCollections.forEach((collection) => {
//         collection.totalPrice = calculateAndUpdateTotalPrice(collection);
//       });
//       setAllCollections(uniqueCollections);

//       // If there are no collections, set the selectedCollection to initialCollectionState
//       if (uniqueCollections.length === 0) {
//         setSelectedCollection(initialCollectionState);
//         return;
//       }

//       // If there are collections, set the selectedCollection to the first collection
//       const firstCollection = uniqueCollections[0];
//       setSelectedCollection(firstCollection);
//       setCollectionData(firstCollection);

//       // setSelectedCollection(uniqueCollections[0]);
//       // setCollectionData(selectedCollection);
//     } catch (error) {
//       console.error(`Failed to fetch collections: ${error.message}`);
//     }
//   }, [userId]);

//   const findCollectionIndex = (collections, id) => {
//     return collections?.findIndex((collection) => collection?._id === id) ?? -1;
//   };

//   const updateCollectionData = useCallback((newData, updaterFn) => {
//     console.log('NEW DATA:', newData);
//     updaterFn((prevCollections = []) => {
//       const existingIndex = findCollectionIndex(prevCollections, newData?._id);

//       if (existingIndex === -1) return [...prevCollections, newData];

//       const updatedCollections = [...prevCollections];
//       updatedCollections[existingIndex] = newData;
//       return updatedCollections;
//     });
//   }, []);

//   const createUserCollection = async (userId, name, description) => {
//     try {
//       // Check if selectedCollection is defined and has _id property
//       if (selectedCollection && selectedCollection._id) {
//         const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/newCollection/${userId}`;
//         const initialData = {
//           name,
//           description,
//           userId,
//           totalPrice: totalCost,
//           quantity: getCardQuantity(selectedCollection._id),
//           allCardPrices: [],
//           cards: [],
//         };

//         const { savedCollection } = await fetchWrapper(
//           url,
//           'POST',
//           initialData
//         );

//         updateCollectionData(savedCollection, setAllCollections);
//         setCollectionData(savedCollection);
//         // updateActiveCollection(savedCollection, setAllCollections);
//         updateActiveCollection(savedCollection, setSelectedCollection);
//       } else {
//         console.error(
//           'Selected collection is undefined or missing _id property.'
//         );
//       }
//     } catch (error) {
//       console.error(`Failed to create a new collection: ${error.message}`);
//     }
//   };

//   const addOrRemoveCard = useCallback(
//     async (card, cardInfo, operation) => {
//       console.log('-----------OPERATION---------:', operation);
//       // Validate required variables
//       if (!selectedCollection?._id && !allCollections[0]?._id) {
//         console.error('No valid collection selected.');
//         return;
//       }

//       const collectionId = selectedCollection?._id || allCollections[0]._id;
//       const activeCollection = selectedCollection || allCollections[0];

//       let currentCards = activeCollection?.cards || [];
//       let updatedCards;

//       // This part checks the 'operation' parameter
//       if (operation === 'add') {
//         updatedCards = handleCardAddition(currentCards, card);
//       } else if (operation === 'remove') {
//         updatedCards = handleCardRemoval(currentCards, card);
//         if (updatedCards === null) return;
//       } else {
//         console.error('Invalid operation.');
//         return;
//       }

//       const updateInfo = {
//         ...cardInfo,
//         cards: updatedCards,
//         userId: userId,
//         totalPrice: calculateTotalPrice(updatedCards),
//         quantity: getCardQuantity(collectionId, updatedCards),
//         _id: collectionId,
//       };

//       console.log('UPDATE INFO:', updateInfo);
//       updateActiveCollection(
//         { ...activeCollection, ...updateInfo },
//         setSelectedCollection
//       );
//       console.log('Collection Data after update:', collectionData);
//     },
//     [selectedCollection, allCollections, userId]
//   );

//   const handleCardAddition = (currentCards, cardToAdd) => {
//     const cardIndex = currentCards.findIndex((c) => c.id === cardToAdd.id);
//     if (cardIndex !== -1) {
//       currentCards[cardIndex].quantity++;
//     } else {
//       currentCards.push({ ...cardToAdd, quantity: 1 });
//     }
//     return [...currentCards];
//   };

//   const handleCardRemoval = (currentCards, cardToRemove) => {
//     const cardIndex = currentCards.findIndex((c) => c.id === cardToRemove.id);
//     if (cardIndex === -1) {
//       console.error('Card not found in the collection.');
//       return null;
//     }
//     currentCards[cardIndex].quantity--;

//     if (currentCards[cardIndex].quantity <= 0) {
//       currentCards.splice(cardIndex, 1);
//     }
//     return currentCards;
//   };

//   const updateActiveCollection = async (updatedCollectionData) => {
//     if (!updatedCollectionData) {
//       console.error('One of the required variables is undefined');
//       return;
//     }
//     console.log('UPDATED COLLECTION DATA:', updatedCollectionData);
//     const collectionId = updatedCollectionData._id;
//     console.log('COLLECTION ID:', collectionId);

//     try {
//       const url = `${BASE_API_URL}/${userId}/collections/${collectionId}`;
//       const { updatedCollection } = await fetchWrapper(
//         url,
//         'PUT',
//         updatedCollectionData // instead of collectionData
//       );

//       // const { updatedCollection } = await fetchWrapper(url, 'PUT', initialData);

//       setSelectedCollection(updatedCollection);
//       updateCollectionData(updatedCollection, setAllCollections);
//       // updateCollectionData(updatedCollection, setSelectedCollection);
//     } catch (error) {
//       console.error(`Failed to update the collection: ${error.message}`);
//     }
//   };

//   const contextValue = useMemo(
//     () => ({
//       allCollections,
//       selectedCollection,
//       collectionData,
//       calculateTotalPrice: () => getCardPrice(selectedCollection),
//       totalCost,
//       createUserCollection,
//       setAllCollections,
//       setSelectedCollection: updateActiveCollection,
//       getTotalCost,
//       // setSelectedCollection,
//       fetchAllCollectionsForUser: fetchAndSetCollections,
//       addOneToCollection: (card, cardInfo) =>
//         addOrRemoveCard(card, cardInfo, 'add'),
//       removeOneFromCollection: (card) => addOrRemoveCard(card, null, 'remove'),
//     }),
//     [allCollections, selectedCollection, totalCost]
//   );

//   useEffect(() => {
//     console.log('COLLECTION CONTEXT: ', {
//       contextValue,
//     });
//   }, [contextValue]);

//   useEffect(() => {
//     if (userId) fetchAndSetCollections();
//   }, [fetchAndSetCollections, userId]);

//   return (
//     <CollectionContext.Provider value={contextValue}>
//       {children}
//     </CollectionContext.Provider>
//   );
// };

// // export const useCollectionStore = () => {
// //   const context = useContext(CollectionContext);
// //   if (!context) {
// //     throw new Error(
// //       'useCollectionStore must be used within a CollectionProvider'
// //     );
// //   }
// //   return context;
// // };
