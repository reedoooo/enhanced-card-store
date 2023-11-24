import React, { useEffect, useRef, useState } from 'react';
import SelectCollection from './SelectCollection';
import PortfolioContent from '../../containers/collectionPageContainers/PortfolioContent';
import { Box, Typography } from '@mui/material';
import CollectionContainer from '../../containers/collectionPageContainers/CollectionContainer';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
// import UpdateChartData from './UpdateChartData';

const CardPortfolio = ({ allCollections }) => {
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
    <CollectionContainer>
      {showCollections ? (
        <SelectCollection
          handleSelectCollection={handleSelectCollection}
          setShowCollections={setShowCollections}
          setShowPortfolio={setShowPortfolio}
        />
      ) : showPortfolio ? (
        <PortfolioContent
          error={error}
          allCollections={allCollections}
          newCard={newCard}
          setNewCard={setNewCard}
          newCardPrice={newCardPrice}
          setNewCardPrice={setNewCardPrice}
          newCardCondition={newCardCondition}
          setNewCardCondition={setNewCardCondition}
          addCard={addOneToCollection}
          setSelectedCards={setSelectedCards}
          selectedCards={selectedCards}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          removeCard={removeOneFromCollection}
        />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          // minHeight="100vh"
          backgroundColor="#f1f1f1"
        >
          <Typography variant="h6">No Collection Selected</Typography>
        </Box>
      )}
    </CollectionContainer>
  );
};

export default CardPortfolio;
