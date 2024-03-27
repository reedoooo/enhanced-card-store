import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_COLLECTION,
  SELECTED_COLLECTION_ID,
  DEFAULT_CARDS_COUNT,
} from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import jsonData from '../../../data/nivoTestData.json';
import _set from 'lodash/set';

function useSelectedCollection() {
  const { nivoTestData } = jsonData;
  const [collections, setCollections] = useLocalStorage('collections', {
    allIds: [],
    byId: {
      [SELECTED_COLLECTION_ID]: DEFAULT_COLLECTION,
    },
    selectedId: SELECTED_COLLECTION_ID,
    showCollections: true,
    nivoTestData: nivoTestData,
  });
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [customError, setCustomError] = useState(null);
  const prevSelectedCollectionIdRef = useRef(null);

  useEffect(() => {
    prevSelectedCollectionIdRef.current = selectedCollectionId;
  }, [selectedCollectionId]);
  const getSelectedCollection = useMemo(
    () => collections.byId[collections.selectedId] || DEFAULT_COLLECTION,
    [collections.byId, collections.selectedId]
  );
  const handleSelectCollection = useCallback(
    (collection) => {
      console.log('SELECTED COLLECTION ID', collection?._id);
      // setSelectedCollectionId(collection?._id);
      setCustomError(null);

      if (!collections.byId[collection?._id]) {
        setCustomError('Invalid collection selected');
        return;
      }
      setCollections((prev) => ({
        ...prev,
        selectedId: collection?._id,
        showCollections: !prev.showCollections,
        // showCollections: true,
      }));
      // if (prevSelectedCollectionIdRef.current !== collection?._id) {
      //   toggleShowCollections();
      // }
      setCustomError(null);
    },
    [collections.byId, setCollections, setSelectedCollectionId]
  );
  // const handleBackToCollections = useCallback(() => {
  //   setCollections((prev) => ({
  //     ...prev,
  //     selectedId: null,
  //     showCollections: true,
  //   }));
  //   setCustomError(null);
  // }, [setCollections]);
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
  const updateCollectionsData = useCallback(
    (newCollections) => {
      console.log('updateCollectionsData', newCollections);
      setCollections((prev) => {
        const updatedById = { ...prev.byId };
        newCollections?.forEach((collection) => {
          updatedById[collection._id] = collection;
        });
        return {
          ...prev,
          byId: updatedById,
          allIds: Object.keys(updatedById),
        };
      });
    },
    [setCollections]
  );
  const addNewCollection = useCallback(
    (newCollection) => {
      // const newId = new Date().getTime().toString(); // Simple unique ID generation
      updateCollectionsData([{ ...newCollection, _id: newCollection._id }]);
    },
    [updateCollectionsData]
  );
  const removeCollection = useCallback(
    (collectionId) => {
      setCollections((prev) => {
        const { [collectionId]: _, ...remainingById } = prev.byId;
        return {
          ...prev,
          allIds: prev.allIds.filter((id) => id !== collectionId),
          byId: remainingById,
          selectedId: prev.selectedId === collectionId ? null : prev.selectedId,
        };
      });
    },
    [setCollections]
  );

  const prevCollectionsRef = useRef();
  useEffect(() => {
    if (prevCollectionsRef.current) {
      console.log('Collections data updated:', collections);
    }
    prevCollectionsRef.current = collections;
  }, [collections]); // Dependency array ensures this runs only when collections change

  return {
    selectedCollectionId: collections.selectedId,
    selectedCollection: getSelectedCollection,
    allCollections: Object.values(collections.byId),
    showCollections: !!collections.showCollections,
    nivoTestData: nivoTestData,
    handleSelectCollection,
    handleBackToCollections: resetCollection,
    updateCollectionField,
    resetCollection,
    updateCollectionsData,
    customError,
    // toggleShowCollections,
    addNewCollection,
    removeCollection,
    setCustomError,
    prevSelectedCollectionId: prevSelectedCollectionIdRef.current,
  };
}

export default useSelectedCollection;
