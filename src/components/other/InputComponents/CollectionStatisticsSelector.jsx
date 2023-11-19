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
import { getFilteredData2 } from '../../chart/chartUtils';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';

function calculatePriceChanges(data) {
  const sortedData = data.sort((a, b) => new Date(a.x) - new Date(b.x));
  const latestDataPoint = sortedData[sortedData.length - 1];
  const latestTime = new Date(latestDataPoint.x).getTime();
  const twentyFourHoursAgo = latestTime - 24 * 60 * 60 * 1000;

  // Find the data point closest to 24 hours before the latest data point
  let closestIndex = -1;
  let closestTimeDifference = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < sortedData.length - 1; i++) {
    const time = new Date(sortedData[i].x).getTime();
    const timeDifference = Math.abs(time - twentyFourHoursAgo);

    if (timeDifference < closestTimeDifference) {
      closestTimeDifference = timeDifference;
      closestIndex = i;
    }
  }

  if (closestIndex !== -1) {
    const pastPrice = sortedData[closestIndex].y;
    // console.log('pastPrice', pastPrice);
    const priceChange = latestDataPoint.y - pastPrice;
    // console.log('priceChange', priceChange);
    const percentageChange = ((priceChange / pastPrice) * 100).toFixed(2);
    // console.log('percentageChange', percentageChange);

    return [
      {
        startDate: sortedData[closestIndex].x,
        lowPoint: pastPrice.toFixed(2),
        highPoint: latestDataPoint?.y?.toFixed(2),
        endDate: latestDataPoint?.x,
        priceChange: priceChange.toFixed(2),
        percentageChange: `${percentageChange}%`,
        priceIncreased: priceChange > 0,
      },
    ];
  }

  return [];
}

export const calculateStatistics = (data, timeRange) => {
  if (!data || data.length === 0) return {};
  const filteredData = data?.data?.filter(
    (item) => new Date(item?.x).getTime() >= Date.now() - timeRange
  );
  if (filteredData.length === 0) return {};
  let highPoint = 0;
  let lowPoint = 0;
  let sum = 0;
  let averageData = 0;
  let average = 0;
  let volume = 0;
  let mean = 0;
  let squaredDiffs = 0;
  let volatility = 0;
  // const filteredData2 = getFilteredData2(data, timeRange);
  // console.log('filteredData2', filteredData2);
  // console.log('filteredData', filteredData);
  for (const data of filteredData) {
    highPoint = Math.max(...filteredData.map((item) => item.y));
    lowPoint = Math.min(...filteredData.map((item) => item.y));
    sum = filteredData.reduce((acc, curr) => acc + curr.y, 0);
    averageData = calculatePriceChanges(filteredData);
    average = sum / filteredData.length || 0;
    volume = filteredData.length;
    mean = sum / volume;
    squaredDiffs = filteredData.map((item) => {
      const diff = item.y - mean;
      return diff * diff;
    });
    volatility = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / volume);
  }
  // const highPoint = Math.max(...filteredData.map((item) => item.y));
  // const lowPoint = Math.min(...filteredData.map((item) => item.y));
  // const sum = filteredData.reduce((acc, curr) => acc + curr.y, 0);
  // const averageData = calculatePriceChanges(filteredData);
  // console.log('averageData', averageData);
  // const average = sum / filteredData.length || 0;
  // const volume = filteredData.length;
  // const mean = sum / volume;

  // const squaredDiffs = filteredData.map((item) => {
  //   const diff = item.y - mean;
  //   return diff * diff;
  // });

  // const volatility = Math.sqrt(
  //   squaredDiffs.reduce((a, b) => a + b, 0) / volume
  // );

  return {
    highPoint: highPoint.toFixed(2),
    lowPoint: lowPoint.toFixed(2),
    twentyFourHourAverage: {
      startDate: averageData[0]?.startDate,
      endDate: averageData[0]?.endDate,
      lowPoint: averageData[0]?.lowPoint,
      highPoint: averageData[0]?.highPoint,
      priceChange: averageData[0]?.priceChange,
      percentageChange: averageData[0]?.percentageChange,
      priceIncreased: averageData[0]?.priceIncreased,
    },
    average: average?.toFixed(2),
    volume,
    volatility: volatility?.toFixed(2),
  };
};

const CollectionStatisticsSelector = ({ data, timeRange, stats }) => {
  const [selectedStat, setSelectedStat] = useState('');

  const handleChange = (event) => setSelectedStat(event.target.value);

  const StatCard = ({ title, value }) => (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        // padding: 2,
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
      </Select>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {selectedStat && (
          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              title={`${selectedStat.replace(/([A-Z])/g, ' $1').trim()}`}
              value={`${stats[selectedStat]}`}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CollectionStatisticsSelector;
