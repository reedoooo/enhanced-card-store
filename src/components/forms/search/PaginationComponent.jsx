import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const PaginationComponent = ({ pageOptions }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageOptions?.length - 1;
  const gotoPage = (page) => {
    const pageNumber = Math.max(0, Math.min(page, pageOptions.length - 1));
    setPageIndex(pageNumber);
  };
  const nextPage = () => {
    if (canNextPage) setPageIndex((currentPageIndex) => currentPageIndex + 1);
  };
  const previousPage = () => {
    if (canPreviousPage)
      setPageIndex((currentPageIndex) => currentPageIndex - 1);
  };

  return (
    <Box display="flex" alignItems="center">
      {canPreviousPage && (
        <IconButton onClick={previousPage} aria-label="Previous page">
          <ChevronLeft />
        </IconButton>
      )}

      {pageOptions?.length > 1 ? (
        <TextField
          size="small"
          variant="outlined"
          type="number"
          inputProps={{ min: 1, max: pageOptions?.length }}
          value={pageIndex + 1}
          onChange={(e) => gotoPage(Number(e.target.value) - 1)}
          sx={{ width: '5rem', marginX: 1 }}
        />
      ) : (
        <Typography variant="button" sx={{ marginX: 1 }}>
          Page {pageIndex + 1} of {pageOptions?.length}
        </Typography>
      )}

      {canNextPage && (
        <IconButton onClick={nextPage} aria-label="Next page">
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );
};

export default PaginationComponent;
