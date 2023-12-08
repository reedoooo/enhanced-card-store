import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Container, Grid, Paper, styled, useTheme } from '@mui/material';
import LinearChart from './LinearChart';
import { useChartContext } from '../../context/ChartContext/ChartContext';
import ErrorBoundary from '../../context/ErrorBoundary';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import debounce from 'lodash/debounce';
import { getUniqueValidData } from '../../context/CollectionContext/helpers';
import { usePageContext } from '../../context';
import LoadingIndicator from '../reusable/indicators/LoadingIndicator';

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
    setLastUpdateTime(currentTime);
    return currentTime;
  }
  return lastUpdateTime;
}

const PortfolioChart = () => {
  const { selectedCollection, allXYValues } = useCollectionStore();
  const { latestData, timeRange, groupAndAverageData, convertDataForNivo2 } =
    useChartContext();
  const { isLoading, setIsLoading, displayLoadingIndicator } = usePageContext();
  const theme = useTheme();

  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const HEIGHT_TO_WIDTH_RATIO = 7 / 10;
  const [dataReady, setDataReady] = useState(false);
  const threshold = useMemo(
    () => handleThresholdUpdate(lastUpdateTime, setLastUpdateTime),
    [lastUpdateTime]
  );
  const calculateChartDimensions = () => {
    if (chartContainerRef.current) {
      const width = chartContainerRef.current.offsetWidth;
      const height = width * HEIGHT_TO_WIDTH_RATIO;
      setChartDimensions({ width, height });
    }
  };
  useEffect(() => {
    if (allXYValues && Array.isArray(allXYValues) && allXYValues.length > 0) {
      setDataReady(true);
    }
  }, [allXYValues]);
  useLayoutEffect(() => {
    if (dataReady) {
      calculateChartDimensions();
    }
  }, [dataReady]);
  const getFilteredData2 = useCallback((values) => {
    if (!values || !Array.isArray(values) || !values?.length > 0) return [];
    return getUniqueValidData(values || []);
  }, []);
  const filteredChartData2 = useMemo(
    () => getFilteredData2(allXYValues),
    [allXYValues, timeRange, getFilteredData2]
  );
  const isEnoughData = filteredChartData2?.length >= 5;
  const rawData2 = useMemo(() => {
    return groupAndAverageData(filteredChartData2, threshold, timeRange);
  }, [filteredChartData2, threshold, timeRange]);

  const nivoReadyData2 = useMemo(() => {
    return rawData2?.length > 0 ? convertDataForNivo2(rawData2) : [];
  }, [rawData2]);
  useEffect(() => {
    const handleResize = debounce(calculateChartDimensions, 100);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);
  if (!dataReady) {
    return LoadingIndicator();
  }

  if (!isEnoughData || rawData2?.length === 0) {
    return (
      <ResponsiveSquare>
        <div>Not enough data points</div>
      </ResponsiveSquare>
    );
  }

  if (!filteredChartData2 || filteredChartData2?.length === 0) {
    return <div>No data available</div>;
  }

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
