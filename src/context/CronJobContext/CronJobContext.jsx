import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../UserContext/UserContext';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { useCombinedContext } from '../CombinedContext/CombinedProvider';

const CronJobContext = createContext();

export const useCronJobContext = () => useContext(CronJobContext);

export const CronJobProvider = ({ children }) => {
  const { user } = useUserContext();
  const { handleSendAllCardsInCollections, listOfMonitoredCards } =
    useCombinedContext();
  const [lastCronJobTriggerTime, setLastCronJobTriggerTime] = useState(
    new Date().getTime()
  );

  useEffect(() => {
    const handleTriggerCronJob = () => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastCronJobTriggerTime;

      if (timeDifference >= 60000) {
        // 60 seconds
        setLastCronJobTriggerTime(currentTime);

        if (user?.id && listOfMonitoredCards?.length > 0) {
          console.log('Triggering cron job actions');
          handleSendAllCardsInCollections(user.id, listOfMonitoredCards);
        }
      }
    };

    const interval = setInterval(handleTriggerCronJob, 60000); // Trigger every minute
    return () => clearInterval(interval);
  }, [
    lastCronJobTriggerTime,
    user,
    listOfMonitoredCards,
    handleSendAllCardsInCollections,
  ]);

  return (
    <CronJobContext.Provider
      value={{ lastCronJobTriggerTime, setLastCronJobTriggerTime }}
    >
      {children}
    </CronJobContext.Provider>
  );
};
