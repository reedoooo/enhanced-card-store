import React from 'react';
import { Box, Button } from '@mui/material';
import { useCombinedContext } from '../../context/CombinedProvider';
import { useUserContext } from '../../context/UserContext/UserContext';

const CronTrigger = () => {
  const { stopCronJob, onTrigger } = useCombinedContext();
  // const { triggerCronJob } = useUserContext();

  const handleTriggerCron = () => {
    onTrigger();
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
