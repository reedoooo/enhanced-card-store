// DeckSearch.js
import React, { useEffect } from 'react';
import { Card, Container, Grid, IconButton } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';

import SearchResults from './SearchResults';

import {
  useBreakpoint,
  useMode,
  useCardStore,
  useConfigurator,
  useLocalStorage,
} from 'context';

import { formFields } from 'data';
import {
  MDBox,
  RCCard,
  RCDynamicForm,
  RCTypography,
} from 'layout/REUSABLE_COMPONENTS';

const SearchComponent = (pageContext) => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  const { loadingSearchResults } = useCardStore();
  const { toggleConfigurator } = useConfigurator();
  const itemsPerPage = 12;
  const [searchData, setSearchData] = useLocalStorage('searchData', []);
  useEffect(() => {
    const handleStorageChange = () => {
      const newData = JSON.parse(localStorage.getItem('searchData') || '[]');
      if (newData.length !== searchData.length) {
        setSearchData(newData);
      }
    };
    window.addEventListener('local-storage', handleStorageChange);
    handleStorageChange();

    return () =>
      window.removeEventListener('local-storage', handleStorageChange);
  }, [searchData, setSearchData]); // Add dependencies to useEffect
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <RCCard
          hasTitle={false}
          variant="search"
          sx={{
            elevation: isMobile ? 0 : 3, // Remove elevation on mobile
            p: isMobile ? 0 : theme.spacing(2), // Remove padding on mobile
            boxShadow: isMobile ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme.spacing(1),
              borderRadius: theme.spacing(1),
              width: '90%',
              mx: 'auto',
              border: 'none',
              ...(isMobile && {
                p: theme.spacing(2),
              }),
            }}
          >
            <RCTypography
              variant="h4"
              align="left"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.grey.simpleGrey,
                textTransform: 'uppercase',
                marginBottom: isMobile ? theme.spacing(2) : 0, // Add bottom margin on mobile
              }}
            >
              Search Cards
            </RCTypography>
            <IconButton
              aria-label="settings"
              onClick={toggleConfigurator}
              size="large"
            >
              <SettingsIcon
                sx={{
                  fontSize: '3rem',
                }}
              />
            </IconButton>
          </MDBox>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RCDynamicForm
              formKey={'searchForm'}
              inputs={formFields['searchForm']}
              userInterfaceOptions={{
                submitButton: true,
                submitButtonLabel: 'Search',
                deleteButton: false,
                startIcon: <SearchIcon />,
              }}
            />
          </Container>
        </RCCard>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          mx: '2rem',
        }}
      >
        <Card
          sx={{
            width: '100%',
            backgroundColor: 'transparent', // Make the Card background transparent
            p: theme.spacing(1),
            m: theme.spacing(2),
            justifyContent: 'center',
          }}
        >
          <SearchResults
            isLoading={loadingSearchResults}
            searchData={searchData}
            uniqueCards={searchData}
            pageContext={pageContext}
            itemsPerPage={itemsPerPage}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default SearchComponent;
