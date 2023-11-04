// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useContext,
// } from 'react';
// import { useCookies } from 'react-cookie';
// import {
//   initialCollectionState,
//   fetchWrapper,
//   removeDuplicateCollections,
//   calculateAndUpdateTotalPrice,
//   calculateTotalPrice,
//   getTotalCost,
//   getCardPrice,
// } from './exampleImport.js';
// import { useCombinedContext } from '../CombinedProvider.jsx';
// import { useUserContext } from '../UserContext/UserContext.js';
// import moment from 'moment';
// // import { useUserContext } from '../UserContext/UserContext.js';
// // 1. Define a default context value
// const defaultContextValue = {
//   allCollections: [],
//   allCardPrices: [],
//   xy: [],
//   selectedCollection: {},
//   collectionData: initialCollectionState,
//   totalCost: 0,
//   openChooseCollectionDialog: false,
//   updatedPricesFromCombinedContext: {},
//   setUpdatedPricesFromCombinedContext: () => {},
//   setOpenChooseCollectionDialog: () => {},
//   calculateTotalPrice: () => {},
//   getTotalCost: () => {},
//   createUserCollection: () => {},
//   removeCollection: () => {},
//   fetchAllCollectionsForUser: () => {},
//   setSelectedCollection: () => {},
//   setAllCollections: () => {},
//   addOneToCollection: () => {},
//   removeOneFromCollection: () => {},
// };

// // 2. Replace null with the default value when creating the context
// export const CollectionContext = createContext(defaultContextValue);
// const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api/users`;

// const filterOutDuplicateYValues = (datasets) => {
//   // console.log('DATASETS:', datasets);
//   const seenYValues = new Set();
//   return datasets?.filter((data) => {
//     const yValue = data?.y;
//     if (seenYValues.has(yValue)) {
//       return false;
//     }
//     seenYValues.add(yValue);
//     return true;
//   });
// };

// const transformChartData = (chartData) => {
//   let pointsArray = [];

//   if (Array.isArray(chartData?.datasets)) {
//     chartData?.datasets?.forEach((dataset) => {
//       dataset.data?.forEach((dataEntry) => {
//         dataEntry.xys?.forEach((xyEntry) => {
//           const { x, y } = xyEntry.data;
//           if (x && y !== undefined) {
//             pointsArray.push({ x, y });
//           }
//         });
//       });
//     });
//   } else {
//     console.error(
//       'Expected chartData.datasets to be an array, but got:',
//       chartData
//     );
//   }

//   return pointsArray;
// };

// function convertData(originalData) {
//   let finalDataForChart = [];

//   const { datasets } = originalData;

//   if (Array.isArray(datasets) && datasets.length > 0) {
//     datasets.forEach((dataset, index) => {
//       // Loop over all datasets, not just the last one
//       if (Array.isArray(dataset.data) && dataset.data.length > 0) {
//         dataset.data.forEach((dataEntry) => {
//           dataEntry.xys?.forEach((xyEntry) => {
//             const { label, data } = xyEntry;
//             // Assume that finalDataForChart has an array for each label
//             finalDataForChart[label] = finalDataForChart[label] || [];

//             data.forEach(({ x, y }) => {
//               if (x && y !== undefined) {
//                 finalDataForChart[label].push({ x, y });
//               }
//             });
//           });
//         });
//       }
//     });
//   }

//   // Convert the data into the format expected by Nivo
//   const nivoData = Object.keys(finalDataForChart).map((label) => ({
//     id: label,
//     data: finalDataForChart[label],
//   }));

//   return {
//     ...originalData,
//     finalDataForChart: nivoData, // Replace this line to return Nivo-formatted data
//   };
// }

