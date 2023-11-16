// DeckSearchCardGrid.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useStyles } from '../gridStyles';
import LoadingIndicator from '../../indicators/LoadingIndicator';
import GenericCard from '../../cards/GenericCard';
import GenericCardModal from '../../modals/GenericCardModal';

const DeckSearchCardGrid = ({ cards, userDecks }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    // Simulated data fetching delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Using useMemo to prevent unnecessary recalculations of uniqueCards
  const uniqueCards = useMemo(() => {
    const cardMap = new Map(cards.map((card) => [card.id, card]));
    return Array.from(cardMap.values());
  }, [cards]);

  // If data is loading, show loading indicator
  if (isLoading) {
    return <LoadingIndicator className={classes.loading} />;
  }

  // closeModal function to pass to GenericCardModal and action buttons
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <GenericCardModal // Rendered here, modal management lifted to the parent component
        open={isModalOpen}
        closeModal={closeModal}
        card={clickedCard} // Passed the clicked card
        context={'Deck'} // Passed the context
        setModalOpen={setModalOpen}
      />
      <GridContainer
        classes={classes}
        cards={uniqueCards}
        userDecks={userDecks}
        hoveredCard={hoveredCard}
        setHoveredCard={setHoveredCard}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        isPopoverOpen={isPopoverOpen}
        setIsPopoverOpen={setIsPopoverOpen}
        clickedCard={clickedCard}
        setClickedCard={setClickedCard}
        context={'Deck'}
        cardRef={cardRef}
      />
    </>
  );
};

export default DeckSearchCardGrid;

// Separating Grid logic for better readability and reusability
const GridContainer = ({
  classes,
  cards,
  userDecks,
  hoveredCard,
  setHoveredCard,
  isPopoverOpen,
  setIsPopoverOpen,
  cardRef,
  isModalOpen,
  setModalOpen,
  clickedCard,
  setClickedCard,
  context,
}) => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {cards?.map((card, index) => (
        <Grid key={card.id || index} item xs={4} sm={4} md={4} marginTop={1}>
          <div className={classes.cardContainer}>
            <GenericCard
              card={card}
              userDecks={userDecks}
              context={context}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              clickedCard={clickedCard}
              setClickedCard={setClickedCard}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              isPopoverOpen={isPopoverOpen}
              setIsPopoverOpen={setIsPopoverOpen}
              ref={cardRef} // Use ref forwarding if necessary in GenericCard
            />
          </div>
        </Grid>
      ))}
    </Grid>
  </Box>
);
