// import React, { useCallback } from 'react';
// import {
//   Alert,
//   Box,
//   Button,
//   CardActions,
//   Grid,
//   IconButton,
//   Typography,
//   useMediaQuery,
// } from '@mui/material';
// import {
//   AddCircleOutlineOutlined,
//   RemoveCircleOutlineOutlined,
// } from '@mui/icons-material';
// import { useMode } from '../../../context/hooks/colormode';
// import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
// import { useDeckStore } from '../../../context/DeckContext/DeckContext';
// import { useCartStore } from '../../../context/CartContext/CartContext';
// import Logger from '../../reusable/Logger';
// const cardOtherLogger = new Logger([
//   'Action',
//   'Card Name',
//   'Quantity',
//   'Total Price',
// ]);

// const CardActionButtons = ({ card, context, closeModal, page }) => {
//   const { theme } = useMode();
//   const { addOneToCollection, removeOneFromCollection, selectedCollection } =
//     useCollectionStore();
//   const { addOneToDeck, removeOneFromDeck, selectedDeck, allDecks } =
//     useDeckStore();
//   const { addOneToCart, removeOneFromCart, cartData } = useCartStore();
//   const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const isCardInContext = useCallback(() => {
//     switch (context) {
//       case 'Collection':
//         return !!selectedCollection?.cards?.find((c) => c?.id === card?.id);
//       case 'Deck':
//         return !!selectedDeck?.cards?.find((c) => c?.id === card?.id);
//       case 'Cart':
//         return !!cartData?.cart?.find((c) => c?.id === card?.id);
//       default:
//         return false;
//     }
//   }, [card.id, context, selectedCollection, selectedDeck, cartData]);

//   const performAction = useCallback(
//     (action) => {
//       try {
//         if (context === 'Collection') {
//           if (!selectedCollection) {
//             <Alert variant="danger">
//               <Alert.Heading>
//                 No Collection Selected, Please Select A Collection
//               </Alert.Heading>
//               <p>
//                 Please select a collection to add cards to. You can do this by
//                 clicking one of the &quot;Deck Icon&quot; buttons in the
//                 dropdown menu.
//               </p>
//             </Alert>;
//           }
//           action === 'add'
//             ? addOneToCollection(card, selectedCollection)
//             : removeOneFromCollection(card, selectedCollection);
//         } else if (context === 'Deck') {
//           if (!selectedDeck) {
//             <Alert variant="danger">
//               <Alert.Heading>
//                 No Deck Selected, Please Select A Deck
//               </Alert.Heading>
//               <p>
//                 Please select a deck to add cards to. You can do this by
//                 clicking one of the &quot;Deck Icon&quot; buttons in the
//                 dropdown menu.
//               </p>
//             </Alert>;
//           }
//           action === 'add'
//             ? addOneToDeck(card, selectedDeck?._id || allDecks[0]?._id)
//             : removeOneFromDeck(selectedDeck?._id, card);
//         } else if (context === 'Cart' || context === 'Store') {
//           action === 'add' ? addOneToCart(card) : removeOneFromCart(card);
//         }

//         cardOtherLogger.logCardAction(`${action} Card`, card);
//       } catch (error) {
//         console.error(`Error performing '${action}' action`, error);
//       }
//     },
//     [
//       context,
//       card,
//       addOneToCollection,
//       removeOneFromCollection,
//       addOneToDeck,
//       removeOneFromDeck,
//       addOneToCart,
//       removeOneFromCart,
//     ]
//   );

//   const handleAddClick = () => {
//     performAction('add');
//     closeModal?.();
//   };
//   const handleRemoveOne = () => {
//     performAction('remove');
//     closeModal?.();
//   };
//   const getButtonLabel = () => {
//     if (isXSmallScreen) {
//       return ''; // No text for very small screens
//     } else if (isSmallScreen) {
//       return 'Add'; // Shortened text for small screens
//     } else {
//       return `Add to ${context}`; // Full text for larger screens
//     }
//   };

//   const buttonStyles = {
//     addButton: {
//       color: theme.palette.success.contrastText,
//       backgroundColor: theme.palette.success.main,
//       '&:hover': {
//         backgroundColor: theme.palette.success.darker,
//       },
//     },
//     removeButton: {
//       color: theme.palette.error.contrastText,
//       backgroundColor: theme.palette.error.main,
//       '&:hover': {
//         backgroundColor: theme.palette.error.dark,
//       },
//     },
//   };
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between', // This will ensure the button aligns to the bottom
//         alignItems: 'center',
//         height: '100%', // Set the height to 100% of the parent
//         width: '100%',
//         padding: 1,
//         backgroundColor: theme.palette.background.paper,
//       }}
//     >
//       <CardActions sx={{ alignSelf: 'flex-end', width: '100%' }}>
//         {isCardInContext() ? (
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <IconButton onClick={handleAddClick} sx={buttonStyles.addButton}>
//                 <AddCircleOutlineOutlined />
//               </IconButton>
//             </Grid>
//             <Grid item xs={6}>
//               <IconButton
//                 onClick={handleRemoveOne}
//                 sx={buttonStyles.removeButton}
//               >
//                 <RemoveCircleOutlineOutlined />
//               </IconButton>
//             </Grid>
//           </Grid>
//         ) : (
//           <Button
//             fullWidth
//             variant="contained"
//             color="secondary"
//             onClick={handleAddClick}
//             startIcon={<AddCircleOutlineOutlined />}
//             sx={{
//               ...buttonStyles.addButton,
//             }}
//           >
//             <Typography variant={isSmallScreen ? 'body2' : 'button'}>
//               {getButtonLabel()}
//             </Typography>
//           </Button>
//         )}
//       </CardActions>
//     </Box>
//   );
// };

// export default CardActionButtons;