// const isEmpty = (obj) => {
//   return (
//     [Object, Array].includes((obj || {}).constructor) &&
//     !Object.entries(obj || {}).length
//   );
// };
// const validateData = (data, eventName, functionName) => {
//   const dataType = typeof data;
//   console.log(
//     `[Info] Received data of type: ${dataType} in ${functionName} triggered by event: ${eventName}`
//   );
//   if (data === null || data === undefined) {
//     console.warn(
//       `[Warning] Received null or undefined data in ${functionName} triggered by event: ${eventName}`
//     );
//     return false;
//   }
//   if (isEmpty(data)) {
//     console.error(
//       `[Error] Received empty data object or array in ${functionName} triggered by event: ${eventName}`
//     );
//     return false;
//   }
//   return true;
// };

// const handleCardAddition = (currentCards, cardToAdd) => {
//   // Check if the card already exists in the currentCards array
//   const cardToAddId =
//     typeof cardToAdd.id === 'number' ? String(cardToAdd.id) : cardToAdd.id;

//   const matchingCard = currentCards.find((c) => c.id === cardToAddId);

//   if (matchingCard) {
//     matchingCard.quantity++;
//     return [...currentCards];
//   } else {
//     return [...currentCards, { ...cardToAdd, id: cardToAddId, quantity: 1 }];
//   }
// };

// const handleCardRemoval = (currentCards, cardToRemove) => {
//   // Convert the cardToRemove's id to a string if it's a number
//   const cardToRemoveId =
//     typeof cardToRemove.id === 'number'
//       ? String(cardToRemove.id)
//       : cardToRemove.id;

//   const matchingCard = currentCards.find((c) => c.id === cardToRemoveId);

//   if (!matchingCard) {
//     console.error('Card not found in the collection.');
//     return [...currentCards];
//   }

//   if (matchingCard.quantity > 1) {
//     matchingCard.quantity--;
//     return [...currentCards];
//   } else {
//     return currentCards.filter((card) => card.id !== cardToRemoveId);
//   }
// };
// const calculateTotalFromAllCardPrices = (allCardPrices) => {
//   if (!Array.isArray(allCardPrices)) return 0;
//   return allCardPrices.reduce(
//     (total, price) => total + ensureNumber(price, 0),
//     0
//   );
// };
// const ensureNumber = (value, defaultValue = 0) => {
//   let num = parseFloat(value);
//   return isNaN(num) ? defaultValue : num;
// };
// const HTTP_METHODS = {
//   POST: 'POST',
//   PUT: 'PUT',
//   GET: 'GET',
//   DELETE: 'DELETE',
// };
// const handleError = (error) => {
//   console.error(`An error occurred: ${error.message}`);
// };
// const findCollectionIndex = useCallback(
//   (collections, id) =>
//     collections?.findIndex((collection) => collection?._id === id) ?? -1,
//   []
// );
// const apiRequest = async (userId, endpoint, method, data) => {
//   try {
//     const url = createApiUrl(endpoint);
//     const response = await fetchWrapper(url, method, data);

//     if (!response || response.error) {
//       throw new Error(
//         response ? response.error.message : 'Failed to connect to the server.'
//       );
//     }

//     return handleApiResponse(response, method);
//   } catch (error) {
//     console.error(`API Request failed: ${error.message}`);
//     return null;
//   }
// };
// const createApiUrl = (path) => `${BASE_API_URL}/${path}`;
// const handleApiResponse = (response, method) => {
//   // Handling POST requests
//   if (method === 'POST' && response?.data?.newCollection) {
//     return response.data.newCollection;
//   }

//   // Handling PUT requests (updating a collection)
//   if (method === 'PUT' && response.data?.data?.updatedCollection) {
//     return response.data.data.updatedCollection;
//   }

//   throw new Error('Unexpected response format');
// };
// const formatDate = () => moment().format('YYYY-MM-DD HH:mm');
// // Utility function to filter unique X values
// const filterUniqueXValues = (values) => {
//   const uniqueXValues = new Set();
//   return values.filter((entry) => {
//     if (!uniqueXValues.has(entry.x)) {
//       uniqueXValues.add(entry.x);
//       return true;
//     }
//     return false;
//   });
// };
// const getUniqueFilteredXYValues = (allXYValues) => {
//   const uniqueXValues = new Set();

