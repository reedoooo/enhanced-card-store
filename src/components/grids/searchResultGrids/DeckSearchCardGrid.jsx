import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { useMode } from '../../../context/hooks/colormode';
import { styled } from '@mui/system';
import LoadingIndicator from '../../reusable/indicators/LoadingIndicator';

const StyledGrid = styled(Grid)(({ theme }) => ({
  // margin: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
  },
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(1.5),
  },
  [theme.breakpoints.up('lg')]: {
    margin: theme.spacing(2),
  },
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  // padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    // padding: theme.spacing(1),
  },
  [theme.breakpoints.up('md')]: {
    // padding: theme.spacing(2),
  },
  [theme.breakpoints.up('lg')]: {
    // padding: theme.spacing(2),
  },
}));

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const { theme } = useMode();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const uniqueCards = useMemo(
    () => new Map(cards.map((card) => [card.id, card])).values(),
    [cards]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <StyledGrid container spacing={isSmallScreen ? 1 : 2}>
      {Array.from(uniqueCards).map((card) => (
        <StyledGridItem item xs={12} sm={6} md={4} lg={4} key={card.id}>
          <GenericCard card={card} userDecks={userDecks} context={'Deck'} />
        </StyledGridItem>
      ))}
    </StyledGrid>
  );
};

export default DeckSearchCardGrid;
