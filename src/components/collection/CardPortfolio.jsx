import React, { useEffect, useRef, useState } from 'react';
import SelectCollection from './SelectCollection';
import PortfolioContent from './PortfolioContent';
import { Box, Typography, useTheme } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context';
const CardPortfolio = ({ allCollections, onCollectionSelect }) => {
  const { theme } = useMode();
  const [showCollections, setShowCollections] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const { selectedCollection } = useCollectionStore();

  useEffect(() => {
    setSelectedCards(selectedCollection?.cards?.slice(0, 30));
  }, [selectedCollection]);

  const handleSelectCollection = (collectionId) => {
    const foundCollection = allCollections.find(
      (collection) => collection._id === collectionId
    );
    if (foundCollection) {
      setShowCollections(false);
      setShowPortfolio(true);
      onCollectionSelect(true);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius,
        flexGrow: 1,
        background: '#333',
        padding: {
          xs: theme.spacing(1),
          sm: theme.spacing(1),
          md: theme.spacing(2.5),
          lg: theme.spacing(2.5),
        },
        height: '100%',
        width: '100%',
      }}
    >
      {showCollections ? (
        <SelectCollection handleSelectCollection={handleSelectCollection} />
      ) : showPortfolio ? (
        <PortfolioContent selectedCollection={selectedCollection} />
      ) : (
        <Typography variant="h6">No Collection Selected</Typography>
      )}
    </Box>
  );
};

export default CardPortfolio;
