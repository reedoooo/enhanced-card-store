import React, { useState } from 'react';
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import SearchComponent from '../../components/other/search/SearchComponent';
import { PortfolioBoxA } from '../../pages/pageStyles/StyledComponents';

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
