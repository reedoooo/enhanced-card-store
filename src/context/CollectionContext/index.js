// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useCallback,
//   useContext,
//   useMemo,
// } from 'react';
// import { useCookies } from 'react-cookie';
// import { fetchWrapper, removeDuplicateCollections } from '../Helpers';
// import {
//   initialCollectionState,
//   useUserId,
//   useFetchAndSetCollections,
//   useAddOrRemoveCard,
//   useMakeContextValue,
//   calculateAndUpdateTotalPrice,
// } from './SomeHelper';

// export const CollectionContext = createContext(undefined);

// // Custom Hook to manage a collection
// const useCollection = (initialCollection = {}) => {
//   const [collection, setCollection] = useState(initialCollection);
//   const updateCollection = useCallback(
//     (newData) => setCollection((prev) => ({ ...prev, ...newData })),
//     []
//   );
//   const totalPrice = useMemo(
//     () => calculateAndUpdateTotalPrice(collection),
//     [collection]
//   );

//   return { collection, updateCollection, totalPrice };
// };

// export const CollectionProvider = ({ children }) => {
//   // const [cookies] = useCookies(['userCookie']);
//   // const [collectionData, setCollectionData] = useState(initCollectionState());
//   // const [allCollections, setAllCollections] = useState([]);
//   // const [allCardPrices, setAllCardPrices] = useState([]);
//   // const [prevTotalQuantity, setPrevTotalQuantity] = useState(0);
//   // const [selectedCollection, setSelectedCollection] = useState(
//   //   initCollectionState()
//   // );
//   // const userId = cookies.userCookie?.id;
//   const [collectionData, setCollectionData] = useState(initialCollectionState);
//   const { collection, updateCollection } = useCollection(
//     initialCollectionState
//   );
//   const [allCollections, setAllCollections] = useState([]);
//   const [allCardPrices, setAllCardPrices] = useState([]);
//   const [prevTotalQuantity, setPrevTotalQuantity] = useState(0);
//   const [selectedCollection, setSelectedCollection] = useState(
//     initialCollectionState
//   );

//   const userId = useUserId();

//   const fetchAndSetCollections = useFetchAndSetCollections(
//     userId,
//     setAllCollections,
//     setSelectedCollection,
//     setCollectionData
//   );

//   const addOrRemoveCard = useAddOrRemoveCard(
//     userId,
//     setSelectedCollection,
//     setAllCollections,
//     setAllCardPrices,
//     allCollections,
//     allCardPrices
//   );

//   const totalCost = useMemo(
//     () => calculateTotalPrice(selectedCollection?.cards),
//     [selectedCollection]
//   );

//   const contextValue = useMakeContextValue(
//     collectionData,
//     allCollections,
//     allCardPrices,
//     selectedCollection,
//     totalCost,
//     setSelectedCollection,
//     fetchAndSetCollections,
//     addOrRemoveCard,
//     userId
//   );

//   const { collection: collectionData, updateCollection: updateCollectionData } =
//     useCollection(initialCollectionData);
//   const {
//     collection: selectedCollection,
//     updateCollection: updateSelectedCollection,
//   } = useCollection(initialSelectedCollection);

//   const fetchCollectionsForUser = useCallback(async () => {
//     try {
//       const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections`;
//       return await fetchWrapper(url, 'GET');
//     } catch (error) {
//       console.error(`Failed to fetch collections for user: ${error.message}`);
//       return null;
//     }
//   }, [userId]);

//   const updateCollectionData = useCallback((newData, updaterFn) => {
//     updaterFn((prevCollections) => {
//       const existingIndex = prevCollections
//         ? prevCollections.findIndex(
//             (collection) => collection._id === newData._id
//           )
//         : -1;

//       // Ensure that prevCollections is an array or initialize it as an empty array
//       if (!Array.isArray(prevCollections)) {
//         prevCollections = [];
//       }

//       console.log('existingIndex:', existingIndex);
//       console.log('prevCollections:', prevCollections);

//       if (existingIndex === -1) return [...prevCollections, newData];
//       const updatedCollections = [...prevCollections];
//       updatedCollections[existingIndex] = newData;
//       return updatedCollections;
//     });
//   }, []);

//   const fetchAndSetCollections = useCallback(async () => {
//     try {
//       const userCollections = await fetchCollectionsForUser();
//       if (userCollections && userCollections.length > 0) {
//         const uniqueCollections = removeDuplicateCollections(userCollections);

//         // Initialize totalPrice for each collection based on its cards
//         uniqueCollections.forEach((collection) => {
//           collection.totalPrice = calculateAndUpdateTotalPrice(collection);
//         });

