import { z } from 'zod';

/* eslint-disable @typescript-eslint/no-empty-function */
export const defaultContextValue = {
  forms: {},
  formErrors: {},
  initialFormStates: {},
  currentForm: {},
  schemas: {},
  currentFormType: '',
  errors: {},
  setForms: () => {},
  setFormErrors: () => {},
  setCurrentForm: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
  resetForm: () => {},
  handleRequest: () => {},
  register: () => {},
  setFormType: () => {},
  setCurrentFormType: () => {},
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
// export const schemas = {
//   loginForm: z.object({
//     securityData: z.object({
//       username: z.string(),
//       password: z.string(),
//       email: z.string(),
//       role_data: z.object({
//         name: z.string(),
//         capabilities: z.array(z.string()),
//       }),
//     }),
//     basicData: z.object({
//       firstName: z.string(),
//       lastName: z.string(),
//     }),
//   }),
//   signupForm: z.object({
//     securityData: z.object({
//       username: z.string(),
//       password: z.string(),
//       email: z.string(),
//       role_data: z.object({
//         name: z.string(),
//         capabilities: z.array(z.string()),
//       }),
//     }),
//     basicData: z.object({
//       firstName: z.string(),
//       lastName: z.string(),
//     }),
//   }),
//   updateUserDataForm: z.object({
//     firstName: z.string(),
//     lastName: z.string(),
//     email: z.string(),
//     phone: z.string(),
//     role_data: z.object({
//       name: z.string(),
//       capabilities: z.array(z.string()),
//     }),
//     dateOfBirth: z.string(),
//     gender: z.string(),
//     age: z.string(),
//     status: z.string(),
//     signupMode: z.boolean(),
//   }),
//   collectionForm: z.object({
//     updateCollectionForm: z.object({
//       name: z.string(),
//       description: z.string(),
//     }),
//     addCollectionForm: z.object({
//       name: z.string(),
//       description: z.string(),
//     }),
//   }),
//   searchForm: z.object({
//     searchTerm: z.string(),
//     searchParams: z.object({
//       name: z.string(),
//       type: z.string(),
//       race: z.string(),
//       archetype: z.string(),
//       attribute: z.string(),
//       level: z.string(),
//     }),
//   }),
//   customerInfoFields: z.object({
//     firstName: z.string(),
//     lastName: z.string(),
//     address: z.object({
//       line1: z.string(),
//       line2: z.string(),
//       city: z.string(),
//       state: z.string(),
//       zip: z.string(),
//       country: z.string(),
//     }),
//     timezone: z.string(),
//     phone: z.string(),
//     email: z.string(),
//   }),
// };

// loginForm: {
//   securityData: {
//     username: '',
//     password: '',
//     email: '',
//     role_data: {
//       name: 'admin',
//       capabilities: ['create', 'read', 'update', 'delete'],
//     },
//   },
//   basicData: {
//     firstName: '',
//     lastName: '',
//   },
// },
// signupForm: {
//   securityData: {
//     username: '',
//     password: '',
//     email: '',
//     role_data: {
//       name: 'admin',
//       capabilities: ['create', 'read', 'update', 'delete'],
//     },
//   },
//   basicData: {
//     firstName: '',
//     lastName: '',
//   },
// },
// updateUserDataForm: {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   role_data: {
//     name: 'admin',
//     capabilities: ['create', 'read', 'update', 'delete'],
//   },
//   dateOfBirth: '',
//   gender: '',
//   age: '',
//   status: '',
//   signupMode: false,
// },
// collectionForm: {
//   updateCollectionForm: {
//     name: '',
//     description: '',
//   },
//   addCollectionForm: {
//     // New form with same initial values as updateCollectionForm
//     name: '',
//     description: '',
//   },
// },
// searchForm: {
//   searchTerm: '',
//   searchParams: {
//     name: '',
//     type: '',
//     race: '',
//     archetype: '',
//     attribute: '',
//     level: '',
//   },
// },
// customerInfoFields: {
//   firstName: '',
//   lastName: '',
//   address: {
//     line1: { type: String },
//     line2: { type: String },
//     city: { type: String },
//     state: { type: String },
//     zip: { type: String },
//     country: { type: String },
//   },
//   timezone: { type: String },
//   phone: { type: String },
//   email: { type: String },
// },
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
