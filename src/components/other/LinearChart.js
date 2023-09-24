import React, { useMemo, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
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
}));

const LinearChart = ({ data = [], dimensions, loading, error }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);

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

  console.log('TRANSFORMED DATA:', transformedData);

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error loading data
      </Typography>
    );
  }

  if (transformedData.length === 0) {
    return <Typography variant="body1">No data available</Typography>;
  }

  const latestData = data[0]?.data?.slice(-1)[0] || {};

  const latestDataArray = transformedData?.slice(-1)[0]?.data || [];
  console.log('LATEST DATA ARRAY:', latestDataArray);
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
        data={[{ id: 'latestData', data: latestDataArray }]}
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
          legend: 'time scale',
          format: '%H:%M',
        }}
        axisLeft={{
          orient: 'left',
          legend: 'linear scale',
          legendOffset: 12,
          legendPosition: 'middle',
          legendTextColor: theme.palette.text.primary,
          legendTextSize: 14,
          format: (value) => `$${value}`,
        }}
        enablePointLabel
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
        pointLabel="y"
        pointLabelYOffset={-12}
        pointBorderWidth={1}
        pointSize={10}
        pointColor={theme.palette.primary.main}
        curve="monotoneX"
        useMesh={true}
        onClick={() => setIsZoomed(!isZoomed)}
      />
      <Typography className={classes.xAxisLabel}>
        {`${new Date(latestData.x).toLocaleString()}`}
      </Typography>
      <Typography className={classes.yAxisLabel}>
        {`$${latestData.y}`}
      </Typography>
    </div>
  );
};

export default LinearChart;
