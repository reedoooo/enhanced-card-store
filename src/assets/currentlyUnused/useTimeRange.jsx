// // import { useMemo, useCallback } from 'react';
// // import { useFormContext } from '../../../context';
// // import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// // import useSubmitHandler from './useSubmitHandler';
// // import useRCFormHook from './useRCFormHook';
// // import { zodSchemas } from '../formsConfig';

// // function useTimeRange() {
// //   const methods = useRCFormHook('timeRange', zodSchemas, {});
// //   const { selectedCollection } = useSelectedCollection();
// //   if (!selectedCollection) {
// //     return console.error('No collection selected');
// //   }
// //   const averagedChartData = selectedCollection?.averagedChartData;
// //   const statistics = selectedCollection?.collectionStatistics;
// //   const themes = [
// //     { value: 'light', label: 'Light Theme' },
// //     { value: 'dark', label: 'Dark Theme' },
// //     { value: 'system', label: 'System Theme' },
// //   ];
// //   const selectedTimeRange = methods.watch('timeRange', '24hr');
// //   const timeRangeOptions = useMemo(() => {
// //     return Object.entries(averagedChartData || {}).map(([key, value]) => {
// //       return {
// //         value: value?.id,
// //         label: value?.name?.toUpperCase(),
// //       };
// //     });
// //   }, [averagedChartData]);

// //   const handleTimeRangeSubmit = async (data) => {
// //     console.log('Time Range Selected:', data.timeRange);
// //   };
// //   const successTitle = 'Success';
// //   const successDescription = 'Now viewing chart data for {timeRange}';
// //   const errorDescription = 'Failed to view chart data for {timeRange}';
// //   const onFormSubmit = useSubmitHandler(
// //     handleTimeRangeSubmit,
// //     successTitle,
// //     successDescription,
// //     errorDescription
// //   );
// //   return {
// //     timeRangeOptions,
// //     onFormSubmit,
// //     control: methods.control,
// //     errors: methods.formState.errors,
// //     selectedTimeRange, // Including the selected time range in the hook's return value
// //   };
// // }

// // export default useTimeRange;
// import { useEffect, useState } from 'react';
// import { useWatch } from 'react-hook-form';

// const useTimeRange = (control, selectedCollection) => {
//   const [selectedChartData, setSelectedChartData] = useState(null);
//   const [updatedRangeData, setUpdatedRangeData] = useState(null);
//   const selectedTimeRange = useWatch({
//     control,
//     name: 'timeRange', // Adjust according to your form field's name
//     defaultValue: '24hr', // Default value
//   });
//   const logTimeRange = (value) => {
//     console.log(`Time Range changed to: ${value.timeRange}`);
//   };

//   // Update chart data based on the selected time range
//   useEffect(() => {
//     if (selectedCollection && selectedTimeRange) {
//       console.log(selectedTimeRange);
//       console.log('Current Collection:', selectedCollection);
//       const newChartData =
//         selectedCollection.averagedChartData?.[selectedTimeRange];
//       console.log(newChartData);
//       setSelectedChartData(newChartData || null);
//       setUpdatedRangeData(selectedTimeRange);
//     }
//   }, [selectedTimeRange, selectedCollection]);

//   return {
//     selectedTimeRange,
//     selectedChartData,
//     logTimeRange,
//     updatedRangeData,
//     setSelectedChartData,
//     setUpdatedRangeData,
//   };
// };

// export default useTimeRange;
