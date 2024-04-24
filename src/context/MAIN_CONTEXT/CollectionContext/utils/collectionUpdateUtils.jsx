import _set from 'lodash/set';

export const updateCollectionField = (
  setCollections,
  collectionId,
  fieldPath,
  value
) => {
  setCollections((prev) =>
    _set({ ...prev }, `byId.${collectionId}.${fieldPath}`, value)
  );
};

export const removeCollection = (setCollections, collectionId) => {
  setCollections((prev) => {
    const updatedById = { ...prev.byId };
    delete updatedById[collectionId];
    const updatedAllIds = prev.allIds.filter((id) => id !== collectionId);

    return {
      ...prev,
      byId: updatedById,
      allIds: updatedAllIds,
      selectedId: prev.selectedId === collectionId ? null : prev.selectedId,
    };
  });
};

export const refreshCollections = (setCollections, updatedCollections) => {
  setCollections((prev) => {
    const updatedById = updatedCollections.reduce(
      (acc, collection) => {
        acc[collection._id] = collection;
        return acc;
      },
      { ...prev.byId }
    );
    const updatedAllIds = updatedCollections.map(
      (collection) => collection._id
    );

    return {
      ...prev,
      byId: updatedById,
      allIds: updatedAllIds,
      selectedId: prev.selectedId || prev.allIds[0],
    };
  });
};
