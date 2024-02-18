import { ChartConfiguration } from '../../../../context/MAIN_CONTEXT/ChartContext/helpers';
import ChartErrorBoundary from '../../../reusable/ChartErrorBoundary';

const LinearChart = ({ height, specialPoints, timeRange, nivoData }) => {
  return (
    <ChartErrorBoundary>
      <ChartConfiguration
        nivoChartData={nivoData}
        markers={specialPoints}
        height={height}
        timeRange={timeRange}
        loadingID={nivoData?.id}
      />
    </ChartErrorBoundary>
  );
};

export default LinearChart;
