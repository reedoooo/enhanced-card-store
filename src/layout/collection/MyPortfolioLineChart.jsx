import { ResponsiveLine } from '@nivo/line';
import { BasicTooltip } from '@nivo/tooltip';
import PropTypes from 'prop-types';
import { useEventHandlers } from '../../context/hooks/useEventHandlers';
const TooltipLayer = ({ points }) => {
  // console.log(points);
  return (
    <>
      {points?.map((point, index) => (
        <BasicTooltip
          key={point.data.id}
          id={point.data.id}
          label={point.data.label}
          x={point.data.xFormatted}
          value={point.data.yFormatted}
          color="#000000"
          enableChip
        />
      ))}
    </>
  );
};

const MyResponsiveLine = ({
  data,
  // tickValues,
  validMarkers,
  greenAccent,
  redAccent,
  grey,
  text,
}) => {
  const { handleMouseMove, handleMouseLeave } = useEventHandlers();
  // console.log(validMarkers);
  // console.log(tickValues);
  return (
    <ResponsiveLine
      data={data}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      colors={{ datum: 'color' }} // This is the only change from the original code
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      yFormat="$.2f"
      xFormat={(value) => {
        const d = new Date(value);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      }}
      axisBottom={{
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 40,
        legendPosition: 'middle',
        tickSize: 5,
        tickPadding: 5,
        // tickValues: (v)
        format: (value) => {
          const d = new Date(value);
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Value ($)',
        legendOffset: -60,
        legendPosition: 'start',
        // legendPosition: 'middle',
        color: text,
        min: 'auto',
        max: 'auto',
        format: (value) => `$${value?.toFixed(2)}`,
      }}
      margin={{ top: 20, right: 40, bottom: 50, left: 70 }}
      padding={0.5}
      animate={true}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%LZ',
        precision: 'millisecond',
        useUTC: false,
      }}
      yScale={{
        type: 'linear', // Linear scale will be used for y-axis
        // min: 'auto', // Auto-scale will fit values between min and max
        min: '0', // Explicitly setting minimum to 0, adjust as needed
        max: 'auto', // Consider setting an explicit max if appropriate
        stacked: false, // Changed to false unless stacking is needed
        reverse: false, // Reverse the scale if needed
      }}
      curve="catmullRom" // This curve type can create smoother, more wavy lines
      motionConfig="wobbly" // A more dynamic motion configuration
      useMesh={true}
      stiffness={90}
      damping={15}
      enableSlices="x"
      markers={validMarkers}
      layers={[
        'grid',
        'markers',
        'areas',
        'lines',
        'slices',
        'points',
        'axes',
        'legends',
        TooltipLayer,
      ]}
      theme={{
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
      }}
    />
  );
};

MyResponsiveLine.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string.isRequired,
          y: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  // handleMouseMove: PropTypes.func.isRequired,
  // handleMouseLeave: PropTypes.func.isRequired,
  // tickValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  // validMarkers: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     x: PropTypes.number.isRequired,
  //     y: PropTypes.number.isRequired,
  //     value: PropTypes.number.isRequired,
  //     color: PropTypes.string.isRequired,
  //   })
  // ).isRequired,
  greenAccent: PropTypes.object.isRequired,
  redAccent: PropTypes.object.isRequired,

  grey: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  // TooltipLayer: PropTypes.func.isRequired,
};

export default MyResponsiveLine;
