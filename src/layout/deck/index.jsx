import { Box, Grid } from '@mui/material';
import { useMode } from '../../context';
import DeckSearch from '../../components/other/search/DeckSearch';
import DeckDisplay from './DeckDisplay';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import { PortfolioBoxA } from '../../context/hooks/style-hooks/usePortfolioStyles';
import SearchComponent from '../../components/other/search/SearchComponent';

const DeckBuilder = () => {
  const { theme } = useMode();
  const deckBuilderHeight = {
    xs: '90vh', // 90% for mobile screens
    sm: '85vh', // 80% for small screens and up
    md: '80vh', // 75% for medium screens and up
    lg: '75vh', // 70% for large screens and up
  };
  return (
    <PageLayout>
      <MDBox
        py={3}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {' '}
        <PortfolioBoxA theme={theme}>
          <Grid
            item
            xs={12}
            sx={{
              height: deckBuilderHeight,
              position: 'relative',
              px: 'auto',
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                height: '100%',
                overflow: 'auto', // Add scroll for overflow content
                padding: theme.spacing(3),
                backgroundColor: theme.palette.backgroundB.default,
                borderRadius: theme.shape.borderRadius,
                color: theme.palette.text.primary,
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Grid item xs={12} md={6}>
                  {/* <DeckSearch /> */}
                  <SearchComponent pageContext={'Deck'} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DeckDisplay />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </PortfolioBoxA>
      </MDBox>
    </PageLayout>
  );
};

export default DeckBuilder;
