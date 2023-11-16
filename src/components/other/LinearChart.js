import React, { useState, useMemo, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ChartErrorBoundary from './ChartErrorBoundary';
import CustomLogger from '../../context/CutstomLogger';

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

const CustomTooltip = ({ point }) => {
  const theme = useTheme();
  const { serieId, data } = point;
  const { label, xFormatted, yFormatted } = data || {};
  const series = {
    type: {
      Collection: 'Collection',
      Card: 'Card',
      Deck: 'Deck',
    },
  };
  return (
    <Box
      p={2}
      boxShadow={3}
      bgcolor={theme.palette.background.paper}
      borderRadius={2}
      borderColor={theme.palette.divider}
      border={1}
    >
      <Typography variant="subtitle1" color="textPrimary">
        {`Series: ${serieId}`}
      </Typography>
      {series.type[label] === 'Card' && (
        <Typography variant="body1" color="textPrimary">
          {`Card: ${label}`}
        </Typography>
      )}
      <Typography variant="body2">
        {`Time: ${new Date(xFormatted).toLocaleString()}`}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {`Value: $${parseFloat(yFormatted).toFixed(2)}`}
      </Typography>
    </Box>
  );
};

const roundToNearestTenth = (value) => {
  return Math.round(value * 10) / 10;
};

const getFilteredData = (data, timeRange) => {
  const cutOffTime = new Date().getTime() - timeRange;
  return data
    .filter((d) => {
      const date = new Date(d.x);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', d.x);
        return false;
      }
      return date.getTime() >= cutOffTime;
    })
    .map((d) => ({ ...d, y: roundToNearestTenth(d.y) }));
};

const getAveragedData = (data) => {
  // Use a regular function instead of a hook
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((row, index, total) => {
    const start = Math.max(0, index - 6);
    const end = index;
    const subset = total.slice(start, end + 1);
    const sum = subset.reduce((a, b) => a + b.y, 0);
    return {
      x: row.x,
      y: sum / subset.length || 0,
    };
  });
};

const getTickValues = (timeRange) => {
  const mapping = {
    '15m': 'every 15 minutes',
    '2h': 'every 2 hours',
    '1d': 'every day',
    '1w': 'every week',
  };
  return mapping[timeRange] || 'every week'; // Default to 'every week' if no match
};

const useMovingAverage = (data, numberOfPricePoints) => {
  return useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }
    console.log('[1][Data]----------> [', data + ']');
    console.log(
      '[2][NUMBER OF POINTS]----------> [',
      numberOfPricePoints + ']'
    );

    return data.map((row, index, total) => {
      const start = Math.max(0, index - numberOfPricePoints);
      const end = index;
      const subset = total.slice(start, end + 1);
      const sum = subset.reduce((a, b) => a + b.y, 0);
      return {
        // x: String(row.x),
        x: row.x,
        y: sum / subset.length || 0,
      };
    });
  }, [data, numberOfPricePoints]);
};

const useEventHandlers = () => {
  const [hoveredData, setHoveredData] = useState(null);

  const handleMouseMove = useCallback((point) => {
    if (point) {
      setHoveredData({
        x: point.data.x,
        y: point.data.y,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredData(null);
  }, []);

  return { hoveredData, handleMouseMove, handleMouseLeave };
};

const formatDateToString = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date:', date);
    return '';
  }
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const LinearChart = ({
  filteredChartData,
  datesTimesValues,
  latestData,
  dimensions,
  timeRanges,
  timeRange,
}) => {
  const theme = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);
  const { hoveredData, handleMouseMove, handleMouseLeave } = useEventHandlers();

  const filteredData = useMemo(
    () => getFilteredData(filteredChartData, timeRange),
    [filteredChartData, timeRange]
  );

  const dataForChart = useMemo(() => {
    return datesTimesValues.dates.map((date, index) => ({
      x: formatDateToString(
        new Date(`${date} ${datesTimesValues.times[index]}`)
      ),
      y: datesTimesValues.values[index],
    }));
  }, [datesTimesValues]);
  CustomLogger('LinearChart', 'info', {
    filteredChartData,
    datesTimesValues,
  });
  const tickValues = useMemo(() => getTickValues(timeRange), [timeRange]);

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
  // const classes = useStyles();
  // const theme = useTheme();

  // // Hooks should be at the top level of your component
  // const [isZoomed, setIsZoomed] = useState(false);
  // const filteredData = useMemo(
  //   () => getFilteredData(filteredChartData, timeRange),
  //   [filteredChartData, timeRange]
  // );
  // // const averagedData = useMemo(
  // //   () => getAveragedData(filteredData),
  // //   [filteredData]
  // // );
  // const { hoveredData, handleMouseMove, handleMouseLeave } = useEventHandlers();

  // if (!Array.isArray(filteredChartData)) {
  //   return <Typography variant="body1">No valid data available</Typography>;
  // }

  // if (
  //   !datesTimesValues ||
  //   !datesTimesValues.dates ||
  //   !datesTimesValues.times ||
  //   !datesTimesValues.values
  // ) {
  //   console.error('Invalid averaged chart data:', datesTimesValues);
  //   return <Typography variant="body1">Invalid data for the chart</Typography>;
  // }

  // const dataForChart = useMemo(() => {
  //   return [
  //     {
  //       id: 'Averaged Data',
  //       data: datesTimesValues.dates.map((date, index) => ({
  //         x: formatDateToString(
  //           new Date(`${date} ${datesTimesValues.times[index]}`)
  //         ),
  //         y: datesTimesValues.values[index],
  //       })),
  //     },
  //   ];
  // }, [datesTimesValues]);

  // if (dataForChart[0].data.length === 0) {
  //   return <Typography variant="body1">No valid data available</Typography>;
  // }
  // const tickValues = useMemo(() => getTickValues(timeRange), [timeRange]);

  // if (
  //   !Array.isArray(filteredChartData) ||
  //   filteredChartData.some((d) => !d.x || !d.y)
  // ) {
  //   return <Typography variant="body1">No valid data available</Typography>;
  // }
  // // logReadableChartInfo(
  // //   dataForChart,
  // //   datesTimesValues,
  // //   filteredChartData,
  // //   latestData
  // // );
  // try {
  //   const filteredData = useMemo(
  //     () => getFilteredData(filteredChartData, timeRange),
  //     [filteredChartData, timeRange]
  //   );
  //   getAveragedData(filteredData);
  // } catch (error) {
  //   console.error('Error processing data for chart:', error);
  // } // console.log('averagedData', averagedData);

  // const lastData = useMemo(() => {
  //   if (filteredChartData && filteredChartData.length) {
  //     return {
  //       x: filteredChartData[filteredChartData.length - 1].x,
  //       y: filteredChartData[filteredChartData.length - 1].y,
  //     };
  //   }
  //   return {};
  // }, [filteredChartData]);

  const chartProps = {
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    data: [{ id: 'Data', data: dataForChart }],
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    xScale: {
      type: 'time',
      format: '%Y-%m-%d %H:%M',
      useUTC: false,
      precision: 'minute',
    },
    yScale: { type: 'linear', min: 'auto', max: 'auto' },
    axisBottom: {
      tickRotation: 0,
      legendOffset: -12,
      legend: 'Time',
      tickPadding: 10,
      tickSize: 10,
      format: '%b %d',
      tickValues: tickValues,
    },
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
    sliceTooltip: ({ slice }) => {
      const point = slice.points.find(
        (p) => p.id === 'Data' && p.data.x === latestData.x
      );
      return point ? <CustomTooltip point={point} /> : null;
    },
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
