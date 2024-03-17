import React from 'react';
import RCZodForm from './RCZodForm';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from '../../context';

// Assume the schema is defined elsewhere and imported here
// import { updateDeckFormSchema } from './yourSchemaDefinitions';

const updateDeckFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    icon: null, // No icons used for these fields
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    multiline: true,
    rows: 4,
    icon: null,
  },
];

const UpdateDeckForm = ({ selectedDeck }) => {
  const { onSubmit } = useFormContext(); // Assuming useFormContext provides onSubmit

  // Placeholder for the submission logic within the component or from props
  const handleSubmit = (data) => {
    console.log('Submitting update deck data:', data);
    onSubmit(data, 'updateDeckForm'); // This should align with your context action
  };

  // Placeholder for the deletion logic within the component or from props
  const handleDelete = () => {
    console.log('Deleting deck:', selectedDeck._id);
    // Here you would call a context function or similar to delete the deck
    onSubmit({ _id: selectedDeck._id, delete: true }, 'updateDeckForm');
  };

  return (
    <RCZodForm
      schemaName="updateDeckForm" // This should match the schema name in your context
      fields={updateDeckFields}
      onSubmit={handleSubmit}
      buttonLabel="Save Changes"
      startIcon={<SaveIcon />}
      additionalButtons={[
        {
          label: 'Delete Deck',
          onClick: handleDelete,
          startIcon: <DeleteIcon />,
          color: 'error',
          variant: 'contained',
          disabled: !selectedDeck,
        },
      ]}
      defaultValues={selectedDeck} // Assuming this prop is structured correctly for the form
    />
  );
};

export default UpdateDeckForm;
