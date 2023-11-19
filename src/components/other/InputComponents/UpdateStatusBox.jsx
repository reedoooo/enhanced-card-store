import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useCombinedContext } from '../../../context/CombinedProvider';
import { useCookies } from 'react-cookie';

const UpdateStatusBox = ({ socket }) => {
  const { allCollectionData, listOfMonitoredCards, listOfSimulatedCards } =
    useCombinedContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [updateStatus, setUpdateStatus] = useState('Waiting for updates...');
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleStatusUpdate = (statusUpdate) => {
      setUpdateStatus(statusUpdate.message || 'Waiting for updates...');
    };

    if (socket) {
      socket.on('STATUS_UPDATE', handleStatusUpdate);
    }

    // Cleanup function
    return () => {
      clearInterval(timeInterval);
      if (socket) {
        socket.off('STATUS_UPDATE', handleStatusUpdate);
      }
    };
  }, [socket]);

  const sendUpdateRequest = () => {
    if (socket) {
      socket.emit('STATUS_UPDATE_REQUEST', {
        message: 'Requesting status update...',
        data: listOfMonitoredCards,
      });
    }
  };

  // Styling for dark theme
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

  return (
    <div style={styles.container}>
      <Typography variant="subtitle1">
        Current Time: {currentTime.toLocaleTimeString()}
      </Typography>
      <div style={styles.statusBox}>
        <Typography variant="body1">Update Status: {updateStatus}</Typography>
      </div>
      <button style={styles.button} onClick={sendUpdateRequest}>
        Request Update
      </button>
    </div>
  );
};

export default UpdateStatusBox;
