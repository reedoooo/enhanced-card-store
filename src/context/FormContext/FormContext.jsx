import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuthContext } from '../AuthContext/authContext';
import { usePageContext } from '../PageContext/PageContext';
import { useCardStore } from '../CardContext/CardStore';
// import { params: initialState } from './search.json';
// import as dif name from ./search.json
import { initialState } from './search.json';
import { defaultContextValue } from './helpers';

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
  // ...other form-specific validations
};
// Initial state for different forms
const initialFormStates = {
  loginForm: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    role_data: {
      name: 'admin',
      capabilities: ['create', 'read', 'update', 'delete'],
    },
    signupMode: false, // Assuming it's a boolean toggle for whether it's signup or login
  },
  signupForm: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    role_data: {
      name: 'admin',
      capabilities: ['create', 'read', 'update', 'delete'],
    },
    signupMode: true,
  },
  updateUserDataForm: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role_data: {
      name: 'admin',
      capabilities: ['create', 'read', 'update', 'delete'],
    },
    dateOfBirth: '',
    gender: '',
    age: '',
    status: '',
    signupMode: false,
  },
  updateCollectionForm: {
    name: '',
    description: '',
  },
  addCollectionForm: {
    // New form with same initial values as updateCollectionForm
    name: '',
    description: '',
  },
  searchForm: {
    searchTerm: '',
    searchParams: {
      name: '',
      type: '',
      race: '',
      archetype: '',
      attribute: '',
      level: '',
    },
  },
  customerInfoFields: {
    firstName: '',
    lastName: '',
    address: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    timezone: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  // ...other form types as needed
};

// Provider component
export const FormProvider = ({ children }) => {
  const { signup, login } = useAuthContext();
  const {
    loadingStatus,
    setLoading, // Use setLoading instead of individual state setters
    returnDisplay,
  } = usePageContext();
  // const { handleRequest } = useCardStore();
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

  // Utility to set value at a given path in an object
  // Example: setValueAtPath(obj, 'address.line1', '123 Main St')
  const setValueAtPath = (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = current[keys[i]] || {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  };

  // Function to handle form field changes
  // Example: handleChange('signupForm', 'firstName')
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

  // Function to handle form submission
  const handleSubmit = (formName) => async (event) => {
    event.preventDefault();
    setLoading('isFormDataLoading', true); // indicate form is being submitted
    setCurrentForm(forms[formName]); // Set current form
    const currentErrors = formValidations[formName]
      ? formValidations[formName](currentForm)
      : {};
    const securityData = {
      username: currentForm.username,
      password: currentForm.password,
      email: currentForm.email,
      role_data: {
        name: 'admin',
        capabilities: ['create', 'read', 'update', 'delete'],
      },
    };
    const basicData = {
      firstName: currentForm.firstName,
      lastName: currentForm.lastName,
    };
    if (Object.values(currentErrors).every((x) => x === '')) {
      // Proceed based on form type
      switch (formName) {
        case 'signupForm':
          console.log('Submitting signup form:', currentForm);
          await signup(securityData, basicData); // Use the appropriate function from AuthContext
          break;
        case 'loginForm':
          console.log('Submitting login form:', currentForm);
          await login(currentForm?.username, currentForm?.password); // Adjust as necessary
          break;
        // Handle other cases
      }
      // Handle success logic here

      // Reset the form
      resetForm(formName);
    } else {
      setFormErrors(currentErrors); // Update error state
    }
    setLoading('isFormDataLoading', false); // indicate form submission is done
  };

  // useEffect(() => {
  //   if (initialFormStates?.searchForm?.searchTerm) {
  //     handleRequest(initialFormStates?.searchForm?.searchTerm);
  //   }
  // }, [returnDisplay]);

  // Provide each form's data, handleChange, and handleSubmit through context
  const contextValue = {
    forms,
    formErrors,
    initialFormStates,
    currentForm,
    setFormErrors,
    setCurrentForm,
    handleChange,
    handleSubmit,
    resetForm,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
