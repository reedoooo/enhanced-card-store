import { useMemo, useCallback } from 'react';
import { useFormContext } from '../../../context';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useSubmitHandler from '../hooks/useSubmitHandler';

function useTimeRange() {
  const { formMethods, onSubmit } = useFormContext();

  const { selectedCollection } = useSelectedCollection();
  if (!selectedCollection) {
    return console.error('No collection selected');
  }
  const averagedChartData = selectedCollection?.averagedChartData;
  const selectedTimeRange = formMethods.watch('timeRange', '24hr');
  const timeRangeOptions = useMemo(() => {
    return Object.entries(averagedChartData || {}).map(([key, value]) => {
      return {
        value: value?.id,
        label: value?.name?.toUpperCase(),
      };
    });
  }, [averagedChartData]);

  const handleTimeRangeSubmit = async (data) => {
    console.log('Time Range Selected:', data.timeRange);
  };
  const successTitle = 'Success';
  const successDescription = 'Now viewing chart data for {timeRange}';
  const errorDescription = 'Failed to view chart data for {timeRange}';
  const onFormSubmit = useSubmitHandler(
    handleTimeRangeSubmit,
    successTitle,
    successDescription,
    errorDescription
  );
  return {
    timeRangeOptions,
    onFormSubmit,
    control: formMethods.control,
    errors: formMethods.formState.errors,
    selectedTimeRange, // Including the selected time range in the hook's return value
  };
}

export default useTimeRange;
