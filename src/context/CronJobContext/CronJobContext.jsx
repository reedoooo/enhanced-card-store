import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../UserContext/UserContext';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { useCombinedContext } from '../CombinedContext/CombinedProvider';

const CronJobContext = createContext();

export const useCronJobContext = () => useContext(CronJobContext);

export const CronJobProvider = ({ children }) => {
  const { user } = useUserContext();
  const { selectedCollection } = useCollectionStore(); // Assuming this is where you get your selectedCollection
  const { handleSendAllCardsInCollections, listOfMonitoredCards } =
    useCombinedContext();
  const [lastCronJobTriggerTime, setLastCronJobTriggerTime] = useState(
    new Date().getTime()
  );

  useEffect(() => {
    const handleTriggerCronJob = () => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastCronJobTriggerTime;

      // Check the conditions for triggering the cron job
      if (
        timeDifference >= 120000 &&
        listOfMonitoredCards.length > 5 &&
        selectedCollection?.chartData?.allXYValues?.length > 10
      ) {
        setLastCronJobTriggerTime(currentTime);
        if (user?.id) {
          console.log('Triggering cron job actions');
          handleSendAllCardsInCollections(user.id, listOfMonitoredCards);
        }
      }
    };

    const interval = setInterval(handleTriggerCronJob, 120000); // Trigger every 2 minutes (120000 ms)
    return () => clearInterval(interval);
  }, [
    lastCronJobTriggerTime,
    user,
    listOfMonitoredCards,
    selectedCollection,
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
