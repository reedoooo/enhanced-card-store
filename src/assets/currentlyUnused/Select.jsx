// import React from 'react';
// import { Select, MenuItem } from '@mui/material';
// import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
// import { useMode } from '../../../context';
// import { FormControl, InputLabel } from '@mui/material';
// import { Controller } from 'react-hook-form';
// import SelectComponent from '../reusable/Select';
// import { StyledChartBox } from '../../../pages/pageStyles/StyledComponents';

// const SelectorComponent = ({
//   name,
//   label,
//   options,
//   control,
//   errors,
//   theme,
//   onSubmit,
// }) => {
//   return (
//     <StyledChartBox theme={theme} component="form" onSubmit={onSubmit}>
//       <FormControl fullWidth variant="outlined" error={!!errors[name]}>
//         <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
//         <Controller
//           name={name}
//           control={control}
//           render={({ field }) => (
//             <Select
//               ref={ref}
//               value={safeValue}
//               onChange={onChange}
//               fullWidth={fullWidth}
//               displayEmpty
// sx={{
//   width: '100%',
//   marginBottom: 2,
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.primary,
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: theme.palette.chartTheme.redAccent.default,
//   },
//   '& .MuiSvgIcon-root': {
//     color: theme.palette.text.primary,
//   },
// }}
//             >
//               {options.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           )}
//         />
//       </FormControl>
//     </StyledChartBox>
//   );
// };

// export default SelectorComponent;
