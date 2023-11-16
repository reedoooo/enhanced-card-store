import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { useChartContext } from '../../context/ChartContext/ChartContext';

// Remove setTimeRange(value); from here
const TimeRangeSelector = ({ onChange }) => {
  const { timeRanges, timeRange, setTimeRange, handleChange, currentValue } =
    useChartContext();
  const isInRange = timeRanges.some((option) => option.value === timeRange);
  const safeTimeRange = isInRange ? timeRange : timeRanges[0].value;

  return (
    <Select
      value={safeTimeRange}
      onChange={handleChange}
      sx={{ flex: '1', width: '100%', height: '45' }} // Adjust width and height here
    >
      {timeRanges.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TimeRangeSelector;
