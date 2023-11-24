import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { useCardStore } from '../../../context/CardContext/CardStore';
import StoreItem from '../StoreItem';
import { useCartStore } from '../../../context/CartContext/CartContext';

const ProductGrid = () => {
  const { searchData } = useCardStore();
  const { addOneToCart, removeOneFromCart } = useCartStore();

  const isCardDataValid = searchData && Array.isArray(searchData);

  const limitedCardsToRender = useMemo(
    () => (searchData ? Array.from(searchData).slice(0, 30) : []),
    [searchData]
  );

  const handleModifyItemInCart = async (cardId, operation) => {
    try {
      if (operation === 'add') {
        addOneToCart(cardId);
      } else if (operation === 'remove') {
        removeOneFromCart(cardId);
      }
    } catch (error) {
      console.error('Failed to adjust quantity in cart: ', error);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{
        maxWidth: '90%',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {isCardDataValid &&
        limitedCardsToRender.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`${card.id}-${index}`}
            sx={{
              padding: (theme) => theme.spacing(2),
              height: 'auto', // Set a specific value if required
              width: '100%',
            }}
          >
            {/* <GenericCard card={card} context="Cart" page="storepage" /> */}
            <StoreItem
              card={card}
              context={'Cart'}
              page={'storepage'}
              // onAddToCart={(cardId) => handleAddToCart(cardId)}
              onQuantityChange={(cardId, operation) =>
                handleModifyItemInCart(cardId, operation)
              }
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
