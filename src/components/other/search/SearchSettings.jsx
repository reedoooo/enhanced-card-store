// SearchSettings.jsx
import React, { useState } from 'react';
import { Paper, Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import SearchFormB from './SearchFormB'; // Ensure path is correct
import { useMode } from '../../../context';

export const commonPaperStyles = (theme) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.success.dark,
  boxShadow: theme.shadows[3],
  margin: 'auto',
  width: '100%',
  maxWidth: 'md',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
});

const SearchSettingsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

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
        {' '}
        {/* <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: theme.palette.background.main,
            textTransform: 'uppercase',
          }}
        >
          Search Settings
        </Typography> */}
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
