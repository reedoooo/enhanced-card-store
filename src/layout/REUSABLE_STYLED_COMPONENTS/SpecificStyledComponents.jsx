import { Box, Paper, Switch } from '@mui/material';
import styled from 'styled-components';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RCMainCard from 'layout/REUSABLE_COMPONENTS/RC_OTHER/RCMainCard';

export const HeroBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  // minHeight: '600px',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));

export const CardWrapper = styled(RCMainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.darkest,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    // background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));
export const SettingsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.borders.borderRadius.md,
  background: theme.palette.success.main_light,
  boxShadow: theme.shadows[3],
  margin: 'auto',
  width: '100%',
  maxWidth: 'md',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));
