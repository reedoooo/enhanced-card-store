import { useCallback, useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
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
    datasets,
    setDatasets,
  } = useCombinedContext();

  const prevTotalCostRef = useRef(totalCost);
  const [transformedData, setTransformedData] = useState([]);
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    prevTotalCostRef.current = totalCost;
  }, [totalCost]);

  const createDataset = useCallback(
    (label, priceData) => ({
      id: label,
      color: 'blue',
      data: priceData?.map(({ x, y }) => ({ x, y })),
    }),
    []
  );

  const newDataPoint = useCallback(() => {
    const currentTime = new Date();
    const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm');

    return {
      x: formattedTime,
      y: totalCost ? parseFloat(parseFloat(totalCost).toFixed(2)) : null,
    };
  }, [totalCost]);

  const updateChart = useCallback(() => {
    let updatedDatasets = [];

    if (
      isCronJobTriggered ||
      isUpdated ||
      totalCost !== prevTotalCostRef.current
    ) {
      if (!datasets.length && totalCost !== null) {
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

      if (JSON.stringify(datasets) !== JSON.stringify(updatedDatasets)) {
        updateServerData(updatedDatasets);
        setDatasets(updatedDatasets);
        setIsUpdated(false);
      }
    }

    if (updatedDatasets.length) {
      const uniqueYDataArray =
        updatedDatasets[0]?.data
          ?.filter(
            ({ y }, index, self) =>
              index === self.findIndex((item) => item.y === y)
          )
          .map((d) => ({ x: new Date(d.x), y: parseFloat(d.y) })) || [];

      setTransformedData([{ id: 'alldatasets', data: uniqueYDataArray }]);
      setLatestData(uniqueYDataArray.slice(-1)[0] || null);
    }
  }, [
    datasets,
    newDataPoint,
    updateServerData,
    totalCost,
    isCronJobTriggered,
    isUpdated,
    setIsUpdated,
    createDataset,
  ]);

  useEffect(() => {
    const intervalId = setInterval(updateChart, 600000);
    updateChart();
    return () => clearInterval(intervalId);
  }, [updateChart]);

  return { datasets, transformedData, latestData };
};

export default UpdateChartData;
