import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  styled,
  useTheme,
  // debounce,
} from '@mui/material';
import LinearChart from './LinearChart';
import TimeRangeSelector from './TimeRangeSelector';
import { useChartContext } from '../../context/ChartContext/ChartContext';
import ErrorBoundary from '../../context/ErrorBoundary';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import CollectionStatisticsSelector from './CollectionStatisticsSelector';
import UpdateStatusBox from './UpdateStatusBox';
import { useCombinedContext } from '../../context/CombinedProvider';
import debounce from 'lodash/debounce';
import {
  convertDataForNivo,
  getUniqueFilteredXYValues,
  groupAndAverageData,
} from './chartUtils';

// const ChartPaper = styled(Paper)(({ theme }) => ({
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: theme.shadows[5],
//   backgroundColor: theme.palette.background.default,
//   color: theme.palette.text.secondary,
//   padding: theme.spacing(3),
//   [theme.breakpoints.down('sm')]: { minWidth: '300px' },
//   [theme.breakpoints.up('md')]: { minWidth: '500px' },
//   [theme.breakpoints.up('lg')]: { minWidth: '700px' },
// }));
const ChartPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(3),
  minHeight: '400px',
  width: '100%',
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}));
const PortfolioChart = () => {
  const theme = useTheme();
  const { latestData, setLatestData, timeRange, timeRanges } =
    useChartContext();
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { selectedCollection } = useCollectionStore();
  const { socket } = useCombinedContext();

  const filteredChartData = useMemo(() => {
    const allXYValues = selectedCollection?.chartData?.allXYValues;
    return allXYValues ? getUniqueFilteredXYValues(allXYValues) : [];
  }, [selectedCollection]);

  const threshold = useMemo(() => timeRange * 0.1, [timeRange]);
  const rawData = useMemo(
    () => groupAndAverageData(filteredChartData, threshold),
    [filteredChartData, threshold]
  );
  const nivoReadyData = useMemo(() => convertDataForNivo(rawData), [rawData]);

  // Now use this threshold when calling your data grouping function

  // Now use this threshold when calling your data grouping function
  const updateLastTime = () => {
    const currentTime = new Date().getTime();
    if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
      setLastUpdateTime(currentTime);
      const lastDataset = filteredChartData[filteredChartData.length - 1];
      lastDataset && setLatestData(lastDataset);
    }
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      if (chartContainerRef.current) {
        setChartDimensions({
          width: chartContainerRef.current.offsetWidth,
          height: chartContainerRef.current.offsetHeight,
        });
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
        backgroundColor: theme.palette.background.paper, // Dark background for the container
        color: theme.palette.text.primary, // Text color for better contrast
      }}
    >
      <ErrorBoundary>
        <Grid container spacing={2}>
          {/* <Box
          sx={{
            width: '100%',
            mb: 2, // Margin bottom for spacing
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.palette.background.dark, // Dark background for the Box
            p: 2, // Padding for the inner content
            borderRadius: 2,
          }}
        >
          <TimeRangeSelector value={timeRange} />
          <CollectionStatisticsSelector
            data={filteredChartData}
            timeRange={timeRange}
          />
          <UpdateStatusBox socket={socket} />
        </Box> */}
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
              {filteredChartData.length > 0 ? (
                <LinearChart
                  datesTimesValues={rawData}
                  nivoReadyData={nivoReadyData}
                  filteredChartData={filteredChartData}
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
        </Grid>
      </ErrorBoundary>
    </Container>
  );
};

export default PortfolioChart;

// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   MenuItem,
//   Paper,
//   Select,
//   styled,
//   useTheme,
//   // debounce,
// } from '@mui/material';
// import LinearChart from './LinearChart';
// import TimeRangeSelector from './TimeRangeSelector';
// import { useChartContext } from '../../context/ChartContext/ChartContext';
// import ErrorBoundary from '../../context/ErrorBoundary';
// import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
// import CollectionStatisticsSelector from './CollectionStatisticsSelector';
// import UpdateStatusBox from './UpdateStatusBox';
// import { useCombinedContext } from '../../context/CombinedProvider';
// import debounce from 'lodash/debounce';
// import {
//   convertDataForNivo,
//   getUniqueFilteredXYValues,
//   groupAndAverageData,
// } from './chartUtils';

