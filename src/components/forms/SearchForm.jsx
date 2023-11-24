import React from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMode } from '../../context/hooks/colormode';

const SearchForm = ({ searchTerm, handleChange, handleSubmit }) => {
  const { theme } = useMode();

  return (
    <Paper
      sx={{
        width: '100%',
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[3], // Use the theme's predefined shadows
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          padding: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.secondary.light,
          boxShadow: theme.shadows[3], // Use the theme's predefined shadows
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            padding: theme.spacing(2),
          }}
        >
          <TextField
            value={searchTerm}
            onChange={handleChange}
            label="Search for cards"
            variant="outlined"
            fullWidth
            sx={{
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
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.getContrastText(theme.palette.success.main),
              '&:hover': {
                backgroundColor: theme.palette.success.dark,
              },
            }}
            fullWidth
          >
            Search
          </Button>
        </form>
      </Paper>
    </Paper>
  );
};

export default SearchForm;
