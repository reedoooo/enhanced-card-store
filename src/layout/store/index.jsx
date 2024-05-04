import React, { useState } from 'react';
import { useMode } from 'context';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import PageLayout from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/PageLayout';
import SearchComponent from 'components/forms/search/SearchComponent';
import { PortfolioBoxA } from '../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

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
