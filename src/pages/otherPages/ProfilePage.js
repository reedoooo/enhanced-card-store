import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Container,
  Snackbar,
  styled,
  TextField,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import placeholder from '../../assets/images/placeholder.jpeg';
import UserStats from '../../components/other/dataDisplay/UserStats';
import { useUserContext } from '../../context/UserContext/UserContext';
import { useCookies } from 'react-cookie';
import ThemeToggleButton from '../../components/buttons/other/ThemeToggleButton';
import { useCombinedContext } from '../../context/CombinedContext/CombinedProvider';
import {
  AvatarStyled,
  TypographyStyled,
  IconButtonStyled,
  ButtonStyled,
  ButtonsContainer,
  CustomButton,
  ProfileFormContainer,
} from '../pageStyles/StyledComponents';
import ProfileForm from '../../components/forms/ProfileForm';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const ProfilePage = () => {
  const { selectedCollection } = useCollectionStore();
  const { user, updateUser } = useUserContext();
  const [cookies] = useCookies(['user']);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });

  const {
    handleSend,
    handleRequestChartData,
    handleRequestCollectionData,
    handleRequestCronStop,
  } = useCombinedContext();

  const openSnackbar = (message) => {
    setSnackbarData({ open: true, message });
  };
  // const userId = user?.id;
  const userId = cookies.user?.id;
  console.log('USER ID:', userId);
  // console.log('USER:', user);
  const handleSaveChanges = useCallback(
    (data) => {
      updateUser(data);
      openSnackbar('Saved changes.');
    },
    [updateUser]
  );

  const handleSendMessage = () => {
    handleSend('Hello, Server!');
    openSnackbar('Sent message to the server.');
  };

  const handleRequestCollectionDataFunction = () => {
    if ((userId, selectedCollection)) {
      handleRequestCollectionData(userId, selectedCollection);
      console.log('REQUESTING COLLECTION DATA');
      openSnackbar('Requested collection data.');
    }
  };

  const handleRequestChartDataFunction = () => {
    if (userId && selectedCollection) {
      handleRequestChartData(userId, selectedCollection);
      openSnackbar('Requested chart data.');
    }
  };

  const handleStopCronJob = () => {
    if (userId && typeof userId === 'string') {
      handleRequestCronStop(userId);
      console.log('STOPPING CRON JOB');
    }

    openSnackbar('Cron job stopped.');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <AvatarStyled src={placeholder} alt="User Avatar" />
        <TypographyStyled variant="h4" gutterBottom>
          Profile
        </TypographyStyled>
        <IconButtonStyled>
          <EditIcon />
        </IconButtonStyled>
      </Box>

      <ButtonsContainer>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send Message to Server
        </CustomButton>

        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleRequestCollectionDataFunction}
        >
          Request Collection Data
        </CustomButton>

        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleRequestChartDataFunction}
        >
          Request Chart Data
        </CustomButton>

        {/* <CustomButton
          variant="contained"
          color="primary"
          onClick={handleTriggerCronJob}
        >
          Trigger Cron Job
        </CustomButton> */}
        <CustomButton
          variant="contained"
          color="secondary"
          onClick={handleStopCronJob}
        >
          Stop Cron Job
        </CustomButton>
      </ButtonsContainer>

      <ProfileFormContainer>
        <ProfileForm
          {...user}
          userName={cookies?.user?.username}
          onSave={handleSaveChanges}
        />
      </ProfileFormContainer>

      <UserStats />
      <ThemeToggleButton />
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
