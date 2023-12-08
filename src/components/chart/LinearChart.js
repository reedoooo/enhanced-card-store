import React, { useState, useMemo, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Typography, Box, Tooltip, useTheme } from '@mui/material';
import ChartErrorBoundary from '../reusable/ChartErrorBoundary';
import { useMode } from '../../context/hooks/colormode';
import { makeStyles } from '@mui/styles';
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
    width: '100%',
    height: 'auto',
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

const LinearChart = ({
  filteredChartData,
  nivoReadyData,
  dimensions,
  timeRange,
}) => {
  const { theme } = useMode();
  const classes = useStyles(theme);
  const [isZoomed, setIsZoomed] = useState(false);
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  if (
    !Array.isArray(filteredChartData) ||
    filteredChartData.some((d) => !d.x || !d.y)
  ) {
    return (
      <Typography variant="body1" color="textSecondary">
        No valid data available
      </Typography>
    );
  }
  const { tickValues, xFormat } = useMemo(() => {
    let format, ticks;
    switch (timeRange) {
      case '2 hours':
        format = '%H:%M';
        ticks = 'every 15 minutes';
        break;
      case '24 hours':
        format = '%H:%M';
        ticks = 'every hour';
        break;
      case '7 days':
        format = '%b %d';
        ticks = 'every day';
        break;
      case '1 month':
        format = '%b %d';
        ticks = 'every 3 days';
        break;
      default:
        format = '%b %d';
        ticks = 'every day';
    }
    return { tickValues: ticks, xFormat: `time:${format}` };
  }, [timeRange]);
  const currentTime = new Date().getTime();
  const dataWithinTimeRange = useMemo(() => {
    return nivoReadyData.map((series) => ({
      ...series,
      data: series?.data.filter((dataPoint) => {
        const dataPointTime = new Date(dataPoint?.x).getTime();
        const isWithinRange = dataPointTime >= currentTime - timeRange;
        // Detailed logging
        // console.log(
        //   `Data Point: ${new Date(
        //     dataPointTime
        //   ).toISOString()}, Current Time: ${new Date(
        //     currentTime
        //   ).toISOString()}, Within Range: ${isWithinRange}`
        // );
        return isWithinRange;
      }),
    }));
  }, [nivoReadyData, timeRange]);

  const chartProps = {
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    data: dataWithinTimeRange,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    background: '#2c2121',
    xScale: {
      type: 'time',
      format: '%Y-%m-%dT%H:%M:%S.%LZ',
      useUTC: false,
      precision: 'second',
    },
    xFormat: 'time:%Y-%m-%d %H:%M:%S',
    axisBottom: {
      tickRotation: 0,
      legendOffset: -24,
      legend: 'Time',
      tickPadding: 10,
      tickSize: 1,
      format: xFormat,
      tickValues: tickValues,
    },
    yScale: { type: 'linear', min: 'auto', max: 'auto' },
    axisLeft: {
      orient: 'left',
      legend: 'Value ($)',
      legendOffset: 12,
      legendPosition: 'middle',
      format: (value) => `$${value}`,
      tickPadding: 10,
      tickSize: 10,
    },
    pointSize: 10,
    pointBorderWidth: 2,
    pointBorderColor: theme.palette.primary.main,
    pointColor: theme.palette.success.light,
    colors: theme.palette.primaryDark.main,
    lineWidth: 3,
    curve: 'monotoneX',
    useMesh: true,
    theme: theme.chart,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: () => setIsZoomed(!isZoomed),
    tooltip: CustomTooltip,
  };

  return (
    <ChartErrorBoundary>
      <div
        className={classes.chartContainer}
        style={{ height: dimensions?.height ?? '400px' }}
      >
        {/* <div style={{ width: '100%', height: dimensions?.height ?? '100%' }}> */}
        <ResponsiveLine {...chartProps} />
      </div>
    </ChartErrorBoundary>
  );
};

export default LinearChart;
