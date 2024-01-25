import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { styled } from '@mui/system';
import SkeletonDeckItem from '../gridItems/SkeletonDeckItem';
import DeckItem from '../gridItems/DeckItem';
import GridLayout from './GridLayout';
import ReusableSkeletonItem from '../gridItems/ReusableSkeletonItem';

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const uniqueCards = useMemo(
    () => Array.from(new Map(cards.map((card) => [card.id, card])).values()),
    [cards]
  );

  return (
    <GridLayout
      containerStyles={{ marginTop: '1rem' }}
      isLoading={isLoading}
      skeletonCount={9}
      gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
    >
      {/* Define the grid item size for 3 columns layout */}
      {isLoading ? (
        <ReusableSkeletonItem
          count={9}
          gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
        />
      ) : (
        uniqueCards?.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={card.id}>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <DeckItem
                card={card}
                userDecks={userDecks}
                context={'Deck'}
                page={'DeckBuilder'}
              />
            </Box>
          </Grid>
        ))
      )}
    </GridLayout>
  );
};

export default DeckSearchCardGrid;
