/**
 * SELECT FORM HANDLER FUNCTION: This function is used to handle the selection of a form field. It is passed to the `handleChange` prop of the `RCInput` component. It works by setting the `value` prop of the `RCInput` component to the selected option.
 * @param {Object} initialValues - The initial values for the form fields.
 * @param {String} formKey - The name of the form field.
 * @returns {Object} - An object containing the selected values and the `handleChange` function.
 */
import { useState, useCallback } from 'react';

const useFormSelect = (initialValues, formKey) => {
  const [selectedValues, setSelectedValues] = useState(initialValues);

  const handleChange = useCallback(
    (formKey) => (event) => {
      setSelectedValues((prevValues) => ({
        ...prevValues,
        [formKey]: event.target.value,
      }));
    },
    []
  );

  return { selectedValues, handleChange };
};

export default useFormSelect;
