import React from 'react';
import { Typography, Skeleton, Box, Grid, Container } from '@mui/material';
import { useMode } from '../../context';
import GenericCard from '../../components/cards/GenericCard';
import { useCartManager } from '../../context/MAIN_CONTEXT/CartContext/useCartManager';

const CartContent = () => {
  const { theme } = useMode();
  const { cart } = useCartManager();

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.grey.lighterSimpleGrey,
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
          {cart?.items?.map((card, index) => (
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
