// src/components/DeckDisplay.js
import React, { useContext, useMemo } from 'react';
import { useCardStore } from '../../context/CardContext/CardStore';
import { makeStyles } from '@mui/styles';
import DeckCard from '../cards/DeckCard';
import { Grid } from '@mui/material';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%', // Set the height to 100%
    position: 'relative', // Required for the aspect-ratio trick
    animation: 'fadeIn 0.5s ease-in-out', // Add animation
  },
  deckCard: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    aspectRatio: '2 / 3', // Adjusted the aspect ratio
  },
  '@global': {
    '.card-enter': {
      opacity: 0,
    },
    '.card-enter-active': {
      opacity: 1,
      transition: 'opacity 500ms',
    },
    '.card-exit': {
      opacity: 1,
    },
    '.card-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms',
    },
  },
}));

const DeckDisplay = () => {
  // const { deckSearchData, savedDeckData } = useCardStore();
  const { deckData } = useContext(DeckContext);
  const classes = useStyles();
  const isCardDataValid = deckData.deck && Array.isArray(deckData.deck);

  const limitedCardsToRender = useMemo(
    () => (deckData.deck ? Array.from(deckData.deck).slice(0, 30) : []),
    [deckData]
  );
  return (
    <Grid container spacing={3}>
      {isCardDataValid && (
        <TransitionGroup component={null}>
          {limitedCardsToRender.map((card, index) => (
            <CSSTransition
              key={`${card.id}-${index}`}
              timeout={500}
              classNames="card"
            >
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <DeckCard card={card} className={classes.deckCard} />
              </Grid>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </Grid>
  );
};

export default DeckDisplay;
