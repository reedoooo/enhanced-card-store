import React, { useState, useMemo, useCallback } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

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
    color: theme.palette.text.primary,
  },
  customTooltip: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
}));

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
    .filter((d) => new Date(d.x).getTime() >= cutOffTime)
    .map((d) => ({ ...d, y: roundToNearestTenth(d.y) }));
};

const useMovingAverage = (data, numberOfPricePoints) => {
  return useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((row, index, total) => {
      const start = Math.max(0, index - numberOfPricePoints);
      const end = index;
      const subset = total.slice(start, end + 1);
      const sum = subset.reduce((a, b) => a + b.y, 0);
      return {
        x: row.x,
        y: sum / subset.length || 0,
      };
    });
  }, [data, numberOfPricePoints]);
};

const getAveragedData = (filteredData) => {
  const averaged = useMovingAverage(filteredData, 6);
  return useMemo(() => {
    return averaged;
  }, [averaged]);
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

const getTickValues = (timeRange, timeRanges) => {
  switch (timeRange) {
    case timeRanges[0].value:
      return 'every 15 minutes';
    case timeRanges[1].value:
      return 'every 2 hours';
    case timeRanges[2].value:
      return 'every day';
    default:
      return 'every week';
  }
};

const LinearChart = ({
  data,
  latestData,
  dimensions,
  timeRanges,
  timeRange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);
  const { hoveredData, handleMouseMove, handleMouseLeave } = useEventHandlers();

  const isValidDataPoint = (d) => d && 'x' in d && 'y' in d;
  if (!Array.isArray(data) || !data.every(isValidDataPoint)) {
    return <Typography variant="body1">No valid data available</Typography>;
  }

  const filteredData = useMemo(
    () => getFilteredData(data, timeRange),
    [data, timeRange]
  );
  const averagedData = getAveragedData(filteredData);
  // console.log('averagedData', averagedData);
  const tickValues = useMemo(
    () => getTickValues(timeRange, timeRanges),
    [timeRange]
  );

  const lastData = useMemo(() => {
    if (data && data.length) {
      return {
        x: data[data.length - 1].x,
        y: data[data.length - 1].y,
      };
    }
    return {};
  }, [data]);

  return (
    <div
      className={classes.chartContainer}
      style={{
        width: '100%',
        height: dimensions?.height ?? '100%',
      }}
    >
      <ResponsiveLine
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d %H:%M',
          useUTC: false,
          precision: 'minute',
        }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        axisBottom={{
          tickValues: tickValues,

          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -12,
          legend: 'Time',
          format: '%H:%M',
        }}
        axisLeft={{
          orient: 'left',
          legend: 'Value ($)',
          legendOffset: 12,
          legendPosition: 'middle',
          legendTextColor: theme.palette.text.primary,
          legendTextSize: 14,
          format: (value) => `$${value}`,
        }}
        enablePointLabel
        pointLabel="y"
        pointLabelYOffset={-12}
        pointSize={6}
        pointBorderWidth={1}
        // pointBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
        pointColor={theme.palette.primary.main}
        // pointBorderColor={theme.palette.secondary.main}
        colors={[theme.palette.primary.light]}
        theme={{
          points: {
            dot: {
              ...classes.customPoint, // Added for improved style
              border: '1px solid ' + theme.palette.secondary.main,
            },
            tooltip: {
              container: {
                borderRadius: theme.shape.borderRadius,
              },
            },
          },
          grid: {
            line: {
              stroke: theme.palette.divider,
              strokeWidth: 1,
              strokeDasharray: '4 4',
            },
          },
        }}
        lineWidth={3}
        curve="monotoneX"
        useMesh={true}
        data={[
          {
            id: 'Dataset',
            data: averagedData?.map((d) => ({
              x: new Date(d.x),
              y: parseFloat(d.y),
            })),
          },
        ]}
        // data={[
        //   {
        //     id: 'Dataset',
        //     data: averagedData.map((d) => ({
        //       x: new Date(d.x).getTime(),
        //       y: parseFloat(d.y),
        //     })),
        //   },
        // ]}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsZoomed(!isZoomed)}
        tooltip={({ point }) => <CustomTooltip point={point} />}
        sliceTooltip={({ slice }) => {
          const point = slice.points.find(
            (p) => p.id === 'Dataset' && p.data.x === lastData.x
          );
          if (point) {
            return <CustomTooltip point={point} />;
          }
          return null;
        }}
      />
      <Tooltip
        title={`Time: ${
          hoveredData
            ? new Date(hoveredData.x).toLocaleString()
            : new Date(lastData.x).toLocaleString()
        }`}
        arrow
      >
        <Typography className={classes.xAxisLabel}>
          {hoveredData
            ? new Date(hoveredData.x).toLocaleString()
            : latestData?.x}
        </Typography>
      </Tooltip>
      <Tooltip
        title={`Value: $${hoveredData ? hoveredData.y : latestData?.y}`}
        arrow
      >
        <Typography className={classes.yAxisLabel}>
          {`$${hoveredData ? hoveredData.y : latestData?.y}`}
        </Typography>
      </Tooltip>
    </div>
  );
};

export default LinearChart;
