import React from 'react';
import { Grid } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DeckCard from '../cleanUp/DeckCard';
import GenericCard from '../cards/GenericCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative', // Add this
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  media: {
    width: '100%',
    objectFit: 'contain',
  },
  content: {
    flex: '1 1 auto',
    overflow: 'hidden',
    // padding: theme.spacing(1),
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  actionButtons: {
    backgroundColor: '#f5f5f5',
    // padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    borderRadius: '4px',
    overflow: 'auto',
  },
  dialog: {
    position: 'absolute', // Add this
    top: 0,
    right: 0,
    zIndex: 1000, // High z-index value
  },
}));

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

  const classes = useStyles();

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
              {/* <DeckCard
                card={card}
                cardInfo={card}
                className={classes?.deckCard}
              /> */}
              <GenericCard
                card={card}
                cardInfo={card}
                // className={classes?.deckCard}
                context={'Deck'}
                className={classes.card} // Passing down common className
              />
            </Grid>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Grid>
  );
};

export default CardsGrid;
