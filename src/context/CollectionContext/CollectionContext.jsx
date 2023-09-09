import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useCookies } from 'react-cookie';

export const CollectionContext = createContext(null);

const apiBase = `${process.env.REACT_APP_SERVER}/api`;

const fetchWrapper = async (url, method, body = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

const removeDuplicateCollections = (collections) => {
  const uniqueCollections = {};
  collections.forEach(
    (collection) => (uniqueCollections[collection._id] = collection)
  );
  return Object.values(uniqueCollections);
};

export const CollectionProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['userCookie']);
  const [collectionData, setCollectionData] = useState({});
  const [allCollections, setAllCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const userId = cookies.userCookie?.id;

  const fetchCollectionsForUser = useCallback(async () => {
    try {
      const url = `${apiBase}/users/${userId}/collections`;
      return await fetchWrapper(url, 'GET');
    } catch (error) {
      console.error(`Failed to fetch collections for user: ${error.message}`);
      return null;
    }
  }, [userId]);

  const fetchAndSetCollections = useCallback(async () => {
    try {
      const userCollections = await fetchCollectionsForUser();

      if (userCollections && userCollections.length > 0) {
        const uniqueCollections = removeDuplicateCollections(userCollections);
        setAllCollections((prevCollections) =>
          removeDuplicateCollections([...prevCollections, ...uniqueCollections])
        );
        setCollectionData(uniqueCollections[0] || {});
      }
    } catch (error) {
      console.error(`Failed to fetch collections: ${error.message}`);
    }
  }, [fetchCollectionsForUser, userId]);

  const updateAndSyncCollection = async (newCollectionData) => {
    setCollectionData(newCollectionData);
    setSelectedCollection(newCollectionData);
    setAllCollections((prevCollections) => {
      const newAllCollections = prevCollections.map((collection) =>
        collection._id === newCollectionData._id
          ? newCollectionData
          : collection
      );
      return prevCollections.some(
        (collection) => collection._id === newCollectionData._id
      )
        ? newAllCollections
        : [...newAllCollections, newCollectionData];
    });

    try {
      const url = `${apiBase}/users/${userId}/collections`;
      const bodyData = {
        ...newCollectionData,
        collectionId: newCollectionData._id,
      };
      await fetchWrapper(url, 'PUT', bodyData);
    } catch (error) {
      console.error(`Failed to update collection in backend: ${error.message}`);
    }
  };

  const contextValue = {
    collectionData,
    allCollections,
    selectedCollection,
    setSelectedCollection,
    updateAndSyncCollection,
    fetchAllCollectionsForUser: fetchAndSetCollections,
  };

  useEffect(() => {
    if (userId) {
      fetchAndSetCollections();
    }
  }, [fetchAndSetCollections, userId]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