//   return allXYValues
//     .filter((entry) => entry.y !== 0)
//     .filter((entry) => {
//       if (!uniqueXValues.has(entry.x)) {
//         uniqueXValues.add(entry.x);
//         return true;
//       }
//       return false;
//     });
// };
// const safeFetch = async (url, method, payload) => {
//   try {
//     const response = await fetchWrapper(url, method, payload);
//     return handleApiResponse(response, method);
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };
// const fetchAndUpdateCollectionData = async (
//   endpoint,
//   method,
//   payload,
//   setCollectionFn,
//   setErrorFn
// ) => {
//   try {
//     const response = await fetchWrapper(endpoint, method, payload);
//     const data = handleApiResponse(response, method);

//     if (data) {
//       setCollectionFn(data);
//     } else {
//       throw new Error('Data is null');
//     }
//   } catch (error) {
//     setErrorFn(`Failed to process the request: ${error.message}`);
//   }
// };

// const apiRequestWrapper = (userId, endpoint, method, data) => {
//   return apiRequest(userId, `${userId}/collections${endpoint}`, method, data);
// };

// const updateCollectionData = (newData, updaterFn) => {
//   updaterFn((prevData) => {
//     const index = findCollectionIndex(prevData, newData._id);
//     return index === -1
//       ? [...prevData, newData]
//       : Object.assign([...prevData], { [index]: newData });
//   });
// };

// const CollectionHandler = () => {
//   // const { cardPrices } = useCombinedContext();
//   const [cookies] = useCookies(['user']);
//   const { triggerCronJob } = useUserContext();
//   const [collectionData, setCollectionData] = useState(initialCollectionState);
//   const [allCollections, setAllCollections] = useState([]);
//   const [allCardPrices, setAllCardPrices] = useState([]);
//   const [xyData, setXyData] = useState([
//     // {
//     //   label: '',
//     //   data: [],
//     // },
//   ]); // New state to hold xy data
//   // const [updatedPrices, setUpdatedPrices] = useState([]);
//   const [
//     updatedPricesFromCombinedContext,
//     setUpdatedPricesFromCombinedContext,
//   ] = useState({});
//   const [selectedCollection, setSelectedCollection] = useState({});
//   const [openChooseCollectionDialog, setOpenChooseCollectionDialog] =
//     useState(false);
//   const chartData = selectedCollection?.chartData || {};
//   // const datasets = chartData?.datasets || [];
//   const userId = cookies.user?.id;
//   const totalCost = useMemo(
//     () => getTotalCost(selectedCollection),
//     [selectedCollection]
//   );
//   // [COLLECTION RETRIEVAL]
//   const fetchCollections = useCallback(
//     async (userId) => {
//       fetchAndUpdateCollectionData(
//         `${BASE_API_URL}/${userId}/collections`,
//         HTTP_METHODS.GET,
//         null,
//         setAllCollections,
//         handleError
//       );
//     },
//     [setAllCollections, handleError]
//   );
//   const useCollection = (userId) => {
//     const [collections, setCollections] = useState(null);

//     const fetchAndSetCollections = useCallback(async () => {
//       const data = await safeFetch(
//         `${BASE_API_URL}/${userId}/collections`,
//         HTTP_METHODS.GET
//       );
//       if (data) setCollections(data.allCollections);
//     }, [userId]);

//     return [collections, fetchAndSetCollections];
//   };
//   // ... Other Collection related methods

//   // [COLLECTION CREATION & DELETION]
// const useCollectionCrud = (userId) => {
//   const [selectedCollection, setSelectedCollection] = useState(null);
//   const [allCollections, setAllCollections] = useState([]);

