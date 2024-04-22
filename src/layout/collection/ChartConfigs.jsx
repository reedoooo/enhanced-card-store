/* eslint-disable max-len */
import { useAppContext, useMode } from '../../context';
import { useEffect, useMemo, useState } from 'react';
import NivoContainer from '../REUSABLE_COMPONENTS/NivoContainer';
import { BasicTooltip } from '@nivo/tooltip';
import { useEventHandlers } from '../../context/hooks/useEventHandlers';
import MyResponsiveLine from './MyPortfolioLineChart';
import { ChartArea } from '../../pages/pageStyles/StyledComponents';
import { useForm, useWatch } from 'react-hook-form';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useRCFormHook from '../../components/forms/hooks/useRCFormHook';
import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import { i } from 'mathjs';
const formatDateBasedOnRange = (range) => {
  const formatMap = {
    '24hr': { format: '%H:%M', ticks: 'every hour' },
    '7d': { format: '%b %d', ticks: 'every day' },
    '30d': { format: '%b %d', ticks: 'every day' },
    '90d': { format: '%b %d', ticks: 'every 3 days' },
    '180d': { format: '%b %d', ticks: 'every 6 days' },
    '270d': { format: '%b %d', ticks: 'every 9 days' },
    '365d': { format: '%b %d', ticks: 'every 12 days' },
    default: { format: '%b %d', ticks: 'every day' },
  };

  return formatMap[range] || formatMap.default;
};
export const ChartConfiguration = () => {
  const { theme } = useMode();
  const { greenAccent, redAccent, grey } = theme.palette.chartTheme;
  const { selectedTimeRange = '24hr' } = useCompileCardData();
  const { selectedCollection, createMarkers } = useSelectedCollection();

  // Early return if collection is not selected
  if (!selectedCollection) {
    return <LoadingOverlay />;
  }

  // Calculate memoized values for chart data and markers
  const memoChartData = useMemo(() => {
    const { selectedChartData, averagedChartData, selectedChartDataKey } =
      selectedCollection;
    // if selectedChartData is an empty object, return the averagedChartData, else return selectedChartData
    return !selectedChartData.data.length
      ? averagedChartData[selectedChartDataKey]
      : selectedChartData;
  }, [selectedCollection]);

  const validMarkers = useMemo(() => {
    const markers = createMarkers(selectedCollection);
    return markers.filter((marker) => marker.id && marker.value !== undefined);
  }, [createMarkers, selectedCollection]);

  const tickValues = useMemo(() => {
    const { ticks } = formatDateBasedOnRange(selectedTimeRange);
    return ticks.split(' ').map((tick) => new Date(tick).getTime());
  }, [selectedTimeRange]);

  useEffect(() => {
    console.log('Chart data:', memoChartData);
  }, [memoChartData]);

  if (!memoChartData) {
    return <LoadingOverlay />;
  }

  return (
    <ChartArea theme={theme} sx={{ minHeight: '500px' }}>
      <NivoContainer height={500}>
        <MyResponsiveLine
          data={[memoChartData]}
          tickValues={tickValues}
          validMarkers={validMarkers}
          xFormat={memoChartData.id === '24hr' ? '%H:%M' : '%b %d'}
          redAccent={redAccent}
          greenAccent={greenAccent}
          grey={grey}
          text={theme.palette.text.primary}
        />
      </NivoContainer>
    </ChartArea>
  );
};
// const TooltipLayer = ({ points }) => (
//   <>
//     {points?.map((point) => (
//       <BasicTooltip
//         key={point.id}
//         id={point.id}
//         value={point.data.yFormatted}
//         color="#000000"
//         enableChip
//       />
//     ))}
//   </>
// );
// import PropTypes from 'prop-types';

// export const ChartConfiguration = () => {
//   const { theme } = useMode();
//   const { greenAccent, redAccent, grey } = theme.palette.chartTheme;
//   const { selectedTimeRange = '24hr' } = useCompileCardData();
//   // , chartData } = useCompileCardData(); // Default to '24hr' if not set
//   const { selectedCollection, updateCollectionField, createMarkers } =
//     useSelectedCollection();
//   // const { handleMouseMove, handleMouseLeave } = useEventHandlers();
//   if (!selectedCollection) {
//     return <LoadingOverlay />;
//   }
//   if (selectedCollection?.selectedChartData?.data?.length === 0) {
//     return <LoadingOverlay />;
//   }
//   const memoTimeRange = useMemo(
//     () =>
//       !selectedCollection?.selectedChartData ||
//       !selectedCollection?.selectedChartData?.data?.length
//         ? selectedTimeRange
//         : selectedCollection.selectedChartDataKey,
//     [selectedCollection?.selectedChartData, selectedTimeRange]
//   );
//   const memoChartData = useMemo(
//     () =>
//       !selectedCollection?.selectedChartData
//         ? selectedCollection?.averagedChartData[memoTimeRange]
//         : selectedCollection?.selectedChartData,
//     [
//       selectedCollection?.selectedChartDataKey,
//       selectedCollection?.averagedChartData,
//       memoTimeRange,
//     ]
//   );
//   const validMarkers = useMemo(() => {
//     const markers = createMarkers(selectedCollection);
//     return markers?.filter((marker) => marker.value !== undefined), markers;
//   }, [createMarkers, selectedCollection]);
//   const tickValues = useMemo(() => {
//     const { format, ticks } = formatDateBasedOnRange(selectedTimeRange);
//     return ticks?.split(' ')?.map((tick) => new Date(tick)?.getTime());
//   }, [selectedTimeRange]);
//   const xformat = useMemo(() => {
//     const format = memoChartData?.id === '24hr' ? '%H:%M' : '%b %d';
//     return format;
//   }, [memoChartData?.id]);
//   useEffect(() => {
//     console.log('NIVO SELECTED DATA ', memoChartData);
//     console.log('NIVO SELECTED TIME RANGE ', selectedTimeRange);
//   }, [memoChartData]);
//   if (!memoChartData) {
//     return <LoadingOverlay />;
//   }
//   return (
//     <ChartArea
//       theme={theme}
//       sx={{
//         minHeight: '500px',
//       }}
//     >
//       <NivoContainer height={500}>
//         <MyResponsiveLine
//           data={[memoChartData]}
//           // data={Object.values(selectedCollection?.averagedChartData)}
//           selectedData={selectedCollection?.selectedChartDataKey}
//           // handleMouseLeave={handleMouseLeave}
//           // handleMouseMove={handleMouseMove}
//           // TooltipLayer={TooltipLayer}
//           tickValues={tickValues}
//           validMarkers={validMarkers}
//           xFormat={xformat}
//           redAccent={redAccent}
//           greenAccent={greenAccent}
//           grey={grey}
//           text={theme.palette.text.primary}
//         />
//       </NivoContainer>
//     </ChartArea>
//   );
// };

// ChartConfiguration.propTypes = {
// markers: PropTypes.arrayOf(
//   PropTypes.shape({
//     axis: PropTypes.oneOf(['x', 'y']).isRequired,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//       .isRequired,
//     legend: PropTypes.string,
//     lineStyle: PropTypes.object,
//   })
// ),
// height: PropTypes.number.isRequired,
// nivoChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
// range: PropTypes.oneOf(['24hr', '7d', '30d', '90d', '180d', '270d', '365d'])
//   .isRequired,
// loadingID: PropTypes.string.isRequired,
// };
