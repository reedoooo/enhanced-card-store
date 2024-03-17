import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import useGridItems from '../../../context/hooks/useGridItems';
import usePagination from '../../../context/hooks/usePagination';
import PaginationComponent from '../../../layout/collection/collectionGrids/cards-datatable/PaginationComponent';
import LoadingIndicator from '../../../layout/LoadingIndicator';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';

const SearchResults = ({
  uniqueCards,
  isLoading,
  pageContext,
  itemsPerPage,
  searchData,
}) => {
  const { pageCount, data, paginatedData, currentPage, setCurrentPage } =
    usePagination(uniqueCards, itemsPerPage);
  const renderItems = useGridItems({
    cards: uniqueCards,
    isLoading,
    pageContext,
    itemsPerPage,
  });

  if (isLoading) return <LoadingIndicator />;
  return (
    <React.Fragment>
      <MDBox>
        <Grid
          container
          justifyContent="center"
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {renderItems}
        </Grid>
        <Grid container justifyContent="center">
          <PaginationComponent
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            pageContext={pageContext}
            isLoading={isLoading}
            searchData={searchData}
          />
        </Grid>
      </MDBox>
    </React.Fragment>
  );
};

export default SearchResults;
