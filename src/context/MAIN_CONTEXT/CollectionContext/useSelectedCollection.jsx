import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_COLLECTION, SELECTED_COLLECTION_ID } from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import _set from 'lodash/set';
const defaultCollections = {
  allIds: [SELECTED_COLLECTION_ID],
  byId: {
    [SELECTED_COLLECTION_ID]: DEFAULT_COLLECTION,
  },
  selectedId: SELECTED_COLLECTION_ID,
  prevSelectedId: SELECTED_COLLECTION_ID,
  showCollections: false,
};
function useSelectedCollection() {
  const [collections, setCollections] = useLocalStorage('collections', {
    allIds: [],
    byId: {
      [SELECTED_COLLECTION_ID]: DEFAULT_COLLECTION,
    },
    selectedId: SELECTED_COLLECTION_ID,
    prevSelectedId: null,
    showCollections: true,
  });
  useEffect(() => {
    if (!collections || collections?.allIds?.length === 0) {
      setCollections(defaultCollections);
    }
  }, []);
  useEffect(() => {
    if (
      collections.allIds.includes(SELECTED_COLLECTION_ID) &&
      collections.allIds.length > 1
    ) {
      setCollections((prev) => {
        const updatedAllIds = prev.allIds.filter(
          (id) => id !== SELECTED_COLLECTION_ID
        );
        const updatedById = { ...prev.byId };
        delete updatedById[SELECTED_COLLECTION_ID];

        return {
          ...prev,
          allIds: updatedAllIds,
          byId: updatedById,
          // Update selectedId to the first collection if the selected collection is removed
          selectedId:
            prev.selectedId === SELECTED_COLLECTION_ID
              ? updatedAllIds[0]
              : prev.selectedId,
        };
      });
    }
  }, [collections.allIds, collections.byId, setCollections]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [customError, setCustomError] = useState(null);
  const prevSelectedCollectionIdRef = useRef(null);
  const [selectedStat, setSelectedStat] = useState('');
  useEffect(() => {
    prevSelectedCollectionIdRef.current = selectedCollectionId;
    // collections.prevSelectedId = selectedCollectionId;
  }, [selectedCollectionId]);
  // Assuming collections.byId is an object containing all collections keyed by their IDs

  const getSelectedCollection = useMemo(() => {
    const selectedCollection = collections.byId[collections.selectedId];
    if (!selectedCollection) {
      setCustomError('Selected collection not found.');
      return collections.byId[collections.allIds[0]];
    }
    return selectedCollection;
  }, [collections.byId, collections.selectedId]);

  const createMarkers = (selected) => {
    if (!selected || !selected.collectionStatistics) return [];

    const { highPoint, lowPoint, avgPrice, percentageChange } =
      selected.collectionStatistics;
    return [
      {
        axis: 'y',
        value: percentageChange,
        lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
        legend: `${selected.name} High`,
        legendOrientation: 'vertical',
      },
      {
        axis: 'y',
        value: lowPoint,
        lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
        legend: `${selected.name} Low`,
        legendOrientation: 'vertical',
      },
      {
        axis: 'y',
        value: avgPrice,
        lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
        legend: `${selected.name} Avg`,
        legendOrientation: 'vertical',
      },
    ];
  };
  const markers = useMemo(() => {
    if (!collections.selectedId) return [];
    return createMarkers(collections.byId[collections.selectedId]);
  }, [collections.allIds]); // Add dependencies as necessary, e.g., someSelectedCollectionId
  const handleSelectCollection = useCallback(
    (collection) => {
      console.log('SELECTED COLLECTION ID', collection?._id);
      setCustomError(null);
      if (!collections.byId[collection?._id]) {
        setCustomError('Invalid collection selected');
        return;
      }
      // setSelectedCollectionId(collection?._id);
      setCollections((prev) => ({
        ...prev,
        selectedId: collection?._id,
        showCollections: !prev.showCollections,
      }));
      setCustomError(null);
    },
    [collections.byId, setCollections, setSelectedCollectionId]
  );
  const updateCollectionField = useCallback(
    (collectionId, fieldPath, value) => {
      setCollections((prev) =>
        _set({ ...prev }, `byId.${collectionId}.${fieldPath}`, value)
      );
    },
    [setCollections]
  );
  const resetCollection = useCallback(() => {
    setCollections((prev) => ({
      ...prev,
      selectedId: null,
      showCollections: true,
    }));
    setCustomError(null);
  }, [setCollections]);
  const refreshCollections = useCallback(
    (updatedCollections) => {
      // Directly use the updatedCollections parameter to update the state
      setCollections((prev) => {
        // Assuming updatedCollections is an array of collection objects with _id properties
        const updatedById = updatedCollections.reduce(
          (acc, collection) => {
            acc[collection._id] = collection;
            return acc;
          },
          { ...prev.byId }
        );
        console.log('UPDATED COLLECTIONS', updatedById);
        const updatedAllIds = updatedCollections.map(
          (collection) => collection._id
        );
        console.log('UPDATED ALL IDS', updatedAllIds);
        return {
          ...prev,
          allIds: updatedAllIds,
          byId: updatedById,
          selectedId: collections.selectedId || prev.allIds[0],
        };
      });
    },
    [setCollections]
  );
  const updateCollectionsData = useCallback(
    (newCollections) => {
      console.log('updateCollectionsData', newCollections);
      setCollections((prev) => {
        const updatedById = { ...prev.byId };
        newCollections?.forEach((collection) => {
          updatedById[collection._id] = collection;
        });
        // FILTER UNDEFINED VALUES
        const updatedAllIds = Object.keys(updatedById).filter(
          (key) => updatedById[key] !== undefined
        );
        console.log('UPDATED COLLECTIONS', updatedById);
        console.log('UPDATED ALL IDS', updatedAllIds);
        console.log('UPDATED ALL IDS', Object.keys(updatedById));

        // return {
        //   ...prev,
        //   allIds: updatedAllIds,
        //   byId: updatedById,
        //   // selectedId: collections.selectedId || prev.allIds[0],
        // };
        return {
          ...prev,
          byId: updatedById,
          allIds: Object.keys(updatedById),
        };
      });
    },
    [setCollections, collections.selectedId]
  );
  const addNewCollection = useCallback(
    (newCollection) => {
      // const newId = new Date().getTime().toString(); // Simple unique ID generation
      updateCollectionsData([{ ...newCollection, _id: newCollection._id }]);
    },
    [updateCollectionsData]
  );
  const removeCollection = useCallback(
    (collectionId, remainingCollectionIds) => {
      setCollections((prev) => {
        console.log('REMOVE COLLECTION', collectionId, remainingCollectionIds);
        const updatedById = { ...prev.byId };
        delete updatedById[collectionId]; // Remove the collection
        const updatedAllIds = prev.allIds.filter((id) => id !== collectionId);

        return {
          ...prev,
          byId: updatedById,
          allIds: updatedAllIds,
          // Ensure selectedId is null if the deleted collection was selected
          selectedId: prev.selectedId === collectionId ? null : prev.selectedId,
        };
      });
      // refreshCollections(); // Optionally, refresh collections if they are fetched from an external source
    },
    [setCollections, refreshCollections]
  );
  const prevCollectionsRef = useRef();
  useEffect(() => {
    if (prevCollectionsRef.current) {
      console.log('Collections data updated:', collections);
    }
    prevCollectionsRef.current = collections;
  }, [collections.allIds, collections.byId[collections.selectedId]]);

  return {
    selectedCollectionId:
      collections.selectedId || prevSelectedCollectionIdRef.current,
    selectedCollection: getSelectedCollection || {},
    allIds: collections?.allIds || [],
    allCollections: Object.values(collections?.byId),
    showCollections: !!collections.showCollections,
    byId: collections?.byId || {},

    selectedStat,
    setSelectedStat,
    markers,
    handleSelectCollection,
    // selectedCollection: getSelectedCollection,
    handleBackToCollections: resetCollection,
    updateCollectionField,
    resetCollection,
    updateCollectionsData,
    customError,
    refreshCollections,
    addNewCollection,
    removeCollection,
    setCustomError,
  };
}

export default useSelectedCollection;
// const validCollections =
//   Array.isArray(collections.allIds) && collections.allIds.length > 0;
// const statsByCollectionId = useMemo(
//   () =>
//     validCollections
//       ? collections.byId?.reduce((acc, collection) => {
//           acc[collection?._id] = calculateStatsForCollection(
//             collection,
//             selectedTimeRange
//           );
//           return acc;
//         }, {})
//       : {},
//   [collections.byId, selectedTimeRange]
//   // [collections.allIds, selectedTimeRange]
// );
