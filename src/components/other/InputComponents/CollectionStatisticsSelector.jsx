import React, { useState } from 'react';
import { Box, Grid, Select, MenuItem, Container } from '@mui/material';
import { useCollectionStore } from '../../../context/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../../context/StatisticsContext/StatisticsContext';
import StatCard from '../dataDisplay/StatCard';
const CollectionStatisticsSelector = () => {
  const [selectedStat, setSelectedStat] = useState('');
  const { selectedCollection } = useCollectionStore();
  const { statsByCollectionId, stats } = useStatisticsStore();

  const handleChange = (event) => setSelectedStat(event.target.value);

  // const specificCollectionStats =
  //   statsByCollectionId[selectedCollection?._id] || {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        height: '100%',
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
          <Grid item xs={12}>
            <Container>
              <StatCard
                title={
                  selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)
                }
                value={stats[selectedStat]}
              />
            </Container>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CollectionStatisticsSelector;
