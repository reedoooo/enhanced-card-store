import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import HeroCenter from './pageStyles/HeroCenter';
import { useModalContext, useMode, usePageContext } from '../context';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';
import StoreSearch from '../layout/store/StoreSearch';
const StorePage = () => {
  const heroBannerHeight = {
    xs: '10vh', // 10% for extra-small screens
    sm: '15vh', // 20% for small screens and up
    md: '20vh', // 25% for medium screens and up
    lg: '25vh', // 30% for large screens and up
  };
  const { loadingStatus, returnDisplay } = usePageContext();
  const { closeModal, isModalOpen, modalContent } = useModalContext();
  return (
    <MDBox
      sx={{
        top: 0,
        left: -20,
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Grid container sx={{ height: '100vh', width: '100vw', p: 0 }}>
        {loadingStatus?.isPageLoading && returnDisplay()}

        <Grid
          item
          xs={12}
          sx={{
            height: heroBannerHeight,
            width: '100vw',
            top: '70px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              margin: 'auto',
              flexGrow: 1,
            }}
          >
            <HeroCenter
              title="Welcome to Store"
              subtitle="Search for cards and add them to your cart."
            />
          </Box>
        </Grid>
        <StoreSearch />
        {isModalOpen && (
          <GenericCardDialog
            open={isModalOpen}
            context={'Cart'}
            card={modalContent}
          />
        )}
      </Grid>
    </MDBox>
  );
};

export default StorePage;
{
  /* <Grid
          container
          sx={{
            padding: 2,
            width: '100%',
            minWidth: '99%',
            backgroundColor: theme.palette.backgroundB.default,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <MDBox>
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
          </MDBox>
        </Grid> */
}
