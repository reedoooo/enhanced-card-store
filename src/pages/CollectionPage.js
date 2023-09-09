import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import CollectionContainer from '../containers/CollectionContainer';

const CollectionPage = () => {
  const [cookies] = useCookies(['userCookie']);
  const { fetchAllCardsForUser, collectionData, loading, error } =
    useCollectionStore();

  const [userCards, setUserCards] = useState([]);
  const userId = cookies.userCookie?.id;

  useEffect(() => {
    console.log('COLLECTION PAGE (COLLECTIONDATA):', collectionData);
    fetchAllCardsForUser().catch((err) =>
      console.error('Failed to get all cards:', err)
    );
  }, [fetchAllCardsForUser]);

  useEffect(() => {
    if (collectionData) {
      const filteredCards = collectionData.filter(
        (card) => card.userId === userId
      );
      setUserCards(filteredCards);
    }
  }, [collectionData, userId]);

  if (loading) return <LoadingIndicator loading={loading} />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div>
      <CollectionContainer userCards={userCards} />
    </div>
  );
};

export default CollectionPage;
