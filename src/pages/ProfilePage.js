import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Avatar,
  IconButton,
  Container,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import placeholder from '../assets/placeholder.jpeg'; // Your placeholder image

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle the save changes logic here...
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <Avatar
          sx={{
            width: 200,
            height: 200,
          }}
          alt="Profile picture"
          src={placeholder}
        />
        <IconButton>
          <EditIcon />
        </IconButton>
      </Box>

      <Box mt={3}>
        <form onSubmit={handleSaveChanges}>
          <FormControl fullWidth mb={3}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <TextField
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth mb={3}>
            <InputLabel htmlFor="age">Age</InputLabel>
            <TextField
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth mb={3}>
            <InputLabel htmlFor="status">Relationship Status</InputLabel>
            <TextField
              id="status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProfilePage;
