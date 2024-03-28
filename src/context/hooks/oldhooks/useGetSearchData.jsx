// import { useState, useEffect } from 'react';
// import useLocalStorage from './useLocalStorage';

// export const useGetSearchData = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchData, setSearchData] = useLocalStorage('searchData', []);
//   useEffect(() => {
//     // Simulate data loading if necessary
//     setIsLoading(true);
//     const timeoutId = setTimeout(() => {
//       const initialData = JSON.parse(
//         localStorage.getItem('searchData') || '[]'
//       );
//       setSearchData(initialData);
//       setIsLoading(false);
//     }, 1000); // Simulate async operation delay
//     return () => clearTimeout(timeoutId);
//   }, []); // Empty array ensures this runs once on mount

//   return { searchData, isLoading, setIsLoading };
// };
