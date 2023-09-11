import React, { useRef, useEffect } from 'react';
import { Chart, LinearScale } from 'chart.js';

const LinearChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0.5)');

      const updatedData = {
        ...data,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          borderColor: gradient,
          pointBorderColor: gradient,
          pointHoverBorderColor: gradient,
        })),
      };

      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: updatedData,
        options,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data, options]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LinearChart;
