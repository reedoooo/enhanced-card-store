import React, { useState, useMemo } from 'react';
import {
  MenuItem,
  Select,
  Typography,
  Box,
  Grid,
  CardContent,
  Card,
} from '@mui/material';
import { getFilteredData2 } from '../../reusable/chartUtils';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../../context/StatisticsContext/StatisticsContext';
import StatCard from '../dataDisplay/StatCard';

// const CollectionStatisticsSelector = ({ data, timeRange, stats }) => {
//   const [selectedStat, setSelectedStat] = useState('');
//   // const stats = useMemo(
//   //   () => calculateStatistics(data, timeRange), // Recalculate statistics based on timeRange
//   //   [data, timeRange]
//   // );
//   // const stats = useMemo(() => {
//   //   return calculateStatistics(data, timeRange);
//   // }, [data, timeRange]);
//   // const stats = useMemo(
//   //   () => calculateStatistics(data, timeRange),
//   //   [data, timeRange]
//   // );
//   const handleChange = (event) => setSelectedStat(event.target.value);

//   const StatCard = ({ title, value }) => (
//     <Card sx={{ minWidth: 275, marginBottom: 2 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {value}
//         </Typography>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: 2,
//         width: '100%',
//         // padding: 2,
//       }}
//     >
//       <Select
//         value={selectedStat}
//         onChange={handleChange}
//         displayEmpty
//         sx={{ width: '100%', marginBottom: 2 }}
//       >
//         <MenuItem value="" disabled>
//           Select Statistic
//         </MenuItem>
//         <MenuItem value="highPoint">High Point</MenuItem>
//         <MenuItem value="lowPoint">Low Point</MenuItem>
//         <MenuItem value="twentyFourHourAverage">24 Hour Average</MenuItem>
//         <MenuItem value="average">Average</MenuItem>
//         <MenuItem value="volume">Volume</MenuItem>
//         <MenuItem value="volatility">Volatility</MenuItem>
//       </Select>

//       <Grid container spacing={2} alignItems="center" justifyContent="center">
//         {selectedStat && (
//           <Grid item xs={12} md={6} lg={4}>
//             <StatCard
//               title={`${selectedStat.replace(/([A-Z])/g, ' $1').trim()}`}
//               value={`${stats[selectedStat]}`}
//             />
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default CollectionStatisticsSelector;

const CollectionStatisticsSelector = () => {
  const [selectedStat, setSelectedStat] = useState('');
  const { stats } = useStatisticsStore();

  const handleChange = (event) => setSelectedStat(event.target.value);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <Select
        value={selectedStat}
        onChange={handleChange}
        displayEmpty
        sx={{ width: '100%', marginBottom: 2 }}
      >
        <MenuItem value="" disabled>
          Select Statistic
        </MenuItem>
        <MenuItem value="highPoint">High Point</MenuItem>
        <MenuItem value="lowPoint">Low Point</MenuItem>
        <MenuItem value="twentyFourHourAverage">24 Hour Average</MenuItem>
        <MenuItem value="average">Average</MenuItem>
        <MenuItem value="volume">Volume</MenuItem>
        <MenuItem value="volatility">Volatility</MenuItem>
        {/* Other MenuItems */}
      </Select>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {selectedStat && (
          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              title={`${selectedStat?.replace(/([A-Z])/g, ' $1').trim()}`}
              value={`${stats[selectedStat]}`}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CollectionStatisticsSelector;
