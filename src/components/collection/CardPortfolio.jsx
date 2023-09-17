import React, { useEffect, useState } from 'react';
import SelectCollection from './SelectCollection';
import PortfolioContent from '../content/PortfolioContent';
import { Box, Typography } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import CollectionContainer from '../../containers/collectionPageContainers/CollectionContainer';
import UpdateChartData from './UpdateChartData';

const CardPortfolio = ({ userCollection = [], saveEditedCollection }) => {
  const [error, setError] = useState(null);
  const [showCollections, setShowCollections] = useState(true);
  const [newCard, setNewCard] = useState('');
  const [newCardPrice, setNewCardPrice] = useState('');
  const [newCardCondition, setNewCardCondition] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);

  const {
    allCollections,
    selectedCollection,
    setSelectedCollection,
    fetchAllCollectionsForUser,
    addOneToCollection,
    removeOneFromCollection,
  } = useCollectionStore();

  useEffect(() => {
    fetchAllCollectionsForUser();
  }, []);

  useEffect(() => {
    setSelectedCards(selectedCollection?.cards?.slice(0, 30) || []);
  }, [selectedCollection]);

  const handleSaveCollection = (collectionId) => {
    const foundCollection = allCollections.find(
      (collection) => collection?._id === collectionId
    );

    if (foundCollection) {
      saveEditedCollection(foundCollection);
      setShowCollections(true);
    }
  };

  const handleSelectCollection = (collectionId) => {
    if (!collectionId) return;

    // Find the selected collection based on the collectionId
    const foundCollection = allCollections.find(
      (collection) => collection._id === collectionId
    );

    if (foundCollection) {
      setSelectedCollection(foundCollection);
      setShowCollections(false);
    }
  };

  // const addCard = () => {
  //   if (
  //     !newCard ||
  //     isNaN(newCardPrice) ||
  //     parseFloat(newCardPrice) <= 0 ||
  //     !newCardCondition
  //   ) {
  //     setError('Invalid card name, price, or condition.');
  //     return;
  //   }

  //   addOneToCollection({
  //     name: newCard,
  //     price: parseFloat(newCardPrice),
  //     condition: newCardCondition,
  //   });

  //   setNewCard('');
  //   setNewCardPrice('');
  //   setNewCardCondition('');
  //   setError(null);
  // };

  // const removeCard = (card) => {
  //   removeOneFromCollection(card);
  // };

  console.log('ALL COLLECTIONS:', allCollections);
  console.log('SELECTED COLLECTION:', selectedCollection);
  console.log('SELECTED CARDS:', selectedCards);

  return (
    <CollectionContainer>
      {showCollections ? (
        <SelectCollection
          userCollection={userCollection}
          allCollections={allCollections}
          handleSelectCollection={handleSelectCollection}
          handleSaveCollection={handleSaveCollection}
          error={error}
          newCard={newCard}
          setNewCard={setNewCard}
          newCardPrice={newCardPrice}
          setNewCardPrice={setNewCardPrice}
          newCardCondition={newCardCondition}
          setSelectedCards={setSelectedCards}
          selectedCards={selectedCards}
          setNewCardCondition={setNewCardCondition}
          addCard={addOneToCollection}
        />
      ) : selectedCollection ? (
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
          removeCard={removeOneFromCollection}
          chartData={UpdateChartData(selectedCollection)}
        />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          backgroundColor="#f1f1f1"
        >
          <Typography variant="h6">No Collection Selected</Typography>
        </Box>
      )}
    </CollectionContainer>
  );
};

export default CardPortfolio;
