import { useState, useEffect, useCallback } from 'react';
function generateNewPrice(lastPrice) {
  const fluctuation = (Math.random() - 0.5) * 0.1; // Random fluctuation between -0.05 and +0.05
  const newPrice = lastPrice + lastPrice * fluctuation; // Slightly increase or decrease the last price
  return parseFloat(newPrice.toFixed(2)); // Ensure the new price is formatted to 2 decimal places
}
const useCardCronJob = (initialCardData) => {
  const [cardData, setCardData] = useState(initialCardData);
  const [intervalId, setIntervalId] = useState(null);

  // Function to update the card's daily price history
  const updatePriceHistory = useCallback(() => {
    setCardData((currentCardData) => {
      if (!currentCardData) return null;
      const lastPrice =
        currentCardData?.dailyPriceHistory.slice(-1)[0]?.num ||
        currentCardData?.price; // Get last price or default to initial price
      const newDailyPriceHistory = [...currentCardData.dailyPriceHistory];

      // Generate 10 new daily prices
      for (let i = 0; i < 10; i++) {
        const newPrice = generateNewPrice(lastPrice);
        newDailyPriceHistory.push({
          num: newPrice,
          timestamp: new Date().toISOString(),
        });
      }

      // Ensure the dailyPriceHistory doesn't exceed 10 entries
      const slicedHistory = newDailyPriceHistory.slice(-10);

      return {
        ...currentCardData,
        dailyPriceHistory: slicedHistory,
      };
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updatePriceHistory();
    }, 120000);
    return () => clearInterval(intervalId);
  }, [updatePriceHistory]);

  const startUpdates = useCallback(() => {
    console.log('Starting updates');
    if (!intervalId) {
      const id = setInterval(updatePriceHistory, 120000);
      setIntervalId(id);
    }
  }, [updatePriceHistory, intervalId]);

  const pauseUpdates = useCallback(() => {
    console.log('Pausing updates');
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const resetData = useCallback(() => {
    console.log('Resetting data to initial state');
    setCardData(initialCardData);
    pauseUpdates();
  }, [initialCardData, pauseUpdates]);

  return {
    cardData,
    updatePriceHistory,
    startUpdates,
    pauseUpdates,
    resetData,
  };
};

export default useCardCronJob;
