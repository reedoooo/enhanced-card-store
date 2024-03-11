import { ResponsiveLine } from '@nivo/line';
import { useChartContext, useMode } from '../../../../context';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import {
  CustomTooltipLayer,
  useEventHandlers,
} from '../../../../context/MAIN_CONTEXT/ChartContext/helpers';
import { useEffect, useMemo, useState } from 'react';
import useCollectionManager from '../../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import NivoContainer from './NivoContainer';
import { mockLineData as data } from '../../data/mockData';
import PropTypes from 'prop-types';
// import nivoTestData from './GenerateNivoTestData';
// const { tickValues, xFormat } = useMemo(() => {
//   let format, ticks;
//   switch (timeRange) {
//     case '24hr':
//       format = '%H:%M';
//       ticks = 'every hour';
//       break;
//     case '7d':
//       format = '%b %d';
//       ticks = 'every day';
//       break;
//     case '30d':
//       format = '%b %d';
//       ticks = 'every day';
//       break;
//     case '90d':
//       format = '%b %d';
//       ticks = 'every 3 days';
//       break;
//     case '180d':
//       format = '%b %d';
//       ticks = 'every 6 days';
//       break;
//     case '270d':
//       format = '%b %d';
//       ticks = 'every 9 days';
//       break;
//     case '365d':
//       format = '%b %d';
//       ticks = 'every 12 days';
//       break;
//     default:
//       format = '%b %d';
//       ticks = 'every day';
//   }
//   return { tickValues: ticks, xFormat: `time:${format}` };
// }, [timeRange]);
// const normalizeData = (data, timeRange) => {
//   // Determine the start and end dates based on the timeRange
//   let endDate = new Date();
//   let startDate = new Date();

//   startDate.setDate(endDate.getDate() - parseInt(timeRange, 10));

//   let normalizedData = [];
//   let currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     let dateString = currentDate.toISOString().split('T')[0];

//     let dataPoint = data?.find((point) => point.x === dateString);
//     normalizedData.push({
//       x: dateString,
//       y: dataPoint ? dataPoint.y : null, // Use null for missing data
//     });

//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return [{ id: 'data', data: normalizedData }];
// };
// function getTickValuesAndFormat(timeRange) {
//   // Your logic to determine tick values and format based on timeRange...
//   return {
//     tickValues: 'every day',
//     xFormat: '%Y-%m-%d',
//   };
// }
// const normalizeData = (data, timeRange) => {
//   let endDate = new Date();
//   let startDate = new Date();
//   startDate.setDate(endDate.getDate() - parseInt(timeRange, 10));

//   return [
//     {
//       id: 'data',
//       data: data.map(({ x, y }) => ({
//         x: x || startDate.toISOString().split('T')[0], // Provide a fallback date if necessary
//         y: y != null ? y : 0, // Ensure null or undefined values are replaced with 0
//       })),
//     },
//   ];
// };

