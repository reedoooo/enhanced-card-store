import React from 'react';
import { Grid } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import GenericCard from '../../cards/GenericCard';
import { useDeckStyles } from '../gridStyles';

const CardsGrid = ({ selectedCards }) => {
  const flattenSelectedCards = selectedCards.reduce((acc, card) => {
    const filledArray = Array(card.quantity)
      .fill(card)
      .map((cardItem, index) => ({
        ...cardItem,
        uniqueKey: `${cardItem.id}-${index}`,
      }));
    return [...acc, ...filledArray];
  }, []);

  const classes = useDeckStyles();

  return (
    <Grid container spacing={2}>
      <TransitionGroup component={null}>
        {flattenSelectedCards.map((card, index) => (
          <CSSTransition
            key={card?.uniqueKey || index}
            timeout={500}
            classNames="card"
          >
            <Grid item xs={6} sm={4} md={3} lg={3}>
              <GenericCard
                card={card}
                cardInfo={card}
                context={'Deck'}
                // className={classes.card} // Passing down common className
              />
            </Grid>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Grid>
  );
};

export default CardsGrid;
