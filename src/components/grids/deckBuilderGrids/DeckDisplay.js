import React, { useContext, useEffect, useState } from 'react';
import { Paper, Button, Typography, Box } from '@mui/material';
import { DeckContext } from '../../../context/DeckContext/DeckContext';
import SelectDeckList from './SelectDeckList';
import CardsGrid from './CardsGrid';
import DeckEditPanel from '../../other/InputComponents/DeckEditPanel';
import { useMode } from '../../../context/hooks/colormode';

const DeckDisplay = ({ userDecks = [] }) => {
  const { theme } = useMode();
  const { setSelectedDeck, selectedDeck, updateAndSyncDeck } =
    useContext(DeckContext);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showAllDecks, setShowAllDecks] = useState(false);

  useEffect(() => {
    setSelectedCards(selectedDeck?.cards?.slice(0, 30) || []);
  }, [selectedDeck]);

  const handleSelectDeck = (deckId) => {
    const foundDeck = userDecks.find((deck) => deck?._id === deckId);
    if (foundDeck) {
      setSelectedDeck(foundDeck);
    }
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        margin: 'auto', // Centering the form
      }}
    >
      <Paper
        sx={{
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[4],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            marginBottom: theme.spacing(2),
          }}
        >
          Your Decks
        </Typography>
        <Button
          onClick={() => setShowAllDecks(!showAllDecks)}
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
        </Button>
        {showAllDecks && (
          <SelectDeckList
            userDecks={userDecks}
            handleSelectDeck={handleSelectDeck}
          />
        )}
        {selectedDeck && (
          <DeckEditPanel
            selectedDeck={selectedDeck}
            onSave={updateAndSyncDeck}
          />
        )}
        {selectedCards.length > 0 ? (
          <CardsGrid selectedCards={selectedCards} />
        ) : (
          <Typography
            sx={{
              marginTop: theme.spacing(2),
              textAlign: 'center',
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
            }}
          >
            No cards to display
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DeckDisplay;
