import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import RCZodForm from './reusable/RCZodForm';
import LoginIcon from '@mui/icons-material/Login';

const loginFields = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    icon: <PersonIcon />,
    field: 'username',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    icon: <LockIcon />,
    field: 'password',
  },
];
const signupFields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    icon: <PersonIcon />,
    field: 'firstName',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    icon: <PersonIcon />,
    field: 'lastName',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: <EmailIcon />,
    field: 'email',
  },
];

const AuthForm = ({ formType }) => {
  const combinedFields = [...signupFields, ...loginFields];
  const isSignup = formType === 'signupForm';
  const fields = isSignup ? combinedFields : loginFields;
  const buttonLabel = isSignup ? 'Sign Up' : 'Login';
  const startIcon = isSignup ? <PersonAddIcon /> : <LoginIcon />;

  return (
    <RCZodForm
      schemaName={formType}
      fields={fields}
      buttonLabel={buttonLabel}
      startIcon={startIcon}
    />
  );
};

export default AuthForm;
