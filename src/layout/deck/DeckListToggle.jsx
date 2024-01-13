import React from 'react';
import { Button, Box } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SelectDeckList from '../../components/grids/deckBuilderGrids/SelectDeckList';
import useDeckStyles from '../../context/hooks/useDeckStyles';

const DeckListToggle = ({
  showAllDecks,
  setShowAllDecks,
  handleSelectDeck,
  allDecks,
}) => {
  const { buttonStyles, cardsContainerStyles } = useDeckStyles();

  return (
    <>
      <Button
        onClick={() => setShowAllDecks(!showAllDecks)}
        variant="contained"
        color="primary"
        sx={buttonStyles}
      >
        <AppsIcon sx={{ mr: 1 }} />
        {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
      </Button>
      {showAllDecks && (
        <Box sx={cardsContainerStyles}>
          <SelectDeckList
            handleSelectDeck={handleSelectDeck}
            allDecks={allDecks}
          />
        </Box>
      )}
    </>
  );
};

export default DeckListToggle;
