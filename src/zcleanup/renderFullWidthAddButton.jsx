// import React, { useCallback, useEffect, useMemo } from 'react';
// import { Box } from '@mui/material';
// import { useMode } from '../../../context';
// import { getContextIcon } from '../../../components/reusable/icons/index';
// import AddButton from './AddButton';
// import RemoveButton from './RemoveButton';
// import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import { useCardActions } from '../../../context/hooks/useCardActions';
// import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
// import { useCartStore } from '../../../context/MAIN_CONTEXT/CartContext/CartContext';
// import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// import useCollectionManager from '../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
// import { DEFAULT_COLLECTION } from '../../../context/constants';

// // Utility function for deriving label and variant
// export const renderFullWidthAddButton = (
//   buttonSize,
//   labelValue,
//   context,
//   card,
//   page,
//   onClick,
//   closeModal,
//   onSuccess,
//   onFailure,
//   cardSize
// ) => {
//   const currentContextIcon = getContextIcon(labelValue);
//   const stackDirection = buttonSize === 'extraSmall' ? 'column' : 'row';
//   const { addOneToCollection, removeOneFromCollection } =
//     useCollectionManager();
//   const { selectedCollection, allCollections, handleSelectCollection } =
//     useSelectedCollection();
//   const {
//     addOneToDeck,
//     removeOneFromDeck,
//     selectedDeck,
//     allDecks,
//     setSelectedDeck,
//   } = useDeckStore();
//   const { addOneToCart, removeOneFromCart, cartData } = useCartStore();
//   useEffect(() => {
//     if (context === 'Deck' && !selectedDeck && allDecks?.length > 0) {
//       console.warn('No deck selected. Defaulting to first deck.');
//       setSelectedDeck(allDecks[0]);
//     }
//     if (
//       (context === 'Collection' && !selectedCollection) ||
//       selectedCollection === null ||
//       selectedCollection === DEFAULT_COLLECTION ||
//       !allCollections?.length > 0
//     ) {
//       console.warn('No collection selected. Defaulting to first collection.');
//       // handleSelectCollection(allCollections[0]);
//     }
//   }, [
//     context,
//     selectedCollection,
//     allCollections,
//     selectedDeck,
//     allDecks,
//     cartData,
//   ]);
//   const addActions = useMemo(() => {
//     Collection: addOneToCollection;
//     Deck: addOneToDeck;
//     Cart: addOneToCart;
//     return addActions;
//   }, [addOneToCollection, addOneToDeck, addOneToCart]);
//   const removeActions = useMemo(() => {
//     Collection: removeOneFromCollection;
//     Deck: removeOneFromDeck;
//     Cart: removeOneFromCart;
//     return removeActions;
//   }, [removeOneFromCollection, removeOneFromDeck, removeOneFromCart]);

//   const handleCardActionsAtContext = useCallback(
//     (context, card) => {
//       switch (context) {
//         case 'Collection':
//           handleSelectCollection(card);
//           break;
//         case 'Deck':
//           setSelectedDeck(card);
//           break;
//         case 'Cart':
//           addOneToCart(card);
//           break;
//         default:
//           break;
//       }
//     },
//     [addOneToCart, handleSelectCollection, setSelectedDeck]
//   );
//   const { performAction, count } = useCardActions(
//     context,
//     card,
//     selectedCollection,
//     selectedDeck,
//     addOneToCollection,
//     removeOneFromCollection,
//     addOneToDeck,
//     removeOneFromDeck,
//     addOneToCart,
//     removeOneFromCart,
//     onSuccess,
//     onFailure,
//     page
//   );
//   const handleCardAction = useCallback(
//     async (actionType) => {
//       console.log('SET LOADING FOR ', actionType);
//       console.log('SET LOADING RESPONSE FOR CARD ', card);
//       // onClick?.();
//       performAction(actionType);
//       closeModal?.();
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         if (actionType === 'add') {
//           console.log(`Adding ${card?.name} to ${labelValue}`);

//           onSuccess?.();
//         } else if (actionType === 'remove') {
//           console.log(`Removing ${card?.name} from ${labelValue}`);
//           performAction(actionType);

//           onSuccess?.();
//         }
//       } catch (error) {
//         console.error('Action failed:', error);
//         onFailure?.(error);
//       } finally {
//         console.log('SET LOADING RESPONSE FOR CARD ', card);
//         // closeModal();
//       }
//     },
//     [card, labelValue, onSuccess, onFailure, closeModal]
//   );

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         width: '100%',
//         flexGrow: 1, // Grow to fill the parent container
//         flexDirection: stackDirection, // Dynamically set based on button size
//         alignItems: 'center',
//         gap: 1,
//       }}
//     >
//       <MDTypography
//         variant="button"
//         color="white"
//         sx={{
//           color: 'white',
//         }}
//       >
//         {currentContextIcon || ''}
//       </MDTypography>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 1,
//           width: '100%',
//         }}
//       >
//         <AddButton
//           buttonSize={buttonSize}
//           handleCardAction={handleCardAction}
//           labelValue={labelValue}
//           action={'add'}
//         />
//         <RemoveButton
//           buttonSize={buttonSize}
//           handleCardAction={handleCardAction}
//           labelValue={labelValue}
//           action={'remove'}
//         />
//       </Box>
//     </Box>
//   );
// };
