import { createContext, useContext, useState } from 'react';
import {
  groupAndAverageData,
  convertDataForNivo2,
  getUniqueValidData,
  getTickValues,
  getFilteredData,
  formatDateToString,
} from './helpers';

const ChartContext = createContext();

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }
  return context;
};

export const ChartProvider = ({ children }) => {
  const [latestData, setLatestData] = useState(null);
  const [timeRange, setTimeRange] = useState(86400000 || 24 * 60 * 60 * 1000); // Default to 24 hours

  const [timeRanges] = useState([
    { label: '2 hours', value: 720000 || 2 * 60 * 60 * 1000 },
    { label: '24 hours', value: 86400000 || 24 * 60 * 60 * 1000 },
    { label: '7 days', value: 604800000 || 7 * 24 * 60 * 60 * 1000 },
    { label: '1 month', value: 2592000000 || 30 * 24 * 60 * 60 * 1000 },
  ]);

  const currentValue = timeRanges.find((option) => option.value === timeRange);

  const handleChange = (e) => {
    setTimeRange(e.target.value); // Update timeRange based on selection
  };
  return (
    <ChartContext.Provider
      value={{
        currentValue,
        latestData,
        timeRange,
        timeRanges,

        groupAndAverageData,
        convertDataForNivo2,
        // getUniqueValidData,
        getTickValues,
        getFilteredData,
        formatDateToString,
        setTimeRange,
        setLatestData,
        handleChange,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
