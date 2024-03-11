// schemas.js
import { ZodError, z } from 'zod';
import { defaultChartConstants } from '../../constants';

const GenericStringConstraint = z.string().min(8).max(18);
const EmailConstraint = z
  .string()
  .email({ message: 'Invalid email format' })
  .min(1, { message: 'Email is required' });
const UsernameConstraint = z
  .string()
  .min(3, { message: 'Username must be at least 3 characters' })
  .max(255, { message: 'Username must not be more than 255 characters' });
const PasswordConstraint = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' })
  .max(1024, { message: 'Password must not be more than 1024 characters' });
// Define basic constraints
const nameConstraint = z
  .string()
  .min(1, { message: 'Name is required' })
  .max(255);
const descriptionConstraint = z
  .string()
  .min(1, { message: 'Description is required' });
const tagConstraint = z.array(z.string());
const colorConstraint = z.enum(['red', 'blue', 'green', 'yellow'], {
  message: 'Invalid color',
});

const signupForm = z.object({
  firstName: GenericStringConstraint,
  lastName: GenericStringConstraint,
  username: UsernameConstraint,
  password: PasswordConstraint,
  email: EmailConstraint,
});
const loginForm = z.object({
  username: UsernameConstraint,
  password: PasswordConstraint,
});
const rememberMeFormSchema = z.object({
  rememberMe: z.boolean().default(false),
});
const authSwitchSchema = z.object({
  signupMode: z.boolean().default(false),
});
// Update User Data Form Schema
const updateUserDataForm = z.object({
  firstName: nameConstraint,
  lastName: nameConstraint,
  email: z.string().email({ message: 'Invalid email format' }),
  phone: z.string().min(10, { message: 'Invalid phone number' }),
  role_data: z.object({
    name: nameConstraint,
    capabilities: z.array(z.string()),
  }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  age: z.number().min(0, { message: 'Invalid age' }),
  status: z.string().min(1, { message: 'Status is required' }),
  signupMode: z.boolean(),
});
// Collection Form Schemas
const addCollectionForm = z.object({
  name: nameConstraint,
  description: descriptionConstraint,
});

const updateCollectionForm = addCollectionForm;
// Deck Form Schemas
const addDeckForm = z.object({
  name: nameConstraint,
  description: descriptionConstraint,
  tags: tagConstraint,
  color: colorConstraint,
});

const updateDeckForm = addDeckForm;
// Search Form Schema
const searchForm = z.object({
  searchTerm: z.string().min(1, { message: 'Search term is required' }),
  searchParams: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    race: z.string().optional(),
    archetype: z.string().optional(),
    attribute: z.string().optional(),
    level: z.string().optional(),
  }),
});
// Customer Info Fields Schema
const customerInfoForm = z.object({
  firstName: nameConstraint,
  lastName: nameConstraint,
  address: z.object({
    line1: z.string().min(1, { message: 'Address line 1 is required' }),
    line2: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zip: z.string().min(1, { message: 'Zip code is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
  timezone: z.string().min(1, { message: 'Timezone is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
});
// const TimeRangeSchema = z.object({
//   timeRange: z.object({
//     id: z.string(
//       'Invalid time range ID. Please select a valid time range from the list.'
//     ),
//     value: z.string(
//       'Invalid time range value. Please select a valid time range from the list.'
//     ),
//     name: z.string(
//       'Invalid time range name. Please select a valid time range from the list.'
//     ),
//   }),
// });

// const timeRangeSchema = z.object({
//   timeRange: z.enum(['24hr', '7d', '30d', '90d', '180d', '270d', '365d']),
// });
const timeRangeOptionSchema = z.object({
  id: z.string(
    'Invalid time range ID. Please select a valid time range from the list.'
  ),
  value: z.string(),
  name: z.string(),
  data: z.array(
    z.object({
      x: z.number(),
      y: z.number(),
    })
  ),
});

// const timeRangeSchema = z.object({
//   timeRange: timeRangeOptionSchema,
// });
const timeRangeSelectorSchema = z.object({
  timeRange: z.string().nonempty({
    message: 'You must select a time range.',
  }),
});
// Define a schema for a single filter's values
const filterValueSchema = z.enum([
  'Unset',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'Aqua',
  'Beast',
  'Effect Monster',
  'Flip Effect Monster',
  'Dark',
  'Divine',
  'Earth',
  'Fire',
  'Light',
  'Water',
  'Wind',
]);
const filterSchema = z.object({
  label: z.string(),
  name: z.string(),
  values: z.array(filterValueSchema),
});
const initialStateSchema = z.object({
  name: z.string(),
  race: z.string().optional(),
  type: z.string().optional(),
  attribute: z.string().optional(),
  level: z.string().optional(),
});
const dataSchema = z.object({
  initialState: initialStateSchema,
  filters: z.array(filterSchema),
});
// Usage example:
const data = {
  initialState: {
    name: '',
    race: '',
    type: '',
    attribute: '',
    level: '',
  },
  filters: [
    {
      label: 'Level',
      name: 'level',
      values: [
        'Unset',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
    },
    {
      label: 'Race',
      name: 'race',
      values: ['Unset', 'Aqua', 'Beast'],
    },
    {
      label: 'Type',
      name: 'type',
      values: ['Unset', 'Effect Monster', 'Flip Effect Monster'],
    },
    {
      label: 'Attribute',
      name: 'attribute',
      values: [
        'Unset',
        'Dark',
        'Divine',
        'Earth',
        'Fire',
        'Light',
        'Water',
        'Wind',
      ],
    },
  ],
};

// const parsedData = dataSchema.safeParse(data);
// if (parsedData.success) {
//   console.log('Validation successful', parsedData.data);
// } else {
//   console.error('Validation failed', parsedData.error);
// }
export const formSchemas = {
  signupForm,
  loginForm,
  rememberMeForm: rememberMeFormSchema,
  authSwitch: authSwitchSchema,

  updateUserDataForm,
  addCollectionForm,
  updateCollectionForm,
  addDeckForm,
  updateDeckForm,
  searchForm,
  customerInfoForm,
  timeRangeSelector: timeRangeSelectorSchema,
  searchSettingsSelector: dataSchema,
};
export const handleZodValidation = (formData, schema) => {
  try {
    const result = schema?.safeParse(formData);
    return { isValid: true, data: result };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation errors:', error.flatten());
      return { isValid: false, errors: error.flatten() };
    } else {
      console.error('Unexpected validation error:', error);
      return {
        isValid: false,
        errors: { form: 'An unexpected error occurred.' },
      };
    }
  }
};
export const getDefaultValuesFromSchema = (schema) => {
  return Object.keys(schema.shape).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});
};

export const defaultValues = {
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
  addCollectionForm: {
    name: '',
    description: '',
  },
  updateCollectionForm: {
    name: '',
    description: '',
  },
  addDeckForm: {
    name: '',
    description: '',
    tags: [],
    // eslint-disable-next-line quotes
    color: `red`,
  },
  updateDeckForm: {
    name: '',
    description: '',
    tags: [],
    // eslint-disable-next-line quotes
    color: `red`,
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
  customerInfoForm: {
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
  // SELECTOR FORMS
  timeRangeSelector: {
    initialState: defaultChartConstants.TIME_RANGES[0],
    filters: defaultChartConstants.TIME_RANGES,
  },
  searchSettingsSelector: {
    initialData: {
      name: '',
      type: '',
      race: '',
      archetype: '',
      attribute: '',
      level: '',
    },
    filters: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        values: [],
      },
    ],
  },
};
