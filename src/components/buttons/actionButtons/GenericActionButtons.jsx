import React, { useCallback, useEffect } from 'react';
import { useModalContext } from '../../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import {
  Box,
  CardActions,
  Button,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from '@mui/icons-material';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useCartStore } from '../../../context/MAIN_CONTEXT/CartContext/CartContext';
import { useSelectionDialog } from '../../../context/hooks/useSelectionDialog';
import { useCardActions } from '../../../context/hooks/useCardActions';
import { useMode } from '../../../context';
const GenericActionButtons = ({
  card,
  context,
  onClick, // New onClick prop for handling context selection
  originalContext,
  onSuccess,
  onFailure,
  page,
}) => {
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
  // Auto-select first deck or collection if none is selected
  useEffect(() => {
    if (context === 'Deck' && !selectedDeck && allDecks.length > 0) {
      console.warn('No deck selected. Defaulting to first deck.');
      setSelectedDeck(allDecks[0]);
    }
    if (
      context === 'Collection' &&
      !selectedCollection &&
      allCollections.length > 0
    ) {
      console.warn('No collection selected. Defaulting to first collection.');
      setSelectedCollection(allCollections[0]);
    }
  }, [
    context,
    selectedDeck,
    selectedCollection,
    allDecks,
    allCollections,
    setSelectedDeck,
    setSelectedCollection,
  ]);

  const { getButtonTypographyVariant2, getButtonTypographyVariant } =
    theme.responsiveStyles;
  const { addButton, removeButton, actionRow, circleButtonContainer } =
    theme.genericButtonStyles;
  const { performAction, count } = useCardActions(
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
  const handleAddCard = () => {
    onClick?.();
    performAction('add');
    closeModal?.();
  };
  const handleRemoveCard = () => {
    onClick?.();
    performAction('remove');
    closeModal?.();
  };
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
  const renderSelectionDialog = () => (
    <Dialog open={selectDialogOpen} onClose={() => setSelectDialogOpen(false)}>
      <DialogTitle>Select {context}</DialogTitle>
      <DialogContent>
        {itemsForSelection.map((item) => (
          <Button key={item.id} onClick={() => onClick(item)}>
            {item.name}
          </Button>
        ))}
      </DialogContent>
    </Dialog>
  );
  const getButtonLabel = () => {
    if (isModalOpen && !theme.responsiveStyles.isLarge(theme.breakpoints)) {
      return `${context}`;
    }
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
            alignSelf: 'center',
            flexGrow: 1,
            width: '100%',
            ...theme.responsiveStyles.getStyledGridItemStyle,
          }}
        >
          {isCardInContext(context) ? (
            <Box sx={circleButtonContainer}>
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
                    variant={getButtonTypographyVariant2(theme.breakpoints)}
                    sx={{
                      flexGrow: 1,
                      textAlign: 'center',
                    }}
                  >
                    {`${context}`}
                  </Typography>
                </Grid>
                <Grid item xs={4.5} sm={4} md={4} lg={4.5} xl={4}>
                  <Typography
                    variant={getButtonTypographyVariant2(theme.breakpoints)}
                    sx={{
                      flexGrow: 1,
                      textAlign: 'center',
                    }}
                  >
                    {`${count || 0}`}
                  </Typography>
                </Grid>
                {/* <Grid item xs={0.5} sm={0.5} md={0} lg={0} xl={0}></Grid> */}
                <Grid item xs={3.75} sm={4} md={3.5} lg={3.5} xl={4}>
                  <IconButton onClick={handleAddCard} sx={addButton}>
                    <AddCircleOutlineOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={3.75} sm={4} md={3.5} lg={3.5} xl={4}>
                  <IconButton onClick={handleRemoveCard} sx={removeButton}>
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
              onClick={handleAddCard}
              startIcon={<AddCircleOutlineOutlined />}
              sx={{
                ...theme.responsiveStyles.getButtonTypographyVariant2(
                  theme.breakpoints
                ),
                ...theme.genericButtonStyles.addButton,
              }}
            >
              <Typography
                variant={getButtonTypographyVariant(theme.breakpoints)}
              >
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
