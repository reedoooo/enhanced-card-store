// export const getUniqueValidData = (allXYValues) => {
//   if (!Array.isArray(allXYValues)) {
//     console.error('Invalid input: allXYValues should be an array');
//     return [];
//   }

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
// import { useCallback, useMemo, useState } from 'react';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

export const getUniqueValidData = (currentChartData) => {
  if (!Array.isArray(currentChartData)) {
    console.error('Invalid input: currentChartData should be an array');
    return [];
  }

  const uniqueLabels = new Set();
  const uniqueXValues = new Set();

  return currentChartData
    .filter((entry) => {
      // Check if entry is valid, y is a number and not zero, and label is unique
      return (
        entry &&
        typeof entry === 'object' &&
        typeof entry.y === 'number' &&
        entry.y !== 0 &&
        entry.y !== null &&
        entry.y !== undefined &&
        entry.label &&
        !uniqueLabels.has(entry.label)
      );
    })
    .filter((entry) => {
      // Check if x is present, not null, not undefined, and unique
      const hasValidX =
        entry && 'x' in entry && entry.x !== null && entry.x !== undefined;
      if (hasValidX && !uniqueXValues.has(entry.x)) {
        uniqueXValues.add(entry.x);
        uniqueLabels.add(entry.label);
        return true;
      }
      return false;
    })
    .map((entry) => ({
      label: entry.label,
      x: entry.x,
      y: entry.y,
    }));
};

// export const groupAndAverageData = (data, threshold = 600000) => {
//   // 10 minutes in milliseconds
//   if (!data || data.length === 0) return { dates: [], times: [], values: [] };

//   const clusters = [];
//   let currentCluster = [data[0]];

//   for (let i = 1; i < data.length; i++) {
//     const prevTime = new Date(data[i - 1].x).getTime();
//     const currentTime = new Date(data[i].x).getTime();
//     if (currentTime - prevTime <= threshold) {
//       currentCluster.push(data[i]);
//     } else {
//       console.log('Current Cluster:', currentCluster); // Log the current cluster
//       clusters.push(currentCluster);
//       currentCluster = [data[i]];
//     }
//   }
//   clusters.push(currentCluster); // Push the last cluster
//   console.log('All Clusters:', clusters); // Log all clusters

//   // For each cluster, find the middlemost x-value and average y-values
//   let dates = [];
//   let times = [];
//   let values = [];

//   clusters.forEach((cluster) => {
//     const middleIndex = Math.floor(cluster.length / 2);
//     const middleDatum = cluster[middleIndex];
//     const date = new Date(middleDatum.x);
//     const avgY =
//       cluster.reduce((sum, point) => sum + point.y, 0) / cluster.length;

//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const AMPM = hours >= 12 ? 'PM' : 'AM';
//     const adjustedHours = hours % 12 || 12; // Converts "0" to "12"

//     dates.push(
//       `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//         2,
//         '0'
//       )}-${String(date.getDate()).padStart(2, '0')}`
//     );
//     times.push(
//       `${String(adjustedHours).padStart(2, '0')}:${String(minutes).padStart(
//         2,
//         '0'
//       )} ${AMPM}`
//     );
//     values.push(avgY);
//   });

//   return { dates, times, values };
// };

export const groupAndAverageData = (data, threshold = 600000) => {
  if (!data || data.length === 0) return [];

  const clusters = [];
  let currentCluster = [data[0]];

  // console.log('Initial cluster with first data point: ', currentCluster);

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

  // console.log('Processed clusters: ', clusters);
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

export const getTickValues = (timeRange) => {
  console.log('timeRange: ', timeRange);
  const mapping = {
    600000: 'every 10 minutes',
    900000: 'every 15 minutes',
    3600000: 'every hour',
    7200000: 'every 2 hours',
    86400000: 'every day',
    604800000: 'every week',
    2592000000: 'every month',
  };
  return mapping[timeRange] || 'every day'; // Default to 'every week' if no match
};

// export const useMovingAverage = (data, numberOfPricePoints) => {
//   return useMemo(() => {
//     if (!Array.isArray(data)) {
//       return [];
//     }
//     console.log('[1][Data]----------> [', data + ']');
//     console.log(
//       '[2][NUMBER OF POINTS]----------> [',
//       numberOfPricePoints + ']'
//     );

//     return data.map((row, index, total) => {
//       const start = Math.max(0, index - numberOfPricePoints);
//       const end = index;
//       const subset = total.slice(start, end + 1);
//       const sum = subset.reduce((a, b) => a + b.y, 0);
//       return {
//         // x: String(row.x),
//         x: row.x,
//         y: sum / subset.length || 0,
//       };
//     });
//   }, [data, numberOfPricePoints]);
// };

// export const convertDataForNivo = ({ dates, times, values }) => {
//   if (
//     !dates ||
//     !times ||
//     !values ||
//     dates.length !== times.length ||
//     dates.length !== values.length
//   ) {
//     console.error('Invalid or mismatched data arrays provided');
//     return [];
//   }

//   // Assuming that dates, times, and values arrays are of equal length
//   const nivoData = dates.map((date, index) => {
//     const dateTime = new Date(`${date} ${times[index]}`);
//     // Nivo chart requires the date to be either a Date object or an ISO date string
//     return {
//       x: dateTime.toISOString(),
//       y: values[index],
//     };
//   });

// Wrapping the data for a single series, you can add more series similarly
//   return [
//     {
//       id: 'Averaged Data',
//       data: nivoData,
//     },
//   ];
// };

export const convertDataForNivo2 = (rawData2) => {
  if (!Array.isArray(rawData2) || rawData2?.length === 0) {
    console.error('Invalid or empty rawData provided', rawData2);
    return [];
  }

  // console.log('rawData2: ', rawData2);
  // console.log('rawData2.data: ', rawData2[0]);
  // rawData is assumed to be an array of objects with 'label', 'x', and 'y' properties
  const nivoData = rawData2[0].map((dataPoint) => ({
    x: dataPoint.x, // x value is already an ISO date string
    y: dataPoint.y, // y value
  }));

  // Wrapping the data for a single series. You can add more series similarly
  return [
    {
      id: 'Averaged Data',
      color: '#4cceac',
      data: nivoData,
    },
  ];
};

const roundToNearestTenth = (value) => {
  return Math.round(value * 10) / 10;
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
