import React, { useEffect, useState } from 'react';
import { Paper, Typography, Alert, Grid, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import AddCardForm from './AddCardForm';
import CardList from './CardList';

const CardPortfolio = () => {
  const {
    collectionData,
    addCardToCollection,
    removeCardFromCollection,
    fetchAllCardsForUser,
  } = useCollectionStore();

  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [newCard, setNewCard] = useState('');
  const [newCardPrice, setNewCardPrice] = useState('');
  const [newCardCondition, setNewCardCondition] = useState('');

  useEffect(() => {
    fetchAllCardsForUser();
  }, []);

  useEffect(() => {
    updateChartData();
  }, [collectionData]);

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

    addCardToCollection({
      name: newCard,
      price: parseFloat(newCardPrice),
      condition: newCardCondition,
    });

    setNewCard('');
    setNewCardPrice('');
    setNewCardCondition('');
    setError(null);
  };

  const removeCard = (cardId) => {
    removeCardFromCollection(cardId);
  };

  const updateChartData = () => {
    const labels = [];
    let portfolioValue = 0;
    const portfolioValues = [];

    collectionData.forEach((card) => {
      portfolioValue += card.price;
      portfolioValues.push(portfolioValue);
      labels.push(card.name);
    });

    const data = {
      labels: labels,
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
    setChartData(data);
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box flexGrow={0}>
        <Typography variant="h5">This is the Portfolio tab.</Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <AddCardForm
          newCard={newCard}
          setNewCard={setNewCard}
          newCardPrice={newCardPrice}
          setNewCardPrice={setNewCardPrice}
          newCardCondition={newCardCondition}
          setNewCardCondition={setNewCardCondition}
          addCard={addCard}
        />
      </Box>

      <Grid container direction="column" spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sx={{ height: '70%' }}>
          <Paper elevation={3} sx={{ height: '100%', padding: 2 }}>
            {chartData && (
              <Line
                data={chartData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ height: '30%' }}>
          <Paper
            elevation={3}
            sx={{ width: '100%', height: '100%', padding: 2 }}
          >
            <CardList cards={collectionData} removeCard={removeCard} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardPortfolio;
