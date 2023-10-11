import React from 'react';
import { Box, Button } from '@mui/material';
import { useCombinedContext } from '../../context/CombinedProvider';
import { useUserContext } from '../../context/UserContext/UserContext';

const CronTrigger = () => {
  const { stopCronJob, handleSendAllCardsInCollections, listOfMonitoredCards } =
    useCombinedContext();
  const { user } = useUserContext();

  const handleTriggerCron = () => {
    console.log('TRIGGERING CRON JOB TO UPDATE: ' + listOfMonitoredCards);
    handleSendAllCardsInCollections(user.userID, listOfMonitoredCards);
  };

  const handleStopCron = () => {
    stopCronJob();
  };

  return (
    <Box>
      <Button onClick={handleTriggerCron}>Trigger Cron Job</Button>

      <Button onClick={handleStopCron}>Stop Cron Job</Button>
    </Box>
  );
};

export default CronTrigger;
