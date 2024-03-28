// import { Box, Tooltip, Typography, useMediaQuery } from '@mui/material';

// import { ResponsiveLine } from '@nivo/line';
// import { useCallback, useMemo, useState } from 'react';
// import { useMode } from '../context';
// import styled from 'styled-components';
// const ChartContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   width: '100%',
//   height: 'auto',
//   [theme.breakpoints.down('sm')]: {
//     width: '150%', // Adjust width for mobile screens
//     height: '300px', // Adjust height for mobile screens
//     // transform: 'translateX(10%)', // Shift the chart to the right by 50%
//   },
// }));

// const parseDate = (dateString) => {
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) {
//     console.error(`Invalid date: ${dateString}`);
//     return null; // or a sensible default, or throw an error, depending on your needs
//   }
//   return date;
// };
// export const useEventHandlers = () => {
//   const [hoveredData, setHoveredData] = useState(null);
//   const handleMouseMove = useCallback((point) => {
//     setHoveredData(point ? { x: point.data.x, y: point.data.y } : null);
//   }, []);
//   const handleMouseLeave = useCallback(() => setHoveredData(null), []);
//   return { hoveredData, handleMouseMove, handleMouseLeave };
// };

// const CardLinearChart = ({ nivoReadyData, dimensions }) => {
//   const { theme } = useMode();
//   const processedData = useMemo(() => {
//     return nivoReadyData?.map((series) => ({
//       ...series,
//       data: series?.data?.map((point) => ({
//         ...point,
//         x: parseDate(point?.x) || point?.x,
//       })),
//     }));
//   }, [nivoReadyData]);

//   const chartProps = useMemo(
//     () => ({
//       data: processedData,
//       margin: { top: 20, right: 20, bottom: 20, left: 35 },
//       xScale: {
//         type: 'time',
//         format: 'time:%Y-%m-%dT%H:%M:%S.%LZ',
//         useUTC: false,
//         precision: 'second',
//       },
//       axisBottom: {
//         tickRotation: 0,
//         legend: 'Time',
//         legendOffset: 36,
//         legendPosition: 'middle',
//         tickSize: 5,
//         tickPadding: 5,
//         tickValues: 'every 2 days',
//         format: '%b %d',
//       },
//       enableSlices: 'x',
//       yScale: { type: 'linear', min: 'auto', max: 'auto' },
//     }),
//     [nivoReadyData, processedData]
//   );

//   if (!processedData || !processedData?.length) {
//     return <Typography>No data available</Typography>;
//   }
//   return (
//     <ChartContainer dimensions={dimensions} theme={theme}>
//       <ResponsiveLine {...chartProps} />
//     </ChartContainer>
//   );
// };

// export default CardLinearChart;
