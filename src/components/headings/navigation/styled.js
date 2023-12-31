import { Box, styled } from '@mui/system';
import {
  AppBar,
  Drawer,
  IconButton,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
export const StyledDrawer = styled(Drawer)(({ theme, bgColor }) => ({
  '.MuiPaper-root': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1, 2),
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0, 4),
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  // Do not explicitly set the height here to allow Toolbar's default styling to take effect
  backgroundColor: theme.palette.primary.dark,
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
}));

const navbarHeight = '50px'; // Default height for MUI Toolbar on desktop

export const MainContent = styled(Box)(({ topMargin }) => ({
  marginTop: topMargin, // Dynamic top margin based on the Toolbar's height
  // ... other styles
}));
