import React, { useMemo } from 'react';
import { Box, Grid, Paper, Container, useTheme } from '@mui/material';
import PortfolioChart from '../../components/chart/PortfolioChart';
import TimeRangeSelector from '../../components/other/InputComponents/TimeRangeSelector';
import UpdateStatusBox2 from '../../components/other/InputComponents/UpdateStatusBox2';
import TopCardsDisplay from '../../components/other/dataDisplay/TopCardsDisplay';
import { useChartContext } from '../../context/ChartContext/ChartContext';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useCombinedContext } from '../../context/CombinedContext/CombinedProvider';
import { calculateStatistics } from '../../context/StatisticsContext/helpers';
import CollectionStatisticsSelector from '../../components/other/InputComponents/CollectionStatisticsSelector';
import { useStatisticsStore } from '../../context/StatisticsContext/StatisticsContext';
import { useMode } from '../../context';

const CollectionPortfolioChartContainer = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();
  const theme2 = useTheme();
  const { timeRange } = useChartContext();
  const { allCollections } = useCollectionStore();
  const { socket } = useCombinedContext();
  const { stats, statsByCollectionId } = useStatisticsStore();

  return (
    // <Grid container spacing={1}>
    <Box
      sx={{
        maxWidth: '100%',
        width: '100%',
        minHeight: '90vh',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1), // Optimized padding for xs
      }}
    >
      {/* Portfolio Chart Row */}
      <Grid container spacing={1} order={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}>
          <PortfolioChart
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
      </Grid>

      {/* Updaters Row */}
      <Grid container spacing={1} order={{ xs: 2, sm: 1 }} marginBottom={2}>
        <Grid item xs={12} sm={4}>
          <UpdateStatusBox2 socket={socket} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TimeRangeSelector />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CollectionStatisticsSelector timeRange={timeRange} stats={stats} />
        </Grid>
      </Grid>

      {/* Top Cards Display Row */}
      <Grid container spacing={1} order={{ xs: 3 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              background: theme.palette.background.dark,
              padding: theme.spacing(1), // Optimized padding for xs
              color: '#fff', // White text color
              borderRadius: 4,
            }}
          >
            <TopCardsDisplay />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CollectionPortfolioChartContainer;

{
  /* Updaters Row
      <Grid container spacing={1} marginBottom={2}>
        <Grid item xs={4} md={4}>
          <UpdateStatusBox2 socket={socket} />
        </Grid>
        <Grid item xs={4} md={4}>
          <TimeRangeSelector />
          <CollectionStatisticsSelector
            timeRange={timeRange}
            // data={data}
            stats={stats}
          />
        </Grid>
        <Grid item xs={4} md={4}>
          {/* Additional Components */
}
{
  /* </Grid> */
}
{
  /* </Grid> */
}

{
  /* Main Grid Container */
}

{
  /* <Grid container spacing={1}>
        {/* Portfolio Chart Row */
}
{
  /* <Grid item xs={12}>
          <PortfolioChart
            selectedCards={selectedCards}
            removeCard={removeCard} */
}
{
  /* // /> */
}
{
  /* </Grid> */
}

{
  /* Additional Rows */
}
{
  /* <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              // background: theme.palette.background.main,
              background: theme.palette.background.dark,
              padding: {
                xs: 0,
                sm: theme.spacing(1),
                md: theme.spacing(2),
                lg: theme.spacing(2),
              },
              color: '#fff', // White text color
              // padding: 2,
              borderRadius: 4,
              // margin: 'auto',
            }}
          >
            <Grid item xs={12}>
              <TopCardsDisplay />
            </Grid>
          </Box>
        </Grid>
      </Grid> */
}
{
  /* </Box> */
}
{
  /* // </Grid> */
}
