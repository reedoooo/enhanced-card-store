import React from 'react';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonGrid: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: '100%',
    padding: '4px',
  },
  fullWidthButton: {
    width: '100%',
    padding: '4px',
  },
}));

const CardActionButtons = ({
  card,
  quantity,
  addOne,
  removeOne,
  removeAll,
  context,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {quantity > 0 ? (
        <>
          <Grid container>
            <Grid item xs={6}>
              {`In ${context}: `} {quantity}
            </Grid>
            <Grid item xs={6} className={classes.buttonGrid}>
              <Button className={classes.button} onClick={() => addOne(card)}>
                +
              </Button>
              <Button
                className={classes.button}
                onClick={() => removeOne(card)}
              >
                -
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            className={classes.fullWidthButton}
            onClick={() => removeAll(card)}
          >
            {`Remove from ${context}`}
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.fullWidthButton}
          onClick={() => addOne(card)}
        >
          {`Add To ${context}`}
        </Button>
      )}
    </div>
  );
};

export default CardActionButtons;
