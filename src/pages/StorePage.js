import React, { useEffect, useMemo, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import SearchBar from '../components/other/search/SearchBar';
import ProductGrid from '../components/grids/searchResultsGrids/ProductGrid';
import HeroCenter from './pageStyles/HeroCenter';
import { useModalContext, useMode } from '../context';
import { gridItemStyles } from './pageStyles/styles';
import GenericCardDialog from '../components/dialogs/cardDialog/GenericCardDialog';
import useLocalStorage from '../context/hooks/useLocalStorage';

const StorePage = () => {
  const { theme } = useMode();
  const [page, setPage] = useState(1);
  const [previousSearchData] = useLocalStorage('previousSearchData', []);
  const [searchData, setSearchData] = useLocalStorage(
    'searchData',
    previousSearchData || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;
  const uniqueCards = useMemo(() => {
    return Array.from(
      new Map(searchData?.map((card) => [card.id, card])).values()
    );
  }, [searchData]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { isModalOpen, modalContent } = useModalContext();
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
        <ProductGrid
          updateHeight={setContainerHeight}
          uniqueCards={uniqueCards}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
        />
      </Grid>
    </Container>
  );
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        // setSelectedCards(selectedDeck?.cards?.slice(0, 30) || []);
        const updatedData = JSON.parse(
          localStorage.getItem('searchData') || '[]'
        );
        setSearchData(updatedData);
        setIsLoading(false);
      }
    }, 1000);
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchData]);
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
    </React.Fragment>
  );
};

export default StorePage;
