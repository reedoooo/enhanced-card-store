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
import { useCardStoreHook } from '../../hooks/useCardStore';
import useCollectionManager from '../../MAIN_CONTEXT/CollectionContext/useCollectionManager';
import { useDeckStore } from '../../MAIN_CONTEXT/DeckContext/DeckContext';
import { useChartContext } from '../../MAIN_CONTEXT/ChartContext/ChartContext';
import { useLoading } from '../../hooks/useLoading';
const initializeFormState = (schema) =>
  Object.keys(schema).reduce((acc, key) => ({ ...acc, [key]: false }), {});

const FormContext = createContext(defaultContextValue.FORM_CONTEXT);

export const FormProvider = ({ children }) => {
  const { signup, login, isLoggedIn, userId } = useAuthContext();
  const { handleRequest, setSearchSettings, searchSettings } =
    useCardStoreHook();
  const { createNewCollection, updateAndSyncCollection, selectedCollection } =
    useCollectionManager();
  const { updateDeckDetails, deleteUserDeck, createUserDeck } = useDeckStore();
  const { setTimeRange } = useChartContext();

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
  // Use useCallback to ensure these functions are memoized
  const setFormSchema = useCallback(
    (schemaKey) => {
      setCurrentSchemaKey(schemaKey);
      const schema = formSchemas[schemaKey];
      const defaultValues = getDefaultValuesFromSchema(schema);
      methods.reset(defaultValues);
    },
    [methods]
  );
  const initialValues = getDefaultValuesFromSchema(
    formSchemas[Object.keys(formSchemas)[0]]
  );
  const values = useRef(initialValues);
  const touched = useRef(initializeFormState(formSchemas));
  const dirty = useRef(initializeFormState(formSchemas));
  const handleTimeRangeChange = useCallback(
    (timeRangeValue) => {
      console.log('TIME RANGE CHANGE', timeRangeValue);
      // Example: setTimeRange could update the context state and trigger re-renders or API calls as needed
      setTimeRange(timeRangeValue);
    },
    [setTimeRange]
  );
  const handleFieldChange = (formId, field, value) => {
    setFormStates((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [field]: value,
      },
    }));
  };
  const toggleAuthMode = () => {
    setCurrentSchemaKey((prevForm) =>
      prevForm === 'loginForm' ? 'signupForm' : 'loginForm'
    );
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
      updateAndSyncCollection(additionalData, formData),
    createCollectionForm: (formData, additionalData) =>
      createNewCollection(additionalData, formData),
    updateDeckForm: (formData, additionalData) =>
      updateDeckDetails(formData, additionalData),
    addDeckForm: (formData, additionalData) =>
      console.log(formData, additionalData),
    searchForm: (formData, additionalData) =>
      setSearchSettings(formData, additionalData),
    ollectionSearchForm: (formData, additionalData) =>
      console.log(formData, additionalData),
    timeRangeSelector: (formData, additionalData) =>
      handleTimeRangeChange(formData),
    searchSettingsSelector: (formData, additionalData) =>
      setSearchSettings(formData),
    rememberMeForm: (formData) => {
      // Implement remember me form submission logic here
      console.log('Remember Me Form Data:', formData);
    },
    authSwitch: (formData) => {
      console.log('Auth Switch Form Data:', formData);
      toggleAuthMode();
    },
  };
  const onSubmit = useCallback(
    async (formData) => {
      startLoading(currentSchemaKey);

      const formHandler = formHandlers[currentSchemaKey];
      try {
        console.log(`Submitting form: ${currentSchemaKey}`, formData);
        await formHandler(formData);
      } catch (error) {
        console.error(`Error submitting ${currentSchemaKey}:`, error);
      } finally {
        stopLoading(currentSchemaKey);
      }
    },
    [
      currentSchemaKey,
      handleTimeRangeChange,
      setSearchSettings,
      startLoading,
      stopLoading,
      formHandlers,
    ]
  );
  useEffect(() => {
    setFormSchema(currentSchemaKey);
  }, [currentSchemaKey, setFormSchema]);
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
    if (formData === false) {
      console.log('Signup Mode:', validation.data.signupMode);
      toggleAuthMode();
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

    // Ensure that the event target has a 'name' property
    if (typeof name === 'undefined') {
      console.error(
        'handleChange called on an element without a "name" attribute'
      );
      return;
    }
    console.log('e.target:', e.target);
    const fieldValue = type === 'checkbox' ? checked : value;
    values.current[name] = fieldValue;
    console.log('Form field changed:', name, fieldValue);
    console.log('Search form field changed:', name, fieldValue);
    if (name === 'searchTerm' && typeof fieldValue === 'string') {
      console.log('Form data is valid:', fieldValue);
      handleRequest(fieldValue); // Use handleRequest for the search form
    }

    handleFieldChange(e.target.formId, name, fieldValue);
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
  useEffect(() => {
    console.log('SETTING ALL FORMS:', formSchemas);
    handleSetAllForms(formSchemas);
  }, [handleSetAllForms]);

  useEffect(() => {
    methods.reset(getDefaultValuesFromSchema(formSchemas[currentSchemaKey]));
  }, [currentSchemaKey, methods]);

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
      getValues: methods.getValues,
      handleTimeRangeChange,
      handleSearchTermChange,
      handleFieldChange,
      handleChange,
      handleFocus,
      handleBlur,
      setFormSchema,
      setCurrentForm: setFormSchema,
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

      handleTimeRangeChange,
      handleSearchTermChange,
      handleFieldChange,
      handleChange,
      handleFocus,
      handleBlur,
      setFormSchema,
      onSubmit,
      onChange,
      handleSetAllForms,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
// switch (formId) {
//   case 'signupForm':
//     await signup(
//       formData.firstName,
//       formData.lastName,
//       formData.username,
//       formData.password,
//       formData.email
//     );
//     break;
//   case 'loginForm':
//     await login(formData.username, formData.password);
//     break;
//   case 'updateUserDataForm':
//     // await updateUserData(formData);
//     break;
//   case 'updateCollectionForm':
//     await updateAndSyncCollection(additionalData, formData);
//     break;
//   case 'addCollectionForm':
//     await createNewCollection(formData);
//     break;
//   case 'updateDeckForm':
//     await updateDeckDetails(formData);
//     break;
//   case 'addDeckForm':
//     await createUserDeck(formData.name, formData.description);
//     break;
//   case 'searchForm':
//     await handleRequest(formData.searchTerm);
//     break;
//   case 'timeRangeSelector':
//     console.log('Time range selected:', formData.timeRange);
//     handleTimeRangeChange(formData.timeRange); // Directly use formData.timeRange
//     break;
//   case 'searchSettingsSelector':
//     setSearchSettings(formData);
//     break;
//   default:
//     console.error('Unhandled form submission:', formId);
// }
// Function to dynamically set the current form and its schema
// const setCurrentForm = useCallback((formId) => {
//   setCurrentFormId(formId);
// }, []);
// const useFormMethods = useCallback((formId) => {
//   const schema = formSchemas[formId] || formSchemas.default;
//   return useForm({
//     resolver: zodResolver(schema),
//     defaultValues: schema.safeParse({}), // Assuming you have a parse method to get default values from Zod schema
//   });
// }, []);
// Initialize useForm with the first form schema as default
// const initialFormKey = Object.keys(formSchemas)[0];
// const methods = useForm({
//   resolver: zodResolver(formSchemas[initialFormKey]),
//   defaultValues: getDefaultValuesFromSchema(formSchemas[initialFormKey]),
// });
// const [forms, setForms] = useState({});

// const [currentForm, setCurrentForm] = useState({});
// const onSubmit = useCallback(async (formData, formId, additionalData) => {

//   setIsFormDataLoading(true);
//   // const validation = handleZodValidation(formData, formSchemas[formId]);
//   // console.log('isValid:', validation.isValid);
//   try {

//     try {
//       if (formId === 'signupForm') {
//         console.log('Submitting signup form:', formData);
//         await signup(
//           formData.firstName,
//           formData.lastName,
//           formData.username,
//           formData.password,
//           formData.email
//         );
//       } else if (formId === 'loginForm') {
//         console.log('Submitting login form:', formData);
//         await login(formData.username, formData.password);
//       } else if (formId === 'updateUserDataForm') {
//         console.log('Submitting update user data form:', formData);
//         // await updateUserData(formData);
//       } else if (formId === 'updateCollectionForm') {
//         console.log('Updating collection:', formData);
//         console.log('Selected collection:', additionalData);

//         const updatedData = {
//           name: formData.name,
//           description: formData.description,
//         };
//         await updateAndSyncCollection(additionalData, updatedData);
//       } else if (formId === 'addCollectionForm') {
//         console.log('Adding collection:', formData);
//         const newData = {
//           name: formData.name,
//           description: formData.description,
//         };
//         await createNewCollection(newData);
//       } else if (formId === 'updateDeckForm') {
//         console.log('Updating deck:', formData);
//         await updateDeckDetails(formData);
//       } else if (formId === 'addDeckForm') {
//         console.log('Adding deck:', formData);
//         await createUserDeck(formData.name, formData.description);
//       } else if (formId === 'searchForm') {
//         console.log('Submitting search form:', formData);
//         await handleRequest(formData.searchTerm); // Use handleRequest for the search form
//       } else if (formId === 'TimeRangeSchema') {
//         console.log('Submitting TimeRange form:', formData);
//         setTimeRange(formData.timeRange);
//         // handleTimeRangeChange(formData);
//       } else if (formId === 'searchSettingsForm') {
//         console.log('Submitting SearchSettings form:', formData);
//         setSearchSettings(formData);
//       } else if (formId === 'defaultForm') {
//         console.log('Submitting default form:', formData);
//       }
//       console.log(`${formId} form submitted successfully`, formData);
//       // Reset form logic here if needed
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     } finally {
//       setIsFormDataLoading(false);
//     }
//   } else {
//     console.error('Form validation failed:', validation.errors);
//     // Optionally, display validation.errors using your UI logic
//     setIsFormDataLoading(false);
//   }
