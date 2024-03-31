import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const useRCFormHook = (schemaKey, schemas, defaultValues = {}) => {
  const schema = schemas[schemaKey];
  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues, // Use provided default values to initialize the form
  });

  return methods;
};
export default useRCFormHook;
