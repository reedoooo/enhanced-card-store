import { roundToNearestTenth } from '../../Helpers';
import { Tooltip, Typography } from '@mui/material';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { Box } from '@mui/system';
import useMode from '../../UTILITIES_CONTEXT/ColorModeContext/useMode';
import { useChartContext } from './ChartContext';
import { useAuthContext } from '../AuthContext/authContext';
import useCollectionManager from '../CollectionContext/useCollectionManager';
import { ResponsiveLine } from '@nivo/line';
import { useLoading } from '../../hooks/useLoading';
import useSelectedCollection from '../CollectionContext/useSelectedCollection';

export const groupAndAverageData = (data, threshold = 600000, timeRange) => {
  if (!data || data.length === 0) return [];

  const clusters = [];
  let currentCluster = [data[0]];

  // console.log('Initial cluster with first data point: ', currentCluster);

  // loop for each data point
  for (let i = 1; i < data.length; i++) {
    const prevTime = new Date(data[i - 1].x).getTime();
    const currentTime = new Date(data[i].x).getTime();
    const timeDiff = currentTime - prevTime;

    // console.log(
    //   `Time difference between points ${i - 1} and ${i}: ${timeDiff}ms`
    // );

    if (timeDiff <= threshold) {
      currentCluster.push(data[i]);
    } else {
      clusters.push(currentCluster);
      currentCluster = [data[i]];
    }
  }
  clusters.push(currentCluster); // Push the last cluster
  // console.log('Final cluster: ', currentCluster);

  // Process each cluster to create the desired output format
  clusters.map((cluster) => {
    const middleIndex = Math.floor(cluster.length / 2);
    const middleDatum = cluster[middleIndex];
    const avgY =
      cluster.reduce((sum, point) => sum + point.y, 0) / cluster.length;

    const date = new Date(middleDatum.x);
    const formattedDate = date.toISOString();

    return {
      label: `Price at ${formattedDate}`,
      x: formattedDate,
      y: avgY,
    };
  });

  return clusters;
};

export const getAveragedData = (data) => {
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

// export const convertDataForNivo2 = (rawData2) => {
//   if (!Array.isArray(rawData2) || rawData2.length === 0) {
//     console.error('Invalid or empty rawData provided', rawData2);
//     return [];
//   }

//   // Assuming rawData2 is an array of objects with 'x' and 'y' properties
//   const nivoData = rawData2?.map((dataPoint) => {
//     // Ensure the 'x' value is in ISO date string format
//     const xValue =
//       dataPoint[0]?.x instanceof Date
//         ? dataPoint[0]?.x?.toISOString()
//         : dataPoint[0]?.x;
//     const yValue = dataPoint[0]?.y; // Assuming y value is directly usable

//     return { x: xValue, y: yValue };
//   });

//   // Wrapping the data for a single series. You can add more series similarly
//   return [
//     {
//       id: 'Your Data', // Replace with a meaningful id
//       color: 'hsl(252, 70%, 50%)', // Replace with color of your choice or logic for dynamic colors
//       data: nivoData,
//     },
//   ];
// };

export const finalizeNivoData = (nivoChartData) => {
  // return nivoData which is the data array, combined with id and color properties
  return [
    {
      id: 'Your Data', // Replace with a meaningful id
      color: 'hsl(252, 70%, 50%)', // Replace with color of your choice or logic for dynamic colors
      data: nivoChartData[0]?.data,
    },
  ];
};

export const getFilteredData = (data, timeRange) => {
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

export const formatDateToString = (date) => {
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

export const ChartTooltip = ({ point, lastData, hoveredData, latestData }) => {
  if (!point) return null;
  const formattedTime = hoveredData
    ? new Date(hoveredData.x).toLocaleString()
    : new Date((latestData || lastData).x).toLocaleString();

  const formattedValue = `$${
    hoveredData ? hoveredData.y : (latestData || lastData)?.y
  }`;

  return (
    <>
      <Tooltip title={`Time: ${formattedTime}`} arrow>
        <Typography
          sx={{
            fontSize: 12,
            cursor: 'pointer', // Change the cursor to indicate it's hoverable
          }}
          color="text.secondary"
        >
          {formattedTime}
        </Typography>
      </Tooltip>
      <Tooltip title={`Value: ${formattedValue}`} arrow>
        <Typography
          sx={{
            fontSize: 12,
            cursor: 'pointer', // Change the cursor to indicate it's hoverable
          }}
        >
          {formattedValue}
        </Typography>
      </Tooltip>
    </>
  );
};

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
export const isSpecialPoint = (markers, point) =>
  markers?.some((sp) => sp?.x === point.data.x && sp.y === point.data.y);
export const CustomTooltipLayer = ({ points, xScale, yScale, markers }) => (
  <>
    {points?.map((point, index) => {
      const specialPoint = markers?.find(
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
export const CustomTooltip = ({ point, markers, timeRange }) => {
  const { theme } = useMode();
  return (
    <Tooltip title={`Series: ${point.serieId}`}>
      <TooltipBox theme={theme}>
        <Typography variant="subtitle1">{`Card: ${point.data.label}`}</Typography>
        <Typography variant="body2">{`Time: ${new Date(point.data.xFormatted).toLocaleString()}`}</Typography>
        <Typography variant="h6">{`Value: $${parseFloat(point.data.yFormatted).toFixed(2)}`}</Typography>
        {isSpecialPoint(markers, point) && (
          <Typography color="secondary">Special Point!</Typography>
        )}
      </TooltipBox>
    </Tooltip>
  );
};
