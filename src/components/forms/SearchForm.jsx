import React from 'react';
import {
  FormWrapper,
  StyledButton,
  StyledPaper,
  StyledTextField,
} from './styled';

import { Button, Grid } from '@mui/material';
import { useMode } from '../../context';

const SearchForm = ({
  searchTerm,
  handleChange,
  handleSubmit,
  handleKeyPress,
  onFocus,
  onBlur,
}) => {
  const { theme } = useMode();

  return (
    <StyledPaper theme={theme}>
      <FormWrapper
        onSubmit={handleSubmit}
        theme={theme}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
          width: '100%',
          // background: theme.palette.backgroundA.light,
          // background: theme.palette.backgroundB.lighter,
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
    </StyledPaper>
  );
};

export default SearchForm;
