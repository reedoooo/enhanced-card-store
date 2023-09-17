// const generateDateLabels = () => {
//   const labels = [];
//   const currentDate = new Date();

//   for (let i = 0; i < 14; i++) {
//     const date = new Date(currentDate);
//     date.setDate(currentDate.getDate() + i);
//     const formattedDate = date.toLocaleDateString(); // Format the date as needed
//     labels.push(formattedDate);
//   }

//   return labels;
// };

const calculateTotalPrice = (cards) => {
  return cards.reduce((total, card) => {
    const tcgplayerPrice = card.card_prices?.[0]?.tcgplayer_price || 0; // Use optional chaining to safely access nested properties
    return total + parseFloat(tcgplayerPrice);
  }, 0);
};

const createDataset = (label, data, labelField) => {
  return {
    id: label,
    color: 'blue', // Set the desired color
    data: data.map((item) => ({
      x: item[labelField], // Use the specified label field as x value
      y: item.y, // Assuming the y value is already set correctly
      label: item.label,
    })),
  };
};

const UpdateChartData = (selectedCollection) => {
  // const labels = generateDateLabels();
  const datasets = [];
  const updateTimes = []; // Array to store update timestamps

  console.log('LABELS:', updateTimes);

  const updateChart = () => {
    if (selectedCollection?.cards) {
      const totalPrice = calculateTotalPrice(selectedCollection.cards);
      console.log('totalPrice:', totalPrice);

      const currentTimestamp = new Date().getTime();
      updateTimes.push(currentTimestamp);

      const totalPriceData = updateTimes.map((timestamp, index) => ({
        x: timestamp,
        y: totalPrice.toFixed(2), // Use the fetched totalPrice value directly
        label: updateTimes[index],
      }));

      datasets.push(createDataset('totalPrice', totalPriceData, 'x'));
      // Assuming you have a way to update your chart with the new datasets here
      // You should update your chart with the new data in this function
    }
  };

  // Initial chart update
  updateChart();

  // Update the chart every 30 minutes (adjust the interval as needed)
  // setInterval(updateChart, 30 * 60 * 1000);

  setInterval(updateChart, 60 * 1000); // Change to 60 seconds for every minute

  return datasets;
};

export default UpdateChartData;
