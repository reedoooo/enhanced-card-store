import React, { useCallback, useEffect } from 'react';
import { useModalContext } from '../../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useSelectionDialog } from '../../../context/hooks/useSelectionDialog';
import { useAppContext, useMode } from '../../../context';
import { renderFullWidthAddButton } from './renderFullWidthAddButton';
const GenericActionButtons = ({
  card,
  context = context || context?.pageContext,
  onClick, // New onClick prop for handling context selection
  onSuccess,
  onFailure,
  page,
  cardSize,
}) => {
  if (typeof context === 'undefined') {
    context = 'Collection';
  }
  const [isLoadingApiResponse, setIsLoadingApiResponse] = React.useState(false);
  const { closeModal, isModalOpen, setModalOpen } = useModalContext();
  const { theme } = useMode();
  const { selectedCollection, allCollections } = useCollectionStore();
  const { selectedDeck, allDecks } = useDeckStore();
  const { selectDialogOpen, itemsForSelection, setSelectDialogOpen } =
    useSelectionDialog(
      context,
      selectedCollection,
      selectedDeck,
      allCollections,
      allDecks
    );
  const [buttonSize, setButtonSize] = React.useState('medium');
  const [isLoading, setIsLoading] = React.useState(false);
  const renderSelectionDialog = () => (
    <Dialog open={selectDialogOpen} onClose={() => setSelectDialogOpen(false)}>
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.backgroundE.darker,
          color: theme.palette.text.primary,
        }}
      >
        Select a {context}
      </DialogTitle>
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
    setButtonSize(size);
  }, [cardSize]);

  return (
    <React.Fragment>
      {renderSelectionDialog()}
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
    </React.Fragment>
  );
};

export default GenericActionButtons;
