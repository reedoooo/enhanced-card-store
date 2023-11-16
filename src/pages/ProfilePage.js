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
import {
  AvatarStyled,
  TypographyStyled,
  IconButtonStyled,
  ButtonStyled,
} from './StyledComponents';
import ProfileForm from '../components/forms/ProfileForm';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';

const CustomButton = styled(Button)({
  margin: '10px', // Add margin around each button
  width: '100%', // Make all buttons take full width of their parent
  padding: '10px 0', // Add vertical padding
  fontSize: '16px', // Set a consistent font size
  // Any other styling you want to apply to all buttons
});

const ButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  margin: '10px 0',
  // Add additional styles as needed
});

const ProfileFormContainer = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example shadow
  borderRadius: '8px',
  // Add additional styles as needed
});

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
    handleSendAllCardsInCollections,
    listOfMonitoredCards,
    handleRetreiveListOfMonitoredCards,
    retrievedListOfMonitoredCards,
  } = useCombinedContext();

  const openSnackbar = (message) => {
    setSnackbarData({ open: true, message });
  };
  const userId = user?.id;
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

  const handleTriggerCronJob = () => {
    if (userId && listOfMonitoredCards) {
      handleSendAllCardsInCollections(userId, listOfMonitoredCards);
      console.log('SENDING ALL CARDS IN COLLECTIONS');
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

        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleTriggerCronJob}
        >
          Trigger Cron Job
        </CustomButton>
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
          userName={cookies.userCookie?.username}
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
