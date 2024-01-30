import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Typography, Box, Tooltip, useMediaQuery } from '@mui/material';
import ChartErrorBoundary from '../../../reusable/ChartErrorBoundary';
import {
  useChartContext,
  useMode,
  useStatisticsStore,
} from '../../../../context';
import {
  ChartContainer,
  LinearChartContainer,
} from '../../../../pages/pageStyles/StyledComponents';
import { AutoSizer } from 'react-virtualized';

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
  const { theme } = useMode();
  const isSpecial = specialPoints?.some(
    (sp) => sp.x === point.data.x && sp.y === point.data.y
  );

  const { serieId, data: { label, xFormatted, yFormatted } = {} } = point;
  return (
    <Tooltip title={`Series: ${serieId}`}>
      <Box
        sx={{
          padding: theme.spacing(2),
          boxShadow: theme.shadows[5],
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.backgroundA.lightest,
          borderRadius: theme.shape.borderRadius,
          borderColor: theme.palette.divider,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        }}
        // p={2}
        // boxShadow={3}
        // bgcolor={theme.palette.backgroundA.lightest}
        // borderRadius={2}
        // borderColor={theme.palette.divider}
        // border={1}
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

const parseDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error(`Invalid date: ${dateString}`);
    return null; // or a sensible default, or throw an error, depending on your needs
  }
  return date;
};
export const useEventHandlers = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const handleMouseMove = useCallback((point) => {
    setHoveredData(point ? { x: point?.data.x, y: point?.data.y } : null);
  }, []);
  const handleMouseLeave = useCallback(() => setHoveredData(null), []);
  return { hoveredData, handleMouseMove, handleMouseLeave };
};
const LinearChart = ({ nivoChartData, width, height, specialPoints }) => {
  const { theme } = useMode();
  const { tickValues, xFormat } = useChartContext();
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  const [isZoomed, setIsZoomed] = useState(false);
  const processedData = useMemo(() => {
    return nivoChartData?.map((series) => ({
      ...series,
      data: series?.data?.map((point) => ({
        ...point,
        x: parseDate(point?.x) || point?.x, // Use the parsed date or fallback to the original value
      })),
    }));
  }, [nivoChartData]);

  const markers = specialPoints?.map((sp) => ({
    axis: 'y',
    value: sp.y,
    lineStyle: { stroke: 'red', strokeWidth: 2 },
    legend: sp.label,
    legendOrientation: 'vertical',
    legendPosition: 'top',
    legendOffsetY: -10,
    legendOffsetX: 0,
    legendColor: 'red',
  }));
  const chartProps = {
    data: processedData,
    margin: { top: 20, right: 40, bottom: 40, left: 30 },
    padding: 0.3,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    background: '#2c2121',
    color: theme.palette.backgroundA.contrastTextA,
    text: {
      color: theme.palette.backgroundA.contrastTextA,
      fill: theme.palette.backgroundA.contrastTextA,
      fontSize: 12,
    },
    // xFormat: { type: 'point' },
    xFormat: 'time:%Y-%m-%d %H:%M:%S',
    xScale: {
      type: 'time',
      format: '%Y-%m-%dT%H:%M:%S.%LZ', // Adjust if necessary to match your input data format
      useUTC: false,
      precision: 'second',
    },
    axisBottom: {
      tickRotation: 0,
      legend: 'Time',
      legendOffset: 36,
      legendPosition: 'middle',
      tickSize: 5,
      tickPadding: 5,
      tickValues: tickValues,
      format: '%Y-%m-%d', // Adjust this format to display the dates as you need
      // format: '%d',
      // format: '%S.%L',
    },
    yFormat: '$.2f',
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Value ($)',
      legendOffset: -40,
      legendPosition: 'middle',
      color: theme.palette.text.primary,
    },
    yScale: {
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    },
    pointSize: 8,
    pointBorderWidth: 1,
    pointBorderColor: { from: 'serieColor', modifiers: [] },
    pointColor: { from: 'color', modifiers: [] },
    colors: { scheme: 'green_blue' },
    // lineWidth: 3,
    curve: 'monotoneX',
    useMesh: true,
    motionConfig: 'wobbly',

    theme: {
      axis: {
        domain: {
          line: {
            stroke: theme.palette.backgroundA.contrastTextA,
            strokeWidth: 1,
          },
        },
        ticks: {
          line: {
            stroke: theme.palette.backgroundA.contrastTextA,
            strokeWidth: 1,
          },
          text: {
            fill: theme.palette.backgroundA.contrastTextA,
            fontSize: 12,
            fontWeight: 400,
          },
        },
        legend: {
          text: {
            fill: theme.palette.text.primary,
            fontSize: 12,
            fontWeight: 500,
          },
        },
      },
      grid: {
        line: {
          stroke: theme.palette.divider,
          strokeWidth: 1,
        },
      },
    },
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
      ({ points, xScale, yScale, markers }) => (
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
          isHighPoint={point.data.isHighPoint}
          isLowPoint={point.data.isLowPoint}
          isAveragePoint={point.data.isAveragePoint}
        />
      );
    },
  };
  return <ResponsiveLine {...chartProps} width={width} height={height} />;
};

export default LinearChart;
