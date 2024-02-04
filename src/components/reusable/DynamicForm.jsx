import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useFormContext } from '../../context';
import useFormFields from '../../context/hooks/useFormFields';
import ReusableFormField from './ReusableFormField';
import { FormWrapper } from '../forms/styled';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';

const DynamicForm = ({
  formType,
  initialValues,
  onSubmit,
  submitButtonText,
  theme,
}) => {
  const { handleChange, handleSubmit, values } = useFormContext(); // Assuming useFormContext is a custom hook to manage form state

  // Generate form fields configuration based on initialValues provided
  const fieldsConfig = useFormFields({
    formType,
    handleChange,
    values: initialValues,
    theme,
  });

  console.log('fieldsConfig', fieldsConfig);
  // Handle form submission
  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmit(event, values[formType]);
  // };

  return (
    <MDBox
      component="form"
      onSubmit={onSubmit}
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
    >
      {fieldsConfig?.map((field, index) => (
        <ReusableFormField
          key={index}
          label={field.label}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
          variant="outlined"
          type={field.type || 'text'}
        />
      ))}
      <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
        {submitButtonText}
      </Button>
    </MDBox>
  );
};

export default DynamicForm;
{
  /* <TextField
          key={index}
          label={field.label}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
          variant="outlined"
          type={field.type || 'text'} // Default to text if no type is specified
        /> */
}
