/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';

import { Box, InputAdornment, LinearProgress, Tooltip } from '@mui/material';
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
  useManager,
} from 'context';
import { getFormFieldHandlers, handleValidation } from 'data';
import { RCInput, RCLoadingButton } from '..';
import { handleFieldValidation } from 'data/formsConfig';

const RCDynamicForm = ({
  formKey,
  inputs = {},
  userInterfaceOptions = {},
  initialData,
  updatedData,
  additonalData,
}) => {
  const { theme } = useMode();
  const { status } = useManager();
  const { isMobile } = useBreakpoint();
  // const dataRef = React.useRef(initialData || {});
  const methods = useRCFormHook(formKey);
  const { onSubmit } = useFormSubmission(getFormFieldHandlers(), formKey);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    initialData && console.log('Mounted with initialData:', initialData); // Logging to debug initialData structure
    inputs && console.log('Mounted with inputs:', inputs); // Logging to debug inputs structure
    methods && console.log('Methods:', methods); // Logging to debug methods structure
    methods.getValues() && console.log('Values:', methods.getValues()); // Logging to debug formValues structure
    return () => {
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    }
  }, []);
  // useEffect(() => {
  //   // CHECK SUBMITTING STATUS
  //   console.log('SUBMITTING STATUS:', methods.formState.isSubmitting);
  // }, [methods.formState.isSubmitting]);
  useEffect(() => {
    // CHECK VALIDATION STATUS
    console.log('VALIDATION STATUS:', methods.formState.isValid);
  }, [methods.formState.isValid]);
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
                // field={field}
                options={fieldConfig.options || []} // Ensure options are passed for select inputs
                type={fieldConfig.type}
                label={fieldConfig.label}
                loading={isSubmitting || status === 'loading'}
                placeholder={fieldConfig.placeholder}
                rules={fieldConfig.rules}
                name={fieldConfig.name}
                context={fieldConfig.context}
                error={!!error}
                helperText={error?.message}
                value={field.value}
                initialValue={
                  field.value ? field.value : fieldConfig.defaultValue
                }
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
                // onChange={(e) => {
                //   handleFieldValidation(field, e.target.value);
                //   field.onChange(e.target.value);
                // }}
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
              loading={isSubmitting || status === 'loading'}
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
              // onClick={optionsForUi.deleteActions.handleDelete}
              loading={isSubmitting || status === 'loading'}
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
      {/* {methods.formState.isSubmitting ||
        (status === 'loading' && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="success" />
          </Box>
        ))} */}
    </FormBox>
  );
};

export default React.memo(RCDynamicForm);
