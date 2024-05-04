// SearchSettings.jsx
import React, { useState } from 'react';
import { Paper, Box, Container, Typography } from '@mui/material';
import SearchFormB from './SearchFormB'; // Ensure path is correct
import { useMode } from 'context';
import { SearchSettingsBox } from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

export const commonPaperStyles = (theme) => ({
  padding: theme.spacing(3),
  borderRadius: theme.borders.borderRadius.md,
  background: theme.palette.greenAccent.light,
  boxShadow: theme.shadows[3],
  margin: 'auto',
  width: '100%',
  maxWidth: 'md',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
});

const SearchSettings = () => {
  const [searchSettings, setSearchSettings] = useState({
    search: '',
    searchBy: 'title',
    sortBy: 'release_date',
  });

  const { theme } = useMode();

  const handleSearch = (e) => {
    setSearchSettings({
      ...searchSettings,
      search: e.target.value,
    });
  };

  const handleSearchBy = (e) => {
    setSearchSettings({
      ...searchSettings,
      searchBy: e.target.value,
    });
  };

  const handleSortBy = (e) => {
    setSearchSettings({
      ...searchSettings,
      sortBy: e.target.value,
    });
  };

  return (
    <Paper elevation={3} sx={commonPaperStyles(theme)}>
      <Container>
        <SearchSettingsBox theme={theme}>
          <SearchFormB
            searchSettings={searchSettings}
            handleSearch={handleSearch}
            handleSearchBy={handleSearchBy}
            handleSortBy={handleSortBy}
          />
        </SearchSettingsBox>
      </Container>
    </Paper>
  );
};

export default SearchSettings;
