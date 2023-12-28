import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { useMode } from '../../../context/hooks/colormode';
import { styled } from '@mui/system';
import SkeletonDeckItem from '../gridItems/SkeletonDeckItem';
import DeckItem from '../gridItems/DeckItem';
import useResponsiveStyles from '../../../context/hooks/useResponsiveStyles';

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const { theme } = useMode();
  const [isLoading, setIsLoading] = useState(true);
  const { getStyledGridStyle, getStyledGridItemStyle } =
    useResponsiveStyles(theme);
  const StyledGrid = getStyledGridStyle(theme);
  const StyledGridItem = getStyledGridItemStyle(theme);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const uniqueCards = useMemo(
    () => Array.from(new Map(cards.map((card) => [card.id, card])).values()),
    [cards]
  );

  if (isLoading) {
    return (
      <Grid container style={StyledGrid} spacing={2}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Grid
            item
            style={StyledGridItem}
            xs={6}
            sm={6}
            md={4}
            lg={4}
            key={index}
          >
            <SkeletonDeckItem />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container style={StyledGrid} spacing={2}>
      {uniqueCards.map((card) => (
        <Grid
          item
          style={StyledGridItem}
          xs={6}
          sm={6}
          md={4}
          lg={4}
          key={card.id}
        >
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <DeckItem
              card={card}
              userDecks={userDecks}
              context={'Deck'}
              page={'DeckBuilder'}
            />
            {/* <GenericCard
              card={card}
              context={'Deck'}
              page={'Deck'}
              userDecks={userDecks}
            /> */}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DeckSearchCardGrid;
