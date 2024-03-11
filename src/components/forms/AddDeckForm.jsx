import React from 'react';
import { useFormContext } from '../../context';
import FormField from '../reusable/FormField';
import { Button, Paper, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';

const AddDeckForm = ({ showSnackbar }) => {
  const { formStates, onSubmit } = useFormContext();
  const formId = 'addDeckForm'; // Assuming this is the formId for creating decks

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formStates[formId];

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data, formId);
      showSnackbar(
        {
          title: 'Success',
          description: 'Deck created successfully.',
        },
        'success'
      );
    } catch (error) {
      showSnackbar(
        {
          title: 'Error',
          description: 'Failed to create deck. Please try again.',
        },
        'error'
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6">Create Deck</Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormField
          label="Name"
          name="name"
          register={register}
          errors={errors}
          required
        />
        <FormField
          label="Description"
          name="description"
          register={register}
          errors={errors}
          multiline
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            startIcon={<SaveIcon />}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            Create Deck
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
export default withDynamicSnackbar(AddDeckForm); // Wrap DeckEditPanel with withDynamicSnackbar HOC
