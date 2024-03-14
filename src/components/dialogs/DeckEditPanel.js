import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDeckStore, useFormContext, useMode } from '../../context';
import useSnackBar from '../../context/hooks/useSnackBar';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormBox } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import FormField from '../forms/reusable/FormField';
const DeckEditPanel = ({ selectedDeck, showSnackbar }) => {
  const { theme } = useMode();
  const {
    formMethods,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setFormSchema,
    onSubmit,
  } = useFormContext();
  const [newTag, setNewTag] = useState('');
  const tags = watch('tags', selectedDeck?.tags || []);
  const color = watch('color');

  useEffect(() => {
    setFormSchema('updateDeckForm');
  }, [setFormSchema]);

  useEffect(() => {
    if (selectedDeck) {
      reset({
        name: selectedDeck.name,
        description: selectedDeck.description,
        tags: selectedDeck.tags || [],
        color: selectedDeck.color || 'red',
      });
    }
  }, [selectedDeck, reset]);

  const handleAddNewTag = (newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setValue('tags', [...tags, newTag.trim()]);
    }
  };
  const handleTagDelete = (tagToDelete) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToDelete)
    );
  };
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      showSnackbar({
        message: 'Deck updated successfully',
        variant: 'success',
      });
    } catch (error) {
      showSnackbar({
        message: error.message || 'An error occurred while updating the deck.',
        variant: 'error',
      });
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        backgroundColor: theme.palette.background.light,
      }}
    >
      <Typography variant="h6">Deck Editor</Typography>
      <FormBox
        component={'form'}
        theme={theme}
        onSubmit={handleSubmit(handleFormSubmit)}
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

        <Box sx={{ my: 2 }}>
          {tags &&
            tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleTagDelete(tag)}
              />
            ))}
          <FormField
            label="New Tag"
            name="tags"
            register={register}
            errors={errors}
            size="small"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onBlur={handleAddNewTag}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddNewTag();
              }
            }}
          />
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Color</InputLabel>
          <Select
            {...register('color')}
            value={color || ''}
            label="Color"
            defaultValue=""
          >
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            mt: 2,
          }}
        >
          <Button
            startIcon={<SaveIcon />}
            type="submit"
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Save Changes
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            onClick={
              selectedDeck
                ? () =>
                    onSubmit({
                      ...watch(),
                      _id: selectedDeck._id,
                      delete: true,
                    })
                : undefined
            }
            sx={{ flexGrow: 1 }}
          >
            Delete Deck
          </Button>
        </Box>
      </FormBox>
    </Paper>
  );
};

export default withDynamicSnackbar(DeckEditPanel);
