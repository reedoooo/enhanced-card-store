import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import DeckCard from '../cards/DeckCard';

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={1}>
      {cards.map((card, i) => (
        <Grid key={i} item xs={isSmallScreen ? 6 : 4} marginTop={1}>
          <DeckCard card={card} userDecks={userDecks} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DeckSearchCardGrid;
