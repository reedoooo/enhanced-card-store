import { Box, Grid } from '@mui/material';
import { useMode } from '../../context';
import DeckDisplay from './DeckDisplay';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import SearchComponent from '../../components/forms/search/SearchComponent';

const DeckBuilder = () => {
  const { theme } = useMode();
  return (
    <PageLayout>
      <MDBox
        py={3}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          // minHeight: 'calc(100vh - 64px)', // Adjust this value based on your header/footer height
          overflow: 'auto', // Ensures content can scroll if it exceeds the container's height
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.backgroundB.default,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              flexGrow: 1,
            }}
          >
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                flexGrow: 1,
              }}
            >
              <SearchComponent pageContext="Deck" />
            </Grid>
            <Grid item xs={12} md={5}>
              <DeckDisplay />
            </Grid>
          </Grid>
        </Box>
      </MDBox>
    </PageLayout>
  );
};

export default DeckBuilder;
