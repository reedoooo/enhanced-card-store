import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * NotFoundPage - A stateless functional component to display when a page is not found.
 * It uses Material-UI components for layout and styling.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  // Handler to navigate back to the home page
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
