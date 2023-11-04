import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP library
// import { fetchWrapper } from '../CollectionContext/exampleImport';

const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api`;

const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {
  const [isContextLoading, setIsContextLoading] = useState(true);
  const [directedResponses, setDirectedResponses] = useState([]); // Initialize as an empty array
  // const fetchWrapper = async (url, method, body = null) => {
  //   try {
  //     const options = {
  //       method,
  //       headers: { 'Content-Type': 'application/json' },
  //       ...(body && { body: JSON.stringify(body) }),
  //     };
  //     const response = await fetch(url, options);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     if (error.message === 'Failed to fetch') {
  //       console.error('Network error: ', error);
  //       throw new Error(
  //         'Network error. Please check your connection and try again.'
  //       );
  //     }
  //     throw error;
  //   }
  // };

  const fetchDirectedResponses = async () => {
    // let isMounted = true; // Added this flag

    try {
      setIsContextLoading(true);
      const response = await axios.get(`${BASE_API_URL}/directedResponses`);
      const data = response.data;

      // if (isMounted) {
      // Check if component is still mounted
      Array.isArray(data)
        ? setDirectedResponses(data)
        : setDirectedResponses([]);
      // }
    } catch (error) {
      // if (isMounted) {
      // Check if component is still mounted
      console.error('Error:', error);
      setDirectedResponses([]);
      // }
    } finally {
      // if (isMounted) {
      // Check if component is still mounted
      setIsContextLoading(false);
      // }
    }
  };

  // useEffect(() => {
  //   let isMounted = true; // Added this flag

  //   if (isMounted && isContextLoading) {
  //     // console.log('Loading...');
  //   } else if (isMounted && !isContextLoading) {
  //     // console.log('Finished Loading');
  //   }

  //   return () => {
  //     isMounted = false; // Cleanup
  //   };
  // }, [isContextLoading]);

  const contextValue = {
    isLoading: isContextLoading,
    setIsContextLoading,
    fetchDirectedResponses,
    directedResponses: directedResponses,
  };

  useEffect(() => {
    if (isContextLoading) {
      console.log('Loading...');
    } else {
      console.log('Finished Loading', contextValue);
    }
  }, [isContextLoading]);

  useEffect(() => {
    console.log('UTILITY CONTEXT VALUE:', contextValue);
  }, [contextValue]);

  return (
    <UtilityContext.Provider value={contextValue}>
      {children}
    </UtilityContext.Provider>
  );
};

const useUtilityContext = () => {
  const context = useContext(UtilityContext);
  if (context === undefined) {
    throw new Error('useUtility must be used within a UtilityProvider');
  }
  return context;
};

export { UtilityContext, UtilityProvider, useUtilityContext };
