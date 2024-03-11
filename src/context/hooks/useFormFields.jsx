// useFormFields.js
import { useMemo } from 'react';

const useFormFields = ({ formType, handleChange, values, theme }) => {
  // This function generates field configurations based on the keys and values
  const generateFieldConfig = (keyPath, obj) => {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
      ) {
        // Recursively handle nested objects
        return generateFieldConfig(`${keyPath}${key}.`, value);
      } else {
        // Generate the base field configuration
        return [
          {
            name: `${keyPath}${key}`,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
            placeholder: `Enter ${key}`,
            value: value,
            onChange: handleChange(formType, `${keyPath}${key}`),
          },
        ];
      }
    });
  };

  const fieldsConfig = useMemo(() => {
    // Extract the form structure based on formType
    const formStructure = values[formType] || {};
    return generateFieldConfig('', formStructure);
  }, [formType, values, handleChange]);

  return fieldsConfig;
};

export default useFormFields;
