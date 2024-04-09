// import React, { useEffect } from 'react';
// import {
//   Box,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   useMediaQuery,
// } from '@mui/material';
// import FormField from './FormField';
// import ReusableLoadingButton from '../../buttons/other/ReusableLoadingButton';
// import { useFormContext, useMode } from '../../../context';
// import {
//   FormBox,
//   FormFieldBox,
// } from '../../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

// const RCZodForm = ({
//   fields,
//   buttonLabel,
//   startIcon,
//   schemaName,
//   additionalButtons,
//   initialValues,
//   additionalData,
// }) => {
//   const { theme } = useMode();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const {
//     formMethods,
//     onSubmit,
//     handleChange,
//     setFormSchema,
//     currentForm,
//     currentFormSchema,
//     formState: { errors, isSubmitting },
//   } = useFormContext();

//   // const onFormSubmit = (data) => {
//   //   onSubmit(data, additionalData);
//   // };
//   useEffect(() => {
//     if (initialValues) {
//       Object.keys(initialValues).forEach((key) => {
//         formMethods.setValue(key, initialValues[key]);
//       });
//     }
//   }, [initialValues]);
//   const renderField = (field) => {
//     const isSearchForm =
//       schemaName === 'searchForm' && field.name === 'searchTerm';

//     const onChange = isSearchForm ? handleChange : undefined;

//     if (field.type === 'select') {
//       return (
//         <FormFieldBox key={field.name} theme={theme}>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>{field.label}</InputLabel>
//             <Select
//               {...formMethods.register(field.name)}
//               label={field.label}
//               value={formMethods.getValues(field.name) || ''} // Manage value explicitly
//               sx={{
//                 width: '100%',
//                 marginBottom: 2,
//                 backgroundColor: theme.palette.background.paper,
//                 color: theme.palette.text.primary,
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: theme.palette.chartTheme.redAccent.default,
//                 },
//                 '& .MuiSvgIcon-root': {
//                   color: theme.palette.text.primary,
//                 },
//                 ...(isMobile && {
//                   fontSize: '0.875rem', // Adjust font size for mobile
//                 }),
//               }}
//             >
//               {field?.options?.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </FormFieldBox>
//       );
//     } else if (field.type === 'chips') {
//       return (
//         <FormFieldBox key={field.name} theme={theme}>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//             {field?.values?.map((value, index) => (
//               <Chip
//                 key={index}
//                 label={value}
//                 onDelete={() => field.onDelete(value)}
//               />
//             ))}
//           </Box>
//         </FormFieldBox>
//       );
//     } else {
//       return (
//         <FormFieldBox key={field.name} theme={theme}>
//           <FormField
//             label={
//               initialValues && initialValues[field.name] ? '' : field.label
//             }
//             name={field.name}
//             register={formMethods.register}
//             errors={errors}
//             error={!!errors[field?.name]} // Convert any truthy/falsy value to a strict boolean
//             helperText={errors[field?.name]?.message} // Presumably display the actual error message
//             type={field.type || 'text'}
//             value={
//               initialValues
//                 ? initialValues[field.name]
//                 : formMethods.getValues(field.name)
//             }
//             required={field.required || false}
//             initialValue={initialValues ? initialValues[field.name] : ''}
//             // onChange={handleChange}
//             onChange={onChange}
//             // defaultValue={getValues(field.name)}
//             // onChange={(e) => formMethods.handleChange(e.target.value)}
//             InputProps={
//               field.icon
//                 ? {
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         {field.icon}
//                       </InputAdornment>
//                     ),
//                   }
//                 : null
//             }
//             multiline={field.multiline}
//             rows={field.rows}
//           />
//         </FormFieldBox>
//       );
//     }
//   };

//   return (
//     <FormBox
//       component="form"
//       onSubmit={formMethods.handleSubmit(onSubmit)}
//       theme={theme}
//       sx={{
//         ...(isMobile && {
//           padding: theme.spacing(3), // Reduce padding on mobile
//         }),
//       }}
//     >
//       {fields?.map(renderField)}
//       <ReusableLoadingButton
//         type="submit"
//         loading={isSubmitting}
//         label={buttonLabel}
//         onClick={formMethods.handleSubmit(onSubmit)}
//         startIcon={
//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             {startIcon}
//           </Box>
//         }
//         fullWidth
//         sx={{
//           ...(isMobile && {
//             fontSize: '0.75rem', // Adjust button font size for mobile
//           }),
//         }}
//       />

//       {additionalButtons &&
//         additionalButtons?.map((button, index) => (
//           <ReusableLoadingButton
//             key={index}
//             onClick={button.onClick}
//             loading={isSubmitting}
//             label={button.label}
//             startIcon={button.startIcon}
//             // color={button.color}
//             variant="warning"
//             fullWidth
//             sx={{ mt: 2, background: theme.palette.error.main }}
//           />
//         ))}
//     </FormBox>
//   );
// };

// export default RCZodForm;
