import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
// TODO: ADD EMAIL ICON
// TODO: ADD First ICON
// TODO: ADD Last ICON
// TODO: ADD General Name ICON
// TODO: ADD Description ICON

const auth = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    icon: <VerifiedUserRoundedIcon />,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    icon: <VerifiedUserRoundedIcon />,
  },
  { name: 'email', label: 'Email', type: 'email', icon: <EmailRoundedIcon /> },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    icon: <PersonIcon />,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    icon: <LockIcon />,
  },
];
const collection = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    icon: <FindInPageRoundedIcon />,
    required: true,
    multiline: false,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    icon: <DescriptionRoundedIcon />,
    required: true,
    multiline: true,
    rows: 4,
  },
];
const deck = [
  { name: 'name', label: 'Name', type: 'text', icon: <></> },
  { name: 'description', label: 'Description', type: 'text', icon: <></> },
];
const formData = {
  auth,
  collection,
  deck,
};

export default formData;
