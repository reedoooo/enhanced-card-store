import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import CollectionBanner from './pageStyles/CollectionBanner';
import CollectionTitle from './pageStyles/CollectionTitle';
import CardPortfolio from '../components/collection/CardPortfolio';

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

  console.log('ALL COLLECTIONS:', allCollections);
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div>
      <CollectionBanner>
        <CollectionTitle>Your Collections</CollectionTitle>
        <CardPortfolio
          userCollection={userCollection}
          saveEditedCollection={saveEditedCollection}
        />
        {/* <CollectionContainer
          userCollection={userCollection}
          saveEditedCollection={saveEditedCollection}
        /> */}
      </CollectionBanner>
    </div>
  );
};

export default CollectionPage;