// const ChartPaper = styled(Paper)(({ theme }) => ({
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: theme.shadows[5],
//   backgroundColor: theme.palette.background.default,
//   color: theme.palette.text.secondary,
//   padding: theme.spacing(3),
//   [theme.breakpoints.down('sm')]: { minWidth: '300px' },
//   [theme.breakpoints.up('md')]: { minWidth: '500px' },
//   [theme.breakpoints.up('lg')]: { minWidth: '700px' },
// }));

// const PortfolioChart = () => {
//   const theme = useTheme();
//   const { selectedCollection } = useCollectionStore();
//   const { timeRange } = useChartContext();
//   const chartContainerRef = useRef(null);
//   const [chartDimensions, setChartDimensions] = useState({
//     width: 400,
//     height: 400,
//   });
//   // const { latestData, setLatestData, timeRange, timeRanges } =
//   useChartContext();
//   const [lastUpdateTime, setLastUpdateTime] = useState(null);
//   const { socket } = useCombinedContext();

//   const filteredChartData = useMemo(() => {
//     const allXYValues = selectedCollection?.chartData?.allXYValues;
//     return allXYValues ? getUniqueFilteredXYValues(allXYValues) : [];
//   }, [selectedCollection]);

//   // const threshold = useMemo(() => timeRange * 0.1, [timeRange]);
//   // const rawData = useMemo(
//   //   () => groupAndAverageData(filteredChartData, threshold),
//   //   [filteredChartData, threshold]
//   // );
//   // const nivoReadyData = useMemo(() => convertDataForNivo(rawData), [rawData]);

//   // Now use this threshold when calling your data grouping function

//   // Now use this threshold when calling your data grouping function
//   const updateLastTime = () => {
//     const currentTime = new Date().getTime();
//     if (!lastUpdateTime || currentTime - lastUpdateTime >= 600000) {
//       setLastUpdateTime(currentTime);
//       const lastDataset = filteredChartData[filteredChartData.length - 1];
//       lastDataset && setLatestData(lastDataset);
//     }
//   };
//   const filteredChartData = useMemo(() => {
//     // Process data for the chart here using selectedCollection
//     return selectedCollection?.chartData?.allXYValues || [];
//   }, [selectedCollection]);

//   useEffect(() => {
//     const handleResize = debounce(() => {
//       if (chartContainerRef.current) {
//         setChartDimensions({
//           width: chartContainerRef.current.offsetWidth,
//           height: chartContainerRef.current.offsetHeight,
//         });
//       }
//     }, 100);

//     const resizeObserver = new ResizeObserver(handleResize);
//     if (chartContainerRef.current) {
//       resizeObserver.observe(chartContainerRef.current);
//     }

//     return () => {
//       resizeObserver.disconnect();
//       handleResize.cancel();
//     };
//   }, []);
//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         backgroundColor: theme.palette.background.paper, // Dark background for the container
//         color: theme.palette.text.primary, // Text color for better contrast
//       }}
//     >
//       <ErrorBoundary>
//         {/* <Box
//           sx={{
//             width: '100%',
//             mb: 2, // Margin bottom for spacing
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             backgroundColor: theme.palette.background.dark, // Dark background for the Box
//             p: 2, // Padding for the inner content
//             borderRadius: 2,
//           }}
//         >
//           <TimeRangeSelector value={timeRange} />
//           <CollectionStatisticsSelector
//             data={filteredChartData}
//             timeRange={timeRange}
//           />
//           <UpdateStatusBox socket={socket} />
//         </Box> */}
//         <Grid
//           item
//           xs={12}
//           sx={{
//             height: '100%',
//             m: '10px',
//             padding: 2,
//             borderRadius: 2,
//             width: '100%',
//           }}
//         >
//           <ChartPaper elevation={3} ref={chartContainerRef}>
//             {filteredChartData.length > 0 ? (
//               <LinearChart
//                 datesTimesValues={rawData}
//                 nivoReadyData={nivoReadyData}
//                 filteredChartData={filteredChartData}
//                 latestData={latestData}
//                 dimensions={chartDimensions}
//                 timeRanges={timeRanges}
//                 timeRange={timeRange}
//               />
//             ) : (
//               <div>No data available</div>
//             )}
//           </ChartPaper>
//         </Grid>
//       </ErrorBoundary>
//     </Container>
//   );
// };

// export default PortfolioChart;
