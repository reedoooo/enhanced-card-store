import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import CollectionContainer from '../containers/collectionPageContainers/CollectionContainer';

const CollectionPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const { fetchAllCollectionsForUser, allCollections, loading, error } =
    useCollectionStore();
  const [userCollection, setUserCollection] = useState([]);
  const userId = cookies.userCookie?.id;

  useEffect(() => {
    // Fetch all collections for the user
    fetchAllCollectionsForUser().catch((err) =>
      console.error('Failed to get all cards:', err)
    );
  }, [fetchAllCollectionsForUser]);

  useEffect(() => {
    // Filter collections based on userId
    if (allCollections) {
      const filteredCollections = allCollections.filter(
        (collection) => collection.userId === userId
      );
      setUserCollection(filteredCollections);
    }
  }, [allCollections, userId]);

  if (loading) return <LoadingIndicator loading={loading} />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div>
      <CollectionContainer userCollection={userCollection} />
    </div>
  );
};

export default CollectionPage;
