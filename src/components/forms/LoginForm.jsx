import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import RCZodForm from './reusable/RCZodForm';

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

const LoginForm = () => {
  const startIcon = <LoginIcon />;
  return (
    <RCZodForm
      schemaName="loginForm"
      fields={loginFields}
      buttonLabel="Login"
      startIcon={startIcon}
    />
  );
};

export default LoginForm;
