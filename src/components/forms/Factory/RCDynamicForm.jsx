/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, InputAdornment, Tooltip } from '@mui/material';
import RCInput from './RCInput';
import { Controller } from 'react-hook-form';
import useRCFormHook from '../../../context/formHooks/useRCFormHook';
import {
  FormBox,
  FormFieldBox,
} from 'layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { useMode } from 'context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getFormFieldHandlers } from '../formsConfig';
import { useFormSubmission } from '../../../context/formHooks/useFormSubmission';
import React, { useEffect, useState } from 'react';
import useBreakpoint from 'context/hooks/useBreakPoint';
import RCLoadingButton from 'layout/REUSABLE_COMPONENTS/RCLOADINGBUTTON';

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
    formState: { isSubmitting },
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
          <RCLoadingButton
            key={optionsForUi.submitButtonLabel}
            type="submit"
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
            // onClick={handleLogout}
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
    </FormBox>
  );
};

export default React.memo(RCDynamicForm);
