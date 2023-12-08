export const groupAndAverageData = (data, threshold = 600000, timeRange) => {
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

export const roundToNearestTenth = (value) => {
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
