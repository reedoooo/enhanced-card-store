import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { StyledChartBox } from '../../pages/pageStyles/StyledComponents';
import { useChartContext, useMode } from '../../context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchemas } from '../../context/UTILITIES_CONTEXT/FormContext/schemas';

const TimeRangeSelector = () => {
  const { timeRange, timeRanges, setTimeRange } = useChartContext();
  const { theme } = useMode();
  const defaultValues = { timeRange: timeRange?.value || '' };

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchemas.TimeRangeSchema),
    defaultValues: defaultValues,
  });

  const onFormSubmit = (data) => {
    // Find the range object based on the value
    const foundRange = timeRanges?.find(
      (range) => range.value === data.timeRange
    );
    if (foundRange) {
      setTimeRange(foundRange);
    }
  };
  return (
    <StyledChartBox theme={theme}>
      {/*eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Controller
        name="timeRange"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors.timeRange}
            sx={{
              width: '100%',
            }}
          >
            {/* <InputLabel>Time Range</InputLabel> */}
            <Select
              {...field}
              displayEmpty
              onChange={(e) => {
                field.onChange(e);
                onFormSubmit({ timeRange: e.target.value });
              }}
              value={field?.value || ''} // Ensure a defined value is passed
              label="Time Range"
              sx={{
                width: '100%',
                marginBottom: 2,
                color: '#fff',
                border: '1px solid #fff',
              }}
            >
              {/* Disabled item as a placeholder */}
              <MenuItem value="" disabled>
                Select Time Range
              </MenuItem>

              {timeRanges?.map((range) => (
                <MenuItem key={range.id} value={range.value}>
                  {range.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      {/* </form> */}
    </StyledChartBox>
  );
};

export default TimeRangeSelector;
