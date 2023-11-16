import React, { useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { useStyles } from '../buttonStyles';
import useAppContext from '../../../context/hooks/useAppContext';

const CardActionButtons = ({ card, quantity, context, closeModal }) => {
  const classes = useStyles();
  const [contextProps, isContextAvailable] = useAppContext(context);

  if (!isContextAvailable) {
    console.error(`The component isn't wrapped with the ${context}Provider`);
    return null; // Consider rendering an error boundary or a user-friendly error message instead.
  }

  const ADD = 'add';
  const REMOVE_ONE = 'removeOne';
  const REMOVE_ALL = 'removeAll';

  // Action handler
  const performAction = useCallback(
    (action, payload) => {
      console.log(`action --> ${action}`, `payload --> ${payload}`);
      try {
        switch (action) {
          case ADD:
            contextProps[context][`addOneTo${context}`](payload);
            break;
          case REMOVE_ONE:
            contextProps[context].removeOne(payload);
            break;
          case REMOVE_ALL:
            contextProps[context].removeAll(payload);
            break;
          default:
            console.error(`Unhandled action type: ${action}`);
        }
      } catch (error) {
        console.error(
          `Error performing action '${action}' with payload`,
          payload,
          error
        );
      }
    },
    [context, contextProps]
  );

  const handleAddClick = () => {
    performAction(ADD, card);
    closeModal();
  };

  const handleClickOutside = () => {
    if (quantity === 0) {
      closeModal();
    }
  };

  return (
    <div className={classes.root} onClick={handleClickOutside}>
      {card.quantity > 0 ? (
        <>
          <Grid container>
            <Grid item xs={6}>
              {`In ${context}: `} {card.quantity}
            </Grid>
            <Grid item xs={6} className={classes.buttonGrid}>
              <Button onClick={() => performAction(ADD, card)}>+</Button>
              <Button onClick={() => performAction(REMOVE_ONE, card)}>-</Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className={classes.fullWidthButton}
            onClick={() => performAction(REMOVE_ALL, card)}
          >
            {`Remove from ${context}`}
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.fitWidthButton}
          onClick={(e) => {
            e.stopPropagation();
            handleAddClick();
          }}
        >
          {`Add To ${context}`}
        </Button>
      )}
    </div>
  );
};

export default CardActionButtons;
