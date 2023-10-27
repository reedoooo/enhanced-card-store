import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  debounce,
} from '@mui/material';
import { styled } from '@mui/system';
import LinearChart from './LinearChart';
import { useCollectionStore } from '../../context/hooks/collection';
import TimeRangeSelector, { timeRanges } from './TimeRangeSelector';
import { useChartContext } from '../../context/ChartContext/ChartContext';
import ErrorBoundary from '../../context/ErrorBoundary';

const ChartPaper = styled('div')(({ theme }) => ({
  borderRadius: '12px',
  // width: '100%',
  height: '100%',
  minWidth: '500px',
  maxWidth: '800px',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  backgroundColor: '#ffffff',
  color: '#333',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    minWidth: '300px',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '500px',
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: '700px',
  },
}));

const groupAndAverageData = (data, threshold = 1) => {
  if (!data || data.length === 0) return [];

  // 1. Create the clusters
  const clusters = [];
  let currentCluster = [data[0]];

  for (let i = 1; i < data.length; i++) {
    if (data[i].x - data[i - 1].x <= threshold) {
      currentCluster.push(data[i]);
    } else {
      clusters.push(currentCluster);
      currentCluster = [data[i]];
    }
  }
  clusters.push(currentCluster); // Push the last cluster

  // 2. For each cluster, find the middlemost x-value and average y-values
  const averagedData = clusters.map((cluster) => {
    const middleIndex = Math.floor(cluster.length / 2);
    const avgY =
      cluster.reduce((sum, point) => sum + point.y, 0) / cluster.length;

    return {
      x: cluster[middleIndex].x,
      y: avgY,
    };
  });

  return averagedData;
};

const PortfolioChart = () => {
  const { latestData, setLatestData, timeRange, setTimeRange } =
    useChartContext();
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const chartContainerRef = useRef(null);
  const { selectedCollection } = useCollectionStore();
  const datasets = selectedCollection?.chartData?.allXYValues || [];
  const datasets2 = useMemo(() => groupAndAverageData(datasets), [datasets]);

  // Debounced function for setting the last update time
  const debouncedSetLastUpdateTime = useMemo(
    () =>
      debounce(() => {
        const currentTime = new Date().getTime();

        if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
          setLastUpdateTime(currentTime);

          const lastDatasetIndex = datasets.length - 1;
          const lastDataset = datasets[lastDatasetIndex];
          lastDataset && setLatestData(lastDataset);
        }
      }, 100),
    [datasets, lastUpdateTime]
  );

  useEffect(() => {
    if (!datasets) return;
    debouncedSetLastUpdateTime();
  }, [datasets, debouncedSetLastUpdateTime]);

  const chartDimensions = useMemo(
    () =>
      chartContainerRef.current?.getBoundingClientRect() || {
        width: 400,
        height: 600,
      },
    [chartContainerRef.current]
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // width: '100%',
        // height: '100%',
      }}
    >
      <ErrorBoundary>
        {/* <Paper
        elevation={8}
        sx={{ padding: 2, borderRadius: 2, width: '100%', height: '100%' }}
      > */}
        <TimeRangeSelector
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        />
        <Grid
          item
          xs={12}
          sx={{
            height: '100%',
            m: '10px',
            padding: 2,
            borderRadius: 2,
            width: '100%',
          }}
        >
          <ChartPaper elevation={3} ref={chartContainerRef}>
            {datasets2.length > 0 ? (
              <LinearChart
                data={datasets2}
                latestData={latestData}
                dimensions={chartDimensions}
                timeRanges={timeRanges}
                timeRange={timeRange}
              />
            ) : (
              <div>No data available</div>
            )}
          </ChartPaper>
        </Grid>
        {/* </Paper> */}
      </ErrorBoundary>
    </Container>
  );
};

export default PortfolioChart;
