import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import SearchBar from '../components/search/SearchBar';
import ProductGrid from '../components/grids/storeSearchResultsGrid/ProductGrid';
import { useCardStore } from '../context/CardContext/CardStore';
import { useCartStore } from '../context/CartContext/CartContext';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';

const StoreBanner = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
`;

const StoreTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchContainer = () => {
  return (
    <Grid item xs={12}>
      <SearchBar />
    </Grid>
  );
};

const CardContainer = () => {
  return (
    <Grid item xs={12}>
      <ProductGrid />
    </Grid>
  );
};

const StorePage = () => {
  const [cookies] = useCookies(['userCookie']);
  const { fetchUserCart, loading, error } = useCartStore();
  const { searchData } = useCardStore();

  const userId = cookies.userCookie?.id;

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
    <StoreBanner>
      <StoreTitle>Store</StoreTitle>
      <Grid container>
        <SearchContainer />
        <CardContainer />
      </Grid>
    </StoreBanner>
  );
};

export default StorePage;
