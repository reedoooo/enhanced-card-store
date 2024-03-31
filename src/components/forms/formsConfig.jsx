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
// For additionButtons (which use non-rounded versions):
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { z } from 'zod';
import useAuthManager from '../../context/MAIN_CONTEXT/AuthContext/useAuthManager';
import useCollectionManager from '../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import useDeckManager from '../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import { useCardStoreHook } from '../../context/MAIN_CONTEXT/CardContext/useCardStore';
import LoadingOverlay from '../../layout/REUSABLE_COMPONENTS/LoadingOverlay';
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
  if (!collectionmanagedata) {
    return <LoadingOverlay />;
  }
  const { createNewCollection, updateCollection } = collectionmanagedata;
  const { updateDeckDetails, deleteDeck, createNewDeck } = useDeckManager();
  // const { setTimeRange } = useTimeRange();

  const formHandlers = {
    loginForm: (formData) => {
      console.log('Login Form Data:', formData);
      login(formData);
    },
    signupForm: (formData) => {
      console.log('Signup Form Data:', formData);
      signup(formData);
    },
    updateUserDataForm: (formData) => {
      console.log('Update User Data Form Data:', formData);
    },
    addCollectionForm: (formData, additionalData) => {
      console.log('Add Collection Form Data:', formData, additionalData);
      createNewCollection(formData, additionalData);
    },
    updateCollectionForm: (formData, additionalData) => {
      console.log('Update Collection Form Data:', formData, additionalData);
      updateCollection(additionalData, formData);
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
      deleteDeck(formData, additionalData);
    },
    searchForm: (formData, additionalData) => {
      console.log('Search Form Data:', formData, additionalData);
      handleRequest(formData, additionalData);
    },
    collectionSearchForm: (formData, additionalData) => {
      console.log('Collection Search Form Data:', formData, additionalData);
    },
    // timeRangeSelector: (formData, additionalData) => {
    // console.log('Time Range Selector Form Data:', formData, additionalData);
    // setTimeRange(formData, additionalData);
    // },
    searchSettingsSelector: (formData, additionalData) => {
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
    type: 'text',
    placeHolder: 'Enter username',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <LoginIcon />,
    field: 'username',
  },
  password: {
    label: 'Password',
    type: 'text',
    placeHolder: 'Enter password',
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
    type: 'text',
    placeHolder: 'Enter first name',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <VerifiedUserRoundedIcon />,
    field: 'firstName',
  },
  lastName: {
    label: 'Last Name',
    type: 'text',
    placeHolder: 'Enter last name',
    defaultValue: '',
    rules: {
      required: true,
    },
    icon: <VerifiedUserRoundedIcon />,
    field: 'lastName',
  },
  email: {
    label: 'Email',
    type: 'email',
    placeHolder: 'Enter email',
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
  },
};
const updateDeckFormFields = {
  tags: {
    label: 'Tags',
    type: 'chips',
    placeHolder: 'Enter tags',
    defaultValue: [],
    values: [],
    rules: {
      required: true,
    },
    // chipData: tags, // Assuming `tags` is defined elsewhere
    icon: <DescriptionRoundedIcon />,
    // onAddChip: handleAddTag, // Assuming `handleAddTag` is defined elsewhere
    // onDeleteChip: handleDeleteTag, // Assuming `handleDeleteTag` is defined elsewhere
    required: false,
    // value: tags.join(', '), // Assuming `tags` is defined elsewhere
  },
  color: {
    label: 'Color',
    type: 'select',
    placeHolder: 'Select color',
    defaultValue: 'green',
    rules: {
      required: true,
    },
    required: false,
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
  ...addDeckFormFields,
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
    defaultValue: '',
    rules: {
      required: false,
    },
    icon: <AddCircleOutlineIcon />,
    required: false,
    value: '',
  },
};
const statRangeFormFields = {
  highPoint: { label: 'High Point' },
  lowPoint: { label: 'Low Point' },
  twentyFourHourAverage: { label: '24 Hour Average' },
  average: { label: 'Average' },
  volume: { label: 'Volume' },
  volatility: { label: 'Volatility' },
};
const themeRangeFormFields = {
  light: { label: 'Light Theme' },
  dark: { label: 'Dark Theme' },
  system: { label: 'System Theme' },
};
const timeRangeFormFields = {
  '24hr': { label: 'Today' },
  '7d': { label: 'This Week' },
  '30d': { label: 'This Month' },
  '90d': { label: 'Last Three Months' },
  '180d': { label: 'Last Six Months' },
  '270d': { label: 'Last Nine Months' },
  '365d': { label: 'All Time' },
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

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
const signupSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email format'),
});
const authFormSchema = signupSchema.merge(loginSchema);
const addDeckSchema = z.object({
  name: z.string().min(1, 'Deck Name is required'),
  description: z.string().min(1, 'Description is required').optional(),
});
const updateDeckSchema = z.object({
  tags: z.array(z.string()).optional(), // Assuming tags can be optional
  color: z.enum([
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'orange',
    'teal',
  ]),
});
const deckFormSchema = addDeckSchema.merge(updateDeckSchema);
const collectionFormSchema = z.object({
  name: z.string().min(1, 'Collection Name is required'),
  description: z.string().min(1, 'Collection Description is required'),
});
const searchFormSchema = z.object({
  searchTerm: z.string().optional(),
});
const statisticsSchema = z.object({
  selectedStatistic: z
    .enum([
      'highPoint',
      'lowPoint',
      'twentyFourHourAverage',
      'average',
      'volume',
      'volatility',
    ])
    .optional(),
});
const themeFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
});
const timeRangeFormSchema = z.object({
  timeRange: z
    .enum(['24hr', '7d', '30d', '90d', '180d', '270d', '365d'])
    .optional(),
});
const zodSchemas = {
  loginSchema,
  signupSchema,
  authFormSchema,
  addDeckSchema,
  updateDeckSchema,
  deckFormSchema,
  collectionFormSchema,
  searchFormSchema,
  statisticsSchema,
  themeFormSchema,
  timeRangeFormSchema,
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -------------------------- ZOD VALIDATION FUNCTIONS -------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
const validationFunctions = {
  login: (data) => loginSchema.safeParse(data),
  signup: (data) => signupSchema.safeParse(data),
  authForm: (data) => authFormSchema.safeParse(data),
  addDeck: (data) => addDeckSchema.safeParse(data),
  updateDeck: (data) => updateDeckSchema.safeParse(data),
  deckForm: (data) => deckFormSchema.safeParse(data),
  collectionForm: (data) => collectionFormSchema.safeParse(data),
  searchForm: (data) => searchFormSchema.safeParse(data),
  statistics: (data) => statisticsSchema.safeParse(data),
  themeForm: (data) => themeFormSchema.safeParse(data),
  timeRangeForm: (data) => timeRangeFormSchema.safeParse(data),
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
  formFields,
  zodSchemas,
  getFormFieldHandlers,
  configOptions,
  validationFunctions,
};
