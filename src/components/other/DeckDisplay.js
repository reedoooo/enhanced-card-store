import React, { useContext, useEffect, useState } from 'react';
import { Paper, Button } from '@mui/material';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import DeckButtonList from '../grids/deckBuilderGrids/DeckButtonList';
import CardsGrid from '../grids/deckBuilderGrids/CardsGrid';
import DeckEditPanel from './DeckEditPanel';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: '#f4f6f8' },
  paper: {
    padding: theme.spacing(3),
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  deckEditPanel: {
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.5s ease-in-out',
  },
  noCardsText: {
    color: '#666',
    fontStyle: 'italic',
  },
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Button onClick={() => setShowAllDecks(!showAllDecks)}>
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
            className={classes.deckEditPanel}
          />
        )}
        {selectedCards.length > 0 ? (
          <CardsGrid selectedCards={selectedCards} />
        ) : (
          <div className={classes.noCardsText}>No cards to display</div>
        )}
      </Paper>
    </div>
  );
};

export default DeckDisplay;
