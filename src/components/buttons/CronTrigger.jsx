import React from 'react';
import { Box, Button } from '@mui/material';
import { useUtility } from '../../context/UtilityContext/UtilityContext';

const CronTrigger = () => {
  const { triggerCronJob, stopCronJob } = useUtility();

  const handleTriggerCron = () => {
    triggerCronJob();
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
