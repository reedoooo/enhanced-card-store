import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Container,
  Snackbar,
  Grid,
  Paper,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import placeholder from '../../assets/images/placeholder.jpeg';
import { useUserContext } from '../../context/MAIN_CONTEXT/UserContext/UserContext';
import { useCookies } from 'react-cookie';
import ThemeToggleButton from '../../components/buttons/other/ThemeToggleButton';
import ProfileForm from '../../components/forms/ProfileForm';
import useResponsiveStyles from '../../context/hooks/style-hooks/useResponsiveStyles';
import { useMode } from '../../context';
import UserStats from '../../layout/profile/UserStats';

const ProfilePage = () => {
  const { updateUser } = useUserContext();
  const { theme } = useMode();
  const { isLarge } = useResponsiveStyles(theme);
  // const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [cookies] = useCookies(['user']);
  const user = cookies?.user;
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });

  const openSnackbar = (message) => {
    setSnackbarData({ open: true, message });
  };

  const openEdit = () => {
    openSnackbar('Edit mode enabled');
  };

  const handleSaveChanges = (data) => {
    updateUser(data);
    openSnackbar('Saved changes.');
  };

  return (
    <Container maxWidth={isLarge ? 'lg' : 'md'}>
      <Box my={5} display="flex" flexDirection="column" alignItems="center">
        <Avatar
          sx={{ width: 120, height: 120 }}
          src={placeholder}
          alt="User Avatar"
        />
        <Typography variant="h4" gutterBottom>
          {user?.userBasicData?.firstName || 'User Profile'}
        </Typography>
        <IconButton color="primary" onClick={() => openEdit()}>
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <ProfileForm {...user} onSave={handleSaveChanges} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <UserStats />
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarData.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarData({ ...snackbarData, open: false })}
        message={snackbarData.message}
      />
    </Container>
  );
};

export default ProfilePage;
