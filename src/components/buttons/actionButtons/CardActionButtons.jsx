import React, { useCallback } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  CardActions,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useStyles } from '../buttonStyles';
import useAppContext from '../../../context/hooks/useAppContext';
import { useMode } from '../../../context/hooks/colormode';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import Logger from '../../reusable/Logger';
import { useDeckStore } from '../../../context/DeckContext/DeckContext';
import { useCartStore } from '../../../context/CartContext/CartContext';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import DeleteIcon from '@material-ui/icons/Delete';
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
  // const { contextProps, isContextAvailable } = useAppContext(context);
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const isSmallCard = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumCard = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMediumLargeCard = useMediaQuery(
    theme.breakpoints.between('md', 'lg')
  );
  // const isLargeCard = useMediaQuery(theme.breakpoints.up('lg'));

  // ...other hooks and variables

  // Adjust button size and styles based on screen and card size
  const buttonSize = isSmallCard ? 'small' : isMediumCard ? 'medium' : 'large';
  const buttonStyle = {
    padding: buttonSize === 'small' ? theme.spacing(1) : theme.spacing(2),
    fontSize: buttonSize === 'small' ? 'small' : 'default',
    // Add other style adjustments as needed
  };

  const { addOneToCollection, removeOneFromCollection, selectedCollection } =
    useCollectionStore();
  const { addOneToDeck, removeOneFromDeck, selectedDeck } = useDeckStore();
  const { addOneToCart, removeOneFromCart, cartData } = useCartStore();

  const isCardInContext = useCallback(() => {
    switch (context) {
      case 'Collection':
        return !!selectedCollection?.cards?.find((c) => c?.id === card?.id);
      case 'Deck':
        return !!selectedDeck?.cards?.find((c) => c?.id === card?.id);
      case 'Cart':
        return !!cartData?.cart?.find((c) => c?.id === card?.id);
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
      padding: theme.spacing(1), // Using theme spacing
      backgroundColor: theme.palette.background.paper, // Using theme background color
    },
    grid: {
      flexGrow: 1,
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
      borderRadius: '0.5rem',
    },
    addButton: {
      margin: theme.spacing(1), // Using theme spacing
      color: theme.palette.success.contrastText, // Using theme text color
      backgroundColor: theme.palette.success.main, // Using theme background color
      borderRadius: '0.5rem',
      // width: '100%',
      // flexGrow: 1,
      // action: {
      //   hover: {
      //     backgroundColor: theme.palette.success.dark, // Using theme background color
      //     // color: theme.palette.success.contrastText, // Using theme text color
      //   },
      // },
      // hover: {
      //   backgroundColor: theme.palette.success.dark, // Using theme background color
      //   // color: theme.palette.success.contrastText, // Using theme text color
      // },
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
              addOneToCollection(card);
            } else if (action === 'removeOne') {
              removeOneFromCollection(card);
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // gap: theme.spacing(2),
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
      }}
    >
      <CardActions>
        {isInContext ? (
          <Grid container spacing={2}>
            {isMediumScreen ? (
              <Grid item xs={12}>
                {/* <CardActions> */}

                <Grid
                  item
                  xs={12}
                  sx={{
                    noWrap: true,
                    display: 'flex',
                    flexDirection: 'column',
                    // margin: 'auto',
                    // justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleAddClick}
                    startIcon={<AddCircleOutlineOutlined />}
                    sx={{
                      ...styles.addButton,
                      ...buttonStyle,
                      width: '100%',
                      flexGrow: 1,
                      // height: '100%',
                      // margin: 'auto',
                    }}
                  >
                    <Typography
                      variant={buttonSize === 'small' ? 'caption' : 'button'}
                    >
                      Add to {context}
                    </Typography>{' '}
                  </Button>
                  {/* </Grid> */}
                  {/* <Grid item xs={6}> */}
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleRemoveOne}
                    startIcon={<RemoveCircleOutlineOutlined />}
                    sx={{
                      ...styles.removeButton,
                      ...buttonStyle,
                      width: '100%',
                      flexGrow: 1,
                      // height: '100%',
                      // margin: 'auto',
                    }}
                  >
                    <Typography
                      variant={
                        isXSmallScreen
                          ? 'caption'
                          : isSmallScreen
                            ? 'body2'
                            : 'button'
                      }
                    >
                      Remove From {context}
                    </Typography>{' '}
                  </Button>
                </Grid>
                {/* </CardActions> */}
              </Grid>
            ) : (
              <>
                <Grid item xs={6}>
                  <IconButton
                    aria-label="increase"
                    onClick={handleAddClick}
                    sx={{ ...styles.addButton, flexGrow: 1 }}
                  >
                    <AddCircleOutlineOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    aria-label="decrease"
                    onClick={handleRemoveOne}
                    sx={{ ...styles.removeButton, flexGrow: 1 }}
                  >
                    <RemoveCircleOutlineOutlined />
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            sx={{ ...styles.addButton, width: '100%' }}
            startIcon={<AddCircleOutlineOutlined />}
            onClick={() => handleAddClick()}
          >
            <Typography
              variant={isSmallScreen ? 'body2' : 'button'} // Adjust text size based on breakpoint
            >
              Add to {context}
            </Typography>
          </Button>
        )}
      </CardActions>
    </Box>
  );
};

export default CardActionButtons;
