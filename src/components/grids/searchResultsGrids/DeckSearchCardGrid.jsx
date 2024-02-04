import React from 'react';
import GridLayout from './GridLayout';
import useGridItems from '../../../context/hooks/useGridItems';
import usePagination from '../../../context/hooks/usePagination';
import MDPagination from '../../../layout/REUSABLE_COMPONENTS/MDPAGINATION';
import { Grid } from '@mui/material';

const DeckSearchCardGrid = ({ uniqueCards, itemsPerPage, isLoading }) => {
  const { pageCount, data, paginatedData, currentPage, setCurrentPage } =
    usePagination(uniqueCards, itemsPerPage);
  const renderItems = useGridItems({
    cards: paginatedData,
    isLoading,
    pageContext: 'Deck',
    itemsPerPage,
  });
  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <GridLayout containerStyles={{ marginTop: '1rem' }} isLoading={isLoading}>
        {renderItems}
      </GridLayout>
      <Grid container justifyContent="center" marginTop={2}>
        <MDPagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Grid>
    </React.Fragment>
  );
};

export default DeckSearchCardGrid;
