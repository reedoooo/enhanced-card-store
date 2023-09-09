import React from 'react';
import CardPortfolio from '../components/collection/CardPortfolio';

const CollectionContainer = ({ userCards }) => {
  return (
    <div>
      <CardPortfolio cards={userCards} />
    </div>
  );
};

export default CollectionContainer;
