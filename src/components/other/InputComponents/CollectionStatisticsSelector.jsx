import React, { useState } from 'react';
import { Box, Grid, Select, MenuItem, Container } from '@mui/material';
import { useCollectionStore } from '../../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../../context/StatisticsContext/StatisticsContext';
import StatCard from '../dataDisplay/StatCard';
const CollectionStatisticsSelector = () => {
  const { selectedCollection } = useCollectionStore();
  const { statsByCollectionId, stats, selectedStat, setSelectedStat } =
    useStatisticsStore();

  const handleChange = (event) => setSelectedStat(event.target.value);

  const specificCollectionStats =
    statsByCollectionId[selectedCollection?._id] || {};
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
        value={selectedStat}
        onChange={handleChange}
        displayEmpty
        sx={{
          width: '100%',
          marginBottom: 2,
          color: '#fff',
          border: '1px solid #fff',
        }}
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
                value={specificCollectionStats[selectedStat]}
              />
            </Container>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CollectionStatisticsSelector;
