// import { useState, useCallback } from 'react';
// import useFetchWrapper from './useFetchWrapper';
// import useLogger from './useLogger';
// import { useLoading } from './useLoading';

// const useGet = ({
//   userId,
//   isLoggedIn,
//   hasFetchedFlag,
//   path,
//   setLoadingFlag,
//   updateStates,
//   setError,
//   fetchWrapper,
//   createApiUrl,
//   logger,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = useCallback(async () => {
//     if (!userId || isLoading || hasFetchedFlag) return;

//     const loadingID = `fetch_${path}`;
//     setIsLoading(true);
//     try {
//       const responseData = await fetchWrapper(
//         createApiUrl(path),
//         'GET',
//         null,
//         loadingID
//       );

//       if (responseData && [200, 201].includes(responseData?.status)) {
//         logger.logEvent(`SUCCESS: fetching ${path}`);
//         updateStates(responseData);
//         setLoadingFlag(true); // Update the hasFetched flag for this data type
//       }
//     } catch (error) {
//       console.error(`ERROR: fetching ${path}`, error);
//       setError(error.message || `Failed to fetch ${path}`);
//       logger.logEvent(`ERROR: fetching ${path}`, error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [
//     userId,
//     isLoading,
//     hasFetchedFlag,
//     path,
//     setLoadingFlag,
//     updateStates,
//     setError,
//     fetchWrapper,
//     createApiUrl,
//     logger,
//   ]);

//   return { fetchData, isLoading };
// };

// export default useGet;
