import React, { useState, useRef, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: '100%',
    height: '400px',
    position: 'relative',
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
  tooltip: {
    background: 'white',
    border: '1px solid #ccc',
    padding: '12px',
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  tooltipTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  tooltipValue: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#ff5722',
  },
  tooltipText: {
    fontSize: '0.875rem',
  },
}));

const LinearChart = ({ data, xAxisLabel, yAxisLabel, keyValue }) => {
  const classes = useStyles();

  const [chartDimensions, setChartDimensions] = useState({
    width: 600, // Default width
    height: 400, // Default height
  });
  const chartContainerRef = useRef(null);

  // Add a cleanup function
  useEffect(() => {
    const observerCallback = (entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setChartDimensions({ width, height });
      }
    };

    const resizeObserver = new ResizeObserver(observerCallback);
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={classes.chartContainer}
      ref={chartContainerRef}
      style={{
        width: chartDimensions.width,
        height: chartDimensions.height,
      }}
      key={keyValue}
    >
      <ResponsiveLine
        data={data}
        margin={{ top: 40, right: 60, bottom: 60, left: 80 }}
        xScale={{ type: 'linear', min: 'auto', max: 'auto' }} // Use linear scale for timestamps
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: xAxisLabel,
          legendOffsetY: 50,
          legendPosition: 'middle',
          legendOffsetX: 0,
          legendTextColor: '#333',
          legendTextSize: 14,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: yAxisLabel,
          legendOffsetY: -80,
          legendPosition: 'middle',
          legendOffsetX: -40,
          legendTextColor: '#333',
          legendTextSize: 14,
        }}
        layers={['grid', 'lines', 'areas', 'slices', 'mesh', 'legends']}
        width={600}
        height={400}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <div className={classes.tooltip}>
            <Typography
              className={classes.tooltipTitle}
              variant="subtitle1"
              fontWeight="bold"
            >
              Date: {new Date(slice.points[0].data.x).toLocaleString()}
            </Typography>
            <Typography
              className={classes.tooltipValue}
              variant="subtitle1"
              fontWeight="bold"
              color="#ff5722"
            >
              Value: {slice.points[0].data.yFormatted}
            </Typography>
            <Typography className={classes.tooltipText} variant="body1">
              Additional Data: {slice.points[0].data.additionalData}
            </Typography>
          </div>
        )}
      />
      <Typography className={classes.xAxisLabel} variant="subtitle1">
        {xAxisLabel}
      </Typography>
      <Typography className={classes.yAxisLabel} variant="subtitle1">
        {yAxisLabel}
      </Typography>
    </div>
  );
};

export default LinearChart;
