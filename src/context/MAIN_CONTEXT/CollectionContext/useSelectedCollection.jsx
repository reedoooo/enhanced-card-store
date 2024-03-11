import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_COLLECTION,
  SELECTED_COLLECTION_ID,
  DEFAULT_CARDS_COUNT,
} from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import jsonData from './nivoTestData.json';
import _set from 'lodash/set';

function useSelectedCollection() {
  const { nivoTestData } = jsonData;

  const [collections, setCollections] = useLocalStorage('collections', {
    allIds: [],
    byId: {
      [SELECTED_COLLECTION_ID]:
        DEFAULT_COLLECTION.addMultipleDefaultCards(DEFAULT_CARDS_COUNT),
    },
    selectedId: SELECTED_COLLECTION_ID,
    showCollections: true,
    nivoTestData: nivoTestData,
  });
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [collectionsVisible, setCollectionsVisible] = useState(true);
  const [customError, setCustomError] = useState(null);
  const prevSelectedCollectionIdRef = useRef(null);

  useEffect(() => {
    prevSelectedCollectionIdRef.current = selectedCollectionId;
  }, [selectedCollectionId]);
  const isCollectionShown = useMemo(
    () => collections.selectedId !== null,
    [collections.selectedId]
  );
  const getSelectedCollection = useMemo(
    () => collections.byId[collections.selectedId] || DEFAULT_COLLECTION,
    [collections.byId, collections.selectedId]
  );
  const handleSelectCollection = useCallback(
    (collection) => {
      console.log('SELECTED COLLECTION ID', collection._id);
      const prevSelectedCollectionId = prevSelectedCollectionIdRef.current;
      console.log('Previous selected collection ID:', prevSelectedCollectionId);
      setSelectedCollectionId(collection._id);
      setCustomError(null);
      setCollectionsVisible(false); // Hide collection list to show the selected collection's details.
      const collectionId = collection._id;
      if (!collections.byId[collectionId]) {
        setCustomError('Invalid collection selected');
        return;
      }
      setCollections((prev) => ({
        ...prev,
        selectedId: collectionId,
        showCollections: false,
      }));
      setCustomError(null);
    },
    [collections.byId, setCollections, setSelectedCollectionId]
  );
  const toggleShowCollections = useCallback(() => {
    setCollections((prev) => ({
      ...prev,
      showCollections: !prev.showCollections,
    }));
  }, [setCollections]);
  const handleBackToCollections = useCallback(() => {
    setCollections((prev) => ({
      ...prev,
      selectedId: null,
      showCollections: true,
    }));
    setCustomError(null);
  }, [setCollections]);
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

  // useEffect to log changes
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
    showCollections: collectionsVisible,
    nivoTestData: nivoTestData,
    handleSelectCollection,
    handleBackToCollections,
    updateCollectionField,
    resetCollection,
    updateCollectionsData,
    customError,
    isCollectionShown,
    toggleShowCollections,
    addNewCollection,
    removeCollection,
    setCustomError,
    prevSelectedCollectionId: prevSelectedCollectionIdRef.current,
  };
}

export default useSelectedCollection;

// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import {
//   DEFAULT_COLLECTION,
//   SELECTED_COLLECTION_ID,
//   DEFAULT_CARDS_COUNT,
// } from '../../constants';
// import useLocalStorage from '../../hooks/useLocalStorage';
// import _set from 'lodash/set'; // Assuming lodash is installed
// function useSelectedCollection() {
//   const prevSelectedCollectionRef = useRef(SELECTED_COLLECTION_ID);
//   const [collections, setCollections] = useLocalStorage('collections', {
//     allCollections: [DEFAULT_COLLECTION],
//     selectedCollection: DEFAULT_COLLECTION,
//     allIds: [SELECTED_COLLECTION_ID],
//     selectedId: SELECTED_COLLECTION_ID,
//     byId: {
//       [SELECTED_COLLECTION_ID]:
//         DEFAULT_COLLECTION.addMultipleDefaultCards(DEFAULT_CARDS_COUNT),
//     },
//     prevId: SELECTED_COLLECTION_ID,
//     showCollections: true,
//   });
//   const [selectedCollectionId, setSelectedCollectionId] = useLocalStorage(
//     'selectedCollectionId',
//     SELECTED_COLLECTION_ID
//   );
//   const [customError, setCustomError] = useState(null);
//   const isCollectionShown = useMemo(
//     () => collections.selectedId !== null,
//     [collections.selectedId]
//   );
//   const getSelectedCollection = useMemo(
//     () => collections.byId[collections.selectedId] || DEFAULT_COLLECTION,
//     [collections.byId, collections.selectedId]
//   );
//   const handleSelectCollection = useCallback(
//     (collection) => {
//       const collectionId = collection._id;
//       console.log(collectionId);
//       if (!collections.byId[collectionId]) {
//         setCustomError('Invalid collection selected');
//         return;
//       }
//       setCollections((prev) => ({
//         ...prev,
//         selectedId: collectionId,
//         selectedCollection: collections.byId[collectionId],

