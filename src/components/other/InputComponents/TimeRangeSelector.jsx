import React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { useChartContext } from '../../../context/ChartContext/ChartContext';

const TimeRangeSelector = () => {
  const { timeRange, timeRanges, handleChange } = useChartContext();
  const styles = {
    container: {
      padding: '15px',
      border: '2px solid #444',
      borderRadius: '8px',
      backgroundColor: '#222',
      color: '#fff',
      // margin: '20px auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%', // Adjust height here
      width: '100%', // Adjust width here
    },
  };
  return (
    <Box style={styles.container}>
      <Select
        value={timeRange}
        onChange={handleChange}
        displayEmpty
        variant="outlined"
        sx={{
          width: '100%',
          marginBottom: 2,
          color: '#fff',
          border: '1px solid #fff',
        }}
      >
        {timeRanges.map((range) => (
          <MenuItem key={range.label} value={range.value}>
            {range.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default TimeRangeSelector;
