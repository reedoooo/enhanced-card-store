import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import MDTypography from './MDTYPOGRAPHY/MDTypography';
import { getContextIcon } from './icons/index';
import { useSnackbar } from 'notistack';
import GlassyIcon from './icons/GlassyIcon';
import MDBox from './MDBOX';
import LoadingOverlay from './system-utils/LoadingOverlay';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useMode } from '../../context';
import { useLoading } from '../../context/hooks/useLoading';
import { LoadingButton } from '@mui/lab';
import useManager from '../../context/MAIN_CONTEXT/CollectionContext/useManager';

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
  // const { isLoading } = useSelector('loadingStates', { defaultEntities: {} });
  const { isLoading } = useLoading();
  const adjustedButtonSize = variant === 'data-table' ? 'small' : buttonSize;
  const actionIcon =
    actionType === 'add' ? (
      <AddCircleOutlineOutlined />
    ) : (
      <RemoveCircleOutlineOutlined />
    );
  const loadingKey =
    actionType === 'add' ? 'addCardsToCollection' : 'removeCardsFromCollection';

  return (
    <LoadingButton
      variant={'contained'}
      // color={actionType === 'add' ? 'success.main' : 'error'}
      size={adjustedButtonSize}
      loading={isLoading(`${actionType}Cards`)}
      // loading={isLoading(loadingKey)}
      onClick={handleCardAction}
      startIcon={actionIcon}
      sx={{
        width: '100%',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
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
      }}
    >
      <MDTypography
        variant="button"
        sx={{
          color:
            theme.palette[labelValue === 'add' ? 'success' : 'error']
              .contrastText,
        }}
      >
        {String(labelValue)} {/* Force conversion to string */}
      </MDTypography>
    </LoadingButton>
  );
};
const GenericActionButtons = ({
  card,
  selectedId,
  // selectedEnt,
  context = 'Collection',
  onClick,
  onSuccess,
  onFailure,
  page,
  cardSize = 'md',
  datatable = false,
}) => {
  const { theme } = useMode();
  const { enqueueSnackbar } = useSnackbar(); // Add this line to use Notistack
  // const { selectedEntity, selectedEntityId } = useSelector(
  //   context.toLowerCase()
  // );
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
    fetchDecks,
    setDecks,
    allDecks,
    selectedCollectionId,
    selectedDeckId,
    selectedCartId,
  } = manager;
  // const updateDecksState = useCallback((updatedDeck) => {
  //   setDecks((prevDecks) =>
  //     prevDecks.map((deck) =>
  //       deck._id === updatedDeck._id ? updatedDeck : deck
  //     )
  //   );
  // }, []);
  // const selectedEntity = entities[context?.toLowerCase()]; // dynamically access the right context
  // const addEnt = addOrUpdateEntity[context];
  // const removeEnt = removeEntity[context];
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
            break;
          case 'Deck':
            if (actionType === 'add') {
              console.log(card);
              addItemToDeck(card);
            } else {
              removeItemFromDeck(card);
            }
            break;
          case 'Cart':
            if (actionType === 'add') {
              addItemToCart(card);
            } else {
              removeItemFromCart(card);
            }
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
      {datatable === 'data-table' && (
        <MDBox
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '20%', // Adjusting to occupy the desired space, may vary based on layout
            height: '100%', // Full height for alignment with siblings
            borderRadius: '8px', // Smoother corners for a subtle glass effect
            background: 'rgba(255, 255, 255, 0.4)', // Lighter background for a frosted glass look
            boxShadow: `
          inset 0 0 10px rgba(12, 134, 223, 0.5), 
          0 0 15px rgba(12, 134, 223, 0.5)
        `, // Softer blue glow
            backdropFilter: 'blur(5px)', // Reduced blur for a clearer effect
            overflow: 'hidden', // Ensure contents do not overflow rounded corners
            transition: 'all 0.3s ease', // Smooth transition for hover effects
            '&:hover': {
              transform: 'scale(1.05)', // Slight scale on hover for interactivity
              boxShadow: `
            inset 0 0 12px rgba(12, 134, 223, 0.6), 
            0 0 20px rgba(12, 134, 223, 0.6)
          `, // Intensify glow on hover
            },
          }}
        >
          <MDTypography variant="button" color="white" sx={{ color: 'white' }}>
            <GlassyIcon
              Icon={getContextIcon(context)}
              iconColor="#FFFFFF"
              size={160}
            />
          </MDTypography>
        </MDBox>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: datatable ? 0 : 1,
          width: '100%',
          my: theme.spacing(1),
        }}
      >
        <ActionButton
          action="add"
          buttonSize={buttonSize}
          // handleCardAction={() =>
          //   handleAction('add', card, context, selectedEntity)
          // }
          handleCardAction={() => handleAction('add')}
          labelValue={'add'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={datatable ? 'data-table' : 'card'}
          actionType="add"
          // selectedEntity={selectedEntity}
        />
        <ActionButton
          action="remove"
          buttonSize={buttonSize}
          handleCardAction={() => handleAction('remove')}
          // handleCardAction={() =>
          //   handleAction('remove', card, context, selectedEntity)
          // }
          labelValue={'remove'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={datatable ? 'data-table' : 'card'}
          actionType="remove"
          // selectedEntity={selectedEntity}
        />
      </Box>
    </Box>
  );
};

export default GenericActionButtons;
