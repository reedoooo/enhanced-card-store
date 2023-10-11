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
  const { serieId } = point;
  const label = point?.data?.label;
  const x = point?.data?.xFormatted;
  const y = point?.data?.yFormatted;
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
      <Typography variant="body1" color="textPrimary">
        {`Card: ${label}`}
      </Typography>
      <Typography variant="body2">
        {`Time: ${new Date(point?.data?.x || x).toLocaleString()}`}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {`Value: $${point?.data?.y?.toFixed(2) || y}`}
      </Typography>
    </Box>
  );
};

// const LinearChart = ({ data = [], dimensions, loading, error }) => {
const LinearChart = ({ data, latestData, dimensions }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredData, setHoveredData] = useState(null);

  // Ensure data is an array
  if (!Array.isArray(data) || data.some((d) => !d.x || !d.y)) {
    return <Typography variant="body1">No valid data available</Typography>;
  }
  // console.log('datasets', data);
  // console.log('latestData', latestData);

  const LinearChartData = useMemo(() => {
    return [
      {
        id: 'Dataset',
        data: data?.map((d) => ({
          x: new Date(d?.x),
          y: parseFloat(d?.y),
        })),
      },
    ];
  }, [data]);

  // console.log('chartData', chartData);
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
        data={LinearChartData}
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
              x: point?.data?.x,
              y: point?.data?.y,
            });
          }
        }}
        onMouseLeave={() => setHoveredData(null)}
        tooltip={({ point }) => <CustomTooltip point={point} />}
      />
      <Tooltip
        title={`Time: ${
          hoveredData
            ? new Date(hoveredData?.x).toLocaleString()
            : latestData?.x
        }`}
        arrow
      >
        <Typography className={classes.xAxisLabel}>
          {hoveredData
            ? new Date(hoveredData?.x).toLocaleString()
            : latestData?.x}
        </Typography>
      </Tooltip>
      <Tooltip
        title={`Value: $${hoveredData ? hoveredData?.y : latestData?.y}`}
        arrow
      >
        <Typography className={classes.yAxisLabel}>
          {`$${hoveredData ? hoveredData?.y : latestData?.y}`}
        </Typography>
      </Tooltip>
    </div>
  );
};

export default LinearChart;
