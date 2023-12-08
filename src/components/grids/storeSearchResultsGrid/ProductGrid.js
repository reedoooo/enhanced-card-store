import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import GenericCard from '../../cards/GenericCard';
import { useCardStore } from '../../../context/CardContext/CardStore';
import StoreItem from '../StoreItem';
import { useCartStore } from '../../../context/CartContext/CartContext';
import CustomPagination from '../../reusable/CustomPagination';
import { Box } from '@mui/system';
import { useMode } from '../../../context';

const ProductGrid = () => {
  const { theme } = useMode();
  const {
    searchData,
    setSlicedAndMergedSearchData,
    slicedAndMergedSearchData,
    slicedSearchData,
    isCardDataValid,
  } = useCardStore();
  const { cart } = useCartStore();
  const [page, setPage] = useState(1);
  const [currentStoreSearchData, setCurrentStoreSearchData] = useState();

  const handlePagination = (event, value) => setPage(value);

  const itemsPerPage = 12;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  // const currentStoreSearchData = searchData?.slice(start, end);

  const mergedData = useMemo(() => {
    if (!isCardDataValid || !searchData) return null;

    return slicedSearchData.map((card) => {
      const cardId = parseInt(card.id, 10);
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
    if (!mergedData) return;
    setSlicedAndMergedSearchData(mergedData);
    setCurrentStoreSearchData(slicedAndMergedSearchData?.slice(start, end));
  }, [mergedData, setSlicedAndMergedSearchData]);

  return (
    <>
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
      <Box
        sx={{
          borderColor: theme.palette.success.dark,
        }}
      >
        <CustomPagination
          totalCount={searchData?.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          handlePagination={handlePagination}
        />
      </Box>
    </>
  );
};

export default React.memo(ProductGrid);
