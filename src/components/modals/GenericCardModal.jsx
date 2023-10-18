import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  List,
  ListItem,
  ButtonBase,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import CardMediaSection from '../media/CardMediaSection';
import CardDetailsContainer from './cardModal/CardDetailsContainer';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CartContext } from '../../context/CartContext/CartContext';
import { CollectionContext } from '../../context/CollectionContext/CollectionContext';
import { makeStyles } from '@mui/styles';
import { useCollectionStore } from '../../context/hooks/collection';

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
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  listItemText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: theme.spacing(3),
  },
}));

const GenericCardModal = ({ open, onClose, card, cardInfo, context }) => {
  const classes = useStyles();
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);
  const collectionContext = useContext(CollectionContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  if (!collectionContext) {
    console.error("The component isn't wrapped with CollectionProvider");
    return null;
  }

  const contextProps =
    {
      Deck: deckContext,
      Cart: cartContext,
      Store: cartContext,
      Collection: collectionContext,
    }[context] || {};

  const {
    openChooseCollectionDialog,
    setOpenChooseCollectionDialog,
    allCollections,
    fetchAllCollectionsForUser,
    setSelectedCollection,
  } = contextProps;
  const handleSelectCollection = useCallback(
    (collectionId) => {
      const foundCollection = allCollections.find(
        (collection) => collection._id === collectionId
      );

      if (foundCollection) {
        setSelectedCollection(foundCollection);
        setOpenChooseCollectionDialog(false);
        setSnackbarMessage('Collection selected successfully!');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Collection not found!');
        setOpenSnackbar(true);
      }
    },
    [allCollections, setSelectedCollection]
  );

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setSnackbarMessage(`${context} successfully updated`);
      setOpenSnackbar(true);
      onClose();
    }
  };

  // console.log('openChooseCollectionDialog', openChooseCollectionDialog);

  useEffect(() => {
    if (openChooseCollectionDialog === true) {
      console.log('Fetching collections...', openChooseCollectionDialog);
      fetchAllCollectionsForUser();
    }
  }, [openChooseCollectionDialog]);
  console.log('open --------> ', open);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
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
            cardInfo={cardInfo}
            context={context}
            component={'GenericCardModal'}
            label={`In ${context}`}
            productQuantity={contextProps.productQuantity}
          />
          {context === 'Deck' && (
            <>
              <GenericActionButtons
                card={card}
                cardInfo={cardInfo}
                context={'Collection'}
                component={'GenericCardModal'}
                label={'In Collection'}
                productQuantity={
                  contextProps.productQuantity || contextProps.totalQuantity
                }
              />
              <button onClick={() => setOpenChooseCollectionDialog(true)}>
                Open Dialog
              </button>
            </>
          )}
        </>
      )}
      {openChooseCollectionDialog && (
        <Dialog
          open={open}
          onClose={() => setOpenChooseCollectionDialog(false)}
        >
          <DialogTitle>Select a Collection</DialogTitle>

          <List className={classes.list}>
            {allCollections.map((collection) => (
              <React.Fragment key={collection._id}>
                <ListItem className={classes.listItem}>
                  <ButtonBase
                    sx={{ width: '100%' }}
                    onClick={() => handleSelectCollection(collection._id)}
                  >
                    <ListItemText
                      primary={collection.name}
                      className={classes.listItemText}
                    />
                  </ButtonBase>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            message={snackbarMessage}
            autoHideDuration={3000}
          />
        </Dialog>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Dialog>
  );
};

export default GenericCardModal;
