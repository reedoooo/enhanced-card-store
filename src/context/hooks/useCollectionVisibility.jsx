import { useState, useCallback } from 'react';
import { useCollectionStore } from '../MAIN_CONTEXT/CollectionContext/CollectionContext';

const useCollectionVisibility = () => {
  const { setSelectedCollection, allCollections } = useCollectionStore();
  const [showCollections, setShowCollections] = useState(true);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  const handleSelectCollection = useCallback(
    (collectionId) => {
      const selected = allCollections.find(
        (collection) => collection._id === collectionId
      );
      if (selected) {
        setSelectedCollection(selected); // Keep this to maintain compatibility with other parts of your code
        setSelectedCollectionId(collectionId); // Track the ID of the selected collection
        setShowCollections(false);
      }
    },
    [allCollections, setSelectedCollection]
  );

  const handleBackToCollections = useCallback(() => {
    setShowCollections(true);
    setSelectedCollectionId(null); // Clear the selected collection ID
    setSelectedCollection(null); // Optionally clear the selected collection
  }, [setSelectedCollection]);

  return {
    showCollections,
    handleSelectCollection,
    handleBackToCollections,
    selectedCollectionId, // Expose the selectedCollectionId for use in other components
  };
};

export default useCollectionVisibility;
