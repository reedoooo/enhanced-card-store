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
  const { allCollection, collectionData } = useCollectionStore();
  const { user, updateUser } = useUserContext();
  const [cookies] = useCookies(['userCookie']);
  const {
    handleSend,
    handleRequestData,
    handleRequestChartData,
    // handleAddDataSet,
    handleSendData,
    cronData,
    handleCronRequest,
    handleStartCron,
    chartData,
  } = useCombinedContext();
  console.log('CHART DATA', chartData);
  console.log('CHART DATA', chartData.datasets);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log('USER:', user);
  const handleSaveChanges = useCallback(
    (data) => {
      updateUser(data);
      setOpenSnackbar(true);
    },
    [updateUser]
  );
  // const dataset = { x: 10, y: 20 };
  const userId = user?.userID;
  // const chartId = chartData[0]?._id;
  const _id = collectionData?._id;
  const collectionId = _id;
  const cards = collectionData?.cards;
  // console.log('collectionId', collectionId);
  // console.log('collectionData', collectionData);
  // console.log('cards', cards);

  // const name = chartData[0].name;
  // const chartData = state.chartData; // retrieving chartData from state
  // const chartId = chartData?._id;
  // const name = chartData?.name;
  // const newValue = chartData;
  // console.log('dataset', cronData);
  const handleButtonClick = () => {
    handleSend('Hello, Server!');

    if (!userId) {
      console.error('UserId is undefined or null');
      return;
    }

    const stringUserId = userId.toString();

    // Use destructuring to extract values used in function calls
    const { _id: chartId, name, data: newValue } = chartData || {};

    // Your existing code uses `allCollections` but it's not defined in the provided code snippet, ensure it's available in the scope.
    // const { dataset } = chartData; // If cronData is in the state and you want to use it as dataset.

    handleRequestData(stringUserId);
    handleRequestChartData(stringUserId, newValue, name);
    handleCronRequest(userId);
    // handleSendData(stringUserId);
    handleSendData(stringUserId, collectionId, { data: collectionData.cards });
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
          onClick={handleButtonClick}
        >
          Send Message
        </ButtonStyled>
        {cronData?.datasets?.map((data) => (
          <DataBoxStyled key={data?._id}>
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
        ))}
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
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Profile updated successfully"
      />
    </Container>
  );
};

export default ProfilePage;
