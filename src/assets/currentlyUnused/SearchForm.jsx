// import React, { useEffect } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { formFields, getFormFieldHandlers, zodSchemas } from './formsConfig';
// import { Box, InputAdornment, useMediaQuery } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import {
//   FormBox,
//   FormFieldBox,
// } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
// import { useCardStore, useMode } from '../../context';
// import RCInput from './Factory/RCInput';
// import useRCFormHook from './hooks/useRCFormHook';
// import { useFormSubmission } from './hooks/useFormSubmission';
// import ReusableLoadingButton from '../buttons/other/ReusableLoadingButton';
// const SearchForm = () => {
//   const { theme } = useMode();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const methods = useRCFormHook('searchForm', zodSchemas, formFields, {});
//   const { control, handleSubmit, watch, reset } = methods;
//   const searchTerm = watch('searchTerm');
//   const { onSubmit, isSubmitting } = useFormSubmission(
//     getFormFieldHandlers(),
//     'searchForm'
//   );
//   const { handleRequest } = useCardStore();
//   useEffect(() => {
//     console.log('Search term changed:', searchTerm);
//     if (searchTerm) {
//       handleRequest(searchTerm);
//     }
//   }, [searchTerm, handleRequest]);

//   return (
//     <FormBox
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       theme={theme}
//       sx={{
//         ...(isMobile && {
//           padding: theme.spacing(3),
//         }),
//       }}
//     >
//       <FormFieldBox theme={theme}>
//         <Controller
//           name="searchTerm"
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <RCInput
//               {...field}
//               type="text"
//               placeholder="Search for cards..."
//               InputProps={
//                 field.icon ? (
//                   {
//                     endAdornment: (
//                       <InputAdornment position="end" fontSize={'1.25rem'}>
//                         {field.icon}
//                       </InputAdornment>
//                     ),
//                   }
//                 ) : (
//                   <SearchIcon />
//                 )
//               }
//             />
//           )}
//         />
//       </FormFieldBox>
//       <ReusableLoadingButton
//         type="submit"
//         loading={isSubmitting}
//         label={'Submit'}
//         startIcon={
//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             {<AddCircleOutlineIcon />}
//           </Box>
//         }
//         fullWidth
//         sx={{
//           ...(isMobile && {
//             fontSize: '0.75rem', // Adjust button font size for mobile
//           }),
//         }}
//       />
//     </FormBox>
//   );
// };

// export default SearchForm;
