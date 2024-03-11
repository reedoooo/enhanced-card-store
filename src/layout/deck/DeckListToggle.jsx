import React from 'react';
import { Button, Box } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SelectDeckList from '../../components/grids/deckBuilderGrids/SelectDeckList';

import { useMode } from '../../context';
import {
  DeckCardsContainer,
  DeckStyledButton,
} from '../../pages/pageStyles/StyledComponents';

const DeckListToggle = ({
  showAllDecks,
  setShowAllDecks,
  handleSelectDeck,
  allDecks,
}) => {
  const { theme } = useMode();
  return (
    <>
      <DeckStyledButton
        theme={theme}
        onClick={() => setShowAllDecks(!showAllDecks)}
        variant="contained"
        sx={{
          width: '100%',
          borderRadius: 0,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          backgroundColor: theme.palette.backgroundA.dark,
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.backgroundA.light,
          },
        }}
      >
        <AppsIcon sx={{ mr: 1 }} />
        {showAllDecks ? 'Hide Decks' : 'Show All Decks'}
      </DeckStyledButton>
      {showAllDecks && (
        <DeckCardsContainer theme={theme}>
          <SelectDeckList
            handleSelectDeck={handleSelectDeck}
            allDecks={allDecks}
          />
        </DeckCardsContainer>
      )}
    </>
  );
};

export default DeckListToggle;
