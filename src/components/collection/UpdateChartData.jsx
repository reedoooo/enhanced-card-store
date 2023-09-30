import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useCollectionStore } from '../../context/hooks/collection';
import { useCombinedContext } from '../../context/CombinedProvider';

const UpdateChartData = () => {
  const { totalCost } = useCollectionStore() || {};
  const {
    chartData,
    updateServerData,
    isCronJobTriggered,
    setIsCronJobTriggered,
  } = useCombinedContext() || {};

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
      const newDataset = createDataset('totalPrice', [newDataPoint()]);
      updatedDatasets.push(newDataset);
    } else if (datasets.length) {
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
    setDatasets(chartData || []);
  }, [chartData]);

  useEffect(() => {
    if (isCronJobTriggered) {
      updateChart();
      setIsCronJobTriggered(false); // reset the trigger state
    }
  }, [isCronJobTriggered, updateChart, setIsCronJobTriggered]);

  return { datasets };
};

export default UpdateChartData;
