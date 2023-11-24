import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from '@mui/material';
import { useStyles } from '../modalStyles';
import useAppContext from '../../../context/hooks/useAppContext';
import useSnackbar from '../../../context/hooks/useSnackBar';
import CardMediaAndDetails from '../../media/CardMediaAndDetails';
import GenericActionButtons from '../../buttons/actionButtons/GenericActionButtons';
import { ModalContext } from '../../../context/ModalContext/ModalContext';

const GenericCardModal = ({ open, card, context }) => {
  const classes = useStyles();
  const { contextProps, isContextAvailable } = useAppContext(context);
  const [snackbar, handleSnackbar, handleCloseSnackbar] = useSnackbar();
  // const [isOpen, setIsOpen] = useState(false);
  const [hasLoggedCard, setHasLoggedCard] = useState(false);
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);

  const requiresDoubleButtons = context === 'Deck' || context === 'Collection';

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

  // Example function to be called when an action is successful
  const handleActionSuccess = () => {
    handleSnackbar('Action was successful!', 'success');
  };

  // Example function to be called when an action fails
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
        <CardMediaAndDetails card={card} />
        {requiresDoubleButtons && (
          <>
            <GenericActionButtons
              card={card}
              context="Deck"
              onSuccess={handleActionSuccess}
              onFailure={handleActionFailure}
              // setModalOpen={setModalOpen}
            />
            <GenericActionButtons
              card={card}
              context="Collection"
              onSuccess={handleActionSuccess}
              onFailure={handleActionFailure}
              // setModalOpen={setModalOpen}
            />
          </>
        )}
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
