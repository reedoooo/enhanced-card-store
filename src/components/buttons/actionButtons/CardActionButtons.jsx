import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useStyles } from '../buttonStyles';
import useAppContext from '../../../context/hooks/useAppContext';
import { useMode } from '../../../context/hooks/colormode';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import Logger from '../../grids/collectionGrids/Logger';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import { useCartStore } from '../../../context/CartContext/CartContext';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from '@mui/icons-material';
const cardOtherLogger = new Logger([
  'Action',
  'Card Name',
  'Quantity',
  'Total Price',
]);
const CardActionButtons = ({
  card,
  context,
  closeModal,
  modifiedContextProps,
}) => {
  const { theme } = useMode(); // Using the theme hook

  const classes = useStyles();
  // const { contextProps, isContextAvailable } = useAppContext(context);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const { addOneToCollection, removeOneFromCollection, selectedCollection } =
    useCollectionStore();
  const { addOneToDeck, removeOneFromDeck, selectedDeck } = useDeckStore();
  const { addOneToCart, removeOneFromCart, cartData } = useCartStore();

  // modified to work with any context
  // Function to check if a card is in a specific context
  const isCardInContext = useCallback(() => {
    switch (context) {
      case 'Collection':
        return !!selectedCollection?.cards?.find(
          (c) => c?.card?.id === card?.id
        );
      case 'Deck':
        return !!selectedDeck?.cards?.find((c) => c?.card?.id === card?.id);
      case 'Cart':
        return !!cartData?.cart?.find((c) => c?.card?.id === card?.id);
      default:
        return false;
    }
  }, [card.id, context, selectedCollection, selectedDeck, cartData]);

  const isInContext = isCardInContext();

  const styles = {
    box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      width: '100%', // Using theme spacing
      padding: theme.spacing(2), // Using theme spacing
      backgroundColor: theme.palette.background.paper, // Using theme background color
    },
    grid: {
      // display: 'flex',
      flexGrow: 1,
      // flexDirection: 'column',
      width: '100%', // Using theme spacing
    },
    grid2: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      width: '100%', // Using theme spacing
      justifyContent: 'space-between',
    },
    button: {
      margin: theme.spacing(1), // Using theme spacing
      color: theme.palette.background.primary, // Using theme text color
      backgroundColor: theme.palette.success.main, // Using theme background color
    },
    removeButton: {
      margin: theme.spacing(1), // Using theme spacing
      color: theme.palette.error.contrastText, // Using theme text color
      backgroundColor: theme.palette.error.main, // Using theme background color
    },
    addButton: {
      margin: theme.spacing(1), // Using theme spacing
      color: theme.palette.success.contrastText, // Using theme text color
      backgroundColor: theme.palette.success.main, // Using theme background color
    },
    gridItem: {
      textAlign: 'center',
    },
  };
  const ADD = 'add';
  const REMOVE_ONE = 'removeOne';
  const REMOVE_ALL = 'removeAll';
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
              addOneToDeck(card);
            } else if (action === 'removeOne') {
              removeOneFromDeck(card);
            }
            break;
          case 'Cart':
            if (action === 'add') {
              addOneToCart(card);
            } else if (action === 'removeOne') {
              removeOneFromCart(card);
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
      addOneToDeck,
      removeOneFromDeck,
      addOneToCart,
      removeOneFromCart,
      context,
    ]
  );

  const handleAddClick = () => {
    console.log('handleAddClick', card, context);
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
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}
    >
      {isInContext ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <IconButton
              aria-label="increase"
              size="medium"
              sx={styles.addButton}
              onClick={() => handleAddClick()}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              aria-label="decrease"
              size="medium"
              sx={styles.removeButton}
              onClick={() => handleRemoveOne()}
            >
              <RemoveCircleOutlineOutlined />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          sx={{ ...styles.addButton, width: '100%' }}
          onClick={() => handleAddClick()}
        >
          Add to {context}
        </Button>
      )}
    </Box>
  );
};

export default CardActionButtons;
