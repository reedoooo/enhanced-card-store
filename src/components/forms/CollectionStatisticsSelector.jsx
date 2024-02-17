import React, { useState } from 'react';
import { Box, Grid, Select, MenuItem, Container } from '@mui/material';
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useStatisticsStore } from '../../context/SECONDARY_CONTEXT/StatisticsContext/StatisticsContext';
import StatCard from '../other/dataDisplay/StatCard';
import { StyledChartBox } from '../../pages/pageStyles/StyledComponents';
import { useMode } from '../../context';
const CollectionStatisticsSelector = () => {
  const { selectedCollection } = useCollectionStore();
  const { statsByCollectionId, stats, selectedStat, setSelectedStat } =
    useStatisticsStore();

  const handleChange = (event) => setSelectedStat(event.target.value);
  const { theme } = useMode();
  return (
    <StyledChartBox theme={theme}>
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
                value={statsByCollectionId[selectedStat]}
              />
            </Container>
          </Grid>
        )}
      </Grid>
    </StyledChartBox>
  );
};

export default CollectionStatisticsSelector;
