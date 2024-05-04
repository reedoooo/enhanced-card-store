import { useState, useEffect } from 'react';

/**
 * Custom hook to generate initial form data for add or update forms.
 *
 * @param {boolean} isNew Indicates if the form is for adding a new item.
 * @param {object} formFieldsConfig Configuration object for form fields.
 * @param {object|null} existingData Data for the item being updated, if applicable.
 * @returns {object} The initial form data.
 */
const useInitialFormData = (isNew, formFieldsConfig, existingData = null) => {
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(() => {
    if (isNew) {
      // If adding a new item, populate initialFormData with empty strings
      const emptyData = Object.keys(formFieldsConfig).reduce((acc, key) => {
        acc[key] = ''; // Set each field to an empty string or a default value
        return acc;
      }, {});
      setInitialFormData(emptyData);
    } else {
      // If updating an item, use existingData or default to formFieldsConfig
      setInitialFormData(existingData || formFieldsConfig);
    }
  }, [isNew, formFieldsConfig, existingData]);

  return initialFormData;
};

export default useInitialFormData;
