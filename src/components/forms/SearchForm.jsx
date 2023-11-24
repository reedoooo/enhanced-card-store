import React from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMode } from '../../context/hooks/colormode';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3], // Use the theme's predefined shadows
    maxWidth: 400,
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  submitButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.getContrastText(theme.palette.success.main),
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const SearchForm = ({ searchTerm, handleChange, handleSubmit }) => {
  const { theme } = useMode();
  const classes = useStyles(theme);

  return (
    <Paper className={classes.formContainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          value={searchTerm}
          onChange={handleChange}
          label="Search for cards"
          variant="outlined"
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.submitButton}
          fullWidth
        >
          Search
        </Button>
      </form>
    </Paper>
  );
};

export default SearchForm;
