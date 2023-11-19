import React, { useMemo } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import PortfolioChart from '../components/chart/PortfolioChart';
import TimeRangeSelector from '../components/other/InputComponents/TimeRangeSelector';
import CollectionStatisticsSelector, {
  calculateStatistics,
} from '../components/other/InputComponents/CollectionStatisticsSelector';
import UpdateStatusBox from '../components/other/InputComponents/UpdateStatusBox';
import { useTheme } from '@mui/material/styles';
import { useSocketContext } from '../context/SocketProvider';
import { useChartContext } from '../context/ChartContext/ChartContext';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import CollectionValueTracker from '../components/other/CollectionValueTracker';
import { useCombinedContext } from '../context/CombinedProvider';
import UpdateStatusBox2 from '../components/other/InputComponents/UpdateStatusBox2';
const paperChartStyle = {
  elevation: 3,
  borderRadius: 2,
  p: 2,
  // height: '25vh', // Set the container height to 25vh
  maxWidth: '100vw',
  display: 'flex',
  flexDirection: 'row', // Change to 'row' to fit selectors horizontally
  justifyContent: 'space-between', // Distribute space evenly between selectors
  alignItems: 'center', // Align items vertically in the center
  gap: 2, // Set a gap between the selectors
};
const selectorStyle = {
  flex: 1, // Allow the selector to grow
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Set the selector height to 100%
};

const PortfolioChartContainer = ({ selectedCards, removeCard }) => {
  const theme = useTheme();
  // const { socket } = useSocketContext();
  const { socket } = useCombinedContext();
  const { timeRange } = useChartContext();
  const { allCollections, selectedCollection } = useCollectionStore();
  const data = allCollections.map((collection) => ({
    data: collection?.currentChartDataSets2,
  }));
  const dataForStats = data[0];
  const stats = useMemo(
    () => calculateStatistics(dataForStats, timeRange),
    [dataForStats, timeRange]
  );

  const containerStyle = {
    maxWidth: '100%',
    // margin: 'auto',
    padding: theme.spacing(2),
    overflow: 'hidden',
  };

  const paperStyle = {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
  };

  const gridItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <Box sx={containerStyle}>
      {/* Updaters Row */}
      {/* <Grid container spacing={2} marginBottom={2}> */}
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={4} md={4} sx={gridItemStyle}>
          <UpdateStatusBox2 socket={socket} />
        </Grid>
        <Grid item xs={4} md={4} sx={gridItemStyle}>
          {/* <TimeRangeSelector data={data} /> */}
        </Grid>
        <Grid item xs={4} md={4} sx={gridItemStyle}>
          <CollectionValueTracker
            data={selectedCollection}
            filteredData={data}
            stats={stats}
          />
        </Grid>
      </Grid>

      {/* Main Grid Container */}
      <Grid container spacing={2}>
        {/* Portfolio Chart Row */}
        <Grid item xs={12}>
          <Paper sx={paperStyle}>
            <PortfolioChart
              selectedCards={selectedCards}
              removeCard={removeCard}
            />
          </Paper>
        </Grid>

        {/* Selectors Row */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={4}>
            <UpdateStatusBox socket={socket} />
          </Grid>
          <Grid item xs={4}>
            <TimeRangeSelector sx={selectorStyle} data={data} />
          </Grid>
          <Grid item xs={4}>
            <CollectionStatisticsSelector
              sx={selectorStyle}
              timeRange={timeRange}
              data={data}
              stats={stats}
            />{' '}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioChartContainer;
