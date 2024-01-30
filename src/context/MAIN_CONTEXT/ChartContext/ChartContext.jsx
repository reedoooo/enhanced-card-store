import { createContext, useContext, useMemo, useState } from 'react';
import {
  groupAndAverageData,
  convertDataForNivo2,
  getUniqueValidData,
  getTickValues,
  getFilteredData,
  formatDateToString,
  finalizeNivoData,
} from './helpers';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { defaultContextValue } from '../../constants';

const ChartContext = createContext(defaultContextValue.CHART_CONTEXT);

export const ChartProvider = ({ children }) => {
  const { selectedCollection } = useCollectionStore();
  const [latestData, setLatestData] = useState(null);
  const [timeRanges] = useState([
    { label: '2 hours', value: 720000 || 2 * 60 * 60 * 1000 },
    { label: '24 hours', value: 86400000 || 24 * 60 * 60 * 1000 },
    { label: '7 days', value: 604800000 || 7 * 24 * 60 * 60 * 1000 },
    { label: '1 month', value: 2592000000 || 30 * 24 * 60 * 60 * 1000 },
    { label: '3 months', value: 7776000000 || 90 * 24 * 60 * 60 * 1000 },
    { label: '6 months', value: 15552000000 || 180 * 24 * 60 * 60 * 1000 },
    { label: '12 months', value: 31536000000 || 365 * 24 * 60 * 60 * 1000 },
  ]);
  const [timeRange, setTimeRange] = useState(86400000 || 24 * 60 * 60 * 1000); // Default to 24 hours
  const finalizedNivoData = useMemo(() => {
    if (selectedCollection.nivoChartData) {
      return finalizeNivoData(selectedCollection?.nivoChartData);
    }
  }, [latestData]);

  const currentValue = timeRanges.find((option) => option.value === timeRange);

  const handleChange = (e) => {
    setTimeRange(e.target.value); // Update timeRange based on selection
  };

  const { tickValues, xFormat } = useMemo(() => {
    let format, ticks;
    switch (timeRange) {
      case '2 hours':
        format = '%H:%M';
        ticks = 'every 15 minutes';
        break;
      case '24 hours':
        format = '%H:%M';
        ticks = 'every hour';
        break;
      case '7 days':
        format = '%b %d';
        ticks = 'every day';
        break;
      case '1 month':
        format = '%b %d';
        ticks = 'every 3 days';
        break;
      case '3 months':
        format = '%b %d';
        ticks = 'every week';
        break;
      case '6 months':
        format = '%b %d';
        ticks = 'every week';
        break;
      case '12 months':
        format = '%b %d';
        ticks = 'every month';
        break;
      default:
        format = '%b %d';
        ticks = 'every day';
    }
    return { tickValues: ticks, xFormat: `time:${format}` };
  }, [timeRange]);

  const contextValue = useMemo(
    () => ({
      currentValue,
      latestData,
      timeRange,
      timeRanges,
      tickValues,
      xFormat,
      finalizedNivoData,
      nivoChartData: selectedCollection?.nivoChartData,
      muiChartData: selectedCollection?.muiChartData,

      finalizeNivoData,
      groupAndAverageData,
      convertDataForNivo2,
      // getUniqueValidData,
      getTickValues,
      getFilteredData,
      formatDateToString,
      setTimeRange,
      setLatestData,
      handleChange,
    }),
    [
      latestData,
      setLatestData,
      timeRange,
      setTimeRange,
      timeRanges,
      currentValue,
      handleChange,
      tickValues,
      xFormat,
      finalizedNivoData,
    ]
  );
  return (
    <ChartContext.Provider value={contextValue}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }
  return context;
};
