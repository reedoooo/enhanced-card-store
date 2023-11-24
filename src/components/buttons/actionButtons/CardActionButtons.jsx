import React, { useCallback } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useStyles } from '../buttonStyles';
import useAppContext from '../../../context/hooks/useAppContext';
import { useMode } from '../../../context/hooks/colormode';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import Logger from '../../grids/collectionGrids/Logger';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import { useCartStore } from '../../../context/CartContext/CartContext';
const cardOtherLogger = new Logger([
  'Action',
  'Card Name',
  'Quantity',
  'Total Price',
]);
const CardActionButtons = ({ card, context, closeModal }) => {
  const { theme } = useMode(); // Using the theme hook

  const classes = useStyles();
  const { contextProps, isContextAvailable } = useAppContext(context); // Changed to object destructuring
  const { addOneToCollection, removeOneFromCollection } = useCollectionStore();
  const { addToDeck, removeFromDeck } = useDeckStore();
  const { addToCart, removeFromCart } = useCartStore();
  // const { totalQuantity } = context[contextProps?.totalQuantity];
  // const { totalQuantity } = useCollectionStore();
  // if (!isContextAvailable || !contextProps) {
  //   console.error(`The component isn't wrapped with the ${context}Provider`);
  //   return <Box sx={{ color: 'error.main' }}>Context not available</Box>;
  // }

  const styles = {
    box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2), // Using theme spacing
      backgroundColor: theme.palette.background.paper, // Using theme background color
    },
    button: {
      margin: theme.spacing(1), // Using theme spacing
      color: theme.palette.background.primary, // Using theme text color
      backgroundColor: theme.palette.success.main, // Using theme background color
    },
    gridItem: {
      textAlign: 'center',
    },
  };
  const ADD = 'add';
  const REMOVE_ONE = 'removeOne';
  const REMOVE_ALL = 'removeAll';
  // const performAction = useCallback(
  //   (action, card) => {
  //     console.log(
  //       `action --> ${action}`,
  //       `payload --> ${card}`,
  //       `context --> ${context}`
  //     );
  //     try {
  //       if (context === 'Collection') {
  //         if (action === ADD) {
  //           addOneToCollection(card, card.id);
  //           cardOtherLogger.logCardAction('Add Card', card);
  //         } else if (action === REMOVE_ONE) {
  //           removeOneFromCollection(card, card.id);
  //           cardOtherLogger.logCardAction('Remove Card', card);
  //         }
  //       }
  //       // Additional context handling can be implemented here
  //     } catch (error) {
  //       console.error(
  //         `Error performing action '${action}' with payload`,
  //         card,
  //         error
  //       );
  //     }
  //   },
  //   [context, addOneToCollection, removeOneFromCollection, cardOtherLogger]
  // );

  const performAction = useCallback(
    (action, card) => {
      try {
        switch (context) {
          case 'Collection':
            if (action === 'add') {
              addOneToCollection(card, card.id);
            } else if (action === 'removeOne') {
              removeOneFromCollection(card, card.id);
            }
            break;
          case 'Deck':
            if (action === 'add') {
              addToDeck(card, card.id);
            } else if (action === 'removeOne') {
              removeFromDeck(card, card.id);
            }
            break;
          case 'Cart':
            if (action === 'add') {
              addToCart(card, card.id);
            } else if (action === 'removeOne') {
              removeFromCart(card, card.id);
            }
            break;
          default:
            console.error(`Unhandled context: ${context}`);
        }
        cardOtherLogger.logCardAction(`${action} Card`, card);
      } catch (error) {
        console.error(
          `Error performing action '${action}' with payload`,
          card,
          error
        );
      }
    },
    [
      addOneToCollection,
      removeOneFromCollection,
      addToDeck,
      removeFromDeck,
      addToCart,
      removeFromCart,
      context,
    ]
  );

  const handleAddClick = () => {
    console.log('handleAddClick', card);
    performAction(ADD, card);
    closeModal?.();
  };

  const handleRemoveOne = () => {
    performAction(REMOVE_ONE, card);
    closeModal?.();
  };

  const handleRemoveAll = () => {
    performAction(REMOVE_ALL, card);
    closeModal?.();
  };

  return (
    <Box sx={styles.box} onClick={closeModal}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={styles.gridItem}>
          {`In ${context}: `} {card.quantity}
        </Grid>
        <Grid item xs={6} sx={styles.gridItem}>
          <Button sx={styles.button} onClick={handleAddClick}>
            +
          </Button>
          <Button sx={styles.button} onClick={handleRemoveOne}>
            -
          </Button>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        sx={{ ...styles.button, width: '100%' }}
        onClick={handleRemoveAll}
      >
        {`Remove from ${context}`}
      </Button>
    </Box>
  );
};

export default CardActionButtons;
