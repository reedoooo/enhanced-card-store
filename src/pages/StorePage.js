import React, { useState } from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
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
  const [containerHeight, setContainerHeight] = useState(0); // State to store container height
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useModalContext();
  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;
  const updateContainerHeight = (height) => {
    setContainerHeight(height); // Function to update container height
  };

  return (
    <React.Fragment>
      <PageLayout>
        <HeroCenter
          title="Welcome to Store"
          subtitle="Search for cards and add them to your cart."
        />

        <Grid
          container
          sx={{
            ...gridContainerStyles,
            padding: theme.spacing(3),
            background: theme.palette.background.dark,
            color: theme.palette.text.primary,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                background: theme.palette.background.secondary,
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(2),
              }}
            >
              <SearchBar
                sx={{
                  ...gridItemStyles,
                  background: theme.palette.background.dark,
                  padding: theme.spacing(3),
                  margin: theme.spacing(3),
                  borderRadius: theme.shape.borderRadius,
                }}
              />
              <ProductGrid
                sx={{
                  ...gridItemStyles,
                  background: theme.palette.background.dark,
                  padding: theme.spacing(3),
                  margin: theme.spacing(3),
                  borderRadius: theme.shape.borderRadius,
                }}
                updateHeight={updateContainerHeight}
              />
            </Grid>
          </Container>
        </Grid>
        {isModalOpen && (
          <GenericCardModal
            open={isModalOpen}
            closeModal={closeModal}
            card={modalContent}
            // context and other props if necessary
          />
        )}
      </PageLayout>
      <Box
        sx={{
          flexGrow: 1,
          zIndex: -100,
          height: `${containerHeight}px`, // Set the height of the Box
          width: '100%',
          minHeight: '100%',
          background: theme.palette.background.dark,
        }}
      />
    </React.Fragment>
  );
};

export default StorePage;
