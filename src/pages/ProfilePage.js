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
import placeholder from '../assets/images/placeholder.jpeg';
import UserStats from '../components/other/UserStats';
import { useUserContext } from '../context/UserContext/UserContext';
import { useCookies } from 'react-cookie';
import ThemeToggleButton from '../components/buttons/ThemeToggleButton';
import { useCombinedContext } from '../context/CombinedProvider';
import { useCollectionStore } from '../context/hooks/collection';
import {
  AvatarStyled,
  TypographyStyled,
  IconButtonStyled,
  ButtonStyled,
} from './StyledComponents';
import ProfileForm from '../components/forms/ProfileForm';

const ProfilePage = () => {
  const { selectedCollection } = useCollectionStore();
  const { user, updateUser } = useUserContext();
  const [cookies] = useCookies(['userCookie']);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });

  const {
    handleSend,
    handleRequestChartData,
    handleRequestCollectionData,
    handleRequestCronStop,
    handleSendAllCardsInCollections,
    listOfMonitoredCards,
    handleRetreiveListOfMonitoredCards,
    retrievedListOfMonitoredCards,
  } = useCombinedContext();

  const openSnackbar = (message) => {
    setSnackbarData({ open: true, message });
  };
  const userId = user?.userID;
  // console.log('USER ID:', userId);
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

  const handleTriggerCronJob = () => {
    // if (userId) {
    //   handleCronRequest(userId);
    //   console.log('TRIGGERING CRON JOB');
    // }
    if (userId && listOfMonitoredCards && retrievedListOfMonitoredCards) {
      handleSendAllCardsInCollections(
        userId,
        listOfMonitoredCards,
        retrievedListOfMonitoredCards
      );
      console.log('SENDING ALL CARDS IN COLLECTIONS');
      openSnackbar('Triggered the cron job.');
    } else if (
      userId &&
      listOfMonitoredCards &&
      !retrievedListOfMonitoredCards
    ) {
      console.log('RETRIEVING LIST OF MONITORED CARDS');
      handleSendAllCardsInCollections(
        userId,
        listOfMonitoredCards,
        handleRetreiveListOfMonitoredCards()
      );
      openSnackbar('Triggered the cron job.');
    }
  };

  const handleStopCronJob = () => {
    if (userId) {
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
        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send Message to Server
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleRequestCollectionDataFunction}
        >
          Request Collection Data
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleRequestChartDataFunction}
        >
          Request Chart Data
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleTriggerCronJob}
        >
          Trigger Cron Job
        </ButtonStyled>
        <ButtonStyled
          variant="contained"
          color="secondary"
          onClick={handleStopCronJob}
        >
          Stop Cron Job
        </ButtonStyled>
      </Box>
      <Box mt={3}>
        <ProfileForm
          {...user}
          userName={cookies.userCookie?.username}
          onSave={handleSaveChanges}
        />
      </Box>
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
