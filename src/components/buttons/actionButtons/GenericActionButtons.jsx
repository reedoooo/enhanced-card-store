// Dependencies
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { CollectionContext } from '../../../context/CollectionContext/CollectionContext';
import { DeckContext } from '../../../context/DeckContext/DeckContext';
import { CartContext } from '../../../context/CartContext/CartContext';
import GenericCardModal from '../../modals/GenericCardModal';
import CardActionButtons from './CardActionButtons';
// import ChooseCollectionDialog from './ChooseCollectionDialog';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
});

const GenericActionButtons = ({
  card,
  context,
  open,
  component,
  closeModal,
  // handleOpenDialog,
}) => {
  const classes = useStyles();

  const collectionContext = useContext(CollectionContext);

  if (!collectionContext) {
    console.error("The component isn't wrapped with CollectionProvider");
    return null;
  }

  const contexts = {
    Deck: useContext(DeckContext),
    Cart: useContext(CartContext),
    Store: useContext(CartContext),
    Collection: collectionContext,
  };

  const [openDialog, setOpenDialog] = useState(false);

  const contextProps = contexts[context] || {};

  // useEffect(() => {
  //   console.log(`openChooseCollectionDialog is: ${openChooseCollectionDialog}`);
  // }, [openChooseCollectionDialog]);

  const toggleDialog = (setState) => () => {
    setState((prevState) => !prevState);
  };

  return (
    <div className={classes.root}>
      <CardActionButtons
        card={card}
        context={context}
        contextProps={contextProps}
        // handleOpenDialog={handleOpenDialog}
        handleOpenDialog={toggleDialog(setOpenDialog)}
      />
      {context in contexts && (
        <GenericCardModal
          open={open}
          onClose={closeModal}
          handleCloseDialog={toggleDialog(setOpenDialog)}
          context={context}
          card={card}
        />
      )}
      {/* <ChooseCollectionDialog
        isOpen={openChooseCollectionDialog}
        onClose={toggleDialog(setOpenChooseCollectionDialog)}
        context={context}
        card={card}
      /> */}
    </div>
  );
};

export default GenericActionButtons;
