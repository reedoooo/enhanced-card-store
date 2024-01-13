import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
  Container,
} from '@mui/material';
import PortfolioChart from '../../assets/cleanup/PortfolioChart';
import TimeRangeSelector from '../../components/other/InputComponents/TimeRangeSelector';
import UpdateStatusBox2 from '../../components/other/InputComponents/UpdateStatusBox2';
import TopCardsDisplay from '../../components/other/dataDisplay/TopCardsDisplay';
import CollectionStatisticsSelector from '../../components/other/InputComponents/CollectionStatisticsSelector';
import {
  useChartContext,
  useCollectionStore,
  useCombinedContext,
  useStatisticsStore,
  useMode,
  ErrorBoundary,
  usePageContext,
} from '../../context';
import { styled } from '@mui/styles';
import { debounce } from 'lodash';
import LoadingIndicator from '../../components/reusable/indicators/LoadingIndicator';
import LinearChart from '../../components/other/dataDisplay/chart/LinearChart';

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
  flexGrow: 1,
}));

const ResponsiveSquare = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingTop: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: 'flex',
  flexGrow: 1,
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
const CollectionPortfolioChartContainer = ({ selectedCards, removeCard }) => {
  const { theme } = useMode();
  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down('sm'));
  const [dataReady, setDataReady] = useState(false);

  const { latestData, timeRange, groupAndAverageData, convertDataForNivo2 } =
    useChartContext();
  const { allCollections } = useCollectionStore();
  const { socket } = useCombinedContext();
  const { stats, statsByCollectionId, markers } = useStatisticsStore();
  const { selectedCollection, allXYValues } = useCollectionStore();
  const lastUpdateTimeRef = useRef(null);

  const chartRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const HEIGHT_TO_WIDTH_RATIO = 7 / 10;
  const threshold = useMemo(
    () => handleThresholdUpdate(lastUpdateTimeRef),
    [lastUpdateTimeRef]
  );
  // Dynamically calculate and set chart dimensions
  const calculateChartDimensions = useCallback(() => {
    if (chartRef.current) {
      const width = chartRef.current.offsetWidth;
      const height = width * HEIGHT_TO_WIDTH_RATIO; // Maintain aspect ratio
      setChartDimensions({ width, height });
    }
  }, []);

  useEffect(() => {
    calculateChartDimensions(); // Calculate on initial load
    const handleResize = debounce(calculateChartDimensions, 100); // Debounce resize event
    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateChartDimensions]);

  if (!allXYValues?.length) {
    return <LoadingIndicator />; // Show loading indicator while data is being fetched
  }

  const rawData = groupAndAverageData(allXYValues, threshold, timeRange);
  const nivoReadyData = convertDataForNivo2(rawData);

  if (!nivoReadyData.length) {
    return <ResponsiveSquare>No data available</ResponsiveSquare>;
  }

  // Effect: Set data ready state based on allXYValues
  useEffect(() => {
    if (Array.isArray(allXYValues) && allXYValues?.length > 0) {
      setDataReady(true);
    }
  }, [allXYValues]);
  useLayoutEffect(() => {
    if (dataReady) {
      calculateChartDimensions();
    }
  }, [dataReady]);

  return (
    <Box
      sx={{
        maxWidth: '100%',
        width: '100%',
        minHeight: '90vh',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? theme.spacing(1) : theme.spacing(2),
      }}
    >
      {/* Portfolio Chart Row */}
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12}>
          <ErrorBoundary>
            <Container
              maxWidth="lg"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? theme.spacing(1) : theme.spacing(2),
                gap: theme.spacing(2),
                background: '#333',
                color: '#fff',
                border: '1px solid #555',
                borderRadius: 2,
                justifyContent: 'center', // Centers vertically
              }}
            >
              {/* Portfolio Chart */}
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid item xs={12}>
                  <ChartPaper ref={chartRef}>
                    <LinearChart
                      nivoReadyData={nivoReadyData}
                      dimensions={chartDimensions}
                      timeRange={timeRange}
                      specialPoints={markers}
                      // specialPoints={[
                      //   { highPoint: statsByCollectionId?.highPoint },
                      //   { lowPoint: statsByCollectionId?.highPoint },
                      //   { average: statsByCollectionId?.average },
                      // ]}
                    />
                  </ChartPaper>
                </Grid>
              </Grid>
              {/* <ErrorBoundary>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{ height: '100%', borderRadius: 2, width: '100%' }}
                >
                  <ChartPaper elevation={3} ref={chartContainerRef}>
                    {allXYValues?.length > 0 && rawData2?.length > 0 ? (
                      <LinearChart
                        nivoReadyData={nivoReadyData2}
                        // filteredChartData={filteredChartData2}
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
            </ErrorBoundary> */}
            </Container>
          </ErrorBoundary>
        </Grid>
      </Grid>

      {/* Updaters Row */}
      <Grid container spacing={isMobile ? 1 : 2} marginBottom={2}>
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
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              background: theme.palette.background.dark,
              padding: isMobile ? theme.spacing(1) : theme.spacing(2),
              color: '#fff',
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
