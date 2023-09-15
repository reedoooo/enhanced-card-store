import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import CollectionContainer from '../containers/collectionPageContainers/CollectionContainer';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import CollectionBanner from './pageStyles/CollectionBanner';
import CollectionTitle from './pageStyles/CollectionTitle';

const CollectionPage = () => {
  const [userCollection, setUserCollection] = useState([]);
  const { userCookie } = useCookies(['userCookie'])[0];
  const {
    fetchAllCollectionsForUser,
    saveEditedCollection,
    allCollections,
    loading,
    error,
  } = useCollectionStore();
  const userId = userCookie?.id;

  useEffect(() => {
    fetchAllCollectionsForUser().catch((err) =>
      console.error('Failed to get all collections:', err)
    );
  }, [fetchAllCollectionsForUser]);

  useEffect(() => {
    if (allCollections && userId) {
      const filteredCollections = allCollections.filter(
        (collection) => collection.userId === userId
      );
      setUserCollection(filteredCollections);
      console.log('(COLLECTION PAGE) -- (USERCOLLECTION):', userCollection);
    }
  }, [allCollections, userId]);
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div>
      <CollectionBanner>
        <CollectionTitle>Your Collections</CollectionTitle>
        <CollectionContainer
          userCollection={userCollection}
          saveEditedCollection={saveEditedCollection}
        />
      </CollectionBanner>
    </div>
  );
};

export default CollectionPage;
