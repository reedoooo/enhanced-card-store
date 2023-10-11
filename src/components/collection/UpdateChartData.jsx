// import { useCallback, useEffect } from 'react';
// import moment from 'moment';
// import { useCollectionStore } from '../../context/hooks/collection';
// import { useCombinedContext } from '../../context/CombinedProvider';

// const transformChartData = (chartData) => {
//   let pointsArray = [];

//   if (Array.isArray(chartData)) {
//     chartData?.forEach((item) => {
//       item.datasets.forEach((dataset) => {
//         dataset.data.forEach((data) => {
//           pointsArray.push(...data.points);
//         });
//       });
//     });
//   } else {
//     console.error('Expected chartData to be an array, but got:', chartData);
//   }

//   return pointsArray;
// };

// const useUpdateChartData = () => {
//   const { totalCost } = useCollectionStore() || {};
//   const {
//     updateServerData,
//     isCronJobTriggered,
//     setIsCronJobTriggered,
//     chartData,
//   } = useCombinedContext() || {};

//   const transformedData = transformChartData(chartData);

//   const createDataset = (label, priceData) => ({
//     name: label,
//     color: 'blue',
//     data: priceData?.map(({ x, y }) => ({ x, y })),
//   });

//   const newDataPoint = useCallback(() => {
//     return {
//       x: moment().format('YYYY-MM-DD HH:mm'),
//       y: totalCost ? parseFloat(totalCost).toFixed(2) : null,
//     };
//   }, [totalCost]);

//   const updateChart = useCallback(() => {
//     let updatedDatasets = [];

//     if (transformedData.length && totalCost != null) {
//       updatedDatasets.push(
//         createDataset('totalPrice', [...transformedData, newDataPoint()])
//       );
//     }

//     if (updatedDatasets.length) {
//       updateServerData(updatedDatasets);
//     }
//   }, [transformedData, newDataPoint, updateServerData, totalCost]);

//   useEffect(() => {
//     if (isCronJobTriggered) {
//       updateChart();
//       setIsCronJobTriggered(false);
//     }
//   }, [isCronJobTriggered, updateChart, setIsCronJobTriggered]);

//   return { datasets: transformedData };
// };

// export default useUpdateChartData;
