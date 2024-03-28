/* eslint-disable react/jsx-key */
import { Box, Grid, Typography, Skeleton, useMediaQuery } from '@mui/material';
// import PieChart from './statItems/PieChart';
import TotalPriceStatBox from './statItems/TotalPriceStatBox';
// import ValuDistributionCircle from './statItems/ValuDistributionCircle';
// import PricedCardList from './statItems/PricedCardList';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { useAppContext, useMode } from '../../../../context';
import ValuDistributionCircle from './statItems/ValuDistributionCircle';
import PricedCardList from './statItems/PricedCardList';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import TotalCardsCollectedStatBox from './statItems/TotalCardsCollectedStatBox';
import FlexBetween from '../../../REUSABLE_COMPONENTS/FlexBetween';

const SkeletonPieChart = ({ theme }) => (
  <MDBox
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '270px',
      bgcolor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
    }}
  >
    <Typography variant="h5" sx={{ mb: 2 }}>
      Collection Value Distribution
    </Typography>
    <Skeleton
      variant="circular"
      width={200}
      height={200}
      sx={{
        bgcolor: theme.palette.chartTheme.primary.main,
      }}
    />
  </MDBox>
);

const StatBoxes = () => {
  const { theme } = useMode();
  return (
    <MDBox sx={{ width: '100%', minHeight: '100%', flexGrow: 1 }}>
      <TotalCardsCollectedStatBox />
      <TotalPriceStatBox />
    </MDBox>
  );
};
const DistCircle = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const { allCollections } = useAppContext();
  if (!allCollections || allCollections.length === 0) {
    return (
      <MDBox sx={{ width: '100%', minHeight: '100%', flexGrow: 1 }}>
        <SkeletonPieChart theme={theme} />
      </MDBox>
    );
  }
  return (
    <MDBox
      sx={{ width: '100%', minHeight: '100%', flexGrow: 1, maxHeight: 270 }}
    >
      <ValuDistributionCircle collections={allCollections} />
    </MDBox>
  );
};

const PriceList = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MDBox sx={{ width: '100%', minHeight: '100%', flexGrow: 1 }}>
      <PricedCardList />
    </MDBox>
  );
};
const StatBoard = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <Grid
        container
        // spacing={2}
        sx={{
          alignItems: 'flex-start',
          ...(isMobile
            ? {
                flexDirection: 'column', // Stack items vertically on mobile
                maxHeight: 'none', // Remove maxHeight to allow content to flow
                minHeight: 'none', // Adjust minHeight accordingly
                my: 1, // Adjust vertical margin
              }
            : {
                maxHeight: '270px',
                minHeight: '270px',
                my: 2, // Maintain original styling for larger screens
              }),
        }}
      >
        {[<StatBoxes />, <DistCircle />, <PriceList />].map(
          (component, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ width: '100%', minHeight: '100%', maxHeight: 270 }}
            >
              <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                {component}
              </FlexBetween>
            </Grid>
          )
        )}
      </Grid>
    </SimpleCard>
  );
};

export default StatBoard;
