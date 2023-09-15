import React from 'react';
import CardPortfolio from '../../components/collection/CardPortfolio';

const CollectionContainer = ({ userCollection, saveEditedCollection }) => {
  console.log('(2) -- COLLECTION CONTAINER (USERCOLLECTION):', userCollection);

  return (
    <div>
      <CardPortfolio
        userCollection={userCollection}
        saveEditedCollection={saveEditedCollection}
      />
    </div>
  );
};

export default CollectionContainer;
