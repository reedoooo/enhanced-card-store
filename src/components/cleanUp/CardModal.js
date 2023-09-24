// import React, { useContext } from 'react';
// import {
//   Box,
//   Button,
//   CardMedia,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Typography,
// } from '@mui/material';
// import {
//   FaDragon,
//   FaLevelUpAlt,
//   FaRegCopy,
//   FaRegLightbulb,
//   FaShieldAlt,
//   FaVenusMars,
// } from 'react-icons/fa';
// import { makeStyles } from '@mui/styles';
// import placeholderImage from '../../../assets/placeholder.jpeg';
// import {
//   CartContext,
//   useCartStore,
// } from '../../../context/CartContext/CartContext';
// import CardDetailsContainer from './CardDetailsContainer';
// import CollectionActionButtons from '../../buttons/CollectionActionButtons';
// import GenericActionButtons from '../../buttons/GenericActionButtons';
// import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
// import CollectionDialog from '../../dialogs/CollectionDialog';

// const useStyles = (context) =>
//   makeStyles((theme) => ({
//     actionButtons: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       gap: '1.5rem',
//     },
//     media: {
//       objectFit: 'cover',
//       borderRadius: '4px',
//       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     },
//     details: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1.5rem',
//       marginBottom: '1.5rem',
//     },
//     dialogTitle: {
//       fontSize: '1.5rem',
//       fontWeight: 600,
//       color: theme.palette.primary.dark,
//     },
//     dialogContent: {
//       padding: '2rem',
//     },
//   }));

// const CardModal = ({ isOpen, onClose, card, context }) => {
//   const classes = useStyles();
//   const { getCardQuantity } = useContext(CartContext);
//   const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
//   const productQuantity = getCardQuantity(card?.id);

//   return (
//     <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle className={classes.dialogTitle}>{card?.name}</DialogTitle>
//       <DialogContent className={classes.dialogContent}>
//         <Grid container spacing={4}>
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             container
//             direction="column"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <CardMedia
//               component="img"
//               alt={card?.name}
//               className={classes.media}
//               image={imgUrl}
//               height="300"
//             />
//             <GenericActionButtons
//               card={card}
//               // storeHook={useCartStore}
//               context={context}
//               label="In Cart"
//               className="some-cart-class"
//             />
//             <GenericActionButtons
//               card={card}
//               // storeHook={useCollectionStore}
//               dialogComponent={CollectionDialog}
//               context={context}
//               label="In Collection"
//               className="some-collection-class"
//             />
//             {/* <CartActionButtons
//               card={card}
//               productQuantity={productQuantity}
//               className={classes.actionButtons}
//             />
//             <CollectionActionButtons
//               card={card}
//               productQuantity={productQuantity}
//               className={classes.actionButtons}
//             /> */}
//           </Grid>
//           <Grid item xs={12} sm={6} container direction="column">
//             <CardDetailsContainer card={card} className={classes.details} />
//           </Grid>
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CardModal;
