import { useMemo } from 'react';
import { useFormContext, useMode } from '../../../context';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import { StyledChartBox } from '../../../pages/pageStyles/StyledComponents';
import { FormControl, InputLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import SelectComponent from '../reusable/Select';
import useTimeRange from './useTimeRange';

const TimeRangeSelector = ({ showSnackbar }) => {
  const { theme } = useMode();
  const { timeRangeOptions, onFormSubmit, control, errors } =
    useTimeRange(showSnackbar);

  return (
    <StyledChartBox
      theme={theme}
      component="form"
      onSubmit={onFormSubmit}
      sx={{ width: '100%' }}
    >
      <FormControl
        fullWidth
        variant="outlined"
        error={!!errors.timeRange}
        sx={{ width: '100%' }}
      >
        <InputLabel id="time-range-select-label">Time Range</InputLabel>
        <Controller
          name="timeRange"
          control={control}
          render={({ field }) => (
            <SelectComponent {...field} options={timeRangeOptions} />
          )}
        />
      </FormControl>
    </StyledChartBox>
  );
};
export default TimeRangeSelector;

// // const TimeRangeSelector = ({ showSnackbar }) => {
// //   const { theme } = useMode();
// //   const { formMethods, onSubmit } = useFormContext();
// //   const { selectedCollection } = useSelectedCollection();
// //   const averagedChartData = selectedCollection?.averagedChartData;

// //   const timeRangeOptions = useMemo(() => {
// //     const options = [];
// //     averagedChartData?.forEach((value, key) => {
// //       options.push({
// //         value: key,
// //         label: key.toUpperCase(),
// //       });
// //     });
// //     return options;
// //   }, [averagedChartData]);

// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //   } = formMethods;

// //   const onFormSubmit = (data) => {
// //     onSubmit(data, 'timeRangeSelector')
// //       .then(() => {
// //         showSnackbar(
// //           {
// //             title: 'Success',
// //             description: `Now viewing chart data for ${data?.timeRange}`,
// //           },
// //           'success'
// //         );
// //       })
// //       .catch((error) => {
// //         showSnackbar(
// //           {
// //             title: 'Error',
// //             description: `Failed to view chart data for ${data?.timeRange}: ${error}`,
// //           },
// //           'error'
// //         );
// //       });
// //   };

// //   return (
// //     <StyledChartBox
// //       theme={theme}
// //       component="form"
// //       onSubmit={handleSubmit(onFormSubmit)}
// //       sx={{ width: '100%' }}
// //     >
// //       <FormControl
// //         sx={{ width: '100%' }}
// //         fullWidth
// //         variant="outlined"
// //         error={!!errors?.timeRange}
// //       >
// //         <InputLabel id="time-range-select-label">Time Range</InputLabel>
// //         <Controller
// //           name="timeRange"
// //           control={control}
// //           render={({ field }) => (
// //             <SelectComponent {...field} options={timeRangeOptions} />
// //           )}
// //         />
// //       </FormControl>
// //     </StyledChartBox>
// //   );
// // };

// // export default TimeRangeSelector;
// // import React, { useMemo } from 'react';
// // import { useFormContext, Controller } from 'react-hook-form';
// // import { FormControl, InputLabel } from '@mui/material';
// // import { useMode } from '../../../../context';
// // import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// // import SelectComponent from '../../../REUSABLE_COMPONENTS/SelectComponent';
// // import StyledChartBox from '../../../REUSABLE_COMPONENTS/StyledChartBox';

// const TimeRangeSelector = ({ showSnackbar }) => {
//   const { theme } = useMode();
//   const { formMethods, onSubmit } = useFormContext();
//   const { selectedCollection } = useSelectedCollection();
//   const averagedChartData = selectedCollection?.averagedChartData;

//   // Convert the Map to an array of options for the select component
//   const timeRangeOptions = useMemo(() => {
//     return Array.from(averagedChartData?.entries() || []).map(
//       ([key, value]) => ({
//         value: key,
//         label: value.name.toUpperCase(),
//       })
//     );
//   }, [averagedChartData]);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = formMethods;

//   const onFormSubmit = (data) => {
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
//   };

//   return (
//     <StyledChartBox
//       theme={theme}
//       component="form"
//       onSubmit={handleSubmit(onFormSubmit)}
//       sx={{ width: '100%' }}
//     >
//       <FormControl
//         fullWidth
//         variant="outlined"
//         error={!!errors?.timeRange}
//         sx={{ width: '100%' }}
//       >
//         <InputLabel id="time-range-select-label">Time Range</InputLabel>
//         <Controller
//           name="timeRange"
//           control={control}
//           render={({ field }) => (
//             <SelectComponent {...field} options={timeRangeOptions} />
//           )}
//         />
//       </FormControl>
//     </StyledChartBox>
//   );
// };

// export default TimeRangeSelector;
