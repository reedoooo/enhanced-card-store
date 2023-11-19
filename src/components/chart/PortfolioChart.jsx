import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Container, Grid, Paper, styled, useTheme } from '@mui/material';
import LinearChart from './LinearChart';
import { useChartContext } from '../../context/ChartContext/ChartContext';
import ErrorBoundary from '../../context/ErrorBoundary';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { useCombinedContext } from '../../context/CombinedProvider';
import debounce from 'lodash/debounce';
import {
  convertDataForNivo2,
  getFilteredData2,
  groupAndAverageData,
} from './chartUtils';

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

const PortfolioChart = () => {
  const theme = useTheme();
  const { latestData, setLatestData, timeRange } = useChartContext();
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const chartContainerRef = useRef(null);
  // const [nivoReadyData2, setNivoReadyData2] = useState(null); // Declare state for nivoReadyData2

  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { selectedCollection } = useCollectionStore();

  const filteredChartData2 = getFilteredData2(selectedCollection);
  // let nivoReadyData2 = [];
  // const rawData2 = useMemo(
  //   () => groupAndAverageData(filteredChartData2, threshold),
  //   [filteredChartData2, threshold]
  // );

  const handleThresholdUpdate = () => {
    const currentTime = new Date().getTime();
    if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
      // 10 minutes
      setLastUpdateTime(currentTime);
      return currentTime;
    }
    return lastUpdateTime;
  };

  const threshold = handleThresholdUpdate();
  const rawData2 = useMemo(
    () => groupAndAverageData(filteredChartData2, threshold),
    [filteredChartData2, threshold]
  );

  const nivoReadyData2 = useMemo(
    () => convertDataForNivo2(rawData2),
    [rawData2]
  );

  const HEIGHT_TO_WIDTH_RATIO = 2 / 3;

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
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
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
              {filteredChartData2.length > 0 ? (
                <LinearChart
                  nivoReadyData={nivoReadyData2}
                  filteredChartData={filteredChartData2}
                  latestData={latestData}
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
