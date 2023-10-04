import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useCollectionStore } from '../../context/hooks/collection';
import { useCombinedContext } from '../../context/CombinedProvider';

// Hook for updating chart data
const useUpdateChartData = () => {
  const { totalCost } = useCollectionStore() || {};
  const {
    updateServerData,
    isCronJobTriggered,
    setIsCronJobTriggered,
    chartData,
  } = useCombinedContext() || {};

  // const [datasets, setDatasets] = useState(chartData || []);
  const datasets = chartData.datasets;
  const createDataset = (label, priceData) => ({
    name: label,
    color: 'blue',
    data: priceData?.map(({ x, y }) => ({ x, y })),
  });

  const newDataPoint = useCallback(() => {
    return {
      x: moment().format('YYYY-MM-DD HH:mm'),
      y: totalCost ? parseFloat(totalCost).toFixed(2) : null,
    };
  }, [totalCost]);

  // Logic for updating chart datasets
  const updateChart = useCallback(() => {
    let updatedDatasets = [];

    if (!datasets.length && totalCost != null) {
      updatedDatasets.push(createDataset('totalPrice', [newDataPoint()]));
    } else if (datasets.length) {
      datasets.forEach((dataset) => {
        const newData = newDataPoint();
        updatedDatasets.push({
          ...dataset,
          data: [...(dataset?.data || []), newData],
        });
      });
    }

    // Update if necessary
    if (
      updatedDatasets.length &&
      JSON.stringify(updatedDatasets) !== JSON.stringify(datasets)
    ) {
      // setDatasets(updatedDatasets);
      updateServerData(updatedDatasets);
    }
  }, [datasets, newDataPoint, updateServerData, totalCost]);

  // useEffect(() => {
  //   setDatasets(chartData || []);
  // }, [chartData]);

  useEffect(() => {
    if (isCronJobTriggered) {
      updateChart();
      setIsCronJobTriggered(false);
    }
  }, [isCronJobTriggered, updateChart, setIsCronJobTriggered]);

  return { datasets };
};

export default useUpdateChartData;
