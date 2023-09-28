import { useCallback, useEffect, useState, useContext, useRef } from 'react';
import moment from 'moment';
import { useCollectionStore } from '../../context/hooks/collection';
import { useCombinedContext } from '../../context/CombinedProvider';

const UpdateChartData = () => {
  const { totalCost } = useCollectionStore() || {};
  const {
    isCronJobTriggered,
    chartData,
    updateServerData,
    isUpdated,
    setIsUpdated,
  } = useCombinedContext();
  const [datasets, setDatasets] = useState(chartData || []);
  const prevTotalCostRef = useRef(); // Reference to store the previous totalCost

  useEffect(() => {
    prevTotalCostRef.current = totalCost; // Update the ref on each render
  });

  const createDataset = (label, priceData) => ({
    id: label,
    color: 'blue',
    data: priceData?.map(({ x, y }) => ({ x, y })),
  });

  const newDataPoint = useCallback(() => {
    const currentTime = new Date();
    const formattedTime = moment(currentTime).format('YYYY-MM-DD HH:mm');

    return {
      x: formattedTime,
      y: totalCost ? parseFloat(totalCost).toFixed(2) : null,
    };
  }, [totalCost]);

  const updateChart = useCallback(() => {
    let updatedDatasets = [];

    if (totalCost !== prevTotalCostRef.current) {
      if (!datasets.length && totalCost != null) {
        // If there are no existing datasets and totalCost is defined, create a new dataset
        const newDataset = createDataset('totalPrice', [newDataPoint()]);
        updatedDatasets.push(newDataset);
      } else if (datasets.length) {
        // If there are existing datasets, add new data points to them
        datasets.forEach((dataset) => {
          const newData = newDataPoint();
          const newDataset = {
            ...dataset,
            data: Array.isArray(dataset?.data)
              ? [...dataset.data, newData]
              : [newData],
          };
          updatedDatasets.push(newDataset);
        });
      }

      if (
        updatedDatasets.length &&
        JSON.stringify(updatedDatasets) !== JSON.stringify(datasets)
      ) {
        setDatasets(updatedDatasets);
        updateServerData(updatedDatasets);
      }
    }
    console.log('UPDATED DATASETS:', updatedDatasets);
    console.log('TOTAL COST:', totalCost);
    console.log('PREV TOTAL COST:', prevTotalCostRef.current);
    console.log('IS CRON JOB TRIGGERED:', isCronJobTriggered);
    console.log('IS UPDATED:', isUpdated);
    console.log('DATASETS:', datasets);
  }, [datasets, newDataPoint, updateServerData, totalCost]);

  useEffect(() => {
    // every 10 minutes, update the chart
    const intervalId = setInterval(updateChart, 600000);
    updateChart();
    return () => clearInterval(intervalId);
  }, [updateChart]);

  return { datasets };
};

export default UpdateChartData;
