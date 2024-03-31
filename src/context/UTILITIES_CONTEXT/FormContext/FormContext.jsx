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
import { useCardStoreHook } from '../../MAIN_CONTEXT/CardContext/useCardStore';
import { useLoading } from '../../hooks/useLoading';
import useDeckManager from '../../MAIN_CONTEXT/DeckContext/useDeckManager';
import useTimeRange from '../../../components/forms/selectors/useTimeRange';
import useCollectionManager from '../../MAIN_CONTEXT/CollectionContext/useCollectionManager';
import LoadingOverlay from '../../../layout/REUSABLE_COMPONENTS/LoadingOverlay';
import useAuthManager from '../../MAIN_CONTEXT/AuthContext/useAuthManager';
const initializeFormState = (schema) =>
  Object.keys(schema).reduce((acc, key) => ({ ...acc, [key]: false }), {});
const FormContext = createContext(defaultContextValue.FORM_CONTEXT);
export const FormProvider = ({ children }) => {
  const { signup, login } = useAuthManager();
  const { handleRequest, setSearchSettings, searchSettings } =
    useCardStoreHook();
  const collectionmanagedata = useCollectionManager();
  if (!collectionmanagedata) {
    return <LoadingOverlay />;
  }
  const { createNewCollection, updateCollection } = collectionmanagedata;
  const { updateDeckDetails, deleteDeck, createNewDeck } = useDeckManager();
  // const { setTimeRange } = useTimeRange();
  // ** * * * * * * * * * * * * * * * * * * * |/\ /\ /\| ** * * * * * * * * * * * * * * * * * * *
  // **                                       || | | | ||                                      **
  // **                                     CONTEXT ACTIONS
  // **                                    -----------------                                   **
  // **                                    DYNAMIC FORM SETUP                                  **
  // **                                       || | | | ||                                      **
  // ** * * * * * * * * * * * * * * * * * * * |\/ \/ \/| ** * * * * * * * * * * * * * * * * * * *

  const [forms, setForms] = useState({});
  const { isFormDataLoading, startLoading, stopLoading } = useLoading();
  const [currentSchemaKey, setCurrentSchemaKey] = useState(
    Object.keys(formSchemas)[0]
  );
  const initializeFormStates = () => {
    return Object.keys(formSchemas).reduce((acc, key) => {
      acc[key] = defaultValues[key]; // Assuming defaultValues is a correctly mapped object
      return acc;
    }, {});
  };
  const [formStates, setFormStates] = useState(initializeFormStates());
  const methods = useForm({
    resolver: zodResolver(formSchemas[currentSchemaKey]),
    defaultValues: getDefaultValuesFromSchema(formSchemas[currentSchemaKey]),
  });
  const setFormSchema = useCallback(
    (schemaKey) => {
      setCurrentSchemaKey(schemaKey);
      const schema = formSchemas[schemaKey];
      const defaultValues = getDefaultValuesFromSchema(schema);
      methods.reset(defaultValues);
    },
    [methods]
  );
  // const setFormSchema = useCallback(
  //   (schemaKey) => {
  //     setCurrentSchemaKey(schemaKey);
  //     methods.reset(getDefaultValuesFromSchema(formSchemas[schemaKey]));
  //   },
  //   [methods]
  // );
  const initialValues = getDefaultValuesFromSchema(
    formSchemas[Object.keys(formSchemas)[0]]
  );
  const values = useRef(initialValues);
  const touched = useRef(initializeFormState(formSchemas));
  const dirty = useRef(initializeFormState(formSchemas));
  // const handleTimeRangeChange = useCallback(
  //   (timeRangeValue) => {
  //     console.log('TIME RANGE CHANGE', timeRangeValue);
  //     // Example: setTimeRange could update the context state and trigger re-renders or API calls as needed
  //     setTimeRange(timeRangeValue);
  //   },
  //   [setTimeRange]
  // );
  const handleFieldChange = (formId, field, value) => {
    setFormStates((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [field]: value,
      },
    }));
  };

  const formHandlers = {
    signupForm: (formData) =>
      signup(
        formData.firstName,
        formData.lastName,
        formData.username,
        formData.password,
        formData.email
      ),
    loginForm: (formData) => login(formData.username, formData.password),
    updateUserDataForm: (formData) => console.log(formData),
    addCollectionForm: (formData, additionalData) =>
      createNewCollection(formData, additionalData),
    updateCollectionForm: (formData, additionalData) =>
      updateCollection(additionalData, formData),
    updateDeckForm: (formData, additionalData) =>
      updateDeckDetails(formData, additionalData),
    addDeckForm: (formData, additionalData) =>
      createNewDeck(formData, additionalData),
    deleteDeckForm: (formData, additionalData) =>
      deleteDeck(formData, additionalData),
    searchForm: (formData, additionalData) =>
      setSearchSettings(formData, additionalData),
    collectionSearchForm: (formData, additionalData) =>
      console.log(formData, additionalData),
    // timeRangeSelector: (formData, additionalData) =>
    //   handleTimeRangeChange(formData, additionalData),
    searchSettingsSelector: (formData, additionalData) =>
      setSearchSettings(formData, additionalData),
    rememberMeForm: (formData) => {
      // Implement remember me form submission logic here
      console.log('Remember Me Form Data:', formData);
    },
    authSwitch: (formData) => {
      console.log('Auth Switch Form Data:', formData);
      setCurrentSchemaKey((prevForm) =>
        !prevForm === 'loginForm' ? 'signupForm' : 'loginForm'
      );
    },
  };
  const onSubmit = useCallback(
    async (formData, additionalData) => {
      startLoading(currentSchemaKey);
      const formHandler = formHandlers[currentSchemaKey];
      try {
        console.log(
          `Submitting form: ${currentSchemaKey}`,
          `formdata ${formData}`,
          `additionalData ${additionalData}`
        );

        await formHandler(formData);
      } catch (error) {
        console.error(`Error submitting ${currentSchemaKey}:`, error);
      } finally {
        stopLoading(currentSchemaKey);
      }
    },
    [
      currentSchemaKey,
      // handleTimeRangeChange,
      setSearchSettings,
      startLoading,
      stopLoading,
      formHandlers,
    ]
  );
  useEffect(() => {
    console.log(
      'FormProvider: Setting up form handlers',
      Object.keys(formHandlers),
      'Current Schema Key:',
      currentSchemaKey
    );
    setFormSchema(currentSchemaKey);
    // console.log('SETTING INITIAL VALUES:', initialValues);
    // methods.reset(getDefaultValuesFromSchema(formSchemas[currentSchemaKey]));
  }, [currentSchemaKey, setFormSchema]);
  // EFFECT: Setting initial values when the fo
  const onChange = (formData, currentSchemaKey) => {
    console.log('Form data changed:', formData, currentSchemaKey);
    const validation = handleZodValidation(
      formData,
      formSchemas[currentSchemaKey]
    );
    console.log('isValid:', validation.isValid);
    if (validation.isValid && currentSchemaKey === 'searchForm') {
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
    // Check if the event target has the expected structure
    if (!e.target || typeof e.target !== 'object') {
      console.error('handleChange called without a valid event target');
      return;
    }
    const { name, value, type, checked } = e.target;
    if (typeof name === 'undefined') {
      console.error(
        'handleChange called on an element without a "name" attribute'
      );
      return;
    }
    const fieldValue = type === 'checkbox' ? checked : value;
    values.current[name] = fieldValue;
    console.log('Form field changed:', name, fieldValue);
    console.log('Currrent values:', name, values.current[name]);
    if (name === 'searchTerm' && typeof fieldValue === 'string') {
      console.log('Form data is valid:', fieldValue);
      handleRequest(fieldValue); // Use handleRequest for the search form
    }

    // handleFieldChange(e.target.formId, name, fieldValue);
  }, []);
  const handleFocus = useCallback((e) => {
    const { name } = e.target;
    touched.current[name] = true;
    console.log('Form field focused:', name);
  }, []);
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    dirty.current[name] = true;
    console.log('Form field blurred:', name);
  }, []);
  // EFFECT: Setting all forms when the component mounts
  useEffect(() => {
    console.log('SETTING ALL FORMS:', formSchemas);
    handleSetAllForms(formSchemas);
  }, [handleSetAllForms]);
  useEffect(() => {
    methods.reset(getDefaultValuesFromSchema(formSchemas[currentSchemaKey]));
  }, [currentSchemaKey, methods]);
  const setInitialValues = useCallback(
    (newInitialValues) => {
      if (newInitialValues) {
        console.log('Setting initial values:', newInitialValues);
        methods.reset(newInitialValues);
      }
    },
    [methods]
  );
  // EFFECT: When the currentSchemaKey changes, reset the form state
  // useEffect(() => {
  //   console.log(
  //     'FormProvider: Setting up form handlers',
  //     Object.keys(formHandlers),
  //     'Current Schema Key:',
  //     currentSchemaKey
  //   );
  //   setFormSchema(currentSchemaKey);
  //   // console.log('SETTING INITIAL VALUES:', initialValues);
  //   // methods.reset(getDefaultValuesFromSchema(formSchemas[currentSchemaKey]));
  // }, [currentSchemaKey, setFormSchema]);
  // // EFFECT: Setting initial values when the form schema changes
  // useEffect(() => {
  //   console.log('SETTING INITIAL VALUES:', initialValues);
  //   methods.reset(getDefaultValuesFromSchema(formSchemas[currentSchemaKey]));
  // }, [currentSchemaKey, methods]);
  // EFFECT: When the initialValues prop changes, update the form state
  // useEffect(() => {
  //   if (initialValues) {
  //     console.log('Setting initial values:', initialValues);
  //     setInitialValues(initialValues);
  //   }
  // }, [initialValues, setInitialValues]);

  const contextValue = useMemo(
    () => ({
      ...methods,
      formMethods: methods,
      formStates: methods.control._formValues, // Directly use form state from useForm
      touched,
      dirty,
      initialValues,
      isFormDataLoading: isFormDataLoading,
      currentSchemaKey,
      currentForm: currentSchemaKey,
      forms,
      getValues: methods.getValues,
      // handleTimeRangeChange,
      handleSearchTermChange,
      handleFieldChange,
      handleChange,
      handleFocus,
      handleBlur,
      setFormSchema,
      setCurrentForm: setFormSchema,
      setInitialValues,
      onSubmit: methods.handleSubmit(onSubmit),
      onChange,
      // onChange: methods.handleChange(onChange),
      toggleForm: (formId) => {
        console.log('TOGGLE FORM:', formId);
        setFormSchema(formId);
      },
    }),
    [
      methods,
      formStates,
      values,
      touched,
      dirty,
      initialValues,
      formSchemas,
      isFormDataLoading,

      // handleTimeRangeChange,
      handleSearchTermChange,
      handleFieldChange,
      handleChange,
      handleFocus,
      handleBlur,
      setFormSchema,
      onSubmit,
      onChange,
      handleSetAllForms,
      setInitialValues,
      currentSchemaKey,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
