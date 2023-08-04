import React from 'react';
import { Button, Grid } from '@mui/material';
import { useDeckStore } from '../../context/DeckContext/DeckContext'; // Assuming you have a similar context for decks
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {}, // Default styles go here
});

const DeckActionButtons = ({ card, deckCardQuantity }) => {
  // Renamed productQuantity to deckQuantity
  const classes = useStyles();
  const { addOneToDeck, deleteFromDeck, removeOneFromDeck } = useDeckStore; // Changed from CartContext to DeckContext

  return (
    <div className={classes.root}>
      {deckCardQuantity > 0 ? ( // Changed from productQuantity to deckQuantity
        <>
          <Grid container>
            <Grid item xs={6}>
              In Deck: {deckCardQuantity}
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => addOneToDeck(card)}>+</Button>
              <Button onClick={() => removeOneFromDeck(card)}>-</Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteFromDeck(card)} // Changed from deleteFromCart to deleteFromDeck
          >
            Remove from deck
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => addOneToDeck(card)} // Changed from addOneToCart to addOneToDeck
        >
          Add To Deck
        </Button>
      )}
    </div>
  );
};

export default DeckActionButtons;
