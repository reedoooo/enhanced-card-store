import { Box } from '@mui/material';
import styled from 'styled-components';

export const HeroBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  // minHeight: '600px',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
