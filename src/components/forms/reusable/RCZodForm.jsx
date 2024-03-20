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
  initialValues,
  additionalData,
}) => {
  const { theme } = useMode();
  const {
    formMethods,
    onSubmit,
    handleChange,
    setFormSchema,
    currentForm,
    formState: { errors, isSubmitting },
    // getValues,
    handleSearchTermChange,
  } = useFormContext();

  // useEffect(() => {
  //   setFormSchema(schemaName);
  // }, [setFormSchema, schemaName]);
  // useEffect(() => {
  //   setFormSchema(schemaName);
  //   if (initialValues) {
  //     console.log('initialValues:', initialValues);
  //     formMethods.reset(initialValues);
  //   }
  // }, [setFormSchema, schemaName, formMethods, initialValues]);
  useEffect(() => {
    setFormSchema(schemaName);
    // When currentForm or schemaName changes, reset form with new initialValues or empty values
    formMethods.reset(initialValues || {});
  }, [setFormSchema, schemaName, formMethods, initialValues, currentForm]);
  const onFormSubmit = (data) => {
    onSubmit(data, additionalData);
  };

  const renderField = (field) => {
    const isSearchForm =
      schemaName === 'searchForm' && field.name === 'searchTerm';

    const onChange = isSearchForm ? handleChange : undefined;

    if (field.type === 'select') {
      return (
        <FormFieldBox key={field.name} theme={theme}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              {...formMethods.register(field.name)}
              label={field.label}
              value={formMethods.getValues(field.name) || ''} // Manage value explicitly
              // defaultValues={initialValues ? initialValues[field.name] : ''}
              // value={initialValues ? initialValues[field.name] : ''}
              // onChange={onChange}
              // options={field.options}
              // defaultValue={initialValues ? initialValues[field.name] : ''}
              sx={{
                width: '100%',
                marginBottom: 2,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.chartTheme.redAccent.default,
                },
                '& .MuiSvgIcon-root': {
                  color: theme.palette.text.primary,
                },
              }}
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
            label={
              initialValues && initialValues[field.name] ? '' : field.label
            }
            name={field.name}
            // value={initialValues ? initialValues[field.name] : ''}
            type={field.type || 'text'}
            register={formMethods.register}
            errors={errors}
            error={errors[field.name]?.message}
            value={
              initialValues
                ? initialValues[field.name]
                : formMethods.getValues(field.name)
            }
            required={field.required || false}
            initialValue={initialValues ? initialValues[field.name] : ''}
            // onChange={handleChange}
            onChange={onChange}
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
            // color={button.color}
            variant="warning"
            fullWidth
            sx={{ mt: 2, background: theme.palette.error.main }}
          />
        ))}
    </FormBox>
  );
};

export default RCZodForm;
