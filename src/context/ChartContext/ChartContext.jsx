import { createContext, useContext, useState } from 'react';

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
  const [timeRange, setTimeRange] = useState(24 * 60 * 60 * 1000); // Default to 24 hours

  return (
    <ChartContext.Provider
      value={{ latestData, setLatestData, timeRange, setTimeRange }}
    >
      {children}
    </ChartContext.Provider>
  );
};
