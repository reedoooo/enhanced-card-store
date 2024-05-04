import { useCallback, useState } from 'react';
import { handleValidation, zodSchemas } from '../../data/formsConfig';

export const useFormSubmission = (formHandlers, formKey) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const activeSchema = zodSchemas[formKey];
  const onSubmit = useCallback(
    async (formData) => {
      // handleValidation
      setIsSubmitting(true);
      console.log('[ACTIVE FORM]', formKey);
      console.log('[FORM DATA]', formData);
      const validationResult = handleValidation(activeSchema, formData);
      if (!validationResult.success) {
        console.error('[INVALID RESULT]', validationResult);
        setIsSubmitting(false);
        return validationResult;
      }

      console.log('[VALID RESULT]', validationResult);
      try {
        const handler = formHandlers[formKey];
        if (!handler) {
          console.error(`No handler for form type: ${formKey}`);
          setIsSubmitting(false);
          return;
        }
        await handler(formData);
      } catch (error) {
        console.error(`Error submitting form: ${formKey}`, error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formHandlers, formKey, activeSchema]
  );

  return { onSubmit, isSubmitting };
};
