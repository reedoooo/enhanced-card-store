import React from 'react';
import GridLayout from './GridLayout';
import useGridItems from '../../../context/hooks/useGridItems';
import usePagination from '../../../context/hooks/usePagination';
import MDPagination from '../../../layout/REUSABLE_COMPONENTS/MDPAGINATION';
import { Grid } from '@mui/material';

const ProductGrid = ({ uniqueCards, searchData, isLoading, itemsPerPage }) => {
  const { pageCount, data, paginatedData, currentPage, setCurrentPage } =
    usePagination(uniqueCards, itemsPerPage);
  // const renderPagination = pageOptions.map((option) => (
  //   <MDPagination
  //     item
  //     key={option}
  //     onClick={() => gotoPage(Number(option))}
  //     count={pageOptions.length}
  //     active={pageIndex === option}
  //     onPageChange={(_, num) => gotoPage(num - 1)}
  //     page={pageIndex + 1}
  //     showFirstButton
  //     showLastButton
  //     containerProps={{
  //       justifyContent: 'center',
  //       display: 'flex',
  //       padding: '8px',
  //       '.MuiPagination-ul': {
  //         flexWrap: 'wrap', // Allow pagination items to wrap on small screens
  //       },
  //     }}
  //   >
  //     {option + 1}
  //   </MDPagination>
  // ));
  const renderItems = useGridItems({
    cards: paginatedData,
    isLoading,
    pageContext: 'Cart',
    itemsPerPage,
  });
  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <GridLayout
        containerStyles={{ marginTop: '1rem', height: '99%' }}
        isLoading={isLoading}
      >
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

export default React.memo(ProductGrid);
