import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { useMode } from '../../../context/hooks/colormode';
import { styled } from '@mui/system';
import SkeletonDeckItem from '../SkeletonDeckItem';
import DeckItem from '../DeckItem';

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
  },
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(0.5),
  },
  [theme.breakpoints.up('lg')]: {
    margin: theme.spacing(2),
  },
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  display: 'flex', // Enable flex container
  flexDirection: 'column', // Stack children vertically
  alignItems: 'stretch', // Stretch children to fill the width
  // height: '7%', // Make sure each item takes full available height

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0.25),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(1),
  },
}));

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const { theme } = useMode();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [isLoading, setIsLoading] = useState(true);

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
      <StyledGrid container spacing={isSmallScreen ? 1 : 2}>
        {Array.from({ length: 9 }).map((_, index) => (
          <StyledGridItem item xs={12} sm={6} md={4} lg={4} key={index}>
            <SkeletonDeckItem />
          </StyledGridItem>
        ))}
      </StyledGrid>
    );
  }

  return (
    <StyledGrid container spacing={isSmallScreen ? 1 : 2}>
      {uniqueCards.map((card) => (
        <StyledGridItem item xs={12} sm={6} md={4} lg={4} key={card.id}>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {/* <DeckItem
              card={card}
              userDecks={userDecks}
              context={'Deck'}
              page={'DeckBuilder'}
            /> */}
            <GenericCard
              card={card}
              context={'Deck'}
              page={'Deck'}
              userDecks={userDecks}
            />
          </Box>
        </StyledGridItem>
      ))}
    </StyledGrid>
  );
};

export default DeckSearchCardGrid;
