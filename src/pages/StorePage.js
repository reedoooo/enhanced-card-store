import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import SearchBar from '../components/search/SearchBar';
import ProductGrid from '../components/grids/storeSearchResultsGrid/ProductGrid';
import { useCardStore } from '../context/CardContext/CardStore';
import { useCartStore } from '../context/CartContext/CartContext';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import { StoreBanner, StoreTitle } from './pageStyles/StyledComponents';
import { themeSettings } from '../assets/themeSettings';
import { useMode } from '../context/hooks/colormode';

const SearchContainer = () => {
  return (
    <Grid item xs={12}>
      <SearchBar />
    </Grid>
  );
};

const CardContainer = () => {
  const { theme } = useMode();

  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: '100%',
      }}
    >
      <ProductGrid />
    </Grid>
  );
};

const HeroCenter3 = ({ decorative, title, subtitle, theme }) => (
  <Box
    sx={{
      flex: 1,
      height: '50vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2,
      my: 6,
      textAlign: 'center',
    }}
  >
    <Typography
      component="span"
      sx={{
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: 'sm',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }}
    >
      {decorative}
    </Typography>
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '4xl', sm: '5xl', md: '6xl' },
        fontWeight: 800,
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontSize: 'lg',
        color: 'text.secondary',
        maxWidth: '54ch',
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

HeroCenter3.defaultProps = {
  title: 'Welcome to Store',
  subtitle: 'Search for cards and add them to your cart.',
};

const StorePage = () => {
  const [cookies] = useCookies(['user']);

  const { theme } = useMode();
  const { fetchUserCart, loading, error } = useCartStore();
  const { searchData } = useCardStore();

  const userId = cookies?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchUserCart(userId).catch((err) =>
        console.error('Failed to get user cart', err)
      );
      console.log('(STORE PAGE) -- (SEARCHDATA):', searchData);
    }
  }, [userId, fetchUserCart]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  return (
    <React.Fragment>
      <HeroCenter3 theme={theme} />
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // maxWidth: '100vw',
          padding: theme.spacing(3),
          width: '100%',
          // margin: 'auto',
          // padding: theme.spacing(3),
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <SearchContainer />
        <CardContainer theme={theme} />
      </Grid>
    </React.Fragment>
  );
};

export default StorePage;
