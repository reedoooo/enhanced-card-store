import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormWrapper, StyledTextField, StyledButton } from './styled';
import { useMode } from '../../context';

const CollectionForm = ({ onSave, isNew }) => {
  const { theme } = useMode();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  });

  const handleValueChange = (fieldName) => (event) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSave(formValues); // Assuming onSave is properly provided and handles the form submission
  };

  return (
    <FormWrapper onSubmit={handleFormSubmit} theme={theme}>
      <StyledTextField
        label="Collection Name"
        placeholder="Enter collection name"
        value={formValues.name}
        onChange={handleValueChange('name')}
        margin="normal"
        variant="outlined"
        required
        fullWidth
        theme={theme}
      />
      <StyledTextField
        label="Collection Description"
        placeholder="Enter collection description"
        value={formValues.description}
        onChange={handleValueChange('description')}
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        theme={theme}
      />
      <StyledButton type="submit" variant="contained" theme={theme}>
        {isNew ? 'Create Collection' : 'Update Collection'}
      </StyledButton>
    </FormWrapper>
  );
};

CollectionForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default CollectionForm;
