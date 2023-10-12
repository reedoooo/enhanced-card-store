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
import placeholder from '../assets/placeholder.jpeg';
import UserStats from '../components/other/UserStats';
import { useUserContext } from '../context/UserContext/UserContext';
import { useCookies } from 'react-cookie';
import ThemeToggleButton from '../components/buttons/ThemeToggleButton';
import { useCombinedContext } from '../context/CombinedProvider';
import { useCollectionStore } from '../context/hooks/collection';

const AvatarStyled = styled(Avatar)({
  width: 60,
  height: 60,
  marginBottom: 15,
});

const TypographyStyled = styled(Typography)({
  marginBottom: 15,
});

const IconButtonStyled = styled(IconButton)({
  marginBottom: 20,
});

const DataBoxStyled = styled(Box)({
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center',
  width: '100%',
});

const ButtonStyled = styled(Button)({
  margin: '15px 0',
  padding: '10px',
  color: '#fff',
  backgroundColor: '#3f51b5',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const DataTextStyled = styled(Typography)({
  margin: '5px 0',
  fontSize: '0.9rem',
});

const ProfileForm = ({ userName, name, age, status, onSave }) => {
  const [formData, setFormData] = useState({
    userName: userName || '', // default to empty string if undefined
    name: name || '',
    age: age || '',
    status: status || '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => {
    setFormData({
      userName: userName || '',
      name: name || '',
      age: age || '',
      status: status || '',
    });
  }, [userName, name, age, status]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        id="userName"
        value={formData?.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        id="name"
        value={formData?.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        id="age"
        value={formData?.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        id="status"
        value={formData?.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Add more TextField components as needed */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
    </form>
  );
};

ProfileForm.propTypes = {
  userName: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.string,
  status: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

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
    // handleRequestCollectionData,
    handleSendData,
    handleSendChart,
    handleCronRequest,
    handleRequestCronStop,
    chartDataToSend,
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
        {/* <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleSendChartData} // directly calling the function without needing to pass chartData
        >
          Request Chart Data Update
        </ButtonStyled> */}

        {/* <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleSendCollectionData}
        >
          Send Collection Data
        </ButtonStyled> */}
        {/* {chartDataToSend?.datasets?.map((dataset) =>
          dataset.data?.points?.map((data) => (
            <DataBoxStyled key={data.cardId || data._id}>
              {data?.x && (
                <>
                  <DataTextStyled variant="body2">
                    Date: {new Date(data.x).toLocaleDateString()}
                  </DataTextStyled>
                  <DataTextStyled variant="body2">
                    Time: {new Date(data.x).toLocaleTimeString()}
                  </DataTextStyled>
                </>
              )}
              <DataTextStyled variant="body2">Value: {data?.y}</DataTextStyled>
            </DataBoxStyled>
          ))
        )} */}
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
