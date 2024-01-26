import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Grid } from '@mui/material';
import CustomPagination from '../../reusable/CustomPagination';
import { useCardStore } from '../../../context'; // Import useCardStore
import ReusableSkeletonItem from '../gridItems/ReusableSkeletonItem';
import StoreItem from '../gridItems/StoreItem';
import useLocalStorage from '../../../context/hooks/useLocalStorage';
import GridLayout from './GridLayout';
import { CSSTransition } from 'react-transition-group';

const ProductGrid = ({
  updateHeight,
  userDecks,
  uniqueCards,
  setPage,
  page,
  itemsPerPage,
  isLoading,
  searchData,
}) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      updateHeight(containerRef.current.clientHeight);
    }
  }, [uniqueCards, updateHeight]);

  const handlePagination = (event, value) => setPage(value);

  return (
    <div ref={containerRef}>
      <GridLayout
        containerStyles={{ marginTop: '1rem' }}
        isLoading={isLoading}
        skeletonCount={itemsPerPage}
        gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
      >
        {!uniqueCards?.length ? (
          <ReusableSkeletonItem
            count={itemsPerPage}
            totalCount={searchData?.length}
            gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 4 }}
          />
        ) : (
          <Grid container spacing={2}>
            {searchData?.length > 0 // Check if searchData has items
              ? uniqueCards?.map((card, index) => (
                  <CSSTransition key={card.id} timeout={500} classNames="card">
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                      <StoreItem
                        card={card}
                        context="Cart"
                        page="Store"
                        index={index}
                      />
                    </Grid>
                  </CSSTransition>
                ))
              : Array.from({ length: itemsPerPage }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <ReusableSkeletonItem />
                  </Grid>
                ))}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomPagination
                totalCount={uniqueCards?.length}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                handlePagination={handlePagination}
              />
            </Grid>
          </Grid>
        )}
      </GridLayout>
    </div>
  );
};

export default React.memo(ProductGrid);
