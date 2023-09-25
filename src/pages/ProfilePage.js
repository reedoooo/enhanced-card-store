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
    setFormData({ userName, name, age, status });
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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log('USER:', user);
  const handleSaveChanges = useCallback(
    (data) => {
      updateUser(data);
      setOpenSnackbar(true);
    },
    [updateUser]
  );

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
      <Box mt={3}>
        <ProfileForm
          {...user}
          userName={cookies.userCookie?.username}
          onSave={handleSaveChanges}
        />
      </Box>
      <UserStats />
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
