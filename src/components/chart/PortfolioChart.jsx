import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Container, Grid, Paper, styled, useTheme } from '@mui/material';
import LinearChart from './LinearChart';
import { useChartContext } from '../../context/ChartContext/ChartContext';
import ErrorBoundary from '../../context/ErrorBoundary';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import debounce from 'lodash/debounce';
import { getFilteredData2 } from '../../context/CollectionContext/helpers';

const ChartPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '400px',
  overflow: 'hidden',
  margin: theme.spacing(2, 0),
}));

const ResponsiveSquare = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingTop: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function handleThresholdUpdate(lastUpdateTime, setLastUpdateTime) {
  const currentTime = new Date().getTime();
  if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
    // 10 minutes
    setLastUpdateTime(currentTime);
    return currentTime;
  }
  return lastUpdateTime;
}

const PortfolioChart = () => {
  const theme = useTheme();
  const {
    latestData,
    setLatestData,
    timeRange,
    groupAndAverageData,
    convertDataForNivo2,
    // getUniqueValidData,
    getTickValues,
    getFilteredData,
    formatDateToString,
  } = useChartContext();
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { selectedCollection } = useCollectionStore();

  const threshold = useMemo(
    () => handleThresholdUpdate(lastUpdateTime, setLastUpdateTime),
    [lastUpdateTime]
  );

  const filteredChartData2 = useMemo(
    () => getFilteredData2(selectedCollection, timeRange),
    [selectedCollection, timeRange]
  );

  if (filteredChartData2?.length < 5) {
    return (
      <Container maxWidth="lg" /* ... existing styles */>
        <ErrorBoundary>
          <ResponsiveSquare>
            <div>Not enough data points</div>
          </ResponsiveSquare>
        </ErrorBoundary>
      </Container>
    );
  }

  if (!filteredChartData2 || filteredChartData2?.length === 0) {
    console.warn(
      'Invalid input: filteredChartData2 should not be null or empty'
    );
    return filteredChartData2;
  }
  const rawData2 = useMemo(
    () => groupAndAverageData(filteredChartData2, threshold, timeRange), // Adjust to group and average data based on timeRange
    [filteredChartData2, threshold, timeRange]
  );

  if (!rawData2 || rawData2?.length === 0) {
    console.warn('Invalid input: rawData2 should not be null or empty');
    return rawData2;
  }

  const nivoReadyData2 = useMemo(
    () => convertDataForNivo2(rawData2),
    [rawData2]
  );

  const HEIGHT_TO_WIDTH_RATIO = 7 / 10;

  useEffect(() => {
    const handleResize = debounce(() => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.offsetWidth;
        const height = width * HEIGHT_TO_WIDTH_RATIO;
        setChartDimensions({ width, height });
      }
    }, 100);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        gap: theme.spacing(2),
        background: '#333', // Darker background for Paper
        color: '#fff', // White text color
        border: '1px solid #555',
        borderRadius: 2,
      }}
    >
      <ErrorBoundary>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{ height: '100%', borderRadius: 2, width: '100%' }}
          >
            <ChartPaper elevation={3} ref={chartContainerRef}>
              {filteredChartData2?.length > 0 && rawData2?.length > 0 ? (
                <LinearChart
                  nivoReadyData={nivoReadyData2}
                  filteredChartData={filteredChartData2}
                  latestData={latestData}
                  timeRange={timeRange}
                  dimensions={chartDimensions}
                  timeRanges={timeRange}
                />
              ) : (
                <div>No data available</div>
              )}
            </ChartPaper>
          </Grid>
        </Grid>
      </ErrorBoundary>
    </Container>
  );
};

export default PortfolioChart;
