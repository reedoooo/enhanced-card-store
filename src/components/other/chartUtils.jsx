export const getUniqueFilteredXYValues = (allXYValues) => {
  if (!Array.isArray(allXYValues)) {
    console.error('Invalid input: allXYValues should be an array');
    return [];
  }

  const uniqueXValues = new Set();
  return allXYValues
    .filter((entry) => {
      return (
        entry &&
        typeof entry === 'object' &&
        typeof entry.y === 'number' &&
        entry.y !== 0
      );
    })
    .filter((entry) => {
      const hasValidX =
        entry && 'x' in entry && entry.x !== null && entry.x !== undefined;
      if (hasValidX && !uniqueXValues.has(entry.x)) {
        uniqueXValues.add(entry.x);
        return true;
      }
      return false;
    });
};

export const groupAndAverageData = (data, threshold = 1) => {
  if (!data || data.length === 0) return { dates: [], times: [], values: [] };

  const clusters = [];
  let currentCluster = [data[0]];

  for (let i = 1; i < data.length; i++) {
    const prevTime = new Date(data[i - 1].x).getTime();
    const currentTime = new Date(data[i].x).getTime();
    if (currentTime - prevTime <= threshold) {
      currentCluster.push(data[i]);
    } else {
      clusters.push(currentCluster);
      currentCluster = [data[i]];
    }
  }
  clusters.push(currentCluster); // Push the last cluster

  // For each cluster, find the middlemost x-value and average y-values
  let dates = [];
  let times = [];
  let values = [];

  clusters.forEach((cluster) => {
    const middleIndex = Math.floor(cluster.length / 2);
    const middleDatum = cluster[middleIndex];
    const date = new Date(middleDatum.x);
    const avgY =
      cluster.reduce((sum, point) => sum + point.y, 0) / cluster.length;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // Converts "0" to "12"

    dates.push(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`
    );
    times.push(
      `${String(adjustedHours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0'
      )} ${AMPM}`
    );
    values.push(avgY);
  });

  return { dates, times, values };
};

export const convertDataForNivo = ({ dates, times, values }) => {
  if (!dates.length || !times.length || !values.length) {
    console.error('Invalid data arrays provided');
    return [];
  }

  // Assuming that dates, times, and values arrays are of equal length
  const nivoData = dates.map((date, index) => {
    const dateTime = new Date(`${date} ${times[index]}`);
    // Nivo chart requires the date to be either a Date object or an ISO date string
    return {
      x: dateTime.toISOString(),
      y: values[index],
    };
  });

  // Wrapping the data for a single series, you can add more series similarly
  return [
    {
      id: 'Averaged Data',
      data: nivoData,
    },
  ];
};
