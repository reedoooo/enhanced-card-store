import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';
import Pagination from '@mui/material/Pagination';
import DeckCard from '../cards/DeckCard';

const DeckSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { deckSearchData, handleRequest } = useCardStore();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRequest({ name: searchTerm }); // assuming the API takes an object with a 'name' property
  };

  // Function to handle pagination change
  const handlePagination = (event, value) => {
    setPage(value);
  };

  // Split the data into pages
  const itemsPerPage = 36;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentDeckSearchData = deckSearchData.slice(start, end);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          value={searchTerm}
          onChange={handleChange}
          label="Search for cards"
          variant="outlined"
          fullWidth
          mb={2}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Search
        </Button>
      </form>
      <Grid container spacing={2}>
        {currentDeckSearchData.map((card, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <DeckCard card={card} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(deckSearchData.length / itemsPerPage)}
          page={page}
          onChange={handlePagination}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default DeckSearch;
