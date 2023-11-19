import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { useChartContext } from '../../../context/ChartContext/ChartContext';

// Remove setTimeRange(value); from here
// const TimeRangeSelector = ({ onChange }) => {
//   const { timeRanges, timeRange, setTimeRange, handleChange, currentValue } =
//     useChartContext();
//   console.log('timeRanges: ', timeRanges);
//   console.log('timeRange: ', timeRange);
//   console.log('currentValue: ', currentValue);
//   const isInRange = timeRanges.some((option) => option.value === currentValue);
//   console.log('isInRange: ', isInRange);
//   const safeTimeRange = isInRange ? timeRange : timeRanges[1].value;
//   console.log('safeTimeRange: ', safeTimeRange);

//   return (
//     <Select
//       value={safeTimeRange}
//       onChange={handleChange}
//       sx={{ flex: '1', width: '100%', height: '45' }} // Adjust width and height here
//     >
//       {timeRanges.map((option) => (
//         <MenuItem key={option.label} value={option.value}>
//           {option.label}
//         </MenuItem>
//       ))}
//     </Select>
//   );
// };

// export default TimeRangeSelector;

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
