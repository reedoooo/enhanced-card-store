import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CardLinearChart from './CardLinearChart';
import { ErrorBoundary, useMode, usePageContext } from '../context';
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
  // paddingTop: '100%',
  backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // width: isSmallScreen ? '100%' : '80%', // Adjust width based on screen size
  height: 'auto', // Adjust height as needed
  padding: theme.spacing(2), // Consistent padding
  overflow: 'auto', // Adds scroll to inner content if it overflows
}));

function handleThresholdUpdate(lastUpdateTime, setLastUpdateTime) {
  const currentTime = new Date().getTime();
  if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
    setLastUpdateTime(currentTime);
    return currentTime;
  }
  return lastUpdateTime;
}

const CardChart = ({ cardData }) => {
  const { setLoading, loadingStatus, returnDisplay } = usePageContext();
  if (!cardData || !cardData?.dailyPriceHistory) {
    setLoading('isLoading', true);
  }
  const safeCardData = cardData || { dailyPriceHistory: [] };
  const dailyPriceHistory = safeCardData?.dailyPriceHistory;
  if (!dailyPriceHistory?.length) {
    setLoading('isLoading', true);
  }

  useEffect(() => {
    if (dailyPriceHistory?.length) {
      setLoading('isLoading', false);
    }
  }, [dailyPriceHistory]);
  // STYLING AND MEDIA QUERY HOOKS
  const { theme } = useMode();
  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down('sm'));
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  const calculateChartDimensions = useCallback(() => {
    if (chartContainerRef.current) {
      const width = chartContainerRef.current.offsetWidth;
      const minWidth = isMobile ? 300 : 400;
      const height = width * 0.7; // 70% of width
      const minHeight = minWidth * 0.7;
      setChartDimensions({ width, height, minWidth, minHeight });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => calculateChartDimensions();
    window.addEventListener('resize', handleResize);
    calculateChartDimensions();
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateChartDimensions]);

  const chartData = useMemo(
    () =>
      cardData?.dailyPriceHistory?.map((priceEntry) => ({
        x: priceEntry?.timestamp,
        y: priceEntry?.num,
      })),
    [cardData.dailyPriceHistory]
  );

  const nivoReadyData = useMemo(
    () => [{ id: cardData?.name, data: chartData }],
    [chartData, cardData?.name]
  );

  // // Return loading indicator, error message, or chart based on data status
  // if (!dailyPriceHistory?.length) {
  //   return <LoadingIndicator />; // or some placeholder text
  // }

  return (
    <React.Fragment>
      <ResponsiveSquare theme={theme}>
        {loadingStatus?.isLoading && returnDisplay()}
        <Container maxWidth="lg">
          <ErrorBoundary>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ChartPaper ref={chartContainerRef}>
                  <CardLinearChart
                    nivoReadyData={nivoReadyData}
                    dimensions={chartDimensions}
                  />
                </ChartPaper>
              </Grid>
            </Grid>
          </ErrorBoundary>
        </Container>
      </ResponsiveSquare>
    </React.Fragment>
  );
};

export default CardChart;
