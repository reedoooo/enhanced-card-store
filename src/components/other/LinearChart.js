import React, { useMemo, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
  const x = point.data.xFormatted;
  const y = point.data.yFormatted;
  const serieId = point.serieId;
  // const { x, y, serieId } = point;

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
      <Typography variant="body2">{`Time: ${new Date(
        point?.data?.x
      ).toLocaleString()}`}</Typography>
      <Typography
        variant="h6"
        color="textSecondary"
      >{`Value: $${point?.data?.y.toFixed(2)}`}</Typography>
    </Box>
  );
};

// const LinearChart = ({ data = [], dimensions, loading, error }) => {
const LinearChart = ({ data, dimensions, loading, error }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredData, setHoveredData] = useState(null);

  const transformedData = useMemo(() => {
    if (!data.length) return [];

    // Mapping each serie data to the desired format
    return data.map((serie) => ({
      id: serie.id,
      data: serie.data.map((d) => ({
        x: new Date(d.x),
        y: parseFloat(d.y),
        id: serie?._id,
      })),
    }));
  }, [data]);

  if (error) {
    return (
      <Box className={classes.loadingContainer}>
        <Typography variant="body1" color="error">
          <ErrorOutlineIcon />
          Error loading data
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  // if (transformedData.length === 0) {
  //   return (
  //     <Box className={classes.loadingContainer}>
  //       <Typography variant="subtitle1">No data available</Typography>
  //     </Box>
  //   );
  // }

  const latestData = data[0]?.data?.slice(-1)[0] || {};

  // Filter the latestDataArray to have unique y values
  const uniqueYDataArray = useMemo(() => {
    const seenYValues = new Set();
    const latestDataArray = transformedData?.slice(-1)[0]?.data || [];
    return latestDataArray.filter(({ y }) => {
      if (!seenYValues.has(y)) {
        seenYValues.add(y);
        return true;
      }
      return false;
    });
  }, [transformedData]);

  return (
    <div
      className={classes.chartContainer}
      style={{
        width: dimensions?.width ?? '100%',
        height: dimensions?.height ?? '100%',
      }}
    >
      <ResponsiveLine
        animate
        data={[{ id: 'alldatasets', data: uniqueYDataArray }]} // Use uniqueYDataArray here
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d %H:%M',
          useUTC: false,
          precision: 'minute',
        }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        axisBottom={{
          tickValues: 'every 1 minute',
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
        pointBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
        pointColor={theme.palette.primary.main}
        theme={{
          points: {
            dot: {
              border: '1px solid #bbb',
              transition: 'all 250ms',
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
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={(point) => {
          if (point) {
            setHoveredData({
              x: point.data.x,
              y: point.data.y,
            });
          }
        }}
        onMouseLeave={() => setHoveredData(null)}
        tooltip={({ point }) => <CustomTooltip point={point} />}
      />
      <Tooltip
        title={`Time: ${
          hoveredData ? new Date(hoveredData.x).toLocaleString() : latestData?.x
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
