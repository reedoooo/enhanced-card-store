// import { useState, useEffect } from 'react';
// import { formFields } from '../formsConfig';
// import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';

// const useFormSelect = () => {
//   const { selectedCollection } = useSelectedCollection();

//   // Assuming each form field has a default value configured in `formFields`
//   const initialFormValues = {
//     statRange: formFields['statRangeForm'].defaultValue,
//     timeRange: formFields['timeRangeForm'].defaultValue,
//     themeRange: formFields['themeRangeForm'].defaultValue,
//   };

//   const [selectionValues, setSelectionValues] = useState(initialFormValues);

//   // Instead of maintaining separate states for values and their corresponding data,
//   // Consider calculating related data on-the-fly or in a context/provider if needed across components
//   const handleChange = (formKey) => (event) => {
//     const newSelectionValue = event.target.value;
//     setSelectionValues((prevValues) => ({
//       ...prevValues,
//       [formKey]: newSelectionValue,
//     }));

//     // Optional: If you need to perform actions based on the new selection,
//     // such as fetching new data or updating context, do it here
//     // For example, if changing `timeRange` should update a chart:
//     // if (formKey === 'timeRange') {
//     //   updateChartData(selectedCollection.averagedChartData[newSelectionValue]);
//     // }
//   };

//   // Effect to initialize form values based on current selectedCollection
//   // This is useful if selectedCollection can change and you want form values to reset/update accordingly
//   useEffect(() => {
//     if (selectedCollection) {
//       setSelectionValues({
//         statRange:
//           selectedCollection.initialStatRange || initialFormValues.statRange,
//         timeRange:
//           selectedCollection.initialTimeRange || initialFormValues.timeRange,
//         themeRange:
//           selectedCollection.initialThemeRange || initialFormValues.themeRange,
//       });
//     }
//   }, [selectedCollection]);

//   return {
//     selectionValues,
//     handleChange,
//   };
// };

// export default useFormSelect;
// useFormSelect.js
// useFormSelect.js
// useFormSelect.js

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
