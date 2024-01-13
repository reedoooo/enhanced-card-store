// SearchForm.jsx
import React from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
}));

const SearchFormB = ({
  searchSettings,
  handleSearch,
  handleSearchBy,
  handleSortBy,
}) => {
  return (
    <>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchSettings.search}
        onChange={handleSearch}
        placeholder="Search"
      />
      <StyledFormControl fullWidth>
        <InputLabel>Search by</InputLabel>
        <Select
          value={searchSettings.searchBy}
          onChange={handleSearchBy}
          label="Search by"
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="genres">Genre</MenuItem>
        </Select>
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={searchSettings.sortBy}
          onChange={handleSortBy}
          label="Sort by"
        >
          <MenuItem value="release_date">Release date</MenuItem>
          <MenuItem value="vote_average">Rating</MenuItem>
        </Select>
      </StyledFormControl>
    </>
  );
};

export default SearchFormB;
