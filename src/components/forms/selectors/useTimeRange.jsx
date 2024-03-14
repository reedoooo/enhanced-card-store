import { useMemo, useCallback } from 'react';
import { useFormContext } from '../../../context';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useSubmitHandler from '../hooks/useSubmitHandler';

function useTimeRange(showSnackbar) {
  const { formMethods, onSubmit } = useFormContext();
  const { selectedCollection } = useSelectedCollection();
  const averagedChartData = selectedCollection?.averagedChartData;
  const selectedTimeRange = formMethods.watch('timeRange', '24hr');
  const timeRangeOptions = useMemo(() => {
    return Object.entries(averagedChartData || {}).map(([key, value]) => {
      // console.log(`Key: ${key}, Value: `, value);
      return {
        value: value?.id,
        label: value?.name?.toUpperCase(),
      };
    });
  }, [averagedChartData]);
  const onFormSubmit = useSubmitHandler(
    onSubmit,
    showSnackbar,
    'Success',
    'Now viewing chart data for {timeRange}',
    'Failed to view chart data for {timeRange}'
  );
  // const onFormSubmit = useCallback(
  //   (data) => {
  //     onSubmit(data, 'timeRangeSelector')
  //       .then(() => {
  //         showSnackbar(
  //           {
  //             title: 'Success',
  //             description: `Now viewing chart data for ${data?.timeRange}`,
  //           },
  //           'success'
  //         );
  //       })
  //       .catch((error) => {
  //         showSnackbar(
  //           {
  //             title: 'Error',
  //             description: `Failed to view chart data for ${data?.timeRange}: ${error}`,
  //           },
  //           'error'
  //         );
  //       });
  //   },
  //   [onSubmit, showSnackbar]
  // );

  return {
    timeRangeOptions,
    onFormSubmit,
    control: formMethods.control,
    errors: formMethods.formState.errors,
    selectedTimeRange, // Including the selected time range in the hook's return value
  };
}

export default useTimeRange;
