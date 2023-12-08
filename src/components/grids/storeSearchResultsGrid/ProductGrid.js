import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Grid, Container } from '@mui/material';
import StoreItem from '../StoreItem';
import CustomPagination from '../../reusable/CustomPagination';
import { useCardStore, useMode } from '../../../context';

const ProductGrid = ({ updateHeight }) => {
  const { theme } = useMode();
  const { searchData, setSlicedAndMergedSearchData, isCardDataValid } =
    useCardStore();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const containerRef = useRef(null); // useRef hook to track the Container

  const handlePagination = (event, value) => setPage(value);

  const currentStoreSearchData = useMemo(
    () => searchData?.slice(start, end),
    [searchData, page]
  );

  useEffect(() => {
    setSlicedAndMergedSearchData(currentStoreSearchData);
    if (containerRef.current) {
      const height = containerRef.current.clientHeight;
      updateHeight(height); // Update the height in StorePage
    }
  }, [currentStoreSearchData, updateHeight]); // Add updateHeight to dependency array

  return (
    <Container
      ref={containerRef}
      sx={{
        maxWidth: 'lg',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(4),
      }}
    >
      <Grid container spacing={3}>
        {isCardDataValid &&
          currentStoreSearchData?.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StoreItem card={card} context="Cart" page="StorePage" />
            </Grid>
          ))}
      </Grid>
      <CustomPagination
        totalCount={searchData?.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        handlePagination={handlePagination}
      />
    </Container>
  );
};

export default React.memo(ProductGrid);
