// import { useEffect, useState } from 'react';
// import { useCollectionStore } from '../CollectionContext/CollectionContext';

// export const useUnsavedCardsProcessing = (allCollections, userId) => {
//   const [unsavedCards, setUnsavedCards] = useState([]);
//   const {
//     externalOperationHandler,
//     externalCollectionUpdate,
//     // updateAllCollectionState,
//   } = useCollectionStore();

//   useEffect(() => {
//     const processUnsavedCards = async () => {
//       const unsavedCollections = allCollections
//         .map((collection) => {
//           const unsavedCardsInCollection = collection.cards.filter(
//             (card) => card.tag === 'unsaved'
//           );
//           return {
//             collectionId: collection._id,
//             unsavedCards: unsavedCardsInCollection,
//           };
//         })
//         .filter((collection) => collection.unsavedCards.length > 0);

//       for (const collection of unsavedCollections) {
//         for (const card of collection.unsavedCards) {
//           // Perform the operations required for each unsaved card
//           await externalOperationHandler(card, 'update', collection, userId);
//         }

//         // After processing all cards in a collection, update the collection
//         const updatedCollection = await externalCollectionUpdate(
//           collection,
//           null,
//           'update',
//           userId
//         );
//         // Do something with the updated collection if needed
//       }

//       // Optionally, update state or context with the processed unsaved cards
//       setUnsavedCards(unsavedCollections.flatMap((col) => col.unsavedCards));
//     };

//     processUnsavedCards();
//   }, [allCollections, userId]);

//   return unsavedCards;
// };