//   const createUserCollection = useCallback(
//     async (newCollectionInfo) => {
//       const payload = { ...newCollectionInfo, userId, totalCost: 0, totalPrice: 0 };
//       const response = await safeFetch(
//         createApiUrl(`${userId}/collections/newCollection/${userId}`),
//         'POST',
//         payload
//       );
//       if (response) performCollectionUpdate(response, 'create');
//     },
//     [userId]
//   );

//   const removeCollection = useCallback(
//     async (collectionId) => {
//       await safeFetch(
//         createApiUrl(`${userId}/collections/${collectionId}`),
//         'DELETE'
//       );
//       setAllCollections((prev) => prev.filter((item) => item._id !== collectionId));
//     },
//     [userId]
//   );
//   const handleCollection = useCallback(
//     async (method, payload, collectionId = '') => {
//       const endpoint = collectionId
//         ? `${userId}/collections/${collectionId}`
//         : `${userId}/collections`;
//       fetchAndUpdateCollectionData(
//         endpoint,
//         method,
//         payload,
//         setAllCollections,
//         handleError
//       );
//     },
//     [userId, setAllCollections, handleError]
//   );
//   return [createUserCollection, removeCollection];
// };
//   // [CARD ADDITION & REMOVAL]
//   const addOrRemoveCard = useCallback(
//     async (card, cardInfo, operation) => {
//       // Your previous logic here.

//       const collectionId = selectedCollection._id || allCollections[0]._id;
//       if (!collectionId) {
//         // Handle error
//         return;
//       }

//       const updateInfo = getUpdateInfo(card, cardInfo, operation); // Assume this function is implemented
//       const method = operation === 'create' ? 'POST' : 'PUT';

//       fetchAndUpdateCollectionData(
//         `${userId}/collections/${collectionId}`,
//         method,
//         updateInfo,
//         setSelectedCollection,
//         handleError
//       );
//     },
//     [userId, setSelectedCollection, handleError]
//   );
//   const useCardManager = (userId, selectedCollection, allCollections) => {
//     const addOrRemoveCard = useCallback(
//       async (card, operation) => {
//         // ... (your existing logic here, try to use helper methods)
//         await performCollectionUpdate(updatedCollection, 'update');
//       },
//       [userId, selectedCollection, allCollections]
//     );

//     return [addOrRemoveCard];
//   };

//   // [COLLECTION DATA UPDATE]
//   const performCollectionUpdate = useCallback(
//     async (updateInfo, operation) => {
//       const method = operation === 'create' ? 'POST' : 'PUT';
//       const endpoint = updateInfo._id ? `/${updateInfo._id}` : '';
//       const updatedCollection = await apiRequestWrapper(
//         userId,
//         endpoint,
//         method,
//         updateInfo
//       );
//       if (updatedCollection) {
//         updateCollectionData(updatedCollection, setAllCollections);
//         updateCollectionData(updatedCollection, setSelectedCollection);
//       }
//     },
//     [userId, setAllCollections, setSelectedCollection]
//   );
//   return (
//     // Your JSX components here
//   );
// };
//   // [COLLECTION RETRIEVAL]
//   // const fetchCollections = useCallback(
//   //   async (userId) => {
//   //     fetchAndUpdateCollectionData(
//   //       `${BASE_API_URL}/${userId}/collections`,
//   //       HTTP_METHODS.GET,
//   //       null,
//   //       setAllCollections,
//   //       handleError
//   //     );
//   //   },
//   //   [setAllCollections, handleError]
//   // );
//   // const setCollections = useCallback((collections) => {
//   //   try {
//   //     if (!collections || !Array.isArray(collections))
//   //       throw new Error('Invalid collections array');

