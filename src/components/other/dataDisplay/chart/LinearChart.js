import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import {
  Typography,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ChartErrorBoundary from '../../../reusable/ChartErrorBoundary';
import { useMode } from '../../../../context/hooks/colormode';
import { makeStyles } from '@mui/styles';
import { useChartContext, useStatisticsStore } from '../../../../context';
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

const CustomTooltipLayer = ({ points, xScale, yScale, specialPoints }) => {
  console.log('CustomTooltipLayer points: ', specialPoints);
  return (
    <>
      {points?.map((point, index) => {
        // Render special marker for special points
        if (
          specialPoints?.some(
            (sp) => sp.x === point.data.x && sp.y === point.data.y
          )
        ) {
          const specialPoint = specialPoints?.find(
            (sp) => sp.x === point.data.x && sp.y === point.data.y
          );
          return (
            <g
              key={index}
              transform={`translate(${xScale(point?.data?.x)},${yScale(
                point?.data?.y
              )})`}
            >
              <circle r={10} fill="red" stroke="white" strokeWidth={2} />
              <text
                x={15}
                y={5}
                textAnchor="start"
                alignmentBaseline="middle"
                fill="#fff"
              >
                {specialPoint.label}
              </text>
            </g>
          );
        }
        return null;
      })}
    </>
  );
};

const CustomTooltip = ({ point, specialPoints }) => {
  const theme = useTheme();
  const isSpecial = specialPoints?.some(
    (sp) => sp.x === point.data.x && sp.y === point.data.y
  );

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
          {`Card: ${label}` || `Collection: ${label}`}
        </Typography>
        <Typography variant="body2">
          {`Time: ${new Date(xFormatted).toLocaleString()}`}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {`Value: $${parseFloat(yFormatted).toFixed(2)}`}
        </Typography>
        {isSpecial && <Typography color="secondary">Special Point!</Typography>}
      </Box>
    </Tooltip>
  );
};

export const useEventHandlers = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const handleMouseMove = useCallback((point) => {
    setHoveredData(point ? { x: point?.data.x, y: point?.data.y } : null);
  }, []);
  const handleMouseLeave = useCallback(() => setHoveredData(null), []);
  return { hoveredData, handleMouseMove, handleMouseLeave };
};

const LinearChart = ({
  nivoReadyData,
  dimensions,
  timeRange,
  specialPoints,
}) => {
  const { theme } = useMode();
  const classes = useStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { statsByCollectionId, markers } = useStatisticsStore();
  const { tickValues, xFormat } = useChartContext();

  const [isZoomed, setIsZoomed] = useState(false);
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  // if (
  //   !Array.isArray(filteredChartData) ||
  //   filteredChartData.some((d) => !d?.x || !d?.y)
  // ) {
  //   return (
  //     <Typography variant="body1" color="textSecondary">
  //       No valid data available
  //     </Typography>
  //   );
  // }

  const currentTime = new Date().getTime();
  const dataWithinTimeRange = useMemo(() => {
    return nivoReadyData?.map((series) => ({
      ...series,
      data: series?.data?.filter((dataPoint) => {
        const dataPointTime = new Date(dataPoint?.x).getTime();
        const isWithinRange = dataPointTime >= currentTime - timeRange;
        return isWithinRange;
      }),
    }));
  }, [nivoReadyData, timeRange]);

  const chartProps = useMemo(
    () => ({
      margin: { top: 10, right: 20, bottom: 30, left: 40 },
      // border: { color: theme.palette.divider, lineWidth: 3 },
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
        legendOffset: -12,
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
      // tooltip: CustomTooltip,
      markers,

      layers: [
        'grid',
        'markers',
        'areas',
        'lines',
        'slices',
        'points',
        'axes',
        'legends',
        ({ points, xScale, yScale }) => (
          <CustomTooltipLayer
            points={points}
            xScale={xScale}
            yScale={yScale}
            specialPoints={markers}
          />
        ),
      ],
      tooltip: ({ point }) => {
        return (
          <CustomTooltip
            point={point}
            // Pass additional props as needed, e.g., to show high point marker
            isHighPoint={point.data.isHighPoint}
          />
        );
      },
    }),
    [theme, nivoReadyData, timeRange]
  );

  useEffect(() => {
    console.log('Chart data: ', nivoReadyData);
  }, [nivoReadyData]);

  return (
    <ChartErrorBoundary>
      <Box
        className={classes.chartContainer}
        style={{
          height: isMobile ? '350px' : dimensions?.height ?? '500px',
          flexGrow: 1,
        }}
      >
        {/* <div style={{ width: '100%', height: dimensions?.height ?? '100%' }}> */}
        <ResponsiveLine {...chartProps} />
      </Box>
    </ChartErrorBoundary>
  );
};

export default LinearChart;
