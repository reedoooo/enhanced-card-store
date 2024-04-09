// import { useMemo } from 'react';
// import { useFormContext, useMode } from '../../../context';
// import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// import { StyledChartBox } from '../../../pages/pageStyles/StyledComponents';
// import { FormControl, InputLabel, Typography } from '@mui/material';
// import { Controller } from 'react-hook-form';
// import SelectComponent from '../../../assets/Select';
// import useTimeRange from './useTimeRange';
// import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

// const TimeRangeSelector = () => {
//   const { theme } = useMode();
//   const { timeRangeOptions, onFormSubmit, control, errors } = useTimeRange();

//   return (
//     <StyledChartBox
//       theme={theme}
//       component="form"
//       onSubmit={onFormSubmit}
//       sx={{ width: '100%' }}
//     >
//       <FormControl
//         fullWidth
//         variant="outlined"
//         error={!!errors.timeRange}
//         sx={{ width: '100%' }}
//       >
//         <InputLabel id="time-range-select-label" sx={{}}>
//           Time Range
//         </InputLabel>
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