//   //     // Other logic for setting collections
//   //   } catch (error) {
//   //     handleError(error);
//   //   }
//   // }, []);
//   // const fetchAndSetCollections = useCallback(async () => {
//   //   try {
//   //     const collections = await fetchCollections(userId);
//   //     if (collections) setCollections(collections);
//   //   } catch (error) {
//   //     handleError(error);
//   //   }
//   // }, [userId, fetchCollections, setCollections]);
//   // // [COLLECTION CREATION & DELETION]
//   // const createUserCollection = async (
//   //   userId,
//   //   newCollectionInfo,
//   //   name,
//   //   description
//   // ) => {
//   //   if (!userId) {
//   //     console.error('User ID is undefined.');
//   //     return;
//   //   }
//   //   if (
//   //     !validateData(
//   //       newCollectionInfo,
//   //       'Create User Collection',
//   //       'createUserCollection'
//   //     )
//   //   ) {
//   //     console.error('Validation failed for collection data.');
//   //     return;
//   //   }

//   //   const payload = {
//   //     name: name || newCollectionInfo.name,
//   //     description: description || newCollectionInfo.description,
//   //     userId: userId || newCollectionInfo.userId,
//   //     totalCost: 0,
//   //     totalPrice: 0,
//   //     quantity: 0,
//   //     totalQuantity: 0,
//   //     xys: xyData || [],
//   //     allCardPrices: [],
//   //     cards: [],
//   //     chartData: {},
//   //   };

//   //   try {
//   //     const url = createApiUrl(`${userId}/collections/newCollection/${userId}`);
//   //     const response = await fetchWrapper(url, 'POST', payload);

//   //     if (!response) {
//   //       console.error('Failed to connect to the server.');
//   //       return;
//   //     }

//   //     if (response.error) {
//   //       console.error(
//   //         `Failed to create a new collection: ${response.error.message}`
//   //       );
//   //       return;
//   //     }

//   //     const savedCollection = handleApiResponse(response, 'POST');
//   //     await performCollectionUpdate(payload, 'create');

//   //     // updateCollectionData(savedCollection, 'allCollections');
//   //     // updateCollectionData(savedCollection, 'collectionData');
//   //   } catch (error) {
//   //     console.error(`Failed to create a new collection: ${error.message}`);
//   //   }
//   // };
//   // const removeCollection = async (collection) => {
//   //   if (!collection._id) {
//   //     console.error('Collection ID is undefined.');
//   //     return;
//   //   }

//   //   try {
//   //     const url = createApiUrl(`${userId}/collections/${collection._id}`);
//   //     const response = await fetchWrapper(url, 'DELETE');

//   //     if (response.error) {
//   //       console.error('Failed to delete the collection:', response.error);
//   //       return;
//   //     }

//   //     setAllCollections((prev) =>
//   //       prev.filter((item) => item._id !== collection._id)
//   //     );

//   //     if (selectedCollection._id === collection._id) {
//   //       setSelectedCollection(initialCollectionState);
//   //       setCollectionData(initialCollectionState);
//   //     }
//   //   } catch (error) {
//   //     console.error(`Failed to delete the collection: ${error.message}`);
//   //   }
//   // };
//   // // const handleCollection = useCallback(
//   // //   async (method, payload, collectionId = '') => {
//   // //     const endpoint = collectionId
//   // //       ? `${userId}/collections/${collectionId}`
//   // //       : `${userId}/collections`;
//   // //     fetchAndUpdateCollectionData(
//   // //       endpoint,
//   // //       method,
//   // //       payload,
//   // //       setAllCollections,
//   // //       handleError
//   // //     );
//   // //   },
//   // //   [userId, setAllCollections, handleError]
//   // // );
//   // // [CARD ADDITION & REMOVAL]
//   // const getUpdatedCards = (activeCollection, card, operation) => {
//   //   const handler =
//   //     operation === 'add' ? handleCardAddition : handleCardRemoval;
//   //   const updatedCards = handler(activeCollection?.cards, card);

//   //   return updatedCards.map((card) => {
//   //     const cardPrice = card.card_prices?.[0]?.tcgplayer_price;
//   //     const computedPrice = cardPrice * card.quantity;

