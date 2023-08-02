import { useState } from 'react';

const useForm = (callback, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setValues((values) => ({ ...values, [name]: value }));
    } else if (e.name && e.value !== undefined) {
      const { name, value } = e;
      setValues((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback(values);
  };

  return { handleChange, handleSubmit, values };
};

export default useForm;
