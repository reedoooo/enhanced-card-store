import React, { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import CardActionButtons from './CardActionButtons';
import DeckCardDialog from '../dialogs/DeckCardDialog';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CartContext } from '../../context/CartContext/CartContext';
import { CollectionContext } from '../../context/CollectionContext/CollectionContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '@media (max-width:600px)': {
      flexDirection: 'column',
    },
  },
});

const GenericActionButtons = ({ card, context, ...contextSpecificProps }) => {
  const classes = useStyles();
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);
  const collectionContext = useContext(CollectionContext);

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const getContextSpecificProps = () => {
    switch (context) {
      case 'Deck':
        return { ...deckContext, ...contextSpecificProps };
      case 'Cart':
        return { ...cartContext, ...contextSpecificProps };
      case 'Collection':
        return { ...collectionContext, ...contextSpecificProps };
      default:
        return {};
    }
  };

  const contextProps = getContextSpecificProps();
  const { addOne, removeOne, removeAll } = contextProps; // Now, these should be properly initialized.

  return (
    <div className={classes.root}>
      <CardActionButtons
        card={card}
        quantity={contextProps.deckCardQuantity} // Make sure deckCardQuantity exists on contextProps
        context={context}
        handleOpenDialog={handleOpenDialog}
      />

      {context === 'Deck' && (
        <DeckCardDialog
          isOpen={openDialog}
          onClose={handleDialogClose}
          card={card}
        />
      )}
    </div>
  );
};

export default GenericActionButtons;
