import { useState } from 'react';

export const useFormData = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const resetFormData = () => {
    setFormData(initialValues);
  };

  return { formData, updateFormData, resetFormData };
};
