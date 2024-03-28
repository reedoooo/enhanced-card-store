import { ResponsiveLine } from '@nivo/line';
import { useChartContext, useMode } from '../../../../context';
import {
  CustomTooltipLayer,
  useEventHandlers,
} from '../../../../context/MAIN_CONTEXT/ChartContext/helpers';
import { useEffect, useMemo } from 'react';
import NivoContainer from '../../../REUSABLE_COMPONENTS/NivoContainer';
import PropTypes from 'prop-types';
import ChartErrorBoundary from './ChartErrorBoundary';
import { BasicTooltip } from '@nivo/tooltip';
const formatDateBasedOnRange = (range) => {
  const formatMap = {
    '24hr': { format: '%H:%M', ticks: 'every hour' },
    '7d': { format: '%b %d', ticks: 'every day' },
    '30d': { format: '%b %d', ticks: 'every day' },
    '90d': { format: '%b %d', ticks: 'every 3 days' },
    '180d': { format: '%b %d', ticks: 'every 6 days' },
    '270d': { format: '%b %d', ticks: 'every 9 days' },
    '365d': { format: '%b %d', ticks: 'every 12 days' },
    default: { format: '%b %d', ticks: 'every day' },
  };

  return formatMap[range] || formatMap.default;
};
const TooltipLayer = ({ points }) => (
  <>
    {points?.map((point) => (
      <BasicTooltip
        key={point.id}
        id={point.id}
        value={point.data.yFormatted}
        color="#000000"
        enableChip
      />
    ))}
  </>
);

export const ChartConfiguration = ({
  markers,
  height,
  nivoChartData,
  range,
  loadingID,
}) => {
  const { theme } = useMode();
  const colors = theme.palette.chartTheme;
  const { greenAccent, redAccent, grey } = colors;
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  const validMarkers = useMemo(
    () => markers?.filter((marker) => marker.value !== undefined),
    [markers]
  );
  const { tickValues, xFormat } = useMemo(
    () => formatDateBasedOnRange(range),
    [range]
  );
  const chartProps = useMemo(
    () => ({
      data: nivoChartData,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      colors: { datum: 'color' }, // This is the only change from the original code
      pointSize: 10,
      pointColor: { theme: 'background' },
      pointBorderWidth: 2,
      pointBorderColor: { from: 'serieColor' },
      yFormat: '$.2f',
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
      xScale: {
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%LZ',
        precision: 'millisecond',
        useUTC: false,
      },
      yScale: {
        type: 'linear',
        min: '0', // Explicitly setting minimum to 0, adjust as needed
        max: 'auto', // Consider setting an explicit max if appropriate
        stacked: false, // Changed to false unless stacking is needed
        reverse: false,
      },
      curve: 'catmullRom', // This curve type can create smoother, more wavy lines
      motionConfig: 'wobbly', // A more dynamic motion configuration      useMesh: true,
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
        TooltipLayer,
      ],
      theme: {
        axis: {
          domain: {
            line: {
              stroke: grey.lightest,
            },
          },
          legend: {
            text: {
              fill: greenAccent.darkest,
              fontSize: 12,
              outlineWidth: 0.1,
              outlineColor: grey.darkest,
            },
          },
          ticks: {
            line: {
              stroke: grey.lightest,
              strokeWidth: 1,
            },
            text: {
              fill: grey.lightest,
            },
          },
        },
        legends: {
          text: {
            fill: grey.lightest,
          },
        },
        tooltip: {
          container: {
            color: grey.darkest,
            borderColor: redAccent.darkest,
          },
        },
      },
    }),
    [nivoChartData, markers, theme, tickValues, xFormat]
  );

  return (
    <ChartErrorBoundary>
      <NivoContainer height={height}>
        <ResponsiveLine {...chartProps} />
      </NivoContainer>
    </ChartErrorBoundary>
  );
};

ChartConfiguration.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.oneOf(['x', 'y']).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      legend: PropTypes.string,
      lineStyle: PropTypes.object,
    })
  ),
  height: PropTypes.number.isRequired,
  nivoChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  range: PropTypes.oneOf(['24hr', '7d', '30d', '90d', '180d', '270d', '365d'])
    .isRequired,
  loadingID: PropTypes.string.isRequired,
};
