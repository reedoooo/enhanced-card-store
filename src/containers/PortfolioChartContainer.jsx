import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import PortfolioChart from '../components/other/PortfolioChart';
import TimeRangeSelector from '../components/other/TimeRangeSelector';
import CollectionStatisticsSelector from '../components/other/CollectionStatisticsSelector';
import UpdateStatusBox from '../components/other/UpdateStatusBox';
import { useTheme } from '@mui/material/styles';
import { useSocketContext } from '../context/SocketProvider';
import { useChartContext } from '../context/ChartContext/ChartContext';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import CollectionValueTracker from '../components/other/CollectionValueTracker';
const paperStyle = {
  elevation: 3,
  borderRadius: 2,
  p: 2,
  height: '25vh', // Set the container height to 25vh
  display: 'flex',
  flexDirection: 'row', // Change to 'row' to fit selectors horizontally
  justifyContent: 'space-between', // Distribute space evenly between selectors
  alignItems: 'center', // Align items vertically in the center
  gap: 2, // Set a gap between the selectors
};
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
  const selectorStyle = {
    // width: '100%',
    // maxWidth: '100vw',
    // maxWidth: '250px', // Match the width of the update box if needed
    mb: theme.spacing(2),
  };

  const { socket } = useSocketContext();
  const { timeRange } = useChartContext();
  const { allCollections, selectedCollection } = useCollectionStore();
  const data = allCollections.map((collection) => {
    return {
      name: collection.name,
      data: collection.chartData.allXYValues,
    };
  });
  return (
    <Box
      sx={{
        maxWidth: '100vw',
        margin: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Updaters Row */}
      <Grid item xs={12} container spacing={1}>
        <Grid item xs={4}>
          {/* <UpdateStatusBox socket={socket} /> */}
        </Grid>
        <Grid item xs={4}>
          {/* <TimeRangeSelector sx={selectorStyle} data={data} /> */}
        </Grid>
        <Grid item xs={4}>
          <CollectionValueTracker data={selectedCollection} />
        </Grid>
      </Grid>

      {/* Main Grid Container */}
      <Grid container spacing={1} direction="column">
        {/* Portfolio Chart Row */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              height: 'auto', // Adjust height as needed
              maxWidth: '100vw',
              marginBottom: '8px', // Space between chart and selectors
            }}
          >
            <PortfolioChart
              selectedCards={selectedCards}
              removeCard={removeCard}
            />
          </Paper>
        </Grid>

        {/* Selectors Row */}
        <Grid item xs={12} container spacing={1}>
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
            />{' '}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioChartContainer;
