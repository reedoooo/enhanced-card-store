import React, { useCallback, useEffect } from 'react';
import {
  Box,
  Stack,
  Button,
  Grid,
  Paper,
  Card,
  Typography,
} from '@mui/material';
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton'; // Assuming you're using MUI Lab for LoadingButton
import { useMode } from '../../../context';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import iconsWithButton, {
  getContextIcon,
} from '../../../components/reusable/icons/index';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { useCardActions } from '../../../context/hooks/useCardActions';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useCartStore } from '../../../context/MAIN_CONTEXT/CartContext/CartContext';
import { useSelectionDialog } from '../../../context/hooks/useSelectionDialog';

export const renderFullWidthAddButton = (
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
) => {
  const { theme } = useMode();
  const [buttonLabel, setButtonLabel] = React.useState('Add');
  const [buttonVariant, setButtonVariant] = React.useState('button');
  const labelTypeMap = {
    extraSmall: null,
    small: 'Add',
    medium: 'Add',
    large: `Add to ${labelValue}`,
  };
  const buttonVariantMap = {
    extraSmall: 'body4',
    small: 'body3',
    medium: 'body2',
    large: 'body4',
  };
  useEffect(() => {
    const label = labelTypeMap[buttonSize];
    // console.log('SETTING BUTTON LABEL', label);
    setButtonLabel(label);
    const variant = buttonVariantMap[buttonSize];
    // console.log('SETTING BUTTON VARIANT', variant);
    setButtonVariant(variant);
  }, [buttonSize]);
  const currentContextIcon = getContextIcon(labelValue);
  const stackDirection = buttonSize === 'extraSmall' ? 'column' : 'row';
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
    if (context === 'Deck' && !selectedDeck && allDecks?.length > 0) {
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
  const handleCardAction = useCallback(
    async (actionType) => {
      console.log('SET LOADING FOR ', actionType);

      setIsLoading(true);
      setIsLoadingApiResponse(true);
      onClick?.();
      performAction(actionType);
      closeModal?.();
      try {
        // Simulate API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (actionType === 'add') {
          console.log(`Adding ${card.name} to ${labelValue}`);

          onSuccess?.();
        } else if (actionType === 'remove') {
          console.log(`Removing ${card.name} from ${labelValue}`);
          performAction(actionType);

          onSuccess?.();
        }
      } catch (error) {
        console.error('Action failed:', error);
        onFailure?.(error);
      } finally {
        setIsLoading(false);
        setIsLoadingApiResponse(false);
        closeModal();
      }
    },
    [card, labelValue, onSuccess, onFailure, closeModal]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexGrow: 1, // Grow to fill the parent container
        flexDirection: stackDirection, // Dynamically set based on button size
        alignItems: 'center',
        gap: 1,
      }}
    >
      {/* <MDBox
      sx={{
        display: 'flex',
        flexGrow: 1, // Grow to fill the parent container
        flexDirection: stackDirection, // Dynamically set based on button size
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: theme.spacing(1),
      }}
    > */}
      {/* <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexGrow: 1, // Grow to fill the parent container
          flexDirection: stackDirection, // Dynamically set based on button size
          alignItems: 'center',
          gap: 1,
        }}
      > */}
      {/* <Box
        sx={{
          display: 'flex',
          flexGrow: 1, // Grow to fill the parent container
          flexDirection: 'column', // Buttons stack vertically
          justifyContent: 'center', // Center buttons horizontally
          alignItems: 'center', // Center buttons vertically
          width: '100%', // Take full width of the parent container
          height: '100%', // Take full height of the parent container
          padding: theme.spacing(1), // Use theme spacing for consistent padding
        }}
      > */}
      {/* <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* <MDBox> */}
      {/* <Grid
              item
              xs={4}
              sm={4}
              sx={{
                flexGrow: 1,
                borderRadius: theme.shape.borderRadius, // Use theme values for consistent styling
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            > */}
      {/* <MDBox
        sx={{
          display: 'flex',
          flexDirection: stackDirection, // Dynamically set based on button size
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: theme.spacing(1),
        }}
      > */}
      {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        > */}
      {/* <MDBox
        sx={{
          flexGrow: 1,
          // borderRadius: theme.shape.borderRadius, // Use theme values for consistent styling
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // width: '100%',
          height: '100%',
        }}
      > */}
      <MDTypography
        variant="button"
        color="white"
        sx={{
          color: 'white',
        }}
      >
        {' '}
        {currentContextIcon}
      </MDTypography>
      {/* </MDBox> */}
      {/* </Box> */}
      {/* </Grid> */}
      {/* <Grid item xs={8} sm={8}> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <AddButton
          isLoading={isLoading}
          buttonSize={buttonSize}
          handleCardAction={handleCardAction}
          buttonLabel={buttonLabel}
          buttonVariant={buttonVariant}
          labelValue={labelValue}
        />
        <RemoveButton
          isLoading={isLoading}
          buttonSize={buttonSize}
          handleCardAction={handleCardAction}
          buttonLabel={buttonLabel}
          buttonVariant={buttonVariant}
          labelValue={labelValue}
        />
      </Box>
      {/* </Box> */}

      {/* </Grid> */}
      {/* </MDBox> */}
      {/* </Box> */}
      {/* </MDBox> */}
      {/* </Grid>
          
        </Grid>
      </Grid> */}
      {/* </Box>
    </MDBox> */}
    </Box>
  );
};
