import { useCallback, useState } from 'react';

export const useFormSubmission = (formHandlers, activeForm) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (formData) => {
      setIsSubmitting(true);
      try {
        const handler = formHandlers[activeForm];
        if (!handler) {
          console.error(`No handler for form type: ${activeForm}`);
          return;
        }
        await handler(formData);
      } catch (error) {
        console.error(`Error submitting form: ${activeForm}`, error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formHandlers, activeForm]
  );

  return { onSubmit, isSubmitting };
};

// import { useCallback, useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { formSchemas, getDefaultValuesFromSchema } from './schemas'; // Adjust path as necessary
// import { useFormManagement } from './useFormManagement';
// import { useRCFormHook } from '../Factory/useRCFormHook';
// import useAuthManager from '../../../context/MAIN_CONTEXT/AuthContext/useAuthManager';
// import useCollectionManager from '../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
// import useDeckManager from '../../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
// import { useCardStoreHook } from '../../../context/MAIN_CONTEXT/CardContext/useCardStore';

// export const useFormSubmission = () => {
//   const { control, handleSubmit, reset } = useRCFormHook(); // Assuming this hooks properly sets up the form
//   const {
//     setActiveFormSchema,
//     getActiveFormSchema,
//     toggleActiveForm,
//     getActiveFormDefaultValues,
//   } = useFormManagement();
//   const { signup, login } = useAuthManager();
//   const { createNewCollection, updateCollection } = useCollectionManager();
//   const { updateDeckDetails, deleteDeck, createNewDeck } = useDeckManager();
//   const { setSearchSettings } = useCardStoreHook();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const formHandlers = {
//     signupForm: async (formData) => signup(formData),
//     loginForm: async (formData) => login(formData),
//     updateUserDataForm: (formData) => console.log(formData),
//     addCollectionForm: (formData, additionalData) =>
//       createNewCollection(formData, additionalData),
//     updateCollectionForm: (formData, additionalData) =>
//       updateCollection(additionalData, formData),
//     updateDeckForm: (formData, additionalData) =>
//       updateDeckDetails(formData, additionalData),
//     addDeckForm: (formData, additionalData) =>
//       createNewDeck(formData, additionalData),
//     deleteDeckForm: (formData, additionalData) =>
//       deleteDeck(formData, additionalData),
//     searchForm: (formData, additionalData) =>
//       setSearchSettings(formData, additionalData),
//     collectionSearchForm: (formData, additionalData) =>
//       console.log(formData, additionalData),
//     // timeRangeSelector: (formData, additionalData) =>
//     //   handleTimeRangeChange(formData, additionalData),
//     searchSettingsSelector: (formData, additionalData) =>
//       setSearchSettings(formData, additionalData),
//     rememberMeForm: (formData) => {
//       // Implement remember me form submission logic here
//       console.log('Remember Me Form Data:', formData);
//     },
//     authSwitch: (formData) => {
//       console.log('Auth Switch Form Data:', formData);
//       toggleActiveForm('loginForm', 'signupForm');
//     },
//   };

//   const onSubmit = useCallback(
//     async (formData) => {
//       setIsSubmitting(true);
//       const currentSchemaKey = getActiveFormSchema(); // Get the current active form's schema key
//       try {
//         const handler = formHandlers[currentSchemaKey];
//         if (!handler) {
//           console.error(`No handler for form type: ${currentSchemaKey}`);
//           return;
//         }
//         await handler(formData);
//       } catch (error) {
//         console.error(`Error submitting form: ${currentSchemaKey}`, error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     // Ensure to include all dependencies that the callback uses
//     [formHandlers, getActiveFormSchema]
//   );

//   useEffect(() => {
//     const currentSchemaKey = getActiveFormSchema();
//     const defaultValues = getActiveFormDefaultValues(currentSchemaKey); // Assuming this function exists and fetches default values correctly
//     reset(defaultValues);
//   }, [getActiveFormSchema, reset]);

//   return { control, handleSubmit: handleSubmit(onSubmit), isSubmitting };
// };
