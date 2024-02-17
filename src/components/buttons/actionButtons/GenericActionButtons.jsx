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
  DialogActions,
  Icon,
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
import { useAppContext, useMode } from '../../../context';
import LoadingButton from '@mui/lab/LoadingButton';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import { Stack } from '@mui/system';
import DeckBuilderIcon from '../../reusable/icons/DeckBuilderIcon';
import { renderFullWidthAddButton } from './renderFullWidthAddButton';
const GenericActionButtons = ({
  card,
  context = context || context?.pageContext,
  onClick, // New onClick prop for handling context selection
  originalContext,
  onSuccess,
  onFailure,
  page,
  size,
  cardSize,
}) => {
  if (typeof context === 'undefined') {
    context = context?.pageContext;
  }
  const [isLoadingApiResponse, setIsLoadingApiResponse] = React.useState(false);
  const { closeModal, isModalOpen, setModalOpen } = useModalContext();
  // const { isCardInContext } = useAppContext();
  const { theme } = useMode();
  // const { addButton, removeButton, actionRow, circleButtonContainer } =
  //   theme.genericButtonStyles;
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
  // const buttonSizeMap = {
  //   xs: 'small',
  //   sm: 'medium',
  //   md: 'large',
  //   lg: 'large', // Adjust if there's another size you want for 'l'
  // };
  const [buttonSize, setButtonSize] = React.useState('medium');
  const [isLoading, setIsLoading] = React.useState(false);
  const renderSelectionDialog = () => (
    <Dialog open={selectDialogOpen} onClose={() => setSelectDialogOpen(false)}>
      <DialogTitle>Select {context}</DialogTitle>
      <DialogContent>
        <DialogActions>
          {itemsForSelection?.map((item) => (
            <Button key={item.id} onClick={() => onClick(item)}>
              {item.name}
            </Button>
          ))}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
  const labelValue =
    typeof context === 'string' ? context : context?.pageContext;
  useEffect(() => {
    const buttonSizeMap = {
      xs: 'extraSmall',
      sm: 'small',
      md: 'medium',
      lg: 'large', // Adjust if there's another size you want for 'l'
    };
    const size = buttonSizeMap[cardSize] || 'medium'; // Default to 'medium' if size is not defined
    // console.log('SETTING BUTTON SIZE TO ', size);
    setButtonSize(size);
  }, [cardSize]);

  return (
    <React.Fragment>
      {renderSelectionDialog()}
      {/* <MDBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          height: '100%',
          width: '100%',
          // m: 'auto',
        }}
      > */}
      {renderFullWidthAddButton(
        isLoading,
        buttonSize,
        isModalOpen,
        labelValue,
        cardSize,
        context,
        card,
        page,
        onClick,
        closeModal,
        setIsLoading,
        setIsLoadingApiResponse,
        onSuccess,
        onFailure
      )}
      {/* </MDBox> */}
    </React.Fragment>
  );
};

export default GenericActionButtons;
