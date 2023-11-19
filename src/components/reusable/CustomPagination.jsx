import React from 'react';
import { Box, Pagination } from '@mui/material';

const CustomPagination = ({
  totalCount,
  itemsPerPage,
  currentPage,
  handlePagination,
}) => (
  <Box display="flex" justifyContent="center" mt={2}>
    <Pagination
      count={Math.ceil(totalCount / itemsPerPage)}
      page={currentPage}
      onChange={handlePagination}
      color="primary"
    />
  </Box>
);

export default CustomPagination;
