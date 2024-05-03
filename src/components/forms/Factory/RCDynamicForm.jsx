/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, InputAdornment } from '@mui/material';
import { useMediaQuery } from '@mui/material';
// import { RCFieldError } from './RCFieldError';
import RCInput from './RCInput';
import { Controller } from 'react-hook-form';
import useRCFormHook from '../hooks/useRCFormHook';
import {
  FormBox,
  FormFieldBox,
} from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { useMode } from 'context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getFormFieldHandlers } from '../formsConfig';
import { useFormSubmission } from '../hooks/useFormSubmission';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useBreakpoint from 'context/hooks/useBreakPoint';
import ReusableLoadingButton from 'layout/REUSABLE_COMPONENTS/ReusableLoadingButton';
import { Tooltip } from '@mui/joy';

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
            type={fieldConfig.type}
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
                errorMessage={error?.message}
                helperText={error?.message}
                initialValue={fieldConfig.initialValue}
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
        </FormFieldBox>
      ))}

      {optionsForUi && optionsForUi.submitButton && (
        <Tooltip title={optionsForUi.submitButtonLabel} placement="top">
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
        </Tooltip>
      )}
      {optionsForUi && optionsForUi.deleteButton && (
        <Tooltip title={optionsForUi.deleteButtonLabel} placement="top">
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
            variant="warning"
            fullWidth
            sx={{ mt: 2.2, background: theme.palette.error.main }}
          />
        </Tooltip>
      )}
    </FormBox>
  );
};

export default React.memo(RCDynamicForm);
