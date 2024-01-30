import React, { useState, useEffect, useMemo } from 'react';
import { Box, Collapse, Fade } from '@mui/material';
import DeckSearchCardGrid from '../../grids/searchResultsGrids/DeckSearchCardGrid';
import CustomPagination from '../../reusable/CustomPagination';
import SearchBar from './SearchBar';
import useLocalStorage from '../../../context/hooks/useLocalStorage';
import { useGetSearchData } from '../../../context/hooks/useGetSearchData';
import usePagination from '../../../context/hooks/usePagination';

const DeckSearch = () => {
  const itemsPerPage = 12;
  const { searchData, isLoading, uniqueCards } = useGetSearchData();
  const { page, PaginationComponent, paginatedItems } = usePagination(
    uniqueCards,
    itemsPerPage,
    searchData?.length
  );
  return (
    <Collapse orientation="horizontal" in={true}>
      <Box
        p={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          margin: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: 2,
          }}
        >
          <SearchBar />
        </Box>
        <DeckSearchCardGrid
          uniqueCards={uniqueCards}
          cards={paginatedItems}
          page={1}
          itemsPerPage={itemsPerPage}
          isLoading={isLoading}
          searchData={searchData}
        />
        {PaginationComponent}
      </Box>
    </Collapse>
  );
};

export default DeckSearch;
