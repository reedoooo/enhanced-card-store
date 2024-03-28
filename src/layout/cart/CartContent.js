import React from 'react';
import { Typography, Skeleton, Box, Grid, Container } from '@mui/material';
import { useCartStore } from '../../context/MAIN_CONTEXT/CartContext/CartContext';
import { useMode, useUserContext } from '../../context';
import GenericCard from '../../components/cards/GenericCard';

const CartContent = () => {
  const { theme } = useMode();
  const { cartData, isLoading } = useCartStore();

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.backgroundB.lightest,
        borderRadius: '5px',
        padding: '0.5rem',
        overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
          padding: '1rem',
        },
        [theme.breakpoints.up('md')]: {
          padding: '1.5rem',
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: theme.palette.text.primary,
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.75rem',
          },
        }}
      >
        Your Cart
      </Typography>
      <Container
        sx={{
          // ...theme.responsiveStyles.getProductGridContainerStyle,
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Grid container spacing={3}>
          {cartData?.cart?.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {console.log(card)}
              <GenericCard
                key={card.id + index}
                index={index}
                card={card}
                page={'Cart'}
                context={'Cart'}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CartContent;
