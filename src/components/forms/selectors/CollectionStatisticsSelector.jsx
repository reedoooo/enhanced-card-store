import React from 'react';
import { FormControl, InputLabel } from '@mui/material';

import SelectComponent from '../reusable/Select';
import { useStatisticsStore, useMode, useFormContext } from '../../../context';
import { StyledChartBox } from '../../../pages/pageStyles/StyledComponents';
import { useSnackbar } from 'notistack';
import { Controller } from 'react-hook-form';

const CollectionStatisticsSelector = () => {
  const { formMethods } = useFormContext();
  const [selectedStat, setSelectedStat] = React.useState('');
  const { enqueueSnackbar } = useSnackbar(); // Assuming useOverlay has enqueueSnackbar method
  const { theme } = useMode();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const statisticsOptions = [
    { value: 'highPoint', label: 'High Point' },
    { value: 'lowPoint', label: 'Low Point' },
    { value: 'twentyFourHourAverage', label: '24 Hour Average' },
    { value: 'average', label: 'Average' },
    { value: 'volume', label: 'Volume' },
    { value: 'volatility', label: 'Volatility' },
  ];

  // const handleChange = (event) => setSelectedStat(event.target.value);
  const onFormSubmit = (data) => {
    setSelectedStat(data.themeRange);
    enqueueSnackbar('Stat updated successfully', { variant: 'success' });
  };
  return (
    <StyledChartBox
      theme={theme}
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <FormControl fullWidth variant="outlined" error={!!errors?.themeRange}>
        <InputLabel id="theme-range-select-label">Statistics Range</InputLabel>
        <Controller
          name="statisticsRange"
          control={control}
          render={({ field }) => (
            <SelectComponent {...field} options={statisticsOptions} />
          )}
        />
      </FormControl>
    </StyledChartBox>
  );
};

export default CollectionStatisticsSelector;
