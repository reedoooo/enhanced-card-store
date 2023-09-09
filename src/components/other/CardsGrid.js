import React from 'react';
import { Grid } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DeckCard from '../cards/DeckCard';

const CardsGrid = ({ selectedCards, classes }) => (
  <Grid container spacing={3}>
    <TransitionGroup component={null}>
      {selectedCards.map((card, index) => (
        <CSSTransition key={card?.id || index} timeout={500} classNames="card">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DeckCard card={card} className={classes.deckCard} />
          </Grid>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </Grid>
);

export default CardsGrid;
