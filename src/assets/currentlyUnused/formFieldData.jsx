// import LoginIcon from '@mui/icons-material/Login';
// import PersonIcon from '@mui/icons-material/Person';
// import LockIcon from '@mui/icons-material/Lock';
// import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
// import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
// import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
// // TODO: ADD EMAIL ICON
// // TODO: ADD First ICON
// // TODO: ADD Last ICON
// // TODO: ADD General Name ICON
// // TODO: ADD Description ICON
// const loginFields = [
//   {
//     label: 'Username',
//     type: 'text',
//     placeHolder: 'Enter username',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <PersonIcon />,
//     field: 'username',
//     name: 'username',
//   },
//   {
//     label: 'Password',
//     type: 'text',
//     placeHolder: 'Enter password',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <LockIcon />,
//     field: 'password',
//     name: 'password',
//   },
// ];
// const signupFields = [
//   {
//     label: 'First Name',
//     type: 'text',
//     placeHolder: 'Enter first name',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <VerifiedUserRoundedIcon />,
//     field: 'firstName',
//     name: 'firstName',
//   },
//   {
//     label: 'Last Name',
//     type: 'text',
//     placeHolder: 'Enter last name',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <VerifiedUserRoundedIcon />,
//     field: 'lastName',
//     name: 'lastName',
//   },
//   {
//     label: 'Email',
//     type: 'email',
//     placeHolder: 'Enter email',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <EmailRoundedIcon />,
//     field: 'email',
//     name: 'email',
//   },
// ];
// const addDeckFields = [
//   {
//     label: 'Name',
//     type: 'text',
//     placeHolder: 'Enter deck name',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <DescriptionRoundedIcon />,
//     field: 'name',
//     value: '',
//     required: true,
//     name: 'name',
//   },
//   {
//     label: 'Description',
//     type: 'text',
//     placeHolder: 'Enter deck description',
//     defaultValue: '',
//     rules: {
//       required: true,
//       multiline: true,
//       rows: 4,
//     },
//     value: '',
//     multiline: true,
//     rows: 4,
//     icon: <DescriptionRoundedIcon />,
//     required: false,
//     name: 'description',
//   },
// ];
// const updateDeckFields = [
//   {
//     label: 'Tags',
//     type: 'chips',
//     placeHolder: 'Enter tags',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     chipData: tags,
//     icon: <DescriptionRoundedIcon />,
//     onAddChip: handleAddTag,
//     onDeleteChip: handleDeleteTag,
//     required: false,
//     name: 'tags',
//     value: tags.join(', '),
//     // chipData: tags,
//     // icon: null,
//     // onAddChip: handleAddTag,
//     // onDeleteChip: handleDeleteTag,
//     // required: false,
//     // name: 'tags',
//   },
//   {
//     label: 'Color',
//     type: 'select',
//     placeHolder: 'Select color',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: null,
//     required: false,
//     options: [
//       { value: 'red', label: 'Red' },
//       { value: 'blue', label: 'Blue' },
//       { value: 'green', label: 'Green' },
//       { value: 'yellow', label: 'Yellow' },
//       { value: 'purple', label: 'Purple' },
//       { value: 'pink', label: 'Pink' },
//       { value: 'orange', label: 'Orange' },
//       { value: 'teal', label: 'Teal' },
//     ],
//     name: 'color',
//   },
// ];
// const authFormFields = [...signupFields, ...loginFields];
// const collectionFormFields = [
//   {
//     label: 'Name',
//     type: 'text',
//     placeHolder: 'Enter collection name',
//     defaultValue: '',
//     rules: {
//       required: true,
//     },
//     icon: <FindInPageRoundedIcon />,
//     value: '',
//     required: true,
//     name: 'name',
//   },
//   {
//     label: 'Description',
//     type: 'text',
//     placeHolder: 'Enter collection description',
//     defaultValue: '',
//     rules: {
//       required: true,
//       multiline: true,
//       rows: 4,
//     },
//     icon: <DescriptionRoundedIcon />,
//     value: '',
//     required: true,
//     multiline: true,
//     rows: 4,
//     name: 'description',
//   },
// ];
// const deckFormFields = [...addDeckFields, ...updateDeckFields];
// const searchFormFields = [
//   {
//     label: 'Search Cards',
//     type: 'text',
//     placeholder: 'Search for cards...',
//     defaultValue: '',
//     rules: {
//       required: false,
//     },
//     required: false,
//     value: forms?.searchForm?.searchTerm || '',
//     onChange: handleChange,
//     onFocus: handleFocus,
//     onBlur: handleBlur,
//     name: 'searchTerm',
//   },
// ];
// const statisticsFormFields = [
//   { value: 'highPoint', label: 'High Point' },
//   { value: 'lowPoint', label: 'Low Point' },
//   { value: 'twentyFourHourAverage', label: '24 Hour Average' },
//   { value: 'average', label: 'Average' },
//   { value: 'volume', label: 'Volume' },
//   { value: 'volatility', label: 'Volatility' },
// ];
// const themeFormFields = [
//   { value: 'light', label: 'Light Theme' },
//   { value: 'dark', label: 'Dark Theme' },
//   { value: 'system', label: 'System Theme' },
// ];
// const timeRangeFormFields = [
//   { value: '24hr', label: 'Today' },
//   { value: '7d', label: 'This Week' },
//   { value: '30d', label: 'This Month' },
//   { value: '90d', label: 'Last Three Months' },
//   { value: '180d', label: 'Last Six Months' },
//   { value: '270d', label: 'Last Nine Months' },
//   { value: '365d', label: 'All Time' },
// ];
// const formHandlers = {
// 	signupForm: async (formData) => signup(formData),
// 	loginForm: async (formData) => login(formData),
// 	updateUserDataForm: (formData) => console.log(formData),
// 	addCollectionForm: (formData, additionalData) =>
// 		createNewCollection(formData, additionalData),
// 	updateCollectionForm: (formData, additionalData) =>
// 		updateCollection(additionalData, formData),
// 	updateDeckForm: (formData, additionalData) =>
// 		updateDeckDetails(formData, additionalData),
// 	addDeckForm: (formData, additionalData) =>
// 		createNewDeck(formData, additionalData),
// 	deleteDeckForm: (formData, additionalData) =>
// 		deleteDeck(formData, additionalData),
// 	searchForm: (formData, additionalData) =>
// 		setSearchSettings(formData, additionalData),
// 	collectionSearchForm: (formData, additionalData) =>
// 		console.log(formData, additionalData),
// 	// timeRangeSelector: (formData, additionalData) =>
// 	//   handleTimeRangeChange(formData, additionalData),
// 	searchSettingsSelector: (formData, additionalData) =>
// 		setSearchSettings(formData, additionalData),
// 	rememberMeForm: (formData) => {
// 		// Implement remember me form submission logic here
// 		console.log('Remember Me Form Data:', formData);
// 	},
// 	authSwitch: (formData) => {
// 		console.log('Auth Switch Form Data:', formData);
// 		toggleActiveForm('loginForm', 'signupForm');
// 	},
// };

// return formHandlers;
// };
