import React from 'react';
import {
  FormWrapper,
  StyledButton,
  StyledFormPaper,
  StyledTextField,
} from './styled';

import { Button, Grid } from '@mui/material';
import { useMode } from '../../context';

const SearchForm = ({
  searchTerm,
  handleChange, // Make sure this is the adjusted function from SearchBar
  handleSubmit,
  handleKeyPress,
  onFocus,
  onBlur,
}) => {
  const { theme } = useMode();
  return (
    <StyledFormPaper
      theme={theme}
      sx={{
        background: theme.palette.backgroundB.lightest,
      }}
    >
      <FormWrapper onSubmit={handleSubmit} theme={theme}>
        <StyledTextField
          value={searchTerm}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          label="Search for cards"
          variant="outlined"
          fullWidth
          onKeyDown={handleKeyPress}
          theme={theme}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            mt: 1,
            mb: 1,
            background: theme.palette.backgroundA.dark,
            '&:hover': { background: theme.palette.backgroundA.darkest },
          }}
        >
          Search
        </Button>
      </FormWrapper>
    </StyledFormPaper>
  );
};

export default SearchForm;
