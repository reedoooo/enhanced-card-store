import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import SearchBar from '../../components/other/search/SearchBar';
import ProductGrid from '../../components/grids/searchResultsGrids/ProductGrid';
import { useGetSearchData } from '../../context/hooks/useGetSearchData';
import PageLayout from '../Containers/PageLayout';
import { PortfolioBoxA } from '../../context/hooks/style-hooks/usePortfolioStyles';
import SearchComponent from '../../components/other/search/SearchComponent';

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
        <PortfolioBoxA
          theme={theme}
          sx={{
            flexGrow: 1,
          }}
        >
          <SearchComponent pageContext="Cart" />
        </PortfolioBoxA>
      </MDBox>
    </PageLayout>
  );
};

export default StoreSearch;
