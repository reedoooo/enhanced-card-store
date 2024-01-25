import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuthContext } from '../../AuthContext/authContext';
import { usePageContext } from '../../PageContext/PageContext';
import {
  defaultContextValue,
  initialFormStates,
  setValueAtPath,
} from './helpers';
import { useCardStoreHook } from '../../hooks/useCardStore';

// Define the context
const FormContext = createContext(defaultContextValue);

// Hook for consuming context
export const useFormContext = () => useContext(FormContext);
// Define form validations if needed
const formValidations = {
  loginForm: (values) => {
    let errors = {};
    if (!values.username) errors.username = 'Username is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  },
  signupForm: (values) => {
    let errors = {};
    // Example: Add validations specific to signup form
    if (!values.firstName) errors.firstName = 'First name is required';
    if (!values.lastName) errors.lastName = 'Last name is required';
    // ... more validations
    return errors;
  },
  updateUserDataForm: (values) => {
    let errors = {};
    // Example: Add validations specific to user data update form
    if (!values.firstName) errors.firstName = 'First name is required';
    if (!values.lastName) errors.lastName = 'Last name is required';
    // ... more validations
    return errors;
  },
  updateCollectionForm: (values) => {
    let errors = {};
    // Example: Add validations specific to collection update form
    if (!values.name) errors.name = 'Collection name is required';
    if (!values.description) errors.description = 'Description is required';
    // ... more validations
    return errors;
  },
};

export const FormProvider = ({ children }) => {
  const { signup, login } = useAuthContext();
  const { handleRequest } = useCardStoreHook();
  const {
    loadingStatus,
    setLoading, // Use setLoading instead of individual state setters
    returnDisplay,
  } = usePageContext();
  const [forms, setForms] = useState(initialFormStates);
  const [currentForm, setCurrentForm] = useState({}); // For multiple forms
  const [formErrors, setFormErrors] = useState(null); // For a single form

  const resetForm = (formName) => {
    setForms((prevForms) => ({
      ...prevForms,
      [formName]: initialFormStates[formName],
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [formName]: {} }));
  };
  const handleChange = (formName, path) => (event) => {
    const { value } = event.target;
    setForms((prevForms) => {
      const form = { ...prevForms[formName] };
      setValueAtPath(form, path, value);
      return { ...prevForms, [formName]: form };
    });

    if (formValidations[formName]) {
      const newErrors = formValidations[formName](forms[formName]);
      setFormErrors({ ...formErrors, [formName]: newErrors });
    }
  };
  // const handleChange = (formName, path) => (event) => {
  //   const { value } = event.target;
  //   setForms((prevForms) => {
  //     const form = { ...prevForms[formName] };
  //     setValueAtPath(form, path, value);
  //     return { ...prevForms, [formName]: form };
  //   });

  //   // Check if the form being changed is the search form and specifically the searchTerm field
  //   if (formName === 'searchForm' && path === 'searchTerm') {
  //     // Call handleRequest for immediate search
  //     const updatedSearchForm = {
  //       ...forms.searchForm,
  //       searchTerm: value,
  //     };
  //     handleRequest(updatedSearchForm);
  //   }

  //   if (formValidations[formName]) {
  //     const newErrors = formValidations[formName](forms[formName]);
  //     setFormErrors({ ...formErrors, [formName]: newErrors });
  //   }
  // };
  const handleSubmit = (formName) => async (event) => {
    event.preventDefault();
    setLoading('isFormDataLoading', true);
    setCurrentForm(forms[formName]);
    const currentErrors = formValidations[formName]
      ? formValidations[formName](currentForm)
      : {};

    console.log('currentForm', currentForm);

    if (Object.values(currentErrors).every((x) => x === '')) {
      // Proceed based on form type
      switch (formName) {
        case 'signupForm':
          console.log('Submitting signup form:', currentForm);
          await signup(currentForm?.securityData, currentForm.basicData); // Use the appropriate function from AuthContext
          // await signup(securityData, basicData); // Use the appropriate function from AuthContext
          break;
        case 'loginForm':
          console.log('Submitting login form:', currentForm);
          // await login(currentForm?, currentForm?.password); // Adjust as necessary
          await login(
            currentForm?.securityData?.username,
            currentForm?.securityData?.password
          ); // Use the appropriate function from AuthContext

          break;
        case 'updateUserDataForm':
          console.log('Submitting update user data form:', currentForm);
          // await updateUserData(currentForm); // Adjust as necessary
          break;
        case 'updateCollectionForm':
          console.log('Submitting update collection form:', currentForm);
          // await updateCollection(currentForm); // Adjust as necessary
          break;
        case 'addCollectionForm':
          console.log('Submitting add collection form:', currentForm);
          // await addCollection(currentForm); // Adjust as necessary
          break;
        case 'searchForm':
          console.log('Submitting search form:', currentForm);
          await handleRequest(currentForm); // Use handleRequest for the search form
          break;
        default:
          console.log('No form type specified');
          break;
      }
      console.log(
        `${
          formName?.charAt(0).toUpperCase() + formName.slice(1)
        } Form submitted successfully`
      );
      resetForm(formName);
    } else {
      setFormErrors(currentErrors); // Update error state
    }
    setLoading('isFormDataLoading', false); // indicate form submission is done
  };

  useEffect(() => {
    if (initialFormStates?.searchForm?.searchTerm) {
      handleRequest(initialFormStates?.searchForm?.searchTerm);
    }
  }, [returnDisplay]);

  // Provide each form's data, handleChange, and handleSubmit through context
  const contextValue = {
    forms,
    formErrors,
    initialFormStates,
    currentForm,
    setForms,
    setFormErrors,
    setCurrentForm,
    handleChange,
    handleSubmit,
    resetForm,
    handleRequest,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
// // Utility to set value at a given path in an object
// // Example: setValueAtPath(obj, 'address.line1', '123 Main St')
// const setValueAtPath = (obj, path, value) => {
//   const keys = path.split('.');
//   let current = obj;
//   for (let i = 0; i < keys.length - 1; i++) {
//     current[keys[i]] = current[keys[i]] || {};
//     current = current[keys[i]];
//   }
//   current[keys[keys.length - 1]] = value;
// };
