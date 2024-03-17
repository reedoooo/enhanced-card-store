import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from '../../context';
import { z } from 'zod';
import RCZodForm from '../forms/reusable/RCZodForm';

const deckSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  tags: z.array(z.string()),
  color: z.enum(['red', 'blue', 'green', 'yellow']),
});

const DeckEditPanel = ({ selectedDeck }) => {
  const { formMethods, setFormSchema } = useFormContext();
  const [tags, setTags] = useState(selectedDeck?.tags || []);

  useEffect(() => {
    setFormSchema('updateDeckForm');
    if (selectedDeck) {
      formMethods.reset({
        ...selectedDeck,
        tags: selectedDeck.tags.join(', '),
      });
    }
  }, [selectedDeck, setFormSchema, formMethods]);

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      formMethods.setValue('tags', [...tags, tag].join(', '));
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
    formMethods.setValue('tags', updatedTags.join(', '));
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    {
      name: 'tags',
      label: 'Tags',
      type: 'chips',
      chipData: tags,
      onAddChip: handleAddTag,
      onDeleteChip: handleDeleteTag,
    },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      options: [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
      ],
    },
  ];

  return (
    <RCZodForm
      schema={deckSchema}
      schemaName="updateDeckForm"
      fields={fields}
      buttonLabel="Save Changes"
      defaultValues={selectedDeck}
      onSubmit={() => formMethods.submitForm()}
      startIcon={<SaveIcon />}
      additionalButtons={[
        {
          label: 'Delete Deck',
          startIcon: <DeleteIcon />,
          onClick: () => {
            formMethods.setValue('_id', selectedDeck._id);
            formMethods.setValue('delete', true);
            formMethods.submitForm();
          },
          color: 'error',
          variant: 'contained',
        },
      ]}
      formMethods={formMethods}
      formName="updateDeckForm"
    />
  );
};

export default DeckEditPanel;