//   //     const newDataset = { x: formatDate(), y: computedPrice };
//   //     card.chart_datasets = filterUniqueXValues([
//   //       ...(card?.chart_datasets || []),
//   //       newDataset,
//   //     ]);

//   //     card.price = cardPrice;
//   //     card.totalPrice = computedPrice;
//   //     return card;
//   //   });
//   // };
//   // const getNewChartData = (activeCollection, updatedPrice, newDataSet) => {
//   //   const combinedXYValues = [
//   //     ...(selectedCollection?.chartData?.datasets?.flatMap(
//   //       (dataset) => dataset.data
//   //     ) || []),
//   //     newDataSet.data[0].xy,
//   //   ];

//   //   const filteredXYValues = getUniqueFilteredXYValues(combinedXYValues);

//   //   return {
//   //     name: `Chart for Collection: ${activeCollection?.name}`,
//   //     userId: userId,
//   //     updatedPrice: updatedPrice,
//   //     xys: xyData || [],
//   //     datasets: [
//   //       ...(selectedCollection?.chartData?.datasets || []),
//   //       newDataSet,
//   //     ],
//   //     allXYValues: filteredXYValues,
//   //   };
//   // };
//   // // const addOrRemoveCard = useCallback(
//   // //   async (card, cardInfo, operation) => {
//   // //     // Your previous logic here.

//   // //     const collectionId = selectedCollection._id || allCollections[0]._id;
//   // //     if (!collectionId) {
//   // //       // Handle error
//   // //       return;
//   // //     }

//   // //     const updateInfo = getUpdateInfo(card, cardInfo, operation); // Assume this function is implemented
//   // //     const method = operation === 'create' ? 'POST' : 'PUT';

//   // //     fetchAndUpdateCollectionData(
//   // //       `${userId}/collections/${collectionId}`,
//   // //       method,
//   // //       updateInfo,
//   // //       setSelectedCollection,
//   // //       handleError
//   // //     );
//   // //   },
//   // //   [userId, setSelectedCollection, handleError]
//   // // );
//   // // // [COLLECTION DATA UPDATE]
//   // // const performCollectionUpdate = useCallback(
//   // //   async (updateInfo, operation) => {
//   // //     const method = operation === 'create' ? 'POST' : 'PUT';
//   // //     const endpoint = updateInfo._id ? `/${updateInfo._id}` : '';
//   // //     const updatedCollection = await apiRequestWrapper(
//   // //       userId,
//   // //       endpoint,
//   // //       method,
//   // //       updateInfo
//   // //     );
//   // //     if (updatedCollection) {
//   // //       updateCollectionData(updatedCollection, setAllCollections);
//   // //       updateCollectionData(updatedCollection, setSelectedCollection);
//   // //     }
//   // //   },
//   // //   [userId, setAllCollections, setSelectedCollection]
//   // // );
//   // const updateCollection = (newData, collectionType, updaterFn) => {
//   //   switch (collectionType) {
//   //     case 'allCollections':
//   //       return updaterFn((prevCollections = []) => {
//   //         const existingIndex = findCollectionIndex(
//   //           prevCollections,
//   //           newData?._id
//   //         );
//   //         return existingIndex === -1
//   //           ? [...prevCollections, newData]
//   //           : Object.assign([...prevCollections], { [existingIndex]: newData });
//   //       });
//   //     case 'selectedCollection':
//   //     case 'collectionData':
//   //       return updaterFn(newData);
//   //     default:
//   //       break;
//   //   }
//   // };
//   // const updateActiveCollection = useCallback(
//   //   async (collectionData, existingChartData = {}) => {
//   //     const isCreatingNew = !collectionData?._id;
//   //     const isNewCollectionEndpoint =
//   //       collectionData?.endpoint === 'newCollection'; // Add this line to check if it's the newcollection endpoint
//   //     const endpoint = isCreatingNew
//   //       ? createApiUrl(`${userId}/collections`)
//   //       : createApiUrl(`${userId}/collections/${collectionData._id}`);
//   //     let method = isCreatingNew ? 'POST' : 'PUT'; // Default setting
//   //     console.log(`Debug: Fetching ${method} ${endpoint}`); // Debugging log

