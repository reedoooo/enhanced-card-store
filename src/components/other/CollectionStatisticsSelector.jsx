import React, { useState, useMemo } from 'react';
import { MenuItem, Select, Typography, Box } from '@mui/material';

function calculateStatistics(data, timeRange) {
  if (!data || data.length === 0) {
    return {}; // Return an empty object if data is not available
  }

  const filteredData = data.filter(
    (item) => new Date(item.x).getTime() >= Date.now() - timeRange
  );

  if (filteredData.length === 0) {
    return {}; // Return an empty object if filtered data is not available
  }

  const sortedData = [...filteredData].sort((a, b) => a.y - b.y);
  const highPoint = sortedData.at(-1)?.y || 0;
  const lowPoint = sortedData[0]?.y || 0;
  const percentChange =
    sortedData.length > 1 ? ((highPoint - lowPoint) / lowPoint) * 100 : 0;
  const sum = filteredData.reduce((acc, curr) => acc + curr.y, 0);
  const average = sum / filteredData.length || 0;
  const volume = filteredData.length;

  const mean = sum / volume;
  const squaredDiffs = filteredData.map((item) => {
    const diff = item.y - mean;
    return diff * diff;
  });
  const volatility = Math.sqrt(
    squaredDiffs.reduce((a, b) => a + b, 0) / volume
  );

  return {
    highPoint: highPoint.toFixed(2),
    lowPoint: lowPoint.toFixed(2),
    percentChange: percentChange.toFixed(2),
    average: average.toFixed(2),
    volume,
    volatility: volatility.toFixed(2),
  };
}

const CollectionStatisticsSelector = ({ data, timeRange }) => {
  const [selectedStat, setSelectedStat] = useState('');

  const stats = useMemo(
    () => calculateStatistics(data, timeRange),
    [data, timeRange]
  );

  const handleChange = (event) => {
    setSelectedStat(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%', // Adjust width here
        height: '100%', // Adjust height here
      }}
    >
      <Select
        value={selectedStat}
        onChange={handleChange}
        displayEmpty
        sx={{ width: 200 }}
      >
        <MenuItem value="" disabled>
          Select Statistic
        </MenuItem>
        <MenuItem value="highPoint">High Point</MenuItem>
        <MenuItem value="lowPoint">Low Point</MenuItem>
        <MenuItem value="percentChange">Percent Change</MenuItem>
        <MenuItem value="average">24 Hour Average</MenuItem>
        <MenuItem value="volume">Volume</MenuItem>
        <MenuItem value="volatility">Volatility</MenuItem>
      </Select>

      <Typography variant="subtitle1" component="div">
        {selectedStat &&
          `${selectedStat.replace(/([A-Z])/g, ' $1').trim()}: $${
            stats[selectedStat]
          }`}
      </Typography>
    </Box>
  );
};

export default CollectionStatisticsSelector;
