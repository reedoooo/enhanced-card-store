import React from 'react';
import { useMode } from 'context';
import SearchComponent from 'layout/search/SearchComponent';
import { PortfolioBoxA } from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { MDBox, PageLayout } from 'layout/REUSABLE_COMPONENTS';

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
