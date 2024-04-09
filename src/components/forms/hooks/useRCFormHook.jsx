import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { formFields, zodSchemas } from '../formsConfig';
// Function to extract default values from a Zod schema
// const extractDefaultValues = (schema) => {
//   return Object.keys(schema.shape).reduce((acc, key) => {
//     const fieldDefinition = schema.shape[key];
//     // Check for the existence of a default value in the Zod schema definition
//     if (fieldDefinition._def.defaultValue) {
//       acc[key] = fieldDefinition._def.defaultValue();
//     }
//     return acc;
//   }, {});
// };
// Inside your useRCFormHook
const useRCFormHook = (schemaKey, initialData) => {
  console.log('SCHEMA KEY', schemaKey);
  const schema = zodSchemas[schemaKey];
  const defaultValues = Object.keys(schema.shape).reduce((acc, key) => {
    const fieldDefinition = schema.shape[key];
    if (fieldDefinition._def.defaultValue) {
      acc[key] = fieldDefinition._def.defaultValue();
    }
    return acc;
  }, {});
  if (!schema) {
    console.error(`No Zod schema found for key: ${schemaKey}`);
    throw new Error(`No Zod schema found for key: ${schemaKey}`);
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: !initialData ? defaultValues : null,
  });

  useEffect(() => {
    console.log('[1] FORMSTATE: ', methods.getValues());
    console.log(`[2] ${schemaKey} SCHEMA REGISTERED: `, schema);
  }, [methods, schemaKey, schema]);

  return methods;
};

export default useRCFormHook;
