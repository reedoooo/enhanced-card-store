import React, { useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { useCardStore } from '../../../context/CardContext/CardStore';
import StoreItem from '../StoreItem';
import { useCartStore } from '../../../context/CartContext/CartContext';

const ProductGrid = () => {
  const {
    searchData,
    setSlicedAndMergedSearchData,
    slicedAndMergedSearchData,
    slicedSearchData,
    isCardDataValid,
  } = useCardStore();
  const { cart } = useCartStore();

  if (!isCardDataValid) return null;

  const mergedData = useMemo(() => {
    return slicedSearchData.map((card) => {
      // Convert card ID from string to number for accurate comparison
      const cardId = parseInt(card.id, 10);
      // Find the cart item with a matching ID
      const cartItem = cart.find(
        (cartCard) => parseInt(cartCard.id, 10) === cardId
      );
      if (cartItem) {
        console.log('CART_ITEM: ', cartItem);
      }
      return cartItem ? cartItem : card; // Use cart item if it exists, else use original card data
    });
  }, [slicedSearchData, cart]);

  useEffect(() => {
    setSlicedAndMergedSearchData(mergedData);
  }, [mergedData, setSlicedAndMergedSearchData]);
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
        slicedAndMergedSearchData.map((card, index) => (
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
              page={'StorePage'}
              // onAddToCart={(cardId) => handleAddToCart(cardId)}
              // onQuantityChange={(cardId, operation) =>
              //   handleModifyItemInCart(cardId, operation)
              // }
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
