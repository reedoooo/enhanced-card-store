/* eslint-disable react/jsx-key */
import { Box, Grid, Typography, Skeleton, useMediaQuery } from '@mui/material';
import TotalPriceStatBox from './statItems/TotalPriceStatBox';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { useAppContext, useMode } from '../../context';
import ValuDistributionCircle from './statItems/ValuDistributionCircle';
import PricedCardList from './statItems/PricedCardList';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import TotalCardsCollectedStatBox from './statItems/TotalCardsCollectedStatBox';
import FlexBetween from '../REUSABLE_COMPONENTS/FlexBetween';
import { Divider } from '@mui/joy';
import { SkeletonPieChart } from '../REUSABLE_COMPONENTS/system-utils/SkeletonVariants';
import useBreakpoint from '../../context/hooks/useBreakPoint';

const StatBoxes = () => {
  return (
    <>
      <TotalCardsCollectedStatBox />
      <Divider />
      <TotalPriceStatBox />
    </>
  );
};
const DistCircle = () => {
  return <ValuDistributionCircle />;
};

const PriceList = () => {
  return <PricedCardList />;
};
const StatBoard = () => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const { isMobile } = useBreakpoint();
  return (
    <SimpleCard
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <Grid
        container
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
                <MDBox
                  sx={{
                    width: '100%',
                    minHeight: '100%',
                    flexGrow: 1,
                    maxHeight: 270,
                    border: 'none',
                  }}
                >
                  {component}
                </MDBox>
              </FlexBetween>
            </Grid>
          )
        )}
      </Grid>
    </SimpleCard>
  );
};

export default StatBoard;
