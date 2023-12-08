import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import SearchBar from '../components/search/SearchBar';
import ProductGrid from '../components/grids/storeSearchResultsGrid/ProductGrid';
import { useCardStore } from '../context/CardContext/CardStore';
import { useCartStore } from '../context/CartContext/CartContext';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import { useMode } from '../context/hooks/colormode';
import { useUserContext } from '../context/UserContext/UserContext';
import HeroCenter from './pageStyles/HeroCenter';
import { usePageContext } from '../context/PageContext/PageContext';

const StorePage = () => {
  const { theme } = useMode();
  const { fetchUserCart, cartData } = useCartStore();
  const { searchData, slicedSearchData, slicedAndMergedSearchData } =
    useCardStore();
  const { user, setUser } = useUserContext();
  const {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    logPageData,
  } = usePageContext();

  const userId = user?.id;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!userId) return;

  //     if (!cartData?.cart || cartData?.cart?.length === 0) {
  //       setIsPageLoading(true);
  //       // return;
  //     }
  //     try {
  //       // fetchUserCart();
  //       if (searchData.length > 0 && slicedAndMergedSearchData !== null) {
  //         logPageData('StorePage', slicedAndMergedSearchData);
  //       }
  //     } catch (error) {
  //       console.error('Failed to get user cart', error);
  //       setPageError(error);
  //     } finally {
  //       setIsPageLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;

  return (
    <React.Fragment>
      <HeroCenter
        title="Welcome to Store"
        subtitle="Search for cards and add them to your cart."
      />
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(3),
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Grid item xs={12}>
          <SearchBar />
        </Grid>{' '}
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <ProductGrid />
        </Grid>{' '}
      </Grid>
    </React.Fragment>
  );
};

export default StorePage;
