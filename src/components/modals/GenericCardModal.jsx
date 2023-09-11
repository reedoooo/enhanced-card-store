import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import CardMediaSection from '../media/CardMediaSection';
import CardDetailsContainer from './cardModal/CardDetailsContainer';
import GenericActionButtons from '../buttons/GenericActionButtons';
import {
  DeckContext,
  // DeckContext,
  useDeckStore,
} from '../../context/DeckContext/DeckContext';
import {
  CartContext,
  useCartStore,
} from '../../context/CartContext/CartContext';
import { makeStyles } from '@mui/styles';

const GenericCardModal = ({ isOpen, onClose, card, context, userDecks }) => {
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);
  const useStyles = makeStyles({
    dialogTitle: {
      backgroundColor: context === 'Deck' ? '#0066cc' : '#ff9800',
      color: 'white',
      padding: '16px 24px',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    dialogContent: {
      padding: '24px',
    },
  });

  const classes = useStyles();

  // const storeHook = context === 'Deck' ? useDeckStore() : useCartStore();

  // if (typeof storeHook !== 'function') {
  //   console.error('storeHook must be a function, got ', typeof storeHook);
  //   return null; // Or some error UI
  // }

  if (!card) return null; // or some other placeholder

  const currentContext = context === 'Deck' ? deckContext : cartContext;
  const { getCardQuantity } = currentContext;
  const productQuantity = getCardQuantity(card?.id);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle className={classes.dialogTitle}>{card?.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMediaSection card={card} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDetailsContainer card={card} />
          </Grid>
        </Grid>
        <GenericActionButtons
          card={card}
          productQuantity={productQuantity}
          context={context}
          label={context}
          userDecks={userDecks}
        />
      </DialogContent>
    </Dialog>
  );
};

export default GenericCardModal;
