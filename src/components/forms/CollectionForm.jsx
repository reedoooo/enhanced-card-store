import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography, Alert } from '@mui/material';
import { useFormContext, useMode } from '../../context';
import { FormWrapper, StyledButton, StyledTextField } from './styled';

const CollectionForm = ({ onSave, isNew }) => {
  const { theme } = useMode();
  const { forms, handleChange, handleSubmit } = useFormContext();
  const [formValues, setFormValues] = useState({ name: '', description: '' });
  const formType = isNew ? 'addCollectionForm' : 'updateCollectionForm';

  useEffect(() => {
    setFormValues(
      isNew ? forms?.addCollectionForm || {} : forms?.updateCollectionForm || {}
    );
  }, [isNew, forms.addCollectionForm, forms.updateCollectionForm]);

  const handleValueChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // You might need to ensure onSave is properly defined and used, or use the provided handleSubmit for form submission
    onSave(formValues); // Replace or use along with your context's handleSubmit
  };
  return (
    <FormWrapper onSubmit={handleSave} theme={theme}>
      <Typography variant="h6">
        {isNew ? 'Create a new collection' : 'Edit your collection'}
      </Typography>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
      <StyledTextField
        label="Collection Name"
        value={formValues?.name}
        onChange={handleValueChange('name')}
        variant="outlined"
        fullWidth
        margin="normal"
        theme={theme}
      />
      <StyledTextField
        label="Collection Description"
        value={formValues?.description}
        onChange={handleValueChange('description')}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        theme={theme}
      />
      <StyledButton
        variant="contained"
        color="primary"
        theme={theme}
        type="button" // Ensuring it's a button to prevent any accidental form submissions
        onClick={handleSave} // Use onClick to handle the button click event
      >
        {isNew ? 'Create Collection' : 'Save Changes'}
      </StyledButton>
    </FormWrapper>
  );
};

CollectionForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  // initialName: PropTypes.string,
  // initialDescription: PropTypes.string,
};

export default CollectionForm;
