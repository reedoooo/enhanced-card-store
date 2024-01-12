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

  // const updateCardData = useCallback(() => {
  //   setCardData((currentCard) => {
  //     console.log('Updating card data:', cardData);
  //     console.log('Current card data:', currentCard);
  //     const newPriceHistory = {
  //       num: (Math.random() * 10).toFixed(2), // or however you calculate new price
  //       timestamp: new Date().toISOString(),
  //     };

  //     return {
  //       ...currentCard,
  //       quantity: currentCard.quantity + 1, // Increment quantity or however you update
  //       dailyPriceHistory: [...currentCard.dailyPriceHistory, newPriceHistory],
  //     };
  //   });
  // }, []);

  // Simulate a cron job with useEffect and setInterval
  useEffect(() => {
    const intervalId = setInterval(() => {
      updatePriceHistory(); // Update price history every interval
    }, 120000); // Update every 5 seconds for example, adjust as needed

    // Cleanup function to clear interval when component unmounts or updates
    return () => clearInterval(intervalId);
  }, [updatePriceHistory]);

  const startUpdates = useCallback(() => {
    console.log('Starting updates');
    if (!intervalId) {
      const id = setInterval(updatePriceHistory, 120000); // Update every 2 minutes, adjust as needed
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

  // useEffect(() => {
  //   return () => {
  //     // Cleanup interval on component unmount
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [intervalId]);

  return {
    cardData,
    updatePriceHistory,
    startUpdates,
    pauseUpdates,
    resetData,
  };
};

export default useCardCronJob;
