import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
import { defaultChartConstants, defaultContextValue } from '../../constants';
const { TIME_RANGES, TIME_RANGE_PROPS, TIME_RANGES_KEYS } =
  defaultChartConstants;

const ChartContext = createContext(defaultContextValue.CHART_CONTEXT);

export const ChartProvider = ({ children }) => {
  const { selectedCollection } = useCollectionStore();
  const [latestData, setLatestData] = useState(null);
  const [timeRange, setTimeRange] = useState({
    id: '24hr',
    value: '24hr',
    name: 'Last 24 Hours',
  });
  // Use useEffect to log changes to timeRange
  useEffect(() => {
    console.log('TimeRange changed to:', timeRange);
  }, [timeRange]); // This effect depends on timeRange, so it runs whenever timeRange changes.

  const finalizedNivoData = useMemo(() => {
    if (selectedCollection.nivoChartData) {
      return finalizeNivoData(selectedCollection?.nivoChartData);
    }
  }, [latestData]);

  const { tickValues, xFormat } = useMemo(() => {
    let format, ticks;
    switch (timeRange) {
      case '24hr':
        format = '%H:%M';
        ticks = 'every hour';
        break;
      case '7d':
        format = '%b %d';
        ticks = 'every day';
        break;
      case '30d':
        format = '%b %d';
        ticks = 'every day';
        break;
      case '90d':
        format = '%b %d';
        ticks = 'every 3 days';
        break;
      case '180d':
        format = '%b %d';
        ticks = 'every 6 days';
        break;
      case '270d':
        format = '%b %d';
        ticks = 'every 9 days';
        break;
      case '365d':
        format = '%b %d';
        ticks = 'every 12 days';
        break;
      default:
        format = '%b %d';
        ticks = 'every day';
    }
    return { tickValues: ticks, xFormat: `time:${format}` };
  }, [timeRange]);

  const contextValue = useMemo(
    () => ({
      // currentValue,
      latestData,
      timeRange,
      timeRanges: TIME_RANGES,
      // selectedTimeRange: selectedTimeRange,
      tickValues,
      xFormat,
      finalizedNivoData,
      nivoChartData: selectedCollection?.nivoChartData,
      newNivoChartData: selectedCollection?.newNivoChartData,
      muiChartData: selectedCollection?.muiChartData,
      // setSelectedTimeRange,
      finalizeNivoData,
      groupAndAverageData,
      convertDataForNivo2,
      // getUniqueValidData,
      getTickValues,
      getFilteredData,
      formatDateToString,
      setTimeRange,
      setLatestData,
      // handleChange,
    }),
    [
      latestData,
      timeRange,
      tickValues,
      xFormat,
      finalizedNivoData,
      selectedCollection?.nivoChartData,
      selectedCollection?.newNivoChartData,
      selectedCollection?.muiChartData,
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
