/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, InputAdornment } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { RCFieldError } from './RCFieldError';
import RCInput from './RCInput';
import { Controller } from 'react-hook-form';
import useRCFormHook from '../hooks/useRCFormHook';
import {
  FormBox,
  FormFieldBox,
} from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { useCardStore, useMode } from 'context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getFormFieldHandlers } from '../formsConfig';
import { useFormSubmission } from '../hooks/useFormSubmission';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useBreakpoint from 'context/hooks/useBreakPoint';
import ReusableLoadingButton from 'layout/REUSABLE_COMPONENTS/ReusableLoadingButton';

const RCDynamicForm = ({
  formKey,
  inputs = {},
  userInterfaceOptions = {},
  initialData,
  updatedData,
  additonalData,
}) => {
  if (!inputs || typeof inputs !== 'object') {
    console.error('Invalid inputs provided to RCDynamicForm:', inputs);
    return null; // Or some fallback UI
  }
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  const methods = useRCFormHook(formKey);
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting, dirtyFields, isDirty, isValid },
    reset,
  } = methods;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    console.log('MOUNTED', isMounted);
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  const [formData, setFormData] = useState(initialData);
  useEffect(() => {
    setFormData(updatedData || initialData);
    reset(updatedData || initialData); // Reset form with new initial data
  }, [updatedData, initialData, reset]);
  const { onSubmit } = useFormSubmission(getFormFieldHandlers(), formKey);
  const optionsForUi = userInterfaceOptions ? userInterfaceOptions : {};
  return (
    <FormBox
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      theme={theme}
      sx={{
        ...(isMobile && {
          padding: theme.spacing(3),
        }),
        ...userInterfaceOptions.formBoxStyles, // Custom styles for FormBox
      }}
    >
      {Object.entries(inputs).map(([fieldName, fieldConfig]) => (
        <FormFieldBox key={fieldName} theme={theme}>
          <Controller
            theme={theme}
            name={fieldName}
            control={control}
            rules={fieldConfig.rules}
            render={({ field, fieldState: { error } }) => (
              <RCInput
                {...field}
                options={fieldConfig.options || []} // Ensure options are passed for select inputs
                type={fieldConfig.type}
                label={fieldConfig.label}
                placeholder={fieldConfig.placeholder}
                error={!!error}
                name={fieldConfig.name}
                context={fieldConfig.context}
                // helperText={error ? <RCFieldError name={fieldName} /> : null}
                initialValue={fieldConfig.initialValue}
                helperText={error ? error.message : null}
                // chipProps={{
                //   onDelete: (chip) => handleDeleteChip(chip),
                //   onAdd: (chip) => handleAddChip(chip),
                //   onkeydown: (event) => {
                //     if (event.key === 'Enter') {
                //       handleAddChip(event.target.value);
                //     }
                //   },
                // }}
                // onSelectChange={

                // }
                InputProps={
                  (fieldConfig.icon
                    ? {
                        endAdornment: (
                          <InputAdornment position="end" fontSize={'1.25rem'}>
                            {fieldConfig.icon}
                          </InputAdornment>
                        ),
                      }
                    : null) || undefined
                }
              />
            )}
          />
          {errors[fieldName] && (
            <RCFieldError>{errors[fieldName]?.message}</RCFieldError>
          )}
        </FormFieldBox>
      ))}

      {optionsForUi && optionsForUi.submitButton && (
        <ReusableLoadingButton
          type="submit"
          loading={isSubmitting}
          label={optionsForUi.submitButtonLabel}
          startIcon={
            optionsForUi.startIcon ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {optionsForUi.startIcon}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {<AddCircleOutlineIcon />}
              </Box>
            )
          }
          fullWidth
          sx={{
            ...(isMobile && {
              fontSize: '0.75rem', // Adjust button font size for mobile
            }),
          }}
        />
      )}
      {optionsForUi && optionsForUi.deleteButton && (
        <ReusableLoadingButton
          key={optionsForUi.deleteButtonLabel}
          onClick={optionsForUi.deleteActions}
          loading={isSubmitting}
          label={optionsForUi.deleteButtonLabel}
          startIcon={
            optionsForUi.startIcon ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {optionsForUi.startIcon}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {<AddCircleOutlineIcon />}
              </Box>
            )
          }
          // color={button.color}
          variant="warning"
          fullWidth
          sx={{ mt: 2.2, background: theme.palette.error.main }}
        />
      )}
    </FormBox>
  );
};

export default React.memo(RCDynamicForm);
// const [tags, setTags] = useState([]);
// const submitTags = useCallback((newTags) => {
//   const validation = zodSchemas['tags'].safeParse(newTags);
//   if (validation.success) {
//     setTags(newTags);
//     console.log('Tags updated:', newTags); // Or any other logic
//   } else {
//     console.error('Validation failed:', validation.error);
//   }
// }, []);
// useEffect(() => {
//   setFormData(updatedData || initialData);
//   reset(updatedData || initialData);
// }, [updatedData, initialData, reset]);

// useEffect(() => {
//   const subscription = methods.watch((value, { name, type }) => {
//     if (name === 'timeRange') {
//       console.log(`selectedCollection: ${selectedCollection}`);
//       const timeRangeValue = value.timeRange;
//       updateCollectionField(
//         selectedCollection._id,
//         'selectedChartDataKey',
//         timeRangeValue
//       );
//       updateCollectionField(
//         selectedCollection._id,
//         'selectedChartData',
//         selectedCollection.averagedChartData[timeRangeValue]
//       );
//       console.log(
//         `Updated chart data for range: ${timeRangeValue}`,
//         selectedCollection.selectedChartData
//       );
//     }
//     if (name === 'searchTerm') {
//       console.log(`SEARCH TERM: ${value.searchTerm}`);
//       handleRequest(value.searchTerm);
//     }
//     if (name === 'tags') {
//       console.log(`TAGS: ${value.tags}`);
//       submitTags(value.tags);
//       updateDeckField(selectedDeck._id, 'tags', value.tags);
//     }
//   });
//   return () => {
//     subscription.unsubscribe();
//   };
// }, [methods.watch, updateCollectionField, handleRequest, submitTags]);
// const optionsForUi = userInterfaceOptions ? userInterfaceOptions : {};
