import React, { useCallback, useState } from 'react';
import useAppContext from '../../../context/hooks/useAppContext';
import { useModalContext } from '../../../context/ModalContext/ModalContext';
import {
  Box,
  CardActions,
  Alert,
  Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from '@mui/icons-material';
import { useMode } from '../../../context/hooks/colormode';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import { useCartStore } from '../../../context/CartContext/CartContext';
import useResponsiveStyles from '../../../context/hooks/useResponsiveStyles';
import { useGenericActionButtonStyles } from '../../../context/hooks/useGenericActionButtonStyles';
import { useSelectionDialog } from '../../../context/hooks/useSelectionDialog';
import { useCardActions } from '../../../context/hooks/useCardActions';
const GenericActionButtons = ({
  card,
  context,
  onClick, // New onClick prop for handling context selection
  originalContext,
  onSuccess,
  onFailure,
  page,
}) => {
  const contextProps = useAppContext(); // Assuming useAppContext returns the context object
  const { closeModal, isModalOpen, setModalOpen } = useModalContext();
  const { theme } = useMode();
  const {
    addOneToCollection,
    removeOneFromCollection,
    selectedCollection,
    allCollections,
    setSelectedCollection,
  } = useCollectionStore();
  const {
    addOneToDeck,
    removeOneFromDeck,
    selectedDeck,
    allDecks,
    setSelectedDeck,
  } = useDeckStore();
  const { addOneToCart, removeOneFromCart, cartData } = useCartStore();
  const {
    isXSmall,
    isMobile,
    isMedium,
    isLarge,
    getButtonTypographyVariant2,
    getButtonTypographyVariant,
  } = useResponsiveStyles(theme);
  const performAction = useCardActions(
    context,
    card,
    selectedCollection,
    selectedDeck,
    addOneToCollection,
    removeOneFromCollection,
    addOneToDeck,
    removeOneFromDeck,
    addOneToCart,
    removeOneFromCart,
    onSuccess,
    onFailure
  );
  const styles = useGenericActionButtonStyles(theme);
  const {
    selectDialogOpen,
    itemsForSelection,
    openSelectionDialog,
    handleSelection,
    setSelectDialogOpen,
  } = useSelectionDialog(
    context,
    selectedCollection,
    selectedDeck,
    allCollections,
    allDecks
  );

  const isCardInContext = useCallback(() => {
    const cardsList = {
      Collection: selectedCollection?.cards,
      Deck: selectedDeck?.cards,
      Cart: cartData?.cart,
    };
    return !!cardsList[context]?.find((c) => c?.id === card?.id);
  }, [context, card.id, selectedCollection, selectedDeck, cartData]);

  const handleAddClick = () => {
    onClick?.(); // Set the selected context when adding
    performAction('add');
  };
  const handleRemoveOne = () => {
    performAction('remove');
    closeModal?.();
  };
  const renderSelectionDialog = () => (
    <Dialog open={selectDialogOpen} onClose={() => setSelectDialogOpen(false)}>
      <DialogTitle>Select {context}</DialogTitle>
      <DialogContent>
        {/* Render the items for selection */}
        {itemsForSelection.map((item) => (
          <Button key={item.id} onClick={() => handleSelection(item)}>
            {item.name}
          </Button>
        ))}
      </DialogContent>
    </Dialog>
  );
  const getButtonLabel = () => {
    // If modal is open and screen is not large, return context only
    if (isModalOpen && !isLarge) {
      return `${context}`;
    }
    // For large screens or when modal is not open, provide more detailed text
    return `Add to ${context}`;
  };

  return (
    <React.Fragment>
      {renderSelectionDialog()}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center align the buttons
          alignItems: 'center', // Center align the buttons
          gap: 1, // Add a small gap between buttons
          flexGrow: 1,
        }}
      >
        <CardActions
          sx={{
            ...styles.actionRow,
            alignSelf: 'center',
            flexGrow: 1,
            width: '100%',
          }}
        >
          {isCardInContext(context) ? (
            <Box sx={styles.circleButtonContainer}>
              <Grid
                container
                spacing={2.5}
                alignItems="center"
                sx={{
                  flexGrow: 1,
                }}
              >
                <Grid item xs={4.5} sm={4} md={4} lg={4.5} xl={4}>
                  <Typography
                    variant={getButtonTypographyVariant2(theme)}
                    sx={{
                      flexGrow: 1,
                      textAlign: 'center',
                    }}
                  >
                    {`${context}`}
                  </Typography>
                </Grid>
                {/* <Grid item xs={0.5} sm={0.5} md={0} lg={0} xl={0}></Grid> */}
                <Grid item xs={3.75} sm={4} md={3.5} lg={3.5} xl={4}>
                  <IconButton onClick={handleAddClick} sx={styles.addButton}>
                    <AddCircleOutlineOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={3.75} sm={4} md={3.5} lg={3.5} xl={4}>
                  <IconButton
                    onClick={handleRemoveOne}
                    sx={styles.removeButton}
                  >
                    <RemoveCircleOutlineOutlined />
                  </IconButton>
                </Grid>
                {/* <Grid item xs={3} sm={3} md={3} lg={2} xl={2}></Grid> */}
              </Grid>
            </Box>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleAddClick}
              startIcon={<AddCircleOutlineOutlined />}
              sx={styles.addButton}
            >
              <Typography variant={getButtonTypographyVariant(theme)}>
                {getButtonLabel()}
              </Typography>
            </Button>
          )}
        </CardActions>
      </Box>
    </React.Fragment>
  );
};

export default GenericActionButtons;
