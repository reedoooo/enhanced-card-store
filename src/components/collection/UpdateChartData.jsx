import { useCallback, useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { useCollectionStore } from '../../context/hooks/collection';
import { ChartContext } from '../../context/ChartContext/ChartContext';
import { UtilityContext } from '../../context/UtilityContext/UtilityContext';

const UpdateChartData = () => {
  const { totalCost } = useCollectionStore() || {};
  const { chartData, updateServerData, isUpdated, setIsUpdated } =
    useContext(ChartContext);
  const { isCronJobTriggered } = useContext(UtilityContext);
  const [datasets, setDatasets] = useState(chartData || []);

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
  }, [datasets, newDataPoint, updateServerData, totalCost]);

  // Update the local datasets state when the chartData in the context is updated
  useEffect(() => {
    setDatasets(chartData || []);
  }, [chartData]);

  // Existing useEffects and other code
  useEffect(() => {
    if (isUpdated || isCronJobTriggered) {
      updateChart();
      setIsUpdated(false);
    }
  }, [isUpdated, updateChart, setIsUpdated, isCronJobTriggered]);

  useEffect(() => {
    // every 10 minutes, update the chart
    const intervalId = setInterval(updateChart, 600000);
    updateChart();
    return () => clearInterval(intervalId);
  }, [updateChart]);

  return { datasets };
};

export default UpdateChartData;
