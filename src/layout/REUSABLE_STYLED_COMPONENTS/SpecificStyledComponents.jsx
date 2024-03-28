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
