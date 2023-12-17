import React from 'react';
import { useMode } from '../../context/hooks/colormode';
import { StyledButton, StyledPaper, StyledTextField } from './styled';
import SearchButton from '../buttons/other/SearchButton';

const SearchForm = ({
  searchTerm,
  handleChange,
  onFocus,
  onBlur,
  handleSubmit,
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
          theme={theme}
        />
        <SearchButton handleSubmit={handleSubmit} />
        {/* <StyledButton type="submit" fullWidth theme={theme}>
          Search
        </StyledButton> */}
      </form>
    </StyledPaper>
  );
};

export default SearchForm;
