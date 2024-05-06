import React from 'react';
import { Grid } from '@mui/material';
import PaginationComponent from './PaginationComponent';

import { LoadingIndicator, MDBox } from 'layout/REUSABLE_COMPONENTS';

import { useGridItems, usePagination } from 'context';

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
    type: 'search',
  });

  if (isLoading) return <LoadingIndicator />;
  return (
    <React.Fragment>
      <MDBox
        sx={{
          m: '1rem',
          p: '1rem',
          pr: 0,
          // mr: 0,
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          justifyContent="center"
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {renderItems}
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} justifyContent="center">
            <PaginationComponent
              pageOptions={searchData}
              pageCount={pageCount}
              pageIndex={currentPage}
              currentPage={currentPage}
              gotoPage={setCurrentPage}
              canPreviousPage={currentPage > 0}
              canNextPage={currentPage < pageCount - 1}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              pageContext={pageContext}
              isLoading={isLoading}
              searchData={searchData}
            />
          </Grid>
        </Grid>
      </MDBox>
    </React.Fragment>
  );
};

export default SearchResults;
