import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchemas,
  getDefaultValuesFromSchema,
  validateFormData,
  defaultValues,
  handleZodValidation,
} from './schemas'; // Update the path as necessary
import { defaultContextValue } from '../../constants';
import { ZodError } from 'zod';
import { useAuthContext } from '../../MAIN_CONTEXT/AuthContext/authContext';
import { usePageContext } from '../PageContext/PageContext';
import { useCardStoreHook } from '../../hooks/useCardStore';
import useCollectionManager from '../../MAIN_CONTEXT/CollectionContext/useCollectionManager';
import { useDeckStore } from '../../MAIN_CONTEXT/DeckContext/DeckContext';
import { useChartContext } from '../../MAIN_CONTEXT/ChartContext/ChartContext';
function objectToBoolean(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});
}
const FormContext = createContext(defaultContextValue.FORM_CONTEXT);

export const FormProvider = ({ children }) => {
  const { signup, login, isLoggedIn, userId } = useAuthContext();
  const { setIsFormDataLoading } = usePageContext();
  const { handleRequest, setSearchSettings, searchSettings } =
    useCardStoreHook();
  const { createNewCollection, updateAndSyncCollection, selectedCollection } =
    useCollectionManager(isLoggedIn, userId);
  const { updateDeckDetails, deleteUserDeck, createUserDeck } = useDeckStore();
  const { timeRange, setTimeRange, timeRanges } = useChartContext();

  const [forms, setForms] = useState({});

  const [currentForm, setCurrentForm] = useState({});
  const methods = useForm({
    mode: 'onTouched',
    resolver: zodResolver(formSchemas[Object.keys(formSchemas)[0]]),
    defaultValues: defaultValues[Object.keys(formSchemas)[0]],
  });
  const initialValues = getDefaultValuesFromSchema(
    formSchemas[Object.keys(formSchemas)[0]]
  );
  const values = useRef(initialValues);
  const touched = useRef(objectToBoolean(initialValues));
  const dirty = useRef(objectToBoolean(initialValues));
  const initializeFormStates = () => {
    return Object.keys(formSchemas).reduce((acc, key) => {
      acc[key] = defaultValues[key]; // Assuming defaultValues is a correctly mapped object
      return acc;
    }, {});
  };
  const [formStates, setFormStates] = useState(initializeFormStates());
  const handleFieldChange = (formId, field, value) => {
    setFormStates((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [field]: value,
      },
    }));
  };
  const onSubmit = async (formData, formId, additionalData) => {
    setIsFormDataLoading(true);
    const validation = handleZodValidation(formData, formSchemas[formId]);
    console.log('isValid:', validation.isValid);

    if (validation.isValid) {
      try {
        if (formId === 'signupForm') {
          console.log('Submitting signup form:', formData);
          await signup(
            formData.firstName,
            formData.lastName,
            formData.username,
            formData.password,
            formData.email
          );
        } else if (formId === 'loginForm') {
          console.log('Submitting login form:', formData);
          await login(formData.username, formData.password);
        } else if (formId === 'updateUserDataForm') {
          console.log('Submitting update user data form:', formData);
          // await updateUserData(formData);
        } else if (formId === 'updateCollectionForm') {
          console.log('Updating collection:', formData);
          console.log('Selected collection:', additionalData);

          const updatedData = {
            name: formData.name,
            description: formData.description,
          };
          await updateAndSyncCollection(additionalData, updatedData);
        } else if (formId === 'addCollectionForm') {
          console.log('Adding collection:', formData);
          const newData = {
            name: formData.name,
            description: formData.description,
          };
          await createNewCollection(newData);
        } else if (formId === 'updateDeckForm') {
          console.log('Updating deck:', formData);
          await updateDeckDetails(formData);
        } else if (formId === 'addDeckForm') {
          console.log('Adding deck:', formData);
          await createUserDeck(formData.name, formData.description);
        } else if (formId === 'searchForm') {
          console.log('Submitting search form:', formData);
          await handleRequest(formData.searchTerm); // Use handleRequest for the search form
        } else if (formId === 'TimeRangeSchema') {
          console.log('Submitting TimeRange form:', formData);
          setTimeRange(formData.timeRange);
          // handleTimeRangeChange(formData);
        } else if (formId === 'searchSettingsForm') {
          console.log('Submitting SearchSettings form:', formData);
          setSearchSettings(formData);
        } else if (formId === 'defaultForm') {
          console.log('Submitting default form:', formData);
        }
        console.log(`${formId} form submitted successfully`, formData);
        // Reset form logic here if needed
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsFormDataLoading(false);
      }
    } else {
      console.error('Form validation failed:', validation.errors);
      // Optionally, display validation.errors using your UI logic
      setIsFormDataLoading(false);
    }
  };
  const onChange = (formData, formId) => {
    console.log('Form data changed:', formData, formId);
    const validation = handleZodValidation(formData, formSchemas[formId]);
    console.log('isValid:', validation.isValid);
    if (validation.isValid && formId === 'searchForm') {
      console.log('Form data is valid:', validation.data);
      handleRequest(validation.data.searchTerm); // Use handleRequest for the search form
    }
  };
  const handleSetAllForms = useCallback(() => {
    const allFormConfigs = Object.keys(formSchemas).map((formId) => ({
      formId,
      defaultValues: defaultValues[formId],
      schema: formSchemas[formId],
    }));
    console.log('Setting all forms:', allFormConfigs);
    setForms(allFormConfigs);
  }, []);
  const handleSearchTermChange = useCallback(
    (value) => {
      handleRequest(value); // Directly calling handleRequest with the new searchTerm value
    },
    [handleRequest]
  );
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    console.log('e.target:', e.target);
    const fieldValue = type === 'checkbox' ? checked : value;
    values.current[name] = fieldValue;
    console.log('Form field changed:', name, fieldValue);
    formStates.current[currentForm] = {
      ...formStates.current[currentForm],
      [name]: fieldValue,
    };
  }, []);
  const handleFocus = useCallback((e) => {
    const { name } = e.target;
    touched.current[name] = true;

    console.log('Form field focused:', name);
    // More logic here if needed
  }, []);
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    dirty.current[name] = true;

    console.log('Form field blurred:', name);
    // Validation logic here
  }, []);

  useEffect(() => {
    console.log('SETTING ALL FORMS:', formSchemas);
    handleSetAllForms(formSchemas);
  }, [handleSetAllForms]);

  const contextValue = useMemo(
    () => ({
      ...methods,
      forms,

      formMethods: methods,
      formStates,
      currentForm,
      values,
      touched,
      dirty,
      initialValues,

      handleSearchTermChange,
      handleFieldChange,
      handleChange,
      handleFocus,
      handleBlur,

      setCurrentForm,
      onSubmit,
      onChange,

      toggleForm: (formId) => {
        setCurrentForm(formId);
      },
    }),
    [
      methods,
      forms,
      formStates,
      currentForm,
      handleChange,
      handleFocus,
      handleBlur,
      setCurrentForm,
      onSubmit,
      onChange,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
