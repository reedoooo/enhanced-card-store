import React, { useEffect, useRef, useState } from 'react';
import SelectCollection from './SelectCollection';
import PortfolioContent from './PortfolioContent';
import { Box, Typography, useTheme } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useMode } from '../../context';
import { makeStyles } from '@mui/styles';
import { usePortfolioStyles } from '../../context/hooks/usePortfolioStyles';
// const useCardPortfolioStyles = makeStyles((theme) => ({
//   boxStyle: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: theme.shape.borderRadius,
//     flexGrow: 1,
//     background: '#333',
//     padding: {
//       xs: theme.spacing(1),
//       sm: theme.spacing(1),
//       md: theme.spacing(2.5),
//       lg: theme.spacing(2.5),
//     },
//     height: '100%',
//     width: '100%',
//   },
// }));
const CardPortfolio = ({ allCollections, onCollectionSelect }) => {
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
        <PortfolioContent
          selectedCollection={selectedCollection}
          selectedCards={selectedCards}
        />
      )}
    </Box>
  );
};

export default CardPortfolio;
