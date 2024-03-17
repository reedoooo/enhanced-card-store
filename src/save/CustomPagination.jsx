import React from 'react';
import { Box, Pagination } from '@mui/material';
import { useMode } from '../context';

const CustomPagination = ({
  totalCount,
  itemsPerPage,
  currentPage,
  handlePagination,
}) => {
  const { theme } = useMode();
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}
    >
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePagination}
        color="primary"
      />
    </Box>
  );
};

export default CustomPagination;