//         setAllCollections(uniqueCollections);
//         setCollectionData(uniqueCollections[0]);
//         setSelectedCollection(uniqueCollections[0]);
//       }
//     } catch (error) {
//       console.error(`Failed to fetch collections: ${error.message}`);
//     }
//   }, [fetchCollectionsForUser]);

//   const formatCardData = (card) => ({
//     id: card.id,
//     ...Object.fromEntries(
//       [
//         'name',
//         'type',
//         'frameType',
//         'description',
//         'card_images',
//         'archetype',
//         'atk',
//         'def',
//         'level',
//         'race',
//         'attribute',
//         'quantity',
//       ].map((key) => [key, card[key] || null])
//     ),
//   });

//   const createUserCollection = async (
//     userId,
//     name,
//     description,
//     newCollectionInfo
//   ) => {
//     try {
//       const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/newCollection/${userId}`;

//       const data = await fetchWrapper(url, 'POST', {
//         name,
//         description,
//         userId,
//         totalPrice: 0,
//         allCardPrices: [],
//         cards: [], // Initialize with an empty array of cards
//       });

//       console.log('NEW COLLECTION DATA:', data.savedCollection);
//       // Add the new collection to allCollections
//       setAllCollections((prevCollections) => [...prevCollections, data]);

//       setCollectionData(data);
//       setSelectedCollection(data);
//     } catch (error) {
//       console.error(`Failed to create a new collection: ${error.message}`);
//     }
//   };

//   const getCardQuantity = (collectionId) => {
//     const collection = allCollections?.find(
//       (item) => item._id === collectionId
//     );
//     if (!collection) return 0;
//     return collection.cards.reduce((acc, card) => acc + card.quantity, 0);
//   };

//   const addOrRemoveCard = useCallback(
//     async (card, cardInfo, isAdding) => {
//       if (
//         !selectedCollection._id &&
//         (!allCollections[0] || !allCollections[0]._id)
//       ) {
//         console.error('No valid collection to add or remove a card.');
//         return;
//       }
//       const activeCollection = selectedCollection._id
//         ? selectedCollection
//         : allCollections[0];

//       // GETS THE PRICE OF THE CARD
//       let cardPrice = 0;

//       if (
//         card.card_prices &&
//         card.card_prices.length > 0 &&
//         card.card_prices[0].tcgplayer_price
//       ) {
//         cardPrice = parseFloat(card.card_prices[0].tcgplayer_price);
//       }

//       // Create a copy of the current state
//       const currentCards = [...(activeCollection?.cards || [])];
//       let currentTotalPrice = activeCollection.totalPrice || 0;
//       // Find the card index in the current state
//       const cardIndex = currentCards.findIndex((item) => item.id === card.id);
//       if (isAdding) {
//         setAllCardPrices([...allCardPrices, { cardId: card.id, cardPrice }]);
//         if (cardIndex !== -1) {
//           currentCards[cardIndex].quantity += 1;
//           currentCards[cardIndex].price += cardPrice; // Add card price
//         } else {
//           currentCards.push({ ...card, quantity: 1, price: cardPrice });
//         }
//         currentTotalPrice += cardPrice;
//       } else {
//         setAllCardPrices((prevCardValues) =>
//           prevCardValues.filter((val) => val !== cardPrice)
//         );

//         if (cardIndex !== -1) {
//           currentCards[cardIndex].quantity -= 1;
//           currentCards[cardIndex].price -= cardPrice; // Subtract card price
//           if (currentCards[cardIndex].quantity <= 0) {
//             currentCards.splice(cardIndex, 1);
//           }
//           currentTotalPrice -= cardPrice;
//         }
//       }
//       currentTotalPrice = calculateAndUpdateTotalPrice({
//         ...activeCollection,
//         cards: currentCards,
//       });

//       if (cardInfo) {
//         console.log('COLLECTION NAME CHANGE:', cardInfo.name);
//         console.log('COLLECTION DESC CHANGE:', cardInfo.description);

//         activeCollection.name = cardInfo.name;
//         activeCollection.description = cardInfo.description;
//       }

//       // Update the collection's totalPrice
//       activeCollection.totalPrice = currentTotalPrice;

//       console.log('activeCollection:', activeCollection);
//       console.log('currentTotalPrice:', currentTotalPrice);
//       const collectionId = activeCollection._id;
//       console.log('currentCards:', currentCards);
//       console.log('collectionId:', collectionId);
//       try {
//         // Replace this URL with your server's URL and route for updating the collection
//         const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/collections/${collectionId}`;

//         // Send a PUT request to the server to update the collection
//         const updatedCollection = await fetchWrapper(url, 'PUT', {
//           cards: currentCards,
//           name: cardInfo.name,
//           description: cardInfo.description,
//           quantity: getCardQuantity(collectionId),
//           userId: userId,
//           totalPrice: currentTotalPrice,
//         });

