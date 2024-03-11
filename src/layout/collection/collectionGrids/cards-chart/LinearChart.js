import React from 'react';
import PropTypes from 'prop-types';
import ChartWrapper from '../../../REUSABLE_COMPONENTS/unique/ChartWrapper';
import FixedHeightCardWrapper from '../../../REUSABLE_COMPONENTS/unique/FixedHeightCardWrapper';
import InfoStackWrapper from '../../../REUSABLE_COMPONENTS/unique/InfoStackWrapper';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import DynamicCollectionDestructuring from '../../data/statList';
import { ChartConfiguration } from './ChartConfigs';
import ChartErrorBoundary from './ChartErrorBoundary';

const LinearChart = ({ height, specialPoints, timeRange, nivoData }) => {
  console.log('NIVODATA ', nivoData);
  return (
    <ChartErrorBoundary>
      <ChartConfiguration
        nivoChartData={nivoData}
        markers={specialPoints}
        height={height}
        range={timeRange}
        loadingID={nivoData?.id}
      />
    </ChartErrorBoundary>
  );
};

// Define prop types for LinearChart component
LinearChart.propTypes = {
  height: PropTypes.number.isRequired,
  specialPoints: PropTypes.arrayOf(PropTypes.object),
  timeRange: PropTypes.string.isRequired,
  nivoData: PropTypes.object.isRequired,
};

export default LinearChart;
