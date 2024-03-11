import React, { useEffect } from 'react';
import { useFormContext, useMode } from '../../context';
import FormField from '../reusable/FormField';
import { Button, Paper, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import { FormBox } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

const UpdateDeckForm = ({ selectedDeck, showSnackbar }) => {
  const { theme } = useMode();
  const { formStates, onSubmit } = useFormContext();
  const formId = 'updateDeckForm'; // Assuming this is the formId for updating decks

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = formStates[formId];

  useEffect(() => {
    if (selectedDeck) {
      reset(selectedDeck);
    }
  }, [selectedDeck, reset]);

  const onFormSubmit = async (data) => {
    try {
      await onSubmit({ ...data, _id: selectedDeck._id }, formId);
      showSnackbar(
        {
          title: 'Success',
          description: 'Deck updated successfully.',
        },
        'success'
      );
    } catch (error) {
      showSnackbar(
        {
          title: 'Error',
          description: 'Failed to update deck. Please try again.',
        },
        'error'
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6">Update Deck</Typography>
      <FormBox
        component={'form'}
        onSubmit={handleSubmit(onFormSubmit)}
        theme={theme}
      >
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            startIcon={<SaveIcon />}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            Save Changes
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            onClick={() =>
              onSubmit({ _id: selectedDeck._id, delete: true }, formId)
            }
            disabled={!selectedDeck || isSubmitting}
          >
            Delete Deck
          </Button>
        </Box>
      </FormBox>
    </Paper>
  );
};
export default withDynamicSnackbar(UpdateDeckForm); // Wrap DeckEditPanel with withDynamicSnackbar HOC
