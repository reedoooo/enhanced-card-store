/* eslint-disable @typescript-eslint/no-empty-function */
export const defaultContextValue = {
  forms: {},
  formErrors: {},
  initialFormStates: {},
  currentForm: {},
  setForms: () => {},
  setFormErrors: () => {},
  setCurrentForm: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
  resetForm: () => {},
  handleRequest: () => {},
};

// Utility function to set value at a given path in an object
export const setValueAtPath = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = current[keys[i]] || {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
};

// Initial state for different forms
export const initialFormStates = {
  loginForm: {
    securityData: {
      username: '',
      password: '',
      email: '',
      role_data: {
        name: 'admin',
        capabilities: ['create', 'read', 'update', 'delete'],
      },
    },
    basicData: {
      firstName: '',
      lastName: '',
    },
  },
  signupForm: {
    securityData: {
      username: '',
      password: '',
      email: '',
      role_data: {
        name: 'admin',
        capabilities: ['create', 'read', 'update', 'delete'],
      },
    },
    basicData: {
      firstName: '',
      lastName: '',
    },
  },
  updateUserDataForm: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role_data: {
      name: 'admin',
      capabilities: ['create', 'read', 'update', 'delete'],
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
      // New form with same initial values as updateCollectionForm
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
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    timezone: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  // securityData: {
  //   username: '',
  //   password: '',
  //   email: '',
  //   role_data: {
  //     name: 'admin',
  //     capabilities: ['create', 'read', 'update', 'delete'],
  //   },
  // },
  // basicData: {
  //   firstName: '',
  //   lastName: '',
  // },
  // searchData: {
  //   searchTerm: '',
  //   searchParams: {
  //     name: '',
  //     race: '',
  //     type: '',
  //     level: '',
  //     rarity: '',
  //     attribute: '',
  //     id: '',
  //   },
  // },
  // ...other form types as needed
};
