import React, { useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useModal } from '../../../context/hooks/modal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    background: '#f1f1f1',
    borderRadius: '8px',
  },
  buttonGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  fullWidthButton: {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
  },
}));

const CardActionButtons = ({
  card,
  quantity,
  context,
  contextProps,
  handleOpenDialog,
}) => {
  const classes = useStyles();

  const handleAddToContext = useCallback(() => {
    console.log(`Context is: ${context}`);
    const addMethod = contextProps[`addOneTo${context}`];
    if (typeof addMethod === 'function') {
      addMethod(card);
    } else if (context === 'Collection') {
      console.log(
        "Opening ChooseCollectionDialog because the context is 'Collection'"
      );
      handleOpenDialog();
    } else {
      console.error(`Method addOneTo${context} not found in contextProps`);
    }
  }, [context, contextProps, card, handleOpenDialog]);

  return (
    <div className={classes.root}>
      {quantity > 0 ? (
        <>
          <Grid container>
            <Grid item xs={6}>
              {`In ${context}: `} {quantity}
            </Grid>
            <Grid item xs={6} className={classes.buttonGrid}>
              <Button onClick={() => contextProps.addOne(card)}>+</Button>
              <Button onClick={() => contextProps.removeOne(card)}>-</Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className={classes.fullWidthButton}
            onClick={() => contextProps.removeAll(card)}
          >
            {`Remove from ${context}`}
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.fullWidthButton}
          onClick={handleAddToContext}
        >
          {`Add To ${context}`}
        </Button>
      )}
    </div>
  );
};

export default CardActionButtons;
