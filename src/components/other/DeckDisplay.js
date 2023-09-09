// src/components/DeckDisplay.js
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useCardStore } from '../../context/CardContext/CardStore';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import DeckButtonList from './DeckButtonList';
import CardsGrid from './CardsGrid';
const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%', // Set the height to 100%
    position: 'relative', // Required for the aspect-ratio trick
    animation: 'fadeIn 0.5s ease-in-out', // Add animation
  },
  deckCard: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    aspectRatio: '2 / 3', // Adjusted the aspect ratio
  },
  '@global': {
    '.card-enter': {
      opacity: 0,
    },
    '.card-enter-active': {
      opacity: 1,
      transition: 'opacity 500ms',
    },
    '.card-exit': {
      opacity: 1,
    },
    '.card-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms',
    },
  },
}));

const DeckDisplay = ({ userDecks = [] }) => {
  const classes = useStyles();
  const { setSelectedDeck, selectedDeck } = useContext(DeckContext);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    if (selectedDeck?.cards) {
      setSelectedCards(selectedDeck.cards.slice(0, 30));
    } else {
      setSelectedCards([]);
    }
  }, [selectedDeck]);

  const handleSelectDeck = (deckId) => {
    const foundDeck = userDecks.find((deck) => deck?._id === deckId);
    if (foundDeck) {
      setSelectedDeck(foundDeck);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DeckButtonList
          userDecks={userDecks}
          handleSelectDeck={handleSelectDeck}
        />
        {selectedCards?.length > 0 ? (
          <CardsGrid selectedCards={selectedCards} classes={classes} />
        ) : (
          <div>No cards to display</div>
        )}
      </Paper>
    </div>
  );
};

export default DeckDisplay;
