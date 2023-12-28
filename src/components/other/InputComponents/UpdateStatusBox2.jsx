import React, { useState, useEffect } from 'react';
import { Snackbar, Typography } from '@mui/material';
import { useCombinedContext } from '../../../context/CombinedContext/CombinedProvider';
import { useCookies } from 'react-cookie';

const styles = {
  container: {
    padding: '15px',
    border: '2px solid #444',
    borderRadius: '8px',
    backgroundColor: '#222',
    color: '#fff',
    // margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%', // Adjust height here
    width: '100%', // Adjust width here
  },
  statusBox: {
    marginTop: '15px',
    padding: '10px',
    background: '#333',
    borderRadius: '6px',
    border: '1px solid #555',
  },
  button: {
    padding: '10px 20px',
    marginTop: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#5CDB95',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    letterSpacing: '1px',
    outline: 'none',
  },
};

const UpdateStatusBox2 = ({ socket }) => {
  const {
    allCollectionData,
    listOfMonitoredCards,
    handleSendAllCardsInCollections,
  } = useCombinedContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [updateStatus, setUpdateStatus] = useState('Waiting for cron...');
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cookies] = useCookies(['authUser']);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  });
  const userId = cookies?.authUser?.id;
  const openSnackbar = (message) => {
    setSnackbarData({ open: true, message });
  };
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleStatusUpdate = (statusUpdate) => {
      setUpdateStatus(statusUpdate.message || 'Waiting for updates...');
    };

    if (socket) {
      socket.on('INITIAL_RESPONSE', handleStatusUpdate);
    }

    // Cleanup function
    return () => {
      clearInterval(timeInterval);
      if (socket) {
        socket.off('INITIAL_RESPONSE', handleStatusUpdate);
      }
    };
  }, [socket]);
  const handleTriggerCronJob = () => {
    console.log('TRIGGERING CRON JOB');
    console.log('USER ID:', userId);
    console.log('LIST OF MONITORED CARDS:', listOfMonitoredCards);
    if (userId && listOfMonitoredCards) {
      handleSendAllCardsInCollections(userId, listOfMonitoredCards);
      console.log('SENDING ALL CARDS IN COLLECTIONS');
      openSnackbar('Triggered the cron job.');
    }
  };

  return (
    <div style={styles.container}>
      <Typography variant="subtitle1">
        Current Time: {currentTime.toLocaleTimeString()}
      </Typography>
      <div style={styles.statusBox}>
        <Typography variant="body1">Update Status: {updateStatus}</Typography>
      </div>
      <button style={styles.button} onClick={() => handleTriggerCronJob()}>
        Request CRON
      </button>
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarData({ ...snackbarData, open: false })}
        message={snackbarData.message}
      />
    </div>
  );
};

export default UpdateStatusBox2;
