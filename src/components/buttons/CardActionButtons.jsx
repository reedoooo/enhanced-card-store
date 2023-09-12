import React, { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CartContext } from '../../context/CartContext/CartContext';
import { CollectionContext } from '../../context/CollectionContext/CollectionContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    background: '#f1f1f1',
    borderRadius: '8px',
  },
  buttonGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  fullWidthButton: {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
  },
}));

const CardActionButtons = ({ card, quantity, context }) => {
  const classes = useStyles();
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);
  const collectionContext = useContext(CollectionContext);

  const getContextSpecificProps = () => {
    switch (context) {
      case 'Deck':
        return deckContext;
      case 'Cart':
        return cartContext;
      case 'Collection':
        return collectionContext;
      default:
        return {};
    }
  };

  const contextProps = getContextSpecificProps();

  return (
    <div className={classes.root}>
      {quantity > 0 ? (
        <>
          <Grid container>
            <Grid item xs={6}>
              {`In ${context}: `} {quantity}
            </Grid>
            <Grid item xs={6} className={classes.buttonGrid}>
              <Button onClick={() => contextProps.addOne(card)}>+</Button>
              <Button onClick={() => contextProps.removeOne(card)}>-</Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className={classes.fullWidthButton}
            onClick={() => contextProps.removeAll(card)}
          >
            {`Remove from ${context}`}
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.fullWidthButton}
          onClick={() => contextProps.addOne(card)}
        >
          {`Add To ${context}`}
        </Button>
      )}
    </div>
  );
};

export default CardActionButtons;
