import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext'; // Assuming you have a separate context for Collections
import CardActionButtons from './CardActionButtons';
import CollectionDialog from './CollectionDialog'; // Assuming you have a separate dialog for Collections
import CardCountDisplay from '../other/CardCountDisplay';
import { useCartStore } from '../../context/CartContext/CartContext';

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

const CollectionActionButtons = ({ card }) => {
  const classes = useStyles();
  const {
    addOneToCollection,
    removeOneFromCollection,
    removeAllFromCollection,
    createUserCollection,
    collectionCardQuantity,
  } = useCollectionStore();

  const { getCardQuantity } = useCartStore();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = (newCollectionInfo) => {
    createUserCollection(newCollectionInfo);
    addOneToCollection(card);
    setOpenDialog(false);
  };

  // let collectionCardQuantity = getCardQuantity(card?.id);
  console.log('CARD', card);
  console.log('getCardQuantity', getCardQuantity(card?.id));
  return (
    <div className={classes.root}>
      <CardCountDisplay
        label="In Cart"
        quantity={getCardQuantity(card?.id)}
        className="some-cart-class"
      />

      <CardActionButtons
        card={card}
        quantity={getCardQuantity(card?.id)}
        addOne={addOneToCollection}
        removeOne={removeOneFromCollection}
        removeAll={removeAllFromCollection}
        context="Collection"
        buttonClassName={classes.button}
        fullWidthButtonClassName={classes.fullWidthButton}
      />
      <CollectionDialog open={openDialog} onClose={handleDialogClose} />
    </div>
  );
};

export default CollectionActionButtons;

// will having collectionActionButtons and cartActionButtons in the same component cause errors:
