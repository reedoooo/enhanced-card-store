import React from 'react';
import { Grid } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DeckCard from '../cards/DeckCard';

const CardsGrid = ({ selectedCards, classes }) => {
  const flattenSelectedCards = selectedCards.reduce((acc, card) => {
    const filledArray = Array(card.quantity)
      .fill(card)
      .map((cardItem, index) => ({
        ...cardItem,
        uniqueKey: `${cardItem.id}-${index}`,
      }));
    return [...acc, ...filledArray];
  }, []);

  return (
    <Grid container spacing={2}>
      <TransitionGroup component={null}>
        {flattenSelectedCards.map((card, index) => (
          <CSSTransition
            key={card?.uniqueKey || index}
            timeout={500}
            classNames="card"
          >
            <Grid item xs={12} sm={4} md={3} lg={2} xl={1}>
              <DeckCard
                card={card}
                cardInfo={card}
                className={classes?.deckCard}
              />
            </Grid>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Grid>
  );
};

export default CardsGrid;
