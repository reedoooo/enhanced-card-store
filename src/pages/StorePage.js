import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchBar from '../components/other/search/SearchBar';
import ProductGrid from '../components/grids/searchResultsGrids/ProductGrid';
import HeroCenter from './pageStyles/HeroCenter';
import { useModalContext, useMode } from '../context';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import { useGetSearchData } from '../context/hooks/useGetSearchData';
const StorePage = () => {
  const { theme } = useMode();
  const heroBannerHeight = {
    xs: '10vh', // 10% for extra-small screens
    sm: '15vh', // 20% for small screens and up
    md: '20vh', // 25% for medium screens and up
    lg: '25vh', // 30% for large screens and up
  };
  const itemsPerPage = 12;
  const { searchData, isLoading, uniqueCards } = useGetSearchData();
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { isModalOpen, modalContent } = useModalContext();
  return (
    <Box
      sx={{
        top: 0,
        left: -20,
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Grid container sx={{ height: '100vh', width: '100vw', p: 0 }}>
        <Grid
          item
          xs={12}
          sx={{
            height: heroBannerHeight,
            width: '100vw',
          }}
        >
          <HeroCenter
            title="Welcome to Store"
            subtitle="Search for cards and add them to your cart."
            sx={{
              transform: searchBarFocused
                ? 'translateY(-10%)'
                : 'translateY(0)',
              transition: 'transform 0.5s ease-in-out',
              willChange: 'transform',
              zIndex: 2,
            }}
          />
        </Grid>
        <Grid
          container
          sx={{
            padding: 2,
            width: '100%',
            minWidth: '99%',
            backgroundColor: theme.palette.backgroundB.default,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <SearchBar
            onSearchFocus={() => setSearchBarFocused(true)}
            onSearchBlur={() => setSearchBarFocused(false)}
          />
          <ProductGrid
            uniqueCards={uniqueCards}
            searchData={searchData}
            itemsPerPage={itemsPerPage}
            isLoading={isLoading}
          />
        </Grid>
        {isModalOpen && (
          <GenericCardDialog
            open={isModalOpen}
            context={'Cart'}
            card={modalContent}
          />
        )}
      </Grid>
    </Box>
  );
};

export default StorePage;
