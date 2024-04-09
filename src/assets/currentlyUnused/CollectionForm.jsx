// import React, { useEffect } from 'react';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { useMode } from '../../context';
// import RCZodForm from './reusable/RCZodForm';

// // Common fields structure used in both add and update forms
// const collectionFields = [
//   {
//     label: 'Name',
//     type: 'text',
//     placeHolder: 'Enter collection name',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     value: '',
//     required: true,
//     name: 'name',
//   },
//   {
//     label: 'Description',
//     type: 'text',
//     placeHolder: 'Enter collection description',
//     defaultValue: '',
//     rules: {
//       required: true,
//       multiline: true,
//       rows: 4,
//     },
//     value: '',
//     required: true,
//     multiline: true,
//     rows: 4,
//     name: 'description',
//   },
// ];

// const CollectionForm = ({ collectionData, actionType }) => {
//   const { theme } = useMode();
//   const schemaName =
//     actionType === 'add' ? 'addCollectionForm' : 'updateCollectionForm';
//   const buttonLabel =
//     actionType === 'add' ? 'Create Collection' : 'Update Collection';
//   const startIcon =
//     actionType === 'add' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />;
//   // console.log('COLLECTION DATA', collectionData);
//   return (
//     <RCZodForm
//       schemaName={schemaName}
//       buttonLabel={buttonLabel}
//       startIcon={startIcon}
//       fields={
//         actionType === 'add'
//           ? collectionFields
//           : collectionFields.map((field) => ({
//               ...field,
//               value: collectionData?.[field.name],
//             }))
//       }
//       // onSubmit={handleFormSubmit}
//       theme={theme}
//       initialValues={actionType === 'update' ? collectionData : {}}
//     />
//   );
// };

// export default CollectionForm;
