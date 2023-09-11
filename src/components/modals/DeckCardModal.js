import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import CardMediaSection from '../media/CardMediaSection';
import CardDetailsContainer from './cardModal/CardDetailsContainer';
import DeckActionButtons from '../cleanUp/DeckActionButtons';
import { makeStyles } from '@mui/styles';

const useStyles = (context) =>
  makeStyles({
    dialogTitle: {
      backgroundColor: '#0066cc',
      color: 'white',
      padding: '16px',
      fontWeight: 'bold',
    },
  });

const DeckCardModal = ({ isOpen, onClose, card, userDecks }) => {
  const classes = useStyles();
  if (!card) return null; // or some other placeholder

  const { getCardQuantity } = useContext(DeckContext);
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
            <CardDetailsContainer
              card={card}
              className={classes.someClassForDeckCardDetail}
            />
          </Grid>
        </Grid>
        <DeckActionButtons card={card} deckCardQuantity={productQuantity} />
      </DialogContent>
    </Dialog>
  );
};

export default DeckCardModal;
