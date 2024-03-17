// import React from 'react';
// import { useFormContext } from '../../context';
// import FormField from '../reusable/FormField';
// import { Button, Paper, Typography, Box } from '@mui/material';
// import SaveIcon from '@mui/icons-material/Save';

// const AddDeckForm = ({ showSnackbar }) => {
//   const { formStates, onSubmit } = useFormContext();
//   const formId = 'addDeckForm'; // Assuming this is the formId for creating decks

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = formStates[formId];

//   const onFormSubmit = async (data) => {
//     try {
//       await onSubmit(data, formId);
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
//       <Typography variant="h6">Create Deck</Typography>
//       <form onSubmit={handleSubmit(onFormSubmit)}>
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
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//           <Button
//             startIcon={<SaveIcon />}
//             type="submit"
//             variant="contained"
//             disabled={isSubmitting}
//           >
//             Create Deck
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// };
// export default AddDeckForm;
import React from 'react';
import { useFormContext } from '../../context';
import RCZodForm from './RCZodForm';
import SaveIcon from '@mui/icons-material/Save';

const AddDeckForm = () => {
  const { setFormSchema } = useFormContext();
  const formId = 'addDeckForm'; // Assuming this is the formId for creating decks

  // Fields configuration for AddDeckForm
  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      multiline: true,
    },
  ];

  // This function should be context-aware or passed down as a prop
  const handleSubmit = (data) => {
    console.log('Add Deck Data:', data);
    // Interaction with context or props for form submission
  };

  // Set the schema based on the form ID
  React.useEffect(() => {
    setFormSchema(formId);
  }, [setFormSchema, formId]);

  return (
    <RCZodForm
      schemaName={formId}
      fields={fields}
      onSubmit={handleSubmit}
      buttonLabel="Create Deck"
      startIcon={<SaveIcon />}
    />
  );
};

export default AddDeckForm;
