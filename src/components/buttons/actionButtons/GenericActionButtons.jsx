import React, { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import CardActionButtons from './CardActionButtons';
import DeckCardDialog from '../../dialogs/DeckCardDialog';
import { DeckContext } from '../../../context/DeckContext/DeckContext';
import { CartContext } from '../../../context/CartContext/CartContext';
import { CollectionContext } from '../../../context/CollectionContext/CollectionContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
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
        return {
          ...deckContext, // Spread the context to ensure all functions are included
        };
      case 'Cart':
      case 'Store':
        return {
          ...cartContext, // Spread the context to ensure all functions are included
        };
      case 'Collection':
        return {
          ...collectionContext, // Spread the context to ensure all functions are included
        };
      default:
        return {};
    }
  };

  const contextProps = getContextSpecificProps();

  return (
    <div className={classes.root}>
      <CardActionButtons
        card={card}
        context={context}
        contextProps={contextProps}
        handleOpenDialog={handleOpenDialog}
      />

      {(context === 'Deck' || context === 'Cart' || context === 'Store') && (
        <DeckCardDialog
          isOpen={openDialog}
          onClose={handleDialogClose}
          context={context}
          card={card}
        />
      )}
    </div>
  );
};

export default GenericActionButtons;
