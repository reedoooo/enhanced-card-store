import React, { useEffect, useRef, useState } from 'react';
import SelectCollection from './SelectCollection';
import { Box } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context';
import { usePortfolioStyles } from '../../context/hooks/usePortfolioStyles';
import CollectionPortfolioContent from './CollectionPortfolioContent';

const CollectionPortfolio = ({ allCollections, onCollectionSelect }) => {
  const { theme } = useMode();
  const classes = usePortfolioStyles(theme);
  const [showCollections, setShowCollections] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  const { selectedCollection } = useCollectionStore();
  useEffect(() => {
    setSelectedCards(selectedCollection?.cards?.slice(0, 30));
  }, [selectedCollection]);
  useEffect(() => {
    if (selectedCollection && !showCollections) {
      onCollectionSelect(true);
    }
  }, [selectedCollection, showCollections, onCollectionSelect]);

  const handleSelectCollection = (collectionId) => {
    const foundCollection = allCollections?.find(
      (collection) => collection?._id === collectionId
    );
    if (foundCollection) {
      setShowCollections(false);
    }
  };

  return (
    <Box className={classes.portfolioBox}>
      {showCollections ? (
        <SelectCollection
          handleSelectCollection={handleSelectCollection}
          selectedCards={selectedCards}
        />
      ) : (
        <CollectionPortfolioContent
          selectedCollection={selectedCollection}
          selectedCards={selectedCards}
          onBack={() => setShowCollections(true)}
        />
      )}
    </Box>
  );
};

export default CollectionPortfolio;
