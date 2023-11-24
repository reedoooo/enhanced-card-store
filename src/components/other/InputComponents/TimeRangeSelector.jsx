import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { useChartContext } from '../../../context/ChartContext/ChartContext';

const TimeRangeSelector = () => {
  const { timeRange, timeRanges, handleChange } = useChartContext();

  return (
    <Select
      value={timeRange}
      onChange={handleChange}
      displayEmpty
      variant="outlined"
      sx={{ minWidth: 120, width: '100%' }}
    >
      {timeRanges.map((range) => (
        <MenuItem key={range.label} value={range.value}>
          {range.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TimeRangeSelector;
