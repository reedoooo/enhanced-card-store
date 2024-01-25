import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Grid, Container } from '@mui/material';
import CustomPagination from '../../reusable/CustomPagination';
import { useCardStore, useMode } from '../../../context';
import SkeletonStoreItem from '../gridItems/SkeletonStoreItem'; // A new component for skeleton screens
import GridLayout from './GridLayout';
import ReusableSkeletonItem from '../gridItems/ReusableSkeletonItem';
import StoreItem from '../gridItems/StoreItem';

const ProductGrid = ({ updateHeight }) => {
  const { theme } = useMode();
  const containerStyles = theme.responsiveStyles.productGridContainerStyle;
  const { searchData, setSlicedAndMergedSearchData, isCardDataValid } =
    useCardStore();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const containerRef = useRef(null);

  const handlePagination = (event, value) => setPage(value);

  const currentStoreSearchData = useMemo(
    () => searchData?.slice(start, end),
    [searchData, page]
  );
  useEffect(() => {
    setSlicedAndMergedSearchData(currentStoreSearchData);
    if (containerRef.current) {
      const height = containerRef.current.clientHeight;
      updateHeight(height);
    }
  }, [currentStoreSearchData, updateHeight]);

  return (
    <GridLayout containerRef={containerRef} containerStyles={containerStyles}>
      {/* Define the grid item size for 3 columns layout */}
      {isCardDataValid ? (
        currentStoreSearchData?.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <StoreItem card={card} context="Cart" page="Store" index={index} />
          </Grid>
        ))
      ) : (
        <ReusableSkeletonItem
          count={itemsPerPage}
          gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
        />
      )}
      <CustomPagination
        totalCount={searchData?.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        handlePagination={handlePagination}
      />
    </GridLayout>
  );
};

export default React.memo(ProductGrid);
