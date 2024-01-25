import React from 'react';
import SelectCollection from './SelectCollection';
import CollectionPortfolioContent from './CollectionPortfolioContent';
import useCollectionVisibility from '../../context/hooks/useCollectionVisibility';
import { PortfolioBoxA } from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useCollectionStore, useMode } from '../../context';

const CollectionPortfolio = () => {
  const { theme } = useMode();
  const { selectedCollection } = useCollectionStore();
  const { handleBackToCollections } = useCollectionVisibility();

  return (
    <PortfolioBoxA theme={theme}>
      {selectedCollection && Object.keys(selectedCollection).length > 0 ? (
        <CollectionPortfolioContent
          selectedCollection={selectedCollection}
          onBack={handleBackToCollections}
        />
      ) : (
        <SelectCollection />
      )}
    </PortfolioBoxA>
  );
};

export default CollectionPortfolio;
