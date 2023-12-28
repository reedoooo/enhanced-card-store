// commonStyles.js (or use theme.js)
export const commonPaperStyles = (theme) => ({
  padding: 3,
  borderRadius: 2,
  background: theme.palette.success.dark,
  boxShadow: 3,
  margin: 'auto',
  width: '100%',
  maxWidth: 'md',
  '&:hover': {
    boxShadow: 6,
  },
});

// SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Paper } from '@mui/material';
import { Button, TextField } from '@mui/material';

import { useCardStore, useDeckStore, useMode } from '../../../context';
// import SearchForm from '../../forms/SearchForm';
import search from './search.json';
// import { commonPaperStyles } from '../../../path/to/commonStyles'; // import common styles

const SearchBar = ({ onSearchFocus, onSearchBlur, searchTerm }) => {
  const { theme } = useMode();
  const { initialState, filters } = search;
  const { selectedDeck } = useDeckStore();
  const { handleRequest } = useCardStore();
  const [searchParams, setSearchParams] = useState(initialState);

  useEffect(() => {
    if (selectedDeck) {
      Object.entries(selectedDeck).forEach(([key, value]) => {
        setSearchParams((prev) => ({ ...prev, [key]: value || '' }));
      });
    }
  }, [selectedDeck]);

  const handleChange = (name, newValue) => {
    setSearchParams((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = () => {
    handleRequest(searchParams);
  };

  return (
    <Paper elevation={3} sx={commonPaperStyles(theme)}>
      <Container>
        {/* eslint-disable-next-line max-len */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: theme.palette.background.main,
            textTransform: 'uppercase',
          }}
        >
          Search Cards
        </Typography>
        <SearchForm
          searchTerm={searchParams.name}
          handleChange={(e) => handleChange('name', e.target.value)}
          handleSubmit={handleSubmit}
          handleKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          theme={theme}
        />
      </Container>
    </Paper>
  );
};

export default SearchBar;

// // SearchForm.jsx
// import React from 'react';
// import { Button, TextField, Paper } from '@mui/material';

const SearchForm = ({
  searchTerm,
  handleChange,
  handleSubmit,
  handleKeyPress,
}) => {
  const { theme } = useMode();
  return (
    <Paper sx={{ padding: theme.spacing(2) }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          value={searchTerm}
          onChange={handleChange}
          label="Search for cards"
          variant="outlined"
          fullWidth
          onKeyDown={handleKeyPress}
        />
        <Button
          fullWidth
          variant="contained"
          // color={theme.palette.backgroundA.default}
          // background={theme.palette.backgroundA.default}
          type="submit"
          sx={{ mt: 1, mb: 1, background: theme.palette.backgroundA.default }}
        >
          Search
        </Button>
      </form>
    </Paper>
  );
};

// export default SearchForm;
