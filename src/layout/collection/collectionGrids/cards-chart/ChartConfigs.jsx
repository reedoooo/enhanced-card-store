import { ResponsiveLine } from '@nivo/line';
import { useChartContext, useMode } from '../../../../context';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import {
  CustomTooltipLayer,
  useEventHandlers,
} from '../../../../context/MAIN_CONTEXT/ChartContext/helpers';
import { useEffect, useMemo } from 'react';
import NivoContainer from './NivoContainer';
import PropTypes from 'prop-types';
import ChartErrorBoundary from './ChartErrorBoundary';

export const ChartConfiguration = ({
  markers,
  height,
  nivoChartData,
  range,
  loadingID,
}) => {
  const { theme } = useMode();
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();

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
