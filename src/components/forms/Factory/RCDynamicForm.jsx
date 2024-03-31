import { FormLabel, Box, InputAdornment } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { RCFieldError } from './RCFieldError';
import RCInput from './RCInput';
import { Controller } from 'react-hook-form';
import useRCFormHook from './useRCFormHook';
import ReusableLoadingButton from '../../buttons/other/ReusableLoadingButton';
import {
  FormBox,
  FormFieldBox,
} from '../../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import { useMode } from '../../../context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { zodSchemas, getFormFieldHandlers } from '../formsConfig';
import { useFormSubmission } from '../hooks/useFormSubmission';

const RCDynamicForm = ({ formKey, inputs, options, initialData }) => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useRCFormHook(formKey, zodSchemas, initialData);
  const { onSubmit } = useFormSubmission(getFormFieldHandlers(), formKey);
  return (
    <FormBox
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      theme={theme}
      sx={{
        ...(isMobile && {
          padding: theme.spacing(3), // Reduce padding on mobile
        }),
      }}
    >
      {Object.entries(inputs).map(([fieldName, fieldProps]) => (
        <FormFieldBox key={fieldName} theme={theme}>
          {/* <section key={fieldName}> */}
          {/* <FormLabel>{fieldProps.label}</FormLabel> */}
          <Controller
            name={fieldName}
            control={control}
            rules={fieldProps.rules}
            // defaultValue={fieldProps.defaultValue}
            render={({ field }) => (
              <RCInput
                {...field}
                type={fieldProps.type}
                label={fieldProps.label}
                InputProps={
                  fieldProps.icon
                    ? {
                        endAdornment: (
                          <InputAdornment position="end" fontSize={'1.25rem'}>
                            {fieldProps.icon}
                          </InputAdornment>
                        ),
                      }
                    : null
                }
              />
            )}
          />
          {errors[fieldName] && (
            <RCFieldError>{errors[fieldName].message}</RCFieldError>
          )}
          {/* </section> */}
        </FormFieldBox>
      ))}
      <ReusableLoadingButton
        type="submit"
        loading={isSubmitting}
        label={'Submit'}
        startIcon={
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {<AddCircleOutlineIcon />}
          </Box>
        }
        fullWidth
        sx={{
          ...(isMobile && {
            fontSize: '0.75rem', // Adjust button font size for mobile
          }),
        }}
      />

      {options &&
        options?.map((button, index) => (
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

export default RCDynamicForm;
