import React from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: '90%', // Set the min-width
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2), // You can control the gap between the TextField and Button
  },
}));

const SearchForm = ({ searchTerm, handleChange, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
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
};

export default SearchForm;
