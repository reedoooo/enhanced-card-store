import { useState, useEffect, useCallback } from 'react';

const useCardCronJob = (initialCardData) => {
  const [cardData, setCardData] = useState(initialCardData);
  const [intervalId, setIntervalId] = useState(null);

  const updateCardData = useCallback(() => {
    setCardData((currentCard) => {
      console.log('Updating card data:', cardData);
      console.log('Current card data:', currentCard);
      const newPriceHistory = {
        num: (Math.random() * 10).toFixed(2), // or however you calculate new price
        timestamp: new Date().toISOString(),
      };

      return {
        ...currentCard,
        quantity: currentCard.quantity + 1, // Increment quantity or however you update
        dailyPriceHistory: [...currentCard.dailyPriceHistory, newPriceHistory],
      };
    });
  }, []);

  const startUpdates = useCallback(() => {
    console.log('Starting updates');
    if (!intervalId) {
      const id = setInterval(updateCardData, 120000); // Update every 2 minutes
      setIntervalId(id);
    }
  }, [updateCardData, intervalId]);

  const pauseUpdates = useCallback(() => {
    console.log('Pausing updates');
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const resetData = useCallback(() => {
    console.log('Resetting data');
    setCardData(initialCardData);
    pauseUpdates();
  }, [initialCardData, pauseUpdates]);

  useEffect(() => {
    return () => {
      // Cleanup interval on component unmount
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return {
    cardData,
    startUpdates,
    pauseUpdates,
    resetData,
  };
};

export default useCardCronJob;
