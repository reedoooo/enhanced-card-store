// schemas.js
import { z } from 'zod';

export const defaultSchema = z.object({});

export const signupFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  email: z.string().email('Invalid email address'),
});

export const loginFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const updateUserDataFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  role_data: z.object({
    name: z.string().min(1, 'Role name is required'),
    capabilities: z.array(z.string()),
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'gender is required'),
  age: z.string().min(1, 'Age is required'),
  status: z.string().min(1, 'Status is required'),
  signupMode: z.boolean(),
});

export const collectionFormSchema = z.object({
  updateCollectionForm: z.object({
    name: z.string().min(1, 'Collection name is required'),
    description: z.string().min(1, 'Description is required'),
  }),
  addCollectionForm: z.object({
    name: z.string().min(1, 'Collection name is required'),
    description: z.string().min(1, 'Description is required'),
  }),
});

export const searchFormSchema = z.object({
  searchTerm: z.string().min(1, 'Search term is required'),
  searchParams: z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Type is required'),
    race: z.string().min(1, 'Race is required'),
    archetype: z.string().min(1, 'Archetype is required'),
    attribute: z.string().min(1, 'Attribute is required'),
    level: z.string().min(1, 'Level is required'),
  }),
});

export const customerInfoFieldsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.object({
    line1: z.string().min(1, 'Address is required'),
    line2: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'Zip is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  timezone: z.string().min(1, 'Timezone is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().min(1, 'Email is required'),
});
// Export the default values for all schemas
const defaultValues = {
  signupForm: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
  },
  loginForm: {
    username: '',
    password: '',
  },
  updateUserDataForm: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role_data: {
      name: '',
      capabilities: [],
    },
    dateOfBirth: '',
    gender: '',
    age: '',
    status: '',
    signupMode: false,
  },
  collectionForm: {
    updateCollectionForm: {
      name: '',
      description: '',
    },
    addCollectionForm: {
      name: '',
      description: '',
    },
  },
  searchForm: {
    searchTerm: '',
    searchParams: {
      name: '',
      type: '',
      race: '',
      archetype: '',
      attribute: '',
      level: '',
    },
  },
  customerInfoFields: {
    firstName: '',
    lastName: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    timezone: '',
    phone: '',
    email: '',
  },
};

const createSchemaWithDefaultValues = (schema) => {
  const defaultValues = {};

  for (const key in schema.shape) {
    const field = schema.shape[key];

    // Check if it's an object with nested fields
    if (field instanceof z.object) {
      defaultValues[key] = createSchemaWithDefaultValues(field);
    } else {
      defaultValues[key] = '';
    }
  }

  return defaultValues;
};

const defaultSchemaWithDefaultValues =
  createSchemaWithDefaultValues(defaultSchema);

export const formSchemas = {
  signupForm: signupFormSchema,
  loginForm: loginFormSchema,
  updateUserDataForm: updateUserDataFormSchema,
  collectionForm: collectionFormSchema,
  searchForm: searchFormSchema,
  customerInfoFields: customerInfoFieldsSchema,
  default: defaultSchemaWithDefaultValues,
  defaultValues,
};
