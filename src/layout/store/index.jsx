import React from 'react';
import { useMode } from 'context';
import SearchComponent from 'layout/search/SearchComponent';
import { MDBox, PageLayout } from 'layout/REUSABLE_COMPONENTS';
import { Box } from '@mui/material';

const StoreSearch = () => {
  const { theme } = useMode();
  return (
    <PageLayout>
      <MDBox
        py={3}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          theme={theme}
          sx={{
            flexGrow: 1,
            boxShadow: theme.shadows[5],
            [theme.breakpoints.down('sm')]: {},
          }}
        >
          <SearchComponent pageContext="Cart" />
        </Box>
      </MDBox>
    </PageLayout>
  );
};

export default StoreSearch;
