import React, { useEffect, useState } from 'react';
import SelectCollection from './SelectCollection';
import PortfolioContent from '../content/PortfolioContent';
import { Box, Typography } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const updateChartData = (selectedCollection) => {
  const labels = [
    '2023-09-01',
    '2023-09-02',
    '2023-09-03',
    '2023-09-04',
    '2023-09-05',
  ];
  let portfolioValue = 0;
  const portfolioValues = [];

  selectedCollection?.cards?.forEach((card) => {
    portfolioValue += card.price;
    portfolioValues.push(portfolioValue);
    labels.push(card.name);
  });

  return {
    labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: [1000, 1100, 1050, 1200, 1300],
        fill: false,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 0, 0, 0.5)',
        pointBackgroundColor: 'rgba(255, 0, 0, 0.5)',
        pointBorderColor: 'rgba(255, 0, 0, 0.5)',
        pointHoverBackgroundColor: 'rgba(255, 0, 0, 0.5)',
        pointHoverBorderColor: 'rgba(255, 0, 0, 0.5)',
      },
    ],
  };
};

// Your main CardPortfolio component
const CardPortfolio = ({ userCollection = [], saveEditedCollection }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showCollections, setShowCollections] = useState(true);
  const [newCard, setNewCard] = useState('');
  const [newCardPrice, setNewCardPrice] = useState('');
  const [newCardCondition, setNewCardCondition] = useState('');
  console.log('(3) -- CARDPORTFOLIO (USERCOLLECTION):', userCollection);

  const {
    allCollections,
    selectedCollection,
    // savedEditedCollection,
    setSelectedCollection,
    fetchAllCollectionsForUser,
    addOneToCollection,
    removeOneFromCollection,
  } = useCollectionStore();
  // console.log('(3) -- CARDPORTFOLIO (USERCOLLECTION):', userCollection);

  useEffect(() => {
    fetchAllCollectionsForUser();
  }, []);

  useEffect(() => {
    setSelectedCards(selectedCollection?.cards?.slice(0, 30) || []);
  }, [selectedCollection]);

  useEffect(() => {
    setChartData(updateChartData(selectedCollection));
  }, [selectedCollection]);

  const handleSaveCollection = (collectionId) => {
    console.log(`Collection with id, ${collectionId}, is saved`);
    const foundCollection = allCollections.find(
      (collection) => collection?._id === collectionId
    );
    console.log(`Collection Found: ${foundCollection}`);

    if (foundCollection) {
      // Call saveEditedCollection here, passed down from parent.
      saveEditedCollection(foundCollection); // This is the new part
      setShowCollections(true);
    }
  };

  const handleSelectCollection = (collectionId) => {
    console.log(`Collection with id, ${collectionId}, is selected`);
    const foundCollection = userCollection.find(
      (collection) => collection?._id === collectionId
    );
    console.log(`Collection Found: ${foundCollection}`);

    if (foundCollection) {
      setSelectedCollection(foundCollection);
      setShowCollections(false);
    }
  };
  console.log(
    '(3) -- CARDPORTFOLIO (SELECTED COLLECTION):',
    selectedCollection
  );

  const addCard = () => {
    if (
      !newCard ||
      isNaN(newCardPrice) ||
      parseFloat(newCardPrice) <= 0 ||
      !newCardCondition
    ) {
      setError('Invalid card name, price, or condition.');
      return;
    }

    addOneToCollection({
      name: newCard,
      price: parseFloat(newCardPrice),
      condition: newCardCondition,
    });

    setNewCard('');
    setNewCardPrice('');
    setNewCardCondition('');
    setError(null);
  };

  const removeCard = (card) => {
    removeOneFromCollection(card);
  };
  console.log('(3) -- CARDPORTFOLIO (USERCOLLECITON):', userCollection);
  if (showCollections) {
    return (
      <SelectCollection
        userCollection={userCollection}
        handleSelectCollection={handleSelectCollection}
        handleSaveCollection={handleSaveCollection}
        selectedCards={selectedCards}
        error={error}
        newCard={newCard}
        setNewCard={setNewCard}
        newCardPrice={newCardPrice}
        setNewCardPrice={setNewCardPrice}
        newCardCondition={newCardCondition}
        setNewCardCondition={setNewCardCondition}
        addCard={addCard}
        chartData={chartData}
        removeCard={removeCard}
      />
    );
  }

  if (selectedCollection) {
    return (
      <PortfolioContent
        error={error}
        newCard={newCard}
        setNewCard={setNewCard}
        newCardPrice={newCardPrice}
        setNewCardPrice={setNewCardPrice}
        newCardCondition={newCardCondition}
        setNewCardCondition={setNewCardCondition}
        addCard={addCard}
        chartData={chartData}
        selectedCards={selectedCards}
        removeCard={removeCard}
      />
    );
  } else {
    return (
      <Box>
        <Typography variant="h6">No Collection Selected</Typography>
      </Box>
    );
  }
};

export default CardPortfolio;
