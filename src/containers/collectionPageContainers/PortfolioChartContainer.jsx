import React, { useMemo } from 'react';
import { Box, Grid, Paper, Container, useTheme } from '@mui/material';
import PortfolioChart from '../../components/chart/PortfolioChart';
import TimeRangeSelector from '../../components/other/InputComponents/TimeRangeSelector';
import CollectionStatisticsSelector, {
  calculateStatistics,
} from '../../components/other/InputComponents/CollectionStatisticsSelector';
import UpdateStatusBox2 from '../../components/other/InputComponents/UpdateStatusBox2';
import TopCardsDisplay from '../../components/other/TopCardsDisplay';
import { useChartContext } from '../../context/ChartContext/ChartContext';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useCombinedContext } from '../../context/CombinedProvider';

const PortfolioChartContainer = ({ selectedCards, removeCard }) => {
  const theme = useTheme();
  const { timeRange } = useChartContext();
  const { allCollections } = useCollectionStore();
  const { socket } = useCombinedContext();

  const data = allCollections.map((collection) => ({
    data: collection?.currentChartDataSets2,
  }));
  const dataForStats = data[0];
  const stats = useMemo(
    () => calculateStatistics(dataForStats, timeRange),
    [dataForStats, timeRange]
  );

  return (
    <Box
      sx={{
        maxWidth: '100%',
        width: '100%',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3),
      }}
    >
      {/* Updaters Row */}
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={4} md={4}>
          <UpdateStatusBox2 socket={socket} />
        </Grid>
        <Grid item xs={4} md={4}>
          <TimeRangeSelector data={data} />
          <CollectionStatisticsSelector
            timeRange={timeRange}
            data={data}
            stats={stats}
          />
        </Grid>
        <Grid item xs={4} md={4}>
          {/* Additional Components */}
        </Grid>
      </Grid>

      {/* Main Grid Container */}
      <Grid container spacing={2}>
        {/* Portfolio Chart Row */}
        <Grid item xs={12}>
          <PortfolioChart
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>

        {/* Additional Rows */}
        <Grid item xs={12}>
          <TopCardsDisplay />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioChartContainer;
