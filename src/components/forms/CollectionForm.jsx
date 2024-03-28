import React, { useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormContext, useMode } from '../../context';
import useSnackbarManager from '../../context/hooks/useSnackbarManager';
import RCZodForm from './reusable/RCZodForm';

// Common fields structure used in both add and update forms
const collectionFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    value: '',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    value: '',
    required: true,
    multiline: true,
    rows: 4,
  },
];

const CollectionForm = ({ collectionData, actionType }) => {
  const { setFormSchema, onSubmit } = useFormContext();
  const { theme } = useMode();
  const schemaName =
    actionType === 'add' ? 'addCollectionForm' : 'updateCollectionForm';
  const buttonLabel =
    actionType === 'add' ? 'Create Collection' : 'Update Collection';
  const startIcon =
    actionType === 'add' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />;
  console.log('COLLECTION DATA', collectionData);
  return (
    <RCZodForm
      schemaName={schemaName}
      buttonLabel={buttonLabel}
      startIcon={startIcon}
      fields={
        actionType === 'add'
          ? collectionFields
          : collectionFields.map((field) => ({
              ...field,
              value: collectionData?.[field.name],
            }))
      }
      // onSubmit={handleFormSubmit}
      theme={theme}
      initialValues={actionType === 'update' ? collectionData : {}}
    />
  );
};

export default CollectionForm;
