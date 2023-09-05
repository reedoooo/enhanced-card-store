import React, { useState } from 'react';
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useDeckStore } from '../../context/DeckContext/DeckContext';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  button: {
    height: '100%',
    flexGrow: 1,
    flexShrink: 1, // allow shrinking
    padding: '4px', // reduce padding
  },
}));

const DeckActionButtons = ({ card, deckCardQuantity }) => {
  const classes = useStyles();
  const {
    addOneToDeck,
    deleteFromDeck,
    removeOneFromDeck,
    createUserDeck,
    decks,
  } = useDeckStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [newDeckInfo, setNewDeckInfo] = useState({ name: '', description: '' });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);

  // const isCustomScreenSize = useMediaQuery('(max-width:900px)');
  console.log('card', card);

  const handleAddToDeck = async () => {
    try {
      setIsCreatingDeck(true);
      await addOneToDeck(card);
      setIsCreatingDeck(false);
    } catch (error) {
      console.error('Failed to add card to deck:', error);
      setIsCreatingDeck(false);
    }
  };

  const handleClose = (createDeck) => {
    if (createDeck) {
      createUserDeck(newDeckInfo);
      addOneToDeck(card);
    }
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeckInfo((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className={classes.root}>
      {deckCardQuantity > 0 ? (
        <>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={isSmallScreen ? 12 : 4}>
              In Deck: {deckCardQuantity}
            </Grid>
            <Grid item xs={isSmallScreen ? 12 : 4}>
              <Button
                className={classes.button}
                onClick={() => addOneToDeck(card)}
                // variant="contained"
                // color="primary"
              >
                +
              </Button>
              <Button
                className={classes.button}
                onClick={() => removeOneFromDeck(card)}
                // variant="contained"
                // color="primary"
              >
                -
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteFromDeck(card)}
          >
            Remove from deck
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAddToDeck}
          disabled={isCreatingDeck}
        >
          Add To Deck
        </Button>
      )}
      <Dialog open={openDialog} onClose={() => handleClose(false)}>
        <DialogTitle>Create a New Deck</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You don&apos;t have an existing deck. Would you like to create one?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Deck Name"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Deck Description"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeckActionButtons;
