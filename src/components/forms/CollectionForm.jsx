import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, useMode, usePageContext } from '../../context';
import FormField from '../reusable/FormField';
import { StyledButton } from '../cards/styles/cardStyles';

const CollectionForm = ({ onSave, isNew }) => {
  const { theme } = useMode();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  });
  const { returnDisplay, loadingStatus, setIsFormDataLoading } =
    usePageContext();
  const {
    errors,
    isSubmitting,
    currentFormType,
    onSubmit,
    register,
    handleChange,
    handleSubmit,
    setFormType,
  } = useFormContext();

  useEffect(() => setFormType('updateCollectionForm'), [setFormType]);
  // const handleValueChange = (fieldName) => (event) => {
  //   setFormValues((prev) => ({ ...prev, [fieldName]: event.target.value }));
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   onSave(formValues); // Assuming onSave is properly provided and handles the form submission
  // };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setIsFormDataLoading(true);
        onSubmit(data);
      })}
      // theme={theme}
    >
      {loadingStatus?.isFormDataLoading && returnDisplay()}
      <FormField
        name="name"
        label="Collection Name"
        placeholder="Enter collection name"
        register={register}
        value={currentFormType?.updateCollectionForm?.name}
        errors={errors}
        theme={theme}
        required
      />
      <FormField
        name="description"
        label="Collection Description"
        placeholder="Enter collection description"
        register={register}
        errors={errors}
        required
        value={currentFormType?.updateCollectionForm?.description}
        theme={theme}
        multiline
        rows={4}
      />
      {/* <StyledTextField
        label="Collection Name"
        placeholder="Enter collection name"
        value={currentFormType?.updateCollectionForm?.name}
        // onChange={handleValueChange('name')}
        margin="normal"
        variant="outlined"
        required
        fullWidth
        theme={theme}
      />
      <StyledTextField
        label="Collection Description"
        placeholder="Enter collection description"
        value={currentFormType?.updateCollectionForm?.description}
        // onChange={handleValueChange('description')}
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        theme={theme}
      /> */}
      <StyledButton
        disabled={isSubmitting}
        type="submit"
        variant="contained"
        theme={theme}
      >
        {isSubmitting
          ? 'Loading...'
          : isNew
            ? 'Create Collection'
            : 'Update Collection'}
      </StyledButton>
    </form>
  );
};

CollectionForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default CollectionForm;
