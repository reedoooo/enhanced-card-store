// import React, { useEffect } from 'react';
// import {
//   Box,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
// } from '@mui/material';
// import FormField from './reusable/FormField';
// import ReusableLoadingButton from '../buttons/other/ReusableLoadingButton';
// import { useFormContext, useMode } from '../../context';
// import { FormFieldBox } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

// const RCZodForm = ({
//   fields,
//   buttonLabel,
//   startIcon,
//   schemaName,
//   additionalButtons,
// }) => {
//   const { theme } = useMode();

//   const {
//     formMethods,
//     register,
//     onSubmit,
//     handleChange,
//     handleBlur,
//     // getValues,
//     handleFocus,
//     formStates: { errors, isSubmitting, ...formStates },
//     setFormSchema,
//     // formState: { errors, isSubmitting },
//   } = useFormContext();

//   useEffect(() => {
//     setFormSchema(schemaName);
//   }, [setFormSchema, schemaName]);

//   const onFormSubmit = (data) => {
//     onSubmit(data, schemaName);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       formMethods.handleSubmit((data) => {
//         onSubmit(data);
//       });
//     }
//   };

//   const renderField = (field) => {
//     if (field.type === 'select') {
//       return (
//         <FormFieldBox key={field.name} theme={theme}>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>{field.label}</InputLabel>
//             <Select {...formMethods.register(field.name)} label={field.label}>
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
//             label={field.label}
//             name={field.name}
//             type={field.type || 'text'}
//             register={formMethods.register}
//             errors={errors}
//             error={errors[field.name]?.message}
//             required={field.required || false}
//             onChange={(e) => formMethods.handleChange(e, field.name)}
//             // value={}
//             defaultValue={formMethods.getValues(field.name)}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//             onKeyDown={handleKeyPress}
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
//     <Box
//       component="form"
//       onSubmit={formMethods.handleSubmit(onFormSubmit)}
//       sx={{ width: '100%' }}
//     >
//       {fields?.map(renderField)}
//       <ReusableLoadingButton
//         type="submit"
//         loading={isSubmitting}
//         label={buttonLabel}
//         startIcon={
//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             {startIcon}
//           </Box>
//         }
//         fullWidth
//       />
//       {additionalButtons &&
//         additionalButtons?.map((button, index) => (
//           <ReusableLoadingButton
//             key={index}
//             onClick={button.onClick}
//             loading={isSubmitting}
//             label={button.label}
//             startIcon={button.startIcon}
//             color={button.color}
//             variant="warning"
//             fullWidth
//             sx={{ mt: 2 }}
//           />
//         ))}
//     </Box>
//   );
// };

// export default RCZodForm;
import React, { useEffect } from 'react';
import {
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import FormField from './FormField';
import ReusableLoadingButton from '../../buttons/other/ReusableLoadingButton';
import { useFormContext, useMode } from '../../../context';
import {
  FormBox,
  FormFieldBox,
} from '../../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

const RCZodForm = ({
  fields,
  buttonLabel,
  startIcon,
  schemaName,
  additionalButtons,
}) => {
  const { theme } = useMode();
  const {
    formMethods,
    onSubmit,
    handleChange,
    setFormSchema,
    formState: { errors, isSubmitting },
    // getValues,
    handleSearchTermChange,
  } = useFormContext();

  useEffect(() => {
    setFormSchema(schemaName);
  }, [setFormSchema, schemaName]);

  const onFormSubmit = (data) => {
    onSubmit(data, schemaName);
  };

  const renderField = (field) => {
    const isSearchForm =
      schemaName === 'searchForm' && field.name === 'searchTerm';

    const onChange = isSearchForm ? handleSearchTermChange : undefined;

    if (field.type === 'select') {
      return (
        <FormFieldBox key={field.name} theme={theme}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              {...formMethods.register(field.name)}
              label={field.label}
              defaultValue=""
            >
              {field?.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormFieldBox>
      );
    } else if (field.type === 'chips') {
      return (
        <FormFieldBox key={field.name} theme={theme}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {field?.values?.map((value, index) => (
              <Chip
                key={index}
                label={value}
                onDelete={() => field.onDelete(value)}
              />
            ))}
          </Box>
        </FormFieldBox>
      );
    } else {
      return (
        <FormFieldBox key={field.name} theme={theme}>
          <FormField
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            register={formMethods.register}
            errors={errors}
            error={errors[field.name]?.message}
            required={field.required || false}
            onChange={handleChange}
            // defaultValue={getValues(field.name)}
            // onChange={(e) => formMethods.handleChange(e.target.value)}
            InputProps={
              field.icon
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        {field.icon}
                      </InputAdornment>
                    ),
                  }
                : null
            }
            multiline={field.multiline}
            rows={field.rows}
          />
        </FormFieldBox>
      );
    }
  };

  return (
    <FormBox
      component="form"
      onSubmit={formMethods.handleSubmit(onFormSubmit)}
      theme={theme}
    >
      {fields?.map(renderField)}
      <ReusableLoadingButton
        type="submit"
        loading={isSubmitting}
        label={buttonLabel}
        startIcon={
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {startIcon}
          </Box>
        }
        fullWidth
      />
      {additionalButtons &&
        additionalButtons?.map((button, index) => (
          <ReusableLoadingButton
            key={index}
            onClick={button.onClick}
            loading={isSubmitting}
            label={button.label}
            startIcon={button.startIcon}
            color={button.color}
            variant="warning"
            fullWidth
            sx={{ mt: 2 }}
          />
        ))}
    </FormBox>
  );
};

export default RCZodForm;
