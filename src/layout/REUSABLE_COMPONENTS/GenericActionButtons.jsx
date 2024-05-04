import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import LoadingOverlay from './system-utils/LoadingOverlay';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useMode } from 'context';
import useLoading from 'context/hooks/useLoading';
import { LoadingButton } from '@mui/lab';
import useManager from 'context/useManager';

const buttonSizeMap = {
  xs: 'extraSmall',
  sm: 'small',
  md: 'medium',
  lg: 'large',
};
const ActionButton = ({
  buttonSize,
  handleCardAction,
  labelValue,
  actionType,
  variant,
}) => {
  const { theme } = useMode();
  const { isLoading } = useLoading();
  const isDataTable = variant === 'data-table';
  const actionIcon =
    actionType === 'add' ? (
      <AddCircleOutlineOutlined
        sx={{ ml: isDataTable ? '8px !important' : 1 }}
      />
    ) : (
      <RemoveCircleOutlineOutlined
        sx={{ ml: isDataTable ? '8px !important' : 1 }}
      />
    );
  return (
    <LoadingButton
      variant={'contained'}
      size={isDataTable ? 'small' : buttonSize}
      loading={isLoading(`${actionType}Cards`)}
      onClick={handleCardAction}
      startIcon={actionIcon}
      sx={{
        width: isDataTable ? 'auto' : '100%',
        height: isDataTable ? 30 : 'auto', // Ensure consistent height for datatable variant
        minWidth: isDataTable ? 20 : 'auto', // Ensure a minimal width when icon only
        flexGrow: 1,
        borderRadius: theme.borders.borderRadius.xxl,
        maxWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor:
          labelValue === 'add'
            ? theme.palette.success.main
            : theme.palette.error.main,
        '&:hover': {
          backgroundColor: labelValue === 'add' ? '#3da58a' : '#cc4a4aff',
        },
        ...(isDataTable && {
          minWidth: theme.spacing(5),
        }),
      }}
    >
      {!isDataTable && (
        <Box
          component="span"
          sx={{
            color:
              theme.palette[labelValue === 'add' ? 'success' : 'error']
                .contrastText,
          }}
        >
          {labelValue}
        </Box>
      )}
    </LoadingButton>
  );
};
const GenericActionButtons = ({
  card,
  context = 'Collection',
  cardSize = 'md',
  datatable = false,
}) => {
  const { theme } = useMode();
  const { enqueueSnackbar } = useSnackbar(); // Add this line to use Notistack
  const manager = useManager();
  if (!manager) {
    return <LoadingOverlay />;
  }
  const {
    addItemToCart,
    removeItemFromCart,
    addItemToCollection,
    removeItemFromCollection,
    addItemToDeck,
    removeItemFromDeck,
    setHasUpdatedCards,
    selectedCollectionId,
    selectedDeckId,
    selectedCartId,
  } = manager;

  const handleAction = useCallback(
    (actionType) => {
      try {
        switch (context) {
          case 'Collection':
            if (actionType === 'add') {
              addItemToCollection(card);
            } else {
              removeItemFromCollection(card);
            }
            setHasUpdatedCards(true);

            break;
          case 'Deck':
            if (actionType === 'add') {
              console.log(card);
              addItemToDeck(card);
            } else {
              removeItemFromDeck(card);
            }
            setHasUpdatedCards(true);

            break;
          case 'Cart':
            if (actionType === 'add') {
              addItemToCart(card);
            } else {
              removeItemFromCart(card);
            }
            setHasUpdatedCards(true);

            break;
          default:
            throw new Error('Invalid context');
        }
        enqueueSnackbar(`Card ${actionType}ed in ${context}`, {
          variant: 'success',
        });
      } catch (error) {
        console.error(`Error with ${actionType} card in ${context}:`, error);
        enqueueSnackbar(`Failed to ${actionType} card in ${context}`, {
          variant: 'error',
        });
      }
    },
    [
      enqueueSnackbar,
      context,
      card,
      addItemToCollection,
      removeItemFromCollection,
      addItemToDeck,
      removeItemFromDeck,
      addItemToCart,
      removeItemFromCart,
      selectedCollectionId,
      selectedDeckId,
      selectedCartId,
      addItemToCart,
      removeItemFromCart,
      addItemToCollection,
      removeItemFromCollection,
      addItemToDeck,
      removeItemFromDeck,
    ]
  );
  const [buttonSize, setButtonSize] = useState(
    buttonSizeMap[cardSize] || 'medium'
  );
  useEffect(() => {
    setButtonSize(buttonSizeMap[cardSize] || 'medium');
  }, [cardSize]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: buttonSize === 'extraSmall' ? 'column' : 'row',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: datatable ? 'row' : 'column',
          alignItems: 'center',
          gap: datatable ? 0 : 1,
          width: '100%',
          my: theme.spacing(1),
        }}
      >
        <ActionButton
          action="add"
          buttonSize={buttonSize}
          handleCardAction={() => handleAction('add')}
          labelValue={'add'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={datatable ? 'data-table' : 'card'}
          actionType="add"
        />
        <ActionButton
          action="remove"
          buttonSize={buttonSize}
          handleCardAction={() => handleAction('remove')}
          labelValue={'remove'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={datatable ? 'data-table' : 'card'}
          actionType="remove"
        />
      </Box>
    </Box>
  );
};

export default GenericActionButtons;
