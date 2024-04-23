// /* eslint-disable max-len */
// import { useAppContext, useMode } from '../../context';
// import { useEffect, useMemo, useState } from 'react';
// import NivoContainer from '../REUSABLE_COMPONENTS/layout-utils/NivoContainer';
// import { BasicTooltip } from '@nivo/tooltip';
// import { useEventHandlers } from '../../context/hooks/useEventHandlers';
// import MyResponsiveLine from './MyPortfolioLineChart';
// import { ChartArea } from '../../pages/pageStyles/StyledComponents';
// import { useForm, useWatch } from 'react-hook-form';
// import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// import useRCFormHook from '../../components/forms/hooks/useRCFormHook';
// import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';
// import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
// import { i } from 'mathjs';
// const formatDateBasedOnRange = (range) => {
//   const formatMap = {
//     '24hr': { format: '%H:%M', ticks: 'every hour' },
//     '7d': { format: '%b %d', ticks: 'every day' },
//     '30d': { format: '%b %d', ticks: 'every day' },
//     '90d': { format: '%b %d', ticks: 'every 3 days' },
//     '180d': { format: '%b %d', ticks: 'every 6 days' },
//     '270d': { format: '%b %d', ticks: 'every 9 days' },
//     '365d': { format: '%b %d', ticks: 'every 12 days' },
//     default: { format: '%b %d', ticks: 'every day' },
//   };

//   return formatMap[range] || formatMap.default;
// };
// export const ChartConfiguration = () => {
//   const { theme } = useMode();
//   const { greenAccent, redAccent, grey } = theme.palette.chartTheme;
//   const { selectedTimeRange = '24hr' } = useCompileCardData();
//   const { selectedCollection, createMarkers } = useSelectedCollection();
//   if (!selectedCollection) {
//     return <LoadingOverlay />;
//   }
//   const memoChartData = useMemo(() => {
//     const { selectedChartData, averagedChartData, selectedChartDataKey } =
//       selectedCollection;
//     return !selectedChartData.data.length
//       ? averagedChartData[selectedChartDataKey]
//       : selectedChartData;
//   }, [selectedCollection]);
//   const validMarkers = useMemo(() => {
//     const markers = createMarkers(selectedCollection);
//     return markers.filter((marker) => marker.id && marker.value !== undefined);
//   }, [createMarkers, selectedCollection]);
//   const tickValues = useMemo(() => {
//     const { ticks } = formatDateBasedOnRange(selectedTimeRange);
//     return ticks.split(' ').map((tick) => new Date(tick).getTime());
//   }, [selectedTimeRange]);
//   useEffect(() => {
//     console.log('Chart data:', memoChartData);
//   }, [memoChartData]);
//   if (!memoChartData) {
//     return <LoadingOverlay />;
//   }

//   return (
//     <ChartArea theme={theme} sx={{ minHeight: '500px' }}>
//       <NivoContainer height={500}>
//         <MyResponsiveLine
//           key={selectedCollection.selectedChartDataKey}
//           data={[memoChartData]}
//           tickValues={tickValues}
//           validMarkers={validMarkers}
//           xFormat={memoChartData.id === '24hr' ? '%H:%M' : '%b %d'}
//           redAccent={redAccent}
//           greenAccent={greenAccent}
//           grey={grey}
//           text={theme.palette.text.primary}
//         />
//       </NivoContainer>
//     </ChartArea>
//   );
// };
