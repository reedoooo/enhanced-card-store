import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import CollectionBanner from './pageStyles/CollectionBanner';
import CollectionTitle from './pageStyles/CollectionTitle';
import CardPortfolio from '../components/collection/CardPortfolio';
import { useCollectionStore } from '../context/hooks/collection';

const CollectionPage = () => {
  // const [defaultCollection, setDefaultCollection] = useState([]);
  const { userCookie } = useCookies(['userCookie'])[0];
  const {
    fetchAllCollectionsForUser,
    allCollections = [],
    setAllCollections,
    selectedCollection,
    setSelectedCollection,
    loading,
    calculateTotalPrice,
    error,
  } = useCollectionStore();
  const userId = userCookie?.id;

  useEffect(() => {
    fetchAllCollectionsForUser()
      .then(() => {
        console.log('Fetched collections successfully');
      })
      .catch((err) => {
        console.error('Failed to get all collections:', err);
      });
  }, [fetchAllCollectionsForUser]);

  // useEffect(() => {
  //   if (allCollections && userId) {
  //     const filteredCollections = allCollections.filter(
  //       (collection) => collection?.userId === userId
  //     );
  //     setSelectedCollection(filteredCollections && filteredCollections[0]);
  //     console.log(
  //       '(COLLECTION PAGE) -- (userCollections):',
  //       selectedCollection
  //     );
  //   }
  // }, [allCollections, userId]);

  // useEffect(() => {
  //   console.log('Running effect with:', { allCollections, userId });

  //   if (allCollections && userId) {
  //     const filteredCollections = allCollections.filter(
  //       (collection) => collection?.userId === userId
  //     );
  //     console.log('Setting user collection with:', filteredCollections);
  //     setAllCollections(filteredCollections);
  //     setDefaultCollection(filteredCollections[0]);
  //   }
  // }, [allCollections, userId]);

  // console.log('ALL COLLECTIONS:', allCollections);
  // console.log('TOTAL PRICE:', calculateTotalPrice());
  // console.log('DEFAULT COLLECTION:', defaultCollection);
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  // console.log('ALL COLLECTION (COLLECTION PAGE):', allCollections);
  // console.log('SELECTED COLLECTION (COLLECTION PAGE):', selectedCollection);
  return (
    <div>
      <CollectionBanner>
        <CollectionTitle>Your Collections</CollectionTitle>
        <CardPortfolio
          // userCollection={userCollection}
          allCollections={allCollections}
          // setUserCollection={setUserCollection}
        />
      </CollectionBanner>
    </div>
  );
};

export default CollectionPage;
