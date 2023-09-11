import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CardActionButtons from './CardActionButtons';
import CardCountDisplay from './CardCountDisplay';
import DeckCardDialog from '../dialogs/DeckCardDialog';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly', // Add this for even distribution of items
    height: '100%', // This will ensure that the buttons take the available space
  },
  button: {
    flex: 1,
    height: 'auto', // Changed from '100%' to 'auto' for better flexibility
    padding: '8px', // Increased padding slightly
  },
  fullWidthButton: {
    width: '100%',
    padding: '8px', // Increased padding slightly
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

const GenericActionButtons = ({
  card,
  context,
  addOne,
  removeOne,
  removeAll,
  deckCardQuantity,
}) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = (newResourceInfo) => {
    console.log('newResourceInfo', newResourceInfo);
    addOne(card);
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <div className={classes.root}>
      {/* <CardCountDisplay
        label={context}
        quantity={deckCardQuantity}
        className={classes.className}
      /> */}
      {/* <div className={classes.actionContainer}> */}
      <CardCountDisplay
        label={context}
        quantity={deckCardQuantity}
        className={classes.className}
      />
      <CardActionButtons
        card={card}
        quantity={deckCardQuantity}
        addOne={addOne}
        removeOne={removeOne}
        removeAll={removeAll}
        context={context}
        buttonClassName={classes.button}
        // fullWidthButtonClassName={classes.fullWidthButton}
        handleOpenDialog={handleOpenDialog}
      />
      {/* </div> */}
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
