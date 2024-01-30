import React from 'react';
import GridLayout from './GridLayout';
import useGridItems from './useGridItems';
import usePagination from '../../../context/hooks/usePagination';

const DeckSearchCardGrid = ({
  userDecks,
  cards,
  itemsPerPage,
  isLoading,
  searchData,
  uniqueCards,
}) => {
  const renderItems = useGridItems({
    isLoading,
    cards,
    pageContext: 'Deck',
    itemsPerPage,
  });

  return (
    <GridLayout containerStyles={{ marginTop: '1rem' }} isLoading={isLoading}>
      {renderItems}
    </GridLayout>
  );
};

export default DeckSearchCardGrid;
