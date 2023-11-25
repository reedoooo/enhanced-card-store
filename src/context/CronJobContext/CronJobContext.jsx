import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../UserContext/UserContext';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { useCombinedContext } from '../CombinedProvider';

const CronJobContext = createContext();

export const useCronJobContext = () => useContext(CronJobContext);

export const CronJobProvider = ({ children }) => {
  const { user } = useUserContext();
  const { allCollections } = useCollectionStore();
  const { handleSendAllCardsInCollections } = useCombinedContext();
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
        if (user && user.userID) {
          console.log('Triggering cron job actions');
          // Call your functions here
          handleSendAllCardsInCollections(user.userID);
        }
      }
    };

    const interval = setInterval(handleTriggerCronJob, 1000); // Check every second
    return () => clearInterval(interval);
  }, [
    lastCronJobTriggerTime,
    user,
    allCollections,
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
