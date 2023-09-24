import { useCallback, useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { useCollectionStore } from '../../context/hooks/collection';
import { ChartContext } from '../../context/ChartContext/ChartContext';

const UpdateChartData = () => {
  const { totalCost } = useCollectionStore() || {};
  const { chartData, updateServerData } = useContext(ChartContext);
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

  useEffect(() => {
    const intervalId = setInterval(updateChart, 3600000);
    updateChart();
    return () => clearInterval(intervalId);
  }, []);

  return { datasets };
};

export default UpdateChartData;
