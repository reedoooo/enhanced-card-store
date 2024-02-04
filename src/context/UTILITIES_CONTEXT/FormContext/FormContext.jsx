import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuthContext } from '../../MAIN_CONTEXT/AuthContext/authContext';
import { usePageContext } from '../PageContext/PageContext';
// import { defaultContextValue } from './helpers';
import { useCardStoreHook } from '../../hooks/useCardStore';
import { useForm, FormProvider as RHFormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchemas } from './schemas';
import { defaultContextValue } from '../../constants';
// Define the context
const FormContext = createContext(defaultContextValue.FORM_CONTEXT);
// const formValidations = {
//   updateUserDataForm: (values) => {
//     let errors = {};
//     // Example: Add validations specific to user data update form
//     if (!values.firstName) errors.firstName = 'First name is required';
//     if (!values.lastName) errors.lastName = 'Last name is required';
//     // ... more validations
//     return errors;
//   },
//   updateCollectionForm: (values) => {
//     let errors = {};
//     // Example: Add validations specific to collection update form
//     if (!values.name) errors.name = 'Collection name is required';
//     if (!values.description) errors.description = 'Description is required';
//     // ... more validations
//     return errors;
//   },
// };

export const FormProvider = ({ children }) => {
  const [currentFormType, setCurrentFormType] = useState('defaultForm');
  const currentSchema = formSchemas[currentFormType] || formSchemas.default;
  const defaultValues = formSchemas.defaultValues[currentFormType];
  const methods = useForm({
    mode: 'onTouched',
    defaultValues,
    resolver: zodResolver(currentSchema),
  });
  const {
    reset,
    handleSubmit,
    setValue,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const { signup, login } = useAuthContext();
  const { setIsFormDataLoading } = usePageContext();
  const { handleRequest } = useCardStoreHook();
  const setFormType = (formType) => {
    console.log('Setting form type:', formType);
    setCurrentFormType(formType);
  };
  const onSubmit = async (data) => {
    console.log('Submitting form:', currentFormType);
    console.log('Form data:', data);
    setIsFormDataLoading(true);

    try {
      switch (currentFormType) {
        case 'signupForm':
          await signup(
            data.firstName,
            data.lastName,
            data.username,
            data.password,
            data.email
          );
          break;
        case 'loginForm':
          await login(data.username, data.password);
          break;
        case 'updateUserDataForm':
          // await updateUserData(data); // Adjust as necessary
          break;
        case 'updateCollectionForm':
          console.log('Updating collection:', data);
          // await updateCollection(data); // Adjust as necessary
          break;
        case 'addCollectionForm':
          console.log('Adding collection:', data);
          // await addCollection(data); // Adjust as necessary
          break;
        case 'searchForm':
          console.log('Submitting search form:', data);
          await handleRequest(data.searchTerm); // Use handleRequest for the search form
          break;
        default:
          console.log('No form type specified');
          break;
      }
      // console.log(`${currentFormType} submitted`, data);
      console.log(
        `${
          currentFormType?.charAt(0).toUpperCase() + currentFormType.slice(1)
        } Form submitted successfully`,
        data
      );
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsFormDataLoading(false);
    }
  };
  const handleChange = (name, value) => {
    console.log('Setting value:', name, value);

    // Get the previous value from the form state
    // const prevValue = methods.getValues(name);

    // Check if the new value is different from the previous value
    setValue(name, value);

    if (currentFormType === 'searchForm') {
      handleRequest(value);
    }
    // if (value !== prevValue) {
    //   setValue(name, value);

    //   if (currentFormType === 'searchForm') {
    //     handleRequest(value);
    //   }
    // }
  };

  const contextValue = {
    ...methods,
    currentFormType,
    currentSchema,
    errors,
    isSubmitting,

    setCurrentFormType,
    register,
    setFormType,
    handleChange,
    onSubmit,
    handleSubmit,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <RHFormProvider {...methods}>{children}</RHFormProvider>
    </FormContext.Provider>
  );
};

export default FormProvider;

// Hook for consuming context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
