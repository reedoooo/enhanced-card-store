import React from 'react';
import CardPortfolio from '../../components/collection/CardPortfolio';

const CollectionContainer = ({ userCollection }) => {
  console.log('(2) -- COLLECTION CONTAINER (USERCOLLECTION):', userCollection);

  return (
    <div>
      <CardPortfolio userCollection={userCollection} />
    </div>
  );
};

export default CollectionContainer;
