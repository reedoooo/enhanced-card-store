import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from '@mui/material';
import { useStyles } from '../modalStyles';
import useSnackbar from '../../../context/hooks/useSnackBar';
import CardMediaAndDetails from '../../media/CardMediaAndDetails';
import GenericActionButtons from '../../buttons/actionButtons/GenericActionButtons';
import { ModalContext } from '../../../context/ModalContext/ModalContext';

const GenericCardModal = ({ open, card, context, imgUrl }) => {
  const classes = useStyles();
  const [snackbar, handleSnackbar, handleCloseSnackbar] = useSnackbar();
  const [hasLoggedCard, setHasLoggedCard] = useState(false);
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);

  useEffect(() => {
    if (open && card && !hasLoggedCard) {
      console.log('Modal opened with card:', card);
      handleSnackbar('Card details loaded successfully.', 'success');
      setHasLoggedCard(true);
    }
  }, [open, card, hasLoggedCard, handleSnackbar]);

  useEffect(() => {
    if (!open) {
      setHasLoggedCard(false); // Reset hasLoggedCard when modal closes
    }
  }, [open]); // Removed hasLoggedCard from dependency array

  const handleActionSuccess = () => {
    handleSnackbar('Action was successful!', 'success');
  };

  const handleActionFailure = (error) => {
    console.error('Action failed:', error);
    handleSnackbar('Action failed. Please try again.', 'error');
  };

  return (
    <Dialog
      open={open} // Use 'open' prop directly
      onClose={() => {
        closeModal(); // Call closeModal directly
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle className={classes.dialogTitle}>{card?.name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <CardMediaAndDetails
          card={card}
          imgUrl={card?.card_images[0]?.image_url}
        />
        <>
          <GenericActionButtons
            card={card}
            context="Deck"
            onSuccess={handleActionSuccess}
            onFailure={handleActionFailure}
          />
          <GenericActionButtons
            card={card}
            context="Collection"
            onSuccess={handleActionSuccess}
            onFailure={handleActionFailure}
          />
          <GenericActionButtons
            card={card}
            context="Cart"
            onSuccess={handleActionSuccess}
            onFailure={handleActionFailure}
          />
        </>
      </DialogContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default GenericCardModal;
