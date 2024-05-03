/* eslint-disable @typescript-eslint/no-empty-function */
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { z } from 'zod';
import useAuthManager from '../../context/useAuthManager';
import { useCardStoreHook } from '../../context/useCardStore';
import useManager from '../../context/useManager';
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ---------------------------- FORM FIELD HANDLERS ----------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const getFormFieldHandlers = () => {
  const { signup, login } = useAuthManager();
  const { handleRequest } = useCardStoreHook();
  const {
    addCollection,
    updateCollection,
    deleteDeck,
    addDeck,
    updateDeck: updateDeckDetails,
    // selectedCollection,
  } = useManager();

  const formHandlers = {
    loginForm: (formData) => {
      console.log('Login Form Data:', formData);
      login(formData);
    },
    signupForm: (formData) => {
      console.log('Signup Form Data:', formData);
      signup(formData);
    },
    updateUserForm: (formData) => {
      console.log('Update User Data Form Data:', formData);
    },
    addCollectionForm: (formData, additionalData) => {
      console.log('Add Collection Form Data:', formData, additionalData);
      addCollection(formData, additionalData);
    },
    updateCollectionForm: (formData, additionalData) => {
      console.log('Update Collection Form Data:', formData, additionalData);
      updateCollection(formData);
    },
    updateDeckForm: (formData) => {
      console.log('Update Deck Form Data:', formData);
      updateDeckDetails(formData);
    },
    addDeckForm: (formData, additionalData) => {
      console.log('Add Deck Form Data:', formData, additionalData);
      addDeck(formData, additionalData);
    },
    deleteDeckForm: (formData, additionalData) => {
      console.log('Delete Deck Form Data:', formData, additionalData);
      deleteDeck(formData);
    },
    searchForm: (formData, additionalData) => {
      console.log('Search Form Data:', formData, additionalData);
      handleRequest(formData, additionalData);
    },
    collectionSearchForm: (formData, additionalData) => {
      console.log('Collection Search Form Data:', formData, additionalData);
    },
    statRangeForm: (formData) => {
      console.log('Stat Range Form Data:', formData);
    },
    themeRangeForm: (formData) => {
      console.log('Theme Range Form Data:', formData);
    },
    timeRangeForm: (formData) => {
      console.log('Time Range Selector Form Data:', formData);
    },
    searchSettingsForm: (formData, additionalData) => {
      console.log(
        'Search Settings Selector Form Data:',
        formData,
        additionalData
      );
    },

    rememberMeForm: (formData) => {
      console.log('Remember Me Form Data:', formData);
    },
    authSwitch: (formData) => {
      console.log('Auth Switch Form Data:', formData);
    },
  };
  return formHandlers;
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ---------------------------- FORM FIELD VALUES ------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const loginFormFields = {
  username: {
    label: 'Username',
    name: 'username',
    type: 'text',
    placeHolder: 'Username',
    helperText: 'Enter your username',
    defaultValue: '',
    rules: {
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    icon: <LoginIcon />,
    field: 'username',
  },
  password: {
    label: 'Password',
    name: 'password',
    type: 'password',
    helperText: 'Enter your password',
    placeHolder: 'Password',
    defaultValue: '',
    rules: {
      required: true,
      minLength: 8,
      maxLength: 20,
      password: true,
    },
    icon: <LockIcon />,
    field: 'password',
  },
};
const signupFormFields = {
  firstName: {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    placeHolder: 'first name',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <VerifiedUserRoundedIcon />,
    field: 'firstName',
  },
  lastName: {
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    placeHolder: 'last name',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <VerifiedUserRoundedIcon />,
    field: 'lastName',
  },
  email: {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeHolder: 'email',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <EmailRoundedIcon />,
    field: 'email',
  },
  ...loginFormFields,
};
const authFormFields = signupFormFields;
const addDeckFormFields = {
  name: {
    context: 'Deck',
    name: 'name',
    label: 'Name',
    type: 'text',
    placeHolder: 'Enter deck name',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <DescriptionRoundedIcon />,
    field: 'name',
    required: true,
  },
  description: {
    context: 'Deck',
    name: 'description',
    label: 'Description',
    type: 'multiline',
    placeHolder: 'Enter deck description',
    defaultValue: '',
    rules: {
      required: true,
      multiline: true,
      rows: 4,
    },
    multiline: true,
    rows: 4,
    icon: <DescriptionRoundedIcon />,
    required: false,
    field: 'description',
  },
};
const updateDeckFormFields = {
  ...addDeckFormFields,
  tags: {
    context: 'Deck',
    label: 'Tags',
    name: 'tags',
    type: 'chips',
    placeholder: 'Enter a tag',
    defaultValue: [],
    // defaultValue: [{ value: 'tag1', label: 'tag1' }],
    rules: {
      required: false,
      minLength: 1,
      maxLength: 10,
    },
    icon: <DescriptionRoundedIcon />, // If you're displaying this icon somewhere in your form
    required: false, // Adjust based on whether tags are actually required or not
  },
  color: {
    context: 'Deck',
    label: 'Color',
    name: 'color',
    type: 'select',
    defaultValue: 'blue',
    rules: {
      required: false,
    },
    required: false,
    icon: <DescriptionRoundedIcon />, // If you're displaying this icon somewhere in your form
    // field: 'color',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'purple', label: 'Purple' },
      { value: 'pink', label: 'Pink' },
      { value: 'orange', label: 'Orange' },
      { value: 'teal', label: 'Teal' },
    ],
  },
};
const deckFormFields = updateDeckFormFields;
const collectionFormFields = {
  name: {
    context: 'Collection',
    name: 'name',
    label: 'Name',
    type: 'text',
    placeHolder: 'Enter collection name',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <FindInPageRoundedIcon />,
    required: true,
  },
  description: {
    context: 'Collection',
    name: 'description',
    label: 'Description',
    type: 'multiline',
    placeHolder: 'Enter collection description',
    defaultValue: '',
    rules: {
      required: true,
      multiline: true,
      rows: 4,
    },
    icon: <DescriptionRoundedIcon />,
    required: true,
    multiline: true,
    rows: 4,
  },
};
const searchFormFields = {
  searchTerm: {
    label: 'Search Cards',
    type: 'search',
    name: 'searchTerm',
    placeholder: 'Search for cards...',
    defaultValue: '',
    rules: {
      required: false,
    },
    required: false,
    value: '',
    icon: <SearchRoundedIcon />,
  },
};
const collectionSearchFormFields = {
  searchTerm: {
    label: 'Search',
    type: 'search',
    name: 'collectionSearchTerm',
    placeholder: 'Search for cards...',
    field: 'searchTerm',
    defaultValue: '',
    rules: {
      required: false,
    },
    icon: <AddCircleOutlineIcon />,
    required: false,
  },
};
const statRangeFormFields = {
  statRange: {
    context: 'Collection',
    name: 'statRange',
    label: 'Statistics Range',
    type: 'select',
    placeholder: 'Select statistics range', // Optional for a select, used if you have a default empty option
    defaultValue: 'highPoint',
    selected: 'highPoint',
    rules: {
      required: 'Statistics range is required', // Assuming you want to enforce a selection
    },
    options: [
      { value: 'highPoint', label: 'High Point' },
      { value: 'lowPoint', label: 'Low Point' },
      { value: 'average', label: 'Average' },
      { value: 'avgPrice', label: 'Average Price' },
      { value: 'priceChange', label: 'Price Change' },
      {
        value: 'percentageChange',
        label: 'Percentage Change',
      },
      { value: 'volume', label: 'Volume' },
      { value: 'volatility', label: 'Volatility' },
    ],
  },
};
const timeRangeFormFields = {
  timeRange: {
    context: 'Collection',
    name: 'timeRange',
    label: 'Time Range',
    type: 'select',
    placeholder: 'Select time range', // Optional for a select, used if you have a default empty option
    defaultValue: '24hr',
    defaultLabel: 'Today',
    selected: '24hr',
    rules: {
      required: 'Time range is required',
    },
    options: [
      { value: '24hr', label: 'Today' },
      { value: '7d', label: 'This Week' },
      { value: '30d', label: 'This Month' },
      { value: '90d', label: 'Last Three Months' },
      { value: '180d', label: 'Last Six Months' },
      { value: '270d', label: 'Last Nine Months' },
      { value: '365d', label: 'Last Year' },
    ],
  },
};
const themeRangeFormFields = {
  themeRange: {
    context: 'Collection',
    name: 'themeRange',
    label: 'Theme Range',
    type: 'select',
    placeholder: 'Select theme range', // Optional for a select, used if you have a default empty option
    defaultValue: 'light',
    selected: 'light',
    rules: {
      required: 'Theme selection is required',
    },
    options: [
      { value: 'light', label: 'Light Theme' },
      { value: 'dark', label: 'Dark Theme' },
      { value: 'system', label: 'System Default' },
    ],
  },
};
const authSwitchFormFields = {
  authSwitch: {
    label: 'Auth Switch',
    type: 'switch',
    placeHolder: 'Auth Switch',
    name: 'authSwitch',
    defaultValue: false,
    rules: {
      required: true,
    },
    required: true,
  },
};
const formFields = {
  loginForm: loginFormFields,
  signupForm: signupFormFields,
  authForm: authFormFields,
  addDeckForm: addDeckFormFields,
  updateDeckForm: updateDeckFormFields,
  deckForm: deckFormFields,
  addCollectionForm: collectionFormFields,
  updateCollectionForm: collectionFormFields,
  collectionForm: collectionFormFields,
  searchForm: searchFormFields,
  statRangeForm: statRangeFormFields,
  themeRangeForm: themeRangeFormFields,
  timeRangeForm: timeRangeFormFields,
  authSwitchForm: authSwitchFormFields,
  collectionSearchForm: collectionSearchFormFields,
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -------------------------- ZOD VALIDATION SCHEMAS ---------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const loginFormSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .trim()
    .min(3, {
      message: 'Username must be at least 3 chars',
    })
    .max(255, { message: 'Username must not be more than 255 chars long' }),
  // .default('Input Username'),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(3, {
      message: 'Password must be at least 6 chars',
    })
    .max(255, { message: 'Password must not be more than 1024 chars long' }),
  // .default('Input Password'),
  // .regex(new RegExp(".*[A-Z].*"), { message: "Must conatain one uppercase character" })
  // .regex(new RegExp(".*\\d.*"), { message: "Must contains one number" })
  // .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {message: "Must contain one special character"});
});
const signupFormSchema = loginFormSchema.extend({
  firstName: z
    .string({ required_error: 'First Name is required' })
    .trim()
    .min(3, {
      message: 'First Name must be at least 3 chars',
    })
    .max(255, { message: 'First Name must not be more than 255 chars long' })
    .default('Input First Name'),
  lastName: z
    .string({ required_error: 'Last Name is required' })
    .trim()
    .min(3, {
      message: 'Last Name must be at least 3 chars',
    })
    .max(255, { message: 'Last Name must not be more than 255 chars long' })
    .default('Input Last Name'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(3, {
      message: 'Email must be at least 3 chars',
    })
    .max(255, { message: 'Email must not be more than 255 chars long' }),
});
const addDeckFormSchema = z.object({
  name: z.string().min(1, 'Deck name is required').default(''),
  description: z.string().optional().default(''),
});
const updateDeckFormSchema = addDeckFormSchema.extend({
  tags: z
    .array(
      z.object({
        id: z.number().default(0),
        label: z.string().min(1, { message: "Tag can't be empty" }).default(''),
      })
    )
    .default([]),
  color: z
    .enum([
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'pink',
      'orange',
      'teal',
    ])
    .default('blue'),
});
const collectionFormSchema = z.object({
  name: z.string().optional().default(''),
  description: z.string().optional().default(''),
});
const searchFormSchema = z.object({
  searchTerm: z.string().optional().default(''),
});
const authSwitchFormSchema = z.object({
  authSwitch: z.boolean(), // Since it's a switch, it's either true or false
});
const statRangeFormSchema = z.object({
  timeRange: z
    .enum(['highpoint', 'lowpoint', 'average', 'volume', 'volatility'])
    .default('highpoint'),
});
const timeRangeFormSchema = z.object({
  timeRange: z
    .enum(['24hr', '7d', '30d', '90d', '180d', '270d', '365d'])
    .default('24hr'),
});
const themeRangeFormSchema = z.object({
  timeRange: z.enum(['light', 'dark', 'system']).default('light'),
});

const zodSchemas = {
  statRangeForm: statRangeFormSchema,
  themeRangeForm: themeRangeFormSchema,
  timeRangeForm: timeRangeFormSchema,
  loginForm: loginFormSchema,
  signupForm: signupFormSchema,
  authForm: signupFormSchema,
  addDeckForm: addDeckFormSchema,
  updateDeckForm: updateDeckFormSchema,
  addCollectionForm: collectionFormSchema,
  updateCollectionForm: collectionFormSchema,
  searchForm: searchFormSchema,
  authSwitchForm: authSwitchFormSchema,
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -------------------------- ZOD VALIDATION FUNCTIONS -------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const handleValidation = (schema, formData) => {
  const result = schema.safeParse(formData);
  if (result.success) {
    console.log('Validation successful', formData);
    return { success: true, data: formData };
  } else {
    console.error('Validation errors', result.error.errors);
    return { success: false, errors: result.error.errors };
  }
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ----------------------- ADDITIONAL CONFIG OPTIONS ---------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const configOptions = {
  startIcons: [
    { save: <SaveRoundedIcon /> },
    { delete: <DeleteRoundedIcon /> },
    { edit: <EditRoundedIcon /> },
    { add: <AddRoundedIcon /> },
    { remove: <RemoveRoundedIcon /> },
    { back: <ArrowBackRoundedIcon /> },
    { next: <ArrowForwardRoundedIcon /> },
  ],
  labelOptions: [
    { label: 'Submit', value: 'submit' },
    { label: 'Delete', value: 'delete' },
    { label: 'Edit', value: 'edit' },
    { label: 'Add', value: 'add' },
    { label: 'Remove', value: 'remove' },
    { label: 'Back', value: 'back' },
    { label: 'Next', value: 'next' },
  ],
  additionButtons: [
    {
      label: 'Delete Deck',
      onClick: () => {},
      startIcon: <DeleteIcon />,
      color: 'error',
      variant: 'holo',
    },
    {
      label: 'Save Deck',
      onClick: () => {},
      startIcon: <SaveIcon />,
      color: 'primary',
      variant: 'holo',
    },
    {
      label: 'Edit',
      onClick: () => {},
      startIcon: <EditIcon />,
      color: 'primary',
      variant: 'holo',
    },
    {
      label: 'Add',
      onClick: () => {},
      startIcon: <AddIcon />,
      color: 'primary',
      variant: 'holo',
    },
  ],
};
export {
  formFields,
  zodSchemas,
  configOptions,
  handleValidation,
  getFormFieldHandlers,
};
