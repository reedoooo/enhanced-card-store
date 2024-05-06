/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';

import { Box, InputAdornment, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Controller } from 'react-hook-form';
import {
  FormBox,
  FormFieldBox,
} from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import {
  useBreakpoint,
  useFormSubmission,
  useRCFormHook,
  useMode,
} from 'context';
import { getFormFieldHandlers } from 'data';
import { RCInput, RCLoadingButton } from '..';

const RCDynamicForm = ({
  formKey,
  inputs = {},
  userInterfaceOptions = {},
  initialData,
  updatedData,
  additonalData,
}) => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  const methods = useRCFormHook(formKey, initialData);
  const { onSubmit } = useFormSubmission(getFormFieldHandlers(), formKey);
  // State and Effects
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    setFormData(initialData);
    methods.reset(initialData); // Reset form with new initial data
  }, [initialData, methods]);

  const optionsForUi = userInterfaceOptions ? userInterfaceOptions : {};

  if (!inputs || typeof inputs !== 'object') {
    console.error('Invalid inputs provided to RCDynamicForm:', inputs);
    return null; // Or some fallback UI
  }
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;
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
                name={fieldConfig.name}
                context={fieldConfig.context}
                error={!!error}
                helperText={error?.message}
                initialValue={formData ? formData : fieldConfig.initialValue}
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
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        {optionsForUi && optionsForUi.submitButton && (
          <Tooltip title={optionsForUi.submitButtonLabel} placement="top">
            <RCLoadingButton
              key={optionsForUi.submitButtonLabel}
              type="submit"
              // onClick={
              //   optionsForUi?.updateActions?.handleSubmit
              //     ? optionsForUi?.updateActions?.handleSubmit
              //     : handleSubmit(onSubmit)
              // }
              loading={isSubmitting}
              withContainer={false}
              fullWidth={true}
              circular={true}
              icon={
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
              variant="holo"
              color="info"
              label={optionsForUi.submitButtonLabel}
              size="large"
            />
          </Tooltip>
        )}
        {optionsForUi && optionsForUi.deleteButton && (
          <Tooltip title={optionsForUi.deleteButtonLabel} placement="top">
            <RCLoadingButton
              key={optionsForUi.deleteButtonLabel}
              type="submit"
              onClick={optionsForUi.deleteActions.handleDelete}
              loading={isSubmitting}
              withContainer={false}
              fullWidth={true}
              circular={true}
              icon={
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
              variant="holo"
              color="error"
              label={optionsForUi.deleteButtonLabel}
              size="large"
            />
          </Tooltip>
        )}
      </Box>
    </FormBox>
  );
};

export default React.memo(RCDynamicForm);
