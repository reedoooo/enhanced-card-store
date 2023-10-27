import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP library
// import { fetchWrapper } from '../CollectionContext/exampleImport';

const BASE_API_URL = `${process.env.REACT_APP_SERVER}/api`;

const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {
  const [isContextLoading, setIsContextLoading] = useState(true);
  const [directedResponses, setDirectedResponses] = useState([]); // Initialize as an empty array
  const fetchWrapper = async (url, method, body = null) => {
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && { body: JSON.stringify(body) }),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        console.error('Network error: ', error);
        throw new Error(
          'Network error. Please check your connection and try again.'
        );
      }
      throw error;
    }
  };

  const fetchDirectedResponses = async () => {
    try {
      setIsContextLoading(true);
      const data = await fetchWrapper(
        `${BASE_API_URL}/directedResponses`,
        'GET'
      );

      if (Array.isArray(data)) {
        setDirectedResponses(data);
      } else {
        console.error('Fetched data is not an array:', data);
        setDirectedResponses([]);
      }

      console.log('Directed Responses:', data);
    } catch (error) {
      console.error('Error fetching directed responses:', error);
      alert(`Failed to fetch directed responses. ${error.message}`);
      setDirectedResponses([]);
    } finally {
      setIsContextLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data, validate token, etc.
        // ...
        // Once done, set loading to false
        setIsContextLoading(false);
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setIsContextLoading(false);
      }
    };

    fetchData();
  }, []);

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
