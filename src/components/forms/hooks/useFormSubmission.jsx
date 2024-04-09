import { useCallback, useState } from 'react';

export const useFormSubmission = (formHandlers, activeForm) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (formData) => {
      setIsSubmitting(true);
      console.log('SUCCESSFULLY SUBMITTED', formData);
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
