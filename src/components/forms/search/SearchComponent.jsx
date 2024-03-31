// DeckSearch.js
import React, { useEffect, useState } from 'react';
import {
  Card,
  Collapse,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  useMediaQuery,
} from '@mui/material';
import SearchResults from './SearchResults';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import SearchForm from '../SearchForm';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMode } from '../../../context';
import useLocalStorage from '../../../context/hooks/useLocalStorage';
import { useConfiguratorContext } from '../../../context';
import SimpleCard from '../../../layout/REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../layout/REUSABLE_COMPONENTS/unique/uniqueTheme';
import { useCardStoreHook } from '../../../context/MAIN_CONTEXT/CardContext/useCardStore';
const SearchComponent = (pageContext) => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const itemsPerPage = 12;
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { loadingSearchResults, searchSettings, setSearchSettings } =
    useCardStoreHook();
  const { toggleConfigurator } = useConfiguratorContext();
  const [searchData, setSearchData] = useLocalStorage('searchData', []);
  const initialData = JSON.parse(localStorage.getItem('searchData') || '[]');
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
                // flexDirection: 'column', // Stack elements vertically on mobile
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
            <SearchForm
              onFocus={() => setSearchBarFocused(true)}
              onBlur={() => setSearchBarFocused(false)}
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
          // className="hero-section-container"
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
