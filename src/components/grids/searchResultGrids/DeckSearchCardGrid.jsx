import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
// import LoadingIndicator from '../../reusable/indicators/LoadingIndicator';
import GenericCard from '../../cards/GenericCard';
import { useMode } from '../../../context/hooks/colormode';
import { styled } from '@mui/system';
// import LoadingCardAnimation from '../../../assets/animations/LoadingCardAnimation';
import LoadingIndicator2 from '../../reusable/indicators/LoadingIndicator2';
const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
  },
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
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

  // if (isLoading) {
  //   return <LoadingIndicator />;
  // }

  if (isLoading) {
    return <LoadingIndicator2 />;
  }

  return (
    <StyledGrid container spacing={isSmallScreen ? 1 : 2}>
      {Array.from(uniqueCards).map((card) => (
        <StyledGridItem item xs={isSmallScreen ? 6 : 3} key={card.id}>
          <GenericCard card={card} userDecks={userDecks} />
        </StyledGridItem>
      ))}
    </StyledGrid>
  );
};

export default DeckSearchCardGrid;
