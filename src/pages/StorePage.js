import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import SearchBar from '../components/other/search/SearchBar';
import ProductGrid from '../components/grids/searchResultsGrids/ProductGrid';
import HeroCenter from './pageStyles/HeroCenter';
import { useModalContext, useMode, usePageContext } from '../context';
import { gridItemStyles } from './pageStyles/styles';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';

const StorePage = () => {
  const { theme } = useMode();
  const { setLoading, loadingStatus } = usePageContext();
  const [containerHeight, setContainerHeight] = useState(0);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { isModalOpen, modalContent } = useModalContext();
  // Function to render the Hero section
  const renderHero = () => (
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
  );
  // Function to render the search bar and product grid
  const renderSearchAndProducts = () => (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        minHeight: '100%',
        backgroundColor: theme.palette.backgroundB.default,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.primary,
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          ...gridItemStyles,
          background: theme.palette.backgroundB.darker,
          padding: theme.spacing(3),
          margin: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <SearchBar
          onSearchFocus={() => setSearchBarFocused(true)}
          onSearchBlur={() => setSearchBarFocused(false)}
        />
        <ProductGrid updateHeight={setContainerHeight} />
      </Grid>
    </Container>
  );
  // Function to render the bottom background box (for UI effects)
  const renderBackgroundBox = () => (
    <Box
      sx={{
        flexGrow: 1,
        zIndex: -700,
        height: `${containerHeight * 2.35}px`,
        width: '100%',
        minHeight: '100%',
        background: theme.palette.backgroundB.darker,
        position: 'absolute',
      }}
    />
  );

  return (
    <React.Fragment>
      {/* <PageLayout> */}
      {/* Main content rendering */}
      {renderHero()}
      {renderSearchAndProducts()}

      {/* Modal for card details */}
      {isModalOpen && (
        <GenericCardDialog
          open={isModalOpen}
          context={'Cart'}
          card={modalContent}
        />
      )}

      {/* Background box for additional UI */}
      {renderBackgroundBox()}
      {/* </PageLayout> */}
    </React.Fragment>
  );
};

export default StorePage;