//         showCollections: false,
//       }));
//       setCustomError(null);
//     },
//     [setCollections]
//   );
//   const handleBackToCollections = useCallback(() => {
//     setCollections((prev) => ({
//       ...prev,
//       selectedId: null,
//       selectedCollection: null,
//       showCollections: true,
//     }));
//     setCustomError(null);
//   }, [setCollections]);
//   const updateCollectionField = useCallback(
//     (collectionId, fieldPath, value) => {
//       setCollections((prev) => {
//         const updatedCollections = { ...prev };
//         _set(updatedCollections.byId, `${collectionId}.${fieldPath}`, value);
//         return updatedCollections;
//       });
//     },
//     [setCollections]
//   );
//   const resetCollection = useCallback(() => {
//     setCollections((prev) => ({
//       ...prev,
//       selectedId: null, // Reset selected collection ID to null
//       showCollections: true, // Optionally, show all collections again
//     }));
//     setCustomError(null); // Clear any existing errors
//   }, [setCollections]);

//   const updateCollectionsData = useCallback(
//     (newCollections, collectionsData) => {
//       setCollections((prev) => {
//         const updatedById = { ...prev.byId, ...collectionsData }; // Assuming collectionsData is a map of {collectionId: collection}
//         // Ensure newCollections are properly incorporated into the state
//         newCollections.forEach((collection) => {
//           updatedById[collection._id] = collection;
//         });
//         let newSelectedId = prev.selectedId;
//         // Check if the current selected collection needs to be updated
//         if (
//           updatedById[newSelectedId] === undefined ||
//           newSelectedId === null
//         ) {
//           newSelectedId = newCollections[0]?._id || null;
//         }
//         return {
//           ...prev,
//           byId: updatedById,
//           allIds: Object.keys(updatedById),
//           selectedId: newSelectedId,
//           showCollections: !newSelectedId, // Hide or show collections based on whether a new selection is made
//         };
//       });
//     },
//     [setCollections]
//   );
//   const addNewCollection = useCallback(
//     (newCollection) => {
//       setCollections((prev) => {
//         const newId = new Date().getTime().toString(); // Simple unique ID generation
//         return {
//           ...prev,
//           allIds: [...prev.allIds, newId],
//           byId: { ...prev.byId, [newId]: newCollection },
//         };
//       });
//     },
//     [setCollections]
//   );

//   const removeCollection = useCallback(
//     (collectionId) => {
//       setCollections((prev) => {
//         const { [collectionId]: removed, ...remainingCollections } = prev.byId;
//         return {
//           ...prev,
//           allIds: prev.allIds.filter((id) => id !== collectionId),
//           byId: remainingCollections,
//           selectedId: prev.selectedId === collectionId ? null : prev.selectedId,
//         };
//       });
//     },
//     [setCollections]
//   );

//   const toggleShowCollections = useCallback(() => {
//     setCollections((prev) => ({
//       ...prev,
//       showCollections: !prev.showCollections,
//     }));
//   }, [setCollections]);
//   // useEffect(() => {
//   //   prevSelectedCollectionRef.current = collections.selectedId;
//   //   if (prevSelectedCollectionRef.current !== collections.selectedId) {
//   //     setSelectedCollectionId(collections.selectedId);
//   //   }
//   // }, [collections.selectedId, setSelectedCollectionId]);

//   return {
//     selectedCollectionId: collections.selectedId,
//     selectedCollection: collections.selectedCollection,
//     allCollections: Object.values(collections.byId),
//     showCollections: collections.showCollections,
//     handleSelectCollection,
//     handleBackToCollections,
//     updateCollectionField,
//     addNewCollection,
//     removeCollection,
//     toggleShowCollections,
//     customError,
//     setCustomError,
//   };
// }

// export default useSelectedCollection;

// // function useSelectedCollection() {
// //   const [selectedCollectionId, setSelectedCollectionId] = useLocalStorage(
// //     'selectedCollectionId',
// //     SELECTED_COLLECTION_ID
// //   );
// //   const [allCollectionIds, setAllCollectionIds] = useLocalStorage(
// //     'allCollectionIds',
// //     [SELECTED_COLLECTION_ID]
// //   );
// //   const [showCollections, setShowCollections] = useLocalStorage(
// //     'showCollections',
// //     true
// //   );
// //   const isCollectionShown = useMemo(
// //     () => selectedCollectionId !== null,
// //     [selectedCollectionId]
// //   ); // Use useMemo for derived state

