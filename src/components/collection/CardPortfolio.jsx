import React, { useEffect, useState } from 'react';
import SelectCollection from './SelectCollection';
import PortfolioContent from './PortfolioContent';
import { Box, Typography } from '@mui/material';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const updateChartData = (selectedCollection) => {
  const labels = [];
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
        data: portfolioValues,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
};

// Your main CardPortfolio component
const CardPortfolio = ({ userCollection = [] }) => {
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

  if (showCollections) {
    return (
      <SelectCollection
        userCollection={userCollection}
        handleSelectCollection={handleSelectCollection}
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
