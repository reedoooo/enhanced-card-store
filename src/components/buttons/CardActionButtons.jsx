import React from 'react';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: '#f1f1f1',
    borderRadius: '8px',
  },
  quantityBox: {
    width: '100%',
    backgroundColor: '#eee',
    padding: '8px',
    borderRadius: '4px',
    textAlign: 'center',
  },
  buttonGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  button: {
    flex: 1,
    height: '40px',
    padding: '4px',
    fontSize: '18px',
    overflow: 'auto',
    borderRadius: '4px',
  },
  fullWidthButton: {
    width: '100%',
    height: '40px',
    padding: '12px',
    fontSize: '16px',
    marginTop: '16px',
    borderRadius: '4px',
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
  console.log(`In ${context}: ${quantity}`);
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