//   //     // Restrict to only POST for the 'newcollection' endpoint
//   //     if (!isCreatingNew && isNewCollectionEndpoint) {
//   //       method = 'POST';
//   //     }
//   //     try {
//   //       const response = await fetchWrapper(endpoint, method, collectionData);
//   //       const updatedCollection = handleApiResponse(response, method);

//   //       if (!isCreatingNew && !updatedCollection) {
//   //         throw new Error('Failed to update the existing collection');
//   //       }
//   //       const newChartData = {
//   //         ...updatedCollection.chartData,
//   //         xys: [
//   //           ...(existingChartData.xys || []), // Spread existing xys data
//   //           {
//   //             label: `Update Number ${
//   //               updatedCollection?.chartData?.datasets?.length + 1 || 1
//   //             }`,
//   //             data: [
//   //               ...(existingChartData.data || []), // Spread existing data
//   //               {
//   //                 x: moment().format('YYYY-MM-DD HH:mm'),
//   //                 y: updatedCollection.totalPrice,
//   //               },
//   //             ],
//   //           },
//   //         ],
//   //         datasets: [
//   //           ...(updatedCollection.chartData?.datasets || []),
//   //           {
//   //             data: [
//   //               {
//   //                 xys: [
//   //                   {
//   //                     label: `Update Number ${
//   //                       updatedCollection?.chartData?.datasets?.length + 1 || 1
//   //                     }`,
//   //                     data: [
//   //                       {
//   //                         x: moment().format('YYYY-MM-DD HH:mm'),
//   //                         y: updatedCollection.totalPrice,
//   //                       },
//   //                     ],
//   //                   },
//   //                 ],
//   //                 additionalPriceData: {
//   //                   priceChanged: false,
//   //                   initialPrice:
//   //                     updatedCollection.chartData?.updatedPrice || 0,
//   //                   updatedPrice: updatedCollection.totalPrice,
//   //                   priceDifference: 0,
//   //                   priceChange: 0,
//   //                 },
//   //               },
//   //             ],
//   //           },
//   //         ],
//   //       };
//   //       updatedCollection.chartData = newChartData;

//   //       const convertedData = convertData(newChartData);
//   //       updatedCollection.xys = convertedData;
//   //       // setXyData(convertedData.finalDataForChart);
//   //       xyData.push(...convertedData.finalDataForChart); // Spread to add to existing array
//   //       updateCollectionData(updatedCollection, 'selectedCollection');
//   //       updateCollectionData(updatedCollection, 'allCollections');
//   //     } catch (error) {
//   //       console.error(`Failed to update the collection: ${error.message}`);
//   //     }
//   //   },
//   //   [userId, updateCollectionData]
//   // );
//   // console.log(
//   //   '<----------$$$$$$$$$CONVERTED DATA FOR CHART$$$$$$$$$---------->',
//   //   xyData
//   // );
//   // useEffect(() => {
//   //   // Check if the prices are updated or new cards are added
//   //   const updatedPricesArray =
//   //     updatedPricesFromCombinedContext?.updatedPrices || [];

//   //   if (!Array.isArray(updatedPricesArray)) {
//   //     return; // Exit the useEffect early if not an array
//   //   }

//   useEffect(() => {
//     const updatedPricesArray = Object.keys(
//       updatedPricesFromCombinedContext || {}
//     ).map((cardId) => updatedPricesFromCombinedContext[cardId]);

