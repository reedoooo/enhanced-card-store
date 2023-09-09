import React from 'react';
import { TextField, Button } from '@mui/material';

const SearchForm = ({ searchTerm, handleChange, handleSubmit }) => (
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
);

export default SearchForm;
