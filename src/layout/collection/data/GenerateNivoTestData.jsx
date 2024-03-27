import { addDays, format, parseISO } from 'date-fns';

// Function to generate an incremental data set with occasional dips
const generateIncrementalData = (start, end, minY, maxY, interval = 1) => {
  let data = [];
  let currentValue = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

  for (let date = start; date <= end; date = addDays(date, interval)) {
    // Randomly decide if the next point should be a dip
    if (Math.random() > 0.8) {
      // Create a dip but ensure it's above the minimum
      currentValue = Math.max(
        currentValue - Math.floor(Math.random() * (maxY / 10)),
        minY
      );
    } else {
      // Increment the value but cap it at maxY
      currentValue = Math.min(
        currentValue + Math.floor(Math.random() * (maxY / 10)),
        maxY
      );
    }

    data.push({
      _id: Math.random().toString(36).substr(2, 9), // Simulate an objectId
      x: format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      y: currentValue,
    });
  }

  return data;
};

const generateNivoTestData = () => {
  const today = new Date();
  return [
    {
      id: '24h',
      color: '#06d6a0',
      data: generateIncrementalData(addDays(today, -1), today, 2, 30, 1 / 24),
    },
    {
      id: '7d',
      color: '#06d6a0',
      data: generateIncrementalData(addDays(today, -7), today, 31, 60),
    },
    {
      id: '30d',
      color: '#06d6a0',
      data: generateIncrementalData(addDays(today, -30), today, 61, 120),
    },
    {
      id: '90d',
      color: '#06d6a0',
      data: generateIncrementalData(addDays(today, -90), today, 121, 240, 3),
    },
    {
      id: '180d',
      color: '#06d6a0',
      data: generateIncrementalData(addDays(today, -180), today, 241, 480, 6),
    },
    {
      id: '270d',
      color: '#06d6a0',
      data: generateIncrementalData(addDays(today, -270), today, 481, 960, 9),
    },
    {
      id: '365d',
      color: '#06d6a0',
      data: generateIncrementalData(addDays(today, -365), today, 961, 2789, 12),
    },
  ];
};

const nivoTestData = generateNivoTestData();

export default nivoTestData;
