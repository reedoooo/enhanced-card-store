import React from 'react';
import { MenuItem, Select } from '@mui/material';

export const timeRanges = [
  { label: '2 hours', value: 2 * 60 * 60 * 1000 },
  { label: '24 hours', value: 24 * 60 * 60 * 1000 },
  { label: '7 days', value: 7 * 24 * 60 * 60 * 1000 },
  { label: '1 month', value: 30 * 24 * 60 * 60 * 1000 },
];

const TimeRangeSelector = ({ value, onChange }) => (
  <Select value={value} onChange={(e) => onChange(Number(e.target.value))}>
    {timeRanges.map((option) => (
      <MenuItem key={option.label} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

export default TimeRangeSelector;
