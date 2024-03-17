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
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    required: true,
    multiline: true,
    rows: 4,
  },
];

const CollectionForm = ({ collectionData, actionType }) => {
  const { setFormSchema, onSubmit } = useFormContext();
  const { theme } = useMode();
  const { showSuccess, showError } = useSnackbarManager();

  // Determine the schema name and button label based on the action type
  const schemaName =
    actionType === 'add' ? 'addCollectionForm' : 'updateCollectionForm';
  const buttonLabel =
    actionType === 'add' ? 'Create Collection' : 'Update Collection';
  const startIcon = actionType === 'add' ? <AddCircleOutlineIcon /> : null;

  useEffect(() => {
    if (collectionData && actionType === 'update') {
      setFormSchema(schemaName, collectionData);
    }
  }, [collectionData, setFormSchema, schemaName, actionType]);

  const handleFormSubmit = async (data) => {
    const method = actionType === 'add' ? 'Add' : 'Update';
    try {
      await onSubmit(data, schemaName, collectionData?._id);
      showSuccess(
        `You've successfully ${method.toLowerCase()}ed the collection.`
      );
    } catch (error) {
      showError(
        `Failed to ${method.toLowerCase()} collection. Please try again.`
      );
    }
  };

  return (
    <RCZodForm
      schemaName={schemaName}
      buttonLabel={buttonLabel}
      startIcon={startIcon}
      fields={collectionFields}
      onSubmit={handleFormSubmit}
      theme={theme}
      initialValues={actionType === 'update' ? collectionData : {}}
    />
  );
};

export default CollectionForm;
