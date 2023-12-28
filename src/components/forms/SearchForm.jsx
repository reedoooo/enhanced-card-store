import React from 'react';
import { useMode } from '../../context/hooks/colormode';
import { StyledButton, StyledPaper, StyledTextField } from './styled';

import { Button, Grid } from '@mui/material';

const SearchForm = ({
  searchTerm,
  handleChange,
  onFocus,
  onBlur,
  handleSubmit,
  handleKeyPress,
}) => {
  const { theme } = useMode();

  return (
    <StyledPaper theme={theme}>
      <form
        // onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
          // background: theme.palette.background.quaternary,
        }}
      >
        <StyledTextField
          value={searchTerm}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          label="Search for cards"
          variant="outlined"
          fullWidth
          onKeyDown={handleKeyPress} // Add keydown listener here
          theme={theme}
        />
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 1,
              mb: 1,
              background: theme.palette.primary.main,
              '&:hover': {
                background: theme.palette.primary.dark,
                boxShadow: 6,
              },
            }}
            onClick={() => handleSubmit()} // Corrected onClick
          >
            Search
          </Button>
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default SearchForm;
