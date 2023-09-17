import React from 'react';
import { Button } from '@mui/material';
import { useUtility } from '../../context/UtilityContext/UtilityContext';

const CronTrigger = () => {
  const { triggerCronJob } = useUtility();

  const handleTriggerCron = () => {
    triggerCronJob();
  };

  return <Button onClick={handleTriggerCron}>Trigger Cron Job</Button>;
};

export default CronTrigger;
