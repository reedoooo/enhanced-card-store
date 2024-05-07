import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodSchemas } from 'data';

const useRCFormHook = (schemaKey) => {
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
    defaultValues,
  });

  return methods;
};

export default useRCFormHook;
