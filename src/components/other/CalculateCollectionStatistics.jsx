import React, { useMemo } from 'react';
import { MenuItem, Select, Typography } from '@mui/material';

// Helper function to calculate statistics
const calculateStatistics = (data, timeRange) => {
  // Filter the data according to the timeRange
  const filteredData = data.filter(
    (item) => new Date(item.x).getTime() >= Date.now() - timeRange
  );

  const prices = filteredData.map((d) => d.y);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const percentChange =
    ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;
  const average = prices.reduce((a, b) => a + b, 0) / prices.length;

  return { high, low, percentChange, average };
};

const StatisticsSelector = ({ data, timeRange }) => {
  const [selectedStat, setSelectedStat] = React.useState('');

  // Compute the statistics when the data or timeRange changes
  const stats = useMemo(
    () => calculateStatistics(data, timeRange),
    [data, timeRange]
  );

  // Handle selection change
  const handleChange = (event) => {
    setSelectedStat(event.target.value);
  };

  return (
    <>
      <Select value={selectedStat} onChange={handleChange} displayEmpty>
        <MenuItem value="" disabled>
          Select Statistic
        </MenuItem>
        <MenuItem value="high">High Point</MenuItem>
        <MenuItem value="low">Low Point</MenuItem>
        <MenuItem value="percentChange">Percent Change</MenuItem>
        <MenuItem value="average">24 Hour Average</MenuItem>
      </Select>
      <Typography variant="subtitle1" component="div">
        {selectedStat === 'high' && `High: $${stats.high}`}
        {selectedStat === 'low' && `Low: $${stats.low}`}
        {selectedStat === 'percentChange' &&
          `Change: ${stats.percentChange.toFixed(2)}%`}
        {selectedStat === 'average' && `24hr Avg: $${stats.average.toFixed(2)}`}
      </Typography>
    </>
  );
};

export default StatisticsSelector;
