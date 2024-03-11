import { Box, Switch } from '@mui/material';
import styled from 'styled-components';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const HeroBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  // minHeight: '600px',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));

export const AuthModeSwitchBase = styled(Switch)(({ theme }) => ({
  width: 74,
  height: 34,
  padding: 2,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    '&.Mui-checked': {
      transform: 'translateX(40px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#8796A5',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  '& .MuiSwitch-track': {
    borderRadius: 17 / 2,
    backgroundColor: '#8796A5',
    width: 58,
  },
}));

export default function AuthModeSwitch({ checked, ...props }) {
  return (
    <AuthModeSwitchBase
      icon={<PersonAddIcon />}
      checkedIcon={<LoginIcon />}
      {...props}
    />
  );
}
