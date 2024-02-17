import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import FormField from '../reusable/FormField';
import { LoadingButton } from '@mui/lab';
import { useFormContext, useMode } from '../../context';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchemas,
  getDefaultValuesFromSchema,
} from '../../context/UTILITIES_CONTEXT/FormContext/schemas';

const UpdateCollectionForm = ({ showSnackbar, setLoading, collectionData }) => {
  const formId = 'updateCollectionForm';
  const { onSubmit } = useFormContext();
  const { theme } = useMode();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchemas.updateCollectionForm),
    defaultValues:
      collectionData ||
      getDefaultValuesFromSchema(formSchemas.updateCollectionForm),
  });

  // Automatically reset form fields to the passed collection data
  React.useEffect(() => {
    reset(collectionData);
  }, [collectionData, reset]);

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
  ];

  const onFormSubmit = async (data) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

      onSubmit(data, formId, collectionData._id); // Adjust to call the actual update function

      // On success:
      showSnackbar(
        {
          title: 'Success',
          description: "You've successfully updated the collection.",
        },
        'success'
      );
    } catch (error) {
      // On error:
      showSnackbar(
        {
          title: 'Error',
          description: 'Failed to update collection. Please try again.',
        },
        'error'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        margin: 2,
        padding: 2,
      }}
    >
      <Box mb={2}>
        <FormField
          name="name"
          label="Collection Name"
          register={register}
          errors={errors}
          required
        />
      </Box>
      <Box mb={2}>
        <FormField
          name="description"
          label="Collection Description"
          register={register}
          errors={errors}
          required
          multiline
          rows={4}
        />
      </Box>
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isSubmitting}
        fullWidth
      >
        Update Collection
      </LoadingButton>
    </form>
  );
};

export default withDynamicSnackbar(UpdateCollectionForm);
