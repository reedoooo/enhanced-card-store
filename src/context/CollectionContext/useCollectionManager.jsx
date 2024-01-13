import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Make sure to install axios for HTTP requests

// Custom hook for managing the collection
function useCollectionManager(userId) {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch collection by user ID
  const fetchCollection = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/collections/${userId}`);
      setCollection(response.data); // Assume the data is the collection object
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [userId]);

  // Call fetchCollection when the component using this hook mounts
  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  // Define other CRUD operations similarly, e.g., addCard, removeCard, updateCollection, etc.

  return {
    collection,
    loading,
    error,
    fetchCollection,
    // add other methods here as you define them
  };
}

export default useCollectionManager;
