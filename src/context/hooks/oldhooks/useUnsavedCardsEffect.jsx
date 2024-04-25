// import { useEffect, useState } from 'react';
// import { useCollectionStore } from '../../MAIN_CONTEXT/CollectionContext/CollectionContext';
// import { processUnsavedCards } from '../CombinedContext/helpers';

// export const useUnsavedCardsEffect = (allCollections, userId) => {
//   if (!allCollections || !userId) return;
//   const [unsavedCards, setUnsavedCards] = useState([]);
//   const { externalOperationHandler, externalCollectionUpdate } =
//     useCollectionStore();

//   console.log('allCollections:', allCollections);
//   useEffect(() => {
//     if (allCollections && userId) {
//       processUnsavedCards(
//         allCollections,
//         userId,
//         externalOperationHandler,
//         externalCollectionUpdate
//       )
//         .then((processedCollections) => {
//           // Assuming processedCollections contains updated data from processUnsavedCards
//           // You can now update your state or context with this new data
//           setUnsavedCards(
//             processedCollections?.flatMap((col) => col.unsavedCards)
//           );
//         })
//         .catch((error) =>
//           console.error('Error processing unsaved cards:', error)
//         );
//     }
//   }, [
//     allCollections,
//     userId,
//     externalOperationHandler,
//     externalCollectionUpdate,
//   ]);

//   // Return the unsaved cards for potential use in components
//   return unsavedCards;
// };
