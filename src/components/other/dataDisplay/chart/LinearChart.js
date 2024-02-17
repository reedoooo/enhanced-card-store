import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Typography, Box, Tooltip, useMediaQuery, Grid } from '@mui/material';
import ChartErrorBoundary from '../../../reusable/ChartErrorBoundary';
import { useAuthContext, useChartContext, useMode } from '../../../../context';
import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import { defaultChartConstants } from '../../../../context/constants';
import styled from 'styled-components';
import { debounce } from 'lodash';

export const useEventHandlers = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const debouncedSetHoveredData = useCallback(
    debounce(setHoveredData, 100),
    []
  );

  const handleMouseMove = useCallback(
    (point) => {
      debouncedSetHoveredData(
        point ? { x: point?.data?.x, y: point?.data?.y } : null
      );
    },
    [debouncedSetHoveredData]
  );

  const handleMouseLeave = useCallback(
    () => debouncedSetHoveredData(null),
    [debouncedSetHoveredData]
  );

  return { hoveredData, handleMouseMove, handleMouseLeave };
};
const TooltipBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));
const isSpecialPoint = (specialPoints, point) =>
  specialPoints.some((sp) => sp.x === point.data.x && sp.y === point.data.y);
const CustomTooltipLayer = ({ points, xScale, yScale, specialPoints }) => (
  <>
    {points?.map((point, index) => {
      const specialPoint = specialPoints.find(
        (sp) => sp.x === point.data.x && sp.y === point.data.y
      );
      return specialPoint ? (
        <g
          key={index}
          transform={`translate(${xScale(point.data.x)},${yScale(point.data.y)})`}
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
      ) : null;
    })}
  </>
);
const CustomTooltip = ({ point, specialPoints, timeRange }) => {
  const { theme } = useMode();
  return (
    <Tooltip title={`Series: ${point.serieId}`}>
      <TooltipBox theme={theme}>
        <Typography variant="subtitle1">{`Card: ${point.data.label}`}</Typography>
        <Typography variant="body2">{`Time: ${new Date(point.data.xFormatted).toLocaleString()}`}</Typography>
        <Typography variant="h6">{`Value: $${parseFloat(point.data.yFormatted).toFixed(2)}`}</Typography>
        {isSpecialPoint(specialPoints, point) && (
          <Typography color="secondary">Special Point!</Typography>
        )}
      </TooltipBox>
    </Tooltip>
  );
};
const ChartConfiguration = ({
  specialPoints,
  height,
  timeRange,
  nivoChartData,
}) => {
  const { theme } = useMode();
  const { tickValues } = useChartContext();
  const { isLoggedIn, userId } = useAuthContext();
  const { selectedCollection } = useCollectionManager(isLoggedIn, userId);
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  const chartProps = useMemo(
    () => ({
      data: [nivoChartData],
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      tooltip: ({ point }) => (
        <CustomTooltip point={point} specialPoints={specialPoints} />
      ),
      color: theme.palette.backgroundA.contrastTextA,
      text: {
        color: theme.palette.backgroundA.contrastTextA,
        fill: theme.palette.backgroundA.contrastTextA,
        fontSize: 12,
      },
      yFormat: '$.2f',

      colors: theme.palette.backgroundE.dark,
      axisBottom: {
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 40,
        legendPosition: 'middle',
        tickSize: 5,
        tickPadding: 5,
        tickValues: tickValues,
        format: (value) => {
          const d = new Date(value);
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        },
      },
      axisLeft: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Value ($)',
        legendOffset: -50,
        legendPosition: 'middle',
        color: theme.palette.text.primary,
        format: (value) => `$${value.toFixed(2)}`,
      },
      margin: { top: 20, right: 40, bottom: 50, left: 55 },
      padding: 0.3,
      animate: true,
      xFormat: 'time:%Y-%m-%d %H:%M:%S',
      xScale: {
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%LZ', // Adjust if necessary to match your input data format
        useUTC: false,
        precision: 'second',
      },
      yScale: {
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      },
      pointSize: 10,
      pointBorderWidth: 1,
      curve: 'monotoneX',
      useMesh: true,
      motionConfig: 'gentle',

      stiffness: 90,
      damping: 15,
      enableSlices: 'x',
      // pointBorderColor: { from: 'serieColor', modifiers: [] },
      pointBorderColor: theme.palette.primary.main,
      // pointColor: { from: 'color', modifiers: [] },
      markers: specialPoints,
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
            specialPoints={specialPoints}
          />
        ),
      ],
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
    }),
    [
      nivoChartData,
      handleMouseMove,
      handleMouseLeave,
      specialPoints,
      theme,
      tickValues,
    ]
  );

  const NivoContainer = ({ children, height }) => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <div style={{ height: height || '800px' }}>{children}</div>
      </div>
    </div>
  );
  return (
    <NivoContainer height={height}>
      <ResponsiveLine {...chartProps} />
    </NivoContainer>
  );
};

const LinearChart = ({ height, specialPoints, timeRange, nivoData }) => {
  return (
    <ChartErrorBoundary>
      <ChartConfiguration
        nivoChartData={nivoData}
        specialPoints={specialPoints}
        height={height}
        timeRange={timeRange}
      />
    </ChartErrorBoundary>
  );
};

export default LinearChart;
