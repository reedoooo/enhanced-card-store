// DeckSearch.js
import React, { useState } from 'react';
import { Collapse } from '@mui/material';
import usePagination from '../../../context/hooks/usePagination';
import { useGetSearchData } from '../../../context/hooks/useGetSearchData';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';

const SearchComponent = (pageContext) => {
  const itemsPerPage = 12;
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { searchData, isLoading, uniqueCards } = useGetSearchData();
  // const { pageCount, data, paginatedData, currentPage, setCurrentPage } =
  //   usePagination(uniqueCards, itemsPerPage);

  return (
    <Collapse
      orientation="horizontal"
      in={true}
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        // flexDirection: 'column',
        // alignItems: 'flex-start',
        minWidth: '100%',
        width: '100%',
        // marginBottom: 2,
      }}
    >
      <MDBox
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          marginBottom: 2,
        }}
      >
        {' '}
        <SearchBar
          onSearchFocus={() => setSearchBarFocused(true)}
          onSearchBlur={() => setSearchBarFocused(false)}
        />
      </MDBox>
      <SearchResults
        isLoading={isLoading}
        searchData={searchData}
        uniqueCards={uniqueCards}
        // pageContext={pageContext}
        pageContext={'Cart'}
        itemsPerPage={itemsPerPage}
        // paginatedData={paginatedData}
        // itemsPerPage={itemsPerPage}
        // currentPage={currentPage}
        // setPageCount={pageCount}
        // setCurrentPage={setCurrentPage}
        // pageCount={pageCount}
        // pageContext={pageContext}
      />
    </Collapse>
  );
};

export default SearchComponent;
