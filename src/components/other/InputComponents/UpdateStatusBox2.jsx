import React, { useState, useEffect } from 'react';
import { Snackbar, Typography, Box, Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useCombinedContext, useMode } from '../../../context';
import { StyledChartBox } from '../../../pages/pageStyles/StyledComponents';

const UpdateStatusBox2 = ({ socket }) => {
  const { listOfMonitoredCards, handleSendAllCardsInCollections } =
    useCombinedContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [updateStatus, setUpdateStatus] = useState('Waiting for cron...');
  const [cookies] = useCookies(['authUser']);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });

  const userId = cookies?.authUser?.userId;
  const { theme } = useMode();
  const openSnackbar = (message) => {
    setSnackbarData({ open: true, message });
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleStatusUpdate = (statusUpdate) => {
      setUpdateStatus(
        (prevStatus) =>
          statusUpdate.message || prevStatus || 'Waiting for updates...'
      );
    };

    socket?.on('INITIAL_RESPONSE', handleStatusUpdate);

    return () => {
      clearInterval(timeInterval);
      socket?.off('INITIAL_RESPONSE', handleStatusUpdate);
    };
  }, [socket]); // Assuming `socket` is stable and doesn't change on every render

  const handleTriggerCronJob = () => {
    if (userId && listOfMonitoredCards.length > 0) {
      handleSendAllCardsInCollections(userId, listOfMonitoredCards);
      openSnackbar('Triggered the cron job.');
    }
  };

  return (
    <StyledChartBox theme={theme}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Current Time: {currentTime.toLocaleTimeString()}
      </Typography>
      <Box
        sx={{
          marginTop: '15px',
          padding: '10px',
          background: '#333',
          borderRadius: '6px',
          border: '1px solid #555',
          width: '100%', // Ensure consistent width
        }}
      >
        <Typography variant="body1">Update Status: {updateStatus}</Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          marginTop: '10px',
          backgroundColor: '#5CDB95',
          '&:hover': {
            backgroundColor: '#45a379',
          },
        }}
        onClick={handleTriggerCronJob}
      >
        Request CRON
      </Button>
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarData({ ...snackbarData, open: false })}
        message={snackbarData.message}
      />
    </StyledChartBox>
  );
};

export default UpdateStatusBox2;
