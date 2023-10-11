// import { useCallback, useEffect } from 'react';
// import moment from 'moment';
// import { useCollectionStore } from './hooks/collection';
// import { useCombinedContext } from './CombinedProvider';

// const transformChartData = (chartData) => {
//   let pointsArray = [];

//   if (Array.isArray(chartData?.datasets)) {
//     chartData?.datasets.forEach((dataset) => {
//       dataset.data?.forEach((dataEntry) => {
//         const { x, y } = dataEntry.xy;
//         if (x && y !== undefined) {
//           pointsArray.push(dataEntry.xy);
//         }
//       });
//     });
//   } else {
//     console.error(
//       'Expected chartData.datasets to be an array, but got:',
//       chartData
//     );
//   }

//   return pointsArray;
// };
// const useUpdateChartData = () => {
//   const { selectedCollection } = useCollectionStore() || {};
//   const {
//     updateServerData,
//     isCronJobTriggered,
//     setIsCronJobTriggered,
//     chartData,
//   } = useCombinedContext() || {};

//   const transformedData = transformChartData(selectedCollection?.chartData);

//   // const createDataset = (label, priceData) => ({
//   //   name: label,
//   //   color: 'blue',
//   //   data: priceData?.map(({ x, y }) => ({ x, y })),
//   // });

//   // const newDataPoint = useCallback(() => {
//   //   return {
//   //     x: moment().format('YYYY-MM-DD HH:mm'),
//   //     y: totalCost ? parseFloat(totalCost).toFixed(2) : null,
//   //   };
//   // }, [totalCost]);

//   // const updateChart = useCallback(() => {
//   //   // let updatedDatasets = [];
//   //   const updatedDatasets = selectedCollection?.chartData?.datasets || [];
//   //   if (updatedDatasets.length) {
//   //     updateServerData(updatedDatasets);
//   //   }
//   //   // if (updatedDatasets.length) {
//   //   //   updateServerData(updatedDatasets);
//   //   // }
//   // }, []);

//   useEffect(() => {
//     if (isCronJobTriggered) {
//       // updateChart();
//       setIsCronJobTriggered(false);
//     }
//   }, [isCronJobTriggered, setIsCronJobTriggered]);
//   console.log('transformedData', transformedData);
//   return { datasets: transformedData };
// };

// export default useUpdateChartData;
