import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { useModalContext } from '../../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
import { getContextIcon } from '../../../layout/REUSABLE_COMPONENTS/icons/index';
import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import { useCartStore } from '../../../context/MAIN_CONTEXT/CartContext/CartContext';
import useCollectionManager from '../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import ActionButton from './ActionButton';
import { useSnackbar } from 'notistack';
import GlassyIcon from '../../../layout/REUSABLE_COMPONENTS/icons/GlassyIcon';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';

const buttonSizeMap = {
  xs: 'extraSmall',
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

const GenericActionButtons = ({
  card,
  context = 'Collection',
  onClick,
  onSuccess,
  onFailure,
  page,
  cardSize = 'md',
}) => {
  const { enqueueSnackbar } = useSnackbar(); // Add this line to use Notistack
  const { addOneToCollection, removeOneFromCollection } =
    useCollectionManager();
  const { selectedCollection, allCollections, handleSelectCollection } =
    useSelectedCollection();
  const {
    addOneToDeck,
    removeOneFromDeck,
    selectedDeck,
    allDecks,
    setSelectedDeck,
  } = useDeckStore();
  const { addOneToCart, removeOneFromCart, cartData } = useCartStore();
  const [buttonSize, setButtonSize] = useState(
    buttonSizeMap[cardSize] || 'medium'
  );
  const { closeModal } = useModalContext();
  useEffect(() => {
    setButtonSize(buttonSizeMap[cardSize] || 'medium');
  }, [cardSize]);
  const addActions = useMemo(
    () => ({
      Collection: addOneToCollection,
      Deck: addOneToDeck,
      Cart: addOneToCart,
    }),
    [addOneToCollection, addOneToDeck, addOneToCart]
  );
  const removeActions = useMemo(
    () => ({
      Collection: removeOneFromCollection,
      Deck: removeOneFromDeck,
      Cart: removeOneFromCart,
    }),
    [removeOneFromCollection, removeOneFromDeck, removeOneFromCart]
  );
  const handleAction = useCallback(
    async (action, cardData, currentContext) => {
      if (!cardData) {
        console.error('No card data provided.');
        enqueueSnackbar('Action failed.', { variant: 'error' });
        return;
      }
      console.log(
        `Action: ${action}, Card: ${cardData?.name}, Context: ${currentContext}`
      );
      // Dynamic action handling
      if (action === 'add' && addActions[currentContext]) {
        addActions[currentContext](cardData);
      } else if (action === 'remove' && removeActions[currentContext]) {
        removeActions[currentContext](cardData);
      }
    },
    [card, context, addActions, removeActions]
  );
  return (
    <ActionButtons
      buttonSize={buttonSize}
      card={card}
      context={context}
      page={page}
      handleCardAction={() => handleAction('add', card, context)}
    />
  );
};

const ActionButtons = ({
  buttonSize,
  card,
  context,
  page,
  handleCardAction,
}) => {
  const labelValue =
    typeof context === 'string' ? context : context?.pageContext;
  const stackDirection = buttonSize === 'extraSmall' ? 'column' : 'row';
  const currentContextIcon = getContextIcon(labelValue);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: stackDirection,
        alignItems: 'center',
        gap: 1,
        width: '100%',
        height: '100%',
      }}
    >
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
            Icon={currentContextIcon}
            iconColor="#FFFFFF"
            size={160}
            // gradientStartColor="#0C86DF"
            // gradientEndColor="#FFFFFF"
            // size={120}
            // blurAmount={75}
          />
        </MDTypography>
      </MDBox>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          width: '80%',
        }}
      >
        <ActionButton
          action="add"
          buttonSize={buttonSize}
          handleCardAction={handleCardAction}
          labelValue={'add'} // Assuming 'context' is intended to be used as 'labelValue'
        />
        <ActionButton
          action="remove"
          buttonSize={buttonSize}
          handleCardAction={handleCardAction}
          labelValue={'remove'} // Assuming 'context' is intended to be used as 'labelValue'
        />
      </Box>
    </Box>
  );
};

export default GenericActionButtons;

// import React, { useCallback, useEffect } from 'react';
// import { useModalContext } from '../../../context/UTILITIES_CONTEXT/ModalContext/ModalContext';
// import { renderFullWidthAddButton } from './renderFullWidthAddButton';
// import useSelectedContext from '../../../context/hooks/useSelectedContext';

// const GenericActionButtons = ({
//   card,
//   context = context || context?.pageContext,
//   onClick, // New onClick prop for handling context selection
//   onSuccess,
//   onFailure,
//   page,
//   cardSize,
// }) => {
//   if (typeof context === 'undefined') {
//     context = 'Collection';
//   }
//   const { closeModal, isModalOpen, setModalOpen } = useModalContext();
//   const { selectedCollection, allCollections } = useSelectedContext();
//   const [buttonSize, setButtonSize] = React.useState('medium');

//   const labelValue =
//     typeof context === 'string' ? context : context?.pageContext;
//   useEffect(() => {
//     const buttonSizeMap = {
//       xs: 'extraSmall',
//       sm: 'small',
//       md: 'medium',
//       lg: 'large', // Adjust if there's another size you want for 'l'
//     };
//     const size = buttonSizeMap[cardSize] || 'medium'; // Default to 'medium' if size is not defined
//     setButtonSize(size);
//   }, [cardSize]);

//   return (
//     <React.Fragment>
//       {renderFullWidthAddButton(
//         buttonSize,
//         isModalOpen,
//         labelValue,
//         cardSize,
//         context,
//         card,
//         page,
//         onClick,
//         closeModal,
//         onSuccess,
//         onFailure
//       )}
//     </React.Fragment>
//   );
// };

// export default GenericActionButtons;

// // const renderSelectionDialog = () => (
// //   <Dialog open={selectDialogOpen} onClose={() => setSelectDialogOpen(false)}>
// //     <DialogTitle
// //       sx={{
// //         backgroundColor: theme.palette.backgroundE.darker,
// //         color: theme.palette.text.primary,
// //       }}
// //     >
// //       <MDTypography variant="button" fontWeight="medium">
// //         Select a {context}
// //       </MDTypography>
// //     </DialogTitle>
// //     <DialogContent>
// //       <DialogActions>
// //         {itemsForSelection?.map((item) => (
// //           <Button key={item.id} onClick={() => onClick(item)}>
// //             {item.name}
// //           </Button>
// //         ))}
// //       </DialogActions>
// //     </DialogContent>
// //   </Dialog>
// // );
