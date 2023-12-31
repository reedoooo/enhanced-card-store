import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../UserContext/UserContext';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { useCombinedContext } from '../CombinedContext/CombinedProvider';

const CronJobContext = createContext();

export const useCronJobContext = () => useContext(CronJobContext);

export const CronJobProvider = ({ children }) => {
  const { user, userId } = useUserContext();
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

      if (
        timeDifference >= 120000 &&
        listOfMonitoredCards.length > 5 &&
        selectedCollection?.chartData?.allXYValues?.length > 10
      ) {
        setLastCronJobTriggerTime(currentTime);
        if (userId) {
          console.log('Triggering cron job actions');
          handleSendAllCardsInCollections(userId, listOfMonitoredCards);
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
