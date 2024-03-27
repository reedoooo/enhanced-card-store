// import React, { useEffect } from 'react';
// import { useFormContext, useMode } from '../../context';
// import useSnackbarManager from '../../context/hooks/useSnackbarManager';
// import RCZodForm from './reusable/RCZodForm';

// const updateCollectionFields = [
//   {
//     name: 'name',
//     label: 'Name',
//     type: 'text',
//     required: true,
//   },
//   {
//     name: 'description',
//     label: 'Description',
//     type: 'text',
//     required: true,
//     multiline: true,
//     rows: 4,
//   },
// ];

// const UpdateCollectionForm = ({ collectionData }) => {
//   const { setFormSchema, onSubmit } = useFormContext();
//   const { theme } = useMode();
//   const { showSuccess, showError } = useSnackbarManager();

//   useEffect(() => {
//     if (collectionData) {
//       setFormSchema('updateCollectionForm', collectionData);
//     }
//   }, [collectionData, setFormSchema]);

//   const handleFormSubmit = async (data) => {
//     try {
//       await onSubmit(data, 'updateCollectionForm', collectionData?._id);
//       showSuccess("You've successfully updated the collection.");
//     } catch (error) {
//       showError('Failed to update collection. Please try again.');
//     }
//   };

//   return (
//     <RCZodForm
//       schemaName="updateCollectionForm"
//       fields={updateCollectionFields}
//       onSubmit={handleFormSubmit}
//       buttonLabel="Update Collection"
//       theme={theme}
//       initialValues={collectionData}
//     />
//   );
// };

// export default UpdateCollectionForm;
