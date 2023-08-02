import React, { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import { CartContext } from '../../context/CartContext/CartContext';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {}, // Default styles go here
});

const CartActionButtons = ({ card, productQuantity }) => {
  const classes = useStyles();
  const { addOneToCart, deleteFromCart, removeOneFromCart } =
    useContext(CartContext);

  return (
    <div className={classes.root}>
      {productQuantity > 0 ? (
        <>
          <Grid container>
            <Grid item xs={6}>
              In Cart: {productQuantity}
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => addOneToCart(card)}>+</Button>
              <Button onClick={() => removeOneFromCart(card)}>-</Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteFromCart(card)}
          >
            Remove from cart
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => addOneToCart(card)}
        >
          Add To Cart
        </Button>
      )}
    </div>
  );
};

export default CartActionButtons;
