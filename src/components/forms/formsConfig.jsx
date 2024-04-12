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
import useAuthManager from '../../context/MAIN_CONTEXT/AuthContext/useAuthManager';
import useCollectionManager from '../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useDeckManager from '../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import { useCardStoreHook } from '../../context/MAIN_CONTEXT/CardContext/useCardStore';
import LoadingOverlay from '../../layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ------------------------------- FORM KEYS -----------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const formKeys = {
  loginForm: 'loginForm',
  signupForm: 'signupForm',
  addDeckForm: 'addDeckForm',
  updateDeckForm: 'updateDeckForm',
  addCollectionForm: 'addCollectionForm',
  updateCollectionForm: 'updateCollectionForm',
  updateUserDataForm: 'updateUserDataForm',
  statRangeForm: 'statRangeForm',
  searchForm: 'searchForm',
  collectionSearchForm: 'collectionSearchForm',
  timeRangeForm: 'timeRangeSelector',
  searchSettingsForm: 'searchSettingsSelector',
  rememberMeForm: 'rememberMeForm',
  authSwitchForm: 'authSwitch',
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ------------------------------- FORM FIELD KEYS -----------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const formFieldKeys = {
  username: 'username',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  name: 'name',
  description: 'description',
  searchTerm: 'searchTerm',
  statisticsRange: 'statisticsRange',
  themeRange: 'themeRange',
  timeRange: 'timeRange',
  authSwitch: 'authSwitch',
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ---------------------------- FORM FIELD HANDLERS ----------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const getFormFieldHandlers = () => {
  const { signup, login } = useAuthManager();
  const { handleRequest, setSearchSettings, searchSettings } =
    useCardStoreHook();
  const collectionmanagedata = useCollectionManager();
  const selectionData = useSelectedCollection();
  if (!collectionmanagedata || !selectionData) {
    return <LoadingOverlay />;
  }
  const { createNewCollection, updateCollection } = collectionmanagedata;
  const { selectedCollection, updateCollectionField } = selectionData;
  const { updateDeckDetails, deleteDeck, createNewDeck } = useDeckManager();

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
      createNewCollection(formData, additionalData);
    },
    updateCollectionForm: (formData, additionalData) => {
      console.log('Update Collection Form Data:', formData, additionalData);
      updateCollection(formData, additionalData);
    },
    updateDeckForm: (formData, additionalData) => {
      console.log('Update Deck Form Data:', formData, additionalData);
      updateDeckDetails(formData, additionalData);
    },
    addDeckForm: (formData, additionalData) => {
      console.log('Add Deck Form Data:', formData, additionalData);
      createNewDeck(formData, additionalData);
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
    statRangeForm: (formData, additionalData) => {
      console.log('Stat Range Form Data:', formData, additionalData);
      setSearchSettings(formData, additionalData);
    },
    themeRangeForm: (formData, additionalData) => {
      console.log('Theme Range Form Data:', formData, additionalData);
      setSearchSettings(formData, additionalData);
    },
    timeRangeForm: (formData) => {
      console.log('Time Range Selector Form Data:', formData);
      // updateCollectionField(
      //   selectedCollection._id,
      //   'selectedChartDataKey',
      //   formData
      // );
      // updateCollectionField(
      //   selectedCollection._id,
      //   'selectedChartData',
      //   selectedCollection.averagedChartData[formData]
      // );
    },
    searchSettingsForm: (formData, additionalData) => {
      console.log(
        'Search Settings Selector Form Data:',
        formData,
        additionalData
      );
      setSearchSettings(formData, additionalData);
    },

    rememberMeForm: (formData) => {
      // Implement remember me form submission logic here
      console.log('Remember Me Form Data:', formData);
    },
    authSwitch: (formData) => {
      console.log('Auth Switch Form Data:', formData);
      // toggleActiveForm('loginForm', 'signupForm');
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
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <LoginIcon />,
    field: 'username',
  },
  password: {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeHolder: 'Password',
    defaultValue: '',
    rules: {
      required: true,
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
    label: 'Description',
    type: 'text',
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
    label: 'Tags',
    type: 'chips',
    placeholder: 'Enter a tag',
    defaultValue: [{ value: 'tag1', label: 'tag1' }],
    rules: {
      required: true,
    },
    icon: <DescriptionRoundedIcon />, // If you're displaying this icon somewhere in your form
    required: false, // Adjust based on whether tags are actually required or not
  },
  color: {
    label: 'Color',
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
    label: 'Description',
    type: 'text',
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
    type: 'text',
    placeholder: 'Search for cards...',
    defaultValue: '',
    rules: {
      required: false,
    },
    required: false,
    value: '',
    icon: <SearchRoundedIcon />,
    // Assuming forms, handleChange, handleFocus, and handleBlur are defined elsewhere
    // value: forms?.searchForm?.searchTerm || '',
    // onChange: handleChange,
    // onFocus: handleFocus,
    // onBlur: handleBlur,
  },
};
const collectionSearchFormFields = {
  searchTerm: {
    label: 'Search',
    type: 'text',
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
    name: 'statRange',
    label: 'Statistics Range',
    type: 'select',
    placeholder: 'Select statistics range', // Optional for a select, used if you have a default empty option
    defaultValue: 'highPoint',
    selected: 'highPoint',

    // onSelectChange: (value) => {
    //   console.log(value);
    // },
    rules: {
      required: 'Statistics range is required', // Assuming you want to enforce a selection
    },
    options: [
      { value: 'highPoint', label: 'High Point' },
      { value: 'lowPoint', label: 'Low Point' },
      { value: 'average', label: 'Average' },
      { value: 'volume', label: 'Volume' },
      { value: 'volatility', label: 'Volatility' },
    ],
  },
};
const timeRangeFormFields = {
  timeRange: {
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
  // searchSettingsForm: searchSettingsFormFields,
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -------------------------- ZOD VALIDATION SCHEMAS ---------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const loginFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const signupFormSchema = loginFormSchema.extend({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .default('Input First Name'),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .default('Input Last Name'),
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required')
    .default('Input Email'),
});
const addDeckFormSchema = z.object({
  name: z.string().min(1, 'Deck name is required').default(''),
  description: z.string().optional().default(''),
});
const updateDeckFormSchema = addDeckFormSchema.extend({
  tags: z
    .array(
      z.object({
        key: z.number().default(0),
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
// const timeRangeFormSchema = z.enum(['24hr', '7d', '30d', '90d', '180d', '270d', '365d']).optional();
// tags: [
//   {
//     label: 'Tags',
//     type: 'chips',
//     placeHolder: 'Enter tags',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <DescriptionRoundedIcon />,
//     field: 'tags',
//     required: true,
//   },
// ],
// color: [
//   {
//     label: 'Color',
//     type: 'color',
//     placeHolder: 'Enter color',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <DescriptionRoundedIcon />,
//     field: 'color',
//     required: true,
//   },
// ],
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
  // deckForm: updateDeckFormSchema,
  // collectionForm: collectionFormSchema,
  authSwitchForm: authSwitchFormSchema,
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -------------------------- ZOD VALIDATION FUNCTIONS -------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const validationFunctions = {
  login: (data) => loginFormSchema.safeParse(data),
  signup: (data) => signupFormSchema.safeParse(data),
  authForm: (data) => signupFormSchema.safeParse(data),
  addDeck: (data) => addDeckFormSchema.safeParse(data),
  updateDeck: (data) => updateDeckFormSchema.safeParse(data),
  addCollection: (data) => collectionFormSchema.safeParse(data),
  updateCollection: (data) => collectionFormSchema.safeParse(data),
  searchForm: (data) => searchFormSchema.safeParse(data),
  // deckForm: (data) => updateDeckFormSchema.safeParse(data),
  // collectionForm: (data) => collectionFormSchema.safeParse(data),
  statistics: (data) => statRangeFormSchema.safeParse(data),
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
      onClick: console.log('Delete Deck'),
      startIcon: <DeleteIcon />,
      color: 'error',
      variant: 'holo',
    },
    {
      label: 'Save Deck',
      onClick: console.log('Save Deck'),
      startIcon: <SaveIcon />,
      color: 'primary',
      variant: 'holo',
    },
    {
      label: 'Edit',
      onClick: console.log('Edit'),
      startIcon: <EditIcon />,
      color: 'primary',
      variant: 'holo',
    },
    {
      label: 'Add',
      onClick: console.log('Add'),
      startIcon: <AddIcon />,
      color: 'primary',
      variant: 'holo',
    },
  ],
};
export {
  formKeys,
  formFieldKeys,
  formFields,
  zodSchemas,
  configOptions,
  validationFunctions,
  getFormFieldHandlers,
};