// function getTickValuesAndFormat(timeRange) {
//   // Simplified logic for determining tick values and format based on timeRange
//   const format = timeRange === '24hr' ? '%H:%M' : '%b %d';
//   const ticks = timeRange === '24hr' ? 'every hour' : 'every day';
//   return { tickValues: ticks, xFormat: `time:${format}` };
// }
export const ChartConfiguration = ({
  markers,
  height,
  nivoChartData,
  range,
  loadingId,
}) => {
  const { theme } = useMode();
  const { selectedCollection, nivoTestData } = useSelectedCollection();
  // const { nivoChartData, newNivoChartData } = useCollectionManager();
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  // const chartData = useMemo(() => {
  //   // Access the averaged data based on the selected range
  //   return selectedCollection.averagedChartData.get(range) || [];
  // }, [selectedCollection.averagedChartData, range]);
  // const [timeRange, setTimeRange] = useState('24hr');
  // const [chartData, setChartData] = useState([]);
  // useEffect(() => {
  //   // Assuming a function like `normalizeData` exists to format your data correctly based on the time range.
  //   // This should adjust the data structure to fit what Nivo expects.
  //   const normalizedData = normalizeData(nivoChartData, timeRange);
  //   setChartData(normalizedData);
  // }, [nivoChartData, timeRange]);
  // useEffect(() => {
  //   let isValidData = true; // Assume data is valid initially

  //   // Checks if the data array has valid 'x' and 'y' values
  //   const validateChartData = (data) => {
  //     return data.every((series) =>
  //       series.data.every(
  //         (point) => point.x && point.y !== null && point.y !== undefined
  //       )
  //     );
  //   };

  //   // Check if nivoChartData or newNivoChartData has valid structure and content
  //   if (
  //     !nivoChartData ||
  //     !newNivoChartData ||
  //     !validateChartData(nivoChartData)
  //   ) {
  //     isValidData = false; // Data is considered invalid if checks fail
  //   }

  //   // Set the chart data based on the validation above
  //   let activeChartData;
  //   if (isValidData) {
  //     // Normalize the actual data if it's valid
  //     activeChartData = normalizeData(nivoChartData, timeRange);
  //   } else {
  //     // Fallback to nivoTestData for the selected time range if data is invalid
  //     const testData = nivoTestData.find((data) => data.id === timeRange);
  //     activeChartData = testData ? normalizeData(testData.data, timeRange) : [];
  //   }

  //   setChartData(activeChartData);
  // }, [nivoChartData, newNivoChartData, timeRange, nivoTestData]);

  // Filtering valid markers only to avoid any runtime errors.
  const validMarkers = useMemo(
    () => markers.filter((marker) => marker.value !== undefined),
    [markers]
  );
  const { tickValues, xFormat } = useMemo(() => {
    let format, ticks;
    switch (range) {
      case '24hr':
        format = '%H:%M';
        ticks = 'every hour';
        break;
      case '7d':
      case '30d':
        format = '%b %d';
        ticks = 'every day';
        break;
      case '90d':
        format = '%b %d';
        ticks = 'every 3 days';
        break;
      case '180d':
        format = '%b %d';
        ticks = 'every 6 days';
        break;
      case '270d':
        format = '%b %d';
        ticks = 'every 9 days';
        break;
      case '365d':
        format = '%b %d';
        ticks = 'every 12 days';
        break;
      default:
        format = '%b %d';
        ticks = 'every day';
    }
    return { tickValues: ticks, xFormat: `time:${format}` };
  }, [range]);

  const chartProps = useMemo(
    () => ({
      // data: [nivoChartData],
      data: [nivoChartData],
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      colors: { datum: 'color' }, // This is the only change from the original code
      pointSize: 10,
      pointColor: { theme: 'background' },
      pointBorderWidth: 2,
      pointBorderColor: { from: 'serieColor' },
      yFormat: '$.2f',

      // colors: theme.palette.backgroundE.dark,
      axisBottom: {
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 40,
        legendPosition: 'middle',
        tickSize: 5,
        tickPadding: 5,
        tickValues: tickValues,
        format: (value) => {
          const d = new Date(value);
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        },
      },
      axisLeft: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Value ($)',
        legendOffset: -50,
        legendPosition: 'middle',
        color: theme.palette.text.primary,
        format: (value) => `$${value?.toFixed(2)}`,
      },
      margin: { top: 20, right: 40, bottom: 50, left: 55 },
      padding: 0.5,
      animate: true,
      // xFormat: 'time:%Y-%m-%d %H:%M:%S7Z',
      // format: '%Y-%m-%dT%H:%M:%S.%LZ',

      xScale: {
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%LZ',
        precision: 'millisecond',
        // format: 'time:%Y-%m-%d',
        useUTC: false,
        // precision: 'day',
      },
      yScale: {
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      },
      curve: 'monotoneX',
      useMesh: true,
      motionConfig: 'gentle',

      stiffness: 90,
      damping: 15,
      enableSlices: 'x',
      markers: validMarkers,
      layers: [
        'grid',
        'markers',
        'areas',
        'lines',
        'slices',
        'points',
        'axes',
        'legends',
        ({ points, xScale, yScale, markers: validMarkers }) => (
          <CustomTooltipLayer
            points={points}
            xScale={xScale}
            yScale={yScale}
            markers={validMarkers}
          />
        ),
      ],
      // theme: {
      //   axis: theme.nivo.axis,
      //   legends: theme.nivo.legends,
      //   tooltip: theme.nivo.tooltip,
      // },
      theme: {
        axis: {
          domain: {
            line: {
              stroke: theme.palette.chartTheme.grey.lightest,
            },
          },
          legend: {
            text: {
              fill: theme.palette.chartTheme.grey.lightest,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.chartTheme.grey.lightest,
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.chartTheme.grey.lightest,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.chartTheme.grey.lightest,
          },
        },
        tooltip: {
          container: {
            color: theme.palette.chartTheme.primary.default,
          },
        },
      },
    }),
    [nivoChartData, markers, theme, tickValues, xFormat]
  );

  return (
    <NivoContainer height={height}>
      <ResponsiveLine {...chartProps} />
    </NivoContainer>
  );
};

// Define the structure of each data point
// const pointShape = PropTypes.shape({
//   x: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.string,
//     PropTypes.instanceOf(Date),
//   ]).isRequired,
//   y: PropTypes.number.isRequired,
// });

// // Define the structure for each data series
// const seriesShape = PropTypes.shape({
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   color: PropTypes.string,
//   data: PropTypes.arrayOf(pointShape).isRequired,
// });

// Now, apply these to ChartConfiguration propTypes
ChartConfiguration.propTypes = {
  // markers: PropTypes.arrayOf(PropTypes.object),
  // height: PropTypes.number.isRequired,
  // range: PropTypes.string.isRequired,
  // loadingId: PropTypes.string,
  nivoChartData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date),
          ]).isRequired,
          y: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  // Validate chartData explicitly to match the expected structure
  // nivoChartData: PropTypes.arrayOf(seriesShape).isRequired,
};
