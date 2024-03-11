// import { useState, useCallback } from 'react';
// import { useCollectionStore } from '../MAIN_CONTEXT/CollectionContext/CollectionContext';
// import useCollectionManager from '../MAIN_CONTEXT/CollectionContext/useCollectionManager';

// const useCollectionVisibility = () => {
//   const { setSelectedCollection, allCollections } = useCollectionManager();
//   const [showCollections, setShowCollections] = useState(true);
//   const [selectedCollectionId, setSelectedCollectionId] = useState(null);

//   // This function is triggered when a collection is selected.
//   const handleSelectCollection = useCallback((collection) => {
//     console.log('SELECTED COLLECTION ID', collection._id);
//     setSelectedCollectionId(collection._id);
//     setSelectedCollection(collection);
//     setShowCollections(false); // Hide collection list to show the selected collection's details.
//   }, []);

//   const handleBackToCollections = useCallback(() => {
//     console.log('BACK TO COLLECTIONS', allCollections, selectedCollectionId);
//     setShowCollections(true); // Show the collection list again.

//     setSelectedCollectionId(null);
//     setSelectedCollection(null);
//   }, []);

//   return {
//     showCollections,
//     handleSelectCollection,
//     handleBackToCollections,
//     setShowCollections,
//     selectedCollectionId, // Expose the selectedCollectionId for use in other components
//   };
// };

// export default useCollectionVisibility;
