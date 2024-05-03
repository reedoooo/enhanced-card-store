// DeckSearch.js
import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, IconButton } from '@mui/material';
import SearchResults from './SearchResults';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from 'layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMode } from 'context';
import useLocalStorage from 'context/hooks/useLocalStorage';
import { useConfiguratorContext } from 'context';
import SimpleCard from 'layout/REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from 'layout/REUSABLE_COMPONENTS/unique/uniqueTheme';
import { useCardStoreHook } from 'context/useCardStore';
import RCDynamicForm from '../Factory/RCDynamicForm';
import { formFields } from '../formsConfig';
import SearchIcon from '@mui/icons-material/Search';
import useBreakpoint from 'context/hooks/useBreakPoint';
const SearchComponent = (pageContext) => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  const itemsPerPage = 12;
  const { loadingSearchResults } = useCardStoreHook();
  const { toggleConfigurator } = useConfiguratorContext();
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
        <SimpleCard
          theme={uniqueTheme}
          hasTitle={false}
          isSearchFormHeader={true}
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
            <MDTypography
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
            </MDTypography>
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
        </SimpleCard>
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
