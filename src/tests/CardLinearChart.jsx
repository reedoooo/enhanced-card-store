import { Box, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { ResponsiveLine } from '@nivo/line';
import { useCallback, useMemo, useState } from 'react';
import { useMode } from '../context';
const useStyles = makeStyles((theme) => ({
  axisLabel: {
    position: 'absolute',
    textAlign: 'center',
    margin: theme.spacing(2),
    fontSize: '1rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    '@media (max-width: 600px)': {
      width: '150%', // Adjust width for mobile screens
      height: '300px', // Adjust height for mobile screens
      transform: 'translateX(10%)', // Shift the chart to the right by 50%
    },
  },
}));

const CustomTooltip = ({ point }) => {
  const theme = useTheme();
  const { serieId, data: { label, xFormatted, yFormatted } = {} } = point;
  return (
    <Tooltip title={`Series: ${serieId}`}>
      <Box
        p={2}
        boxShadow={3}
        bgcolor={theme.palette.background.paper}
        borderRadius={2}
        borderColor={theme.palette.divider}
        border={1}
      >
        <Typography variant="subtitle1" color="textPrimary">
          {`Card: ${label}`}
        </Typography>
        <Typography variant="body2">
          {`Time: ${new Date(xFormatted).toLocaleString()}`}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {`Value: $${parseFloat(yFormatted).toFixed(2)}`}
        </Typography>
      </Box>
    </Tooltip>
  );
};
const parseDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error(`Invalid date: ${dateString}`);
    return null; // or a sensible default, or throw an error, depending on your needs
  }
  return date;
};
export const useEventHandlers = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const handleMouseMove = useCallback((point) => {
    setHoveredData(point ? { x: point.data.x, y: point.data.y } : null);
  }, []);
  const handleMouseLeave = useCallback(() => setHoveredData(null), []);
  return { hoveredData, handleMouseMove, handleMouseLeave };
};

const CardLinearChart = ({ nivoReadyData, dimensions }) => {
  const { theme } = useMode();
  const classes = useStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Ensure all data points have valid dates
  const processedData = useMemo(() => {
    return nivoReadyData?.map((series) => ({
      ...series,
      data: series?.data?.map((point) => ({
        ...point,
        x: parseDate(point?.x) || point?.x, // Use the parsed date or fallback to the original value
      })),
    }));
  }, [nivoReadyData]);
  // const { theme } = useMode();
  // const classes = useStyles(theme);
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const [isZoomed, setIsZoomed] = useState(false);
  // const { handleMouseMove, handleMouseLeave } = useEventHandlers();

  // if (
  //   !nivoReadyData ||
  //   nivoReadyData.length === 0 ||
  //   !Array.isArray(nivoReadyData)
  // ) {
  //   return <Typography>No data available</Typography>;
  // }

  // // Correct the date parsing logic
  // const processedData = nivoReadyData.map((series) => ({
  //   ...series,
  //   data: series.data.map((point) => ({
  //     ...point,
  //     x: parseDate(point.x) || point.x, // Use the parsed date or fallback to the original value
  //   })),
  // }));

  // // Ensure all data points have valid dates
  // nivoReadyData?.forEach((series) => {
  //   series?.data?.forEach((point) => {
  //     const date = parseDate(point?.x);
  //     if (!(date instanceof Date)) {
  //       // Convert to date or handle error
  //       console.warn('Invalid date found in chart data', date);

  //       // Example of converting to date
  //       const date = new Date(date);
  //       if (date instanceof Date && !isNaN(date)) {
  //         point.x = date;
  //       }
  //     }
  //   });
  // });

  // Calculate chart properties based on nivoReadyData and dimensions
  // Minimal chart properties for testing
  const chartProps = useMemo(
    () => ({
      data: processedData,
      margin: { top: 20, right: 20, bottom: 20, left: 35 },
      xScale: {
        type: 'time',
        format: 'time:%Y-%m-%dT%H:%M:%S.%LZ',
        useUTC: false,
        precision: 'second',
      },
      axisBottom: {
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle',
        tickSize: 5,
        tickPadding: 5,
        tickValues: 'every 2 days',
        format: '%b %d',
      },
      //     animate: true,
      //     motionStiffness: 90,
      //     motionDamping: 15,
      //     axisLeft: {
      //       orient: 'left',
      //       legend: 'Price',
      //       legendOffset: -40,
      //       legendPosition: 'middle',
      //       tickSize: 5,
      //       tickPadding: 5,
      //     },
      //     pointSize: 10,
      //     pointColor: { theme: 'background' },
      //     pointBorderWidth: 2,
      //     pointBorderColor: { from: 'serieColor' },
      //     useMesh: true,
      enableSlices: 'x',
      yScale: { type: 'linear', min: 'auto', max: 'auto' },
    }),
    [nivoReadyData, processedData]
  );
  // const chartProps = useMemo(
  //   () => ({
  //     data: processedData,
  //     margin: { top: 50, right: 110, bottom: 50, left: 60 },
  //     xScale: {
  //       type: 'time',
  //       format: 'time:%Y-%m-%dT%H:%M:%S.%LZ',
  //       useUTC: false,
  //       precision: 'second',
  //     },
  //     xFormat: 'time:%Y-%m-%d %H:%M:%S',
  //     yScale: { type: 'linear', min: 'auto', max: 'auto' },
  //     animate: true,
  //     motionStiffness: 90,
  //     motionDamping: 15,
  //     axisLeft: {
  //       orient: 'left',
  //       legend: 'Price',
  //       legendOffset: -40,
  //       legendPosition: 'middle',
  //       tickSize: 5,
  //       tickPadding: 5,
  //     },
  //     pointSize: 10,
  //     pointColor: { theme: 'background' },
  //     pointBorderWidth: 2,
  //     pointBorderColor: { from: 'serieColor' },
  //     useMesh: true,
  //     enableSlices: 'x',
  //   }),
  //   [processedData, theme, isMobile] // Add other dependencies as needed
  // ); // Add other dependencies as needed

  // console.log('Nivo Ready Data:', nivoReadyData);
  // console.log('Processed Data:', processedData);
  // console.log('Chart Dimensions:', dimensions);

  if (!processedData || !processedData?.length) {
    return <Typography>No data available</Typography>;
  }
  return (
    <Box
      className={classes.chartContainer}
      style={{ height: dimensions.height, width: dimensions.width }}
    >
      <ResponsiveLine {...chartProps} />
    </Box>
  );
};

export default CardLinearChart;
