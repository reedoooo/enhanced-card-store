import React, { useState, useMemo, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ChartErrorBoundary from './ChartErrorBoundary';
// import CustomLogger from '../../context/CutstomLogger';
import {
  formatDateToString,
  useEventHandlers,
  getFilteredData,
  getTickValues,
  getAveragedData,
  CustomTooltip,
} from './chartUtils';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  xAxisLabel: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    color: theme.palette.text.primary,
  },
  yAxisLabel: {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%) rotate(-90deg)',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    fontWeight: 'bold', // Make the label text bold
    marginLeft: theme.spacing(4), // Increase spacing from the chart
    color: theme.palette.text.primary,
  },
  customTooltip: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  customGridLine: {
    stroke: theme.palette.text.secondary,
    strokeWidth: 2,
    strokeDasharray: 'none',
  },
}));

// function logReadableChartInfo(
//   // chartDimensions,
//   dataForChart,
//   datesTimesValues,
//   filteredChartData,
//   latestData
// ) {
//   console.log('[7][DATA FOR CHART]:', JSON.stringify(dataForChart, null, 2));
//   console.log(
//     '[8][DATES TIMES VALUES]:',
//     JSON.stringify(datesTimesValues, null, 2)
//   );
//   console.log(
//     '[4][FILTERED CHART DATA]:',
//     JSON.stringify(filteredChartData, null, 2)
//   );
//   console.log('[5][LATEST DATA]:', JSON.stringify(latestData, null, 2));
// }

const LinearChart = ({
  filteredChartData,
  datesTimesValues,
  nivoReadyData,
  latestData,
  dimensions,
  timeRanges,
  timeRange,
}) => {
  const theme = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);
  const { hoveredData, handleMouseMove, handleMouseLeave } = useEventHandlers();
  const [format, setFormat] = useState('0,0');
  // Calculate tickValues and xFormat based on timeRange
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
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    // data: [{ id: 'Data', data: dataForChart }],
    data: nivoReadyData,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    xScale: {
      type: 'time',
      // format: '%Y-%m-%d %H:%M:%S',
      format: '%Y-%m-%dT%H:%M:%S.%LZ',
      useUTC: false,
      precision: 'second',
    },
    xFormat: 'time:%Y-%m-%d %H:%M:%S',
    axisBottom: {
      tickRotation: 0,
      legendOffset: -12,
      legend: 'Time',
      tickPadding: 10,
      tickSize: 10,
      // format: '%b %d',
      // tickValues: 'every 2 days',
      format: xFormat,
      tickValues: tickValues,
      // tickValues: tickValues,
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
    pointSize: 6,
    pointBorderWidth: 1,
    pointColor: theme.palette.primary.main,
    colors: theme.palette.chartColors,
    theme: theme.chart,
    lineWidth: 3,
    curve: 'monotoneX',
    useMesh: true,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: () => setIsZoomed(!isZoomed),
    tooltip: CustomTooltip,
    // sliceTooltip: ({ slice }) => {
    //   const point = slice.points.find(
    //     (p) => p.id === 'Data' && p.data.x === latestData.x
    //   );
    //   return point ? <CustomTooltip point={point} /> : null;
    // },
  };

  return (
    <ChartErrorBoundary>
      <div style={{ width: '100%', height: dimensions?.height ?? '100%' }}>
        <ResponsiveLine {...chartProps} />
      </div>
    </ChartErrorBoundary>
  );
};

export default LinearChart;