// //   const [collectionViewState, setCollectionViewState] = useState({
// //     mode: {
// //       showListOfAllCollections: !isCollectionShown,
// //       showSelectedCollection: isCollectionShown,
// //     },
// //     visible: {
// //       selected: selectedCollectionId,
// //       all: allCollectionIds,
// //     },
// //     toggleViewState: (state) => {
// //       setCollectionViewState((prev) => ({
// //         ...prev,
// //         mode: state,
// //       }));
// //     },
// //   });
// //   const [selectedCollection, setSelectedCollection] = useLocalStorage(
// //     'selectedCollection',
// //     DEFAULT_COLLECTION.addMultipleDefaultCards(5)
// //   );
// //   const [allCollections, setAllCollections] = useLocalStorage(
// //     'allCollections',
// //     [DEFAULT_COLLECTION.addMultipleDefaultCards(5)]
// //   );
// //   const [collectionData, setCollectionData] = useLocalStorage(
// //     'collectionData',
// //     {}
// //   );
// //   const [customError, setCustomError] = useState(null);

// //   const prevSelectedCollectionRef = useRef(DEFAULT_COLLECTION);

// //   const handleSelectCollection = useCallback(
// //     (collectionId) => {
// //       if (!collectionId) {
// //         setCustomError('Invalid collection selected');
// //         return;
// //       }
// //       const collection =
// //         allCollections.find((c) => c._id === collectionId) ||
// //         DEFAULT_COLLECTION;
// //       setSelectedCollection(collection);
// //       setSelectedCollectionId(collection._id);
// //       setShowCollections(false);
// //       setCustomError(null);
// //       prevSelectedCollectionRef.current = collection;
// //     },
// //     [
// //       allCollections,
// //       setSelectedCollection,
// //       setSelectedCollectionId,
// //       setShowCollections,
// //       setCustomError,
// //     ]
// //   );

// //   const handleBackToCollections = useCallback(() => {
// //     setSelectedCollectionId(null);
// //     setSelectedCollection(DEFAULT_COLLECTION);
// //     setShowCollections(true);
// //     setCustomError(null);
// //   }, [
// //     setSelectedCollectionId,
// //     setSelectedCollection,
// //     setShowCollections,
// //     setCustomError,
// //   ]);
// //   const updateCollectionField = useCallback(
// //     (fieldPath, value) => {
// //       setSelectedState((prevCollection) => {
// //         const updatedCollection = { ...prevCollection };
// //         let currentField = updatedCollection;
// //         const keys = fieldPath.split('.');
// //         keys.forEach((key, index) => {
// //           if (index === keys.length - 1) {
// //             currentField[key] = value;
// //           } else {
// //             if (!currentField[key]) currentField[key] = {};
// //             currentField = currentField[key];
// //           }
// //         });
// //         return updatedCollection;
// //       });
// //     },
// //     [setSelectedState]
// //   );

// // useEffect(() => {
// //   // console.log('SELECTED COLLECTION ID:', selectedCollectionId);
// //   // console.log('SELECTED COLLECTION:', selectedCollection);
// //   // console.log('COLLECTION SHOWN:', isCollectionShown);
// //   setShowCollections(isCollectionShown);
// // }, [
// //   selectedCollection,
// //   selectedCollectionId,
// //   isCollectionShown,
// //   setShowCollections,
// // ]);
// // useEffect(() => {
// //   const collection = localStorage.getItem('selectedCollection');
// //   setSelectedCollection(collection ? JSON.parse(collection) : null);
// // }, []);
// // const [selectedCollection, setSelectedCollection] = useLocalStorage(
// //   'selectedCollection',
// //   DEFAULT_COLLECTION.addMultipleDefaultCards(5)
// // );
// // const [allCollections, setAllCollections] = useLocalStorage(
// //   'allCollections',
// //   [DEFAULT_COLLECTION.addMultipleDefaultCards(5)]
// // );
// // const [collectionData, setCollectionData] = useLocalStorage(
// //   'collectionData',
// //   {}
// // );
// // const [selectedCollectionId, setSelectedCollectionId] = useLocalStorage(
// //   'selectedCollectionId',
// //   null
// // );
// // const [showCollections, setShowCollections] = useLocalStorage(
// //   'showCollections',
// //   true
// // );
// // const prevSelectedCollectionRef = useRef(DEFAULT_COLLECTION);
// // const [error, setError] = useState(null);

// // const setSelectedState = useCallback(
// //   (collection) => {
// //     prevSelectedCollectionRef.current = selectedCollection; // Store current collection as previous
// //     setSelectedCollection(collection); // Update selected collection
// //   },
// //   [selectedCollection, setSelectedCollection, setSelectedCollectionId]
// // );

// // const handleSelectCollection = useCallback(
// //   (collection) => {
// //     setShowCollections(false);
// //     setSelectedState(collection);
// //     setSelectedCollectionId(collection._id);
// //   },
// //   [
// //     setSelectedState,
// //     setSelectedCollectionId,
// //     setShowCollections,
// //     setCustomError,
// //   ]
// // );
// // const handleBackToCollections = useCallback(() => {
// //   console.log('BACK TO COLLECTIONS');
// //   setSelectedState(DEFAULT_COLLECTION.addMultipleDefaultCards(5));
// //   setSelectedCollectionId(null);
// //   setShowCollections(true);
// //   setCustomError(null);
// // }, [
// //   setSelectedCollectionId,
// //   setSelectedState,
// //   setShowCollections,
// //   setCustomError,
// // ]);
