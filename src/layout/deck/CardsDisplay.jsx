import React from 'react';
import { Box, Typography } from '@mui/material';
import CardsGrid from '../../components/grids/deckBuilderGrids/CardsGrid';
import useDeckStyles from '../../context/hooks/style-hooks/useDeckStyles';

const CardsDisplay = ({ selectedDeck, isLoading }) => {
  const { cardsContainerStyles, noCardsTypographyStyles } = useDeckStyles();

  return (
    <Box sx={cardsContainerStyles}>
      {selectedDeck?.cards?.length > 0 ? (
        <CardsGrid isLoading={isLoading} />
      ) : (
        <Typography sx={noCardsTypographyStyles}>
          No cards to display
        </Typography>
      )}
    </Box>
  );
};

export default CardsDisplay;
