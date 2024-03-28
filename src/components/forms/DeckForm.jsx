import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from '../../context';
import RCZodForm from './reusable/RCZodForm';

const DeckForm = ({ actionType, deckData }) => {
  const { onSubmit, setFormSchema, formMethods } = useFormContext();
  const isUpdateMode = actionType === 'update';
  const [tags, setTags] = useState(deckData?.tags || []);

  useEffect(() => {
    setFormSchema('updateDeckForm');
    if (deckData) {
      console.log('deckData:', deckData);
      formMethods.reset({
        ...deckData,
        tags: deckData?.tags?.join(', '),
        color: deckData?.color || 'red',
      });
    }
  }, [deckData, setFormSchema, formMethods]);

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
  const updateDeckFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      value: '',
      icon: null,
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      value: '',
      multiline: true,
      rows: 4,
      icon: null,
      required: false,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'chips',
      value: tags.join(', '),
      chipData: tags,
      icon: null,
      onAddChip: handleAddTag,
      onDeleteChip: handleDeleteTag,
      required: false,
    },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      icon: null,
      required: false,
      options: [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'purple', label: 'Purple' },
        { value: 'pink', label: 'Pink' },
        { value: 'orange', label: 'Orange' },
        { value: 'teal', label: 'Teal' },
      ],
    },
  ];

  const addDeckFields = [
    { name: 'name', label: 'Name', type: 'text', icon: null, required: true },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      multiline: true,
      rows: 4,
      icon: null,
      required: false,
    },
  ];

  const formId = isUpdateMode ? 'updateDeckForm' : 'addDeckForm';
  const deckFields = isUpdateMode ? updateDeckFields : addDeckFields;

  React.useEffect(() => {
    if (!isUpdateMode) {
      setFormSchema(formId);
    }
  }, [setFormSchema, formId, isUpdateMode]);

  const handleSubmit = (data) => {
    if (isUpdateMode) {
      console.log('Submitting update deck data:', data);
      onSubmit(data);
    } else {
      console.log('Add Deck Data:', data);
      onSubmit(data);
    }
  };

  const handleDelete = () => {
    if (isUpdateMode) {
      console.log('Deleting deck:', deckData._id);
      onSubmit({ _id: deckData._id, delete: true }, formId);
    }
  };

  return (
    <RCZodForm
      schemaName={formId}
      // fields={fields}
      fields={
        actionType === 'add'
          ? deckFields
          : deckFields.map((field) => ({
              ...field,
              value: deckData?.[field.name],
            }))
      }
      buttonLabel={isUpdateMode ? 'Save Changes' : 'Create Deck'}
      startIcon={<SaveIcon />}
      initialValues={isUpdateMode ? deckData : {}}
      additionalData={{
        deckId: deckData ? deckData?._id : null,
      }}
      additionalButtons={
        isUpdateMode
          ? [
              {
                label: 'Delete Deck',
                onClick: handleDelete,
                startIcon: <DeleteIcon />,
                color: 'error',
                variant: 'contained',
                disabled: !deckData,
              },
            ]
          : []
      }
      defaultValues={isUpdateMode ? deckData : {}}
    />
  );
};

export default DeckForm;
