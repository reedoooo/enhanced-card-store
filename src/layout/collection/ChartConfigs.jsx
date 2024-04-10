/* eslint-disable max-len */
import { useAppContext, useMode } from '../../context';
import { useEffect, useMemo, useState } from 'react';
import NivoContainer from '../REUSABLE_COMPONENTS/NivoContainer';
import { BasicTooltip } from '@nivo/tooltip';
import { useEventHandlers } from '../../context/hooks/useEventHandlers';
import MyResponsiveLine from './MyPortfolioLineChart';
import { ChartArea } from '../../pages/pageStyles/StyledComponents';
import { useForm, useWatch } from 'react-hook-form';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useRCFormHook from '../../components/forms/hooks/useRCFormHook';
import { useCompileCardData } from '../../context/MISC_CONTEXT/AppContext/useCompileCardData';
import LoadingOverlay from '../REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import { i } from 'mathjs';
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
import PropTypes from 'prop-types';
import { useValidateData } from '../../context/hooks/useValidateInnerData';

// Example data shape
const fetchedDataType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
});

export const ChartConfiguration = ({ markers }) => {
  const { theme } = useMode();
  const { greenAccent, redAccent, grey } = theme.palette.chartTheme;
  const { selectedTimeRange } = useCompileCardData(); // Default to '24hr' if not set
  const { selectedCollection, updateCollectionField } = useSelectedCollection();
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  if (!selectedCollection) {
    return <LoadingOverlay />;
  }
  if (selectedCollection?.selectedChartData?.data?.length === 0) {
    return <LoadingOverlay />;
  }

  const chartData = useMemo(
    () =>
      selectedCollection?.selectedChartData &&
      // eslint-disable-next-line valid-typeof
      typeof selectedCollection?.selectedChartData
        ? selectedCollection?.selectedChartData
        : selectedCollection?.averagedChartData['24hr'],
    [selectedCollection, selectedTimeRange]
  );
  const validMarkers = useMemo(
    () => markers?.filter((marker) => marker.value !== undefined),
    [markers]
  );
  const tickValues = useMemo(() => {
    const { format, ticks } = formatDateBasedOnRange(selectedTimeRange);
    return ticks.split(' ').map((tick) => new Date(tick).getTime());
  }, [selectedTimeRange.value]);
  const xformat = useMemo(() => {
    const format = chartData?.id === '24hr' ? '%H:%M' : '%b %d';
    return format;
  }, [chartData?.id]);
  useEffect(() => {
    console.log('NIVO SELECTED DATA ', chartData);
    console.log('NIVO SELECTED TIME RANGE ', selectedTimeRange);
  }, [chartData]);
  if (!chartData) {
    return <LoadingOverlay />;
  }
  return (
    <ChartArea
      theme={theme}
      sx={{
        minHeight: '500px',
      }}
    >
      <NivoContainer height={500}>
        <MyResponsiveLine
          data={[chartData] || chartData}
          handleMouseLeave={handleMouseLeave}
          handleMouseMove={handleMouseMove}
          TooltipLayer={TooltipLayer}
          tickValues={tickValues}
          validMarkers={validMarkers}
          xFormat={xformat}
          redAccent={redAccent}
          greenAccent={greenAccent}
          grey={grey}
          text={theme.palette.text.primary}
        />
      </NivoContainer>
    </ChartArea>
  );
};

// ChartConfiguration.propTypes = {
// markers: PropTypes.arrayOf(
//   PropTypes.shape({
//     axis: PropTypes.oneOf(['x', 'y']).isRequired,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//       .isRequired,
//     legend: PropTypes.string,
//     lineStyle: PropTypes.object,
//   })
// ),
// height: PropTypes.number.isRequired,
// nivoChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
// range: PropTypes.oneOf(['24hr', '7d', '30d', '90d', '180d', '270d', '365d'])
//   .isRequired,
// loadingID: PropTypes.string.isRequired,
// };
