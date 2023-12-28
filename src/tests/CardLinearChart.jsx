// ... (imports)
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

export const useEventHandlers = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const handleMouseMove = useCallback((point) => {
    setHoveredData(point ? { x: point.data.x, y: point.data.y } : null);
  }, []);
  const handleMouseLeave = useCallback(() => setHoveredData(null), []);
  return { hoveredData, handleMouseMove, handleMouseLeave };
};
import { Box, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { ResponsiveLine } from '@nivo/line';
import { useCallback, useMemo, useState } from 'react';
import { useMode } from '../context';

const CardLinearChart = ({ nivoReadyData, dimensions }) => {
  console.log('nivoReadyData', nivoReadyData);
  const { theme } = useMode(); // or useTheme() based on your context setup
  const classes = useStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isZoomed, setIsZoomed] = useState(false); // If you need zoom functionality
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();

  // Error handling for empty or invalid data
  if (
    !nivoReadyData ||
    nivoReadyData?.length === 0 ||
    !Array.isArray(nivoReadyData)
  ) {
    return <Typography>No data available</Typography>;
  }

  // Ensure all data points have valid dates
  nivoReadyData?.forEach((series) => {
    series?.data?.forEach((point) => {
      if (!(point?.x instanceof Date)) {
        // Convert to date or handle error
        console.warn('Invalid date found in chart data');

        // Example of converting to date
        const date = new Date(point?.x);
        if (date instanceof Date && !isNaN(date)) {
          point.x = date;
        }
      }
    });
  });

  // Calculate chart properties based on nivoReadyData and dimensions
  const chartProps = useMemo(
    () => ({
      data: nivoReadyData,
      margin: { top: 50, right: 110, bottom: 50, left: 60 },
      xScale: {
        type: 'time',
        format: 'time:%Y-%m-%dT%H:%M:%S.%LZ',
        useUTC: false,
        precision: 'second',
      },
      xFormat: 'time:%Y-%m-%d %H:%M:%S',
      yScale: { type: 'linear', min: 'auto', max: 'auto' },
      animate: true,
      motionStiffness: 90,
      motionDamping: 15,
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
      axisLeft: {
        orient: 'left',
        legend: 'Price',
        legendOffset: -40,
        legendPosition: 'middle',
        tickSize: 5,
        tickPadding: 5,
      },
      pointSize: 10,
      pointColor: { theme: 'background' },
      pointBorderWidth: 2,
      pointBorderColor: { from: 'serieColor' },
      useMesh: true,
      enableSlices: 'x',
    }),
    [nivoReadyData, theme, isMobile]
  ); // Add other dependencies as needed

  // Responsive container
  const containerHeight = isMobile ? '200px' : dimensions.height || '300px';
  const containerWidth = '100%'; // Always take the full width of the parent

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
