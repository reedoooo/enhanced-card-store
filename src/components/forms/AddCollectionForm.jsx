import React from 'react';
import { Box } from '@mui/material';
import FormField from './reusable/FormField';
import { LoadingButton } from '@mui/lab';
import { useFormContext, useMode } from '../../context';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchemas,
  getDefaultValuesFromSchema,
} from '../../context/UTILITIES_CONTEXT/FormContext/schemas';
import {
  FormBox,
  FormFieldBox,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import ReusableLoadingButton from '../buttons/other/ReusableLoadingButton';

const AddCollectionForm = ({ showSnackbar }) => {
  const formId = 'addCollectionForm';
  const { onSubmit } = useFormContext();
  const { theme } = useMode();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchemas.addCollectionForm),
    defaultValues: getDefaultValuesFromSchema(formSchemas.addCollectionForm),
  });

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      multiline: false,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      multiline: true,
      rows: 4,
    },
  ];

  const onFormSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      onSubmit(data, formId);
      showSnackbar(
        {
          title: 'Success',
          description: "You've successfully added a new collection.",
        },
        'success'
      ); // Adjust message as needed
    } catch (error) {
      // On error:
      showSnackbar(
        {
          title: 'Error',
          description: 'Failed to add collection. Please try again.',
        },
        'error'
      ); // Adjust message as needed
    }
  };
  return (
    <FormBox
      component={'form'}
      theme={theme}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {fields.map((field, index) => (
        <FormFieldBox key={index} theme={theme}>
          <FormField
            name={field.name}
            label={field.label}
            type={field.type}
            register={register}
            errors={errors}
            required={field.required}
            multiline={field.multiline}
            rows={field.rows}
          />
        </FormFieldBox>
      ))}
      <ReusableLoadingButton
        loading={isSubmitting}
        label="Create Collection"
        fullWidth
        sx={{
          mt: 2, // Adjust spacing as needed
          background: theme.palette.backgroundG.light,
          borderColor: theme.palette.backgroundG.light,
          borderWidth: 2,
          '&:hover': { background: theme.palette.backgroundG.default },
          '&:focus': { background: theme.palette.backgroundG.default },
        }}
      />
    </FormBox>
  );
};

export default withDynamicSnackbar(AddCollectionForm);
