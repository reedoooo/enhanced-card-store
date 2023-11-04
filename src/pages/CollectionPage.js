import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import CollectionBanner from './pageStyles/CollectionBanner';
import CollectionTitle from './pageStyles/CollectionTitle';
import CardPortfolio from '../components/collection/CardPortfolio';
import { useCollectionStore } from '../context/hooks/collection';
import HeaderTitle from '../components/reusable/HeaderTitle';
import Subheader from '../components/reusable/Subheader';

const CollectionPage = () => {
  // const [defaultCollection, setDefaultCollection] = useState([]);
  const { userCookie } = useCookies(['userCookie'])[0];
  const {
    allCollections = [],
    setAllCollections,
    selectedCollection,
    setSelectedCollection,
    loading,
    calculateTotalPrice,
    error,
  } = useCollectionStore();
  const userId = userCookie?.id;

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div>
      <CollectionBanner>
        <HeaderTitle
          title="Collection Portfolio"
          size="large"
          location="center"
        />
        <Subheader text={`${selectedCollection?.name}`} />
        <CardPortfolio allCollections={allCollections} />
      </CollectionBanner>
    </div>
  );
};

export default CollectionPage;
