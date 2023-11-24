import React, { useContext, useEffect, useState } from 'react';
import { Paper, Button, Typography, Box } from '@mui/material';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import DeckButtonList from './deckBuilderGrids/DeckButtonList';
import CardsGrid from './deckBuilderGrids/CardsGrid';
import DeckEditPanel from '../other/DeckEditPanel';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: 'auto', // Centering the form
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  noCardsText: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  // Other styles...
}));

const DeckDisplay = ({ userDecks = [] }) => {
  const classes = useStyles();
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
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Your Decks
        </Typography>
        <Button
          onClick={() => setShowAllDecks(!showAllDecks)}
          className={classes.button}
        >
          {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
        </Button>
        {showAllDecks && (
          <DeckButtonList
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
          <Typography className={classes.noCardsText}>
            No cards to display
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DeckDisplay;
