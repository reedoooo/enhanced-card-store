import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Fade,
  useMediaQuery,
  Pagination,
} from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';
import { useTheme } from '@emotion/react';
import SearchForm from './SearchForm';
import DeckSearchCardGrid from '../grids/searchResultGrids/DeckSearchCardGrid';
import CustomPagination from '../reusable/CustomPagination';

const DeckSearch = ({ userDecks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { deckSearchData, handleRequest } = useCardStore();

  const handleChange = (event) => setSearchTerm(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleRequest({ name: searchTerm });
  };
  const handlePagination = (event, value) => setPage(value);

  const itemsPerPage = 36;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentDeckSearchData = deckSearchData.slice(start, end);

  return (
    <Fade in={true} timeout={500}>
      <Box p={1}>
        <SearchForm
          searchTerm={searchTerm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <DeckSearchCardGrid
          cards={currentDeckSearchData}
          userDecks={userDecks}
        />
        <CustomPagination
          totalCount={deckSearchData.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          handlePagination={handlePagination}
        />
      </Box>
    </Fade>
  );
};

export default DeckSearch;
