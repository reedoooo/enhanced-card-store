import React from 'react';
import GridLayout from './GridLayout';
import useGridItems from './useGridItems';
import usePagination from '../../../context/hooks/usePagination';

const ProductGrid = ({ uniqueCards, searchData, isLoading, itemsPerPage }) => {
  const { PaginationComponent, paginatedItems } = usePagination(
    uniqueCards,
    itemsPerPage,
    searchData?.length
  );

  const renderItems = useGridItems({
    cards: paginatedItems,
    isLoading,
    pageContext: 'Cart',
    itemsPerPage,
  });

  return (
    <GridLayout
      containerStyles={{ marginTop: '1rem', height: '99%' }}
      isLoading={isLoading}
    >
      {renderItems}
      {PaginationComponent}
    </GridLayout>
  );
};

export default React.memo(ProductGrid);
