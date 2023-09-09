import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDeckStore } from '../../context/DeckContext/DeckContext';
import CardActionButtons from './CardActionButtons';
import DeckDialog from './DeckDialog';
import DeckCountDisplay from './DeckCountDisplay';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    height: '100%',
    padding: '4px',
  },
  fullWidthButton: {
    width: '100%',
    padding: '4px',
  },
});

const DeckActionButtons = ({ card }) => {
  const classes = useStyles();
  const {
    addOneToDeck,
    removeOneFromDeck,
    removeAllFromDeck,
    createUserDeck,
    deckCardQuantity,
  } = useDeckStore();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = (newDeckInfo) => {
    createUserDeck(newDeckInfo);
    addOneToDeck(card);
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <DeckCountDisplay quantity={deckCardQuantity} />

      <CardActionButtons
        card={card}
        quantity={deckCardQuantity}
        addOne={addOneToDeck}
        removeOne={removeOneFromDeck}
        removeAll={removeAllFromDeck}
        context="Deck"
        buttonClassName={classes.button}
        fullWidthButtonClassName={classes.fullWidthButton}
      />
      <DeckDialog open={openDialog} onClose={handleDialogClose} />
    </div>
  );
};

export default DeckActionButtons;
