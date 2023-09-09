// src/components/CartActionButtons.js
import React from 'react';
import { useCartStore } from '../../context/CartContext/CartContext';
import { makeStyles } from '@mui/styles';
import CardActionButtons from './CardActionButtons'; // Import the reusable component

const useStyles = makeStyles({
  root: {},
});

const CartActionButtons = ({ card, productQuantity }) => {
  const classes = useStyles();
  const { addOneToCart, deleteFromCart, removeOneFromCart } = useCartStore();

  return (
    <div className={classes.root}>
      <CardActionButtons
        card={card}
        quantity={productQuantity}
        addOne={addOneToCart}
        removeOne={removeOneFromCart}
        removeAll={deleteFromCart}
        context="Cart"
      />
    </div>
  );
};

export default CartActionButtons;
