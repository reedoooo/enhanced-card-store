import { useState, useCallback } from 'react';

const useFormManagement = (initialFormKey, formSchemas) => {
  const [activeForm, setActiveForm] = useState(initialFormKey);

  const setActiveFormSchema = useCallback(
    (formKey) => setActiveForm(formKey),
    []
  );

  const toggleActiveForm = useCallback((formA, formB) => {
    setActiveForm((prevForm) => (prevForm === formA ? formB : formA));
  }, []);

  return {
    setActiveFormSchema,
    toggleActiveForm,
    currentSchemaKey: activeForm,
  };
};

export default useFormManagement;
