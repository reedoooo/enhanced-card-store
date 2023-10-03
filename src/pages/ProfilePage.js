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
  const { user, updateUser } = useUserContext();
  const [cookies] = useCookies(['userCookie']);
  const {
    handleSend,
    handleRequestData,
    handleRequestChartData,
    // handleAddDataSet,
    handleCronRequest,
    handleStartCron,
    chartData,
  } = useCombinedContext();
  console.log('CHART DATA', chartData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log('USER:', user);
  const handleSaveChanges = useCallback(
    (data) => {
      updateUser(data);
      setOpenSnackbar(true);
    },
    [updateUser]
  );
  const dataset = { x: 10, y: 20 };
  const userId = user?.userID;
  const chartId = chartData[0]?._id;
  // const name = chartData[0].name;

  console.log('chartId', chartId);
  console.log('dataset', dataset);

  const handleButtonClick = () => {
    handleSend('Hello, Server!');
    if (userId) {
      handleRequestData(userId.toString());

      handleRequestChartData(userId.toString());
      handleCronRequest(userId.toString());
      // handleAddDataSet(chartId, dataset, userId, name);
      // handleStartCron(userId);
    } else {
      console.error('UserId is undefined or null');
    }
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
        <button onClick={handleButtonClick}>Send Message</button>
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
