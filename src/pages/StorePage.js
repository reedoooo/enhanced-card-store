import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import SearchBar from '../components/other/search/SearchBar';
import ProductGrid from '../components/grids/searchResultsGrids/ProductGrid';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import HeroCenter from './pageStyles/HeroCenter';
import { useModalContext, useMode, usePageContext } from '../context';
import { gridContainerStyles, gridItemStyles } from './pageStyles/styles';
import PageLayout from '../layout/PageLayout';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';

const StorePage = () => {
  const { theme } = useMode();
  const { setLoading, loadingStatus } = usePageContext();
  const [containerHeight, setContainerHeight] = useState(0);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { isModalOpen, modalContent } = useModalContext();

  const updateContainerHeight = (height) => {
    setContainerHeight(height);
  };

  return (
    <React.Fragment>
      <PageLayout>
        <Box
          sx={{
            flexGrow: 1,
            zIndex: -1,
            height: '100%',
            width: '100%',
            margin: '10%',
            background: theme.palette.background.dark,
          }}
        />
        <HeroCenter
          title="Welcome to Store"
          subtitle="Search for cards and add them to your cart."
          style={{
            transform: searchBarFocused ? 'translateY(-10%)' : 'translateY(0)',
            transition: 'transform 0.5s ease-in-out',
            willChange: 'transform',
            zIndex: 2,
          }}
        />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            minHeight: '100%',
            backgroundColor: theme.palette.background.secondary,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              ...gridItemStyles,
              background: theme.palette.background.dark,
              padding: theme.spacing(3),
              margin: theme.spacing(3),
              borderRadius: theme.shape.borderRadius,
            }}
          >
            <SearchBar
              onSearchFocus={() => setSearchBarFocused(true)}
              onSearchBlur={() => setSearchBarFocused(false)}
            />
            <ProductGrid updateHeight={updateContainerHeight} />
          </Grid>
        </Container>
      </PageLayout>
      {isModalOpen && (
        <GenericCardDialog
          open={isModalOpen}
          context={'Cart'}
          card={modalContent}
        />
      )}
      <Box
        sx={{
          flexGrow: 1,
          zIndex: -700,
          height: `${containerHeight * 2.35}px`,
          width: '100%',
          minHeight: '100%',
          background: theme.palette.background.dark,
          position: 'absolute',
        }}
      />
    </React.Fragment>
  );
};

export default StorePage;
