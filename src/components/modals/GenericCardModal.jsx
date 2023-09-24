import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import CardMediaSection from '../media/CardMediaSection';
import CardDetailsContainer from './cardModal/CardDetailsContainer';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CartContext } from '../../context/CartContext/CartContext';
import { CollectionContext } from '../../context/CollectionContext/CollectionContext';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
  },
  media: {
    objectFit: 'cover',
    borderRadius: '4px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  dialogTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.primary.dark,
  },
  dialogContent: {
    padding: '2rem',
  },
}));

const GenericCardModal = ({ isOpen, onClose, card, context }) => {
  const classes = useStyles();
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);
  const collectionContext = useContext(CollectionContext);

  const contextProps =
    {
      Deck: deckContext,
      Cart: cartContext,
      Store: cartContext,
      Collection: collectionContext,
    }[context] || {};

  const productQuantity = contextProps.getCardQuantity
    ? contextProps.getCardQuantity(card.id)
    : 0;

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      onClose();
    }
  };

  if (!card) return null;

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle className={classes.dialogTitle}>{card?.name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMediaSection
              card={card}
              imgUrl={card?.card_images[0].image_url}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardDetailsContainer card={card} />
          </Grid>
        </Grid>
      </DialogContent>

      {['Deck', 'Cart', 'Store', 'Collection'].includes(context) && (
        <>
          <GenericActionButtons
            card={card}
            context={context}
            label={`In ${context}`}
            {...contextProps}
            productQuantity={productQuantity}
          />
          {context === 'Deck' && (
            <GenericActionButtons
              card={card}
              context={'Collection'}
              label={'In Collection'}
              {...contextProps}
              productQuantity={productQuantity}
            />
          )}
        </>
      )}
    </Dialog>
  );
};

export default GenericCardModal;
