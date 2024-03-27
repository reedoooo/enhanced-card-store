// import React from 'react';
// import { useFormContext } from '../../context';
// import RCZodForm from './RCZodForm';
// import SaveIcon from '@mui/icons-material/Save';

// const AddDeckForm = () => {
//   const { setFormSchema } = useFormContext();
//   const formId = 'addDeckForm'; // Assuming this is the formId for creating decks
//   const fields = [
//     { name: 'name', label: 'Name', type: 'text', required: true },
//     {
//       name: 'description',
//       label: 'Description',
//       type: 'text',
//       required: true,
//       multiline: true,
//     },
//   ];

//   const handleSubmit = (data) => {
//     console.log('Add Deck Data:', data);
//   };

//   React.useEffect(() => {
//     setFormSchema(formId);
//   }, [setFormSchema, formId]);

//   return (
//     <RCZodForm
//       schemaName={formId}
//       fields={fields}
//       onSubmit={handleSubmit}
//       buttonLabel="Create Deck"
//       startIcon={<SaveIcon />}
//     />
//   );
// };

// export default AddDeckForm;
