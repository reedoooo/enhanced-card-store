import React from 'react';
import { FormControl } from '@mui/material';

import SelectComponent from '../reusable/Select';
import { useStatisticsStore, useMode } from '../../../context';
import { StyledChartBox } from '../../../pages/pageStyles/StyledComponents';

const CollectionStatisticsSelector = () => {
  const { selectedStat, setSelectedStat } = useStatisticsStore();
  const { theme } = useMode();

  const statisticsOptions = [
    { value: 'highPoint', label: 'High Point' },
    { value: 'lowPoint', label: 'Low Point' },
    { value: 'twentyFourHourAverage', label: '24 Hour Average' },
    { value: 'average', label: 'Average' },
    { value: 'volume', label: 'Volume' },
    { value: 'volatility', label: 'Volatility' },
  ];

  const handleChange = (event) => setSelectedStat(event.target.value);

  return (
    <StyledChartBox theme={theme}>
      <FormControl fullWidth variant="outlined">
        <SelectComponent
          name="statistic"
          value={selectedStat}
          onChange={handleChange}
          options={statisticsOptions}
        />
      </FormControl>
    </StyledChartBox>
  );
};

export default CollectionStatisticsSelector;
