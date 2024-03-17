// import React, { useEffect } from 'react';
// import { useFormContext, useMode } from '../../context';
// import FormField from '../reusable/FormField';
// import { Button, Paper, Typography, Box } from '@mui/material';
// import SaveIcon from '@mui/icons-material/Save';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { FormBox } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

// const UpdateDeckForm = ({ selectedDeck }) => {
//   const { theme } = useMode();
//   const { formStates, onSubmit } = useFormContext();
//   const formId = 'updateDeckForm'; // Assuming this is the formId for updating decks

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = formStates[formId];

//   useEffect(() => {
//     if (selectedDeck) {
//       reset(selectedDeck);
//     }
//   }, [selectedDeck, reset]);

//   const onFormSubmit = async (data) => {
//     try {
//       await onSubmit({ ...data, _id: selectedDeck._id }, formId);
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
//       <Typography variant="h6">Update Deck</Typography>
//       <FormBox
//         component={'form'}
//         onSubmit={handleSubmit(onFormSubmit)}
//         theme={theme}
//       >
//         <FormField
//           label="Name"
//           name="name"
//           register={register}
//           errors={errors}
//           required
//         />
//         <FormField
//           label="Description"
//           name="description"
//           register={register}
//           errors={errors}
//           multiline
//           required
//         />
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//           <Button
//             startIcon={<SaveIcon />}
//             type="submit"
//             variant="contained"
//             disabled={isSubmitting}
//           >
//             Save Changes
//           </Button>
//           <Button
//             startIcon={<DeleteIcon />}
//             variant="contained"
//             color="error"
//             onClick={() =>
//               onSubmit({ _id: selectedDeck._id, delete: true }, formId)
//             }
//             disabled={!selectedDeck || isSubmitting}
//           >
//             Delete Deck
//           </Button>
//         </Box>
//       </FormBox>
//     </Paper>
//   );
// };
// export default UpdateDeckForm;
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
