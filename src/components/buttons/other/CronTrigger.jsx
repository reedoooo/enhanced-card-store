import React from 'react';
import { Box, Button } from '@mui/material';
import { useCombinedContext } from '../../../context/CombinedProvider';
import { useAuthContext } from '../../../context';

const CronTrigger = () => {
  const { stopCronJob, handleSendAllCardsInCollections, listOfMonitoredCards } =
    useCombinedContext();
  const { userId } = useAuthContext();
  const handleTriggerCron = () => {
    console.log('TRIGGERING CRON JOB TO UPDATE: ' + listOfMonitoredCards);
    handleSendAllCardsInCollections(userId, listOfMonitoredCards);
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