//     console.log(
//       '[1][PRICE UPDATE: COMBINED CONTEXT IN COLLECTION][UPDATED PRICES]==========>',
//       updatedPricesArray
//     );

//     const updatedCardPrices = [];

//     updatedPricesArray.forEach((card) => {
//       const currentCardPrice = selectedCollection?.cards[card?.id]?.price;

//       // Check if this is the special tagged card
//       if (card._tag === 'updated') {
//         console.log('Found the special card:', card);
//       }

//       if (card?.updatedPrice !== currentCardPrice) {
//         updatedCardPrices.push(card);
//         console.log(
//           '[2][PRICE UPDATE: COMBINED CONTEXT IN COLLECTION][CARD]==========>',
//           card
//         );
//         console.log(
//           'CARD FROM SELECTED COLLECTIONS:',
//           selectedCollection.cards[card.id]
//         );
//       } else {
//         console.log('Price has not been updated for card with ID:', card.id);
//       }
//     });

//     if (updatedCardPrices.length > 0) {
//       updatedCardPrices.forEach((card) => {
//         addOrRemoveCard(card, { updated: true }, 'update');
//       });
//     }
//   }, [updatedPricesFromCombinedContext]);

//   const contextValue = useMemo(
//     () => ({
//       // DATA
//       allCollections,
//       selectedCollection,
//       collectionData,
//       totalCost,

//       allCardPrices: selectedCollection?.allCardPrices || [],
//       xys: xyData || [],
//       openChooseCollectionDialog,
//       updatedPricesFromCombinedContext,
//       setUpdatedPricesFromCombinedContext: (updatedPrices) => {
//         // This is the function that will be passed to the combined context to update the prices
//         setUpdatedPricesFromCombinedContext(updatedPrices);
//       },
//       setOpenChooseCollectionDialog,
//       // FUNCTIONS
//       calculateTotalPrice: () => getCardPrice(selectedCollection),
//       getTotalCost: () => getTotalCost(selectedCollection),
//       // FUNCTIONS
//       createUserCollection: (userId, newCollectionInfo) =>
//         createUserCollection(
//           userId,
//           newCollectionInfo,
//           newCollectionInfo.name,
//           newCollectionInfo.description
//         ),
//       removeCollection: (collection) => removeCollection(collection),
//       fetchAllCollectionsForUser: fetchAndSetCollections,
//       setSelectedCollection: updateActiveCollection,
//       setAllCollections: (collections) => setAllCollections(collections),
//       addOneToCollection: (card, cardInfo) =>
//         addOrRemoveCard(card, cardInfo, 'add'),
//       removeOneFromCollection: (card) => addOrRemoveCard(card, null, 'remove'),
//     }),
//     [allCollections, selectedCollection, totalCost]
//   );

//   useEffect(() => {
//     console.log('COLLECTION CONTEXT: ', {
//       contextValue,
//     });
//   }, [contextValue, updatedPricesFromCombinedContext]);
//   // Assuming updatedPrices is passed as a prop or state

//   useEffect(() => {
//     if (selectedCollection && totalCost) {
//       // Trigger the cron job whenever the selectedCollection changes
//       triggerCronJob();
//     }
//   }, [selectedCollection, triggerCronJob, totalCost]);

//   useEffect(() => {
//     console.log('Total Cost has been updated:', totalCost);
//   }, [totalCost]);

//   useEffect(() => {
//     if (userId) fetchAndSetCollections();
//   }, [userId]);

//   return (
//     <CollectionContext.Provider value={contextValue}>
//       {children}
//     </CollectionContext.Provider>
//   );
// };

// // useCollectionStore.js
// // import { useContext } from 'react';
// // import { CollectionContext } from '../CollectionContext/CollectionContext';

// export const useCollectionStore = () => {
//   const context = useContext(CollectionContext);
//   if (!context) {
//     throw new Error(
//       'useCollectionStore must be used within a CollectionProvider'
//     );
//   }
//   return context;
// };