//         // Update the state based on the server's response
//         setSelectedCollection({
//           ...updatedCollection,
//           totalPrice: currentTotalPrice,
//           name: cardInfo.name,
//           description: cardInfo.description,
//         });
//         updateCollectionData(
//           {
//             ...updatedCollection,
//             totalPrice: currentTotalPrice,
//             name: cardInfo.name,
//             description: cardInfo.description,
//           },
//           setAllCollections
//         );
//       } catch (error) {
//         // If the PUT request fails, log the error and revert to the previous state
//         console.error(`Failed to update the collection: ${error.message}`);
//       }
//     },
//     [
//       selectedCollection,
//       allCollections,
//       userId,
//       updateCollectionData,
//       allCardPrices,
//     ]
//   );

//   const totalCost = selectedCollection?.cards
//     ? selectedCollection.cards.reduce((total, card) => {
//         if (
//           card.card_prices &&
//           card.card_prices[0] &&
//           card.card_prices[0].tcgplayer_price
//         ) {
//           return total + parseFloat(card.card_prices[0].tcgplayer_price);
//         }
//         return total;
//       }, 0)
//     : 0;

//   // const getCardQuantity: (collectionId) => {

//   //   const collection = allCollections?.find(
//   //     (item) => item._id === collectionId
//   //   );
//   //   if (!collection) return 0;
//   //   return collection.cards.reduce((acc, card) => acc + card.quantity, 0);
//   // },

//   const contextValue = useMemo(
//     () => ({
//       collectionData,
//       allCollections,
//       allCardPrices,
//       selectedCollection,
//       totalPrice: calculateAndUpdateTotalPrice(selectedCollection),
//       setSelectedCollection,
//       fetchAllCollectionsForUser: fetchAndSetCollections, // fetchAndSetCollections should be defined
//       addOneToCollection: (card, cardInfo) =>
//         addOrRemoveCard(card, cardInfo, true), // addOrRemoveCard should be defined
//       removeOneFromCollection: (card) => addOrRemoveCard(card, null, false),
//       createUserCollection: (name, description, newCollectionInfo) =>
//         createUserCollection(userId, name, description, newCollectionInfo), // createUserCollection should be defined
//       getCardQuantity,
//       getTotalCost: (collectionId) => {
//         const collection = allCollections?.find(
//           (item) => item._id === collectionId
//         );
//         if (!collection) return 0;
//         return collection.cards.reduce(
//           (acc, card) => acc + card.price * card.quantity,
//           0
//         );
//       },
//       getCollectionCardDetails: (collectionId) => {
//         const collection = allCollections?.find(
//           (item) => item._id === collectionId
//         );
//         if (!collection || !collection.cards) return [0, []];

//         const totalQuantity = collection.cards.reduce(
//           (acc, card) => acc + card.quantity,
//           0
//         );
//         const cardDetails = collection.cards.map((card) => ({
//           name: card.name,
//           quantity: card.quantity,
//         }));

//         return [totalQuantity, cardDetails];
//       },
//     }),
//     [collectionData, allCollections, selectedCollection, allCardPrices]
//   );

//   useEffect(() => {
//     console.log('collectionData has been updated:', collectionData);
//   }, [collectionData]);

//   useEffect(() => {
//     if (allCollections.length > 0) {
//       const firstCollection = allCollections[0];
//       const totalQuantity = firstCollection.cards.reduce(
//         (acc, card) => acc + card.quantity,
//         0
//       );

//       // Only log when a new card has been added
//       if (totalQuantity > prevTotalQuantity) {
//         const cardDetails = firstCollection.cards.map((card) => ({
//           name: card.name,
//           quantity: card.quantity,
//         }));
//         console.log(
//           'A new card has been added. Updated totals:',
//           totalQuantity,
//           cardDetails
//         );
//       }

//       // Update the previous total quantity
//       setPrevTotalQuantity(totalQuantity);
//     }
//   }, [allCollections]);

//   useEffect(() => {
//     console.log('COLLECTIONCONTEXT:', contextValue);
//     if (userId) fetchAndSetCollections();
//   }, [fetchAndSetCollections, userId]);

//   return (
//     <CollectionContext.Provider value={contextValue}>
//       {children}
//     </CollectionContext.Provider>
//   );
// };

// export const useCollectionStore = () => {
//   const context = useContext(CollectionContext);
//   if (!context) {
//     throw new Error(
//       'useCollectionStore must be used within a CollectionProvider'
//     );
//   }
//   return context;
// };

// // Initial states
// const initialCollectionState = {
//   _id: '',
//   cards: [],
//   quantity: 0,
//   totalPrice: 0,
// };
