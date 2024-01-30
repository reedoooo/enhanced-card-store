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
  ButtonGroup,
} from '@mui/material';
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
  MoreVert,
} from '@mui/icons-material';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useCartStore } from '../../../context/MAIN_CONTEXT/CartContext/CartContext';
import { useSelectionDialog } from '../../../context/hooks/useSelectionDialog';
import { useCardActions } from '../../../context/hooks/useCardActions';
import { useMode } from '../../../context';
import { useAppContext } from '../../../context';
import LoadingButton from '@mui/lab/LoadingButton';
const GenericActionButtons = ({
  card,
  context,
  onClick, // New onClick prop for handling context selection
  originalContext,
  onSuccess,
  onFailure,
  page,
}) => {
  const [isLoadingApiResponse, setIsLoadingApiResponse] = React.useState(false);
  const { closeModal, isModalOpen, setModalOpen } = useModalContext();
  const { isCardInContext } = useAppContext();
  const { theme } = useMode();
  const { getButtonTypographyVariant2, getButtonTypographyVariant } =
    theme.responsiveStyles;
  const { isXSmall, isSmall, isMedium, isLarge, isXLarge, isMdUp, isMdDown } =
    theme.responsiveStyles;
  const { addButton, removeButton, actionRow, circleButtonContainer } =
    theme.genericButtonStyles;
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
    onFailure,
    page
  );
  const handleActionClick = (action) => {
    console.log('SET LOADING FOR ', action);
    setIsLoadingApiResponse(true);
    onClick?.();
    performAction(action);
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
  // const getButtonLabel = () => {
  //   if (isModalOpen && !theme.responsiveStyles.isLarge(theme.breakpoints)) {
  //     return `${context}`;
  //   }
  //   return `Add to ${context}`;
  // };
  // RESPONSIVE BUTTON ACTIONS CONTAINER USING WINDOW SIZE
  // const getButtonSize = () => {
  //   const isSm = theme.breakpoints.down('sm');
  //   const isMd = theme.breakpoints.between('md', 'lg');
  //   const isLgOrGreater = theme.breakpoints.up('lg');

  //   if (isSm) return 'small';
  //   if (isMd) return 'medium';
  //   if (isLgOrGreater) return 'large'; // For large and greater sizes
  // };
  // const buttonSize = getButtonSize();

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
  const getButtonLabel = () =>
    isModalOpen && !theme.breakpoints.up('lg')
      ? `${context}`
      : `Add to ${context}`;

  // Define button sizes based on breakpoints
  const buttonSize = theme.breakpoints.down('sm')
    ? 'small'
    : theme.breakpoints.between('md', 'lg')
      ? 'medium'
      : 'large';

  const renderCircleButtons = () => (
    <ButtonGroup variant="contained" fullWidth>
      <LoadingButton
        size={buttonSize}
        loading={isLoadingApiResponse}
        onClick={() => handleActionClick('add')}
        startIcon={<AddCircleOutlineOutlined />}
        sx={addButton}
      >
        Add
      </LoadingButton>
      <LoadingButton
        size={buttonSize}
        loading={isLoadingApiResponse}
        onClick={() => handleActionClick('remove')}
        startIcon={<RemoveCircleOutlineOutlined />}
        sx={removeButton}
      >
        Remove
      </LoadingButton>
    </ButtonGroup>
  );

  const renderFullWidthAddButton = () => (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      onClick={() => handleActionClick('add')}
      startIcon={<AddCircleOutlineOutlined />}
      sx={{
        ...theme.responsiveStyles.getButtonTypographyVariant2(
          theme.breakpoints
        ),
        ...theme.genericButtonStyles.addButton,
      }}
    >
      {getButtonLabel()}
    </Button>
  );

  const renderButtons = () => {
    if (isCardInContext(context)) {
      return renderCircleButtons();
    }
    return renderFullWidthAddButton();
  };
  return (
    <React.Fragment>
      {renderSelectionDialog()}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          flexGrow: 1,
        }}
      >
        <CardActions sx={{ alignSelf: 'center', flexGrow: 1, width: '100%' }}>
          {renderButtons()}
        </CardActions>
      </Box>
    </React.Fragment>
  );
};

export default GenericActionButtons;
