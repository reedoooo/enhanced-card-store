import React, { useEffect, useRef, useState } from 'react';
import SelectCollection from './SelectCollection';
import PortfolioContent from './PortfolioContent';
import { Box, Typography, useTheme } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { CollectionContainer } from '../../pages/pageStyles/StyledComponents';
import { useMode } from '../../context';
// import UpdateChartData from './UpdateChartData';

const CardPortfolio = ({ allCollections, onCollectionSelect }) => {
  const { theme } = useMode();
  const theme2 = useTheme();
  const [error, setError] = useState(null);
  const [showCollections, setShowCollections] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [newCard, setNewCard] = useState('');
  const [newCardPrice, setNewCardPrice] = useState('');
  const [newCardCondition, setNewCardCondition] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  // Define a ref to keep track of whether handleSelectCollection has been run
  const hasRun = useRef(false);
  const {
    // allCollections,
    selectedCollection,
    setSelectedCollection,
    // fetchAllCollectionsForUser,
    addOneToCollection,
    removeOneFromCollection,
  } = useCollectionStore();

  // useEffect(() => {
  //   fetchAllCollectionsForUser();
  // }, []);

  useEffect(() => {
    setSelectedCards(selectedCollection?.cards?.slice(0, 30));
  }, [selectedCollection]);

  const handleSelectCollection = (collectionId) => {
    if (hasRun.current) return; // Check if the function has already been run

    if (!collectionId) return;
    const foundCollection = allCollections?.find(
      (collection) => collection._id === collectionId
    );
    if (!foundCollection) {
      console.error('Collection not found with ID:', collectionId);
      setError('Collection not found!');
      return;
    }
    setSelectedCollection(foundCollection);

    if (selectedCollection) {
      setSelectedCards(selectedCollection?.cards?.slice(0, 60));
    }

    if (selectedCards) {
      setShowCollections(false);
      setShowPortfolio(true);
    }

    hasRun.current = true; // Set the ref to true after the function has been run
  };

  return (
    <Box
      sx={{
        // ...theme,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100%',
        // marginLeft: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        // marginRight: theme.spacing(2),
        // minHeight: '250vh',
        flexGrow: 1,
        // minHeight: '100%',
        background: '#333',
        // backgroundColor: '#f1f1f1',
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
        <SelectCollection
          handleSelectCollection={handleSelectCollection}
          handleCollectionSelect={onCollectionSelect}
          setShowCollections={setShowCollections}
          setShowPortfolio={setShowPortfolio}
        />
      ) : showPortfolio ? (
        <PortfolioContent
          error={error}
          selectedCards={selectedCards}
          removeCard={removeOneFromCollection}
        />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#f1f1f1"
        >
          <Typography variant="h6">No Collection Selected</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CardPortfolio;
