import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardMediaSection from '../media/CardMediaSection';
import CardDetailsContainer from './cardModal/CardDetailsContainer';
import GenericActionButtons from '../buttons/GenericActionButtons';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CartContext } from '../../context/CartContext/CartContext';
import { CollectionContext } from '../../context/CollectionContext/CollectionContext';
import CollectionDialog from '../dialogs/CollectionDialog';

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

  // const getContextSpecificProps = () => {
  //   return context === 'Deck'
  //     ? {
  //         ...deckContext,
  //       }
  //     : {
  //         ...cartContext,
  //       };
  // };

  // const {
  //   getCardQuantity,
  //   collectionData,
  //   deckCardQuantity,
  //   addOne,
  //   removeOne,
  //   removeAll,
  // } = getContextSpecificProps();

  // Function to handle context-specific actions
  const getContextSpecificProps = () => {
    switch (context) {
      case 'Deck':
        return {
          deckCardQuantity: deckContext.getCardQuantity(card.id),
          addOne: deckContext.addOneToDeck(card),
          removeOne: deckContext.removeOneFromDeck(card),
          // removeAll: deckContext.removeAllFromDeck(card),
        };
      case 'Cart':
        return {
          deckCardQuantity: cartContext.getCardQuantity(card.id),
          addOne: cartContext.addOneToCart(card),
          removeOne: cartContext.removeOneFromCart(card),
          removeAll: cartContext.deleteFromCart(card),
        };
      case 'Store':
        // Modify this part according to your Store context
        return {
          deckCardQuantity: cartContext.getCardQuantity(card.id),
          addOne: cartContext.addOneToCart(card),
          removeOne: cartContext.removeOneFromCart(card),
          removeAll: cartContext.deleteFromCart(card),
        };
      case 'Collection':
        // Modify this part according to your Collection context
        return {
          deckCardQuantity: collectionContext.getCardQuantity(card.id),
          addOne: collectionContext.addOneToCollection(card),
          removeOne: collectionContext.removeOneFromCollection(card),
          removeAll: collectionContext.removeAllFromCollection(card),
        };
      default:
        return {};
    }
  };

  const contextProps = getContextSpecificProps();

  // if (context === 'Collection') {
  //   const productQuantity = getCardQuantity(collectionData.collectionId);
  //   console.log('productQuantity', productQuantity);
  // }

  const productQuantity = contextProps.deckCardQuantity;

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

      {context === 'Deck' && (
        <>
          <GenericActionButtons
            card={card}
            context={context}
            label={`In ${context}`}
            {...deckContext}
            productQuantity={productQuantity}
          />
          <GenericActionButtons
            card={card}
            context={'Collection'}
            label={'In Collection'}
            {...collectionContext}
            productQuantity={productQuantity}
          />
        </>
      )}

      {context === 'Cart' && (
        <GenericActionButtons
          card={card}
          context={context}
          label={`In ${context}`}
          {...cartContext}
          productQuantity={productQuantity}
        />
      )}

      {context === 'Store' && (
        <>
          <GenericActionButtons
            card={card}
            context={context}
            label={'In Store'}
            {...cartContext}
            productQuantity={productQuantity}
          />
          <GenericActionButtons
            card={card}
            context={'Collection'}
            label={'In Collection'}
            {...collectionContext}
            productQuantity={productQuantity}
          />
        </>
      )}

      {context === 'Collection' && (
        <GenericActionButtons
          card={card}
          context={context}
          label={`In ${context}`}
          {...collectionContext}
          productQuantity={productQuantity}
        />
      )}
    </Dialog>
  );
};

export default GenericCardModal;
