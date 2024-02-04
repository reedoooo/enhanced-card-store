// SearchResultsComponent.js
import React from 'react';
import { Box } from '@mui/material';
import GridLayout from '../../grids/searchResultsGrids/GridLayout';
import CustomPagination from '../../reusable/CustomPagination';
import useGridItems from '../../../context/hooks/useGridItems';
import usePagination from '../../../context/hooks/usePagination';

const SearchResults = ({
  uniqueCards,
  isLoading,
  pageContext,
  itemsPerPage,
}) => {
  const { pageCount, data, paginatedData, currentPage, setCurrentPage } =
    usePagination(uniqueCards, itemsPerPage);

  const renderItems = useGridItems({
    cards: paginatedData,
    isLoading,
    pageContext: pageContext || 'Cart',
    itemsPerPage,
  });

  return (
    <Box
      p={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <GridLayout containerStyles={{ marginTop: '1rem' }} isLoading={isLoading}>
        {renderItems}
      </GridLayout>
      <CustomPagination
        totalCount={pageCount * itemsPerPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handlePagination={(event, value) => setCurrentPage(value)}
      />
    </Box>
  );
};

export default SearchResults;
