import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Fade,
  useMediaQuery,
  TableContainer,
  Container,
} from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';
import Pagination from '@mui/material/Pagination';
import DeckCard from '../cards/DeckCard';
import { useTheme } from '@emotion/react';

const DeckSearch = ({ userDecks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const {
    deckSearchData,
    handleRequest,
    // openCardModal: openCardModalFromStore,
  } = useCardStore();
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRequest({ name: searchTerm });
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const itemsPerPage = 36;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentDeckSearchData = deckSearchData.slice(start, end);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fade in={true} timeout={500}>
      <Box p={1}>
        {/* <Container minWidth="20vw"> */}
        <form onSubmit={handleSubmit}>
          <TextField
            value={searchTerm}
            onChange={handleChange}
            label="Search for cards"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </form>
        <Grid container spacing={1}>
          {currentDeckSearchData.map((card, i) => (
            <Grid key={i} item xs={isSmallScreen ? 6 : 4} marginTop={1}>
              <DeckCard card={card} userDecks={userDecks} />
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(deckSearchData.length / itemsPerPage)}
            page={page}
            onChange={handlePagination}
            color="primary"
          />
        </Box>
        {/* </Container> */}
      </Box>
    </Fade>
  );
};

export default DeckSearch;
