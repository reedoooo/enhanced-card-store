import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import SearchBar from '../components/search/SearchBar';
import ProductGrid from '../components/grids/storeSearchResultsGrid/ProductGrid';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import HeroCenter from './pageStyles/HeroCenter';
import { useModalContext, useMode, usePageContext } from '../context';
import { gridContainerStyles, gridItemStyles } from './pageStyles/styles';
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import PageLayout from '../layout/PageLayout';

const StorePage = () => {
  const { theme } = useMode();
  const { isPageLoading, pageError } = usePageContext();
  const [containerHeight, setContainerHeight] = useState(0);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useModalContext();

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;

  const updateContainerHeight = (height) => {
    setContainerHeight(height);
  };

  return (
    <React.Fragment>
      {' '}
      {/* <Box
        sx={{
          flexGrow: 1,
          zIndex: -1,
          height: '100%',
          width: '100%',
          margin: '50px',
          minHeight: '100%',
          background: theme.palette.background.dark,
          // position: 'absolute',
        }}
      /> */}
      <PageLayout>
        <Box
          sx={{
            flexGrow: 1,
            zIndex: -1,
            height: '100%',
            width: '100%',
            margin: '10%',
            // minHeight: '100%',
            background: theme.palette.background.dark,
            // position: 'absolute',
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
        <GenericCardModal
          open={isModalOpen}
          closeModal={closeModal}
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
