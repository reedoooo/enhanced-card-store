import React, { useMemo } from 'react';
import { Grid, Grow } from '@mui/material';
import { useCardStoreHook } from './useCardStore';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import GenericCard from '../../components/cards/GenericCard';
import { SkeletonCard } from '../../layout/REUSABLE_COMPONENTS/SkeletonVariants';

const useGridItems = ({
  itemsPerPage,
  cards,
  pageContext,
  isLoading,
  hasFetched,
  allItems,
  validSelection,
  type,
}) => {
  const { loadingSearchResults } = useCardStoreHook();
  const skeletonCount = isLoading ? itemsPerPage : cards?.length;
  const searchConditions = isLoading || loadingSearchResults;
  const deckConditions = !validSelection;
  const conditionalType = type === 'search' ? searchConditions : deckConditions;

  const calculateTimeout = (index) => index * 400; // Adjust this value for faster or slower animations
  const gridItems = useMemo(() => {
    return (
      conditionalType ? Array.from({ length: itemsPerPage }) : cards
    )?.map((card, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={isLoading ? `skeleton-${index}` : `card-${card?.id}-${index}`}
        // Set the grid item to display as flex and direction column to control the height
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          timeout={calculateTimeout(index)}
        >
          <MDBox
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Conditionally render Skeleton or Card based on loading state */}
            {conditionalType || !cards || cards?.length === 0 ? (
              <SkeletonCard />
            ) : (
              <GenericCard
                card={card}
                page={pageContext}
                context={pageContext}
                // context={`${pageContext}`}
              />
            )}
          </MDBox>
        </Grow>
      </Grid>
    ));
  }, [isLoading, loadingSearchResults, cards, itemsPerPage]);

  return (
    <Grid container spacing={2}>
      {gridItems}
    </Grid>
  );
};

export default useGridItems;
