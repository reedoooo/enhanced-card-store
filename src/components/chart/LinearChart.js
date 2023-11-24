import React, { useState, useMemo, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Typography, Box, Tooltip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChartErrorBoundary from '../reusable/ChartErrorBoundary';
import { tokens } from '../../assets/tokens';
import { useMode } from '../../context/hooks/colormode';

const AxisLabel = styled(Typography)(({ theme, axis }) => ({
  position: 'absolute',
  [axis === 'x' ? 'bottom' : 'top']: 0,
  [axis === 'x' ? 'left' : 'right']: '50%',
  transform:
    axis === 'x' ? 'translateX(-50%)' : 'translateY(-50%) rotate(-90deg)',
  textAlign: 'center',
  margin: theme.spacing(2),
  fontSize: '1rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
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
  // const colors = tokens(theme.palette.mode);
  const greenAccent = {
    100: '#dbf5ee',
    200: '#b7ebde',
    300: '#94e2cd',
    400: '#70d8bd',
    500: '#4cceac',
    600: '#3da58a',
    700: '#2e7c67',
    800: '#1e5245',
    900: '#0f2922',
  };
  const [isZoomed, setIsZoomed] = useState(false);
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();

  // const { tickValues, xFormat } = useMemo(() => {
  //   const timeFormats = {
  //     '2 hours': { format: '%H:%M', ticks: 'every 15 minutes' },
  //     '24 hours': { format: '%H:%M', ticks: 'every 1 hour' },
  //     '7 days': { format: '%b %d', ticks: 'every 1 day' },
  //     '1 month': { format: '%b %d', ticks: 'every 3 days' },
  //     default: { format: '%b %d', ticks: 'every 1 day' },
  //   };
  //   return timeFormats[timeRange] || timeFormats.default;
  // }, [timeRange]);

  const { tickValues, xFormat } = useMemo(() => {
    let format, ticks;
    switch (timeRange) {
      case '2 hours':
        format = '%H:%M';
        ticks = 'every 15 minutes';
        break;
      case '24 hours':
        format = '%H:%M';
        ticks = 'every 1 hour';
        break;
      case '7 days':
        format = '%b %d';
        ticks = 'every 1 day';
        break;
      case '1 month':
        format = '%b %d';
        ticks = 'every 3 days';
        break;
      default:
        format = '%b %d';
        ticks = 'every 1 day';
    }
    return { tickValues: ticks, xFormat: `time:${format}` };
  }, [timeRange]);

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

  const chartProps = {
    // theme: theme.chart,
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    data: nivoReadyData,
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
    pointSize: 8,
    pointBorderWidth: 2,

    pointColor: theme.palette.success.light,
    colors: theme.palette.primaryDark.main,
    lineWidth: 3,
    curve: 'monotoneX',
    useMesh: true,
    theme: {
      chart: {
        axis: {
          domain: {
            line: {
              stroke: greenAccent[800],
              strokeWidth: 1,
            },
          },
          ticks: {
            line: {
              stroke: greenAccent[700],
              strokeWidth: 1,
            },
            text: {
              fill: greenAccent[900],
              fontSize: 12,
            },
          },
        },
        grid: {
          line: {
            stroke: greenAccent[200],
            strokeWidth: 1,
          },
        },
        legends: {
          text: {
            fill: greenAccent[800],
            fontSize: 12,
          },
        },
        tooltip: {
          container: {
            background: greenAccent[100],
            color: greenAccent[800],
            fontSize: 12,
            borderRadius: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
          },
        },
        points: {
          borderColor: greenAccent[800],
        },
      },
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: () => setIsZoomed(!isZoomed),
    tooltip: CustomTooltip,
    // sliceTooltip: ({ slice }) => {
    //   const point = slice.points.find(
    //     (p) => p.id === 'Data' && p.data.x === latestData.x
    //   );
    // xFormat,
    // tickValues,
  };

  return (
    <ChartErrorBoundary>
      <div style={{ width: '100%', height: dimensions?.height ?? '100%' }}>
        <ResponsiveLine {...chartProps} />
        {/* <AxisLabel axis="x">Time</AxisLabel>
        <AxisLabel axis="y">Value ($)</AxisLabel> */}
      </div>
    </ChartErrorBoundary>
  );
};

export default LinearChart;
