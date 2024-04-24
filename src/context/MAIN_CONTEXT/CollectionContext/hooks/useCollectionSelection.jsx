import { useState, useCallback } from 'react';

const useCollectionSelection = (collections, setCollections) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [customError, setCustomError] = useState(null);

  const handleSelectCollection = useCallback(
    (collection) => {
      if (!collection?._id || !collections.byId[collection?._id]) {
        setCustomError('Invalid collection selected');
        return;
      }
      setCollections((prev) => ({
        ...prev,
        selectedId: collection?._id,
        showCollections: !prev.showCollections,
      }));
      setCustomError(null);
    },
    [collections.byId, setCollections]
  );

  return {
    selectedCollectionId,
    setSelectedCollectionId,
    customError,
    setCustomError,
    handleSelectCollection,
  };
};

export default useCollectionSelection;
