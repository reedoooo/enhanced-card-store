import React from 'react';
import { FormControl, InputLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { useFormContext, useMode } from '../../../context';
import { StyledChartBox } from '../../../pages/pageStyles/StyledComponents';
import SelectComponent from '../reusable/Select';

const ThemeSelector = ({ setTheme }) => {
  const { theme } = useMode();
  const { formMethods } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'system', label: 'System Theme' },
  ];

  const onFormSubmit = (data) => {
    setTheme(data.themeRange);
    enqueueSnackbar('Theme updated successfully', { variant: 'success' });
  };

  return (
    <StyledChartBox
      theme={theme}
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <FormControl fullWidth variant="outlined" error={!!errors?.themeRange}>
        <InputLabel id="theme-range-select-label">Theme Range</InputLabel>
        <Controller
          name="themeRange"
          control={control}
          render={({ field }) => (
            <SelectComponent {...field} options={themeOptions} />
          )}
        />
      </FormControl>
    </StyledChartBox>
  );
};

export default ThemeSelector;
